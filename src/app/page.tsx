import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar mock */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2 font-heading font-bold text-lg">
            <Trophy className="h-5 w-5 text-primary" />
            <span>FairwayImpact</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ModeToggle />
            <Link href="/login" className={buttonVariants({ className: "hidden sm:flex btn-primary-gradient" })}>
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-24 space-y-8 max-w-5xl text-center">
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight">
              Play Golf. <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">Make an Impact.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your Stableford scores, participate in monthly draws, and support charities with a premium golf subscription platform.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/signup" className={buttonVariants({ size: "lg", className: "h-12 px-8 btn-primary-gradient shadow-xl text-base" })}>
              Get Started Today
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              View Charities
            </Button>
          </div>
        </section>

        {/* Feature Cards Mock */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Card className="glass-panel overflow-hidden relative group transition-all hover:border-primary/50">
              <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Trophy className="w-5 h-5" />
                  </div>
                  Win Big
                </CardTitle>
                <CardDescription>Enter your scores for a chance to win the monthly jackpot.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-mono font-bold text-foreground animate-number-reveal">
                  £5,200
                </div>
                <div className="text-sm text-muted-foreground mt-1">Current Prize Pool</div>
              </CardContent>
            </Card>

            <Card className="glass-panel overflow-hidden relative group transition-all hover:border-accent/50">
              <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Trophy className="w-5 h-5" />
                  </div>
                  Give Back
                </CardTitle>
                <CardDescription>At least 10% of your subscription goes to a charity of your choice.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-mono font-bold text-foreground">
                  12
                </div>
                <div className="text-sm text-muted-foreground mt-1">Supported Charities</div>
              </CardContent>
            </Card>

            <Card className="glass-panel sm:col-span-2 lg:col-span-1 overflow-hidden relative group transition-all hover:border-primary/50">
               <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Trophy className="w-5 h-5" />
                  </div>
                  Track Scores
                </CardTitle>
                <CardDescription>Log your top 5 Stableford scores. The rolling system automatically updates your draw entries.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 justify-start">
                  {[38, 42, 35, 41, 39].map((score, i) => (
                    <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground font-mono font-bold text-sm border shadow-sm">
                      {score}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
