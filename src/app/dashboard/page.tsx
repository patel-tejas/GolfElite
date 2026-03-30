import { createClient } from "@/utils/supabase/server"
import { signout } from "@/app/(auth)/actions"
import { createPortalSession } from "@/utils/stripe/server-actions"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Trophy, LogOut, CreditCard, CheckCircle2, AlertCircle, ShoppingCart } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  // We are guaranteed a user here because of middleware.ts
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch the profile for subscription status
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  const isSubscribed = profile?.is_subscribed ?? false

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2 font-heading font-bold text-lg">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">FairwayImpact</span>
            <span className="sm:hidden text-primary">FI</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ModeToggle />
            <form action={signout}>
              <Button type="submit" variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden xs:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="space-y-2 animate-slide-up">
            <h1 className="text-3xl font-heading font-bold">
              Welcome back, {user?.email?.split('@')[0]}
            </h1>
            <p className="text-muted-foreground">Manage your golf performance and charity impact.</p>
          </header>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-panel animate-fade-in flex flex-col" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Subscription Status</CardTitle>
                  {isSubscribed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <CardDescription>Your current plan and payment details.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {isSubscribed ? (
                  <div className="space-y-3">
                    <div className="bg-emerald-500/10 text-emerald-500 p-4 rounded-xl border border-emerald-500/20 flex flex-col gap-1">
                      <span className="font-bold text-lg">Active Subscription</span>
                      <span className="text-xs opacity-80">You are eligible for all active draws.</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-amber-500/10 text-amber-500 p-4 rounded-xl border border-amber-500/20 flex flex-col gap-1">
                      <span className="font-bold text-lg">Not Subscribed</span>
                      <span className="text-xs opacity-80">Subscribe to enter scores and win rewards.</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2">
                {isSubscribed ? (
                  <form action={createPortalSession} className="w-full">
                    <Button variant="outline" className="w-full gap-2 h-11 border-primary/20 bg-primary/5 hover:bg-primary/10">
                      <CreditCard className="h-4 w-4" />
                      Manage Subscription
                    </Button>
                  </form>
                ) : (
                  <Link 
                    href="/dashboard/subscribe" 
                    className={cn(buttonVariants({ className: "w-full btn-primary-gradient gap-2 h-11 shadow-lg shadow-primary/20" }))}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Get Started - Explore Plans
                  </Link>
                )}
              </CardFooter>
            </Card>

            {/* Placeholder for Score Tracking - Phase 4 */}
            <Card className="glass-panel animate-fade-in bg-muted/30 border-dashed" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-xl opacity-50">Score Tracker</CardTitle>
                <CardDescription>View your rolling top 5 scores.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[120px]">
                <div className="text-muted-foreground text-sm text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 opacity-20" />
                  Coming in Phase 4
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
