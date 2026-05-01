import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "@/lib/icons";
import { useT } from "@/hooks/useT";

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  const { t } = useT();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="flex max-w-md flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-sm">
        <div className="rounded-full bg-destructive/10 p-3 text-destructive">
          <AlertCircle className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {t("error.title", "Algo salió mal")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t(
              "error.description",
              "Ha ocurrido un error inesperado en la aplicación.",
            )}
          </p>
        </div>

        {/* Only show error details in development or if they exist */}
        {error?.message && (
          <div className="w-full rounded-md bg-muted p-4 text-left text-xs">
            <p className="font-mono text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}

        <Button onClick={resetErrorBoundary} className="w-full gap-2">
          <RefreshCw className="h-4 w-4" />
          {t("error.retry", "Intentar de nuevo")}
        </Button>
      </div>
    </div>
  );
}
