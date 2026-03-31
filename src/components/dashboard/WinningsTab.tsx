'use client'

import { motion } from 'framer-motion'
import { Trophy, Calendar, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, Landmark, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { claimPrize } from '@/utils/user/actions'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface WinningsTabProps {
  winnings: any
}

export function WinningsTab({ winnings }: WinningsTabProps) {
  const [claimingId, setClaimingId] = useState<string | null>(null)

  const handleClaim = async (winnerId: string) => {
    setClaimingId(winnerId)
    const result = await claimPrize(winnerId)
    if (result.success) {
      toast.success('Prize claimed successfully!')
    } else {
      toast.error(result.error || 'Failed to claim prize')
    }
    setClaimingId(null)
  }

  return (
    <div className="space-y-16 animate-slide-up">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 group transition-all duration-500 shadow-sm hover:shadow-xl">
          <div className="absolute -top-12 -right-12 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 rotate-12">
            <Trophy size={200} className="text-zinc-900 dark:text-white" />
          </div>
          <div className="relative space-y-6">
            <div className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500">
              <Landmark className="h-4 w-4" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Career Winnings</h3>
            </div>
            <div className="text-7xl font-black tracking-tighter text-zinc-900 dark:text-white">
              £{winnings.stats.totalWon.toLocaleString()}
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-[0.3em]">Verified Lifetime Payouts</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white p-12 group transition-all duration-500 shadow-2xl">
           <div className="absolute -top-12 -right-12 p-12 opacity-10 group-hover:opacity-20 transition-all duration-700 -rotate-12">
            <CheckCircle2 size={200} className="text-white dark:text-zinc-900" />
          </div>
          <div className="relative space-y-6">
            <div className="flex items-center gap-3 text-white/50 dark:text-zinc-900/50">
              <ShieldCheck className="h-4 w-4" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Available Balance</h3>
            </div>
            <div className="text-7xl font-black tracking-tighter text-white dark:text-zinc-900">
              £{winnings.stats.available.toLocaleString()}
            </div>
            <div className="flex gap-3">
               <div className="px-4 py-1.5 rounded-full border border-white/20 dark:border-zinc-900/20 text-[9px] font-black uppercase tracking-widest text-white dark:text-zinc-900">
                 Secure Link
               </div>
               <div className="px-4 py-1.5 rounded-full bg-white/10 dark:bg-zinc-900/10 text-[9px] font-black uppercase tracking-widest text-white dark:text-zinc-900">
                 Audited
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-900 dark:text-white">Draw Ledger</h3>
          </div>
          <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 mx-8 hidden md:block" />
        </div>

        <div className="space-y-6">
          {winnings.draws.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center rounded-[2.5rem] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20">
              <HelpCircle className="h-20 w-20 text-zinc-200 dark:text-zinc-800 mb-6" />
              <h4 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">No Ledger Found</h4>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-[0.3em] max-w-xs mt-3">Active scores required for entry</p>
            </div>
          ) : (
            winnings.draws.map((draw: any, idx: number) => (
              <motion.div
                key={draw.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-10 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] px-3 py-1 border border-zinc-200 dark:border-zinc-800 rounded-full">
                          {new Date(draw.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-700 uppercase tracking-widest">
                          #{draw.id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none">
                        {draw.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-12">
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block">Winning Results</span>
                        <div className="flex gap-3">
                          {draw.winningNumbers.map((num: number, i: number) => (
                            <div key={i} className="h-12 w-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-sm font-black text-white dark:text-zinc-900 shadow-xl group-hover:scale-110 transition-transform">
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block">Your Profile</span>
                        <div className="flex gap-3">
                          {draw.userNumbers.map((num: number, i: number) => {
                            const isMatch = draw.winningNumbers.includes(num)
                            return (
                              <div key={i} className={cn(
                                "h-12 w-12 rounded-full border-2 flex items-center justify-center text-sm font-black transition-all duration-500",
                                isMatch 
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-2xl scale-110' 
                                : 'bg-transparent border-zinc-100 dark:border-zinc-900 text-zinc-300 dark:text-zinc-700'
                              )}>
                                {num}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end justify-center min-w-[280px] p-8 lg:p-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 mb-4">Outcome Registry</div>
                    {draw.isWinner ? (
                      <div className="space-y-6 w-full text-left lg:text-right">
                        <div className="flex items-center gap-5 lg:justify-end">
                          <Sparkles className="h-8 w-8 text-zinc-900 dark:text-white" />
                          <span className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">£{draw.prizeAmount.toLocaleString()}</span>
                        </div>
                        
                        {!draw.isClaimed ? (
                          <button 
                            onClick={() => handleClaim(draw.winnerId)}
                            disabled={claimingId === draw.winnerId}
                            className="w-full lg:w-auto h-14 px-10 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3"
                          >
                            <Trophy className="h-4 w-4" />
                            {claimingId === draw.winnerId ? 'Processing...' : 'Claim Assets'}
                          </button>
                        ) : (
                          <div className="flex items-center gap-4 lg:justify-end">
                            <div className="px-6 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                              {draw.paymentStatus === 'paid' ? 'Funded' : 'Transfer Pending'}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 text-zinc-200 dark:text-zinc-800 lg:justify-end w-full">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase">No Verification Match</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Verification Footer */}
      <div className="flex flex-col items-center justify-center gap-6 py-16 border-t border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-4">
          <ShieldCheck className="h-5 w-5 text-zinc-900 dark:text-white" />
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-600">Verified Ledger Status</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-center max-w-sm text-zinc-300 dark:text-zinc-700">
          Mathematically finalized results verified per participation period.
        </p>
      </div>
    </div>
  )
}
