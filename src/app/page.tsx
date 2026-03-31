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
import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-[#0b1120]/90 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl' : 'bg-transparent'}`}>
        <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Heart className="h-5 w-5 text-white fill-white/30" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity" />
            </div>
            <div className="flex flex-col -space-y-0.5">
              <span className="text-xl font-heading font-black tracking-tight text-white leading-none">FAIRWAY</span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-white/30 uppercase">Play • Win • Give</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/40">
              <a href="#how-it-works" className="hover:text-white transition-colors duration-300">How It Works</a>
              <a href="#prizes" className="hover:text-white transition-colors duration-300">Rewards</a>
              <a href="#charity-impact" className="hover:text-white transition-colors duration-300">Impact</a>
              <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
            </nav>
            <div className="h-6 w-px bg-white/[0.06] hidden md:block" />
            <ModeToggle />
            <Link
              href="/login"
              className={buttonVariants({ variant: "ghost", className: "text-white/40 hover:text-white font-semibold text-sm hidden sm:flex" })}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ className: "btn-premium px-7 h-11 font-bold rounded-xl text-sm" })}
            >
              Get Started
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 inset-x-0 z-40 bg-[#0b1120]/95 backdrop-blur-2xl border-b border-white/[0.05] md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Rewards", href: "#prizes" },
                { label: "Impact", href: "#charity-impact" },
                { label: "Pricing", href: "#pricing" },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/[0.04] transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  return (
    <div className="dark flex flex-col min-h-screen bg-premium-dark selection:bg-primary/30">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <div id="how-it-works">
          <HowItWorks />
        </div>

        <ValueCards />

        <CharityImpactSection />

        <div id="prizes">
          <PrizeBreakdown />
        </div>

        <DrawDemo />

        <ComparisonTable />

        <WinningPotential />

        <MonthlyFlow />

        <div id="pricing">
          <PricingSection />
        </div>

        <FAQSection />

        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-16 bg-[#070b14]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3 opacity-40 hover:opacity-80 transition-opacity duration-500 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 text-white fill-white/30" />
              </div>
              <span className="text-sm font-heading font-bold tracking-tight text-white">FAIRWAY</span>
            </div>

            <div className="flex items-center gap-8 text-xs text-white/20 font-medium">
              <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/50 transition-colors">Support</a>
            </div>

            <p className="text-[10px] text-white/15 font-medium text-center max-w-md">
              © 2026 Fairway Global Platforms. Play responsibly. All charity contributions are verified and auditable.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
