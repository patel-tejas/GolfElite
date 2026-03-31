import { createClient } from '@/utils/supabase/server';

/**
 * Checks if the currently authenticated user has the 'admin' role.
 * Useful for protecting Server Actions and Server Components.
 */
export async function isAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    console.error('Error checking admin role:', error);
    return false;
  }

  return profile.role === 'admin';
}

/**
 * Ensures the user is an admin or throws an unauthorized error.
 */
export async function ensureAdmin() {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) {
    throw new Error('Unauthorized: Admin access required');
  }
}
