import { 
  Trophy, 
  Calendar, 
  Users, 
  Coins, 
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DrawHistoryProps {
  stats: any;
}

export function DrawHistory({ stats }: DrawHistoryProps) {
  const previousDraws = stats.recentDraws || [];

  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/5 bg-zinc-950/40">
        <CardHeader>
          <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Zap className="h-4 w-4 text-emerald-500" />
            Current Pool Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-xl shadow-blue-500/5">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Eligible Users</div>
                <div className="text-xl font-heading font-black italic text-white tracking-widest leading-none mt-1">
                  {stats.totalUsers || 0}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
              +12% vs last mo.
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
                <Coins className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Current Prize Pool</div>
                <div className="text-xl font-heading font-black italic text-emerald-500 tracking-widest leading-none mt-1">
                  £{stats.prizePool || 0}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" className="text-zinc-600 hover:text-white transition-colors">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
            <History className="h-4 w-4" />
            Recent History
          </h3>
          <Button variant="link" className="text-emerald-500/60 p-0 h-auto text-[10px] font-black uppercase tracking-widest hover:text-emerald-400">
            View All
          </Button>
        </div>

        {previousDraws.length === 0 ? (
          <div className="p-8 border border-white/5 bg-white/2 rounded-2xl flex flex-col items-center justify-center text-center">
            <Calendar className="h-8 w-8 text-zinc-800 mb-3" />
            <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">No previous draws recorded</p>
          </div>
        ) : (
          previousDraws.map((draw: any, i: number) => (
            <div key={i} className="group relative overflow-hidden glass-card border-white/5 bg-white/2 hover:bg-white/5 transition-all cursor-pointer p-4 rounded-xl flex items-center justify-between mb-3 last:mb-0">
               <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center h-10 w-10 rounded-lg bg-zinc-900 border border-white/5 shadow-xl transition-transform group-hover:scale-105">
                  <span className="text-[9px] font-black leading-none text-zinc-500 uppercase">MAR</span>
                  <span className="text-sm font-black leading-none text-white mt-0.5">25</span>
                </div>
                <div>
                  <div className="text-xs font-black text-white italic group-hover:text-emerald-500 transition-colors uppercase tracking-widest">March Monthly Draw</div>
                  <div className="flex items-center gap-2 mt-0.5 text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                    <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/50" />
                    Verified Results • {draw.winnerCount} Winners
                  </div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-800 group-hover:text-emerald-500 transition-all group-hover:translate-x-1" />
            </div>
          ))
        )}
      </div>

      <div className="p-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 mt-auto relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Trophy size={80} className="text-emerald-500" />
        </div>
        <CardTitle className="text-xs font-black uppercase tracking-widest text-emerald-500 group-hover:text-emerald-400 transition-colors">Compliance Notice</CardTitle>
        <p className="text-[10px] text-zinc-500 leading-relaxed mt-2 font-medium">
          Monthly draws are executed using cryptographically secure random number generation or our proprietary weighted algorithm. All results are immutable once published and verified by compliance. 
        </p>
      </div>
    </div>
  );
}
