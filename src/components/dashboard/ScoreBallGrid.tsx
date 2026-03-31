'use client'

import { motion } from 'framer-motion'
import { Pencil, Trophy, HelpCircle } from 'lucide-react'
import Image from 'next/image'

interface Score {
  id: string
  score: number
  played_at: string
}

interface ScoreBallGridProps {
  scores: Score[]
  average: number
  needed: number
  onEdit?: (score: Score) => void
}

export function ScoreBallGrid({ scores, average, needed, onEdit }: ScoreBallGridProps) {
  // Ensure we have exactly 5 slots, filling with placeholders if needed
  const displayScores = Array.from({ length: 5 }, (_, i) => scores[i] || null)

  return (
    <section className="w-full bg-zinc-50 dark:bg-zinc-950/50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            <Trophy className="h-3 w-3" />
            Performance Index
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Rolling <span className="text-primary font-black">Top 5</span> Scores
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
            Your entry probability is calculated from your top 5 most recent verified rounds.
          </p>
        </div>

        <div className="flex items-center gap-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-center">
            <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Current Index</div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white">{average.toFixed(1)}</div>
          </div>
          <div className="w-px h-10 bg-zinc-200 dark:border-zinc-800" />
          <div className="text-center">
            <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Rounds Needed</div>
            <div className="text-3xl font-black text-primary">{needed}</div>
          </div>
        </div>
      </div>

      {/* Pure Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
        {displayScores.map((score, index) => (
          <motion.div
            key={score?.id || `empty-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative aspect-square"
          >
            {/* The Golf Ball Container - Edge to Edge Image */}
            <div className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-500 ${
              score ? 'cursor-pointer shadow-2xl hover:scale-105' : 'bg-zinc-200 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-300 dark:border-zinc-800'
            }`}>
              {score ? (
                <>
                  <Image
                    src="/assets/golf-ball.png"
                    alt="Golf Ball"
                    fill
                    loading="eager"
                    className="object-cover transition-all duration-500 group-hover:blur-[4px] group-hover:brightness-50"
                  />
                  
                  {/* Score Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                    <span className="text-5xl md:text-6xl font-black text-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)] tracking-tighter">
                      {score.score}
                    </span>
                  </div>

                  {/* Hover Interaction */}
                  <div 
                    onClick={() => onEdit?.(score)}
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <div className="p-4 rounded-full bg-primary text-black transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                      <Pencil className="h-6 w-6 stroke-[2.5px]" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-30">
                  <HelpCircle className="h-8 w-8 mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Score {index + 1}</span>
                </div>
              )}
            </div>

            {/* Date Label */}
            {score && (
              <div className="mt-4 text-center">
                <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-0.5">
                  #{index + 1} Round
                </div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {new Date(score.played_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer Action */}
      <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
        <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl">
          Enter New Match Score
        </button>
      </div>
    </section>
  )
}
