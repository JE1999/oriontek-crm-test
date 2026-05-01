import { regexes, z } from 'zod'
import { CLIENT_STATUS } from '@/constants'
import type { TFunction } from 'i18next'

export const getClientSchema = (t: TFunction) => z.object({
  firstName: z.string().trim().min(2, t('validation.min2Chars')),
  lastName: z.string().trim().min(2, t('validation.min2Chars')),
  email: z.string().trim().regex(regexes.unicodeEmail, t('validation.invalidEmail')),
  phone: z.string().trim().min(10, t('validation.min10Digits')),
  addresses: z
    .array(z.object({ value: z.string().trim().min(5, t('validation.min5Chars')) }))
    .min(1, t('validation.min1Address')),
  status: z.enum([CLIENT_STATUS.ACTIVE, CLIENT_STATUS.INACTIVE]),
})

// Since we cannot infer from a function type easily, we export a generic type
// assuming the shape doesn't change based on translations.
// We infer it by calling getClientSchema with a dummy function just for types.
export type ClientFormValues = z.infer<ReturnType<typeof getClientSchema>>
