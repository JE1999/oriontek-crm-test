import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import HomePage from '@/pages/home/HomePage'
import CreateClientPage from '@/pages/clients/CreateClientPage'
import ClientDetailPage from '@/pages/client-detail/ClientDetailPage'
import { APP_ROUTES } from '@/constants'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: APP_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: APP_ROUTES.CREATE_CLIENT,
        element: <CreateClientPage />,
      },
      {
        path: APP_ROUTES.CLIENT_DETAIL_ROUTE,
        element: <ClientDetailPage />,
      },
    ],
  },
])
