/**
 * Returns the uppercase initials from a first and last name.
 * Example: getInitials('John', 'Doe') => 'JD'
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
}
