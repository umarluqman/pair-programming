import { validatorOptions } from "@/constants";
import Select from "@/components/Select";
import { Control, Controller } from "react-hook-form";
import { IFormValues } from "@/pages";

interface StepOneProps {
  control: Control<IFormValues>;
}

export const StepOne = ({ control }: StepOneProps) => {
  return (
    <>
      <label className="text-sm text-slate-600">Validator</label>
      <Controller
        control={control}
        name="validator"
        render={({ field: { onChange, value } }) => (
          <Select
            name="validator"
            options={validatorOptions}
            placeholder="Choose..."
            value={value}
            onChange={(value) => {
              onChange(value);
            }}
          />
        )}
      />
    </>
  );
};
