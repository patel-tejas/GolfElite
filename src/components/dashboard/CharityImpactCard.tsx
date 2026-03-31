'use client'

import { motion } from 'framer-motion'
import { Heart, Globe, Award, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CharitySelectionModal } from './CharitySelectionModal'

interface Charity {
  id: string
  name: string
  description: string
  impact_area: string
  image_url: string
}

interface CharityImpactCardProps {
  charityName?: string
  charityId?: string
  percentage?: number
  charities?: Charity[]
}

export function CharityImpactCard({
  charityName = 'Global Green Initiative',
  charityId,
  percentage = 10,
  charities = []
}: CharityImpactCardProps) {
  return (
    <div className="relative rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 group transition-all duration-500 shadow-sm hover:shadow-xl">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 dark:bg-zinc-800/20 rounded-bl-full pointer-events-none" />

      <div className="relative z-10 p-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Heart className="h-6 w-6 fill-current pulse" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-1 block">
                PARTNER CHARITY
              </span>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                {charityName}
              </h3>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Impact Progress */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Monthly Contribution</span>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-bold">
                Direct impact from your membership
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
                {percentage}%
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Guaranteed</span>
            </div>
          </div>

          <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]"
            />
          </div>
        </div>

        {/* Data Tiles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/50 flex flex-col items-center justify-center text-center transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/60">
            <Globe className="h-5 w-5 text-zinc-400 mb-3" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Global Reach</span>
            <span className="text-sm font-black text-zinc-900 dark:text-white">Across Africa</span>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/50 flex flex-col items-center justify-center text-center transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/60">
            <Award className="h-5 w-5 text-primary mb-3" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Status</span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Verified ✓</span>
          </div>
        </div>

        {/* Action Button */}
        <CharitySelectionModal
          charities={charities}
          currentCharityId={charityId}
          trigger={
            <Button variant="outline" className="w-full h-14 gap-3 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 font-black rounded-2xl transition-all duration-500 group/btn text-xs uppercase tracking-[0.2em]">
              Select Different Charity
              <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          }
        />
      </div>
    </div>
  )
}
