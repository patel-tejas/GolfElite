"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Target } from "lucide-react";

export function WinningPotential() {
  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            Winning Potential
          </motion.h2>
          <p className="text-zinc-500 font-medium italic">People LOVE imagining winnings</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { players: 500, prize: "$9,000", label: "Monthly Jackpot", icon: Users },
             { players: 1000, prize: "$18,000", label: "Monthly Jackpot", icon: DollarSign, highlighted: true },
             { players: 2500, prize: "$45,000", label: "Monthly Jackpot", icon: Target },
           ].map((scenario, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className={`p-10 rounded-[2.5rem] border ${scenario.highlighted ? "border-accent bg-accent/5 ring-4 ring-accent/10" : "border-white/5 bg-white/[0.02]"} flex flex-col items-center justify-between gap-8 group`}
             >
               <div className={`w-14 h-14 rounded-2xl ${scenario.highlighted ? "bg-accent/20" : "bg-white/5"} flex items-center justify-center`}>
                 <scenario.icon className={`w-7 h-7 ${scenario.highlighted ? "text-accent" : "text-zinc-500"}`} />
               </div>

               <div className="space-y-2">
                 <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">If {scenario.players} players join</span>
                 <div className={`text-4xl md:text-5xl font-heading font-black ${scenario.highlighted ? "text-accent" : "text-white"} tracking-tight`}>
                   {scenario.prize}
                 </div>
                 <span className="text-zinc-600 font-medium uppercase tracking-tighter block">{scenario.label}</span>
               </div>

               <div className="w-full h-px bg-white/5" />
               <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Calculated estimate</span>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
