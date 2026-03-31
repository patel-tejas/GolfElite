'use client'

import { motion } from 'framer-motion'
import { Coins, Landmark, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'

interface WinningsBannerProps {
  totalWon?: number
  currentBalance?: number
  status?: 'pending' | 'paid' | 'none'
}

export function WinningsBanner({ totalWon = 0, currentBalance = 0, status = 'none' }: WinningsBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm"
    >
      {/* Subtle depth decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-50 dark:bg-zinc-800/20 rounded-bl-full -mr-20 -mt-20 pointer-events-none transition-all group-hover:scale-110 duration-700" />
      
      <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        {/* Main Winnings Metric */}
        <div className="flex items-center gap-6 md:gap-10">
          <div className="relative group">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <Coins className="h-10 w-10 md:h-12 md:w-12 text-white dark:text-zinc-900" />
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-black" />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                LIFETIME WINNINGS
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-black text-zinc-400">£</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none"
              >
                {totalWon.toLocaleString()}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="flex flex-wrap items-center gap-10 md:gap-16 w-full lg:w-auto p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              <Landmark className="h-4 w-4 text-zinc-400" />
              Available for Payout
            </div>
            <div className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              £{currentBalance.toLocaleString()}
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-zinc-200 dark:bg-zinc-700" />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-zinc-400" />
              Identity Status
            </div>
            <div className="flex items-center gap-2 mt-1">
              {status === 'pending' ? (
                <div className="px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">Active Claims</span>
                </div>
              ) : status === 'paid' ? (
                <div className="px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Settled</span>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Verified Participant</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
}
