'use client';

import { 
  Trophy, 
  Calendar, 
  Users, 
  Coins, 
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  History,
  TrendingDown,
  TrendingUp,
  Scale
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DrawHistoryProps {
  stats: any;
}

export function DrawHistory({ stats }: DrawHistoryProps) {
  const previousDraws = stats.recentDraws || [];

  return (
    <div className="space-y-8 flex flex-col h-full">
      <Card className="glass-card border-white/5 bg-zinc-900/40 relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-700" />
        <CardHeader className="py-6 px-8 border-b border-white/5">
          <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
            <TrendingUp className="h-4 w-4" />
            Vitals & Liquidity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl">
                <Users className="h-6 w-6 text-zinc-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-1">Active Members</div>
                <div className="text-2xl font-heading font-black italic text-white tracking-tighter leading-none">
                  {stats.totalUsers || 0}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary bg-primary/5 py-1 px-3">
              +12% <span className="opacity-40 ml-1">MoM</span>
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-accent/20 flex items-center justify-center shadow-2xl">
                <Coins className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-1">Reserved Prize Pool</div>
                <div className="text-2xl font-heading font-black italic text-accent tracking-tighter leading-none">
                  £{stats.prizePool || 0}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 text-zinc-500 hover:text-primary hover:bg-white/10 transition-all border border-white/5">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 space-y-5">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-3">
            <History className="h-4 w-4" />
            Audit History
          </h3>
          <Button variant="link" className="text-primary/60 p-0 h-auto text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
            Full Ledger
          </Button>
        </div>

        <div className="space-y-3">
          {previousDraws.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-white/5 bg-white/2 rounded-3xl flex flex-col items-center justify-center text-center">
              <Calendar className="h-10 w-10 text-zinc-800 mb-4" />
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Genesis draw pending</p>
            </div>
          ) : (
            previousDraws.map((draw: any, i: number) => {
              const date = new Date(draw.draw_date);
              const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
              const day = date.getDate();

              return (
                <div key={i} className="group relative overflow-hidden glass-card border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-primary/20 transition-all duration-500 cursor-pointer p-5 rounded-2xl flex items-center justify-between shadow-lg">
                   <div className="flex items-center gap-5">
                    <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-black border border-white/10 shadow-2xl transition-transform group-hover:scale-105 group-hover:border-primary/30">
                      <span className="text-[10px] font-black leading-none text-zinc-600 uppercase tracking-tighter">{month}</span>
                      <span className="text-xl font-heading font-black italic leading-none text-white mt-1">{day}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[11px] font-black text-white italic group-hover:text-primary transition-colors uppercase tracking-widest">{draw.title}</div>
                      <div className="flex gap-1.5">
                        {draw.winning_numbers?.map((num: number, idx: number) => (
                          <div key={idx} className="h-5 w-5 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-primary/80">
                            {num}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                           <ShieldCheck className="h-3 w-3 text-primary/40" />
                           <span className="opacity-60">Verified Output</span>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-zinc-800" />
                        <span className="text-white/60">{draw.prize_pool > 0 ? `£${draw.prize_pool.toLocaleString()} Pool` : 'N/A Pool'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all group-hover:shadow-lg group-hover:shadow-primary/20">
                    <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-8 relative h-40 rounded-3xl overflow-hidden border border-white/5 group">
        <div className="absolute inset-0 bg-primary-gradient opacity-10" />
        <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-xl" />
        <div className="relative h-full p-8 flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-zinc-900 border border-primary/20">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <Trophy className="h-12 w-12 text-primary opacity-10 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
           </div>
           <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">RNG Compliance Ledger</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed mt-2 font-bold uppercase tracking-wider max-w-sm">
                Audited monthly. All prize distributions are secured via smart contract equivalents and immutable ledger technology.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
