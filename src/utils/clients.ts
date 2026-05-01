import type { Client } from "@/types/client";

/**
 * Filters a list of clients by a search query.
 * Matches against first name, last name and email (case-insensitive).
 */
export function filterClients(clients: Client[], query: string): Client[] {
  if (!query) return clients;
  const q = query.toLowerCase();
  return clients.filter(
    (c) =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q),
  );
}
