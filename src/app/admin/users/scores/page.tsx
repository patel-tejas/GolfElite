import { getUsersWithScores } from '@/utils/admin/actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Download, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default async function UserScoresPage() {
  const { users, error } = await getUsersWithScores();

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
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/users">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/5">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-heading font-black text-white italic">Score Insights</h1>
          </div>
          <p className="text-zinc-500 font-medium">Detailed performance history for all platform participants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-xs h-11 px-6 rounded-xl flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="text-left p-6 text-xs font-black text-zinc-500 uppercase tracking-widest">Participant</th>
                  <th className="text-center p-6 text-xs font-black text-zinc-500 uppercase tracking-widest">Plan</th>
                  <th className="text-left p-6 text-xs font-black text-zinc-500 uppercase tracking-widest">Recent Scores</th>
                  <th className="text-center p-6 text-xs font-black text-zinc-500 uppercase tracking-widest">Avg</th>
                  <th className="text-right p-6 text-xs font-black text-zinc-500 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(users || []).map((user: any) => {
                  const scores = user.scores || [];
                  const avg = scores.length > 0 
                    ? Math.round(scores.reduce((acc: number, s: any) => acc + s.score, 0) / scores.length) 
                    : 0;

                  return (
                    <tr key={user.id} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-white font-bold">{user.full_name || 'Anonymous User'}</span>
                          <span className="text-zinc-500 text-sm font-medium">{user.email}</span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <Badge className={`${user.is_subscribed ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-500/10 text-zinc-500'} border-none font-bold px-3`}>
                          {user.is_subscribed ? 'SILVER' : 'FREE'}
                        </Badge>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          {scores.length > 0 ? (
                            scores.map((s: any, idx: number) => (
                              <div 
                                key={idx} 
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white font-black text-sm"
                                title={new Date(s.played_at).toLocaleDateString()}
                              >
                                {s.score}
                              </div>
                            ))
                          ) : (
                            <span className="text-zinc-600 italic text-sm italic">No scores logged yet</span>
                          )}
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`${avg > 36 ? 'text-emerald-500' : 'text-white'} font-black text-xl`}>
                            {avg || '-'}
                          </span>
                          {avg > 0 && (
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">points</span>
                          )}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {scores.length >= 5 ? (
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[10px] px-2 py-0.5">ELIGIBLE</Badge>
                          ) : (
                            <Badge className="bg-rose-500/10 text-rose-500 border-none font-black text-[10px] px-2 py-0.5">INCOMPLETE</Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
