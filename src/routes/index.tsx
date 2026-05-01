import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTES } from "@/constants";
import { AppLayout } from "@/layouts/AppLayout";
import ClientDetailPage from "@/pages/client-detail/ClientDetailPage";
import CreateClientPage from "@/pages/clients/CreateClientPage";
import HomePage from "@/pages/home/HomePage";

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
]);
