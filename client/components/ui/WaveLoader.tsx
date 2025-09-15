import { AnimatePresence, motion } from "framer-motion";

export default function WaveLoader({ visible }: { visible: boolean }) {
  const bars = new Array(5).fill(0);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className="fixed inset-0 grid place-items-center z-[70] pointer-events-none"
        >
          <div className="flex items-end gap-1.5 rounded-full border bg-background/70 px-2 py-1 shadow-sm backdrop-blur-md">
            {bars.map((_, i) => (
              <motion.span
                key={i}
                className="h-3 sm:h-3.5 w-1.5 sm:w-2 rounded-full bg-gradient-to-b from-primary to-accent shadow-[0_0_10px_hsl(var(--primary)/.35)]"
                style={{ transformOrigin: "bottom" }}
                initial={{ scaleY: 0.6 }}
                animate={{ scaleY: [0.6, 1, 0.6] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.06,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
