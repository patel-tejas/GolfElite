'use client'

import { useState, useEffect } from 'react'
import { submitScore, deleteScore } from '@/utils/scores/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, PlusCircle, Trophy, Trash2, Calendar, Target, Sparkles, LayoutGrid, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ScoreEntryForm({ 
  isSubscribed, 
  editData = null, 
  onSuccess 
}: { 
  isSubscribed: boolean, 
  editData?: { id: string, score: number, played_at: string } | null,
  onSuccess?: () => void
}) {
  const [score, setScore] = useState(editData?.score.toString() || '')
  const [playedAt, setPlayedAt] = useState(
    editData ? new Date(editData.played_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  )
  const [isPending, setIsPending] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOpen, setIsOpen] = useState(!!editData)

  useEffect(() => {
    if (editData) {
      setScore(editData.score.toString())
      setPlayedAt(new Date(editData.played_at).toISOString().split('T')[0])
      setIsOpen(true)
    }
  }, [editData])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const scoreNum = parseInt(score)
    if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 45) {
      toast.error('Please enter a valid Stableford score (1-45).')
      return
    }

    setIsPending(true)
    const result = await submitScore(scoreNum, playedAt, editData?.id)
    setIsPending(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(editData ? 'Performance record updated' : 'Score successfully archived')
      if (!editData) setScore('')
      setIsOpen(false)
      onSuccess?.()
    }
  }

  async function handleDelete() {
    if (!editData) return
    if (!confirm('Are you sure you want to remove this record?')) return

    setIsDeleting(true)
    const result = await deleteScore(editData.id)
    setIsDeleting(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Performance record purged')
      setIsOpen(false)
      onSuccess?.()
    }
  }

  return (
    <div className={cn(
      "rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-500 shadow-sm",
      editData && "ring-2 ring-zinc-900 dark:ring-white shadow-2xl"
    )}>
      <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <LayoutGrid className="h-3.5 w-3.5" />
              Round Entry
            </h3>
            <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
               {editData ? 'Audit Performance' : 'Archive New Record'}
            </p>
          </div>
          
          <button 
            onClick={() => {
              setIsOpen(!isOpen)
              if (isOpen && editData) onSuccess?.()
            }}
            className={cn(
              "h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 shadow-lg",
              isOpen 
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white" 
                : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-[1.05]"
            )}
          >
            {isOpen ? 'Minimize' : <><PlusCircle className="h-4 w-4" /> Add Record</>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="p-8 space-y-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label htmlFor="score" className="text-[11px] uppercase font-black tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-1">
                      Stableford Score
                    </Label>
                    <div className="relative group">
                      <Target className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-300 dark:text-zinc-600 transition-colors group-focus-within:text-zinc-900 dark:group-focus-within:text-white" />
                      <Input
                        id="score"
                        type="number"
                        placeholder="--"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                        min={1}
                        max={45}
                        className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-white h-24 text-5xl font-black text-center pl-10 rounded-3xl placeholder:text-zinc-200 dark:placeholder:text-zinc-800 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="playedAt" className="text-[11px] uppercase font-black tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-1">
                      Event Date
                    </Label>
                    <div className="relative group">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-300 dark:text-zinc-600 transition-colors group-focus-within:text-zinc-900 dark:group-focus-within:text-white" />
                      <Input
                        id="playedAt"
                        type="date"
                        value={playedAt}
                        onChange={(e) => setPlayedAt(e.target.value)}
                        required
                        className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-white h-24 text-xl font-black pl-16 rounded-3xl tracking-tight transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <button 
                    type="submit" 
                    disabled={isPending || isDeleting} 
                    className="flex-1 h-16 rounded-3xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3"
                  >
                    {isPending ? (
                      <><Loader2 className="h-5 w-5 animate-spin" /> Authenticating...</>
                    ) : (
                      <>
                         {editData ? 'Commit Record' : 'Seal Performance'}
                         <Sparkles className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  
                  {editData && (
                    <button 
                      type="button" 
                      disabled={isPending || isDeleting}
                      onClick={handleDelete}
                      className="h-16 w-16 shrink-0 rounded-3xl border-2 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-lg"
                    >
                      {isDeleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <div className="p-10 text-center group cursor-pointer" onClick={() => setIsOpen(true)}>
           <div className="flex flex-col items-center gap-4 transition-all duration-500 group-hover:scale-105">
              <div className="h-14 w-14 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-inner group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-700">
                <Trophy className="h-6 w-6 opacity-40" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.4em]">
                   Standing By
                </p>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-sm font-black text-zinc-900 dark:text-white tracking-tight">Record your next elite performance</span>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}
