import { getAllUsers } from '@/utils/admin/actions';
import { UserTable } from '@/components/admin/UserTable';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus, History, ShieldCheck, Download, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function UserManagement() {
  const { users, error } = await getAllUsers();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 animate-in fade-in duration-700">
        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 mb-4">
          <ShieldCheck className="h-8 w-8 text-red-500/50" />
        </div>
        <p className="font-black uppercase tracking-widest text-[10px]">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Background Glory */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-accent/5 blur-[100px] rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-px w-8 bg-primary/40" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence & Oversight</span>
          </div>
          <div>
            <h1 className="text-5xl font-heading font-black text-white italic tracking-tighter leading-none flex items-center gap-4">
              Member <span className="text-white/20">Registrar</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] mt-4 max-w-lg leading-relaxed">
              Consolidated audit of platform participants, clearance levels, and performance metrics.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <Link href="/admin/users/scores">
             <Button variant="outline" className="border-white/5 bg-zinc-900/40 text-white hover:bg-white/5 font-black uppercase tracking-[0.2em] text-[10px] h-14 px-8 rounded-2xl flex items-center gap-3 transition-all">
               <History className="h-4 w-4 text-primary" />
               Score Audit
             </Button>
           </Link>
           <Button variant="outline" className="border-white/5 bg-zinc-900/40 text-white hover:bg-white/5 font-black uppercase tracking-[0.2em] text-[10px] h-14 px-8 rounded-2xl flex items-center gap-3 transition-all">
             <Download className="h-4 w-4 text-zinc-500" />
             Export
           </Button>
           <Button className="btn-premium h-14 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-2xl shadow-primary/20">
             <UserPlus className="h-4 w-4" />
             Invite Registrar
           </Button>
        </div>
      </div>

      <div className="relative z-10">
        <UserTable users={users || []} />
      </div>
    </div>
  );
}
