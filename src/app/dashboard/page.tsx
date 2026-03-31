import { createClient } from "@/utils/supabase/server"
import { signout } from "@/app/(auth)/actions"
import { getUserScores, getRollingTop5Summary } from "@/utils/scores/queries"
import { getUpcomingDraws, getUserWinnings } from "@/utils/dashboard/queries"
import { getCharities } from "@/utils/charities/actions"
import { Button } from "@/components/ui/button"
import { Trophy, LogOut, User, Bell } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { CharityImpactCard } from "@/components/dashboard/CharityImpactCard"
import { ParticipationSummary } from "@/components/dashboard/ParticipationSummary"
import { WinningsBanner } from "@/components/dashboard/WinningsBanner"
import { SubscriptionStatus } from "@/components/dashboard/SubscriptionStatus"
import { ScoreManagement } from "@/components/dashboard/ScoreManagement"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
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
  const scores = await getUserScores()
  const summary = await getRollingTop5Summary()
  const upcomingDraws = await getUpcomingDraws()
  const winnings = await getUserWinnings()
  const { data: allCharities } = await getCharities()

  // Find current charity name if it exists in profile
  const currentCharityName = profile?.charity_name || "Global Green Initiative"
  const currentCharityId = profile?.charity_id

  return (
    <div className="flex flex-col min-h-screen bg-[url('/grain.png')] bg-repeat selection:bg-primary/30">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-lg shadow-primary/20">
               <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter bg-gold-gradient bg-clip-text text-transparent uppercase">Fairway</span>
              <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-60">Charity Elite</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border-2 border-background" />
            </button>
            
            <div className="h-8 w-px bg-white/10 mx-2" />
            
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pr-4 rounded-full">
               <div className="h-8 w-8 rounded-full bg-primary-gradient flex items-center justify-center text-[10px] font-black text-primary-foreground">
                 {user?.email?.[0].toUpperCase()}
               </div>
               <span className="text-xs font-black tracking-tight hidden sm:inline">{user?.email?.split('@')[0]}</span>
            </div>
            
            <ModeToggle />
            
            <form action={signout}>
              <Button type="submit" variant="ghost" size="icon" className="rounded-full hover:bg-rose-500/10 hover:text-rose-500">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-6 md:p-12 space-y-12">
        {/* Row 1: Winnings Banner (Full Width) */}
        <section className="animate-slide-up">
           <WinningsBanner 
             totalWon={winnings.total} 
             currentBalance={winnings.balance} 
             status={winnings.status as any} 
           />
        </section>

        {/* Row 2: Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Column (8 units) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Unified Score Management Section */}
            <ScoreManagement 
              initialScores={summary?.top5 || []}
              average={summary?.average || 0}
              needed={summary?.needed || 5}
              isSubscribed={isSubscribed}
            />
          </div>

          {/* Right Column (4 units) */}
          <aside className="lg:col-span-4 space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            
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
                date: new Date(d.draw_date).toLocaleDateString(),
                prize: `$${d.prize_pool.toLocaleString()}`,
                status: 'upcoming'
              }))} 
            />

            {/* Subscription Summary (Slim Sidebar Version) */}
            <SubscriptionStatus 
              isSubscribed={actualSubscriptionStatus} 
              renewalDate={profile?.subscription_renewal_date} 
            />
          </aside>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-2 opacity-20 hover:opacity-40 transition-opacity">
          <Trophy className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Fairway Impact Prestige</span>
        </div>
      </footer>
    </div>
  )
}
