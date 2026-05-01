/**
 * Formats a date string or Date object to a human-readable string.
 * Defaults to the 'es-DO' locale and a long date format.
 */
export function formatDate(
  date: string | Date,
  locale = 'es-DO',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}
