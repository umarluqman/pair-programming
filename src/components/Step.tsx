import { motion } from "framer-motion";
import { CheckIcon } from "./CheckIcon";

interface StepProps {
  step: number;
  currentStep: number;
}

export function Step({ step, currentStep }: StepProps) {
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
