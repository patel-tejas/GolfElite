'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitScore(score: number, playedAt: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Check subscription status
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  /* 
  if (profile?.subscription_status !== 'active') {
    return { error: 'Active subscription required to submit scores.' }
  }
  */

  // Validate score
  if (score < 40 || score > 120) {
    return { error: 'Score must be between 40 and 120' }
  }

  const { error } = await supabase.from('scores').insert({
    user_id: user.id,
    score,
    played_at: playedAt,
  })

  if (error) {
    console.error('Error submitting score:', error)
    return { error: error.message || 'Failed to submit score' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
