import { login, signup } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default async function LoginPage(props: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const { error, message } = await props.searchParams
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 font-heading font-bold text-3xl">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-gradient-gold">FairwayImpact</span>
          </div>
          <p className="text-muted-foreground text-sm">Where every stroke counts for a cause.</p>
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

              {(error || message) && (
                <div className={`p-4 rounded-lg flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
                  error ? "bg-destructive/10 border border-destructive/20 text-destructive" :
                  "bg-primary/10 border border-primary/20 text-primary"
                }`}>
                  <div className="shrink-0 mt-0.5">
                    {error ? "⚠️" : "ℹ️"}
                  </div>
                  <p>{error || message}</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" formAction={login} className="w-full btn-premium">
                Enter the Clubhouse
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
