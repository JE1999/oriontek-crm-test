import { useParams, useNavigate } from 'react-router-dom'
import { useClient } from '@/hooks/useClient'
import { ClientDetailCard } from '@/components/clients/ClientDetailCard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Loader2, AlertCircle } from '@/lib/icons'
import { Button } from '@/components/ui/button'
import { APP_ROUTES } from '@/constants'

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: client, isLoading, isError } = useClient(id ?? '')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !client) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
          <AlertCircle className="h-7 w-7 text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Cliente no encontrado</p>
          <p className="text-sm text-muted-foreground mt-1">
            El cliente que buscas no existe o fue eliminado.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(APP_ROUTES.HOME)}>
          Volver al listado
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate(APP_ROUTES.HOME)}
              className="cursor-pointer hover:text-foreground"
            >
              Clientes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {client.firstName} {client.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Detail */}
      <ClientDetailCard client={client} />
    </div>
  )
}
