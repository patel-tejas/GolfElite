'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ScoreBallGrid } from './ScoreBallGrid'
import { ScoreEntryForm } from '../scores/ScoreEntryForm'

interface ScoreEntry {
  id: string
  score: number
  played_at: string
}

interface ScoreManagementProps {
  initialScores: ScoreEntry[]
  average: number
  needed: number
  isSubscribed: boolean
}

export function ScoreManagement({ initialScores, average, needed, isSubscribed }: ScoreManagementProps) {
  const [editingScore, setEditingScore] = useState<ScoreEntry | null>(null)
  const router = useRouter()

  const handleEdit = (score: ScoreEntry) => {
    setEditingScore(score)
    // Scroll to form if needed
    window.scrollTo({ 
      top: document.getElementById('score-form')?.offsetTop ? document.getElementById('score-form')!.offsetTop - 100 : 0, 
      behavior: 'smooth' 
    })
  }

  const handleSuccess = () => {
    setEditingScore(null)
    router.refresh()
  }

  return (
    <div className="space-y-12">
      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <ScoreBallGrid 
          scores={initialScores} 
          average={average}
          needed={needed}
          onEdit={handleEdit}
        />
      </section>

      <section id="score-form" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <ScoreEntryForm 
          isSubscribed={isSubscribed} 
          editData={editingScore} 
          onSuccess={handleSuccess}
        />
      </section>
    </div>
  )
}
