import { useNavigate } from "react-router-dom";
import { ClientForm } from "@/components/clients/ClientForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants";
import { useT } from "@/hooks/useT";
import { ArrowLeft } from "@/lib/icons";

export default function CreateClientPage() {
  const { t } = useT();
  const navigate = useNavigate();

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
              {t("createClient.breadcrumb.clients")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {t("createClient.breadcrumb.newClient")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(APP_ROUTES.HOME)}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          id="back-button"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            {t("createClient.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("createClient.subtitle")}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <ClientForm />
      </div>
    </div>
  );
}
