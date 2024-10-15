import { useFormContext, RegisterOptions } from "react-hook-form";
import Field from "./Field"
import Label from "./Label"

type Props = {
  name: string;
  label: string;
  options?: RegisterOptions;
}

const Checkbox = ({ name, label, options = {} }: Props) => {
  const { register, watch } = useFormContext();
  const value = watch(name);
console.log('value', value)
  return (
    <Field>
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={value} {...register(name, options)} className="border-gray-200 cursor-not-allowed mb-1 block"  />
        <Label htmlFor={name}>{label}</Label>
      </div>
    </Field>
  )
}

export default Checkbox;



