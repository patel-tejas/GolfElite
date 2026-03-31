'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function enterDraw(drawId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'You must be logged in to participate.' }
  }

  try {
    const { error } = await supabase
      .from('draw_entries')
      .insert({
        user_id: user.id,
        draw_id: drawId
      })

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'You have already entered this draw.' }
      }
      throw error
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (err: any) {
    console.error('Error entering draw:', err)
    return { success: false, error: 'Failed to join the draw. Please try again.' }
  }
}

export async function claimWinnings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const file = formData.get('file') as File
  const winnerId = formData.get('winnerId') as string

  if (!file || !winnerId) {
    return { success: false, error: 'Missing file or winner ID' }
  }

  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/${winnerId}-${Date.now()}.${fileExt}`

  try {
    const { error: uploadError } = await supabase
      .storage
      .from('scorecards')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase
      .storage
      .from('scorecards')
      .getPublicUrl(filePath)

    const { error: updateError } = await supabase
      .from('winners')
      .update({
        proof_image_url: publicUrl,
        payment_status: 'claimed'
      })
      .eq('id', winnerId)
      .eq('user_id', user.id)

    if (updateError) throw updateError

    revalidatePath('/dashboard')
    return { success: true }
  } catch (err: any) {
    console.error('Error claiming winnings:', err)
    return { success: false, error: err.message || 'Failed to submit proof' }
  }
}
