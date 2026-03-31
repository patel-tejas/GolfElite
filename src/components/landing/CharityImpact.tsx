"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";

const charities = [
  { name: "Global Giving", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=1" },
  { name: "Save the Children", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=2" },
  { name: "Red Cross", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=3" },
  { name: "WWF", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=4" },
  { name: "Water.org", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=5" },
];

export function CharityImpactSection() {
  const [count, setCount] = useState(124500);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-[#10b981] text-sm font-bold uppercase tracking-widest"
            >
              <Heart className="w-4 h-4 fill-current" />
              Emotional Hook
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-heading font-black text-white leading-[1.1]"
            >
              Your game <span className="text-gradient-green text-[#10b981]">makes a difference.</span>
            </motion.h2>

            <div className="space-y-6">
              {[
                { title: "Choose your charity", desc: "Select which cause your contribution supports." },
                { title: "Minimum 10% goes directly", desc: "A guaranteed portion of every dollar helps those in need." },
                { title: "Track your impact", desc: "See real-time data on how your membership is helping." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-black text-[#10b981] mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 glass-card border-green-500/10 bg-green-500/5 text-center flex flex-col items-center"
          >
            <div className="mb-12">
               <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest block mb-4">Total Donated So Far</span>
               <div className="text-5xl sm:text-6xl md:text-8xl font-heading font-black text-white tabular-nums tracking-tighter">
                 ${count.toLocaleString('en-US')}
               </div>
            </div>

            <div className="w-full h-px bg-white/5 mb-12" />

            <div className="space-y-8 w-full">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest block">Supported Partners</span>
              <div className="flex flex-wrap justify-center gap-8 opacity-50">
                 {charities.map((c, i) => (
                   <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center p-2">
                        <img src={c.logo} alt={c.name} className="w-full h-full object-contain filter invert opacity-50" />
                      </div>
                      <span className="text-[10px] text-zinc-600 uppercase font-black">{c.name}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
