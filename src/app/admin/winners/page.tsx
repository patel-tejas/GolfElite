import { getWinners } from '@/utils/admin/actions';
import { WinnersTable } from '@/components/admin/WinnersTable';
import { Trophy, Coins, Users, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminWinnersPage() {
  const { winners = [] } = await getWinners();

  // Stats
  const totalPaid = winners
    .filter((w: any) => w.payout_status === 'paid')
    .reduce((acc: number, w: any) => acc + w.amount, 0);
  const totalPending = winners
    .filter((w: any) => w.payout_status === 'pending')
    .reduce((acc: number, w: any) => acc + w.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-black text-white italic tracking-tighter uppercase">
          Winners <span className="text-emerald-500">Log</span>
        </h1>
        <p className="text-emerald-500/60 font-medium mt-2">
          Track monthly payouts and verify all winner submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-white/5 bg-zinc-950/40 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <Trophy size={80} className="text-emerald-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">All-Time Winners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white italic tracking-tighter leading-none mt-1">
              {winners.length} <span className="text-emerald-500">Champions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5 bg-zinc-950/40 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <Coins size={80} className="text-blue-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total Paid Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-zinc-300 font-black italic tracking-tighter leading-none mt-1">
              £{totalPaid.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[9px] text-emerald-400 font-black uppercase tracking-widest leading-none">
              <ArrowUpRight className="h-3 w-3" />
              Verified Transaction
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5 bg-zinc-950/40 border-l-2 border-l-orange-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-black text-zinc-300 italic tracking-tighter leading-none mt-1">
              £{totalPending.toLocaleString()}
            </div>
            <div className="text-[9px] text-zinc-600 font-black uppercase tracking-widest leading-none mt-2">
              Action Required
            </div>
          </CardContent>
        </Card>
      </div>

      <WinnersTable winners={winners} />
    </div>
  );
}
