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
      className="min-h-screen flex flex-col justify-center items-center space-y-40 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Animation 1: Web interface with chat - Looped conversation */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-lg p-6 bg-white/80 dark:bg-gray-900/80 shadow-2xl max-w-3xl w-full overflow-hidden backdrop-blur-lg"
      >
        <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md relative overflow-hidden">
          {/* Floating particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/30 rounded-full"
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 150 - 75],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              style={{ left: `${10 + i * 8}%`, top: `${20 + i * 5}%` }}
            />
          ))}
          {/* Simulated chat bubbles - looped */}
          <motion.div
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-60, 0, 0, -60],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              times: [0, 0.2, 0.8, 1],
            }}
            className="absolute top-12 left-8 bg-white rounded-lg px-6 py-3 shadow-md max-w-lg"
          >
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Hola, ¿cómo podemos ayudarte hoy?
            </p>
          </motion.div>
          <motion.div
            animate={{
              opacity: [0, 1, 1, 0],
              x: [60, 0, 0, 60],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1.5,
              times: [0, 0.2, 0.8, 1],
            }}
            className="absolute top-32 right-8 bg-blue-500 text-white rounded-lg px-6 py-3 shadow-md max-w-lg"
          >
            <p className="text-lg">Queremos diseñar tu sitio web.</p>
          </motion.div>
          <motion.div
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-60, 0, 0, -60],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 3,
              times: [0, 0.2, 0.8, 1],
            }}
            className="absolute top-52 left-8 bg-white rounded-lg px-6 py-3 shadow-md max-w-lg"
          >
            <p className="text-lg text-gray-800 dark:text-gray-200">
              ¡Perfecto! Cuéntanos más sobre tu idea.
            </p>
          </motion.div>
        </div>
        <p className="mt-6 text-center font-bold text-gray-900 dark:text-gray-100 text-xl">
          Hablamos de tu proyecto
        </p>
      </motion.div>

      {/* Animation 2: Monitor with code - Typing effect */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-lg p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 shadow-2xl max-w-2xl mx-auto flex flex-col items-center overflow-hidden"
      >
        {/* Monitor shape */}
        <div className="relative">
          <div className="w-80 h-48 bg-gray-800 rounded-lg relative overflow-hidden border-4 border-gray-700">
            <div className="w-full h-6 bg-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="p-4 h-full bg-black relative">
              {/* Code lines */}
              <motion.div className="text-green-400 font-mono text-sm">
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  const design = await createWebsite();
                </motion.span>
                <br />
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
                >
                  function optimizePerformance() {'{'}
                </motion.span>
                <br />
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2, delay: 1 }}
                >
                  &nbsp;&nbsp;return responsive && fast;
                </motion.span>
                <br />
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2, delay: 1.5 }}
                >
                  {'}'}
                </motion.span>
              </motion.div>
              {/* Cursor */}
              <motion.div
                className="absolute w-0.5 h-4 bg-green-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ left: "calc(100% - 2px)", top: "20px" }}
              />
            </div>
          </div>
          {/* Monitor stand */}
          <div className="w-20 h-6 bg-gray-700 mx-auto mt-2 rounded-b-md"></div>
          <div className="w-12 h-4 bg-gray-800 mx-auto rounded-b-md"></div>
        </div>
        <p className="mt-6 text-center font-bold text-gray-900 dark:text-gray-100 text-xl">
          Diseñamos y revisamos
        </p>
      </motion.div>

      {/* Animation 3: Multiple 3D Servers with WWW - Data flow */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-lg p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 shadow-2xl max-w-4xl mx-auto flex flex-col items-center overflow-hidden"
      >
        <div className="w-full h-64 rounded-md relative flex justify-center items-center space-x-8">
          {/* Multiple Servers */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotateY: [0, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="w-24 h-40 bg-gray-300 dark:bg-gray-700 rounded-md shadow-inner relative transform-gpu"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Server lights */}
              <motion.div
                className="absolute top-4 left-4 w-16 h-4 bg-gray-400 dark:bg-gray-600 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.div
                className="absolute top-12 left-4 w-16 h-4 bg-gray-400 dark:bg-gray-600 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 + 0.3 }}
              />
              <motion.div
                className="absolute top-20 left-4 w-16 h-4 bg-gray-400 dark:bg-gray-600 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 + 0.6 }}
              />
              <motion.div
                className="absolute top-28 left-4 w-16 h-4 bg-gray-400 dark:bg-gray-600 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 + 0.9 }}
              />
              {/* WWW text */}
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-600 dark:text-gray-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                WWW
              </motion.div>
            </motion.div>
          ))}
          {/* Data flow particles between servers */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-primary rounded-full"
              animate={{
                x: [0, 200],
                y: [0, Math.sin(i) * 30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.6,
              }}
              style={{ left: "10%", top: `${30 + i * 10}%` }}
            />
          ))}
          {/* Cloud */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-8 right-8 w-32 h-20 bg-gray-400 dark:bg-gray-600 rounded-full relative"
          >
            <div className="absolute top-6 left-6 w-20 h-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
            {/* Cloud particles */}
            <motion.div
              className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-8 right-4 w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-12 left-8 w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
          {/* Checkmark */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
          >
            ✓
          </motion.div>
        </div>
        <p className="mt-6 text-center font-bold text-gray-900 dark:text-gray-100 text-xl">
          Hosting y despliegue
        </p>
      </motion.div>
    </motion.div>
  );
}
