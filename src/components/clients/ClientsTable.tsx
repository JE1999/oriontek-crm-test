import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeletonRow } from "@/components/ui/table-skeleton";
import { APP_ROUTES, PAGE_SIZE_OPTIONS } from "@/constants";
import { useT } from "@/hooks/useT";
import { ChevronRight, Users } from "@/lib/icons";
import type { Client } from "@/types/client";
import { ClientAvatar } from "./ClientAvatar";
import { StatusBadge } from "./StatusBadge";

interface ClientsTableProps {
  clients: Client[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export function ClientsTable({
  clients,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  onPageSizeChange,
}: ClientsTableProps) {
  const { t } = useT();
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-border bg-white overflow-hidden">
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[700px] sm:min-w-full">
          <TableHeader>
            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
              <TableHead className="font-semibold text-slate-700 pl-4 sm:pl-5 h-12">
                {t("clientsTable.name")}
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                {t("clientsTable.email")}
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                {t("clientsTable.phone")}
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                {t("clientsTable.status")}
              </TableHead>
              <TableHead className="font-semibold text-slate-700 pr-4 sm:pr-5 text-right">
                {t("clientsTable.action")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableSkeletonRow key={i} columns={5} />
              ))
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <Users className="h-10 w-10 text-slate-300" />
                    <p className="font-medium text-slate-500">
                      {t("clientsTable.noClients")}
                    </p>
                    <p className="text-sm">{t("clientsTable.createFirst")}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow
                  key={client.id}
                  className="cursor-pointer hover:bg-slate-50 transition-colors group"
                  onClick={() => navigate(APP_ROUTES.CLIENT_DETAIL(client.id))}
                >
                  <TableCell className="pl-4 sm:pl-5 font-medium text-foreground py-3">
                    <div className="flex items-center gap-3">
                      <ClientAvatar
                        firstName={client.firstName}
                        lastName={client.lastName}
                        size="sm"
                        shape="circle"
                      />
                      <span className="truncate">
                        {client.firstName} {client.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground py-3">
                    {client.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-3 whitespace-nowrap">
                    {client.phone}
                  </TableCell>
                  <TableCell className="py-3">
                    <StatusBadge status={client.status} />
                  </TableCell>
                  <TableCell className="pr-4 sm:pr-5 text-right py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground group-hover:text-primary h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && clients.length > 0 && (
        <div className="flex flex-col gap-4 px-5 py-4 border-t border-border bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between sm:py-3">
          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground sm:justify-start">
            <p>
              {t("clientsTable.total")}{" "}
              <span className="font-medium text-foreground">{totalItems}</span>
            </p>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span>{t("clientsTable.show")}</span>
              <select
                className="rounded-md border border-input bg-white px-2 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:text-sm"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <p className="text-xs text-muted-foreground sm:text-sm">
              {t("clientsTable.page")}{" "}
              <span className="font-medium text-foreground">{currentPage}</span>{" "}
              {t("clientsTable.of")}{" "}
              <span className="font-medium text-foreground">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
              >
                {t("clientsTable.prev")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
              >
                {t("clientsTable.next")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
