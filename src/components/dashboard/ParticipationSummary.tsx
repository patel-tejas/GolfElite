'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Ticket, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

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
  // Default mock data if none provided
  const displayDraws = draws.length > 0 ? draws : [
    { id: '1', title: 'The Masters Monthly', date: 'April 15, 2026', prize: '$5,000', status: 'entered' },
    { id: '2', title: 'Emerald Links Open', date: 'May 01, 2026', prize: '$2,500', status: 'upcoming' },
  ]

  return (
    <Card className="glass-panel overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-black tracking-tight">Participation</CardTitle>
          <div className="p-2 rounded-lg bg-primary/10">
            <Ticket className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayDraws.map((draw, index) => (
            <motion.div 
              key={draw.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted/50 flex flex-col items-center justify-center border border-border/50">
                  <span className="text-[10px] font-black leading-none">APR</span>
                  <span className="text-sm font-black text-primary">15</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-none">{draw.title}</h4>
                  <p className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-tighter">
                    Prize: {draw.prize}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {draw.status === 'entered' ? (
                  <span className="text-[8px] font-black uppercase tracking-tighter bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Entered
                  </span>
                ) : (
                  <span className="text-[8px] font-black uppercase tracking-tighter bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                    Upcoming
                  </span>
                )}
                <ArrowUpRight className="h-3 w-3 opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
