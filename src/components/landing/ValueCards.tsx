"use client";

import { motion } from "framer-motion";
import { Dice4, TrendingUp, Heart } from "lucide-react";

const values = [
  {
    title: "Monthly Draws",
    description: "One entry every month. No extra effort.",
    icon: Dice4,
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    title: "Real Cash Rewards",
    description: "Win jackpots and tier-based prizes",
    icon: TrendingUp,
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    title: "Charity Impact",
    description: "Support causes with every subscription",
    icon: Heart,
    color: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-400",
  },
];

export function ValueCards() {
  return (
    <section className="py-24 bg-zinc-950/50 relative border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-10 rounded-[2.5rem] bg-linear-to-br ${v.color} border border-white/5 overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <v.icon className="w-48 h-48 -rotate-12 translate-x-12 -translate-y-12" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10`}>
                  <v.icon className={`w-8 h-8 ${v.iconColor}`} />
                </div>
                <h3 className="text-3xl font-heading font-black text-white">{v.title}</h3>
                <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
