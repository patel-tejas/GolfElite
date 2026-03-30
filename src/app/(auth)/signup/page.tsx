import { signup } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/10 via-background to-background"></div>
      
      <div className="w-full max-w-md animate-slide-up">
        
        <div className="mb-8 flex justify-center items-center gap-2 font-heading font-bold text-2xl">
          <Trophy className="h-6 w-6 text-accent" />
          <span>FairwayImpact</span>
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

              {searchParams.error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md animate-fade-in border border-destructive/20 mt-2">
                  {searchParams.error}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button formAction={signup} className="w-full btn-primary-gradient border-accent">
                Sign Up
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
