"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Sparkles } from "lucide-react";

export function WinningPotential() {
  return (
    <section className="py-28 md:py-36 bg-premium-dark relative overflow-hidden">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-4 tracking-tight"
          >
            Imagine Your{" "}
            <span className="text-gradient-aurora">Winning Potential</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 font-medium max-w-md mx-auto text-lg"
          >
            The more members join, the bigger everyone wins — and the more we give.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { players: 500, prize: "$9,000", charity: "$1,000", icon: Users, highlighted: false },
            { players: 1000, prize: "$18,000", charity: "$2,000", icon: DollarSign, highlighted: true },
            { players: 2500, prize: "$45,000", charity: "$5,000", icon: TrendingUp, highlighted: false },
          ].map((scenario, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`p-10 rounded-[2.5rem] border flex flex-col items-center gap-6 group transition-all duration-500 hover:-translate-y-2 ${
                scenario.highlighted
                  ? "border-primary/30 bg-primary/[0.05] ring-1 ring-primary/10"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
              }`}
            >
              {scenario.highlighted && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/15 border border-primary/25 rounded-full">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]">Sweet Spot</span>
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                scenario.highlighted ? "bg-primary/15" : "bg-white/[0.04]"
              }`}>
                <scenario.icon className={`w-7 h-7 ${scenario.highlighted ? "text-primary" : "text-white/40"}`} />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-white/30 uppercase tracking-[0.15em]">{scenario.players} members</span>
                <div className={`text-4xl md:text-5xl font-heading font-black tracking-tighter ${
                  scenario.highlighted ? "text-primary" : "text-white"
                }`}>
                  {scenario.prize}
                </div>
                <span className="text-xs text-white/25 font-medium uppercase tracking-wider">Monthly Prize Pool</span>
              </div>

              <div className="w-full h-px bg-white/[0.05]" />

              <div className="flex items-center gap-2 text-accent">
                <span className="text-sm font-bold">{scenario.charity}</span>
                <span className="text-[10px] text-white/25 font-bold uppercase tracking-wider">to charity</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
