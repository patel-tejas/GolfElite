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
    <div className="flex h-screen overflow-hidden bg-black text-white font-sans selection:bg-primary/30">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-zinc-950/50">
        {/* Prestige Background Branding */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden blur-[120px] opacity-20">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full" />
        </div>

        <div className="relative z-10 p-10 h-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
