import { stripe } from "@/utils/stripe/config";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!sig || !webhookSecret) {
      console.warn("Webhook Signature or Secret missing");
      return new Response("Webhook Secret Missing", { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Admin client for Supabase to bypass user RLS on webhooks
  // Service Role Key is required for back-end updates
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const session = event.data.object as any;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        // Handle successful checkout
        const checkoutSession = event.data.object as any;
        const subscriptionId = checkoutSession.subscription as string;
        
        await supabaseAdmin
          .from("profiles")
          .update({
            is_subscribed: true,
            subscription_id: subscriptionId,
          })
          .eq("stripe_customer_id", checkoutSession.customer as string);
        break;

      case "customer.subscription.deleted":
        // Handle cancellation
        const deletedSub = event.data.object as any;
        await supabaseAdmin
          .from("profiles")
          .update({
            is_subscribed: false,
            subscription_id: null,
          })
          .eq("stripe_customer_id", deletedSub.customer as string);
        break;

      case "customer.subscription.updated":
        // Handle renewals or plan changes
        const updatedSub = event.data.object as any;
        await supabaseAdmin
          .from("profiles")
          .update({
            is_subscribed: updatedSub.status === "active",
            subscription_id: updatedSub.id,
          })
          .eq("stripe_customer_id", updatedSub.customer as string);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Database sync error in Stripe Webhook:", error);
    return new Response("Webhook handler failed", { status: 500 });
  }

  return NextResponse.json({ received: true });
}
