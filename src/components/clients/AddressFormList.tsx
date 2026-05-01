import type { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useT } from "@/hooks/useT";
import { Plus, Trash2 } from "@/lib/icons";

interface AddressFormListProps {
  control: Control<any>;
  name?: string;
  fields: Record<"id", string>[];
  append: (value: any) => void;
  remove: (index: number) => void;
  addButtonId?: string;
  addButtonLabel?: string;
  subtitle?: string;
}

export function AddressFormList({
  control,
  name = "addresses",
  fields,
  append,
  remove,
  addButtonId = "add-address-btn",
  addButtonLabel = "Agregar dirección",
  subtitle,
}: AddressFormListProps) {
  const { t } = useT();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            {t("addressForm.title")}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 h-8 text-xs"
          onClick={() => append({ value: "" })}
          id={addButtonId}
        >
          <Plus className="h-3.5 w-3.5" />
          {addButtonLabel === "Agregar dirección"
            ? t("addressForm.add")
            : addButtonLabel}
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((fieldItem, index) => (
          <FormField
            key={fieldItem.id}
            control={control}
            name={`${name}.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                      {index + 1}
                    </div>
                    <Input
                      placeholder={t("addressForm.addressX", {
                        count: index + 1,
                      })}
                      {...field}
                      id={`address-input-${index}`}
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-red-50 flex-shrink-0"
                        onClick={() => remove(index)}
                        id={`remove-address-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
