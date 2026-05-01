import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFieldArray, useAppForm } from '@/hooks/useAppForm'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useDataMutation, useDataClient } from '@/hooks/useData'
import { updateClient, type UpdateClientPayload } from '@/services/clientsService'
import { QUERY_KEYS } from '@/constants'
import type { Client } from '@/store/types/client'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
  Pencil,
  X,
  Loader2,
} from '@/lib/icons'
import { StatusBadge } from './StatusBadge'
import { ClientAvatar } from './ClientAvatar'
import { StatusSelector } from './StatusSelector'
import { AddressFormList } from './AddressFormList'
import { APP_ROUTES } from '@/constants'
import { clientSchema, type ClientFormValues } from '@/schemas/client.schema'
import { formatDate } from '@/utils/format'

// ─── Sub-components ───────────────────────────────────────────────────────────
function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  )
}

function AddressesRow({ addresses }: { addresses: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <MapPin className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground font-medium">
          Direcciones
          <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-500">
            {addresses.length}
          </span>
        </p>
        <ul className="mt-1 space-y-1.5">
          {addresses.map((addr, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-500">
                {i + 1}
              </span>
              <span className="text-sm text-foreground">{addr}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


// ─── Main component ───────────────────────────────────────────────────────────
interface ClientDetailCardProps {
  client: Client
}

export function ClientDetailCard({ client }: ClientDetailCardProps) {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useDataClient()
  const { mutateAsync, isPending } = useDataMutation({
    mutationFn: (payload: UpdateClientPayload) => updateClient(client.id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(QUERY_KEYS.CLIENT(client.id), updated)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS })
    },
  })

  const formattedDate = formatDate(client.createdAt)

  const form = useAppForm<ClientFormValues>({
    schema: clientSchema,
    values: {
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      addresses: client.addresses.map((a) => ({ value: a })),
      status: client.status,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'addresses',
  })

  function handleCancel() {
    form.reset()
    setIsEditing(false)
  }

  async function handleSave() {
    await form.handleSubmit(async (values: ClientFormValues) => {
      try {
        await mutateAsync({
          ...values,
          addresses: values.addresses.map((a) => a.value),
        })
        toast.success('Cliente actualizado', {
          description: 'Los cambios fueron guardados correctamente.',
        })
        setIsEditing(false)
      } catch {
        toast.error('Error al guardar', {
          description: 'Ocurrió un problema. Intenta de nuevo.',
        })
      }
    })()
  }

  return (
    <div className="space-y-6">
      {/* ── Header card ──────────────────────────────────────────────── */}
      <div className="rounded-sm border border-border bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <ClientAvatar firstName={client.firstName} lastName={client.lastName} size="lg" shape="square" />

            {isEditing ? (
              <Form {...form}>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Nombre" {...field} className="h-8 text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Apellido" {...field} className="h-8 text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <StatusSelector value={field.value} onChange={field.onChange} size="sm" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            ) : (
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {client.firstName} {client.lastName}
                </h1>
                <div className="mt-2">
                  <StatusBadge status={client.status} />
                </div>
              </div>
            )}
          </div>

          {/* Action buttons — all type="button", no surrounding <form> */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="gap-1.5 text-muted-foreground"
                  id="cancel-edit-btn"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={isPending}
                  className="gap-1.5 min-w-24"
                  id="save-client-btn"
                  onClick={handleSave}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Guardar'
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(APP_ROUTES.HOME)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Volver
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-1.5"
                  id="edit-client-btn"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Contact / edit card ──────────────────────────────────────── */}
      <div className="rounded-sm border border-border bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Información de contacto</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEditing ? 'Modifica los datos del cliente' : 'Datos de comunicación del cliente'}
            </p>
          </div>
          {isEditing && (
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-2 py-1 font-medium">
              Modo edición
            </span>
          )}
        </div>
        <Separator />

        {isEditing ? (
          <Form {...form}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@empresa.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (809) 555-0100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Dynamic addresses */}
              <AddressFormList
                control={form.control}
                fields={fields}
                append={append}
                remove={remove}
                addButtonId="add-address-edit-btn"
                addButtonLabel="Agregar"
              />
            </div>
          </Form>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <DetailRow icon={Mail} label="Email" value={client.email} />
              <DetailRow icon={Phone} label="Teléfono" value={client.phone} />
              <DetailRow icon={Calendar} label="Registrado el" value={formattedDate} />
            </div>
            <Separator />
            <AddressesRow addresses={client.addresses} />
          </div>
        )}
      </div>
    </div>
  )
}
