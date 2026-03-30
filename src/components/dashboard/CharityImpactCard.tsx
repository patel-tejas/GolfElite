'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Globe, Award, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CharityImpactCardProps {
  charityName?: string
  percentage?: number
}

export function CharityImpactCard({ charityName = 'Global Green Initiative', percentage = 10 }: CharityImpactCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="glass-panel border-rose-500/10 group overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Heart className="h-24 w-24 text-rose-500" />
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <Heart className="h-5 w-5 text-rose-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-full">
            Impact Partner
          </span>
        </div>
        <CardTitle className="mt-4 text-2xl font-black tracking-tight">{charityName}</CardTitle>
        <CardDescription>Your performance directly powers this cause.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Contribution Level</span>
              <span className="text-foreground">{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-rose-500 to-rose-400 rounded-full" 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
            <Globe className="h-4 w-4 text-sky-400 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">Reach</span>
            <span className="text-xs font-bold">Worldwide</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
            <Award className="h-4 w-4 text-amber-400 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">Status</span>
            <span className="text-xs font-bold">Verified</span>
          </div>
        </div>

        <Button variant="outline" className="w-full gap-2 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 font-bold group">
          Change Charity
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}
