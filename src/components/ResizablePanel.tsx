import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

let duration = 0.5;

export const ResizablePanel = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [ref, { height }] = useMeasure();

  return (
    <MotionConfig transition={{ duration }}>
      <motion.div
        animate={{
          height: height || "auto",
        }}
        className="overflow-hidden relative"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={id}
            initial={{
              // opacity: 0,
              x: -382,
            }}
            animate={{
              // opacity: 1,
              x: 0,
              transition: { duration: duration / 2, delay: duration / 2 },
            }}
            exit={{
              // opacity: 0,
              x: 382,
              transition: { duration: duration / 2 },
            }}
          >
            <div
              ref={ref}
              className={`px-8 pb-8 ${height ? "absolute" : "relative"}`}
              // className={`px-8 pb-8 absolute`}
            >
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
};
