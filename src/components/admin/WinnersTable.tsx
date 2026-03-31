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
  CheckCircle2, 
  Clock, 
  Trophy,
  ExternalLink,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { updatePayoutStatus } from '@/utils/admin/actions';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface WinnersTableProps {
  winners: any[];
}

export function WinnersTable({ winners: initialWinners }: WinnersTableProps) {
  const [winners, setWinners] = useState(initialWinners);
  const [search, setSearch] = useState('');

  const filteredWinners = winners.filter(w => 
    w.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    w.draw?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePayoutToggle = async (winnerId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'paid' ? 'pending' : 'paid';
    const result = await updatePayoutStatus(winnerId, newStatus);

    if (result.success) {
      setWinners(prev => prev.map(w => w.id === winnerId ? { ...w, payout_status: newStatus } : w));
      toast.success(`Winner marked as ${newStatus}`);
    } else {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search winners or draws..." 
            className="pl-9 bg-white/5 border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-white/10 text-zinc-400 gap-2 h-11 bg-white/5">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black text-zinc-500">
              <TableHead>Winner</TableHead>
              <TableHead>Draw</TableHead>
              <TableHead>Prize</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWinners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-zinc-500 font-bold uppercase tracking-widest text-xs">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              filteredWinners.map((winner) => (
                <TableRow key={winner.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <Trophy className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="font-bold text-white text-sm">{winner.user?.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-bold text-zinc-300 italic uppercase tracking-tighter">{winner.draw?.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-emerald-400 font-black italic">£{winner.amount}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={winner.payout_status === 'paid' 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                        : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}
                    >
                      {winner.payout_status === 'paid' ? 'Paid' : 'Pending Payout'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-zinc-500 font-mono">
                      {new Date(winner.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      onClick={() => handlePayoutToggle(winner.id, winner.payout_status)}
                      variant={winner.payout_status === 'paid' ? 'outline' : 'default'}
                      size="sm"
                      className={winner.payout_status === 'paid' 
                        ? 'border-white/10 text-zinc-500 h-8 text-[10px] font-black uppercase' 
                        : 'btn-premium h-8 text-[10px] font-black uppercase'}
                    >
                      {winner.payout_status === 'paid' ? (
                        <>
                          <Clock className="h-3 w-3 mr-1.5" />
                          Mark Unpaid
                        </>
                      ) : (
                        <>
                          <DollarSign className="h-3 w-3 mr-1.2" />
                          Mark Paid
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
