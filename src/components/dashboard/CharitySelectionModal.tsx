'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Heart, Check, Globe, Award, Sparkles, Loader2 } from 'lucide-react'
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
            <Button variant="outline" className="w-full gap-2 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 font-bold group">
              Change Charity partner
            </Button>
          )
        }
      />
      <DialogContent className="max-w-[95vw] lg:max-w-6xl bg-background/80 backdrop-blur-3xl border-white/10 p-0 overflow-hidden shadow-2xl rounded-3xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Heart className="h-64 w-64 text-rose-500" />
        </div>

        <DialogHeader className="p-10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shadow-lg shadow-rose-500/10">
              <Sparkles className="h-4 w-4 text-rose-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">Global Impact Network</span>
          </div>
          <DialogTitle className="text-4xl font-black tracking-tight uppercase italic drop-shadow-sm text-balance">Select Your Impact Partner</DialogTitle>
          <DialogDescription className="text-muted-foreground max-w-2xl text-sm font-medium leading-relaxed mt-2 text-balance">
            Choose a foundation to support with every performance. 10% of your contributions go directly to your chosen cause. Join a community of purpose-driven athletes.
          </DialogDescription>
        </DialogHeader>

        <div className="px-10 pb-10 overflow-y-auto max-h-[75vh] custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {charities.map((charity) => {
              const isSelected = selectedId === charity.id
              return (
                <motion.div
                  key={charity.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isPending && handleSelect(charity.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border-2 transition-all cursor-pointer shadow-lg",
                    isSelected 
                      ? "border-rose-500 bg-rose-500/5 shadow-rose-500/10" 
                      : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-white/5"
                  )}
                >
                  <div className="aspect-video w-full relative overflow-hidden">
                    <img 
                      src={charity.image_url} 
                      alt={charity.name}
                      className={cn(
                        "h-full w-full object-cover transition-all duration-700 ease-out",
                        "group-hover:scale-125"
                      )}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent" />
                    
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-rose-500 text-white p-2 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-in zoom-in-50 z-10">
                        <Check className="h-4 w-4 stroke-[3px]" />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 backdrop-blur-xl border border-rose-500/20 shadow-sm">
                        {charity.impact_area}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h4 className="font-black text-base uppercase tracking-tight group-hover:text-rose-500 transition-colors">{charity.name}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                      {charity.description}
                    </p>
                  </div>

                  {isPending && isSelected && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-md flex items-center justify-center p-4 z-20">
                      <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
                    </div>
                  )}
                  
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/5 pointer-events-none transition-colors" />
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between">
           <div className="flex items-center gap-3">
             <Award className="h-5 w-5 text-amber-500" />
             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Beneficiary Status</span>
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full animate-pulse">
             Direct Transfer Active
           </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
