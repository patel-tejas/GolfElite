import { createClient } from '@/utils/supabase/server'

export async function getUpcomingDraws() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: draws, error: drawError } = await supabase
    .from('draws')
    .select('*')
    .eq('status', 'upcoming')
    .order('draw_date', { ascending: true })
    .limit(5)

  if (drawError) {
    console.error('Error fetching draws:', drawError)
    return []
  }

  // Fetch current user's entries to determine "entered" status
  let userEntries: string[] = []
  if (user) {
    const { data: entries } = await supabase
      .from('draw_entries')
      .select('draw_id')
      .eq('user_id', user.id)
    userEntries = entries?.map(e => e.draw_id) || []
  }

  return (draws || []).map(draw => ({
    ...draw,
    is_entered: userEntries.includes(draw.id)
  }))
}

export async function getUserWinnings() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { total: 0, balance: 0, status: 'none' }

  const { data, error } = await supabase
    .from('winners')
    .select('prize_amount, payment_status')
    .eq('user_id', user.id)

  if (error || !data) {
    return { total: 0, balance: 0, status: 'none' }
  }

  const total = data.reduce((acc, w) => acc + Number(w.prize_amount), 0)
  const pending = data.filter(w => w.payment_status === 'pending')
  const balance = pending.reduce((acc, w) => acc + Number(w.prize_amount), 0)

  return {
    total,
    balance,
    status: pending.length > 0 ? 'pending' : (data.length > 0 ? 'paid' : 'none')
  }
}

export async function getPastDraws() {
  const supabase = await createClient()

  const { data: draws, error: drawError } = await supabase
    .from('draws')
    .select(`
      *,
      winners (
        id,
        user_id,
        prize_amount,
        payment_status,
        matched_numbers,
        user_numbers,
        proof_image_url,
        profiles (
          full_name,
          email
        )
      )
    `)
    .eq('status', 'completed')
    .order('draw_date', { ascending: false })
    .limit(10)

  if (drawError) {
    console.error('Error fetching past draws:', drawError)
    return []
  }

  return draws || []
}
