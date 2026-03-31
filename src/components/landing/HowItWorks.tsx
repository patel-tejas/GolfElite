"use client";

import { motion } from "framer-motion";
import { Heart, Zap, DollarSign, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Subscribe",
    description: "Join with a simple monthly plan. Your subscription fuels the prize pool and charity fund simultaneously.",
    icon: Heart,
    gradient: "from-[var(--primary)] to-[var(--neon-mint)]",
    iconBg: "bg-primary/10 border-primary/20",
    iconColor: "text-primary",
  },
  {
    number: "02",
    title: "Submit Scores",
    description: "Log your recent 5 rounds. Your rolling average becomes your unique entry — your scorecard, your lottery ticket.",
    icon: Zap,
    gradient: "from-[var(--accent)] to-[var(--warm-amber)]",
    iconBg: "bg-accent/10 border-accent/20",
    iconColor: "text-accent",
  },
  {
    number: "03",
    title: "Win & Give",
    description: "When drawn numbers match yours, you win real cash. No matter what, 10% of every dollar goes to your chosen charity.",
    icon: DollarSign,
    gradient: "from-[var(--neon-mint)] to-[var(--primary)]",
    iconBg: "bg-[var(--neon-mint)]/10 border-[var(--neon-mint)]/20",
    iconColor: "text-[var(--neon-mint)]",
  },
];

export function HowItWorks() {
  return (
    <section className="py-28 md:py-36 bg-premium-dark relative overflow-hidden">
      {/* Subtle top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-transparent" />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Zap className="w-3.5 h-3.5 text-accent" />
            Simple Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-5 tracking-tight"
          >
            Three Steps to{" "}
            <span className="text-gradient-aurora">Impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 font-medium max-w-lg mx-auto text-lg"
          >
            No complexity. No hidden fees. Just play, win, and make a difference.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-primary/30 via-accent/30 to-[var(--neon-mint)]/30" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 group"
            >
              <div className="h-full p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-2">
                {/* Step number */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${step.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                  </div>
                  <span className="text-5xl font-heading font-black text-white/[0.04] group-hover:text-white/[0.08] transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-heading font-black text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium text-[15px]">{step.description}</p>

                {/* Bottom accent line */}
                <div className="mt-8 h-1 w-12 rounded-full bg-gradient-to-r opacity-40 group-hover:opacity-100 group-hover:w-20 transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, var(--primary), var(--accent))` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
