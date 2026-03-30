'use client'

import { useState } from 'react'
import { submitScore } from '@/utils/scores/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, PlusCircle, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export function ScoreEntryForm({ isSubscribed }: { isSubscribed: boolean }) {
  const [score, setScore] = useState('')
  const [playedAt, setPlayedAt] = useState(new Date().toISOString().split('T')[0])
  const [isPending, setIsPending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isSubscribed) {
      toast.error('You need an active subscription to submit scores.')
      return
    }

    const scoreNum = parseInt(score)
    if (isNaN(scoreNum) || scoreNum < 40 || scoreNum > 120) {
      toast.error('Please enter a valid score between 40 and 120.')
      return
    }

    setIsPending(true)
    const result = await submitScore(scoreNum, playedAt)
    setIsPending(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Score submitted successfully!')
      setScore('')
      setIsOpen(false)
    }
  }

  if (!isSubscribed) {
    return (
      <Card className="glass-panel border-dashed opacity-80 overflow-hidden relative">
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-10 flex items-center justify-center p-6 text-center">
          <div className="space-y-2">
             <Trophy className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
             <p className="text-sm font-medium">Subscribe to unlock score tracking</p>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl">Submit New Score</CardTitle>
          <CardDescription>Enter your latest round details.</CardDescription>
        </CardHeader>
        <CardContent className="h-[120px]" />
      </Card>
    )
  }

  return (
    <Card className="glass-panel overflow-hidden transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-xl">Score Management</CardTitle>
          <CardDescription>Keep track of your performance.</CardDescription>
        </div>
        <Button 
          variant={isOpen ? "ghost" : "premium"} 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2 transition-all"
        >
          {isOpen ? 'Close' : <><PlusCircle className="h-4 w-4" /> Add Score</>}
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
                    <Label htmlFor="score" className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Gross Score</Label>
                    <Input
                      id="score"
                      type="number"
                      placeholder="e.g. 72"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      required
                      min={40}
                      max={120}
                      className="bg-background/50 border-primary/20 focus:border-primary h-12 text-lg font-heading"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playedAt" className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Date Played</Label>
                    <Input
                      id="playedAt"
                      type="date"
                      value={playedAt}
                      onChange={(e) => setPlayedAt(e.target.value)}
                      required
                      className="bg-background/50 border-primary/20 focus:border-primary h-12"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="w-full h-12 btn-primary-gradient shadow-lg text-primary-foreground font-bold text-base"
                >
                  {isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    'Submit Score'
                  )}
                </Button>
              </form>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <CardContent className="py-8 text-center bg-background/20">
          <p className="text-sm text-muted-foreground italic">Add your latest round score to update your ranking.</p>
        </CardContent>
      )}
    </Card>
  )
}
