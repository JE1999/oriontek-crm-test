import { useQuery } from '@tanstack/react-query'
import { fetchClientById } from '@/services/clientsService'

export function useClient(id: string) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => fetchClientById(id),
    enabled: !!id,
  })
}
