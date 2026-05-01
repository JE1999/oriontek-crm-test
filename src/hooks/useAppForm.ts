import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldValues,
  type UseFormProps,
  useFieldArray,
  useForm,
} from "react-hook-form";
import type { ZodType } from "zod";

interface UseAppFormProps<TFieldValues extends FieldValues>
  extends Omit<UseFormProps<TFieldValues>, "resolver"> {
  schema: ZodType<any, any, any>;
}

/**
 * Global hook to initialize forms.
 * Wraps `useForm` from react-hook-form and automatically injects the zodResolver.
 * If the form library is changed in the future (e.g., Formik, Mantine),
 * only this file needs to be modified.
 */
export function useAppForm<TFieldValues extends FieldValues>({
  schema,
  ...formConfig
}: UseAppFormProps<TFieldValues>) {
  return useForm<TFieldValues>({
    ...formConfig,
    resolver: zodResolver(schema),
  });
}

export { useFieldArray };
