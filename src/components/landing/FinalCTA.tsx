"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-28 md:py-40 bg-premium-dark relative overflow-hidden">
      {/* Pulsing orb background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: "oklch(0.68 0.18 25 / 0.15)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{ background: "oklch(0.72 0.14 180 / 0.1)" }}
        />
      </div>

      <div className="container mx-auto relative z-10 px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <Heart className="w-12 h-12 text-accent fill-accent/30 heartbeat" />
            <div className="absolute -inset-4 bg-accent/10 rounded-full blur-xl" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl md:text-8xl font-heading font-black text-white leading-[0.95] tracking-tight mb-8"
        >
          Ready to play
          <br />
          <span className="text-gradient-aurora">for something bigger?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Join hundreds of players who&apos;ve turned their favorite sport into a force for good. Your next round could change a life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-8"
        >
          <Link href="/signup" id="final-cta">
            <Button size="xl" className="h-20 px-16 text-xl sm:text-2xl font-black btn-premium rounded-3xl group shadow-[0_0_80px_-15px_rgba(255,120,80,0.4)]">
              <Heart className="w-6 h-6 mr-3 fill-white/20 group-hover:scale-110 transition-transform" />
              Join Now
              <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-3 transition-transform" />
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 border-2 border-[oklch(0.10_0.02_250)] flex items-center justify-center text-[8px] font-black text-white/60">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-white/30 font-bold text-sm">
              <span className="text-white/60">850+</span> members making an impact
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
