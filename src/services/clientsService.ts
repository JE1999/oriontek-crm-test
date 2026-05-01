import type { Client, CreateClientPayload } from '@/store/types/client'

export type UpdateClientPayload = Partial<CreateClientPayload>

// ─── Mock data ────────────────────────────────────────────────────────────────
let mockClients: Client[] = [
  {
    id: '1',
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@acmecorp.com',
    phone: '+1 (809) 555-0101',
    addresses: [
      'Av. Winston Churchill 1099, Santo Domingo',
      'Calle Max Henríquez Ureña 52, Piantini',
    ],
    status: 'active',
    createdAt: '2025-01-15T09:00:00Z',
  },
  {
    id: '2',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.r@techsolutions.do',
    phone: '+1 (829) 555-0202',
    addresses: ['Calle El Conde 45, Zona Colonial, Santo Domingo'],
    status: 'active',
    createdAt: '2025-02-03T14:30:00Z',
  },
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@globalventures.com',
    phone: '+1 (849) 555-0303',
    addresses: [
      'Torre Empresarial, Piso 8, Santiago',
      'Av. Las Carreras 301, Santiago',
      'Calle del Sol 89, Santiago Centro',
    ],
    status: 'inactive',
    createdAt: '2025-03-20T11:15:00Z',
  },
  {
    id: '4',
    firstName: 'Luis',
    lastName: 'Fernández',
    email: 'luis.f@innovatech.net',
    phone: '+1 (809) 555-0404',
    addresses: ['Plaza Central, Av. 27 de Febrero, Santo Domingo'],
    status: 'active',
    createdAt: '2025-04-10T08:45:00Z',
  },
  {
    id: '5',
    firstName: 'Sofía',
    lastName: 'López',
    email: 'sofia.lopez@nexgen.do',
    phone: '+1 (829) 555-0505',
    addresses: [
      'Calle Las Damas 12, Zona Colonial',
      'Av. George Washington 354, Malecón',
    ],
    status: 'active',
    createdAt: '2025-05-05T16:00:00Z',
  },
  {
    id: '6',
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@acmecorp.com',
    phone: '+1 (809) 555-0101',
    addresses: [
      'Av. Winston Churchill 1099, Santo Domingo',
      'Calle Max Henríquez Ureña 52, Piantini',
    ],
    status: 'active',
    createdAt: '2025-01-15T09:00:00Z',
  },
  {
    id: '7',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.r@techsolutions.do',
    phone: '+1 (829) 555-0202',
    addresses: ['Calle El Conde 45, Zona Colonial, Santo Domingo'],
    status: 'active',
    createdAt: '2025-02-03T14:30:00Z',
  },
  {
    id: '8',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@globalventures.com',
    phone: '+1 (849) 555-0303',
    addresses: [
      'Torre Empresarial, Piso 8, Santiago',
      'Av. Las Carreras 301, Santiago',
      'Calle del Sol 89, Santiago Centro',
    ],
    status: 'inactive',
    createdAt: '2025-03-20T11:15:00Z',
  },
  {
    id: '9',
    firstName: 'Luis',
    lastName: 'Fernández',
    email: 'luis.f@innovatech.net',
    phone: '+1 (809) 555-0404',
    addresses: ['Plaza Central, Av. 27 de Febrero, Santo Domingo'],
    status: 'active',
    createdAt: '2025-04-10T08:45:00Z',
  },
  {
    id: '10',
    firstName: 'Sofía',
    lastName: 'López',
    email: 'sofia.lopez@nexgen.do',
    phone: '+1 (829) 555-0505',
    addresses: [
      'Calle Las Damas 12, Zona Colonial',
      'Av. George Washington 354, Malecón',
    ],
    status: 'active',
    createdAt: '2025-05-05T16:00:00Z',
  },
  {
    id: '11',
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@acmecorp.com',
    phone: '+1 (809) 555-0101',
    addresses: [
      'Av. Winston Churchill 1099, Santo Domingo',
      'Calle Max Henríquez Ureña 52, Piantini',
    ],
    status: 'active',
    createdAt: '2025-01-15T09:00:00Z',
  },
  {
    id: '12',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.r@techsolutions.do',
    phone: '+1 (829) 555-0202',
    addresses: ['Calle El Conde 45, Zona Colonial, Santo Domingo'],
    status: 'active',
    createdAt: '2025-02-03T14:30:00Z',
  },
  {
    id: '13',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@globalventures.com',
    phone: '+1 (849) 555-0303',
    addresses: [
      'Torre Empresarial, Piso 8, Santiago',
      'Av. Las Carreras 301, Santiago',
      'Calle del Sol 89, Santiago Centro',
    ],
    status: 'inactive',
    createdAt: '2025-03-20T11:15:00Z',
  },
  {
    id: '14',
    firstName: 'Luis',
    lastName: 'Fernández',
    email: 'luis.f@innovatech.net',
    phone: '+1 (809) 555-0404',
    addresses: ['Plaza Central, Av. 27 de Febrero, Santo Domingo'],
    status: 'active',
    createdAt: '2025-04-10T08:45:00Z',
  },
  {
    id: '15',
    firstName: 'Sofía',
    lastName: 'López',
    email: 'sofia.lopez@nexgen.do',
    phone: '+1 (829) 555-0505',
    addresses: [
      'Calle Las Damas 12, Zona Colonial',
      'Av. George Washington 354, Malecón',
    ],
    status: 'active',
    createdAt: '2025-05-05T16:00:00Z',
  },
]

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
