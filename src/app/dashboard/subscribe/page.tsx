import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PricingGrid from "@/components/subscription/pricing-grid";

export default function SubscribePage() {
  return (
    <div className="container max-w-5xl py-10 px-4 min-h-screen">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <Link 
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Dashboard
      </Link>
      
      <div className="space-y-4 text-center mb-12 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Pick Your Plan
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every entry contributes to local golf charities and enters you into our monthly prize pool.
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <PricingGrid />
      </div>

      <div className="mt-16 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <p>Secure payments powered by Stripe. Cancel anytime through your dashboard.</p>
      </div>
    </div>
  );
}
