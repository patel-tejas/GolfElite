"use client";

import { motion } from "framer-motion";

const prizes = [
  { label: "Jackpot", percent: 40, color: "bg-accent", icon: "🏆" },
  { label: "4-Match", percent: 35, color: "bg-blue-500", icon: "💰" },
  { label: "3-Match", percent: 25, color: "bg-green-500", icon: "💸" },
];

export function PrizeBreakdown() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            Prize Breakdown
          </motion.h2>
          <p className="text-zinc-500 font-medium">Transparency in rewards</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Visual Bar Section */}
          <div className="flex w-full h-16 rounded-3xl overflow-hidden shadow-2xl">
            {prizes.map((p, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                whileInView={{ width: `${p.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className={`h-full ${p.color} relative overflow-hidden group border-r border-black/20 last:border-r-0`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            {prizes.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 glass-card border-white/5 flex flex-col items-center sm:items-start"
              >
                <div className={`w-12 h-12 rounded-xl ${p.color}/10 border border-${p.color}/20 flex items-center justify-center text-2xl mb-6`}>
                  {p.icon}
                </div>
                <div className="flex items-center gap-3 mb-2">
                   <span className="text-4xl font-heading font-black text-white">{p.percent}%</span>
                   <span className="text-zinc-500 font-bold uppercase tracking-wider">{p.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Example Calculation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] bg-linear-to-br from-[#1a1a1a] to-black border border-accent/20 text-center"
          >
            <p className="text-2xl font-medium text-zinc-300">
               “1,000 players = <span className="text-gradient-gold text-4xl font-black italic">$45,000</span> prize pool”
            </p>
            <p className="text-zinc-500 mt-4 text-sm font-bold uppercase tracking-widest">
               Real money. Real impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
