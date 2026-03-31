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
  Trophy
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
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search users by email or ID..." 
            className="pl-9 bg-white/5 border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">User</TableHead>
              <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Role</TableHead>
              <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Subscription</TableHead>
              <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Scores</TableHead>
              <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Joined</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                      <UserIcon className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{user.email || 'No email'}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">{user.id.slice(0, 8)}...</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.role === 'admin' ? 'default' : 'secondary'}
                    className={user.role === 'admin' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'}
                  >
                    {user.role || 'user'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.is_subscribed ? (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Active Silver</Badge>
                  ) : (
                    <span className="text-sm text-zinc-600 font-medium italic">Free Tier</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{user.scores?.length || 0}</span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Logged</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'No date'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-white/10 text-zinc-300">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Full Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer gap-2">
                        <Trophy className="h-4 w-4" />
                        Manage Scores
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem 
                        onClick={() => handleRoleToggle(user.id, user.role)}
                        className="focus:bg-white/5 focus:text-white cursor-pointer gap-2"
                      >
                        <Shield className="h-4 w-4 text-emerald-500" />
                        {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
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
