import { useNavigate, useParams } from "react-router-dom";
import { ClientDetailCard } from "@/components/clients/ClientDetailCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { APP_ROUTES, QUERY_KEYS } from "@/constants";
import { useDataQuery } from "@/hooks/useData";
import { useT } from "@/hooks/useT";
import { AlertCircle, Loader2 } from "@/lib/icons";
import { fetchClientById } from "@/services/clientsService";

export default function ClientDetailPage() {
  const { t } = useT();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: client,
    isLoading,
    isError,
  } = useDataQuery({
    queryKey: QUERY_KEYS.CLIENT(id ?? ""),
    queryFn: () => fetchClientById(id ?? ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !client) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
          <AlertCircle className="h-7 w-7 text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {t("clientDetail.notFound.title")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("clientDetail.notFound.desc")}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(APP_ROUTES.HOME)}>
          {t("clientDetail.notFound.back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate(APP_ROUTES.HOME)}
              className="cursor-pointer hover:text-foreground"
            >
              {t("clientDetail.breadcrumb.clients")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {client.firstName} {client.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Detail */}
      <ClientDetailCard client={client} />
    </div>
  );
}
