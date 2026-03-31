"use client";

import { motion } from "framer-motion";
import { UserPlus, Calendar, Sparkles, Trophy, RefreshCcw, Heart } from "lucide-react";

const steps = [
  { title: "Subscribe", subtitle: "Monthly plan", icon: UserPlus, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { title: "Submit", subtitle: "Your 5 scores", icon: Calendar, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
  { title: "Draw", subtitle: "Monthly event", icon: Sparkles, color: "text-[var(--soft-lavender)]", bg: "bg-[var(--soft-lavender)]/10", border: "border-[var(--soft-lavender)]/20" },
  { title: "Win", subtitle: "Real cash", icon: Trophy, color: "text-[var(--neon-mint)]", bg: "bg-[var(--neon-mint)]/10", border: "border-[var(--neon-mint)]/20" },
  { title: "Give", subtitle: "Charity impact", icon: Heart, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
];

export function MonthlyFlow() {
  return (
    <section className="py-24 md:py-32 bg-premium-dark relative border-y border-white/[0.03]">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight"
          >
            Your Monthly{" "}
            <span className="text-gradient-aurora">Cycle</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/35 font-medium text-sm uppercase tracking-[0.15em]"
          >
            Subscribe → Score → Draw → Win → Give → Repeat
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative max-w-4xl mx-auto">
          {/* Connecting gradient line */}
          <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-primary/20 via-accent/20 to-[var(--neon-mint)]/20" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center gap-4 group"
            >
              <div className={`w-[4.5rem] h-[4.5rem] rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-base font-bold text-white tracking-tight">{step.title}</span>
                <span className="text-[10px] text-white/25 font-medium uppercase tracking-wider">{step.subtitle}</span>
              </div>
              {/* Vertical connector for mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden w-px h-6 bg-white/[0.06]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
