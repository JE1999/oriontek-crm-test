import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-svh bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-60 min-h-svh">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Outlet />
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
