import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { APP_ROUTES } from "@/constants";
import { useT } from "@/hooks/useT";
import { ArrowLeft, Loader2, Pencil, X } from "@/lib/icons";
import type { ClientFormValues } from "@/schemas/client.schema";
import type { Client } from "@/types/client";
import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClientAvatar } from "./ClientAvatar";
import { StatusBadge } from "./StatusBadge";
import { StatusSelector } from "./StatusSelector";

interface ClientDetailHeaderProps {
  client: Client;
  isEditing: boolean;
  isPending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  form: UseFormReturn<ClientFormValues>;
}

export function ClientDetailHeader({
  client,
  isEditing,
  isPending,
  onEdit,
  onCancel,
  onSave,
  form,
}: ClientDetailHeaderProps) {
  const { t } = useT();
  const navigate = useNavigate();

  return (
    <div className="rounded-sm border border-border bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <ClientAvatar
            firstName={client.firstName}
            lastName={client.lastName}
            size="lg"
            shape="square"
          />

          {isEditing ? (
            <Form {...form}>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder={t("clientDetailCard.firstName")}
                            {...field}
                            className="h-8 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder={t("clientDetailCard.lastName")}
                            {...field}
                            className="h-8 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <StatusSelector
                          value={field.value}
                          onChange={field.onChange}
                          size="sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          ) : (
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {client.firstName} {client.lastName}
              </h1>
              <div className="mt-2">
                <StatusBadge status={client.status} />
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
                disabled={isPending}
                className="gap-1.5 text-muted-foreground"
                id="cancel-edit-btn"
              >
                <X className="h-4 w-4" />
                {t("clientDetailCard.cancel")}
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={isPending}
                className="gap-1.5 min-w-24"
                id="save-client-btn"
                onClick={onSave}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t("clientDetailCard.save")
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate(APP_ROUTES.HOME)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                {t("clientDetailCard.back")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="gap-1.5"
                id="edit-client-btn"
              >
                <Pencil className="h-3.5 w-3.5" />
                {t("clientDetailCard.edit")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
