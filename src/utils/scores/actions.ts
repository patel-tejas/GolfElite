'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitScore(score: number, playedAt: string, scoreId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Validate Stableford score (1-45)
  if (score < 1 || score > 45) {
    return { error: 'Stableford score must be between 1 and 45' }
  }

  if (scoreId) {
    // Edit existing score
    const { error } = await supabase
      .from('scores')
      .update({ score, played_at: playedAt })
      .eq('id', scoreId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error updating score:', error)
      return { error: 'Failed to update score' }
    }
  } else {
    // Add new score with Rolling 5 Logic
    const { data: existingScores, error: fetchError } = await supabase
      .from('scores')
      .select('id, played_at')
      .eq('user_id', user.id)
      .order('played_at', { ascending: true })

    if (fetchError) {
      console.error('Error fetching scores:', fetchError)
      return { error: 'Failed to process rolling limit' }
    }

    // If we already have 5 scores, delete the oldest one (first in ascending order)
    if (existingScores && existingScores.length >= 5) {
      const oldestId = existingScores[0].id
      await supabase.from('scores').delete().eq('id', oldestId)
    }

    const { error: insertError } = await supabase.from('scores').insert({
      user_id: user.id,
      score,
      played_at: playedAt,
    })

    if (insertError) {
      console.error('Error submitting score:', insertError)
      return { error: insertError.message || 'Failed to submit score' }
    }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteScore(scoreId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('scores')
    .delete()
    .eq('id', scoreId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting score:', error)
    return { error: 'Failed to delete score' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
