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

  // Fetch all scores for the user
  const { data: scores, error } = await supabase
    .from('scores')
    .select('score')
    .eq('user_id', user.id)
    .order('played_at', { ascending: false })

  if (error || !scores || scores.length === 0) {
    return {
      average: 0,
      count: 0,
      needed: 5,
      top5: []
    }
  }

  // Rolling Top 5 logic:
  // Usually in golf, it's the average of the best 8 of the last 20.
  // For this charity platform, we use the average of the BEST 5 scores ever submitted.
  const sortedScores = [...scores].sort((a, b) => a.score - b.score)
  const top5 = sortedScores.slice(0, 5)
  const sum = top5.reduce((acc, s) => acc + s.score, 0)
  const average = top5.length > 0 ? sum / top5.length : 0

  return {
    average: parseFloat(average.toFixed(1)),
    count: scores.length,
    needed: Math.max(0, 5 - scores.length),
    top5: top5.map(s => s.score)
  }
}
