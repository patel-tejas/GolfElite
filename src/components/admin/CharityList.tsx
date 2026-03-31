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
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
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
      toast.success(editingCharity ? 'Charity updated' : 'Charity created');
      setIsAdding(false);
      setEditingCharity(null);
      // Refresh list (simplified: page revalidation will handle it, but for UX)
      window.location.reload(); 
    } else {
      toast.error(result.error || 'Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this charity?')) return;
    
    const result = await deleteCharity(id);
    if (result.success) {
      toast.success('Charity deleted');
      setCharities(prev => prev.filter(c => c.id !== id));
    } else {
      toast.error('Failed to delete charity');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search charities..." 
            className="pl-9 bg-white/5 border-white/10"
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
            <Button onClick={() => setIsAdding(true)} className="btn-premium h-11 px-6 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          } />
          <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading font-black italic">
                {editingCharity ? 'Edit Partner' : 'Add New Partner'}
              </DialogTitle>
              <DialogDescription className="text-zinc-500">
                Configure the charity details to be displayed on the platform.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Charity Name</Label>
                  <Input id="name" name="name" defaultValue={editingCharity?.name} placeholder="e.g. Golf for Good" className="bg-white/5 border-white/10 h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Logo URL</Label>
                  <Input id="logo" name="logo" defaultValue={editingCharity?.logo} placeholder="https://..." className="bg-white/5 border-white/10 h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Website URL</Label>
                  <Input id="website" name="website" defaultValue={editingCharity?.website} placeholder="https://..." className="bg-white/5 border-white/10 h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingCharity?.description} placeholder="Short summary of the charity's mission..." className="bg-white/5 border-white/10 min-h-[100px] resize-none" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full btn-premium h-12 font-bold uppercase tracking-widest text-xs">
                  {editingCharity ? 'Save Changes' : 'Create Partner'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharities.map((charity) => (
          <div key={charity.id} className="glass-card border-white/5 bg-white/2 hover:bg-white/5 transition-all group relative">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl">
                  <img src={charity.logo} alt={charity.name} className="max-h-full max-w-full object-contain" />
                </div>
                <DropdownMenu>
                <DropdownMenuTrigger render={
                    <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 text-zinc-300">
                    <DropdownMenuItem 
                      onClick={() => setEditingCharity(charity)}
                      className="focus:bg-white/5 focus:text-white cursor-pointer gap-2"
                    >
                      <Pencil className="h-4 w-4" /> Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(charity.id)}
                      className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer gap-2 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" /> Delete Partner
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-black text-white italic group-hover:text-emerald-500 transition-colors">
                    {charity.name}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium line-clamp-2 mt-2">
                    {charity.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                  {charity.website && (
                    <a 
                      href={charity.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                    >
                      <Globe className="h-3 w-3" /> Website
                    </a>
                  )}
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500/50">
                    <Heart className="h-3 w-3" /> Partner Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
