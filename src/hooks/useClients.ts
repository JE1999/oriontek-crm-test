import { useQuery } from '@tanstack/react-query'
import { fetchClients } from '@/services/clientsService'

export const CLIENTS_QUERY_KEY = ['clients'] as const

export function useClients() {
  return useQuery({
    queryKey: CLIENTS_QUERY_KEY,
    queryFn: fetchClients,
  })
}
