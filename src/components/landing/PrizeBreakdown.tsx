"use client";

import { motion } from "framer-motion";
import { Trophy, Users, TrendingUp, Shield } from "lucide-react";

const prizes = [
  { label: "Jackpot (5-Match)", percent: 40, color: "from-accent to-accent/70", icon: Trophy, desc: "Match all 5 numbers" },
  { label: "4-Match Tier", percent: 35, color: "from-primary to-primary/70", icon: TrendingUp, desc: "Match 4 of 5 numbers" },
  { label: "3-Match Tier", percent: 25, color: "from-[var(--neon-mint)] to-[var(--neon-mint)]/70", icon: Users, desc: "Match 3 of 5 numbers" },
];

export function PrizeBreakdown() {
  return (
    <section className="py-28 md:py-36 bg-premium-dark relative overflow-hidden" id="prizes">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Shield className="w-3.5 h-3.5 text-accent" />
            Full Transparency
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-4 tracking-tight"
          >
            Prize Pool{" "}
            <span className="text-gradient-aurora">Breakdown</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 font-medium max-w-lg mx-auto text-lg"
          >
            90% of subscriptions go to the prize pool. Here&apos;s how it&apos;s distributed, transparently.
          </motion.p>
        </div>

        {/* Visual Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex w-full h-5 rounded-full overflow-hidden shadow-2xl mb-12 origin-left"
        >
          {prizes.map((p, i) => (
            <div
              key={i}
              className={`h-full bg-gradient-to-r ${p.color} relative overflow-hidden border-r border-black/30 last:border-r-0`}
              style={{ width: `${p.percent}%` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>

        {/* Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prizes.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-2 group text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${p.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <p.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-5xl font-heading font-black text-white mb-2 tracking-tighter">{p.percent}%</div>
              <div className="text-sm font-bold text-white/60 mb-2">{p.label}</div>
              <p className="text-xs text-white/30 font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Example Pool */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 md:p-10 rounded-[2rem] bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/[0.06] text-center"
        >
          <p className="text-xl md:text-2xl font-medium text-white/60">
            With 1,000 members:{" "}
            <span className="text-gradient-aurora text-3xl md:text-4xl font-black">$45,000</span>{" "}
            prize pool
          </p>
          <p className="text-white/25 mt-3 text-sm font-bold uppercase tracking-[0.15em]">
            Real money. Real impact. Every month.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
