import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Building2, Menu } from "@/lib/icons";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-svh bg-slate-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-h-svh min-w-0 lg:pl-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white px-4 lg:hidden">
          <button
            type="button"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-slate-100 hover:text-foreground"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">OrionTek</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <Outlet />
          </div>
        </main>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
