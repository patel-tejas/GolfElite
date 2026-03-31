"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden text-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            Transparent Pricing
          </motion.h2>
          <p className="text-zinc-500 font-medium">One simple plan for everyone</p>
        </div>

        <div className="max-w-xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 glass-card border-accent/20 bg-accent/2 relative group overflow-hidden"
          >
             {/* Premium Badge */}
             <div className="absolute top-8 right-8 inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent text-[10px] font-black uppercase tracking-widest">
               <Star className="w-3 h-3 fill-current" />
               Premium
             </div>

             <div className="mb-12">
               <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest block mb-4">Silver Membership</span>
               <div className="flex items-baseline justify-center gap-2">
                 <span className="text-7xl font-heading font-black text-white italic">$50</span>
                 <span className="text-xl font-bold text-zinc-500">/month</span>
               </div>
             </div>

             <div className="space-y-6 mb-12">
               {[
                 "1 draw entry per month",
                 "Full dashboard access",
                 "Rolling top 5 score tracking",
                 "Direct charity contribution",
                 "Priority winner verification",
               ].map((benefit, i) => (
                 <div key={i} className="flex items-center gap-4 text-zinc-300 font-medium text-lg italic">
                    <Check className="w-5 h-5 text-accent" />
                    {benefit}
                 </div>
               ))}
             </div>

             <div className="space-y-4">
                <Link href="/signup">
                  <Button size="xl" className="w-full h-16 btn-premium text-lg font-bold rounded-2xl group">
                    Start Playing 
                    <Zap className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" />
                  </Button>
                </Link>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                   No hidden fees. Cancel anytime.
                </p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
