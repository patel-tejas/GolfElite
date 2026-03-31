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
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'User Management', href: '/admin/users' },
  { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
  { icon: Trophy, label: 'Draw Management', href: '/admin/draws' },
  { icon: Heart, label: 'Charity Management', href: '/admin/charities' },
  { icon: Trophy, label: 'Winners Log', href: '/admin/winners' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-zinc-950 border-r border-white/5 w-64">
      {/* Brand */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading font-black text-lg tracking-tighter text-white">
            ADMIN <span className="text-emerald-500">PANEL</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-4 w-4", isActive ? "text-emerald-400" : "group-hover:text-white")} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 mt-auto">
        <Link 
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start gap-3 text-zinc-400 hover:text-red-400 hover:bg-red-400/5 transition-colors"
          )}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Exit Admin</span>
        </Link>
      </div>
    </div>
  );
}
