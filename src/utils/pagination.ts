/**
 * Returns the paginated slice of an array and the total number of pages.
 */
export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const data = items.slice((page - 1) * pageSize, page * pageSize)
  return { data, totalItems, totalPages }
}
