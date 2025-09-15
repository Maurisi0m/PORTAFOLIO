import { motion, useAnimation, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Utility: clamp helper
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Parallax background with gradient blobs and starfield
function ParallaxBackground({ mouseX, mouseY, reduce }: { mouseX: any; mouseY: any; reduce: boolean }) {
  const x1 = useTransform(mouseX, [ -1, 1 ], [ -30, 30 ]);
  const y1 = useTransform(mouseY, [ -1, 1 ], [ -30, 30 ]);
  const x2 = useTransform(mouseX, [ -1, 1 ], [ 20, -20 ]);
  const y2 = useTransform(mouseY, [ -1, 1 ], [ 20, -20 ]);
  const x3 = useTransform(mouseX, [ -1, 1 ], [ -10, 10 ]);
  const y3 = useTransform(mouseY, [ -1, 1 ], [ 10, -10 ]);

  const float = reduce ? {} : { y: [0, -6, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } };

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.violet.500/.25),transparent)]"
        style={{ x: x1, y: y1 }}
        animate={float as any}
      />
      {/* Blob 2 */}
      <motion.div
        className="absolute -bottom-24 -right-24 h-[34rem] w-[34rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.fuchsia.500/.18),transparent)]"
        style={{ x: x2, y: y2 }}
        animate={float as any}
      />
      {/* Blob 3 */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.blue.500/.14),transparent)]"
        style={{ x: x3, y: y3 }}
        animate={float as any}
      />
      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(60)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 4;
          const size = Math.random() * 2 + 1;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-foreground/10 dark:bg-white/20"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
              animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
              transition={reduce ? undefined : { duration: 2 + Math.random() * 2, repeat: Infinity, delay }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Reusable 3D tilt card with shine
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [ -0.5, 0.5 ], [ 10, -10 ]);
  const rotateY = useTransform(mouseX, [ -0.5, 0.5 ], [ -10, 10 ]);
  const scale = useSpring(1, { stiffness: 240, damping: 30 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mouseX.set(clamp((e.clientX - cx) / r.width, -0.5, 0.5));
    mouseY.set(clamp((e.clientY - cy) / r.height, -0.5, 0.5));
  }, [mouseX, mouseY]);

  const onEnter = () => scale.set(1.03);
  const onLeave = () => { scale.set(1); mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={ref}
      className={"relative rounded-2xl border bg-card/80 backdrop-blur p-6 overflow-hidden " + className}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={{ boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Shine */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        initial={false}
        whileHover={{ opacity: 1 }}
        style={{
          background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.18), transparent 40%)",
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Chat scene: conversational discovery
function ChatScene() {
  return (
    <TiltCard>
      <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl relative overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/30 rounded-full"
            animate={{ x: [0, Math.random() * 280 - 140], y: [0, Math.random() * 140 - 70], opacity: [0, 1, 0] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            style={{ left: `${8 + i * 7}%`, top: `${18 + i * 4}%` }}
          />
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], x: [-60, 0, 0, -60] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
          className="absolute top-10 left-6 bg-white rounded-lg px-5 py-3 shadow-md max-w-md"
        >
          <p className="text-base text-gray-800">Hola, ¿cómo podemos ayudarte hoy?</p>
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], x: [60, 0, 0, 60] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.4, times: [0, 0.2, 0.8, 1] }}
          className="absolute top-28 right-6 bg-blue-500 text-white rounded-lg px-5 py-3 shadow-md max-w-md"
        >
          <p className="text-base">Queremos diseñar tu sitio web.</p>
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], x: [-60, 0, 0, -60] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2.8, times: [0, 0.2, 0.8, 1] }}
          className="absolute bottom-6 left-6 bg-white rounded-lg px-5 py-3 shadow-md max-w-md"
        >
          <p className="text-base text-gray-800">¡Perfecto! Cuéntanos más sobre tu idea.</p>
        </motion.div>
      </div>
      <p className="mt-5 text-center font-bold text-gray-900 dark:text-gray-100 text-lg">Hablamos de tu proyecto</p>
    </TiltCard>
  );
}

