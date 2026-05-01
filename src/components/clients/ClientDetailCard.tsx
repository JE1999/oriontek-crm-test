import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { APP_ROUTES, QUERY_KEYS } from "@/constants";
import { useAppForm, useFieldArray } from "@/hooks/useAppForm";
import { useDataClient, useDataMutation } from "@/hooks/useData";
import { useT } from "@/hooks/useT";
import {
  ArrowLeft,
  Calendar,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  X,
} from "@/lib/icons";
import {
  type ClientFormValues,
  getClientSchema,
} from "@/schemas/client.schema";
import {
  type UpdateClientPayload,
  updateClient,
} from "@/services/clientsService";
import type { Client } from "@/store/types/client";
import { formatDate } from "@/utils/format";
import { AddressFormList } from "./AddressFormList";
import { ClientAvatar } from "./ClientAvatar";
import { StatusBadge } from "./StatusBadge";
import { StatusSelector } from "./StatusSelector";

// ─── Sub-components ───────────────────────────────────────────────────────────
function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function AddressesRow({
  addresses,
  label,
}: {
  addresses: string[];
  label: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <MapPin className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground font-medium">
          {label}
          <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-500">
            {addresses.length}
          </span>
        </p>
        <ul className="mt-1 space-y-1.5">
          {addresses.map((addr, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-500">
                {i + 1}
              </span>
              <span className="text-sm text-foreground">{addr}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface ClientDetailCardProps {
  client: Client;
}

export function ClientDetailCard({ client }: ClientDetailCardProps) {
  const { t } = useT();
  const navigate = useNavigate();
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

  const formattedDate = formatDate(client.createdAt);

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
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

          {/* Action buttons — all type="button", no surrounding <form> */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
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
                  onClick={handleSave}
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
                  onClick={() => setIsEditing(true)}
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
          <Form {...form}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("clientDetailCard.email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@empresa.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("clientDetailCard.phone")}</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (809) 555-0100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Dynamic addresses */}
              <AddressFormList
                control={form.control}
                fields={fields}
                append={append}
                remove={remove}
                addButtonId="add-address-edit-btn"
                addButtonLabel={t("clientDetailCard.add")}
              />
            </div>
          </Form>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <DetailRow
                icon={Mail}
                label={t("clientDetailCard.email")}
                value={client.email}
              />
              <DetailRow
                icon={Phone}
                label={t("clientDetailCard.phone")}
                value={client.phone}
              />
              <DetailRow
                icon={Calendar}
                label={t("clientDetailCard.registeredAt")}
                value={formattedDate}
              />
            </div>
            <Separator />
            <AddressesRow
              addresses={client.addresses}
              label={t("clientDetailCard.addresses")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
