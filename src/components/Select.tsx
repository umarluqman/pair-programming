import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export interface IValidatorOption {
  id: number;
  name: string;
  fullAddress: string;
}

interface ISelectProps {
  options: IValidatorOption[];
  value: IValidatorOption | null;
  name: string;
  onChange: (value: IValidatorOption) => void;
  placeholder?: string;
  zIndex?: string;
}

export default function Select({
  name,
  value,
  options,
  onChange,
  placeholder,
  zIndex,
}: ISelectProps) {
  const [query, setQuery] = useState("");

  const filteredValidators =
    query === ""
      ? options
      : options.filter((validator) =>
          validator.fullAddress
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="max-w-xs">
      <Combobox value={value} onChange={onChange} by="id">
        <div className="z-0 relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left sm:text-sm">
            <Combobox.Input
              className="flex w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400"
              displayValue={(validator: IValidatorOption) =>
                validator?.name ?? ""
              }
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={clsx(
                "absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                zIndex ? `z-${zIndex}` : ""
              )}
            >
              {filteredValidators.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredValidators.map((validator) => (
                  <Combobox.Option
                    key={validator.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={validator}
                  >
                    {({ selected, active, ...rest }) => {
                      return (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {validator.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-blue-500"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
