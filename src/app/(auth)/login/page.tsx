import { login, signup } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="w-full max-w-md animate-slide-up">
        
        <div className="mb-8 flex justify-center items-center gap-2 font-heading font-bold text-2xl">
          <Trophy className="h-6 w-6 text-primary" />
          <span>FairwayImpact</span>
        </div>

        <Card className="glass-panel w-full relative overflow-hidden">
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
          <form className="animate-in flex flex-col w-full justify-center">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your email format and password to sign in.
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
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-muted-foreground font-medium">Password</Label>
                </div>
                <Input
                  className="bg-background/50 backdrop-blur"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {searchParams.error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md animate-fade-in border border-destructive/20 mt-2">
                  {searchParams.error}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button formAction={login} className="w-full btn-primary-gradient">
                Sign In
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="underline hover:text-primary transition-colors">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
