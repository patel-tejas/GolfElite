"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Heart, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 md:py-36 bg-premium-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px]"
          style={{ background: "oklch(0.68 0.18 25 / 0.06)" }}
        />
      </div>

      <div className="container mx-auto relative z-10 px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Shield className="w-3.5 h-3.5 text-primary" />
            Transparent Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-4 tracking-tight"
          >
            One Plan.{" "}
            <span className="text-gradient-aurora">Unlimited Impact.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 font-medium max-w-md mx-auto text-lg"
          >
            Everything you need. No tiers, no upsells.
          </motion.p>
        </div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 md:p-14 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden group"
          >
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"
              style={{
                background: "linear-gradient(135deg, oklch(0.72 0.14 180 / 0.05), oklch(0.68 0.18 25 / 0.05))"
              }}
            />

            {/* Badge */}
            <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/15 border border-accent/25 rounded-full text-accent text-[10px] font-bold uppercase tracking-[0.15em]">
              <Star className="w-3 h-3 fill-current" />
              Most Popular
            </div>

            <div className="relative z-10">
              {/* Price */}
              <div className="mb-10">
                <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] block mb-4">Monthly Membership</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-7xl md:text-8xl font-heading font-black text-white tracking-tighter">$50</span>
                  <span className="text-xl font-bold text-white/30">/mo</span>
                </div>
              </div>

              {/* Where the money goes - visual breakdown */}
              <div className="mb-10 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] block mb-4">Where Your $50 Goes</span>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/60">Prize Pool</span>
                    <span className="text-sm font-bold text-primary">$40</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-accent fill-accent/30" />
                      <span className="text-sm font-medium text-white/60">Your Charity</span>
                    </div>
                    <span className="text-sm font-bold text-accent">$5</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "10%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-white/60">Platform</span>
                    <span className="text-sm font-bold text-white/40">$5</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "10%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-white/20 to-white/10"
                    />
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4 mb-10">
                {[
                  "1 monthly draw entry",
                  "Full dashboard & score tracking",
                  "Direct charity contribution",
                  "Real-time impact tracking",
                  "Priority winner verification",
                  "Cancel anytime — no lock-in",
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="flex items-center gap-3.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-[15px] text-white/60 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/signup" id="pricing-cta">
                <Button size="xl" className="w-full h-16 btn-premium text-lg font-bold rounded-2xl group">
                  Start Making an Impact
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <p className="text-center text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mt-4">
                No hidden fees. 100% transparent.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
