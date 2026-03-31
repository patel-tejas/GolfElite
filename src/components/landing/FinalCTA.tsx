"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-24 bg-premium-dark relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
           animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto relative z-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex justify-center gap-8 text-zinc-500 mb-8"
           >
              <Trophy className="w-8 h-8" />
              <Target className="w-8 h-8 opacity-50" />
              <Heart className="w-8 h-8" />
           </motion.div>

           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-8xl font-heading font-black text-white leading-[0.95] tracking-tight"
           >
             Start playing.<br />
             Start winning.<br />
             <span className="text-gradient-gold italic">Start giving.</span>
           </motion.h2>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="pt-10 flex flex-col items-center gap-8"
           >
             <Link href="/signup">
                <Button size="xl" className="h-20 px-16 text-2xl font-black btn-premium rounded-3xl group shadow-[0_0_50px_-10px_rgba(180,150,80,0.6)]">
                  Join Now
                  <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-3 transition-transform" />
                </Button>
             </Link>
             <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">
               Join 850+ players building the future of golf giving
             </p>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
