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
              "absolute inset-0 rounded-full blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-30",
              score ? "bg-primary" : "bg-muted"
            )} />

            {/* Luxurious Golf Ball Container */}
            <div className={cn(
              "relative h-full w-full rounded-full flex items-center justify-center transition-all duration-500",
              score 
                ? "group-hover:scale-110 drop-shadow-2xl" 
                : "opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105"
            )}>
              {/* Asset-Based Golf Ball */}
              <img 
                src="/assets/golf-ball.png"
                alt="Golf Ball"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:rotate-12",
                  !score && "opacity-60"
                )}
              />

              {/* Score Overlay */}
              <div className="relative z-10 flex flex-col items-center">
                {score ? (
                  <>
                    <span className="text-2xl md:text-4xl font-black tracking-tighter text-slate-900 drop-shadow-sm leading-none">
                      {score}
                    </span>
                    <div className="h-0.5 w-6 bg-slate-900/20 rounded-full mt-1" />
                  </>
                ) : (
                  <Plus className="h-6 w-6 text-slate-500/50" />
                )}
              </div>
            </div>

            {/* Rank Label */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
              <span className={cn(
                "px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-tighter shadow-xl transition-colors duration-300",
                score 
                  ? "bg-slate-900 text-white border-primary/20" 
                  : "bg-background text-muted-foreground border-border"
              )}>
                SLOT {index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
