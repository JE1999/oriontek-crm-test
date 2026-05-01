import { Badge } from "@/components/ui/badge";
import { CLIENT_STATUS } from "@/constants";
import { useT } from "@/hooks/useT";
import type { Client } from "@/types/client";

interface StatusBadgeProps {
  status: Client["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useT();

  return (
    <Badge
      variant={status === CLIENT_STATUS.ACTIVE ? "default" : "secondary"}
      className={
        status === CLIENT_STATUS.ACTIVE
          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
          : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100"
      }
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full inline-block ${
          status === CLIENT_STATUS.ACTIVE ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {status === CLIENT_STATUS.ACTIVE
        ? t("status.active")
        : t("status.inactive")}
    </Badge>
  );
}
