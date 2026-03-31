import { getAllUsers } from '@/utils/admin/actions';
import { UserTable } from '@/components/admin/UserTable';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus, History } from 'lucide-react';
import Link from 'next/link';

export default async function UserManagement() {
  const { users, error } = await getAllUsers();

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-zinc-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-white mb-2 italic">User Management</h1>
          <p className="text-zinc-500 font-medium">View, edit, and manage all platform participants.</p>
        </div>
        <div className="flex items-center gap-3">
           <Link href="/admin/users/scores">
             <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-xs h-11 px-6 rounded-xl flex items-center gap-2">
               <History className="h-4 w-4" />
               Score Insights
             </Button>
           </Link>
           <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-xs h-11 px-6 rounded-xl">
             Export Data
           </Button>
           <Button className="btn-premium h-11 px-6 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2">
             <UserPlus className="h-4 w-4" />
             Invite Admin
           </Button>
        </div>
      </div>

      <UserTable users={users || []} />
    </div>
  );
}
