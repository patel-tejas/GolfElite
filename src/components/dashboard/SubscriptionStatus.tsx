'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SubscriptionStatusProps {
  isSubscribed: boolean
  renewalDate?: string
}

export function SubscriptionStatus({ isSubscribed, renewalDate = 'May 01, 2026' }: SubscriptionStatusProps) {
  return (
    <Card className={cn(
      "glass-panel border-none shadow-none bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 px-4 sm:px-6 rounded-2xl gap-3 sm:gap-4",
      !isSubscribed && "bg-amber-500/5 animate-pulse"
    )}>
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className={cn(
          "h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center border shrink-0",
          isSubscribed ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-amber-500/10 border-amber-500/20 text-amber-500"
        )}>
          {isSubscribed ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
        </div>
        
        <div className="min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-tighter whitespace-nowrap">
              {isSubscribed ? 'Active Subscription' : 'Subscription Inactive'}
            </h4>
            {isSubscribed && (
              <span className="text-[10px] font-bold text-muted-foreground">
                Ends {renewalDate}
              </span>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider sm:tracking-widest font-bold">
            {isSubscribed ? 'Elite Access Enabled' : 'Limited features available'}
          </p>
        </div>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className={cn(
          "gap-2 text-[10px] font-black uppercase tracking-tighter h-8 w-full sm:w-auto shrink-0",
          isSubscribed ? "text-primary hover:bg-primary/10" : "text-amber-500 hover:bg-amber-500/10"
        )}
      >
        <RefreshCw className="h-3 w-3" />
        {isSubscribed ? 'Manage Billing' : 'Upgrade Now'}
      </Button>
    </Card>
  )
}
