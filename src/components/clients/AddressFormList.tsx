import type { Control, FieldValues } from "react-hook-form";
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

interface AddressFormListProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name?: any;
  fields: Record<"id", string>[];
  append: (value: any) => void;
  remove: (index: number) => void;
  addButtonId?: string;
  addButtonLabel?: string;
  subtitle?: string;
  disabled?: boolean;
}

export function AddressFormList<TFieldValues extends FieldValues = FieldValues>({
  control,
  name = "addresses",
  fields,
  append,
  remove,
  addButtonId = "add-address-btn",
  addButtonLabel = "Agregar dirección",
  subtitle,
  disabled,
}: AddressFormListProps<TFieldValues>) {
  const { t } = useT();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
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
          className="gap-1.5 h-9 text-xs w-full sm:w-auto"
          onClick={() => append({ value: "" })}
          id={addButtonId}
          disabled={disabled}
        >
          <Plus className="h-4 w-4" />
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
            name={`${name}.${index}.value` as any}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 border border-slate-200">
                      {index + 1}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        placeholder={t("addressForm.addressX", {
                          count: index + 1,
                        })}
                        {...field}
                        className="bg-white"
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
