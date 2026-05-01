import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { QUERY_KEYS } from "@/constants";
import { useAppForm } from "@/hooks/useAppForm";
import { useDataClient, useDataMutation } from "@/hooks/useData";
import { useT } from "@/hooks/useT";
import {
  type ClientFormValues,
  getClientSchema,
} from "@/schemas/client.schema";
import {
  type UpdateClientPayload,
  updateClient,
} from "@/services/clientsService";
import type { Client } from "@/types/client";
import { ClientDetailEdit } from "./ClientDetailEdit";
import { ClientDetailHeader } from "./ClientDetailHeader";
import { ClientDetailView } from "./ClientDetailView";

interface ClientDetailCardProps {
  client: Client;
}

export function ClientDetailCard({ client }: ClientDetailCardProps) {
  const { t } = useT();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useDataClient();

  const { mutateAsync, isPending } = useDataMutation({
    mutationFn: (payload: UpdateClientPayload) =>
      updateClient(client.id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(QUERY_KEYS.CLIENT(client.id), updated);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS });
    },
  });

  const form = useAppForm<ClientFormValues>({
    schema: getClientSchema(t),
    values: {
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      addresses: client.addresses.map((a) => ({ value: a })),
      status: client.status,
    },
  });

  function handleCancel() {
    form.reset();
    setIsEditing(false);
  }

  async function handleSave() {
    await form.handleSubmit(async (values: ClientFormValues) => {
      try {
        await mutateAsync({
          ...values,
          addresses: values.addresses.map((a) => a.value),
        });
        toast.success(t("clientDetailCard.success"), {
          description: t("clientDetailCard.successDesc"),
        });
        setIsEditing(false);
      } catch {
        toast.error(t("clientDetailCard.error"), {
          description: t("clientDetailCard.errorDesc"),
        });
      }
    })();
  }

  return (
    <div className="space-y-6">
      {/* ── Header card ──────────────────────────────────────────────── */}
      <ClientDetailHeader
        client={client}
        isEditing={isEditing}
        isPending={isPending}
        onEdit={() => setIsEditing(true)}
        onCancel={handleCancel}
        onSave={handleSave}
        form={form}
      />

      {/* ── Contact / edit card ──────────────────────────────────────── */}
      <div className="rounded-sm border border-border bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {t("clientDetailCard.contactInfo")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEditing
                ? t("clientDetailCard.contactInfoEdit")
                : t("clientDetailCard.contactInfoView")}
            </p>
          </div>
          {isEditing && (
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-2 py-1 font-medium">
              {t("clientDetailCard.editMode")}
            </span>
          )}
        </div>
        <Separator />

        {isEditing ? (
          <ClientDetailEdit form={form} isPending={isPending} />
        ) : (
          <ClientDetailView client={client} />
        )}
      </div>
    </div>
  );
}
