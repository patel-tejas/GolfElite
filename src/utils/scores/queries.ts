import { createClient } from '@/utils/supabase/server'

export async function getUserScores() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('played_at', { ascending: false })

  if (error) {
    console.error('Error fetching scores:', error)
    return []
  }

  return data
}

export async function getRollingTop5Summary() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch only the latest 5 scores for the user
  const { data: scores, error } = await supabase
    .from('scores')
    .select('id, score, played_at')
    .eq('user_id', user.id)
    .order('played_at', { ascending: false })
    .limit(5)

  if (error || !scores || scores.length === 0) {
    return {
      average: 0,
      count: 0,
      needed: 5,
      top5: []
    }
  }

  // Calculate sum and average of the retained scores
  const sum = scores.reduce((acc, s) => acc + s.score, 0)
  const average = scores.length > 0 ? sum / scores.length : 0

  return {
    average: parseFloat(average.toFixed(1)),
    count: scores.length,
    needed: Math.max(0, 5 - scores.length),
    top5: scores // This is already the latest 5 in reverse chronological order
  }
}
