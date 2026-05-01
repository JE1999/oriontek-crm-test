import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Client } from '@/store/types/client'
import { ChevronRight, Users } from 'lucide-react'

interface ClientsTableProps {
  clients: Client[]
  isLoading?: boolean
}

function StatusBadge({ status }: { status: Client['status'] }) {
  return (
    <Badge
      variant={status === 'active' ? 'default' : 'secondary'}
      className={
        status === 'active'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50'
          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100'
      }
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full inline-block ${status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
          }`}
      />
      {status === 'active' ? 'Activo' : 'Inactivo'}
    </Badge>
  )
}

function SkeletonRow() {
  return (
    <TableRow>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 rounded bg-slate-100 animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
        </TableCell>
      ))}
    </TableRow>
  )
}

export function ClientsTable({ clients, isLoading }: ClientsTableProps) {
  const navigate = useNavigate()

  return (
    <div className="rounded-sm border border-border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="font-semibold text-slate-700 pl-5">Nombre</TableHead>
            <TableHead className="font-semibold text-slate-700">Email</TableHead>
            <TableHead className="font-semibold text-slate-700">Teléfono</TableHead>
            <TableHead className="font-semibold text-slate-700">Estado</TableHead>
            <TableHead className="font-semibold text-slate-700 pr-5 text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-20 text-center">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Users className="h-10 w-10 text-slate-300" />
                  <p className="font-medium text-slate-500">No hay clientes registrados</p>
                  <p className="text-sm">Crea el primer cliente usando el botón de arriba.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors group"
                onClick={() => navigate(`/clients/${client.id}`)}
              >
                <TableCell className="pl-5 font-medium text-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {client.firstName[0]}{client.lastName[0]}
                    </div>
                    {client.firstName} {client.lastName}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{client.email}</TableCell>
                <TableCell className="text-muted-foreground">{client.phone}</TableCell>
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
    </div>
  )
}
