import { useFieldArray, useAppForm } from '@/hooks/useAppForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDataMutation, useDataClient } from '@/hooks/useData'
import { createClient } from '@/services/clientsService'
import { Loader2 } from '@/lib/icons'
import { AddressFormList } from './AddressFormList'
import { StatusSelector } from './StatusSelector'
import { CLIENT_STATUS, APP_ROUTES, QUERY_KEYS } from '@/constants'
import { clientSchema, type ClientFormValues } from '@/schemas/client.schema'

export function ClientForm() {
  const navigate = useNavigate()
  const queryClient = useDataClient()
  const { mutateAsync, isPending } = useDataMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS })
    },
  })

  const form = useAppForm<ClientFormValues>({
    schema: clientSchema,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      addresses: [{ value: '' }],
      status: CLIENT_STATUS.ACTIVE,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'addresses',
  })

  async function onSubmit(values: ClientFormValues) {
    try {
      await mutateAsync({
        ...values,
        addresses: values.addresses.map((a) => a.value),
      })
      toast.success('Cliente creado', {
        description: `${values.firstName} ${values.lastName} fue registrado exitosamente.`,
      })
      navigate(APP_ROUTES.HOME)
    } catch {
      toast.error('Error al crear cliente', {
        description: 'Ocurrió un problema. Intenta de nuevo.',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal info */}
        <div className="rounded-sm border border-border bg-white p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Información personal</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Datos básicos de identificación del cliente</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="María" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="García" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="maria@empresa.com" {...field} />
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
        </div>

        <div className="rounded-sm border border-border bg-white p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Dirección y estado</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Ubicación y estado del cliente</p>
          </div>
          {/* Addresses */}
          <AddressFormList
            control={form.control}
            fields={fields}
            append={append}
            remove={remove}
            subtitle="Puedes agregar múltiples direcciones para este cliente"
            addButtonId="add-address-btn"
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <StatusSelector value={field.value} onChange={field.onChange} size="md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate(APP_ROUTES.HOME)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending} className="min-w-32">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando…
              </>
            ) : (
              'Crear cliente'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
