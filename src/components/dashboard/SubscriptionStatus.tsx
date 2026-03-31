'use client'

import { Crown, Sparkles, Settings2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubscriptionStatusProps {
  isSubscribed: boolean
  renewalDate?: string
}

export function SubscriptionStatus({ isSubscribed, renewalDate = 'May 01, 2026' }: SubscriptionStatusProps) {
  return (
    <div className="rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 group transition-all duration-500 shadow-sm hover:shadow-xl">
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-xl group-hover:scale-110 transition-transform duration-500">
              {isSubscribed ? <Crown className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h4 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                  {isSubscribed ? 'Premium Access' : 'Digital Member'}
                </h4>
                {isSubscribed && (
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                )}
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                {isSubscribed ? `Renewing: ${renewalDate}` : 'Elite Tier Pending'}
              </p>
            </div>
          </div>
          
          <button className="h-12 w-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm">
            <Settings2 className="h-5 w-5" />
          </button>
        </div>

        <button className="w-full h-16 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">
          {isSubscribed ? 'Elite Management' : 'Secure Premium'}
          <Crown className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
