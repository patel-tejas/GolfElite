import { createClient } from '@/utils/supabase/server'

export async function getUpcomingDraws() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('draws')
    .select('*')
    .eq('status', 'upcoming')
    .order('draw_date', { ascending: true })
    .limit(5)

  if (error) {
    console.error('Error fetching draws:', error)
    return []
  }

  return data
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
