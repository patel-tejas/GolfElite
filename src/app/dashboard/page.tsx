import { createClient } from "@/utils/supabase/server"
import { signout } from "@/app/(auth)/actions"
import { getUserScores, getRollingTop5Summary } from "@/utils/scores/queries"
import { getUpcomingDraws } from "@/utils/dashboard/queries"
import { getUserFullWinnings } from "@/utils/user/actions"
import { getCharities } from "@/utils/charities/actions"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, LayoutDashboard, Wallet, Trophy } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { CharityImpactCard } from "@/components/dashboard/CharityImpactCard"
import { ParticipationSummary } from "@/components/dashboard/ParticipationSummary"
import { WinningsBanner } from "@/components/dashboard/WinningsBanner"
import { SubscriptionStatus } from "@/components/dashboard/SubscriptionStatus"
import { ScoreManagement } from "@/components/dashboard/ScoreManagement"
import { WinningsTab } from "@/components/dashboard/WinningsTab"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab = 'overview' } = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  const isSubscribed = true 
  const actualSubscriptionStatus = profile?.is_subscribed ?? false

  const summary = await getRollingTop5Summary()
  const upcomingDraws = await getUpcomingDraws()
  const winnings = await getUserFullWinnings()
  const { data: allCharities } = await getCharities()

  const currentCharityName = profile?.charity_name || "Global Green Initiative"
  const currentCharityId = profile?.charity_id

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white transition-colors duration-700">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 dark:border-zinc-900/50 bg-white/70 dark:bg-black/70 backdrop-blur-3xl">
        <div className="container flex h-24 max-w-screen-2xl items-center justify-between px-8 md:px-16">
          <Link href="/" className="flex items-center gap-5 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-[1.25rem] bg-zinc-900 dark:bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                <Trophy className="h-6 w-6 text-white dark:text-zinc-900" />
              </div>
              <div className="absolute -inset-3 bg-zinc-900/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-[1.5rem] blur-2xl transition-all duration-500" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none">Golf Elite</span>
              <span className="text-[10px] font-black tracking-[0.5em] text-zinc-400 dark:text-zinc-500 uppercase opacity-70">Member Club</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8 mr-4">
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Performance</button>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Registry</button>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Impact</button>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 p-2 pr-6 rounded-2xl shadow-sm hover:shadow-xl transition-all">
               <div className="h-10 w-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-[13px] font-black text-white dark:text-zinc-900 shadow-xl">
                 {user?.email?.[0].toUpperCase()}
               </div>
               <div className="flex flex-col -space-y-1">
                 <span className="text-xs font-black tracking-tight text-zinc-900 dark:text-white">{user?.email?.split('@')[0]}</span>
                 <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Elite Member</span>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ModeToggle />
              <form action={signout}>
                <button type="submit" className="flex items-center justify-center w-12 h-12 rounded-2xl border border-zinc-100 dark:border-zinc-900 hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/5 hover:text-red-600 transition-all group shadow-sm">
                  <LogOut className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-8 md:p-16 space-y-20">
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-100 dark:border-zinc-900 pb-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none text-zinc-900 dark:text-white">
              {tab === 'overview' ? 'Dashboard' : 'Winnings'}
            </h1>
            <p className="text-[11px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em]">Personal Access Terminal</p>
          </div>

          <nav className="flex items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-[1.75rem] shadow-inner">
            <Link 
              href="/dashboard?tab=overview"
              className={cn(
                "px-10 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-3",
                tab === 'overview' 
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xl scale-[1.02] border border-zinc-200 dark:border-zinc-800" 
                  : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Intelligence
            </Link>
            <Link 
              href="/dashboard?tab=winnings"
              className={cn(
                "px-10 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-3",
                tab === 'winnings' 
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xl scale-[1.02] border border-zinc-200 dark:border-zinc-800" 
                  : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
              )}
            >
              <Wallet className="h-4 w-4" />
              Registry
            </Link>
          </nav>
        </div>

        {tab === 'overview' ? (
          <div className="animate-fade-in space-y-20">
            {/* Row 1: Winnings Banner (Full Width) */}
            <section className="animate-slide-up transform transition-all duration-700">
               <WinningsBanner 
                 totalWon={winnings.stats?.totalWon || 0} 
                 currentBalance={winnings.stats?.available || 0} 
                 status={(winnings.draws?.some((d: any) => d.isWinner && !d.isClaimed) ? 'pending' : (winnings.stats?.totalWon && winnings.stats.totalWon > 0 ? 'paid' : 'none')) as any} 
               />
            </section>

            {/* Row 2: Main Content Grid */}
            <div className="grid gap-20 lg:grid-cols-12">
              
              {/* Left Column (8 units) */}
              <div className="lg:col-span-8 space-y-20">
                <ScoreManagement 
                   initialScores={summary?.top5 || []}
                   average={summary?.average || 0}
                   needed={summary?.needed || 5}
                   isSubscribed={isSubscribed}
                />
              </div>

              {/* Right Column (4 units) */}
              <aside className="lg:col-span-4 space-y-12">
                <SubscriptionStatus 
                   isSubscribed={actualSubscriptionStatus} 
                   renewalDate={profile?.subscription_renewal_date} 
                />

                <CharityImpactCard 
                  charityName={currentCharityName} 
                  charityId={currentCharityId}
                  percentage={profile?.contribution_percentage || 10} 
                  charities={allCharities || []}
                />

                <ParticipationSummary 
                  draws={upcomingDraws.map(d => ({
                    id: d.id,
                    title: d.title,
                    date: d.draw_date,
                    prize: `£${d.prize_pool.toLocaleString()}`,
                    status: 'upcoming'
                  }))} 
                />
              </aside>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <WinningsTab winnings={winnings} />
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="py-32 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black transition-colors">
        <div className="flex flex-col items-center gap-12 group">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
              <Trophy className="w-6 h-6 text-white dark:text-zinc-900" />
            </div>
            <span className="text-2xl font-black uppercase tracking-[0.6em] text-zinc-900 dark:text-white">Golf Elite</span>
          </div>
          <div className="h-px w-32 bg-zinc-100 dark:bg-zinc-900" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-700 text-center max-w-sm leading-loose">
            The Digital Frontier of Professional Golf Performance & Philanthropy
          </p>
        </div>
      </footer>
    </div>
  )
}
