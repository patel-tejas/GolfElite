import { signup } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await props.searchParams
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 font-heading font-bold text-3xl">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-gradient-gold">FairwayImpact</span>
          </div>
          <p className="text-muted-foreground text-sm">Join the elite community of giving golfers.</p>
        </div>

        <Card className="glass-panel w-full relative overflow-hidden">
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"></div>
          <form className="animate-in flex flex-col w-full justify-center gap-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your details to create your subscription account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-muted-foreground font-medium">Email</Label>
                <Input
                  className="bg-background/50 backdrop-blur"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-muted-foreground font-medium">Password</Label>
                <Input
                  className="bg-background/50 backdrop-blur"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5">⚠️</span>
                    <p>{error}</p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" formAction={signup} className="w-full btn-premium">
                Begin Your Journey
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline hover:text-accent transition-colors">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
