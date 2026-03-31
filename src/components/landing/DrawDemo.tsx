"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export function DrawDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const myScores = [32, 28, 35, 30, 25];
  const drawNumbers = [10, 18, 25, 30, 40];
  const matches = [false, false, true, true, false];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (drawNumbers.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-premium-dark relative border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-4"
          >
            How the Draw Works
          </motion.h2>
          <p className="text-zinc-500 font-medium">Interactive visual demonstration</p>
        </div>

        <div className="max-w-4xl mx-auto glass-card flex flex-col p-8 md:p-16 border-white/5 gap-12">
          {/* User Scores */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Your Recent Top 5 Scores</h4>
            <div className="flex justify-center gap-2 sm:gap-4 md:gap-8">
              {myScores.map((score, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <motion.div 
                    animate={activeStep > i && matches[i] ? { scale: 1.1, borderColor: "var(--color-accent)" } : {}}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center font-heading font-black text-lg sm:text-2xl text-white shadow-2xl transition-colors duration-500"
                  >
                    {score}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center py-4 text-accent/50">
             <div className="w-px h-12 bg-linear-to-b from-accent/50 to-transparent" />
          </div>

          {/* Draw Numbers */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Draw Result Numbers</h4>
            <div className="flex justify-center gap-2 sm:gap-4 md:gap-8">
              {drawNumbers.map((num, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={activeStep > i ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center font-heading font-black text-lg sm:text-2xl text-accent shadow-2xl"
                  >
                    {num}
                  </motion.div>
                  
                  <AnimatePresence>
                    {activeStep > i && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`text-sm font-black uppercase tracking-tighter sm:text-xs flex items-center gap-1 ${matches[i] ? "text-green-400" : "text-zinc-600"}`}
                      >
                        {matches[i] ? (
                          <>
                            <Check className="w-4 h-4" /> Match!
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" /> Missed
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Result Highlight */}
          <AnimatePresence>
            {activeStep === drawNumbers.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 rounded-3xl bg-green-500/10 border border-green-500/20 text-center"
              >
                <h3 className="text-2xl font-heading font-black text-green-400">WINNER: 2 MATCHES!</h3>
                <p className="text-zinc-400 mt-2 font-medium">You’ve just won a Tier 3 prize — real cash deposited to your wallet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
