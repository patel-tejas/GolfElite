'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowUpRight, Trophy, Sparkles } from 'lucide-react'

interface Draw {
  id: string
  title: string
  date: string
  prize: string
  status: 'entered' | 'upcoming'
}

interface ParticipationSummaryProps {
  draws?: Draw[]
}

export function ParticipationSummary({ draws = [] }: ParticipationSummaryProps) {
  // Mock data if none provided
  const displayDraws = draws.length > 0 ? draws : [
    { id: '1', title: 'The Masters Monthly', date: 'April 15, 2026', prize: '£5,000', status: 'entered' as const },
    { id: '2', title: 'Impact Open', date: 'May 01, 2026', prize: '£2,500', status: 'upcoming' as const },
  ]

  return (
    <div className="rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 group transition-all duration-500 shadow-sm hover:shadow-xl">
      {/* Header Section */}
      <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 -mr-4 -mt-4">
          <Calendar className="h-24 w-24 text-zinc-900 dark:text-white" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Draw Participation
            </h3>
            <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">Upcoming Events</p>
          </div>
        </div>
      </div>

      {/* Draw List */}
      <div className="p-6 space-y-4">
        {displayDraws.map((draw, index) => (
          <motion.div
            key={draw.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group/item flex items-center justify-between p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-300"
          >
            <div className="flex items-center gap-6">
              {/* Clean Date Display */}
              <div className="h-16 w-16 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center shadow-sm group-hover/item:border-primary/50 transition-colors">
                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">
                  {new Date(draw.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                </span>
                <span className="text-2xl font-black text-zinc-900 dark:text-white leading-none mt-1">
                  {new Date(draw.date).getDate()}
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight leading-tight group-hover/item:text-primary transition-colors">
                  {draw.title}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    <Trophy className="h-3 w-3" />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      {draw.prize}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {draw.status === 'entered' ? (
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Entered</span>
                </div>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Upcoming</span>
              )}
              
              <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all shadow-md">
                <ArrowUpRight className="h-5 w-5 text-zinc-900 dark:text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="p-6 pt-0">
        <button className="w-full h-14 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3">
          Manage All Entries
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
