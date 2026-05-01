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
import { APP_ROUTES, CLIENT_STATUS, QUERY_KEYS } from "@/constants";
import { useAppForm, useFieldArray } from "@/hooks/useAppForm";
import { useDataClient, useDataMutation } from "@/hooks/useData";
import { useT } from "@/hooks/useT";
import { Loader2 } from "@/lib/icons";
import {
  type ClientFormValues,
  getClientSchema,
} from "@/schemas/client.schema";
import { createClient } from "@/services/clientsService";
import { AddressFormList } from "./AddressFormList";
import { StatusSelector } from "./StatusSelector";

export function ClientForm() {
  const { t } = useT();
  const navigate = useNavigate();
  const queryClient = useDataClient();
  const { mutateAsync, isPending } = useDataMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS });
    },
  });

  const form = useAppForm<ClientFormValues>({
    schema: getClientSchema(t),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addresses: [{ value: "" }],
      status: CLIENT_STATUS.ACTIVE,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  async function onSubmit(values: ClientFormValues) {
    try {
      await mutateAsync({
        ...values,
        addresses: values.addresses.map((a) => a.value),
      });
      toast.success(t("clientForm.success"), {
        description: t("clientForm.successDesc", {
          name: `${values.firstName} ${values.lastName}`,
        }),
      });
      navigate(APP_ROUTES.HOME);
    } catch {
      toast.error(t("clientForm.error"), {
        description: t("clientForm.errorDesc"),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal info */}
        <div className="rounded-sm border border-border bg-white p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {t("clientForm.personalInfo")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("clientForm.personalInfoDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("clientForm.firstName")}</FormLabel>
                  <FormControl>
                    <Input placeholder="María" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("clientForm.lastName")}</FormLabel>
                  <FormControl>
                    <Input placeholder="García" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("clientForm.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="maria@empresa.com"
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
                  <FormLabel>{t("clientForm.phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (809) 555-0100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="rounded-sm border border-border bg-white p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {t("clientForm.addressStatus")}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("clientForm.addressStatusDesc")}
            </p>
          </div>
          {/* Addresses */}
          <AddressFormList
            control={form.control}
            fields={fields}
            append={append}
            remove={remove}
            subtitle="Puedes agregar múltiples direcciones para este cliente"
            addButtonId="add-address-btn"
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("clientForm.status")}</FormLabel>
                <FormControl>
                  <StatusSelector
                    value={field.value}
                    onChange={field.onChange}
                    size="md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate(APP_ROUTES.HOME)}
            disabled={isPending}
          >
            {t("clientForm.cancel")}
          </Button>
          <Button type="submit" disabled={isPending} className="min-w-32">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("clientForm.saving")}
              </>
            ) : (
              t("clientForm.save")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
