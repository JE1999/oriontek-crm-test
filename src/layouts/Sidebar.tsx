import { NavLink } from "react-router-dom";
import { useT } from "@/hooks/useT";
import { Building2, LayoutDashboard, Users, X } from "@/lib/icons";
import { cn } from "@/utils/cn";

const navItems = [
  { to: "/", labelKey: "sidebar.dashboard", icon: LayoutDashboard, end: true },
  { to: "/clients", labelKey: "sidebar.newClient", icon: Users, end: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useT();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Enter" && onClose()}
          role="button"
          tabIndex={0}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo & Close Button (mobile) */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-none">
                OrionTek
              </p>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">
                CRM
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-slate-100 hover:text-foreground lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("sidebar.menu")}
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ to, labelKey, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-slate-100 hover:text-foreground",
                    )
                  }
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {t(labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-5 py-4">
          <p className="text-xs text-muted-foreground">v1.0.0 · OrionTek CRM</p>
        </div>
      </aside>
    </>
  );
}
