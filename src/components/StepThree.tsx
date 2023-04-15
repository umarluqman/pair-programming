import { alertOptions } from "@/constants";
import { IFormValues } from "@/pages";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import {
  Control,
  Controller,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";

interface StepThreeProps {
  control: Control<IFormValues>;
  register: UseFormRegister<IFormValues>;
}

export const StepThree = ({ control, register }: StepThreeProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "channel",
  });

  return (
    <>
      <div>Channels</div>
      <div className="p-4 bg-slate-100 rounded-lg mt-4 border border-slate-400 border-solid">
        <div className="mb-4 flex justify-between w-full items-center">
          <label className="text-sm text-slate-600">Email</label>
          <button
            type="button"
            onClick={() => append({ type: "email", value: "" })}
            className="flex rounded-lg p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-5">
          {fields.map((item, index) => (
            <li key={item.id} className="flex items-center gap-2">
              <input
                {...register(`channel.${index}.value`)}
                type={item.type}
                className="flex h-10 w-full rounded-md border border-slate-300 bg-white py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex rounded-lg p-2 text-slate-500 hover:bg-red-100 hover:text-red-800"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2 flex gap-3"></div>
    </>
  );
};
