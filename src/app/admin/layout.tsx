import { AdminSidebar } from '@/components/admin/Sidebar';
import { ensureAdmin } from '@/lib/admin';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await ensureAdmin();
  } catch (error) {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 p-8 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
