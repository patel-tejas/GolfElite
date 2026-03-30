"use client"

import { PLANS } from "@/utils/stripe/prices";
import { createCheckoutSession } from "@/utils/stripe/server-actions";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

export default function PricingGrid() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoadingPriceId(priceId);
      await createCheckoutSession(priceId);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {PLANS.map((plan) => (
        <Card
          key={plan.priceId}
          className={`flex flex-col glass-panel animate-fade-in ${
            plan.popular ? "border-primary/50 ring-2 ring-primary/20" : ""
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-bold">
              Most Popular
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              <span className="text-muted-foreground ml-1">
                /{plan.name.includes("Weekly") ? "week" : "month"}
              </span>
            </div>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full h-11 ${
                plan.popular ? "btn-primary-gradient" : ""
              }`}
              variant={plan.popular ? "default" : "outline"}
              onClick={() => handleSubscribe(plan.priceId)}
              disabled={!!loadingPriceId}
            >
              {loadingPriceId === plan.priceId ? "Processing..." : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
