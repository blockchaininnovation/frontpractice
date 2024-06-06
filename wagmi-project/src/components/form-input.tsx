import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps {
  _form: any;
  name: string;
  label: string;
  placeholder: string;
  _type: string;
  description: string;
}

export default function FormInput({
  _form,
  name,
  label,
  placeholder,
  _type,
  description,
}: FormInputProps) {
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
              className="w-1/3"
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
