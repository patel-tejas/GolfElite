"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Trophy, Target, Heart, ArrowRight, Zap, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-grain selection:bg-primary/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur-xl">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2.5 font-heading font-black text-xl tracking-tighter">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              FAIRWAY<span className="text-primary tracking-normal font-medium">IMPACT</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link 
              href="/login" 
              className={buttonVariants({ variant: "ghost", className: "font-medium hidden sm:flex" })}
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className={buttonVariants({ className: "btn-premium px-6 font-semibold" })}
            >
              Join the Club
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {/* Luxury Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--primary-foreground),transparent_60%)] opacity-30 pointer-events-none" />
          
          <div className="container px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Star className="w-3 h-3 fill-current" />
              The Future of Golf Giving
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-8xl font-heading font-black tracking-tight leading-[0.95] mb-8"
            >
              PLAY FOR THE <br />
              <span className="text-gradient-gold">ULTIMATE IMPACT</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground/80 font-medium mb-12 leading-relaxed"
            >
              Premium score tracking meet charity legends. Support local causes, track your progress, and get entered into exclusive monthly draws.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <Link 
                href="/signup" 
                className={buttonVariants({ size: "lg", className: "h-14 px-10 btn-premium text-lg group" })}
              >
                Join Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-10 border-border/40 hover:bg-secondary text-lg font-medium backdrop-blur-sm"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Live Impact Ticker */}
        <div className="bg-primary/5 border-y border-primary/10 py-5 overflow-hidden">
          <div className="flex whitespace-nowrap animate-infinite-scroll">
             {[...Array(2)].map((_, i) => (
               <div key={i} className="flex gap-16 items-center px-8">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary fill-current" />
                    <span className="font-heading font-black text-xl italic uppercase">Next Draw: 12 Days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-primary fill-current" />
                    <span className="font-heading font-black text-xl italic uppercase">Total Raised: <span className="text-gradient-gold">$124,500</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary fill-current" />
                    <span className="font-heading font-black text-xl italic uppercase">Recent Winner: J. Smith (42 Pts)</span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Features Split Grid */}
        <section className="container py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Main Feature - Track */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-12 lg:col-span-7 glass-panel p-8 md:p-12 rounded-[2rem] border-glow-emerald relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-64 h-64 -rotate-12 translate-x-20 -translate-y-20" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold">Rolling Top 5 System.</h3>
                <p className="text-lg text-muted-foreground/80 max-w-lg leading-relaxed">
                  Log your scores effortlessly. Our intelligent system tracks your top 5 most recent Stableford entries to determine your draw eligibility.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                   {[42, 38, 45, 39, 41].map((s, i) => (
                     <div key={i} className="w-14 h-14 rounded-full bg-background border border-border/50 flex items-center justify-center font-heading font-black text-xl text-primary shadow-inner">
                       {s}
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>

            {/* Sub Feature - Give */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-6 lg:col-span-5 glass-panel p-10 rounded-[2rem] border-border/20 flex flex-col justify-between"
            >
               <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-3xl font-heading font-bold">Purpose in Every Putt.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join a community dedicated to something bigger. A portion of every subscription fuels vetted charities globally.
                </p>
              </div>
              <div className="pt-10 flex items-end justify-between">
                <div>
                  <span className="block text-4xl font-heading font-black text-gradient-gold">100%</span>
                  <span className="text-sm font-bold opacity-60 uppercase tracking-widest">Transparency</span>
                </div>
                <Link href="/charities" className="text-primary font-bold inline-flex items-center hover:underline group">
                  Charities <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/5 py-12 bg-background/50">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground font-medium">
            © 2026 FairwayImpact Platform. Built for the elite, dedicated to the cause.
          </p>
        </div>
      </footer>

      {/* Infinite Scroll Animation */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
