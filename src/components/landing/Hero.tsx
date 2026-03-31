"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [randomPositions, setRandomPositions] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setRandomPositions([...Array(6)].map(() => Math.random() * 100));
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-premium-dark pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 text-center flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Floating Elements (Cards/Tokens) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && randomPositions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%", x: `${pos}%`, opacity: 0 }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 0.3, 0],
              rotate: [0, 45, 90]
            }}
            transition={{
              duration: 15 + (pos % 10),
              repeat: Infinity,
              ease: "linear",
              delay: (pos % 20),
            }}
            className="absolute w-24 h-32 glass-card opacity-20 border-white/5"
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 px-4 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>The Ultimate Digital Clubhouse</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight leading-[0.9] text-white mb-8"
        >
          Play Golf.<br />
          Win <span className="text-gradient-gold">Big.</span><br />
          Give <span className="text-gradient-green text-[#10b981]">Back.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-medium mb-12 leading-relaxed"
        >
          Enter your golf scores, participate in monthly draws, and win real money — while supporting charities you care about.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/signup" className="group">
            <Button size="xl" className="h-16 px-12 text-lg font-bold btn-premium rounded-2xl group shadow-[0_0_50px_-12px_rgba(180,150,80,0.5)]">
              Join Monthly Draw
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          
          <div className="flex items-center gap-8 pt-4 sm:pt-0">
             <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-bold text-white">$12k+</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Total Winnings</span>
             </div>
             <div className="w-px h-8 bg-white/10 hidden sm:block" />
             <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-bold text-white">850+</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Active Players</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500"
      >
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
