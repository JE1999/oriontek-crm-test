import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import { ErrorFallback } from "@/components/error-fallback";
import { router } from "@/routes";
import { Providers } from "@/providers";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ErrorBoundary>
  );
}
