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

  // For now, we don't restrict access
  const isSubscribed = true 
  const actualSubscriptionStatus = profile?.is_subscribed ?? false

  // Fetch all dashboard data
  const summary = await getRollingTop5Summary()
  const upcomingDraws = await getUpcomingDraws()
  const winnings = await getUserFullWinnings()
  const { data: allCharities } = await getCharities()

  // Find current charity name if it exists in profile
  const currentCharityName = profile?.charity_name || "Global Green Initiative"
  const currentCharityId = profile?.charity_id

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-500">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 dark:border-zinc-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-2xl">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-500">
                <Trophy className="h-5 w-5 text-white dark:text-zinc-900" />
              </div>
              <div className="absolute -inset-2 bg-zinc-900/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-500" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter uppercase leading-none">Golf Elite</span>
              <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 dark:text-zinc-500 uppercase">Prestige</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <button className="p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
              <Bell className="h-5 w-5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-zinc-900 dark:bg-white border-2 border-white dark:border-black animate-pulse" />
            </button>
            
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
            
            <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-1.5 pr-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
               <div className="h-9 w-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-[12px] font-black text-white dark:text-zinc-900 shadow-lg">
                 {user?.email?.[0].toUpperCase()}
               </div>
               <span className="text-sm font-black tracking-tight hidden sm:inline text-zinc-900 dark:text-white">{user?.email?.split('@')[0]}</span>
            </div>
            
            <ModeToggle />
            
            <form action={signout}>
              <button type="submit" className="flex items-center justify-center w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-all group">
                <LogOut className="h-5 w-5 opacity-40 group-hover:opacity-100" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-6 md:p-12 space-y-16">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] w-fit shadow-sm">
          <Link 
            href="/dashboard?tab=overview"
            className={cn(
              "px-10 py-3.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3",
              tab === 'overview' 
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/20 dark:shadow-white/10 scale-[1.02]" 
                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link 
            href="/dashboard?tab=winnings"
            className={cn(
              "px-10 py-3.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3",
              tab === 'winnings' 
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/20 dark:shadow-white/10 scale-[1.02]" 
                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
            )}
          >
            <Wallet className="h-4 w-4" />
            Winnings
          </Link>
        </nav>

        {tab === 'overview' ? (
          <div className="animate-fade-in space-y-16">
            {/* Row 1: Winnings Banner (Full Width) */}
            <section className="animate-slide-up">
               <WinningsBanner 
                 totalWon={winnings.stats?.totalWon || 0} 
                 currentBalance={winnings.stats?.available || 0} 
                 status={(winnings.draws?.some((d: any) => d.isWinner && !d.isClaimed) ? 'pending' : (winnings.stats?.totalWon && winnings.stats.totalWon > 0 ? 'paid' : 'none')) as any} 
               />
            </section>

            {/* Row 2: Main Content Grid */}
            <div className="grid gap-16 lg:grid-cols-12">
              
              {/* Left Column (8 units) */}
              <div className="lg:col-span-8 space-y-16">
                
                {/* Unified Score Management Section */}
                <ScoreManagement 
                   initialScores={summary?.top5 || []}
                   average={summary?.average || 0}
                   needed={summary?.needed || 5}
                   isSubscribed={isSubscribed}
                />
              </div>

              {/* Right Column (4 units) */}
              <aside className="lg:col-span-4 space-y-16 animate-fade-in">
                
                {/* Charity Section */}
                <CharityImpactCard 
                  charityName={currentCharityName} 
                  charityId={currentCharityId}
                  percentage={profile?.contribution_percentage || 10} 
                  charities={allCharities || []}
                />

                {/* Participation Section */}
                <ParticipationSummary 
                  draws={upcomingDraws.map(d => ({
                    id: d.id,
                    title: d.title,
                    date: d.draw_date,
                    prize: `£${d.prize_pool.toLocaleString()}`,
                    status: 'upcoming'
                  }))} 
                />

                {/* Subscription Summary */}
                <SubscriptionStatus 
                   isSubscribed={actualSubscriptionStatus} 
                   renewalDate={profile?.subscription_renewal_date} 
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
      <footer className="py-24 border-t border-zinc-100 dark:border-zinc-900 transition-colors">
        <div className="flex flex-col items-center gap-8 group">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
              <Trophy className="w-5 h-5 text-white dark:text-zinc-900" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.5em] text-zinc-900 dark:text-white">Golf Elite</span>
          </div>
          <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
            Professional Performance & Impact
          </p>
        </div>
      </footer>
    </div>
  )
}
