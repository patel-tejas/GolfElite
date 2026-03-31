'use client'

import { Crown, Sparkles, Settings2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubscriptionStatusProps {
  isSubscribed: boolean
  renewalDate?: string
}

export function SubscriptionStatus({ isSubscribed, renewalDate = 'May 01, 2026' }: SubscriptionStatusProps) {
  return (
    <div className="rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 group transition-all duration-500 shadow-sm hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-lg group-hover:scale-110 transition-transform duration-500">
              {isSubscribed ? <Crown className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                  {isSubscribed ? 'Premium Access' : 'Trial Member'}
                </h4>
                {isSubscribed && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Active</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                {isSubscribed ? `Renewal: ${renewalDate}` : 'Join the elite'}
              </p>
            </div>
          </div>
          
          <button className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <Settings2 className="h-5 w-5" />
          </button>
        </div>

        <button className="w-full h-12 rounded-[1.2rem] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2">
          {isSubscribed ? 'Manage Membership' : 'Upgrade to Pro'}
        </button>
      </div>
    </div>
  )
}
