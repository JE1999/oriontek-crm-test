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
import type { Client } from "@/store/types/client";
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
    <div className="rounded-sm border border-border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="font-semibold text-slate-700 pl-5">
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
            <TableHead className="font-semibold text-slate-700 pr-5 text-right">
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
                <TableCell className="pl-5 font-medium text-foreground">
                  <div className="flex items-center gap-3">
                    <ClientAvatar
                      firstName={client.firstName}
                      lastName={client.lastName}
                      size="sm"
                      shape="circle"
                    />
                    {client.firstName} {client.lastName}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {client.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {client.phone}
                </TableCell>
                <TableCell>
                  <StatusBadge status={client.status} />
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground group-hover:text-primary h-7 w-7 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {!isLoading && clients.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3 border-t border-border bg-slate-50/50">
          <div className="flex items-center gap-3 text-sm text-muted-foreground w-full sm:w-auto justify-between sm:justify-start">
            <p>
              {t("clientsTable.total")}{" "}
              <span className="font-medium text-foreground">{totalItems}</span>
            </p>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span>{t("clientsTable.show")}</span>
              <select
                className="rounded-md border border-input bg-white px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <p className="text-sm text-muted-foreground">
              {t("clientsTable.page")}{" "}
              <span className="font-medium text-foreground">{currentPage}</span>{" "}
              {t("clientsTable.of")}{" "}
              <span className="font-medium text-foreground">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
              >
                {t("clientsTable.prev")}
              </Button>
              <Button
                variant="outline"
                size="sm"
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
