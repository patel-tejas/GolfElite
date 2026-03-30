'use client'

import { motion } from 'framer-motion'
import { Coins, TrendingUp, Landmark } from 'lucide-react'

interface WinningsBannerProps {
  totalWon?: number
  currentBalance?: number
  status?: 'pending' | 'paid' | 'none'
}

export function WinningsBanner({ totalWon = 1250, currentBalance = 150, status = 'pending' }: WinningsBannerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 shadow-2xl shadow-primary/10"
    >
      {/* Decorative Elements */}
      <div className="absolute -top-12 -right-12 h-40 w-40 bg-primary opacity-10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 bg-gold-secondary/20 opacity-10 blur-3xl" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gold-gradient p-0.5 shadow-lg shadow-primary/20">
            <div className="h-full w-full rounded-[14px] bg-background flex items-center justify-center">
              <Coins className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-primary/60">Total Winnings</h3>
            <span className="text-4xl md:text-5xl font-black tracking-tighter text-gradient-gold">
              ${totalWon.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-12 w-full md:w-auto">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter opacity-60">
              <Landmark className="h-3 w-3" />
              Available
            </div>
            <div className="text-2xl font-black">${currentBalance}</div>
          </div>

          <div className="flex-1 md:flex-none">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter opacity-60">
              <TrendingUp className="h-3 w-3" />
              Status
            </div>
            <div className="flex items-center gap-2 mt-1">
              {status === 'pending' ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-tighter">Withdrawal Pending</span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">All Paid</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
