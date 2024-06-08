import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface FormTextareaProps {
  _form: any;
  name: string;
  label: string;
  placeholder: string;
  description: string;
}

export default function FormTextarea({
  _form,
  name,
  label,
  placeholder,
  description,
}: FormTextareaProps) {
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
