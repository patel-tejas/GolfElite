'use client'

import { useState, useEffect } from 'react'
import { submitScore, deleteScore } from '@/utils/scores/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, PlusCircle, Trophy, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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

  // Update state when editData changes
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
      toast.error('Please enter a valid Stableford score between 1 and 45.')
      return
    }

    setIsPending(true)
    const result = await submitScore(scoreNum, playedAt, editData?.id)
    setIsPending(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(editData ? 'Score updated!' : 'Score submitted!')
      if (!editData) setScore('')
      setIsOpen(false)
      onSuccess?.()
    }
  }

  async function handleDelete() {
    if (!editData) return
    
    if (!confirm('Are you sure you want to delete this round?')) return

    setIsDeleting(true)
    const result = await deleteScore(editData.id)
    setIsDeleting(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Round deleted successfully')
      setIsOpen(false)
      onSuccess?.()
    }
  }

  return (
    <Card className={cn(
      "glass-panel overflow-hidden transition-all duration-500",
      editData && "border-primary ring-1 ring-primary/20"
    )}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <CardTitle className="text-xl">
            {editData ? 'Edit Stableford Score' : 'Digital Clubhouse'}
          </CardTitle>
          <CardDescription>
            {editData ? 'Updating round from ' + new Date(editData.played_at).toLocaleDateString() : 'Manage your rolling 5 performance.'}
          </CardDescription>
        </div>
        <Button 
          variant={isOpen ? "ghost" : "premium"} 
          size="sm" 
          onClick={() => {
            setIsOpen(!isOpen)
            if (isOpen && editData) onSuccess?.() // Clear edit mode on close
          }}
          className="gap-2 transition-all w-full sm:w-auto"
        >
          {isOpen ? 'Close' : <><PlusCircle className="h-4 w-4" /> Add Round</>}
        </Button>
      </CardHeader>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CardContent className="pt-0 pb-6 border-t border-border/50 bg-primary/5">
              <form onSubmit={handleSubmit} className="space-y-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="score" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">Stableford Score (1-45)</Label>
                    <Input
                      id="score"
                      type="number"
                      placeholder="e.g. 36"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      required
                      min={1}
                      max={45}
                      className="bg-background/50 border-primary/20 focus:border-primary h-14 text-2xl font-black text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playedAt" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">Date Played</Label>
                    <Input
                      id="playedAt"
                      type="date"
                      value={playedAt}
                      onChange={(e) => setPlayedAt(e.target.value)}
                      required
                      className="bg-background/50 border-primary/20 focus:border-primary h-14"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    type="submit" 
                    disabled={isPending || isDeleting} 
                    className="w-full sm:flex-1 h-12 btn-premium shadow-lg text-primary-foreground font-bold text-base"
                  >
                    {isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                      editData ? 'Update Round' : 'Submit Round'
                    )}
                  </Button>
                  {editData && (
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Button 
                        type="button" 
                        variant="destructive"
                        disabled={isPending || isDeleting}
                        onClick={handleDelete}
                        className="h-12 flex-1 sm:w-12 sm:flex-none p-0 flex items-center justify-center shrink-0 border-white/10 hover:bg-destructive/90"
                      >
                        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        disabled={isPending || isDeleting}
                        onClick={() => onSuccess?.()}
                        className="h-12 flex-1 sm:flex-none border-white/10 hover:bg-white/5"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <CardContent className="py-8 text-center bg-background/20">
          <p className="text-sm text-muted-foreground italic">Add your latest Stableford score to update your rolling average.</p>
        </CardContent>
      )}
    </Card>
  )
}
