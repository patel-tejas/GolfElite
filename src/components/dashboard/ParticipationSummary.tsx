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
    <div className="rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 group transition-all duration-500 shadow-sm hover:shadow-xl">
      <div className="p-8 md:p-10 space-y-10">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
              Draw Participation
            </h3>
            <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Upcoming Events
            </p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

        {/* Draw List */}
        <div className="space-y-4">
          {displayDraws.map((draw, index) => (
            <motion.div
              key={draw.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group/item flex items-center justify-between p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex flex-col items-center justify-center">
                  <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">
                    {new Date(draw.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                  </span>
                  <span className="text-xl font-black text-zinc-900 dark:text-white leading-none mt-1">
                    {new Date(draw.date).getDate()}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {draw.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                      {draw.prize} Prize Fund
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {draw.status === 'entered' ? (
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Live Entry</span>
                  </div>
                ) : (
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Upcoming</span>
                )}
                
                <ArrowUpRight className="h-5 w-5 text-zinc-300 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <button className="w-full h-16 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4 group/btn">
          Manage All Entries
          <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
