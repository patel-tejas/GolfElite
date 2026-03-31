"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, X, Sparkles } from "lucide-react";

export function DrawDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const myScores = [32, 28, 35, 30, 25];
  const drawNumbers = [10, 18, 25, 30, 40];
  const matches = [false, false, true, true, false];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (drawNumbers.length + 2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const matchCount = matches.filter(Boolean).length;

  return (
    <section className="py-28 md:py-36 bg-premium-dark relative overflow-hidden border-y border-white/[0.03]">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--neon-mint)]" />
            Live Demo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-4 tracking-tight"
          >
            See How You{" "}
            <span className="text-gradient-aurora">Win</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 font-medium max-w-md mx-auto text-lg"
          >
            Watch a real-time draw simulation. Your scores match the draw — you win.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto p-8 md:p-14 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-10">
          {/* User Scores */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Your Rolling Top 5</h4>
            <div className="flex justify-center gap-3 sm:gap-5">
              {myScores.map((score, i) => (
                <motion.div
                  key={i}
                  animate={
                    activeStep > i && matches[i]
                      ? { scale: 1.1, borderColor: "oklch(0.72 0.14 180)" }
                      : { scale: 1 }
                  }
                  className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl bg-white/[0.04] border-2 border-white/[0.08] flex items-center justify-center font-heading font-black text-xl sm:text-2xl text-white transition-colors duration-500"
                >
                  {score}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Comparison arrow */}
          <div className="flex justify-center">
            <div className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>

          {/* Draw Numbers */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Draw Result</h4>
            <div className="flex justify-center gap-3 sm:gap-5">
              {drawNumbers.map((num, i) => (
                <div key={i} className="flex flex-col items-center gap-2.5">
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -90 }}
                    animate={
                      activeStep > i
                        ? { scale: 1, opacity: 1, rotate: 0 }
                        : { scale: 0, opacity: 0, rotate: -90 }
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl border-2 flex items-center justify-center font-heading font-black text-xl sm:text-2xl shadow-2xl ${
                      matches[i]
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-white/[0.06] border-white/[0.12] text-white/60"
                    }`}
                  >
                    {num}
                  </motion.div>

                  <AnimatePresence>
                    {activeStep > i && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                          matches[i] ? "text-primary" : "text-white/20"
                        }`}
                      >
                        {matches[i] ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Match!
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5" /> Miss
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <AnimatePresence>
            {activeStep >= drawNumbers.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center"
              >
                <h3 className="text-2xl font-heading font-black text-primary mb-1">
                  🎉 {matchCount} MATCHES — YOU WIN!
                </h3>
                <p className="text-white/40 text-sm font-medium">
                  Real cash deposited directly to your wallet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
