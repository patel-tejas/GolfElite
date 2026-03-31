import { getCharities } from '@/utils/charities/actions';
import { AdminCharityList } from '@/components/admin/CharityList';
import { Heart } from 'lucide-react';

export default async function CharityManagement() {
  const result = await getCharities();
  const charities = result.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Heart className="h-3.5 w-3.5 text-red-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Partner Program</span>
          </div>
          <h1 className="text-3xl font-heading font-black text-white italic">Charity Partners</h1>
          <p className="text-zinc-500 font-medium mt-1">Manage the philanthropic reach of the platform.</p>
        </div>
      </div>

      <AdminCharityList charities={charities} />
    </div>
  );
}
