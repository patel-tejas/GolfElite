import { getAdminStats } from '@/utils/admin/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Trophy, 
  Heart, 
  TrendingUp, 
  Activity,
  UserCheck,
  Target,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

export default async function AdminDashboard() {
  const { stats, error } = await getAdminStats();

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-96 text-zinc-500">
        <div className="text-center space-y-4">
           <ShieldCheck className="h-12 w-12 text-zinc-800 mx-auto" />
           <p className="text-sm font-bold uppercase tracking-widest">{error || 'Vault Connection Error'}</p>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total Network',
      value: stats.totalUsers,
      description: 'Verified active accounts',
      icon: Users,
      accent: 'text-primary',
    },
    {
      title: 'Member Access',
      value: stats.activeSubscribers,
      description: 'Premium subscription yield',
      icon: UserCheck,
      accent: 'text-primary',
    },
    {
      title: 'Clubhouse Fund',
      value: `£${stats.prizePool.toLocaleString()}`,
      description: 'Pending monthly distribution',
      icon: Trophy,
      accent: 'text-accent',
    },
    {
      title: 'Philanthropy',
      value: `£${stats.charityTotal.toLocaleString()}`,
      description: 'Audited impact total',
      icon: Heart,
      accent: 'text-primary',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between border-b border-primary/10 pb-8">
        <div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary block mb-2">Systems Intelligence</span>
           <h1 className="text-4xl font-heading font-black text-white italic tracking-tighter uppercase leading-none">
             Platform <span className="text-white/20">Executive</span> Dashboard
           </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
           <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest text-primary">Live Nexus Active</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="glass-card border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity translate-x-3 -translate-y-3">
               <kpi.icon className="h-20 w-20 text-white fill-white" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.accent} transition-transform group-hover:scale-110`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-black text-white italic leading-none">{kpi.value}</div>
              <p className="text-[9px] text-zinc-600 mt-2 font-bold uppercase tracking-widest leading-relaxed">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Draw Status */}
        <Card className="glass-card border-white/5 bg-zinc-900/40 lg:col-span-2 overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/2 py-6 px-8">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              Infrastructure Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
             <div className="h-64 flex flex-col items-center justify-center border border-dashed border-primary/10 rounded-2xl bg-black/40 relative group">
                <div className="absolute inset-0 bg-primary/2 group-hover:bg-primary/5 transition-colors" />
                  <div className="aspect-4/3 w-full relative overflow-hidden">
                  <Activity className="h-10 w-10 text-zinc-800 mx-auto mb-4 transition-colors group-hover:text-primary animate-pulse" />
                  <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] max-w-[240px] leading-relaxed">
                    Analyzing participation vectors and real-time score logging frequency.
                  </p>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card className="glass-card border-white/5 bg-zinc-900/40 flex flex-col">
          <CardHeader className="border-b border-white/5 bg-white/2 py-6 px-8">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
               <div className="p-2 rounded-lg bg-accent/10">
                <BarChart3 className="h-4 w-4 text-accent" />
              </div>
              Revenue Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8 flex-1">
            <div>
               <div className="flex items-center justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">
                  <span>Gross Yield (Monthly)</span>
                  <span className="text-white text-base">£{stats.monthlyRevenue.toLocaleString()}</span>
               </div>
               <div className="relative h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-primary-gradient w-full shadow-[0_0_15px_rgba(4,57,39,0.5)]" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 rounded-2xl bg-black/60 border border-white/5 transition-colors hover:border-primary/20 group">
                  <span className="text-[9px] font-black tracking-widest text-zinc-600 uppercase block mb-1 group-hover:text-primary transition-colors">Vol Logged</span>
                  <span className="text-2xl font-heading font-black text-white italic leading-none">{stats.totalScores}</span>
               </div>
               <div className="p-5 rounded-2xl bg-black/60 border border-white/5 transition-colors hover:border-accent/20 group">
                  <span className="text-[9px] font-black tracking-widest text-zinc-600 uppercase block mb-1 group-hover:text-accent transition-colors">Impact Partners</span>
                  <span className="text-2xl font-heading font-black text-white italic leading-none">{stats.totalCharities}</span>
               </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-auto">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
                   <span>Alloc: 40% Prize Pool</span>
                   <div className="h-1 w-12 bg-accent/40 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
                   <span>Alloc: 10% Philanthropy</span>
                   <div className="h-1 w-12 bg-primary/40 rounded-full" />
                </div>
                 <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
                   <span>Alloc: 50% Operational</span>
                   <div className="h-1 w-12 bg-zinc-800 rounded-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
