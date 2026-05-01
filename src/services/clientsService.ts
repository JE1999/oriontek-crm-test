import type { Client, CreateClientPayload } from '@/store/types/client'

export type UpdateClientPayload = Partial<CreateClientPayload>

import mockClientsData from './mockClients.json'

// ─── Mock data ────────────────────────────────────────────────────────────────
let mockClients: Client[] = [...mockClientsData] as Client[]

// ─── Simulated async API ───────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function fetchClients(): Promise<Client[]> {
  await delay(600)
  return [...mockClients]
}

export async function fetchClientById(id: string): Promise<Client | null> {
  await delay(400)
  return mockClients.find((c) => c.id === id) ?? null
}

export async function createClient(payload: CreateClientPayload): Promise<Client> {
  await delay(800)
  const newClient: Client = {
    ...payload,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  }
  mockClients = [newClient, ...mockClients]
  return newClient
}

export async function updateClient(
  id: string,
  payload: UpdateClientPayload,
): Promise<Client> {
  await delay(600)
  const index = mockClients.findIndex((c) => c.id === id)
  if (index === -1) throw new Error('Cliente no encontrado')
  mockClients[index] = { ...mockClients[index], ...payload }
  return { ...mockClients[index] }
}
