'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Shield, 
  User as UserIcon, 
  Calendar,
  Search,
  ExternalLink,
  Trophy,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { updateUserRole } from '@/utils/admin/actions';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface UserTableProps {
  users: any[];
}

export function UserTable({ users: initialUsers }: UserTableProps) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((user) => 
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const result = await updateUserRole(userId, newRole);

    if (result.success) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`User role updated to ${newRole}`);
    } else {
      toast.error('Failed to update user role');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 relative z-20">
        <div className="relative flex-1 w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search registrar by email or ID..." 
            className="pl-11 h-14 bg-zinc-900/40 border-white/5 focus:border-primary/40 focus:ring-primary/20 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 px-6 border-white/5 bg-zinc-900/40 text-white rounded-2xl flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[9px] hover:bg-white/5">
          <Filter className="h-4 w-4 text-zinc-500" />
          Refine Registry
        </Button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden border-border/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent bg-white/2">
              <TableHead className="h-14 text-zinc-500 font-black uppercase tracking-[0.3em] text-[9px] pl-8">Subscriber Identity</TableHead>
              <TableHead className="h-14 text-zinc-500 font-black uppercase tracking-[0.3em] text-[9px]">Clearance</TableHead>
              <TableHead className="h-14 text-zinc-500 font-black uppercase tracking-[0.3em] text-[9px]">Status</TableHead>
              <TableHead className="h-14 text-zinc-500 font-black uppercase tracking-[0.3em] text-[9px]">Engagement</TableHead>
              <TableHead className="h-14 text-zinc-500 font-black uppercase tracking-[0.3em] text-[9px]">Entry Date</TableHead>
              <TableHead className="h-14 w-[80px] pr-8 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-zinc-600 font-black uppercase tracking-widest text-[10px]">
                  No matching records found in the registry.
                </TableCell>
              </TableRow>
            ) : filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/5 group transition-all duration-300">
                <TableCell className="pl-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-900/80 flex items-center justify-center border border-white/10 shadow-inner group-hover:border-primary/40 transition-colors relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <UserIcon className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <div className="font-black text-white text-sm tracking-tight">{user.email || 'No email'}</div>
                      <div className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-0.5 opacity-60">REF: {user.id.slice(0, 8)}...</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
                    user.role === 'admin' 
                      ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(4,57,39,0.2)]" 
                      : "bg-zinc-800/50 text-zinc-500 border-white/5"
                  )}>
                    <Shield className={cn("h-3 w-3", user.role === 'admin' ? "text-primary" : "text-zinc-600")} />
                    {user.role || 'Member'}
                  </div>
                </TableCell>
                <TableCell>
                  {user.is_subscribed ? (
                    <div className="flex items-center gap-2 text-accent">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest italic group-hover:translate-x-1 transition-transform">Premium Elite</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest opacity-40 italic">Observer</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-black text-white leading-none">{user.scores?.length || 0}</span>
                       <Trophy className="h-3 w-3 text-zinc-500" />
                    </div>
                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest opacity-60">Verified Rounds</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Calendar className="h-3.5 w-3.5 opacity-50" />
                    <span className="text-[10px] font-bold">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="pr-8 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-10 w-10 p-0 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end" className="w-64 bg-zinc-950/95 backdrop-blur-xl border-white/10 p-2 rounded-2xl shadow-2xl">
                      <DropdownMenuLabel className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Audit Protocol</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/5 mx-2" />
                      <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all">
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Full Dossier</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-accent/10 focus:text-accent cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all">
                        <Trophy className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Score Ledger</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5 mx-2" />
                      <DropdownMenuItem 
                        onClick={() => handleRoleToggle(user.id, user.role)}
                        className="focus:bg-white/5 focus:text-white cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all hover:bg-red-500/5"
                      >
                        <Shield className={cn("h-4 w-4", user.role === 'admin' ? "text-red-500" : "text-primary")} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {user.role === 'admin' ? 'Revoke Clearances' : 'Elevate to Admin'}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
