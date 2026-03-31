'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Trophy, CheckCircle2, ChevronDown, ChevronUp, Image as ImageIcon, Send, Loader2, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { format } from "date-fns"
import { claimWinnings } from "@/utils/dashboard/actions"
import { toast } from "sonner"

export function PastDraws({ draws, currentUserId }: { draws: any[], currentUserId: string }) {
  const [expandedDraw, setExpandedDraw] = useState<string | null>(null)
  
  if (!draws || draws.length === 0) {
    return (
      <Card className="bg-white/60 dark:bg-zinc-900/50 border-emerald-900/10 dark:border-white/5 backdrop-blur-xl shadow-xl">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Trophy className="h-12 w-12 text-emerald-500/20 mb-4" />
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No Past Draws Available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 dark:bg-zinc-900/50 border-emerald-900/10 dark:border-white/5 backdrop-blur-xl shadow-xl relative overflow-hidden w-full">
      <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-zinc-900 flex items-center justify-center border border-emerald-900/10 dark:border-white/5">
            <Trophy className="h-5 w-5 text-emerald-600 dark:text-zinc-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Draw History
            </CardTitle>
            <CardDescription className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
              Previous Results & Winners
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        {draws.map((draw) => (
          <DrawRow 
            key={draw.id} 
            draw={draw} 
            isExpanded={expandedDraw === draw.id} 
            onToggle={() => setExpandedDraw(expandedDraw === draw.id ? null : draw.id)}
            currentUserId={currentUserId}
          />
        ))}
      </CardContent>
    </Card>
  )
}

function DrawRow({ draw, isExpanded, onToggle, currentUserId }: { draw: any, isExpanded: boolean, onToggle: () => void, currentUserId: string }) {
  const hasWinners = draw.winners && draw.winners.length > 0;
  
  // See if current user won in this draw
  const currentUserWin = draw.winners?.find((w: any) => w.user_id === currentUserId);

  return (
    <div className="border border-emerald-900/10 dark:border-white/5 bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-sm transition-all duration-300 w-full">
      <div 
        onClick={onToggle}
        className="p-3 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors w-full"
      >
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-zinc-900 dark:text-white tracking-wider sm:tracking-widest uppercase text-xs sm:text-sm truncate block max-w-full">{draw.title}</h4>
          <p className="text-xs text-zinc-500">{draw.draw_date ? format(new Date(draw.draw_date), 'MMM d, yyyy') : 'No Date'}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
           {currentUserWin && (
             <div className="bg-amber-500 text-black px-2 py-0.5 rounded uppercase text-[9px] font-black tracking-wider sm:tracking-widest hidden xs:inline-flex shrink-0">
                You Won!
             </div>
           )}
           <div className="text-right hidden sm:block">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Prize Pool</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">£{draw.prize_pool || 0}</p>
           </div>
           {isExpanded ? <ChevronUp className="h-4 w-4 text-zinc-500 shrink-0" /> : <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-3 sm:p-4 border-t border-emerald-900/10 dark:border-white/5 bg-zinc-50/50 dark:bg-black/20 space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
          
          {/* Prize Pool - visible on mobile when expanded */}
          <div className="sm:hidden flex items-center justify-between min-w-0 w-full">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Prize Pool</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">£{draw.prize_pool || 0}</span>
          </div>

          {/* Lucky Numbers Display */}
          {draw.lucky_numbers && draw.lucky_numbers.length > 0 && (
            <div className="min-w-0">
              <p className="text-[10px] font-black tracking-[0.15em] sm:tracking-[0.2em] text-emerald-600 dark:text-emerald-500 uppercase mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                Winning Numbers
              </p>
              <div className="flex flex-wrap gap-2 w-full">
                {draw.lucky_numbers.map((num: number, i: number) => (
                  <div key={i} className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg outline outline-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-[10px] sm:text-xs shrink-0">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current User Verification UI */}
          {currentUserWin && (
            <ClaimSection win={currentUserWin} />
          )}

          {/* All Winners List */}
          <div className="min-w-0 w-full">
            <p className="text-[10px] font-black tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase mb-3 flex items-center gap-2">
              <Trophy className="h-3 w-3" />
              Winners List
            </p>
            {hasWinners ? (
              <div className="space-y-2 w-full min-w-0">
                {draw.winners.map((w: any) => (
                  <div key={w.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white dark:bg-white/5 border border-emerald-900/10 dark:border-white/5 shadow-sm dark:shadow-none rounded-xl text-sm gap-3 w-full overflow-hidden min-w-0">
                     <div className="flex items-center gap-3 min-w-0 w-full flex-1">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-50 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                           <Trophy className="h-3 w-3 text-emerald-600 dark:text-zinc-500" />
                        </div>
                        <div className="min-w-0 flex-1 w-full overflow-hidden">
                           <p className="text-zinc-900 dark:text-white font-bold text-xs sm:text-sm truncate block max-w-full">{w.profiles?.full_name || w.profiles?.email || 'Anonymous'}</p>
                           <p className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-wider sm:tracking-widest mt-0.5 truncate block max-w-full">Matched: {w.matched_numbers?.join(', ') || 'N/A'}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 sm:pl-0 w-full sm:w-auto mt-1 sm:mt-0">
                        <p className="text-emerald-600 dark:text-emerald-400 font-black italic text-sm">£{w.prize_amount}</p>
                        <div className={`${w.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-500'} px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase shrink-0`}>
                           {w.payment_status}
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-600 italic">No winners recorded for this draw.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ClaimSection({ win }: { win: any }) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setIsClaiming(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('winnerId', win.id);

      const result = await claimWinnings(formData);
      if (result.success) {
        toast.success('Proof uploaded successfully. Pending admin verification.');
        // In a real app we'd refresh the server component, for now we will just show a toast
        win.payment_status = 'claimed'; 
      } else {
        toast.error(result.error || 'Failed to upload proof');
      }
    } catch (e: any) {
      toast.error(e.message || 'An error occurred');
    } finally {
      setIsClaiming(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 bg-linear-to-br from-amber-500/20 to-orange-600/10 border border-amber-500/30 rounded-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-amber-500 uppercase tracking-wider sm:tracking-widest flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> You are a Winner!
          </h3>
          <p className="text-amber-500/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest mb-4">
            Upload proof to claim £{win.prize_amount}
          </p>
          
          {win.payment_status === 'pending' && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="cursor-pointer w-full sm:w-auto block flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-black/50 hover:bg-black/70 border border-amber-500/30 px-4 py-2 rounded-lg text-xs font-bold text-amber-500 transition-colors uppercase tracking-widest w-full min-w-0">
                  <ImageIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate flex-1 min-w-0">{file ? file.name : 'Select Image'}</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              
              <Button 
                onClick={handleUpload}
                disabled={!file || isClaiming}
                className="bg-amber-500 text-black hover:bg-amber-400 font-black uppercase text-[10px] tracking-widest h-auto py-2 w-full sm:w-auto"
              >
                {isClaiming ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Submit Proof
              </Button>
            </div>
          )}
          
          {win.payment_status === 'claimed' && (
            <div className="bg-amber-500 text-black font-black uppercase tracking-wider sm:tracking-widest py-1.5 px-3 rounded-full shadow-lg shadow-amber-500/20 text-center text-[10px] sm:text-xs">
              Proof Submitted &bull; Awaiting Review
            </div>
          )}

          {win.payment_status === 'verified' && (
            <div className="bg-emerald-500 text-black font-black uppercase tracking-wider sm:tracking-widest py-1.5 px-3 rounded-full shadow-lg shadow-emerald-500/20 text-center text-[10px] sm:text-xs">
              Verified &bull; Ready for Payout
            </div>
          )}

          {win.payment_status === 'paid' && (
             <div className="bg-emerald-500 text-black font-black uppercase tracking-wider sm:tracking-widest py-1.5 px-3 rounded-full shadow-lg shadow-emerald-500/20 text-center text-[10px] sm:text-xs inline-block">
              Paid
            </div>
          )}
        </div>
        
        {win.proof_image_url && (
           <div className="mt-4 md:mt-0 md:ml-auto">
             <a href={win.proof_image_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-amber-500 hover:text-white uppercase font-bold tracking-widest transition-colors">
               <Download className="h-3 w-3" /> View Uploaded Proof
             </a>
           </div>
        )}
      </div>
    </div>
  )
}