// Code scene: editor with animated typing & status bars
function CodeScene() {
  return (
    <TiltCard>
      <div className="relative">
        <div className="w-full h-10 bg-gray-900 rounded-t-xl flex items-center gap-2 px-3">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="ml-3 text-xs text-white/60">Proyecto: sitio-marca</span>
        </div>
        <div className="bg-black rounded-b-xl p-4 h-56 relative overflow-hidden">
          <motion.pre className="text-green-400 font-mono text-sm leading-6">
            <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>const design = await createWebsite();</motion.div>
            <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.4 }}>function optimizePerformance() {"{"}</motion.div>
            <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.9 }}>&nbsp;&nbsp;return responsive && fast;</motion.div>
            <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 1.3 }}>{"}"}</motion.div>
          </motion.pre>
          <motion.div className="absolute bottom-3 left-4 right-4 h-2 rounded bg-emerald-600/30">
            <motion.div className="h-2 rounded bg-emerald-500" animate={{ width: ["10%", "90%", "60%", "100%"] }} transition={{ duration: 6, repeat: Infinity }} />
          </motion.div>
          <motion.div className="absolute top-3 right-3 text-emerald-400 text-xs" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>Lighthouse 95+</motion.div>
        </div>
      </div>
      <p className="mt-5 text-center font-bold text-gray-900 dark:text-gray-100 text-lg">Diseñamos y revisamos</p>
    </TiltCard>
  );
}

// Hosting scene: servers, flow lines and check
function HostingScene() {
  return (
    <TiltCard>
      <div className="w-full h-64 rounded-xl relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20" />
        <div className="relative z-10 flex gap-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotateY: [0, 12, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className="w-24 h-40 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-inner relative transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[0,1,2,3].map((r) => (
                <motion.div key={r} className="absolute left-4 right-4 h-4 bg-gray-400/80 dark:bg-gray-600/80 rounded" style={{ top: 16 + r * 24 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 + r * 0.25 }} />
              ))}
              <motion.div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600 dark:text-gray-300" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>WWW</motion.div>
            </motion.div>
          ))}
        </div>
        {/* Flow particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            animate={{ x: [0, 220], y: [0, Math.sin(i) * 28], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            style={{ left: "18%", top: `${35 + i * 8}%` }}
          />
        ))}
        {/* Cloud */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-6 right-8 w-32 h-20 bg-gray-300/80 dark:bg-gray-600/70 rounded-full"
        >
          <div className="absolute top-6 left-6 w-20 h-12 bg-gray-200/80 dark:bg-gray-700/80 rounded-full" />
        </motion.div>
        {/* Check */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-4 right-6 w-12 h-12 bg-primary rounded-full grid place-items-center text-white text-2xl shadow-lg"
        >
          ✓
        </motion.div>
      </div>
      <p className="mt-5 text-center font-bold text-gray-900 dark:text-gray-100 text-lg">Hosting y despliegue</p>
    </TiltCard>
  );
}

// Process timeline (responsive)
function ProcessTimeline() {
  const steps = [
    { title: "Descubrimiento", desc: "Objetivos, audiencia, contenido." },
    { title: "Diseño", desc: "UI/UX fiel a tu marca." },
    { title: "Desarrollo", desc: "Código escalable y rápido." },
    { title: "Despliegue", desc: "Hosting global y monitoreo." },
  ];
  return (
    <div className="mt-20 w-full">
      <div className="hidden md:grid grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.08 }} className="relative">
            <div className="h-2 rounded bg-muted overflow-hidden">
              <motion.div className="h-2 bg-primary" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.15 }} />
            </div>
            <div className="mt-3">
              <div className="text-sm font-semibold">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="md:hidden space-y-4">
        {steps.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.08 }} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
            <div>
              <div className="text-sm font-semibold">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AboutServiceAnimations() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = (currentTarget as HTMLDivElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // normalized -1..1
    const nx = clamp((clientX - cx) / (rect.width / 2), -1, 1);
    const ny = clamp((clientY - cy) / (rect.height / 2), -1, 1);
    mouseX.set(nx);
    mouseY.set(ny);
    // update CSS vars for shine
    (currentTarget as HTMLDivElement).style.setProperty("--x", `${((nx + 1) / 2) * 100}%`);
    (currentTarget as HTMLDivElement).style.setProperty("--y", `${((ny + 1) / 2) * 100}%`);
  }, [mouseX, mouseY]);

  const containerVariants = useMemo(() => ({ hidden: {}, visible: { transition: { staggerChildren: 0.45 } } }), []);
  const itemVariants = useMemo(() => ({ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }), []);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[120vh] flex flex-col justify-center items-center gap-16 md:gap-24"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      onMouseMove={onMouseMove}
    >
      <ParallaxBackground mouseX={mouseX} mouseY={mouseY} reduce={reduce} />

      {/* Responsive grid scenes */}
      <div className="grid w-full max-w-6xl gap-8 sm:gap-10 md:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <motion.div variants={itemVariants}><ChatScene /></motion.div>
        <motion.div variants={itemVariants}><CodeScene /></motion.div>
        <motion.div className="xl:block md:col-span-2 xl:col-span-1" variants={itemVariants}><HostingScene /></motion.div>
      </div>

      <ProcessTimeline />
    </motion.div>
  );
}
