'use server';

import { createClient } from '@/utils/supabase/server';
import { ensureAdmin } from '@/lib/admin';
import { revalidatePath } from 'next/cache';

export async function getAdminStats() {
  await ensureAdmin();
  const supabase = await createClient();

  // 1. Total Users
  const { count: totalUsers, error: userError } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // 2. Active Subscribers
  const { count: activeSubscribers, error: subError } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_subscribed', true);

  // 3. Charity Count
  const { count: totalCharities, error: charityError } = await supabase
    .from('charities')
    .select('*', { count: 'exact', head: true });

  // 4. Score Count
  const { count: totalScores, error: scoreError } = await supabase
    .from('scores')
    .select('*', { count: 'exact', head: true });

  if (userError || subError || charityError || scoreError) {
    console.error('Error fetching admin stats:', { userError, subError, charityError, scoreError });
    return { error: 'Failed to fetch platform statistics' };
  }

  // Calculate Financials (Mock logic based on $50/mo plan)
  const monthlyRevenue = (activeSubscribers || 0) * 50;
  const prizePool = monthlyRevenue * 0.4; // 40% to prize
  const charityTotal = monthlyRevenue * 0.1; // 10% to charity

  return {
    stats: {
      totalUsers: totalUsers || 0,
      activeSubscribers: activeSubscribers || 0,
      totalCharities: totalCharities || 0,
      totalScores: totalScores || 0,
      prizePool,
      charityTotal,
      monthlyRevenue
    }
  };
}

export async function getAllUsers() {
  await ensureAdmin();
  const supabase = await createClient();

  // Fetch profiles with score IDs to get count
  const { data: users, error } = await supabase
    .from('profiles')
    .select('*, scores(id)')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching users:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    return { error: error.message || 'Failed to fetch users' };
  }

  return { users: users || [] };
}

export async function getUsersWithScores() {
  await ensureAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      email,
      full_name,
      is_subscribed,
      scores (
        score,
        played_at
      )
    `)
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching users with scores:', error);
    return { error: 'Failed to fetch user score history' };
  }

  return { users: data || [] };
}

export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  await ensureAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    return { error: 'Failed to update user role' };
  }

  return { success: true };
}

export async function getDrawStats() {
  await ensureAdmin();
  const supabase = await createClient();

  const { data: recentDraws, error } = await supabase
    .from('draws')
    .select('*, winner:profiles(email)')
    .order('created_at', { ascending: false })
    .limit(5);

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_subscribed', true);

  // Prize pool logic (40% of subscribed users * 50)
  const prizePool = (totalUsers || 0) * 50 * 0.4;

  return {
    recentDraws: recentDraws || [],
    totalUsers: totalUsers || 0,
    prizePool
  };
}

export async function simulateDraw(algorithm: 'random' | 'weighted') {
  await ensureAdmin();
  const supabase = await createClient();

  // 1. Generate 5 Unique Lucky Numbers (1-45)
  const luckyNumbers: number[] = [];
  while (luckyNumbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!luckyNumbers.includes(num)) luckyNumbers.push(num);
  }

  // 2. Fetch Eligible Users & Their Scores
  const { data: users, error } = await supabase
    .from('profiles')
    .select(`
      id,
      email,
      full_name,
      is_subscribed,
      scores (
        score,
        played_at
      )
    `)
    .eq('is_subscribed', true)
    .eq('role', 'user');

  if (error || !users) return { error: 'Failed to fetch eligible users' };

  // 3. Exact Matching Engine
  const results = {
    luckyNumbers: luckyNumbers.sort((a, b) => a - b),
    matches5: [] as any[],
    matches4: [] as any[],
    matches3: [] as any[]
  };

  users.forEach(user => {
    // Only consider users with at least 5 scores
    if (!user.scores || user.scores.length < 5) return;

    // Get the 5 most recent scores
    const userScores = user.scores
      .sort((a: any, b: any) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
      .slice(0, 5)
      .map((s: any) => s.score);

    // Count intersections with lucky numbers
    const matches = userScores.filter(s => luckyNumbers.includes(s)).length;

    const winnerInfo = {
      id: user.id,
      email: user.email,
      name: user.full_name,
      scores: userScores,
      matchCount: matches
    };

    if (matches === 5) results.matches5.push({ ...winnerInfo, prize: 5000 });
    else if (matches === 4) results.matches4.push({ ...winnerInfo, prize: 1000 });
    else if (matches === 3) results.matches3.push({ ...winnerInfo, prize: 500 });
  });

  return { success: true, results };
}

export async function publishDrawResults(results: any) {
  await ensureAdmin();
  const supabase = await createClient();

  const { luckyNumbers, matches5, matches4, matches3 } = results;
  const allWinners = [...matches5, ...matches4, ...matches3];

  if (allWinners.length === 0) {
    return { error: 'No winners found to publish.' };
  }

  // 1. Create a draw record
  const { data: draw, error: drawError } = await supabase
    .from('draws')
    .insert({
      title: `${new Date().toLocaleString('default', { month: 'long' })} Monthly Draw`,
      description: `Draw Results: ${luckyNumbers.join(', ')}`,
      draw_date: new Date().toISOString(),
      status: 'completed',
      prize_pool: allWinners.reduce((acc, r) => acc + r.prize, 0),
      winning_numbers: luckyNumbers
    })
    .select()
    .single();

  if (drawError) {
    console.error('Draw insertion error:', drawError);
    return { error: 'Failed to create draw record' };
  }

  // 2. Create winner records with match details
  const winners = allWinners.map(r => ({
    user_id: r.id,
    draw_id: draw.id,
    prize_amount: r.prize,
    payment_status: 'pending',
    is_claimed: false,
    user_numbers: r.scores,
    matched_numbers: r.scores.filter((s: number) => luckyNumbers.includes(s))
  }));

  const { error: winnerError } = await supabase
    .from('winners')
    .insert(winners);

  if (winnerError) {
    console.error('Winner insertion error:', winnerError);
    return { error: 'Failed to record winners' };
  }

  revalidatePath('/admin/draws');
  revalidatePath('/admin/winners');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function getWinners() {
  await ensureAdmin();
  const supabase = await createClient();

  const { data: winners, error } = await supabase
    .from('winners')
    .select(`
      *,
      user:profiles(email),
      draw:draws(name)
    `)
    .order('created_at', { ascending: false });

  if (error) return { error: 'Failed to fetch winners' };
  return { winners };
}

export async function updatePayoutStatus(winnerId: string, status: string) {
  await ensureAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('winners')
    .update({ payout_status: status })
    .eq('id', winnerId);

  if (error) return { error: 'Failed to update payout status' };
  
  revalidatePath('/admin/winners');
  return { success: true };
}
