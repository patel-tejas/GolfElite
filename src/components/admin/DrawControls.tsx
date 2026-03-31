'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Settings2, 
  CheckCircle2, 
  RotateCcw,
  Trophy,
  History,
  TrendingDown,
  User,
  Pencil,
  Plus,
  Save,
  X,
  Send,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { createDraw, updateDraw, executeDraw, getDrawParticipants, simulateDraw } from '@/utils/admin/actions';
import { toast } from 'sonner';

interface DrawControlsProps {
  stats: any;
}

export function DrawControls({ stats }: DrawControlsProps) {
  const router = useRouter();
  const [simulation, setSimulation] = useState<{
    drawId: string,
    luckyNumbers: number[],
    winners: any[],
    matches5: any[],
    matches4: any[],
    matches3: any[],
    matches2: any[],
    matches1: any[]
  } | null>(null);
  const [viewingParticipants, setViewingParticipants] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [isExecuting, setIsExecuting] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [editDraw, setEditDraw] = useState<{id: string, title: string, prize: number} | null>(null);
  const [algorithm, setAlgorithm] = useState<'random' | 'weighted'>('weighted');
  const [manualNumbers, setManualNumbers] = useState('');

  const handleViewParticipants = async (drawId: string) => {
    if (viewingParticipants === drawId) {
      setViewingParticipants(null);
      return;
    }
    
    setViewingParticipants(drawId);
    setIsLoadingParticipants(true);
    const result = await getDrawParticipants(drawId);
    setIsLoadingParticipants(false);
    
    if (result.success) {
      setParticipants(result.participants || []);
    } else {
      toast.error(result.error || 'Failed to load participants');
      setViewingParticipants(null);
    }
  };

  const upcomingDraws = stats.upcomingDraws || [];

  const handleCreate = async () => {
    setIsCreating(true);
    const defaultTitle = `${new Date().toLocaleString('default', { month: 'long' })} Monthly Draw`;
    const result = await createDraw(defaultTitle, stats.prizePool || 0);
    setIsCreating(false);
    
    if (result.success) {
      toast.success('Draw published successfully');
      router.refresh();
    } else {
      toast.error(result.error || 'Failed to publish draw');
    }
  };

  const startEdit = (draw: any) => {
    // Explicit console log to debug if startEdit is called
    console.log('Editing draw:', draw);
    setEditDraw({ id: draw.id, title: draw.title, prize: Number(draw.prize_pool) || 0 });
  };

  const handleUpdate = async () => {
    if (!editDraw) return;
    setIsUpdating(editDraw.id + '_loading'); 
    
    try {
      const result = await updateDraw(editDraw.id, editDraw.title, editDraw.prize);
      if (result.success) {
        toast.success('Draw updated successfully');
        setEditDraw(null);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update draw');
      }
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('An unexpected server error occurred');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleSimulate = async (drawId: string) => {
    setIsSimulating(drawId);
    let manualNumbersArr: number[] = [];
    if (manualNumbers.trim()) {
      manualNumbersArr = manualNumbers.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
      if (manualNumbersArr.length !== 5 || new Set(manualNumbersArr).size !== 5 || manualNumbersArr.some(n => n < 1 || n > 45)) {
        toast.error('Manual numbers must be EXACTLY 5 unique numbers between 1 and 45.');
        setIsSimulating(null);
        return;
      }
    }

    const result = await simulateDraw(drawId, algorithm, manualNumbersArr);
    setIsSimulating(null);
    
    if (result.success) {
      setSimulation({
        drawId,
        luckyNumbers: result.luckyNumbers || [],
        winners: result.winners || [],
        matches5: result.matches5 || [],
        matches4: result.matches4 || [],
        matches3: result.matches3 || [],
        matches2: result.matches2 || [],
        matches1: result.matches1 || []
      });
      toast.success('Simulation complete. You can now review and publish.');
    } else {
      toast.error(result.error || 'Simulation failed');
    }
  };

  const handlePublish = async () => {
    if (!simulation) return;
    if (!confirm('Are you sure you want to finalize these results and record winners?')) return;
    
    setIsExecuting(simulation.drawId);
    const result = await executeDraw(simulation.drawId, simulation.luckyNumbers, simulation.winners);
    setIsExecuting(null);
    
    if (result.success) {
      setSimulation(null);
      toast.success('Draw results published successfully');
    } else {
      toast.error(result.error || 'Execution failed');
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
                Publish upcoming draws and execute established ones.
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
          {simulation ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Execution Results View */}
              <div className="bg-zinc-950/50 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                   <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3" />
                        Winning Numbers Simulated
                    </h4>
                    <div className="flex items-center gap-2">
                      <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-[10px] font-black uppercase text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
                          onClick={() => handleSimulate(simulation.drawId)}
                          disabled={isSimulating === simulation.drawId}
                      >
                          {isSimulating === simulation.drawId ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <RotateCcw className="h-3 w-3 mr-2" />}
                          Resimulate
                      </Button>
                      <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-[10px] font-black uppercase text-zinc-500 hover:text-white"
                          onClick={() => setSimulation(null)}
                      >
                          <X className="h-3 w-3 mr-1" /> Close
                      </Button>
                    </div>
                   </div>
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
                  Winner Payouts
                </h4>
                <div className="h-px flex-1 bg-emerald-500/10 mx-4" />
                <Button 
                   onClick={handlePublish}
                   disabled={isExecuting === simulation.drawId}
                   className="bg-emerald-500 text-black hover:bg-emerald-400 capitalize-none uppercase font-black tracking-widest text-[9px] px-6"
                >
                   {isExecuting === simulation.drawId ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Send className="h-3 w-3 mr-2" />}
                   Publish Results
                </Button>
              </div>

              <div className="space-y-8">
                <ResultGroup label="JACKPOT" badge="bg-amber-500 text-black" winners={simulation.matches5} type="jackpot" />
                <ResultGroup label="PRO" badge="bg-zinc-300 text-black" winners={simulation.matches4} type="pro" />
                <ResultGroup label="STANDARD" badge="bg-orange-800 text-white" winners={simulation.matches3} type="standard" />
                <ResultGroup label="RUNNER-UP" badge="bg-zinc-700 text-white" winners={simulation.matches2} type="runner-up" />
                <ResultGroup label="CONSOLATION" badge="bg-zinc-800 text-white" winners={simulation.matches1} type="consolation" />
              </div>
            </div>
          ) : (
            <>
              {/* Upcoming Draws List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Upcoming Draws
                  </h3>
                  <Button 
                    onClick={handleCreate} 
                    disabled={isCreating}
                    size="sm"
                    className="btn-premium h-8 font-black uppercase tracking-widest text-[9px]"
                  >
                    {isCreating ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Plus className="h-3 w-3 mr-2" />}
                    Publish {new Date().toLocaleString('default', { month: 'long' })} Draw
                  </Button>
                </div>

                {upcomingDraws.length === 0 ? (
                  <div className="p-12 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center bg-white/1">
                    <Trophy className="h-10 w-10 text-zinc-800 mb-4" />
                    <h4 className="text-zinc-500 font-bold text-sm uppercase tracking-widest">No Active Draws</h4>
                    <p className="text-zinc-600 text-[10px] max-w-xs mt-2 uppercase font-medium">
                      Click the button above to publish the scheduled monthly draw for players to see.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingDraws.map((draw: any) => (
                      <div key={draw.id} className="bg-zinc-950/50 border border-white/5 rounded-2xl p-5 group hover:border-emerald-500/20 transition-all">
                        {editDraw && editDraw.id === draw.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Draw Title</label>
                                <Input 
                                  value={editDraw.title} 
                                  onChange={(e) => setEditDraw({ ...editDraw, title: e.target.value })}
                                  className="bg-black/50 border-white/10 text-white h-10 font-bold"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Est. Prize Pool (£)</label>
                                <Input 
                                  type="number"
                                  value={editDraw.prize} 
                                  onChange={(e) => setEditDraw({ ...editDraw, prize: Number(e.target.value) })}
                                  className="bg-black/50 border-white/10 text-white h-10 font-bold"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => { setIsUpdating(null); setEditDraw(null); }}
                                className="text-zinc-500 hover:text-white text-[10px] font-black uppercase"
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={handleUpdate}
                                disabled={isUpdating === draw.id + '_loading'}
                                className="bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-black uppercase px-6"
                              >
                                {isUpdating === draw.id + '_loading' ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Save className="h-3 w-3 mr-2" />}
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                  <CalendarDays className="h-5 w-5 text-emerald-500" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-black text-white italic uppercase tracking-widest">{draw.title}</h4>
                                  <div className="flex items-center gap-3 mt-1">
                                    <div className="text-[10px] text-zinc-400 font-bold">Est. Pool: <span className="text-emerald-500">£{draw.prize_pool}</span></div>
                                    <div className="h-1 w-1 rounded-full bg-zinc-800" />
                                    <div className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Status: Upcoming</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  placeholder="Manual eg. 1,12,23,34,45"
                                  value={manualNumbers}
                                  onChange={(e) => setManualNumbers(e.target.value)}
                                  className="hidden sm:block h-10 w-[140px] bg-zinc-950 border border-white/5 hover:border-white/10 rounded-xl px-3 text-[10px] font-mono text-zinc-400 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleViewParticipants(draw.id)}
                                  className={`h-10 w-10 rounded-xl border border-white/5 hover:bg-white/5 ${viewingParticipants === draw.id ? 'text-emerald-500 bg-white/5' : 'text-zinc-500 hover:text-white'}`}
                                >
                                  {isLoadingParticipants && viewingParticipants === draw.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <User className="h-4 w-4" />}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => startEdit(draw)}
                                  className="h-10 w-10 rounded-xl border border-white/5 hover:bg-white/5 text-zinc-500 hover:text-white"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  onClick={() => handleSimulate(draw.id)}
                                  disabled={isSimulating === draw.id}
                                  className="btn-premium h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
                                >
                                  {isSimulating === draw.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                                  {isSimulating === draw.id ? 'Simulating...' : 'Simulate Result'}
                                </Button>
                              </div>
                            </div>

                            {viewingParticipants === draw.id && (
                              <div className="mt-4 pt-4 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                                <div className="space-y-3">
                                  <h5 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Confirmed Participants</h5>
                                  {participants.length === 0 && !isLoadingParticipants ? (
                                    <div className="text-[10px] text-zinc-600 italic">No users have joined this draw yet.</div>
                                  ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {participants.map((p) => (
                                        <div key={p.id} className="bg-black/30 border border-white/5 p-3 rounded-xl flex items-center justify-between">
                                          <div>
                                            <div className="text-[11px] font-bold text-white leading-none">{p.name || p.email}</div>
                                            <div className="text-[9px] text-zinc-600 mt-1 uppercase tracking-tighter">{p.charity || 'No Charity Selected'}</div>
                                          </div>
                                          <div className="flex gap-1">
                                            {p.scores.length < 5 ? (
                                              <span className="text-[8px] text-amber-500 font-bold uppercase tracking-widest px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                                                Partial Score ({p.scores.length}/5)
                                              </span>
                                            ) : (
                                              p.scores.map((s: number, i: number) => (
                                                <div key={i} className="h-5 w-5 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center justify-center text-[9px] font-bold text-emerald-500">
                                                  {s}
                                                </div>
                                              ))
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
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
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              The Draw Engine automatically generates 5 unique lucky numbers (1-45). It then scans all eligible Silver subscribers and compares their last 5 logged scores to find exact matches.
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5 bg-blue-500/2">
          <CardHeader className="pb-2">
            <User className="h-5 w-5 text-blue-500 mb-2" />
            <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Prize Pool Calculation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Estimated prizes are calculated as 40% of standard monthly revenue (Subscribed Users × £30). You can override these estimates manually before execution.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CalendarDays(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

function ResultGroup({ label, badge, winners, type }: { label: string, badge: string, winners: any[], type: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge className={`${badge} border-none font-black text-[9px] px-2 py-0`}>{label}</Badge>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {type === 'jackpot' ? '5 Matches' : type === 'pro' ? '4 Matches' : type === 'standard' ? '3 Matches' : type === 'runner-up' ? '2 Matches' : '1 Match'}
        </span>
      </div>
      {winners.length > 0 ? (
        <div className={`grid grid-cols-1 ${type !== 'jackpot' ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-3`}>
          {winners.map((w: any) => (
            <WinnerCard key={w.userId} winner={w} level={type as any} />
          ))}
        </div>
      ) : (
        <div className="text-[10px] text-zinc-600 italic px-4 py-2 border border-white/5 rounded-lg">No winners in this category.</div>
      )}
    </div>
  );
}

function WinnerCard({ winner, level }: { winner: any, level: 'jackpot' | 'pro' | 'standard' | 'runner-up' | 'consolation' }) {
  return (
    <div className="bg-white/2 border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors overflow-hidden">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`shrink-0 h-8 w-8 rounded-full ${level === 'jackpot' ? 'bg-amber-500/20' : level === 'pro' ? 'bg-zinc-300/20' : level === 'standard' ? 'bg-orange-800/20' : level === 'runner-up' ? 'bg-zinc-700/20' : 'bg-zinc-800/20'} flex items-center justify-center border border-white/10`}>
          <User className="h-4 w-4 text-white/40" />
        </div>
        <div className="min-w-0 pr-2">
          <div className="font-bold text-white text-sm truncate" title={winner.email}>{winner.email}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {winner.scores.map((s: number, i: number) => (
              <span key={i} className="text-[8px] px-1 bg-white/5 rounded text-zinc-500 font-mono">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-emerald-400 font-black italic">£{winner.prize}</div>
        <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Awarded</div>
      </div>
    </div>
  );
}

