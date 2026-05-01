// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 25] as const

// Client status
export const CLIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

// Application Routes (Frontend)
export const APP_ROUTES = {
  HOME: '/',
  CREATE_CLIENT: '/clients',
  CLIENT_DETAIL_ROUTE: '/clients/:id',
  CLIENT_DETAIL: (id: string | number) => `/clients/${id}`,
} as const

// React Query Keys
export const QUERY_KEYS = {
  CLIENTS: ['clients'],
  CLIENT: (id: string) => ['client', id],
} as const
