"use client";

import { motion } from "framer-motion";
import { UserPlus, PlusCircle, Trophy } from "lucide-react";

const steps = [
  {
    title: "Subscribe",
    description: "Join with a monthly plan and unlock access",
    icon: UserPlus,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Enter Your Scores",
    description: "Add your last 5 golf scores",
    icon: PlusCircle,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Win Monthly Rewards",
    description: "Match numbers and win cash prizes",
    icon: Trophy,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            How It Works
          </motion.h2>
          <p className="text-zinc-500 font-medium">Simple steps to success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-12" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center p-8 glass-card border-white/5"
            >
              <div className={`w-20 h-20 rounded-3xl ${step.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <step.icon className={`w-10 h-10 ${step.color}`} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{step.description}</p>
              
              {/* Step Number Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-zinc-600">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
