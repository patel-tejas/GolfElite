'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Heart, Check, Globe, Award, Sparkles, Loader2, Landmark, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateSelectedCharity } from '@/utils/charities/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Charity {
  id: string
  name: string
  description: string
  impact_area: string
  image_url: string
}

interface CharitySelectionModalProps {
  charities: Charity[]
  currentCharityId?: string
  trigger?: React.ReactElement
}

export function CharitySelectionModal({ charities, currentCharityId, trigger }: CharitySelectionModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(currentCharityId || null)
  const [isPending, setIsPending] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSelect = async (id: string) => {
    setIsPending(true)
    const result = await updateSelectedCharity(id)
    setIsPending(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Impact Partner updated')
      setSelectedId(id)
      setOpen(false)
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger || (
            <Button variant="outline" className="w-full gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-black uppercase tracking-[0.2em] text-[10px] h-12 rounded-xl group transition-all">
               <Landmark className="h-4 w-4" />
               Select Beneficiary
            </Button>
          )
        }
      />
      <DialogContent className="max-w-[95vw] lg:max-w-6xl bg-zinc-950/90 backdrop-blur-3xl border-border/10 p-0 overflow-hidden shadow-2xl rounded-[2.5rem]">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Landmark className="h-64 w-64 text-primary" />
        </div>

        <div className="p-10 lg:p-14 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Global Impact Network</span>
          </div>
          <DialogTitle className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic text-foreground mb-4">
             Your Impact <span className="text-primary italic">Partner</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground max-w-2xl text-sm lg:text-base font-medium leading-relaxed text-balance opacity-80 uppercase tracking-tight">
            Select a verified foundation to receive 10% of your performance contributions. Every round played fuels change within our exclusive clubhouse network.
          </DialogDescription>
        </div>

        <div className="px-10 lg:px-14 pb-14 overflow-y-auto max-h-[60vh] custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {charities.map((charity) => {
              const isSelected = selectedId === charity.id
              return (
                <motion.div
                  key={charity.id}
                  whileHover={{ y: -8 }}
                  onClick={() => !isPending && handleSelect(charity.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] border-2 transition-all cursor-pointer shadow-xl",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-primary/10" 
                      : "border-border/10 bg-secondary/10 hover:border-primary/40 hover:bg-secondary/20"
                  )}
                >
                  <div className="aspect-4/3 w-full relative overflow-hidden">
                    <img 
                      src={charity.image_url} 
                      alt={charity.name}
                      className={cn(
                        "h-full w-full object-cover transition-all duration-1000 ease-out",
                        "group-hover:scale-110"
                      )}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground p-2.5 rounded-full shadow-2xl z-10 border border-white/20">
                        <Check className="h-4 w-4 stroke-[3px]" />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-6 flex gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-zinc-900/90 text-primary backdrop-blur-xl border border-primary/20 shadow-xl">
                        {charity.impact_area}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h4 className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                       {charity.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 font-medium opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                      {charity.description}
                    </p>
                  </div>

                  {isPending && isSelected && (
                    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4 z-20">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                  )}
                  
           <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/3 pointer-events-none transition-colors" />
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="p-10 bg-secondary/10 border-t border-border/10 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-border/20">
                <Trophy className="h-6 w-6 text-primary" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Verified Beneficiary Status</p>
               <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em] opacity-60 italic">Audited Financial Directiveness</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Direct Ledger Transfer Active
              </span>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
