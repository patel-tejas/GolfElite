import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, History } from "lucide-react"

interface Score {
  id: string
  score: number
  played_at: string
}

interface ScoreHistoryProps {
  scores: Score[]
}

export function ScoreHistory({ scores }: ScoreHistoryProps) {
  if (scores.length === 0) {
    return (
      <Card className="glass-panel border-dashed h-full transition-all hover:bg-muted/50">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <History className="h-5 w-5 text-primary opacity-50" />
            Recent Rounds
          </CardTitle>
          <CardDescription>Your history will appear here once you submit scores.</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground italic">No rounds recorded yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-panel h-full overflow-hidden flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Recent Rounds
        </CardTitle>
        <CardDescription>Your last {scores.length} recorded rounds.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto max-h-[400px] scrollbar-hide">
        <div className="space-y-3">
          {scores.map((score) => (
            <div 
              key={score.id} 
              className="flex items-center justify-between p-4 rounded-xl bg-background/40 border border-primary/5 hover:border-primary/20 hover:bg-background/60 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-lg font-heading font-black text-primary">{score.score}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-wider">Gross Score</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(score.played_at), 'MMMM do, yyyy')}
                  </div>
                </div>
              </div>
              <div className="text-xs font-bold text-emerald-500/80 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
                 RECORDED
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
