import { z } from 'zod'
import { CLIENT_STATUS } from '@/constants'

export const clientSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email no válido'),
  phone: z.string().min(7, 'Mínimo 7 dígitos'),
  addresses: z
    .array(z.object({ value: z.string().min(5, 'Mínimo 5 caracteres') }))
    .min(1, 'Agrega al menos una dirección'),
  status: z.enum([CLIENT_STATUS.ACTIVE, CLIENT_STATUS.INACTIVE]),
})

export type ClientFormValues = z.infer<typeof clientSchema>
