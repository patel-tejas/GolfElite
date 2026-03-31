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
      "rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-500 shadow-sm relative",
      editData && "ring-2 ring-zinc-900 dark:ring-white shadow-2xl"
    )}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div 
            key="closed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 md:p-8 flex items-center justify-between cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                <LayoutGrid className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
                  Digital Clubhouse
                </h3>
                <p className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                  Record Your Next Performance
                </p>
              </div>
            </div>
            
            <button className="h-12 px-8 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Add Round
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-8 md:p-12 space-y-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
                  {editData ? 'Audit Record' : 'New Performance'}
                </h3>
                <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {editData ? 'Update Round' : 'Digitize Round'}
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false)
                  if (editData) onSuccess?.()
                }}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-4 space-y-4">
                <Label htmlFor="score" className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 ml-1">
                  Stableford Score
                </Label>
                <div className="relative">
                  <Target className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-300 dark:text-zinc-600" />
                  <Input
                    id="score"
                    type="number"
                    placeholder="--"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                    min={1}
                    max={45}
                    className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white h-16 text-3xl font-black pl-16 rounded-2xl transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-5 space-y-4">
                <Label htmlFor="playedAt" className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 ml-1">
                  Played On
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-300 dark:text-zinc-600" />
                  <Input
                    id="playedAt"
                    type="date"
                    value={playedAt}
                    onChange={(e) => setPlayedAt(e.target.value)}
                    required
                    className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-white h-16 text-sm font-black pl-16 rounded-2xl transition-all uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="md:col-span-3 flex gap-3">
                <button 
                  type="submit" 
                  disabled={isPending || isDeleting} 
                  className="flex-1 h-16 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.05] active:scale-[0.95] transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : editData ? 'Update' : 'Archive'}
                </button>
                
                {editData && (
                  <button 
                    type="button" 
                    disabled={isPending || isDeleting}
                    onClick={handleDelete}
                    className="h-16 w-16 shrink-0 rounded-2xl border-2 border-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                  >
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
