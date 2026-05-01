export type ClientStatus = 'active' | 'inactive'

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  addresses: string[]
  status: ClientStatus
  createdAt: string
}

export interface CreateClientPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  addresses: string[]
  status: ClientStatus
}
