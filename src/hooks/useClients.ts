import { useQuery } from '@tanstack/react-query'
import { fetchClients } from '@/services/clientsService'
import { QUERY_KEYS } from '@/constants'

export function useClients() {
  return useQuery({
    queryKey: QUERY_KEYS.CLIENTS,
    queryFn: fetchClients,
  })
}
