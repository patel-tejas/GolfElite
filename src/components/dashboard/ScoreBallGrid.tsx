'use client'

import { motion } from 'framer-motion'
import { Plus, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScoreBallGridProps {
  scores: number[]
  average: number
  needed: number
}

export function ScoreBallGrid({ scores, average, needed }: ScoreBallGridProps) {
  // Ensure we always have 5 slots
  const slots = Array.from({ length: 5 }, (_, i) => scores[i] || null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between px-2">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary/60">Performance Profile</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter text-gradient-gold">
              {average > 0 ? average : '--'}
            </span>
            <span className="text-sm font-bold text-muted-foreground uppercase">Rolling Avg</span>
          </div>
        </div>
        
        {needed > 0 && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-tighter bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">
              Needs {needed} More
            </span>
          </div>
        )}
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-5 gap-3 md:gap-6"
      >
        {slots.map((score, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative aspect-square"
          >
            {/* The "Golf Ball" Shadow/Glow */}
            <div className={cn(
              "absolute inset-0 rounded-full blur-xl transition-all duration-500 opacity-20",
              score ? "bg-primary group-hover:opacity-40" : "bg-muted"
            )} />

            {/* The "Golf Ball" Surface */}
            <div className={cn(
              "relative h-full w-full rounded-full flex items-center justify-center border-2 transition-all duration-300",
              "bg-linear-to-b from-white/10 to-white/5 backdrop-blur-md",
              score 
                ? "border-primary/40 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:border-primary" 
                : "border-dashed border-muted-foreground/20 opacity-40"
            )}>
              {score ? (
                <div className="flex flex-col items-center">
                  <span className="text-xl md:text-3xl font-black tracking-tighter text-foreground">
                    {score}
                  </span>
                  <div className="h-1 w-4 bg-primary/40 rounded-full mt-0.5" />
                </div>
              ) : (
                <Plus className="h-5 w-5 text-muted-foreground/40" />
              )}
              
              {/* Dimple Pattern Effect (Subtle) */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0.5px,_black_0.5px)] bg-[length:4px_4px]" />
            </div>

            {/* Rank Label */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <span className="px-2 py-0.5 rounded-full bg-background border border-border text-[8px] font-black uppercase tracking-tighter shadow-sm">
                #{index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
