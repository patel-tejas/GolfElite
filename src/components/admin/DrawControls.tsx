'use client';

import { useState } from 'react';
import { 
  Play, 
  Settings2, 
  CheckCircle2, 
  RotateCcw,
  Trophy,
  History,
  TrendingDown,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { simulateDraw, publishDrawResults } from '@/utils/admin/actions';
import { toast } from 'sonner';

export function DrawControls() {
  const [simulation, setSimulation] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [algorithm, setAlgorithm] = useState<'random' | 'weighted'>('weighted');

  const handleSimulate = async () => {
    setIsSimulating(true);
    const result = await simulateDraw(algorithm);
    setIsSimulating(false);
    
    if (result.success) {
      setSimulation(result.results);
      toast.success(`Simulation completed using ${algorithm} algorithm.`);
    } else {
      toast.error(result.error || 'Simulation failed');
    }
  };

  const handlePublish = async () => {
    if (!simulation) return;
    if (!confirm('Are you sure you want to publish these results? This will make the winners public.')) return;
    
    setIsPublishing(true);
    const result = await publishDrawResults(simulation);
    setIsPublishing(false);
    
    if (result.success) {
      toast.success('Results published successfully');
      setSimulation(null);
      window.location.reload();
    } else {
      toast.error('Failed to publish results');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/5 bg-white/2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-heading font-black italic text-white uppercase tracking-tighter">
                Draw <span className="text-emerald-500">Execution</span>
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Run a simulation to verify winners before publishing.
              </CardDescription>
            </div>
            <div className="flex bg-zinc-950 p-1 rounded-lg border border-white/10">
              <Button 
                variant={algorithm === 'weighted' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setAlgorithm('weighted')}
                className="text-[10px] font-black uppercase tracking-widest px-4 h-8"
              >
                Weighted
              </Button>
              <Button 
                variant={algorithm === 'random' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setAlgorithm('random')}
                className="text-[10px] font-black uppercase tracking-widest px-4 h-8"
              >
                Random
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-8 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center bg-white/1">
            <Settings2 className="h-10 w-10 text-emerald-500/20 mb-4 animate-slow-spin" />
            <h4 className="text-white font-bold text-lg">Ready to Simulate</h4>
            <p className="text-zinc-500 text-sm max-w-xs mt-2">
              Select an algorithm and click start to run a draw simulation for the current month.
            </p>
            <Button 
              onClick={handleSimulate} 
              disabled={isSimulating}
              className="mt-6 btn-premium h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 w-64 shadow-2xl shadow-emerald-500/20"
            >
              {isSimulating ? <RotateCcw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {isSimulating ? 'Simulating...' : 'Start Simulation'}
            </Button>
          </div>

          {simulation && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Lucky Numbers Display */}
              <div className="bg-zinc-950/50 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                    <Trophy className="h-3 w-3" />
                    Winning Numbers Generated
                  </h4>
                  <div className="flex gap-3 justify-center">
                    {simulation.luckyNumbers.map((num: number, i: number) => (
                      <div 
                        key={i} 
                        className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-heading font-black text-xl italic shadow-lg shadow-emerald-500/10 animate-in zoom-in-50 duration-300"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                  <Trophy className="h-3 w-3" />
                  Simulation Results
                </h4>
                <div className="h-px flex-1 bg-emerald-500/10 mx-4" />
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 uppercase text-[9px] font-black tracking-widest">
                  Draft Results
                </Badge>
              </div>

              {/* Winners by Category */}
              <div className="space-y-8">
                {/* Category 5 Matches */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500 text-black border-none font-black text-[9px] px-2 py-0">JACKPOT</Badge>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">5 Matches</span>
                  </div>
                  {simulation.matches5.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {simulation.matches5.map((w: any) => (
                        <WinnerCard key={w.id} winner={w} level="jackpot" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-600 italic px-4 py-2 border border-white/5 rounded-lg">No Jackpot winners this time.</div>
                  )}
                </div>

                {/* Category 4 Matches */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-zinc-300 text-black border-none font-black text-[9px] px-2 py-0">PRO</Badge>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">4 Matches</span>
                  </div>
                  {simulation.matches4.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {simulation.matches4.map((w: any) => (
                        <WinnerCard key={w.id} winner={w} level="pro" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-600 italic px-4 py-2 border border-white/5 rounded-lg">No Pro winners this time.</div>
                  )}
                </div>

                {/* Category 3 Matches */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-800 text-white border-none font-black text-[9px] px-2 py-0">STANDARD</Badge>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">3 Matches</span>
                  </div>
                  {simulation.matches3.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {simulation.matches3.map((w: any) => (
                        <WinnerCard key={w.id} winner={w} level="standard" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-600 italic px-4 py-2 border border-white/5 rounded-lg">No Standard winners this time.</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <Button 
                  onClick={() => setSimulation(null)}
                  variant="outline" 
                  className="flex-1 border-white/10 hover:bg-white/5 text-zinc-400 font-black uppercase tracking-widest text-[10px] h-12"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Discard Simulation
                </Button>
                <Button 
                  onClick={handlePublish}
                  disabled={isPublishing || (simulation.matches5.length === 0 && simulation.matches4.length === 0 && simulation.matches3.length === 0)}
                  className="flex-2 btn-premium h-12 font-black uppercase tracking-widest text-[10px]"
                >
                  {isPublishing ? 'Publishing...' : 'Confirm & Publish'}
                  {!isPublishing && <CheckCircle2 className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card border-white/5 bg-emerald-500/2">
          <CardHeader className="pb-2">
            <TrendingDown className="h-5 w-5 text-emerald-500 mb-2" />
            <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Algorithm Logic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-600 leading-relaxed">
              The Draw Engine automatically generates 5 unique lucky numbers (1-45). It then scans all eligible Silver subscribers and compares their last 5 logged scores to find exact matches.
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5 bg-blue-500/2">
          <CardHeader className="pb-2">
            <User className="h-5 w-5 text-blue-500 mb-2" />
            <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">User Eligibility</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Only users with an active 'Silver' subscription and at least 5 logged scores are included in the simulation. Free tier users are excluded from the prize pools.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
function WinnerCard({ winner, level }: { winner: any, level: 'jackpot' | 'pro' | 'standard' }) {
  const colors = {
    jackpot: 'emerald',
    pro: 'blue',
    standard: 'zinc'
  };

  return (
    <div className="bg-white/2 border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full bg-${level === 'jackpot' ? 'amber' : level === 'pro' ? 'zinc-300' : 'orange-800'}/20 flex items-center justify-center border border-white/10`}>
          <User className="h-4 w-4 text-white/40" />
        </div>
        <div>
          <div className="font-bold text-white text-sm">{winner.email}</div>
          <div className="flex gap-1 mt-1">
            {winner.scores.map((s: number, i: number) => (
              <span key={i} className="text-[8px] px-1 bg-white/5 rounded text-zinc-500 font-mono">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-emerald-400 font-black italic">£{winner.prize}</div>
        <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Payout</div>
      </div>
    </div>
  );
}
