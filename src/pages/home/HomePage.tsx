import { useNavigate } from 'react-router-dom'
import { useClients } from '@/hooks/useClients'
import { useTableParams } from '@/hooks/useTableParams'
import { APP_ROUTES } from '@/constants'
import { ClientsTable } from '@/components/clients/ClientsTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Users } from '@/lib/icons'
import { filterClients } from '@/utils/clients'
import { paginate } from '@/utils/pagination'

export default function HomePage() {
  const navigate = useNavigate()
  const { data: clients = [], isLoading } = useClients()
  const { q, page, pageSize, handleSearch, handlePageChange, handlePageSizeChange } = useTableParams()

  const filtered = filterClients(clients, q)
  const { data: paginatedClients, totalItems, totalPages } = paginate(filtered, page, pageSize)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Clientes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading ? 'Cargando…' : `${clients.length} clientes registrados`}
          </p>
        </div>
        <Button onClick={() => navigate(APP_ROUTES.CREATE_CLIENT)} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Nuevo cliente
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar por nombre o email…"
          value={q}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 bg-white max-w-sm"
          id="search-clients"
        />
      </div>

      {/* Stats row */}
      {!isLoading && clients.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { label: 'Total', value: clients.length, color: 'text-foreground' },
            {
              label: 'Activos',
              value: clients.filter((c) => c.status === 'active').length,
              color: 'text-emerald-600',
            },
            {
              label: 'Inactivos',
              value: clients.filter((c) => c.status === 'inactive').length,
              color: 'text-slate-400',
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-sm border border-border bg-white px-4 py-3 space-y-0.5"
            >
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {q && filtered.length === 0 && !isLoading ? (
        <div className="rounded-sm border border-border bg-white py-20 text-center">
          <Users className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 font-medium text-slate-500">Sin resultados para "{q}"</p>
          <p className="text-sm text-muted-foreground mt-1">Intenta con otro nombre o email.</p>
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
  )
}
