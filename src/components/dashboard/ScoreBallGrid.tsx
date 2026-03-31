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
    <section className="w-full bg-white dark:bg-zinc-950 rounded-[2.5rem] p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
      {/* Background Subtle Texture/Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 relative z-10">
        <div className="space-y-4">
          <div className="text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em]">
            Performance Profile
          </div>
          <div className="flex items-baseline gap-4">
            <h2 className="text-7xl font-black tracking-tighter text-orange-500 dark:text-orange-400">
              {average.toFixed(1)}
            </h2>
            <span className="text-[11px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] pb-2">
              Rolling Avg
            </span>
          </div>
        </div>

        {needed > 0 && (
          <div className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 rounded-full">
            <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest leading-none">
              Needs {needed} More Rounds
            </span>
          </div>
        )}
      </div>

      {/* Golf Ball Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 relative z-10">
        {displayScores.map((score, index) => (
          <motion.div
            key={score?.id || `empty-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center gap-6"
          >
            {/* The Golf Ball */}
            <div 
              onClick={() => score && onEdit?.(score)}
              className={`group relative w-full aspect-square rounded-full transition-all duration-500 ${
                score 
                  ? 'cursor-pointer hover:scale-110 active:scale-95' 
                  : 'bg-zinc-100/50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {score ? (
                <>
                  <div className="absolute -bottom-2 inset-x-4 h-4 bg-black/5 blur-xl rounded-full" />
                  <div className="absolute inset-0 bg-white dark:bg-zinc-100 rounded-full shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.05),inset_4px_4px_12px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden border border-zinc-200/50">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                      style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 0.5px, transparent 0)', backgroundSize: '6px 6px' }} 
                    />
                    <span className="relative z-10 text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none">
                      {score.score}
                    </span>
                    <div className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Pencil className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">?</span>
                </div>
              )}
            </div>

            {/* Date Pill */}
            {score ? (
              <div className="px-5 py-1.5 bg-zinc-900 dark:bg-zinc-800 rounded-full shadow-lg transform transition-transform group-hover:translate-y-1">
                <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                  {new Date(score.played_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            ) : (
              <div className="px-5 py-1.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-full border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-600 uppercase tracking-widest">
                  TBD
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  )
}
