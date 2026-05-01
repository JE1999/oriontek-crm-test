import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateClient, type UpdateClientPayload } from '@/services/clientsService'
import { QUERY_KEYS } from '@/constants'

export function useUpdateClient(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateClientPayload) => updateClient(id, payload),
    onSuccess: (updated) => {
      // Update the individual client cache
      queryClient.setQueryData(QUERY_KEYS.CLIENT(id), updated)
      // Invalidate the full list so it refreshes too
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS })
    },
  })
}
