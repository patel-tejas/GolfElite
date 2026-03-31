"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export function ComparisonTable() {
  const rows = [
    { feature: "Access to monthly cash draws", traditional: false, platform: true },
    { feature: "Support for global charities", traditional: false, platform: true },
    { feature: "Digital clubhouse dashboard", traditional: "Maybe", platform: true },
    { feature: "Real prizes for skill", traditional: false, platform: true },
    { feature: "Exclusive member community", traditional: "Social only", platform: "Digital & Social" },
  ];

  return (
    <section className="py-24 bg-zinc-950/50 border-y border-white/5 relative items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            Why This Is Different
          </motion.h2>
          <p className="text-zinc-500 font-medium">Comparing the status quo to the future</p>
        </div>

        <div className="max-w-4xl mx-auto glass-card overflow-hidden border-white/5">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-6 md:p-8 text-xs font-bold uppercase tracking-widest text-zinc-500">Feature</th>
                <th className="p-6 md:p-8 text-xs font-bold uppercase tracking-widest text-zinc-500 text-center">Traditional Golf</th>
                <th className="p-6 md:p-8 text-xs font-bold uppercase tracking-widest text-accent text-center bg-accent/5">This Platform</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                >
                  <td className="p-6 md:p-8 font-medium text-white">{row.feature}</td>
                  <td className="p-6 md:p-8 text-center text-zinc-500 font-semibold italic">
                    {typeof row.traditional === "boolean" ? (row.traditional ? "✓" : <X className="w-5 h-5 mx-auto text-zinc-800" />) : row.traditional}
                  </td>
                  <td className="p-6 md:p-8 text-center text-accent font-black bg-accent/2">
                    {typeof row.platform === "boolean" ? (row.platform ? <Check className="w-5 h-5 mx-auto text-accent" /> : "✗") : row.platform}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
