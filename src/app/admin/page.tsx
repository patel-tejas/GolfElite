import { getAdminStats } from '@/utils/admin/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Trophy, 
  Heart, 
  TrendingUp, 
  DollarSign,
  Activity,
  UserCheck,
  Target
} from 'lucide-react';

export default async function AdminDashboard() {
  const { stats, error } = await getAdminStats();

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-96 text-zinc-500">
        <p>{error || 'An unexpected error occurred loading statistics.'}</p>
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      description: 'Registered accounts',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Active Subs',
      value: stats.activeSubscribers,
      description: 'Monthly Silver plans',
      icon: UserCheck,
      color: 'text-emerald-500',
    },
    {
      title: 'Prize Pool',
      value: `$${stats.prizePool.toLocaleString()}`,
      description: 'Available for next draw',
      icon: Trophy,
      color: 'text-yellow-500',
    },
    {
      title: 'Charity Impact',
      value: `$${stats.charityTotal.toLocaleString()}`,
      description: 'Pending distribution',
      icon: Heart,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-heading font-black text-white mb-2 italic">Platform Overview</h1>
        <p className="text-zinc-500 font-medium">Real-time performance and financial metrics.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="glass-card border-white/5 bg-white/2 hover:bg-white/5 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-black text-white italic">{kpi.value}</div>
              <p className="text-xs text-zinc-600 mt-1 font-medium">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Draw Status */}
        <Card className="glass-card border-white/5 bg-white/2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-500" />
              Draw Participation Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-black/20">
                <div className="text-center group">
                  <Activity className="h-8 w-8 text-zinc-700 mx-auto mb-3 group-hover:text-emerald-500 transition-colors" />
                  <p className="text-zinc-600 text-sm font-medium">Active sessions and participation trends will appear here.</p>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card className="glass-card border-white/5 bg-white/2">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-white">
              Revenue Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
               <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  <span>Gross Monthly</span>
                  <span className="text-white">${stats.monthlyRevenue.toLocaleString()}</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase block mb-1">Scores Logged</span>
                  <span className="text-xl font-heading font-black text-white italic">{stats.totalScores}</span>
               </div>
               <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase block mb-1">Partners</span>
                  <span className="text-xl font-heading font-black text-white italic">{stats.totalCharities}</span>
               </div>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4">
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Profit margin: 40% Prize | 10% Charity | 50% Platform / Ops
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
