import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RollingTop5Props {
  summary: {
    average: number
    count: number
    needed: number
    top5: number[]
  } | null
}

export function RollingTop5({ summary }: RollingTop5Props) {
  if (!summary) return null

  const progress = Math.min((summary.count / 5) * 100, 100)

  return (
    <Card className="glass-panel overflow-hidden border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
             <Trophy className="h-5 w-5 text-gold" />
             Rolling Top 5
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] text-xs">
                We calculate your entry ranking based on the average of your best 5 scores ever submitted.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Your performance summary for reward draws.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Average Score</span>
            <div className="text-4xl font-heading font-black text-primary flex items-baseline gap-2">
              {summary.average || '--'}
              {summary.average > 0 && <span className="text-xs font-bold text-emerald-500">PRO LEVEL</span>}
            </div>
          </div>
          <div className="text-right space-y-1">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Rounds</span>
            <div className="text-2xl font-heading font-bold">{summary.count}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
            <span>Progress to Milestone</span>
            <span className={summary.needed === 0 ? "text-emerald-500" : "text-amber-500"}>
              {summary.needed === 0 ? 'Milestone Reached' : `${summary.needed} more needed`}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-primary/10" />
        </div>

        {summary.top5.length > 0 && (
          <div className="pt-2">
             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-3">Best Rounds</span>
             <div className="flex gap-2">
               {summary.top5.map((s, i) => (
                 <div key={i} className="flex-1 bg-background/50 border border-primary/10 rounded-lg py-2 text-center">
                    <span className="text-sm font-heading font-bold text-primary">{s}</span>
                 </div>
               ))}
               {Array.from({ length: 5 - summary.top5.length }).map((_, i) => (
                 <div key={`empty-${i}`} className="flex-1 bg-muted/20 border border-dashed border-muted-foreground/20 rounded-lg py-2 text-center">
                    <span className="text-sm font-heading font-bold text-muted-foreground/30">--</span>
                 </div>
               ))}
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
