import { useNavigate } from 'react-router-dom'
import { ClientForm } from '@/components/clients/ClientForm'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ArrowLeft } from 'lucide-react'

export default function CreateClientPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/')}
              className="cursor-pointer hover:text-foreground"
            >
              Clientes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nuevo cliente</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          id="back-button"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Nuevo cliente</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Completa el formulario para registrar un nuevo cliente.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <ClientForm />
      </div>
    </div>
  )
}
