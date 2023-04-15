import { alertOptions } from "@/constants";
import { IFormValues } from "@/pages";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRef } from "react";
import { useKeyRef } from "rooks";

import {
  Control,
  Controller,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

interface StepThreeProps {
  control: Control<IFormValues>;
  register: UseFormRegister<IFormValues>;
  getValues: UseFormGetValues<IFormValues>;
  setValue: UseFormSetValue<IFormValues>;
}

export const StepThree = ({
  control,
  setValue,
  getValues,
  register,
}: StepThreeProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "channel",
  });

  const handleAdd = () => {
    const { channelEntry } = getValues();
    if (!channelEntry) return;

    // Email validation
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(channelEntry)) {
      append({
        type: "email",
        value: channelEntry,
      });
      setValue("channelEntry", "");
    }
  };

  const inputRef = useKeyRef(["Enter"], handleAdd);
  return (
    <>
      <div>Channels</div>
      <div className="p-4 bg-slate-50 rounded-lg mt-4 border border-slate-300 border-solid">
        <label className="text-sm text-slate-600">Email</label>
        <ul className="mt-1 flex flex-col gap-5">
          <li className="flex items-center gap-1 sm:text-sm">
            <Controller
              control={control}
              name={`channelEntry`}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type={"email"}
                    className="flex w-full max-w-xs rounded-md border border-slate-300 bg-white py-2 px-3 text-sm placeholder:text-slate-400"
                    ref={(e) => {
                      field.ref(e); // for react-hook-form
                      inputRef(e); // for listening to key events
                    }}
                    placeholder="Enter email(s)"
                  />
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="transition-colors flex rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                  >
                    <PlusIcon className="w-6 h-6" />
                  </button>
                </>
              )}
            />
          </li>
          <div className="flex flex-wrap gap-1">
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="text-sm flex items-center gap-0 justify-start w-fit"
              >
                <div className="rounded-l-md py-1 bg-indigo-100 text-indigo-700 flex pl-2 pr-1 ">
                  {item.value}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-indigo-100 py-1 text-indigo-700 transition-colors flex rounded-r-md p-[2px] hover:bg-red-100 hover:text-red-800"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </div>
        </ul>
      </div>

      <div className="mt-2 flex gap-3"></div>
    </>
  );
};
