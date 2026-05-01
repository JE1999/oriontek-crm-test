import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { useCreateClient } from '@/hooks/useCreateClient'
import { Loader2, Plus, Trash2 } from 'lucide-react'

const clientSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email no válido'),
  phone: z.string().min(7, 'Mínimo 7 dígitos'),
  addresses: z
    .array(z.object({ value: z.string().min(5, 'Mínimo 5 caracteres') }))
    .min(1, 'Agrega al menos una dirección'),
  status: z.enum(['active', 'inactive']),
})

type ClientFormValues = z.infer<typeof clientSchema>

export function ClientForm() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useCreateClient()

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      addresses: [{ value: '' }],
      status: 'active',
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
      navigate('/')
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Direcciones</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Puedes agregar múltiples direcciones para este cliente
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-xs"
                onClick={() => append({ value: '' })}
                id="add-address-btn"
              >
                <Plus className="h-3.5 w-3.5" />
                Agregar dirección
              </Button>
            </div>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`addresses.${index}.value`}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                            {index + 1}
                          </div>
                          <Input
                            placeholder={`Dirección ${index + 1}`}
                            {...inputField}
                            id={`address-input-${index}`}
                          />
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-red-50 flex-shrink-0"
                              onClick={() => remove(index)}
                              id={`remove-address-${index}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    {(['active', 'inactive'] as const).map((s) => (
                      <label
                        key={s}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${field.value === s
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border bg-white text-muted-foreground hover:bg-slate-50'
                          }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={s}
                          checked={field.value === s}
                          onChange={() => field.onChange(s)}
                        />
                        <span
                          className={`h-2 w-2 rounded-full ${s === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}
                        />
                        {s === 'active' ? 'Activo' : 'Inactivo'}
                      </label>
                    ))}
                  </div>
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
            onClick={() => navigate('/')}
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
