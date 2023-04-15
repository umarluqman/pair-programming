import { Transition } from "@headlessui/react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { clsx } from "clsx";
import React, { Fragment, useEffect } from "react";
import Image from "next/image";

interface AlertDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialog = (props: AlertDialogProps) => {
  useEffect(() => {
    return () => {
      props.setOpen(false);
    };
  }, []);

  return (
    <AlertDialogPrimitive.Root open={props.isOpen} onOpenChange={props.setOpen}>
      <AlertDialogPrimitive.Portal forceMount>
        <Transition.Root show={props.isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AlertDialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <AlertDialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
              )}
            >
              <AlertDialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                You are not logged in
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </AlertDialogPrimitive.Description>
              <div className="mt-4 flex justify-end space-x-2 items-center">
                <AlertDialogPrimitive.Cancel
                  className={clsx(
                    "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                    "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600",
                    "border border-gray-300 dark:border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                  )}
                >
                  Cancel
                </AlertDialogPrimitive.Cancel>
                <AlertDialogPrimitive.Action
                  className={clsx(
                    "inline-flex gap-2 select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                    "bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
                    "border border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                  )}
                >
                  <Image
                    src="google-icon.svg"
                    alt="google logo"
                    width={22}
                    height={22}
                  ></Image>{" "}
                  Login with Google
                </AlertDialogPrimitive.Action>
              </div>
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export { AlertDialog };
