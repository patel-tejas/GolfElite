"use client";

import { motion } from "framer-motion";
import { Heart, TrendingUp, Sparkles } from "lucide-react";

const values = [
  {
    title: "Monthly Draws",
    description: "Enter once per month, automatically. Your scores become your winning numbers — no extra effort needed.",
    icon: Sparkles,
    gradient: "from-primary/15 to-primary/5",
    borderHover: "hover:border-primary/30",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    title: "Real Cash Prizes",
    description: "Win jackpots sorted by match tiers. Real money deposited directly. No points, no gimmicks.",
    icon: TrendingUp,
    gradient: "from-accent/15 to-accent/5",
    borderHover: "hover:border-accent/30",
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
  },
  {
    title: "Charity Impact",
    description: "10% of every subscription goes directly to verified charities you choose. Play with purpose.",
    icon: Heart,
    gradient: "from-[var(--neon-mint)]/15 to-[var(--neon-mint)]/5",
    borderHover: "hover:border-[var(--neon-mint)]/30",
    iconColor: "text-[var(--neon-mint)]",
    iconBg: "bg-[var(--neon-mint)]/10",
  },
];

export function ValueCards() {
  return (
    <section className="py-24 md:py-32 bg-premium-dark relative overflow-hidden border-y border-white/[0.03]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight mb-4"
          >
            Why Members <span className="text-gradient-aurora">Love This</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/35 font-medium max-w-md mx-auto"
          >
            A platform where winning and giving are never separate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-10 rounded-[2rem] bg-gradient-to-br ${v.gradient} border border-white/[0.06] ${v.borderHover} overflow-hidden group transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Background watermark */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity translate-x-8 -translate-y-8">
                <v.icon className="w-48 h-48 -rotate-12" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className={`w-14 h-14 rounded-2xl ${v.iconBg} border border-white/[0.06] flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <v.icon className={`w-7 h-7 ${v.iconColor}`} />
                </div>
                <h3 className="text-2xl font-heading font-black text-white tracking-tight">{v.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
