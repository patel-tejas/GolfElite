'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  Heart, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Flame,
  ShieldCheck,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'User Management', href: '/admin/users' },
  { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
  { icon: Trophy, label: 'Draw Management', href: '/admin/draws' },
  { icon: Heart, label: 'Charity Partners', href: '/admin/charities' },
  { icon: ShieldCheck, label: 'Audit Log', href: '/admin/winners' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Preferences', href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-zinc-950 border-r border-primary/10 w-64 relative">
      {/* Brand */}
      <div className="p-8">
        <Link href="/" className="flex flex-col gap-1 group">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-[0_0_20px_rgba(4,57,39,0.3)] group-hover:scale-105 transition-transform">
              <Trophy className="h-5 w-5 text-accent fill-accent" />
            </div>
            <div>
              <span className="font-heading font-black text-lg tracking-tighter text-white leading-none block uppercase italic">
                Fairway
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary leading-none block">
                Elite Admin
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        <div className="px-4 mb-4">
           <span className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40">Infrastructure</span>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-inner shadow-primary/5" 
                  : "text-zinc-500 hover:text-white hover:bg-white/3 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3 relative z-10">
                <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "group-hover:text-primary")} />
                <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && (
                <>
                  <ChevronRight className="h-3 w-3 relative z-10" />
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary shadow-[0_0_10px_rgba(4,57,39,1)]" />
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/3 bg-black/20">
        <div className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
           <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-border/20 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
           </div>
           <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-foreground leading-none">System Status</span>
              <span className="text-[8px] font-bold text-primary uppercase tracking-tighter">Operational</span>
           </div>
        </div>
        <Link 
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start gap-3 text-zinc-500 hover:text-primary hover:bg-primary/10 transition-all rounded-xl h-12"
          )}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-[11px] font-black uppercase tracking-widest">Return to Club</span>
        </Link>
      </div>
    </div>
  );
}
