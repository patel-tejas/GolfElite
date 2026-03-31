import { getDrawStats, simulateDraw, publishDrawResults } from '@/utils/admin/actions';
import { DrawControls } from '@/components/admin/DrawControls';
import { DrawHistory } from '@/components/admin/DrawHistory';

export default async function AdminDrawsPage() {
  const stats = await getDrawStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-black text-white italic tracking-tighter uppercase">
          Draw <span className="text-emerald-500">Management</span>
        </h1>
        <p className="text-emerald-500/60 font-medium mt-2">
          Configure algorithms, run simulations, and publish monthly winners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DrawControls />
        </div>
        <div>
          <DrawHistory stats={stats} />
        </div>
      </div>
    </div>
  );
}
