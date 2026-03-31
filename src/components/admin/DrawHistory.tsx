'use client'

import { 
  Trophy, Calendar, Users, Coins, ArrowRight, ChevronDown, ChevronRight, ShieldCheck, Zap, History, Download, CheckCircle, XCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { verifyWinner } from '@/utils/admin/actions';
import { toast } from 'sonner';

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
            Recent History & Claims
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
            <DrawHistoryRow key={i} draw={draw} />
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

function DrawHistoryRow({ draw }: { draw: any }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(draw.created_at);
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = date.getDate();

  return (
    <div className="border border-white/5 bg-white/2 rounded-xl overflow-hidden transition-all duration-300">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="group relative overflow-hidden glass-card hover:bg-white/5 transition-all cursor-pointer p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center h-10 w-10 rounded-lg bg-zinc-900 border border-white/5 shadow-xl transition-transform group-hover:scale-105">
            <span className="text-[9px] font-black leading-none text-zinc-500 uppercase">{month}</span>
            <span className="text-sm font-black leading-none text-white mt-0.5">{day}</span>
          </div>
          <div>
            <div className="text-xs font-black text-white italic group-hover:text-emerald-500 transition-colors uppercase tracking-widest">{draw.title}</div>
            <div className="flex items-center gap-2 mt-0.5 text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
              <ShieldCheck className="h-2.5 w-2.5 text-emerald-500/50" />
              Verified Results • £{draw.prize_pool} Pool
            </div>
          </div>
        </div>
        {expanded ? <ChevronDown className="h-4 w-4 text-emerald-500" /> : <ChevronRight className="h-4 w-4 text-zinc-800 group-hover:text-emerald-500 transition-all group-hover:translate-x-1" />}
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-white/5 bg-black/20 space-y-4">
          <p className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-2">
            <Trophy className="h-3 w-3" />
            Winner Claims Review
          </p>
          {draw.winners && draw.winners.length > 0 ? (
            <div className="space-y-3">
              {draw.winners.map((w: any) => (
                <WinnerAdminRow key={w.id} winner={w} />
              ))}
            </div>
          ) : (
             <p className="text-[10px] italic text-zinc-600">No winners recorded for this draw.</p>
          )}
        </div>
      )}
    </div>
  )
}

function WinnerAdminRow({ winner }: { winner: any }) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (status: 'verified' | 'paid' | 'rejected') => {
    setIsVerifying(true);
    const result = await verifyWinner(winner.id, status);
    setIsVerifying(false);
    
    if (result.success) {
      toast.success(`Winner marked as ${status}`);
    } else {
      toast.error(result.error || 'Failed to update winner');
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-950 border border-white/5 rounded-xl p-3 gap-3">
      <div>
        <div className="font-bold text-sm text-white">{winner.profiles?.full_name || winner.profiles?.email || 'Unknown User'}</div>
        <div className="text-[10px] text-zinc-500 font-mono mt-1">Prize: <span className="text-emerald-400 font-bold">£{winner.prize_amount}</span> • Matched: {winner.matched_numbers?.join(', ')}</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {winner.proof_image_url ? (
          <a href={winner.proof_image_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold tracking-widest uppercase text-[9px] bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-1.5 rounded border border-white/10 transition-colors">
            <Download className="h-3 w-3" /> Proof
          </a>
        ) : (
          <Badge className="bg-zinc-800 text-zinc-500 border-none uppercase text-[9px] tracking-widest">
            No Proof Yet
          </Badge>
        )}

        <div className="h-2 w-px bg-white/10 mx-1" />

        {winner.payment_status === 'claimed' ? (
           <>
            <Button 
              size="sm" 
              onClick={() => handleVerify('verified')} 
              disabled={isVerifying}
              className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black uppercase text-[9px] font-black tracking-widest h-auto py-1 px-3 border border-emerald-500/30"
            >
              <CheckCircle className="h-3 w-3 mr-1" /> Approve
            </Button>
            <Button 
              size="sm" 
              onClick={() => handleVerify('rejected')} 
              disabled={isVerifying}
              className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-black uppercase text-[9px] font-black tracking-widest h-auto py-1 px-3 border border-red-500/30"
            >
              <XCircle className="h-3 w-3 mr-1" /> Reject
            </Button>
           </>
        ) : (
           <Badge className={`border-none uppercase text-[9px] font-black tracking-widest ${winner.payment_status === 'verified' || winner.payment_status === 'paid' ? 'bg-emerald-500 text-black' : winner.payment_status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'}`}>
             {winner.payment_status}
           </Badge>
        )}
      </div>
    </div>
  )
}
