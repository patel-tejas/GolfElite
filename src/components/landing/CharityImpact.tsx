"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Heart, Globe, Sparkles, ArrowRight } from "lucide-react";

const impactStats = [
  { label: "Charities Supported", value: 12, suffix: "+", color: "text-primary" },
  { label: "Countries Reached", value: 8, suffix: "", color: "text-accent" },
  { label: "Lives Impacted", value: 2400, suffix: "+", color: "text-[var(--neon-mint)]" },
];

const causes = [
  { name: "Clean Water", icon: "💧", impact: "$18,200" },
  { name: "Education", icon: "📚", impact: "$24,500" },
  { name: "Environment", icon: "🌱", impact: "$31,800" },
  { name: "Healthcare", icon: "🏥", impact: "$22,100" },
  { name: "Youth Sports", icon: "⚽", impact: "$27,900" },
];

function AnimatedCounter({ target, duration = 2.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function CharityImpactSection() {
  const [totalDonated, setTotalDonated] = useState(124500);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalDonated((prev) => prev + Math.floor(Math.random() * 15 + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 md:py-40 bg-premium-dark relative overflow-hidden" id="charity-impact">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[200px]"
          style={{ background: "oklch(0.45 0.10 180 / 0.08)" }}
        />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{ background: "oklch(0.65 0.15 25 / 0.06)" }}
        />
      </div>

      <div className="container mx-auto relative z-10 px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Emotional storytelling */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.15em]"
            >
              <Heart className="w-4 h-4 fill-current heartbeat" />
              This Is Why We Exist
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.05] tracking-tight"
            >
              Your passion
              <br />
              <span className="text-gradient-aurora">creates change.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/45 text-lg leading-relaxed max-w-lg"
            >
              Every subscription directly funds causes that matter. You choose where your impact goes — clean water, education, healthcare, or any partner charity.
            </motion.p>

            <div className="space-y-6 pt-2">
              {[
                { title: "You choose your charity", desc: "Select a cause close to your heart from our verified partners." },
                { title: "Guaranteed 10% contribution", desc: "Every dollar, every month — no exceptions, no fine print." },
                { title: "Real-time impact tracking", desc: "Watch your dashboard as your contribution grows and changes lives." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="mt-1 w-7 h-7 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 group-hover:scale-105 transition-all">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-0.5">{item.title}</h4>
                    <p className="text-white/35 text-sm font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Impact visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Hearthbeat glow behind the card */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-3xl impact-pulse" />

            <div className="relative p-10 md:p-14 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-[4rem]" />

              {/* Total donated counter */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-5">
                  <Heart className="w-3.5 h-3.5 text-accent fill-accent/50 heartbeat" />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Live Impact Counter</span>
                </div>
                <div className="text-6xl md:text-7xl font-heading font-black text-white tabular-nums tracking-tighter">
                  ${totalDonated.toLocaleString()}
                </div>
                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mt-3">Total Donated to Date</p>
              </div>

              {/* Impact stats row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {impactStats.map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                    <div className={`text-2xl font-black ${stat.color} tracking-tighter`}>
                      <AnimatedCounter target={stat.value} />
                      {stat.suffix}
                    </div>
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.15em]">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-white/[0.06] mb-8" />

              {/* Cause tags */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] block text-center">Active Causes</span>
                <div className="flex flex-wrap justify-center gap-3">
                  {causes.map((cause, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all cursor-default group"
                    >
                      <span className="text-base">{cause.icon}</span>
                      <span className="text-xs font-semibold text-white/60 group-hover:text-white/90 transition-colors">{cause.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
