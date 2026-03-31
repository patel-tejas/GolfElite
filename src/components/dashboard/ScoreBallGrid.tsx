'use client'

import { motion } from 'framer-motion'
import { Plus, Trophy, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScoreBallGridProps {
  scores: { id: string, score: number, played_at: string }[]
  average: number
  needed: number
  onEdit?: (score: { id: string, score: number, played_at: string }) => void
}

export function ScoreBallGrid({ scores, average, needed, onEdit }: ScoreBallGridProps) {
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Performance Profile</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tighter text-gradient-gold">
              {average > 0 ? average.toFixed(1) : '--'}
            </span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">Rolling Avg</span>
          </div>
        </div>
        
        {needed > 0 && (
          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] font-black uppercase tracking-tighter bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20 animate-pulse w-fit">
              Needs {needed} More Rounds
            </span>
          </div>
        )}
      </div>

      {/* Mobile: flex-wrap for 3-2 layout | Desktop: grid-cols-5 */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-x-5 gap-y-10 sm:grid sm:grid-cols-5 sm:gap-4 md:gap-7 max-w-5xl mx-auto py-4"
      >
        {slots.map((scoreData, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative w-[calc(33.333%-1.25rem)] sm:w-auto aspect-square"
          >
            {/* Glow */}
            <div className={cn(
              "absolute inset-0 rounded-full blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-60",
              scoreData ? "bg-primary/50" : "bg-muted/30"
            )} />

            {/* Golf Ball Container */}
            <div className={cn(
              "relative h-full w-full rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden",
              scoreData 
                ? "cursor-pointer" 
                : "border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/5 transition-colors"
            )}>
              {scoreData && (
                <img 
                  src="/assets/golf-ball.png"
                  alt="Golf Ball"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:rotate-360 group-hover:blur-[2px] group-hover:scale-110"
                />
              )}

              {/* Score Overlay */}
              <div className="relative z-10 flex flex-col items-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-50">
                {scoreData ? (
                  <span className="text-xl sm:text-3xl md:text-4xl font-black tracking-tighter text-slate-900 drop-shadow-xl leading-none select-none">
                    {scoreData.score}
                  </span>
                ) : (
                  <Plus className="h-6 w-6 sm:h-10 sm:w-10 text-slate-400" />
                )}
              </div>

              {/* Edit Overlay */}
              {scoreData && onEdit && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(scoreData);
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                >
                  <div className="bg-primary text-primary-foreground p-3 sm:p-5 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-all duration-500 hover:bg-primary/90">
                    <Pencil className="h-4 w-4 sm:h-7 sm:w-7" />
                  </div>
                </div>
              )}
            </div>

            {/* Date/Slot Label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap pointer-events-none">
              <span className={cn(
                "px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border text-[8px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.2em] shadow-2xl transition-all duration-500",
                scoreData 
                  ? "bg-slate-900 text-white border-primary/40 group-hover:bg-primary group-hover:border-primary group-hover:-translate-y-1" 
                  : "bg-background/80 text-muted-foreground border-border backdrop-blur-md"
              )}>
                {scoreData ? new Date(scoreData.played_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) : `RD ${index + 1}`}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
