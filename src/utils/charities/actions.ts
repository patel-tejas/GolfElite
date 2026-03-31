'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCharities() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('charities')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching charities:', error)
    return { error: 'Failed to fetch charities' }
  }

  return { data }
}

export async function updateSelectedCharity(charityId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Also fetch the name to keep it synced (though we should move to ID-only eventually)
  const { data: charity } = await supabase
    .from('charities')
    .select('name')
    .eq('id', charityId)
    .single()

  const { error } = await supabase
    .from('profiles')
    .update({ 
      charity_id: charityId,
      charity_name: charity?.name || ''
    })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating charity:', error)
    return { error: 'Failed to update selection' }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function createCharity(charity: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('charities')
    .insert(charity)

  if (error) {
    console.error('Error creating charity:', error)
    return { error: 'Failed to create charity' }
  }

  revalidatePath('/admin/charities')
  return { success: true }
}

export async function updateCharity(id: string, charity: any) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('charities')
    .update(charity)
    .eq('id', id)

  if (error) {
    console.error('Error updating charity:', error)
    return { error: 'Failed to update charity' }
  }

  revalidatePath('/admin/charities')
  return { success: true }
}

export async function deleteCharity(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('charities')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting charity:', error)
    return { error: 'Failed to delete charity' }
  }

  revalidatePath('/admin/charities')
  return { success: true }
}
