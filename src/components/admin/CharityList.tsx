'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  ExternalLink,
  Globe,
  Heart,
  Sparkles,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createCharity, updateCharity, deleteCharity } from '@/utils/charities/actions';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CharityListProps {
  charities: any[];
}

export function AdminCharityList({ charities: initialCharities }: CharityListProps) {
  const [charities, setCharities] = useState(initialCharities);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingCharity, setEditingCharity] = useState<any>(null);

  const filteredCharities = charities.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let result;
    if (editingCharity) {
      result = await updateCharity(editingCharity.id, data);
    } else {
      result = await createCharity(data);
    }

    if (result.success) {
      toast.success(editingCharity ? 'Partner specifications updated' : 'New partner established');
      setIsAdding(false);
      setEditingCharity(null);
      window.location.reload(); 
    } else {
      toast.error(result.error || 'Protocol failure during save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you certain you wish to terminate this partnership?')) return;
    
    const result = await deleteCharity(id);
    if (result.success) {
      toast.success('Partner records purged');
      setCharities(prev => prev.filter(c => c.id !== id));
    } else {
      toast.error('Failed to purge partner records');
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-20">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-accent transition-colors" />
          <Input 
            placeholder="Filter partners by nomenclature..." 
            className="pl-11 h-14 bg-zinc-900/40 border-white/5 focus:border-accent/40 focus:ring-accent/20 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Dialog open={isAdding || !!editingCharity} onOpenChange={(open) => {
          if (!open) {
            setIsAdding(false);
            setEditingCharity(null);
          }
        }}>
          <DialogTrigger render={
            <Button onClick={() => setIsAdding(true)} className="btn-premium h-14 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-2xl shadow-primary/20">
              <Plus className="h-4 w-4" />
              Onboard Partner
            </Button>
          } />
          <DialogContent className="bg-zinc-950/95 backdrop-blur-2xl border-white/10 text-white max-w-lg p-0 overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent/40 to-transparent" />
            <div className="p-8 space-y-8">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                   <div className="h-px w-6 bg-accent/40" />
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent">Credentialing Protocol</span>
                </div>
                <DialogTitle className="text-3xl font-heading font-black italic tracking-tight">
                  {editingCharity ? 'Edit <span className="text-white/20">Specifications</span>' : 'New <span className="text-white/20">Affiliation</span>'}
                </DialogTitle>
                <DialogDescription className="text-zinc-500 font-bold uppercase tracking-widest text-[9px] pt-2">
                  Maintain the integrity of platform philanthropic data.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Entity Nomenclature</Label>
                    <Input id="name" name="name" defaultValue={editingCharity?.name} placeholder="LEGACY GOLF TRUST" className="bg-white/5 border-white/5 h-14 rounded-2xl px-5 font-bold uppercase tracking-widest text-[10px] focus:border-accent/40 focus:ring-accent/20" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Visual Asset URL</Label>
                    <Input id="logo" name="logo" defaultValue={editingCharity?.logo} placeholder="HTTPS://ASSETS.GLF/LOGO.PNG" className="bg-white/5 border-white/5 h-14 rounded-2xl px-5 font-mono text-[10px] focus:border-accent/40 focus:ring-accent/20" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Digital Domain</Label>
                    <Input id="website" name="website" defaultValue={editingCharity?.website} placeholder="WWW.FOUNDATION.GLF" className="bg-white/5 border-white/5 h-14 rounded-2xl px-5 font-mono text-[10px] focus:border-accent/40 focus:ring-accent/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Mission Brief</Label>
                    <Textarea id="description" name="description" defaultValue={editingCharity?.description} placeholder="DESCRIBE THE PHILANTHROPIC IMPACT..." className="bg-white/5 border-white/5 min-h-[120px] rounded-2xl p-5 text-[11px] font-medium leading-relaxed focus:border-accent/40 focus:ring-accent/20 resize-none" required />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full btn-premium h-14 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-accent/10">
                    {editingCharity ? 'Synchronize Data' : 'Execute Affiliation'}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredCharities.length === 0 ? (
          <div className="col-span-full py-20 text-center glass-card border-dashed border-white/10 bg-transparent">
             <Heart className="h-10 w-10 text-zinc-800 mx-auto mb-4" />
             <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px]">No active partners found under this registry.</p>
          </div>
        ) : filteredCharities.map((charity) => (
          <div key={charity.id} className="glass-card group border-border/10 hover:border-accent/30 transition-all duration-500 overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="h-4 w-4 text-accent/40" />
            </div>
            
            <div className="p-8 space-y-8 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative h-20 w-20 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center p-4 shadow-2xl overflow-hidden group-hover:border-accent/40 transition-colors">
                    <div className="absolute inset-0 bg-white/5 opacity-50" />
                    <img src={charity.logo} alt={charity.name} className="relative z-10 max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100" />
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="ghost" className="h-10 w-10 p-0 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end" className="w-64 bg-zinc-950/95 backdrop-blur-xl border-white/10 p-2 rounded-2xl shadow-2xl">
                    <DropdownMenuLabel className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Partner Controls</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5 mx-2" />
                    <DropdownMenuItem 
                      onClick={() => setEditingCharity(charity)}
                      className="focus:bg-accent/10 focus:text-accent cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all"
                    >
                      <Pencil className="h-4 w-4" /> 
                      <span className="text-[10px] font-black uppercase tracking-widest">Adjust Specifications</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(charity.id)}
                      className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all text-red-500/70"
                    >
                      <Trash2 className="h-4 w-4" /> 
                      <span className="text-[10px] font-black uppercase tracking-widest">Purge Affiliation</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent bg-accent/10 px-2 py-0.5 rounded-sm">Verified Partner</span>
                  </div>
                  <h3 className="text-2xl font-heading font-black text-white italic tracking-tight group-hover:text-accent transition-colors duration-500 leading-tight">
                    {charity.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mt-4 line-clamp-3 opacity-70 group-hover:opacity-100 transition-opacity">
                    {charity.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {charity.website && (
                    <a 
                      href={charity.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-accent transition-colors group/link"
                    >
                      <Globe className="h-3.5 w-3.5 transition-transform group-hover/link:rotate-12" /> 
                      Domain
                    </a>
                  )}
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/50">
                    <ShieldCheck className="h-3.5 w-3.5" /> 
                    Secure
                  </div>
                </div>
                <Heart className="h-4 w-4 text-accent/20 group-hover:text-accent/60 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
