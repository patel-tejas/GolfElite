"use client";

import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ValueCards } from "@/components/landing/ValueCards";
import { PrizeBreakdown } from "@/components/landing/PrizeBreakdown";
import { DrawDemo } from "@/components/landing/DrawDemo";
import { CharityImpactSection } from "@/components/landing/CharityImpact";
import { ComparisonTable } from "@/components/landing/Comparison";
import { WinningPotential } from "@/components/landing/WinningPotential";
import { MonthlyFlow } from "@/components/landing/MonthlyFlow";
import { PricingSection } from "@/components/landing/Pricing";
import { FAQSection } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ModeToggle } from "@/components/mode-toggle";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black selection:bg-accent/30">
      {/* Premium Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3 font-heading font-black text-2xl tracking-tighter group cursor-pointer">
            <div className="bg-accent p-2 rounded-xl shadow-[0_0_20px_rgba(180,150,80,0.3)] transition-all group-hover:scale-110">
              <Trophy className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-white">
              GOLF<span className="text-accent tracking-normal font-medium">PRESTIGE</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
               <a href="#how-it-works" className="hover:text-accent transition-colors">Process</a>
               <a href="#prizes" className="hover:text-accent transition-colors">Rewards</a>
               <a href="#pricing" className="hover:text-accent transition-colors">Pricing</a>
            </div>
            <div className="h-6 w-px bg-white/10 hidden md:block" />
            <ModeToggle />
            <Link 
              href="/login" 
              className={buttonVariants({ variant: "ghost", className: "text-zinc-400 hover:text-white font-bold uppercase tracking-widest text-xs hidden sm:flex" })}
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className={buttonVariants({ className: "btn-premium px-8 h-12 font-black rounded-xl" })}
            >
              Join the Club
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        
        <div id="how-it-works">
          <HowItWorks />
        </div>
        
        <ValueCards />
        
        <div id="prizes">
          <PrizeBreakdown />
        </div>
        
        <DrawDemo />
        
        <CharityImpactSection />
        
        <ComparisonTable />
        
        <WinningPotential />
        
        <MonthlyFlow />
        
        <div id="pricing">
          <PricingSection />
        </div>
        
        <FAQSection />
        
        <FinalCTA />
      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-white/5 py-12 bg-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 font-heading font-black text-xl tracking-tighter opacity-50 grayscale">
              <Trophy className="h-5 w-5" />
              <span>GOLFPRESTIGE</span>
            </div>
            <p className="text-xs text-zinc-600 font-bold uppercase tracking-[0.2em] max-w-md">
              © 2026 GolfPrestige Global Platforms. Built for the elite, dedicated to the cause. High Stakes, High Impact.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
