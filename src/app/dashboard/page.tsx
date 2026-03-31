import { createClient } from "@/utils/supabase/server"
import { signout } from "@/app/(auth)/actions"
import { getUserScores, getRollingTop5Summary } from "@/utils/scores/queries"
import { getUpcomingDraws, getUserWinnings, getPastDraws } from "@/utils/dashboard/queries"
import { getCharities } from "@/utils/charities/actions"
import { Button } from "@/components/ui/button"
import { Trophy, LogOut, User, Bell } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { CharityImpactCard } from "@/components/dashboard/CharityImpactCard"
import { ParticipationSummary } from "@/components/dashboard/ParticipationSummary"
import { PastDraws } from "@/components/dashboard/PastDraws"
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
  const pastDraws = await getPastDraws()
  const winnings = await getUserWinnings()
  const { data: allCharities } = await getCharities()

  // Find current charity name if it exists in profile
  const currentCharityName = profile?.charity_name || "Global Green Initiative"
  const currentCharityId = profile?.charity_id

  return (
    <div className="flex flex-col min-h-screen bg-[url('/grain.png')] bg-repeat selection:bg-primary/30">
      {/* Solid Professional Header */}
      <header className="sticky top-0 z-50 w-full bg-[#0a2012] border-b border-emerald-900/40 shadow-md">
        <div className="mx-auto flex h-16 sm:h-20 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:px-12">
          {/* Brand/Logo Area */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
               <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-[#0a2012]" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-lg sm:text-xl font-black tracking-tighter text-white uppercase">Fairway</span>
              <span className="text-[8px] sm:text-[10px] font-black tracking-[0.2em] text-emerald-400 uppercase">Charity Elite</span>
            </div>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-emerald-900/50 transition-colors relative">
              <Bell className="h-5 w-5 text-emerald-100" />
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 border-2 border-[#0a2012]" />
            </button>
            
            <div className="h-8 w-px bg-emerald-900/50 mx-2" />
            
            <div className="flex items-center gap-3 bg-[#0d2816] border border-emerald-900/50 p-1.5 pr-4 rounded-full shadow-inner">
               <div className="h-8 w-8 rounded-full bg-emerald-800 flex items-center justify-center text-[10px] font-black text-emerald-100">
                 {user?.email?.[0].toUpperCase()}
               </div>
               <span className="text-xs font-bold tracking-tight text-emerald-50 hidden sm:inline">{user?.email?.split('@')[0]}</span>
            </div>
            
            <ModeToggle />
            
            <form action={signout}>
              <Button type="submit" variant="ghost" size="icon" className="rounded-full hover:bg-rose-500/20 hover:text-rose-400 text-emerald-100 transition-colors">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          {/* Mobile User Avatar Toggle (Optional, but let's keep it simple with bottom bar) */}
          <div className="sm:hidden flex items-center">
            <div className="h-8 w-8 rounded-full bg-emerald-800 flex items-center justify-center text-[10px] font-black text-emerald-100 shadow-inner">
               {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden items-center justify-around bg-[#0a2012] border-t border-emerald-900/40 p-3 pb-safe shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]">
        <button className="flex flex-col items-center gap-1 text-emerald-500">
          <Trophy className="h-5 w-5" />
          <span className="text-[9px] font-black uppercase tracking-wider">Board</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-emerald-100 relative">
          <Bell className="h-5 w-5" />
          <div className="absolute top-0 right-1 h-2 w-2 rounded-full bg-emerald-500 border-2 border-[#0a2012]" />
          <span className="text-[9px] font-black uppercase tracking-wider">Alerts</span>
        </button>
        <div className="flex flex-col items-center gap-1 pt-1">
          <div className="scale-75 -my-2">
            <ModeToggle />
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-100 mt-1">Theme</span>
        </div>
        <form action={signout} className="flex flex-col items-center gap-1 pt-1">
          <button type="submit" className="text-emerald-100 flex flex-col items-center hover:text-rose-400 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="text-[9px] font-black uppercase tracking-wider mt-[2px]">Log Out</span>
          </button>
        </form>
      </div>

      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 pb-28 sm:p-6 md:p-12 space-y-6 sm:space-y-8 md:space-y-12">
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

            {/* Past Draws Section */}
            <PastDraws draws={pastDraws} currentUserId={user?.id as string} />
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
              draws={upcomingDraws.map((d: any) => ({
                id: d.id,
                title: d.title,
                date: d.draw_date ? new Date(d.draw_date).toLocaleDateString() : 'TBD',
                prize: `£${Number(d.prize_pool || 0).toLocaleString()}`,
                status: d.is_entered ? 'entered' : 'upcoming'
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
