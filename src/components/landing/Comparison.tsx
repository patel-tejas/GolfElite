"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

export function ComparisonTable() {
  const rows = [
    { feature: "Monthly cash prize draws", traditional: false, platform: true },
    { feature: "Direct charity contributions", traditional: false, platform: true },
    { feature: "Real-time impact dashboard", traditional: false, platform: true },
    { feature: "Skill-based rewards", traditional: false, platform: true },
    { feature: "Community & belonging", traditional: "Limited", platform: "Global Digital" },
    { feature: "Transparent fee structure", traditional: false, platform: true },
  ];

  return (
    <section className="py-28 md:py-36 bg-premium-dark relative border-y border-white/[0.03]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Why Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-4 tracking-tight"
          >
            This Is{" "}
            <span className="text-gradient-aurora">Different</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] bg-white/[0.02] border border-white/[0.06] overflow-hidden backdrop-blur-xl"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="p-5 md:p-7 text-xs font-bold uppercase tracking-[0.15em] text-white/30">Feature</th>
                <th className="p-5 md:p-7 text-xs font-bold uppercase tracking-[0.15em] text-white/30 text-center">Traditional</th>
                <th className="p-5 md:p-7 text-xs font-bold uppercase tracking-[0.15em] text-primary text-center bg-primary/[0.03]">This Platform</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-5 md:p-7 font-medium text-white/70 text-sm">{row.feature}</td>
                  <td className="p-5 md:p-7 text-center">
                    {typeof row.traditional === "boolean" ? (
                      row.traditional ? (
                        <Check className="w-4 h-4 mx-auto text-white/30" />
                      ) : (
                        <X className="w-4 h-4 mx-auto text-white/15" />
                      )
                    ) : (
                      <span className="text-xs text-white/30 font-medium">{row.traditional}</span>
                    )}
                  </td>
                  <td className="p-5 md:p-7 text-center bg-primary/[0.02]">
                    {typeof row.platform === "boolean" ? (
                      row.platform ? (
                        <div className="w-6 h-6 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                      ) : (
                        <X className="w-4 h-4 mx-auto text-white/20" />
                      )
                    ) : (
                      <span className="text-xs text-primary font-bold">{row.platform}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
