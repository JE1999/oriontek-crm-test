import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import HomePage from '@/pages/home/HomePage'
import CreateClientPage from '@/pages/clients/CreateClientPage'
import ClientDetailPage from '@/pages/client-detail/ClientDetailPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/clients',
        element: <CreateClientPage />,
      },
      {
        path: '/clients/:id',
        element: <ClientDetailPage />,
      },
    ],
  },
])
