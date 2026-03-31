import { getCharities } from '@/utils/charities/actions';
import { AdminCharityList } from '@/components/admin/CharityList';
import { Heart, Globe, ShieldCheck, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function CharityManagement() {
  const result = await getCharities();
  const charities = result.data || [];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Background Glory */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-px w-8 bg-accent/40" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Philanthropic Network</span>
          </div>
          <div>
            <h1 className="text-5xl font-heading font-black text-white italic tracking-tighter leading-none flex items-center gap-4">
              Impact <span className="text-white/20">Archival</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] mt-4 max-w-lg leading-relaxed">
              Curating the global reach of the Fairway Elite partners. Oversee contributions and partner visibility.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <Button variant="outline" className="border-white/5 bg-zinc-900/40 text-white hover:bg-white/5 font-black uppercase tracking-[0.2em] text-[10px] h-14 px-8 rounded-2xl flex items-center gap-3 transition-all">
             <Globe className="h-4 w-4 text-accent" />
             Impact Map
           </Button>
           <Button variant="outline" className="border-white/5 bg-zinc-900/40 text-white hover:bg-white/5 font-black uppercase tracking-[0.2em] text-[10px] h-14 px-8 rounded-2xl flex items-center gap-3 transition-all">
             <ShieldCheck className="h-4 w-4 text-zinc-500" />
             Verification
           </Button>
        </div>
      </div>

      <div className="relative z-10">
        <AdminCharityList charities={charities} />
      </div>
    </div>
  );
}
