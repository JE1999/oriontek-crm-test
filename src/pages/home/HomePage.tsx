import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES, QUERY_KEYS } from "@/constants";
import { useDataQuery } from "@/hooks/useData";
import { useDebounce } from "@/hooks/useDebounce";
import { useT } from "@/hooks/useT";
import { useTableParams } from "@/hooks/useTableParams";
import { Plus, Search, Users } from "@/lib/icons";
import { fetchClients } from "@/services/clientsService";
import { filterClients } from "@/utils/clients";
import { paginate } from "@/utils/pagination";

export default function HomePage() {
  const { t } = useT();
  const navigate = useNavigate();
  const { data: clients = [], isLoading } = useDataQuery({
    queryKey: QUERY_KEYS.CLIENTS,
    queryFn: fetchClients,
  });
  const {
    q,
    page,
    pageSize,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
  } = useTableParams();

  const [searchValue, setSearchValue] = useState(q);
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    if (debouncedSearchValue !== q) {
      handleSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, q, handleSearch]);

  useEffect(() => {
    setSearchValue(q);
  }, [q]);

  const filtered = filterClients(clients, q);
  const {
    data: paginatedClients,
    totalItems,
    totalPages,
  } = paginate(filtered, page, pageSize);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl">
            {t("home.title")}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 sm:text-sm">
            {isLoading
              ? t("home.loading")
              : t("home.clientsRegistered", { count: clients.length })}
          </p>
        </div>
        <Button
          onClick={() => navigate(APP_ROUTES.CREATE_CLIENT)}
          className="gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          {t("home.newClient")}
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={t("home.searchPlaceholder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-9 bg-white w-full h-10"
          id="search-clients"
        />
      </div>

      {/* Stats row */}
      {!isLoading && clients.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-3">
          {[
            {
              label: t("home.stats.total"),
              value: clients.length,
              color: "text-foreground",
              bg: "bg-white",
            },
            {
              label: t("home.stats.active"),
              value: clients.filter((c) => c.status === "active").length,
              color: "text-emerald-600",
              bg: "bg-emerald-50/30",
            },
            {
              label: t("home.stats.inactive"),
              value: clients.filter((c) => c.status === "inactive").length,
              color: "text-slate-400",
              bg: "bg-slate-50/30",
            },
          ].map(({ label, value, color, bg }) => (
            <div
              key={label}
              className={`rounded-lg border border-border ${bg} px-3 py-2 sm:px-4 sm:py-3 space-y-0.5`}
            >
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {label}
              </p>
              <p className={`text-lg sm:text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {q && filtered.length === 0 && !isLoading ? (
        <div className="rounded-sm border border-border bg-white py-20 text-center">
          <Users className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 font-medium text-slate-500">
            {t("home.noResults", { query: q })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("home.tryAnother")}
          </p>
        </div>
      ) : (
        <ClientsTable
          clients={paginatedClients}
          isLoading={isLoading}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
