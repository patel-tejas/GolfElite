'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getUserFullWinnings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { draws: [], stats: { totalWon: 0, available: 0 } };

  // 1. Fetch completed draws
  const { data: draws, error: drawError } = await supabase
    .from('draws')
    .select('*')
    .eq('status', 'completed')
    .order('draw_date', { ascending: false });

  if (drawError) return { error: 'Failed to fetch draws' };

  // 2. Fetch user's winning records
  const { data: userWinners, error: winError } = await supabase
    .from('winners')
    .select('*')
    .eq('user_id', user.id);

  if (winError) return { error: 'Failed to fetch winnings' };

  // 3. Fetch user's score history
  const { data: scores, error: scoreError } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('played_at', { ascending: false });

  if (scoreError) return { error: 'Failed to fetch score history' };

  // 4. Combine data
  const results = (draws || []).map(draw => {
    // Find the winning record for this draw if any
    const winRecord = userWinners?.find(w => w.draw_id === draw.id);
    
    // Find the user's top 5 scores at the time of the draw
    const drawDate = new Date(draw.draw_date).getTime();
    const scoresAtTime = scores
      ?.filter(s => new Date(s.played_at).getTime() <= drawDate)
      .slice(0, 5)
      .map(s => s.score) || [];

    const winningNumbers = draw.winning_numbers || [];
    const matches = scoresAtTime.filter(s => winningNumbers.includes(s));

    return {
      id: draw.id,
      title: draw.title,
      date: draw.draw_date,
      winningNumbers,
      userNumbers: winRecord?.user_numbers || scoresAtTime,
      matchedNumbers: winRecord?.matched_numbers || matches,
      matchCount: winRecord?.matched_numbers?.length || matches.length,
      prizeAmount: winRecord?.prize_amount || 0,
      isWinner: !!winRecord,
      isClaimed: winRecord?.is_claimed || false,
      paymentStatus: winRecord?.payment_status || 'none',
      winnerId: winRecord?.id
    };
  });

  const totalWon = userWinners?.reduce((acc, w) => acc + Number(w.prize_amount), 0) || 0;
  const available = userWinners?.filter(w => !w.is_claimed).reduce((acc, w) => acc + Number(w.prize_amount), 0) || 0;

  return {
    draws: results,
    stats: {
      totalWon,
      available
    }
  };
}

export async function claimPrize(winnerId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('winners')
    .update({ is_claimed: true })
    .eq('id', winnerId)
    .eq('user_id', user.id); // Security: ensure it's their prize

  if (error) {
    console.error('Claim error:', error);
    return { error: 'Failed to claim prize' };
  }

  revalidatePath('/dashboard');
  return { success: true };
}
