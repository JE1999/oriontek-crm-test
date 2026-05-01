import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * Generic wrapper for React Query's useQuery.
 * This abstracts the library dependency while maintaining full type safety.
 */
export function useDataQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
>(options: UseQueryOptions<TQueryFnData, TError, TData>) {
  return useQuery(options);
}

/**
 * Generic wrapper for React Query's useMutation.
 * This abstracts the library dependency while maintaining full type safety.
 */
export function useDataMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  return useMutation(options);
}

/**
 * Hook to access the query client, useful for manual cache manipulation.
 */
export function useDataClient() {
  return useQueryClient();
}
