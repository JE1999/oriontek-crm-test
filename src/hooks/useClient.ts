import { useQuery } from '@tanstack/react-query'
import { fetchClientById } from '@/services/clientsService'
import { QUERY_KEYS } from '@/constants'

export function useClient(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.CLIENT(id),
    queryFn: () => fetchClientById(id),
    enabled: !!id,
  })
}
