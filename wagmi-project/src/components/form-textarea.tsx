import {
  type UseFormReturn,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface FormTextareaProps<T extends FieldValues> {
  _form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  description: string;
}

export default function FormTextarea<T extends FieldValues>({
  _form,
  name,
  label,
  placeholder,
  description,
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={_form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              onFocus={(e) => e.currentTarget.select()}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
