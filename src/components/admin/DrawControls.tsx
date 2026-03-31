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
  User,
  Zap,
  ShieldCheck,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { simulateDraw, publishDrawResults } from '@/utils/admin/actions';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <div className="space-y-8">
      <Card className="glass-card border-white/5 bg-zinc-900/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary-gradient opacity-50" />
        <CardHeader className="py-8 px-10 border-b border-white/5 bg-white/2">
          <div className="flex items-center justify-between">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block mb-2">Operational Protocol</span>
              <CardTitle className="text-3xl font-heading font-black italic text-white uppercase tracking-tighter leading-none">
                Draw <span className="text-white/20">Executive</span> Engine
              </CardTitle>
            </div>
            <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5 shadow-inner">
              <Button 
                variant={algorithm === 'weighted' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setAlgorithm('weighted')}
                className={`text-[10px] font-black uppercase tracking-widest px-6 h-9 rounded-lg transition-all ${
                  algorithm === 'weighted' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500'
                }`}
              >
                Weighted
              </Button>
              <Button 
                variant={algorithm === 'random' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setAlgorithm('random')}
                className={`text-[10px] font-black uppercase tracking-widest px-6 h-9 rounded-lg transition-all ${
                  algorithm === 'random' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500'
                }`}
              >
                Random
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-10 space-y-10">
          <AnimatePresence mode="wait">
            {!simulation ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-12 border-2 border-dashed border-primary/10 rounded-3xl flex flex-col items-center justify-center text-center bg-primary/2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                  <Settings2 className="h-10 w-10 text-primary animate-slow-spin" />
                </div>
                <h4 className="text-white font-black text-2xl uppercase italic tracking-tighter">Ready for Selection</h4>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] max-w-xs mt-3 leading-relaxed">
                  Verify the prize pool and algorithm parameters before initializing.
                </p>
                <Button 
                  onClick={handleSimulate} 
                  disabled={isSimulating}
                  className="mt-10 btn-premium h-16 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] flex items-center gap-4 w-72 shadow-2xl shadow-primary/30 group active:scale-95 transition-all"
                >
                  {isSimulating ? <RotateCcw className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5 fill-current" />}
                  {isSimulating ? 'Simulating...' : 'Initialize Draw'}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                {/* Lucky Numbers Display */}
                <div className="bg-black/60 border border-primary/20 p-8 rounded-3xl relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Trophy className="h-32 w-32 text-primary" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                        <Zap className="h-3 w-3 fill-primary" />
                        Winning Vector Set
                      </h4>
                      <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] font-black tracking-widest px-3 py-1">
                        Verified Output
                      </Badge>
                    </div>
                    <div className="flex gap-4 justify-center">
                      {simulation.luckyNumbers.map((num: number, i: number) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="h-16 w-16 rounded-2xl bg-zinc-900 border-2 border-primary/20 flex items-center justify-center text-primary font-heading font-black text-2xl italic shadow-2xl shadow-primary/10"
                        >
                          {num}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Winners section ... (truncated for brevity in thought, but full implementation below) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Tier 1: Jackpot</span>
                      </div>
                      {simulation.matches5.length > 0 ? (
                        simulation.matches5.map((w: any) => <WinnerCard key={w.id} winner={w} level="jackpot" luckyNumbers={simulation.luckyNumbers} />)
                      ) : <div className="p-4 rounded-xl border border-white/5 bg-white/2 text-[9px] font-bold uppercase tracking-widest text-zinc-600 italic">No matches found</div>}
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <div className="h-2 w-2 rounded-full bg-zinc-300" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Tier 2: Pro Elite</span>
                      </div>
                      {simulation.matches4.length > 0 ? (
                        simulation.matches4.map((w: any) => <WinnerCard key={w.id} winner={w} level="pro" luckyNumbers={simulation.luckyNumbers} />)
                      ) : <div className="p-4 rounded-xl border border-white/5 bg-white/2 text-[9px] font-bold uppercase tracking-widest text-zinc-600 italic">No matches found</div>}
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <div className="h-2 w-2 rounded-full bg-primary/40" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Tier 3: Standard Match</span>
                      </div>
                      {simulation.matches3.length > 0 ? (
                        simulation.matches3.map((w: any) => <WinnerCard key={w.id} winner={w} level="standard" luckyNumbers={simulation.luckyNumbers} />)
                      ) : <div className="p-4 rounded-xl border border-white/5 bg-white/2 text-[9px] font-bold uppercase tracking-widest text-zinc-600 italic">No matches found</div>}
                   </div>
                </div>

                <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                  <Button 
                    onClick={() => setSimulation(null)}
                    variant="outline" 
                    className="flex-1 border-white/10 hover:bg-white/5 text-zinc-500 font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl transition-all"
                  >
                    <RotateCcw className="h-4 w-4 mr-3" />
                    Reset Vector
                  </Button>
                  <Button 
                    onClick={handlePublish}
                    disabled={isPublishing || (simulation.matches5.length === 0 && simulation.matches4.length === 0 && simulation.matches3.length === 0)}
                    className="flex-2 btn-premium h-14 font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-lg shadow-primary/20"
                  >
                    {isPublishing ? 'Transmitting...' : 'Commit & Publish Results'}
                    {!isPublishing && <CheckCircle2 className="h-4 w-4 ml-3" />}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-white/5 bg-primary/2 p-1 relative overflow-hidden group">
          <div className="p-8 space-y-4 relative z-10">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-primary/20">
                   <Target className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Algorithm Protocol</h4>
             </div>
             <p className="text-[11px] text-zinc-500 leading-relaxed font-bold uppercase tracking-widest">
               The engine utilizes a {algorithm} algorithm to match the verified scorecard vectors against monthly lucky number seeds. This ensures audited cryptographic fairness.
             </p>
          </div>
        </Card>
        
        <Card className="glass-card border-white/5 bg-accent/2 p-1 relative overflow-hidden group">
          <div className="p-8 space-y-4 relative z-10">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-accent/20">
                   <ShieldCheck className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Governance Compliance</h4>
             </div>
             <p className="text-[11px] text-zinc-500 leading-relaxed font-bold uppercase tracking-widest">
               All simulations are logged in the audit ledger. Only users with 'Executive' (Silver) subscription status and 5 verified scores are eligible for prize distribution.
             </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function WinnerCard({ winner, level, luckyNumbers }: { winner: any, level: 'jackpot' | 'pro' | 'standard', luckyNumbers: number[] }) {
  const getLevelColor = () => {
    switch(level) {
      case 'jackpot': return 'border-accent text-accent';
      case 'pro': return 'border-zinc-300 text-zinc-300';
      case 'standard': return 'border-primary text-primary';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-zinc-900/40 border border-white/5 p-5 rounded-2xl flex flex-col gap-4 group hover:bg-zinc-900/60 hover:border-primary/20 transition-all duration-300 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
            <User className="h-4 w-4 text-zinc-600 group-hover:text-primary transition-colors" />
          </div>
          <div className="flex flex-col">
            <div className="text-[10px] font-black text-white truncate max-w-[120px] tracking-tight">{winner.email}</div>
            <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Subscriber</div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-black italic ${level === 'jackpot' ? 'text-accent' : 'text-primary'}`}>£{winner.prize}</div>
          <div className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">Yield</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-white/5">
        <div className="flex gap-1.5">
          {winner.scores.map((s: number, i: number) => {
            const isMatch = luckyNumbers.includes(s);
            return (
              <span 
                key={i} 
                className={cn(
                  "text-[9px] px-2 py-0.5 rounded-lg font-black tracking-tighter transition-all duration-500",
                  isMatch 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" 
                  : "bg-black/40 text-zinc-700 border border-white/5 grayscale"
                )}
              >
                {s}
              </span>
            );
          })}
        </div>
        <div className={cn("text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border", getLevelColor())}>
          {level}
        </div>
      </div>
    </motion.div>
  );
}
