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
    <div className="relative rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 group transition-all duration-500 shadow-sm hover:shadow-xl">
      <div className="relative z-10 p-8 md:p-10 space-y-10">
        {/* Impact Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
                Foundational Impact
              </p>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                {charityName}
              </h3>
            </div>
          </div>
        </div>

        {/* Impact Metric */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Monthly Contribution</span>
            <span className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white">
              {percentage}<span className="text-2xl">%</span>
            </span>
          </div>
          
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-zinc-900 dark:bg-white rounded-full"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">
            Verified Performance Tier
          </p>
        </div>

        {/* Impact Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
               <Globe className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-zinc-500">Global Reach</p>
              <p className="text-sm font-black text-zinc-900 dark:text-white">Pan-African</p>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
               <Award className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-zinc-500">Compliance</p>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">Seal of Approval</p>
            </div>
          </div>
        </div>

        {/* Direct Action */}
        <CharitySelectionModal
          charities={charities}
          currentCharityId={charityId}
          trigger={
            <button className="w-full h-16 rounded-2xl border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-black text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-500 active:scale-95 flex items-center justify-center gap-4 group/btn">
              Modify Partner Selection
              <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
            </button>
          }
        />
      </div>
    </div>
  )
}
