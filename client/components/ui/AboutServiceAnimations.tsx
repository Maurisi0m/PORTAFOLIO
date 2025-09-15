import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export function AboutServiceAnimations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className="space-y-20"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Animation 1: Web interface with chat */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-lg border border-gray-300 p-6 bg-white dark:bg-gray-800 shadow-lg max-w-xl mx-auto"
      >
        <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md relative overflow-hidden">
          {/* Simulated chat bubbles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute top-8 left-6 bg-white rounded-lg px-4 py-2 shadow-md max-w-xs"
          >
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Hola, ¿cómo podemos ayudarte hoy?
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute top-20 right-6 bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md max-w-xs"
          >
            <p className="text-sm">Queremos diseñar tu sitio web.</p>
          </motion.div>
        </div>
        <p className="mt-4 text-center font-semibold text-gray-900 dark:text-gray-100">
          Hablamos de tu proyecto
        </p>
      </motion.div>

      {/* Animation 2: Monitor with code */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-lg border border-gray-300 p-6 bg-white dark:bg-gray-800 shadow-lg max-w-xl mx-auto flex flex-col items-center"
      >
        <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-md relative overflow-hidden">
          {/* Simulated code lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute top-8 left-6 w-3/4 h-4 bg-green-900 rounded"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-16 left-6 w-1/2 h-4 bg-green-900 rounded"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="absolute top-24 left-6 w-5/6 h-4 bg-green-900 rounded"
          />
        </div>
        <p className="mt-4 text-center font-semibold text-gray-900 dark:text-gray-100">
          Diseñamos y revisamos
        </p>
      </motion.div>

      {/* Animation 3: Server with cloud and checkmark */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-lg border border-gray-300 p-6 bg-white dark:bg-gray-800 shadow-lg max-w-xl mx-auto flex flex-col items-center"
      >
        <div className="w-full h-48 rounded-md relative flex justify-center items-center space-x-6">
          {/* Server */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-20 h-32 bg-gray-300 dark:bg-gray-700 rounded-md shadow-inner relative"
          >
            <div className="absolute top-4 left-4 w-12 h-4 bg-gray-400 dark:bg-gray-600 rounded" />
            <div className="absolute top-12 left-4 w-12 h-4 bg-gray-400 dark:bg-gray-600 rounded" />
            <div className="absolute top-20 left-4 w-12 h-4 bg-gray-400 dark:bg-gray-600 rounded" />
          </motion.div>
          {/* Arrow */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-8 h-8 border-4 border-primary border-t-transparent border-r-transparent rotate-45"
          />
          {/* Cloud */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="w-24 h-16 bg-gray-400 dark:bg-gray-600 rounded-full relative"
          >
            <div className="absolute top-4 left-4 w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </motion.div>
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl"
          >
            ✓
          </motion.div>
        </div>
        <p className="mt-4 text-center font-semibold text-gray-900 dark:text-gray-100">
          Hosting y despliegue
        </p>
      </motion.div>
    </motion.div>
  );
}
