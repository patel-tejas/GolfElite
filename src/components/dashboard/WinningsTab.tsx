'use client'

import { motion } from 'framer-motion'
import { Trophy, Calendar, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, Landmark, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { claimPrize } from '@/utils/user/actions'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface WinningsTabProps {
  winnings: any
}

export function WinningsTab({ winnings }: WinningsTabProps) {
  const [claimingId, setClaimingId] = useState<string | null>(null)

  const handleClaim = async (winnerId: string) => {
    setClaimingId(winnerId)
    const result = await claimPrize(winnerId)
    if (result.success) {
      toast.success('Prize claimed successfully!')
    } else {
      toast.error(result.error || 'Failed to claim prize')
    }
    setClaimingId(null)
  }

  return (
    <div className="space-y-12 animate-slide-up">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/10 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-10 group">
          <div className="absolute -top-10 -right-10 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-700 rotate-12">
            <Trophy size={160} className="text-primary" />
          </div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-[5rem]" />
          <div className="relative space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <Landmark className="h-3.5 w-3.5 text-primary" />
              Total Career Winnings
            </h3>
            <div className="text-6xl font-black tracking-tighter text-gradient-gold">
              £{winnings.stats.totalWon.toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Verified Lifetime Impact Payouts</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/[0.03] to-background/40 backdrop-blur-xl p-10 group">
           <div className="absolute -top-10 -right-10 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-700 -rotate-12">
            <CheckCircle2 size={160} className="text-accent" />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-[4rem]" />
          <div className="relative space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              Available for Withdrawal
            </h3>
            <div className="text-6xl font-black tracking-tighter text-gradient-gold">
              £{winnings.stats.available.toLocaleString()}
            </div>
            <div className="flex gap-2">
               <Badge className="bg-primary/10 text-primary border border-primary/20 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full hover:bg-primary/20">
                 Liquid Funds
               </Badge>
               <Badge variant="outline" className="border-border/15 text-muted-foreground text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                 Audited
               </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-3">
            <Calendar className="h-4 w-4 text-primary" />
            Draw Ledger & Historical Participation
          </h3>
          <div className="h-px flex-1 bg-border/10 mx-8 hidden md:block" />
        </div>

        <div className="space-y-4">
          {winnings.draws.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center rounded-3xl border-2 border-dashed border-border/10 bg-secondary/5">
              <HelpCircle className="h-16 w-16 text-muted-foreground/20 mb-4" />
              <h4 className="text-lg font-black text-foreground uppercase tracking-tight">No Participation Ledger Found</h4>
              <p className="text-xs text-muted-foreground max-w-xs mt-2 font-bold uppercase tracking-widest">Complete your first round to enter the next monthly draw.</p>
            </div>
          ) : (
            winnings.draws.map((draw: any, idx: number) => (
              <motion.div
                key={draw.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-border/10 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl hover:border-border/20 transition-all duration-500 p-8"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  {/* Left: Participant Info */}
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                          {new Date(draw.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-border/30" />
                        <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                          ID: #{draw.id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-3xl font-black text-foreground tracking-tighter uppercase group-hover:text-primary transition-colors">
                        {draw.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-10">
                      {/* Winning Numbers */}
                      <div className="space-y-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground block">Winning Combination</span>
                        <div className="flex gap-2.5">
                          {draw.winningNumbers.map((num: number, i: number) => (
                            <div key={i} className="h-10 w-10 rounded-xl bg-card border border-border/15 flex items-center justify-center text-xs font-black text-foreground shadow-sm group-hover:border-primary/15 transition-colors">
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* My Scores */}
                      <div className="space-y-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground block">Your Numbers</span>
                        <div className="flex gap-2.5">
                          {draw.userNumbers.map((num: number, i: number) => {
                            const isMatch = draw.winningNumbers.includes(num)
                            return (
                              <div key={i} className={cn(
                                "h-10 w-10 rounded-full border flex items-center justify-center text-xs font-black transition-all duration-500",
                                isMatch 
                                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-110' 
                                : 'bg-transparent border-border/20 text-muted-foreground/60 group-hover:border-border/40'
                              )}>
                                {num}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Outcome Action */}
                  <div className="flex flex-col items-start lg:items-end justify-center min-w-[240px] p-6 lg:p-0 bg-secondary/5 lg:bg-transparent rounded-2xl">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3">Outcome</div>
                    {draw.isWinner ? (
                      <div className="space-y-5 w-full text-left lg:text-right">
                        <div className="flex items-center gap-4 lg:justify-end text-primary">
                          <Sparkles className="h-6 w-6" />
                          <span className="text-4xl font-black tracking-tighter text-gradient-gold">£{draw.prizeAmount.toLocaleString()}</span>
                        </div>
                        
                        {!draw.isClaimed ? (
                          <Button 
                            onClick={() => handleClaim(draw.winnerId)}
                            disabled={claimingId === draw.winnerId}
                            className="btn-premium w-full lg:w-auto h-12 px-8 text-xs font-black uppercase tracking-widest rounded-2xl text-white"
                          >
                            <Heart className="h-4 w-4 mr-2 fill-white/20" />
                            {claimingId === draw.winnerId ? 'Processing...' : 'Claim Prize'}
                          </Button>
                        ) : (
                          <div className="flex items-center gap-3 lg:justify-end">
                            <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-black py-2 px-6 rounded-full uppercase tracking-widest">
                              {draw.paymentStatus === 'paid' ? '✓ Funded' : 'Pending Transfer'}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
                        <span className="text-xs font-black tracking-[0.2em] uppercase">No Match</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Verification Footer */}
      <div className="flex flex-col items-center justify-center gap-4 py-12 border-t border-border/5 opacity-20">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Verified Draw Ledger</span>
        </div>
        <p className="text-[8px] font-bold uppercase tracking-widest text-center max-w-sm text-muted-foreground/50">
          All results are mathematically finalized at the time of the draw. Past performance is reflected based on contemporaneous records.
        </p>
      </div>
    </div>
  )
}
