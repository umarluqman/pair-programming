import { AlertDialog } from "@/components/AlertDialog";
// import { ResizablePanel } from "@/components/ResizablePanel";
import type { IValidatorOption } from "@/components/Select";
import { StepOne } from "@/components/StepOne";
import { StepThree } from "@/components/StepThreeNew";
import { StepTwo } from "@/components/StepTwo";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

let loggedIn = true;
let duration = 0.5;

export interface IFormValues {
  validator: IValidatorOption | null;
  alert: string[];
  channel: Array<{
    value: string;
    type: string;
  }>;
  channelEntry: string;
}

export default function Page() {
  let [step, setStep] = useState(1);

  let [open, setOpen] = useState(false);

  const initialValues: IFormValues = {
    validator: null,
    alert: [],
    channel: [],
    channelEntry: "",
  };
  console.log({ step });

  const { register, handleSubmit, control, setValue, getValues } =
    useForm<IFormValues>({
      values: initialValues,
      mode: "all",
    });

  const alert = useWatch({
    control,
    name: "alert",
  });

  const channel = useWatch({
    control,
    name: "channel",
  });

  const validator = useWatch({
    control,
    name: "validator",
  });

  const onSubmit = (data: IFormValues) => {
    if (
      step === 3 &&
      data.validator !== null &&
      data.channel.length >= 1 &&
      data.alert.length >= 1
    ) {
      if (loggedIn) {
        setStep(step > 3 ? step : step + 1);
      } else {
        setOpen(true);
      }
      console.log("onSubmit", { data });
    }
  };

  useEffect(() => {
    // reset state after dialog is opened
    if (open) {
      setOpen(false);
    }
  }, [open]);

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return <StepOne control={control} />;
      case 2:
        return <StepTwo setValue={setValue} control={control} />;
      case 3:
        return (
          <StepThree
            getValues={getValues}
            register={register}
            control={control}
            setValue={setValue}
          />
        );
    }
  }, [step]);

  const isDisabled = useMemo(() => {
    switch (step) {
      case 1:
        return validator === null;
      case 2:
        return alert.length === 0;
      case 3:
        return channel.length === 0;
    }
  }, [step, validator, alert.length, channel.length]);

  return (
    <div className="flex min-h-screen items-start bg-gradient-to-br from-slate-700 to-slate-900 pt-40">
      <AlertDialog isOpen={open} setOpen={setOpen} />
      {/* <ResizablePanel id={`${step}`}> */}
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white">
        <div className="flex justify-between rounded p-8">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
        </div>
        <form className="px-8 pb-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="">{renderStep}</div>
          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(step < 2 ? step : step - 1)}
              className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
            >
              Back
            </button>
            {step === 3 ? (
              <button
                type="submit"
                className={`${
                  isDisabled ? "pointer-events-none opacity-50" : ""
                } bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(step > 3 ? step : step + 1)}
                className={`${
                  isDisabled ? "pointer-events-none opacity-50" : ""
                } bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
      {/* </ResizablePanel> */}
    </div>
  );
}

interface StepProps {
  step: number;
  currentStep: number;
}

function Step({ step, currentStep }: StepProps) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <motion.div
      animate={{
        backgroundColor: status === "complete" ? "rgb(59 130 246)" : "#FFF",
      }}
      className={`${
        status === "active"
          ? "border-blue-500 bg-white text-blue-500"
          : status === "complete"
          ? "border-blue-500 bg-blue-500"
          : "border-slate-200 bg-white text-slate-400"
      } flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
    >
      <div className="flex items-center justify-center">
        {status === "complete" ? (
          <CheckIcon status={status} className="h-6 w-6 text-white" />
        ) : (
          <span>{step}</span>
        )}
      </div>
    </motion.div>
  );
}

function CheckIcon({
  className,
  status,
}: {
  className?: string;
  status: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: status === "complete" ? 1 : 0 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
