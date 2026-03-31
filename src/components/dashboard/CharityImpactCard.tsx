'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Globe, Award, ChevronRight, Lock } from 'lucide-react'
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
    <Card className="glass-panel border-rose-500/10 group overflow-hidden">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
        <Heart className="h-28 w-28 text-rose-500 fill-rose-500/20" />
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-linear-to-br from-rose-500/20 to-rose-500/10 border border-rose-500/20 shadow-lg shadow-rose-500/10">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full border border-rose-500/20">
              Impact Partner
            </span>
          </div>
        </div>
        <CardTitle className="mt-6 text-2xl font-black tracking-tight uppercase italic drop-shadow-sm">{charityName}</CardTitle>
        <CardDescription className="text-muted-foreground font-medium uppercase tracking-tighter opacity-80 mt-1">Your performance directly powers this cause.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              <span>Contribution Level</span>
              <span className="text-rose-500">{percentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                className="h-full bg-linear-to-r from-rose-600 via-rose-500 to-rose-400 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/10">
            <Globe className="h-5 w-5 text-sky-400 mb-2 drop-shadow-sm" />
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Reach</span>
            <span className="text-xs font-black uppercase italic">Worldwide</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/10">
            <Award className="h-5 w-5 text-amber-500 mb-2 drop-shadow-sm" />
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Status</span>
            <span className="text-xs font-black uppercase italic">Verified</span>
          </div>
        </div>

        <CharitySelectionModal 
          charities={charities} 
          currentCharityId={charityId}
          trigger={
            <Button variant="outline" className="w-full h-14 gap-3 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 font-black uppercase tracking-widest group rounded-2xl">
              Change Charity Partner
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          }
        />

        <div className="flex items-center justify-center gap-2 pt-2 opacity-40">
           <Lock className="h-3 w-3" />
           <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encrypted Transfer</span>
        </div>
      </CardContent>
    </Card>
  )
}
