"use client";

import { motion } from "framer-motion";
import { UserPlus, Calendar, Dice5, Trophy, RefreshCcw } from "lucide-react";

const steps = [
  { title: "Join", icon: UserPlus, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Enter Scores", icon: Calendar, color: "text-accent", bg: "bg-accent/10" },
  { title: "Monthly Draw", icon: Dice5, color: "text-purple-500", bg: "bg-purple-500/10" },
  { title: "Win", icon: Trophy, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Repeat", icon: RefreshCcw, color: "text-zinc-500", bg: "bg-zinc-500/10" },
];

export function MonthlyFlow() {
  return (
    <section className="py-24 bg-zinc-950/50 border-y border-white/5 relative items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            Monthly Flow
          </motion.h2>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">The lifecycle of a member</p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-white/5 to-transparent -translate-y-6" />
          
          {steps.map((step, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="relative z-10 flex flex-col items-center gap-6"
             >
               <div className={`w-16 h-16 rounded-2xl ${step.bg} border border-white/5 flex items-center justify-center shadow-2xl backdrop-blur-sm group hover:scale-110 transition-transform`}>
                 <step.icon className={`w-8 h-8 ${step.color}`} />
               </div>
               <div className="flex flex-col items-center gap-1">
                 <span className="text-lg font-bold text-white tracking-tight">{step.title}</span>
                 {i < steps.length - 1 && (
                    <div className="md:hidden w-px h-8 bg-white/5" />
                 )}
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
