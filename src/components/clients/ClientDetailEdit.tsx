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
import { useFieldArray } from "@/hooks/useAppForm";
import { useT } from "@/hooks/useT";
import type { ClientFormValues } from "@/schemas/client.schema";
import type { UseFormReturn } from "react-hook-form";
import { AddressFormList } from "./AddressFormList";

interface ClientDetailEditProps {
  form: UseFormReturn<ClientFormValues>;
  isPending: boolean;
}

export function ClientDetailEdit({ form, isPending }: ClientDetailEditProps) {
  const { t } = useT();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  return (
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
                    disabled={isPending}
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
                  <Input
                    placeholder="+1 (809) 555-0100"
                    {...field}
                    disabled={isPending}
                  />
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
          disabled={isPending}
        />
      </div>
    </Form>
  );
}
