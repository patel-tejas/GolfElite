"use client";

import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ target, prefix = "", suffix = "", duration = 2 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
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
  }, [started, target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => setMounted(true), []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-premium-dark pt-20">
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: "oklch(0.45 0.12 180 / 0.15)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] rounded-full blur-[180px]"
          style={{ background: "oklch(0.65 0.15 25 / 0.12)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px]"
          style={{ background: "oklch(0.80 0.18 160 / 0.06)" }}
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [Math.random() * 100 + "%", "-10%"],
              x: [Math.random() * 100 + "%", (Math.random() * 100) + "%"],
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
            className="absolute"
          >
            <div className={`w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-primary/40' : i % 3 === 1 ? 'bg-accent/40' : 'bg-[var(--neon-mint)]/30'}`} />
          </motion.div>
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      <motion.div style={{ y, opacity }} className="container mx-auto relative z-10 px-4 py-24 md:py-32 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl mb-10"
        >
          <div className="relative">
            <Heart className="w-4 h-4 text-accent fill-accent/50" />
            <div className="absolute inset-0 animate-ping">
              <Heart className="w-4 h-4 text-accent/30 fill-accent/20" />
            </div>
          </div>
          <span className="text-sm font-semibold text-white/80 tracking-wide">Every Score Makes an Impact</span>
        </motion.div>

        {/* Main headline — emotion-driven, charity-first */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] font-heading font-black tracking-tight leading-[0.92] text-white mb-8"
        >
          Play Your Game.
          <br />
          <span className="text-gradient-aurora">Change&nbsp;Lives.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-medium mb-14 leading-relaxed"
        >
          Subscribe. Submit your scores. Win real cash in monthly draws—while a{" "}
          <span className="text-accent font-bold">guaranteed 10%</span> goes directly to the charity of your choice.
        </motion.p>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-10"
        >
          <Link href="/signup" className="group" id="hero-cta">
            <Button size="xl" className="h-16 sm:h-[4.5rem] px-10 sm:px-14 text-base sm:text-lg font-bold btn-premium rounded-2xl group relative shadow-[0_0_60px_-15px_rgba(255,120,80,0.4)]">
              <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform fill-white/20" />
              Start Making an Impact
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>

          {/* Social proof stats */}
          <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-accent fill-accent/40" />
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tighter">
                  <AnimatedCounter target={124500} prefix="$" duration={2.5} />
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mt-1">Donated to Charity</span>
            </div>
            
            <div className="w-px h-8 bg-white/10" />

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tighter">
                  <AnimatedCounter target={850} suffix="+" duration={2} />
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mt-1">Active Members</span>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[var(--neon-mint)]" />
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tighter">
                  <AnimatedCounter target={45000} prefix="$" duration={2.2} />
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mt-1">Monthly Prizes</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with morphing shape */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
