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
import { Input } from "./ui/input";

interface FormInputProps<T extends FieldValues> {
  _form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  _type: string;
  description: string;
}

export default function FormInput<T extends FieldValues>({
  _form,
  name,
  label,
  placeholder,
  _type,
  description,
}: FormInputProps<T>) {
  return (
    <FormField
      control={_form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={_type}
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
