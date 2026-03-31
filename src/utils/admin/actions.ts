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

  const { data: allDraws, error } = await supabase
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
    .order('created_at', { ascending: false });

  const upcomingDraws = allDraws?.filter(d => d.status === 'upcoming') || [];
  const recentDraws = allDraws?.filter(d => d.status === 'completed').slice(0, 5) || [];

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_subscribed', true);

  // Prize pool logic (40% of subscribed users * £50)
  const prizePool = (totalUsers || 0) * 50 * 0.4;

  return {
    upcomingDraws,
    recentDraws,
    totalUsers: totalUsers || 0,
    prizePool
  };
}

export async function verifyWinner(winnerId: string, status: 'verified' | 'paid' | 'rejected') {
  try {
    await ensureAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from('winners')
      .update({ payment_status: status })
      .eq('id', winnerId);

    if (error) throw error;
    
    revalidatePath('/admin/draws');
    return { success: true };
  } catch (err: any) {
    console.error('Error verifying winner:', err);
    return { error: err.message || 'Failed to verify winner' };
  }
}

export async function createDraw(title: string, prizePool: number) {
  try {
    await ensureAdmin();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('draws')
      .insert({
        title,
        prize_pool: prizePool,
        draw_date: new Date().toISOString(),
        status: 'upcoming'
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/admin/draws');
    return { success: true, draw: data };
  } catch (err: any) {
    console.error('Error creating draw:', err);
    return { error: err.message || 'Failed to create draw' };
  }
}

export async function updateDraw(drawId: string, title: string, prizePool: number) {
  try {
    await ensureAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from('draws')
      .update({ 
        title, 
        prize_pool: prizePool 
      })
      .eq('id', drawId);

    if (error) throw error;

    revalidatePath('/admin/draws');
    return { success: true };
  } catch (err: any) {
    console.error('Error updating draw:', err);
    return { error: err.message || 'Failed to update draw' };
  }
}

export async function getDrawParticipants(drawId: string) {
  try {
    await ensureAdmin();
    const supabase = await createClient();

    const { data: entries, error } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        full_name,
        charity_name,
        draw_entries!inner(draw_id),
        scores (
          score,
          played_at
        )
      `)
      .eq('draw_entries.draw_id', drawId)
      .eq('is_subscribed', true);

    if (error) throw error;

    // Format and only take last 5 scores for each
    const participants = (entries || []).map((p: any) => {
      const lastScores = (p.scores || [])
        .sort((a: any, b: any) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
        .slice(0, 5)
        .map((s: any) => s.score);
      
      return {
        id: p.id,
        email: p.email,
        name: p.full_name,
        charity: p.charity_name,
        scores: lastScores
      };
    }) || [];

    return { success: true, participants };
  } catch (err: any) {
    console.error('Error in getDrawParticipants:', err);
    return { success: false, error: 'Failed to fetch participants: ' + (err.message || 'Internal Server Error') };
  }
}

export async function simulateDraw(drawId: string, algorithm: 'random' | 'weighted', manualNumbers: number[] = []) {
  try {
    await ensureAdmin();
    const supabase = await createClient();

    // 1. Generate/Set 5 Unique Lucky Numbers (1-45)
    let luckyNumbers: number[] = [...manualNumbers];
    if (luckyNumbers.length !== 5) {
      luckyNumbers = [];
      while (luckyNumbers.length < 5) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!luckyNumbers.includes(num)) luckyNumbers.push(num);
      }
    }
    luckyNumbers.sort((a, b) => a - b);

    // 2. Fetch Eligible Users & Their Scores
    const { data: users, error } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        full_name,
        is_subscribed,
        draw_entries!inner(draw_id),
        scores (
          score,
          played_at
        )
      `)
      .eq('draw_entries.draw_id', drawId)
      .eq('is_subscribed', true);

    if (error || !users) return { error: 'Failed to fetch eligible users' };

    // 3. Matching Engine
    const matches5: any[] = [];
    const matches4: any[] = [];
    const matches3: any[] = [];
    const matches2: any[] = [];
    const matches1: any[] = [];

    users.forEach(user => {
      if (!user.scores || user.scores.length < 5) return;

      const userScores = user.scores
        .sort((a: any, b: any) => new Date(b.played_at).getTime() - new Date(a.played_at).getTime())
        .slice(0, 5)
        .map((s: any) => s.score);

      // Deduplicate matched numbers so a user with two 45s doesn't get 2 matches for a single lucky 45
      const matchedNumbers = new Set(userScores.filter(s => luckyNumbers.includes(s)));
      const matches = matchedNumbers.size;

      const winnerInfo = {
        userId: user.id,
        email: user.email,
        name: user.full_name,
        scores: userScores,
        matchCount: matches
      };

      if (matches === 5) matches5.push({ ...winnerInfo, prize: 5000 });
      else if (matches === 4) matches4.push({ ...winnerInfo, prize: 1000 });
      else if (matches === 3) matches3.push({ ...winnerInfo, prize: 500 });
      else if (matches === 2) matches2.push({ ...winnerInfo, prize: 100 });
      else if (matches === 1) matches1.push({ ...winnerInfo, prize: 10 });
    });

    const potentialWinners = [...matches5, ...matches4, ...matches3, ...matches2, ...matches1];

    return { 
      success: true, 
      luckyNumbers, 
      winners: potentialWinners,
      matches5,
      matches4,
      matches3,
      matches2,
      matches1
    };
  } catch (err: any) {
    console.error('Simulation error:', err);
    return { error: 'Failed to simulate draw' };
  }
}

export async function executeDraw(drawId: string, luckyNumbers: number[], winners: any[]) {
  try {
    await ensureAdmin();
    const supabase = await createClient();

    // 1. Update Draw Record
    const { error: drawError } = await supabase
      .from('draws')
      .update({
        status: 'completed',
        winning_numbers: luckyNumbers,
        description: `Winning Numbers: ${luckyNumbers.join(', ')}. ${winners.length} winners found.`,
        prize_pool: winners.reduce((acc, r) => acc + r.prize, 0)
      })
      .eq('id', drawId);

    if (drawError) throw drawError;

    // 2. Create winner records if any
    if (winners.length > 0) {
      const winnerRecords = winners.map(r => ({
        user_id: r.userId,
        draw_id: drawId,
        prize_amount: r.prize,
        payment_status: 'pending',
        matched_numbers: luckyNumbers.filter(n => r.scores.includes(n)),
        user_numbers: r.scores
      }));

      const { error: winnerError } = await supabase
        .from('winners')
        .insert(winnerRecords);

      if (winnerError) throw winnerError;
    }

    revalidatePath('/admin/draws');
    revalidatePath('/admin/winners');
    return { success: true };
  } catch (err: any) {
    console.error('Finalize draw error:', err);
    return { error: 'Failed to finalize draw: ' + err.message };
  }
}


export async function getWinners() {
  await ensureAdmin();
  const supabase = await createClient();

  const { data: winners, error } = await supabase
    .from('winners')
    .select(`
      *,
      user:profiles(email),
      draw:draws(title)
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
