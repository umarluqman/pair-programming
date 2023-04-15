import { alertOptions } from "@/constants";
import { IFormValues } from "@/pages";
import clsx from "clsx";
import {
  Control,
  Controller,
  useWatch,
  UseFormSetValue,
} from "react-hook-form";

interface StepTwoProps {
  control: Control<IFormValues>;
  setValue: UseFormSetValue<IFormValues>;
}

export const StepTwo = ({ control, setValue }: StepTwoProps) => {
  // keeping track of the form state - alert and remove undefined values
  const existingAlerts = useWatch({
    control,
    name: "alert",
  }).filter((i) => i !== undefined);

  return (
    <>
      <label className="text-sm text-slate-600">Alert</label>

      <div className="mt-1 grid gap-3 grid-cols-4">
        {alertOptions.map(({ id, name }, index) => {
          return (
            <Controller
              control={control}
              name={`alert.${index}`}
              key={name}
              render={() => {
                const selected = existingAlerts.includes(name);

                const handleClick = () => {
                  if (selected) {
                    setValue(
                      "alert",
                      existingAlerts.filter((alert) => alert !== name)
                    );
                  } else {
                    setValue("alert", [...existingAlerts, name]);
                  }
                };
                return (
                  <div
                    className={clsx(
                      "p-4 border-2 border-solid rounded-lg cursor-pointer transition-colors",
                      {
                        "border-indigo-500": selected,
                        "border-slate-300": !selected,
                        "bg-indigo-100": selected,
                        "bg-slate-50": !selected,
                        "hover:bg-indigo-50": !selected,
                        "hover:border-indigo-400": !selected,
                        "text-indigo-800": selected,
                      }
                    )}
                    onClick={handleClick}
                    key={name}
                  >
                    {name}
                  </div>
                );
              }}
            />
          );
        })}
      </div>
    </>
  );
};

// TODO: convert to input type checkbox
{
  /* <input
  onChange={(e) => {
    const valueCopy = [...value];

    // update checkbox value
    valueCopy[index] = e.target.checked ? e.target.value : null;

    // send data to react hook form
    field.onChange(valueCopy);

    // update local state
    setValue(valueCopy);
  }}
  key={option}
  checked={value.includes(option)}
  type="checkbox"
  value={option}
/>; */
}
