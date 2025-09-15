import { motion, useAnimation, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, useScroll } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function ParallaxBackground({ mouseX, mouseY, reduce }: { mouseX: any; mouseY: any; reduce: boolean }) {
  const x1 = useTransform(mouseX, [ -1, 1 ], [ -40, 40 ]);
  const y1 = useTransform(mouseY, [ -1, 1 ], [ -40, 40 ]);
  const x2 = useTransform(mouseX, [ -1, 1 ], [ 24, -24 ]);
  const y2 = useTransform(mouseY, [ -1, 1 ], [ 24, -24 ]);
  const x3 = useTransform(mouseX, [ -1, 1 ], [ -14, 14 ]);
  const y3 = useTransform(mouseY, [ -1, 1 ], [ 14, -14 ]);

  const float = reduce ? {} : { y: [0, -10, 0], transition: { duration: 7, repeat: Infinity, ease: "easeInOut" } };

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-40 h-[50rem] w-[50rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.violet.500/.28),transparent)]"
        style={{ x: x1, y: y1 }}
        animate={float as any}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[48rem] w-[48rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.fuchsia.500/.22),transparent)]"
        style={{ x: x2, y: y2 }}
        animate={float as any}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.blue.500/.16),transparent)]"
        style={{ x: x3, y: y3 }}
        animate={float as any}
      />
      <div className="pointer-events-none absolute inset-0">
        {[...Array(120)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 4;
          const size = Math.random() * 2 + 0.5;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-foreground/10 dark:bg-white/20"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
              animate={reduce ? undefined : { opacity: [0.15, 0.9, 0.15] }}
              transition={reduce ? undefined : { duration: 2 + Math.random() * 2.5, repeat: Infinity, delay }}
            />
          );
        })}
      </div>
    </div>
  );
}

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

  const onEnter = () => scale.set(1.05);
  const onLeave = () => { scale.set(1); mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={ref}
      className={"relative rounded-3xl border bg-card/80 backdrop-blur-xl p-6 md:p-8 overflow-hidden " + className}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={{ boxShadow: "0 30px 80px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        initial={false}
        whileHover={{ opacity: 1 }}
        style={{
          background: "radial-gradient(700px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.18), transparent 40%)",
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
      <div aria-hidden className="absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-t from-black/10 to-transparent dark:from-white/5" />
    </motion.div>
  );
}

function ChatScene() {
  return (
    <TiltCard>
      <div className="h-72 md:h-80 lg:h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl relative overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/30 rounded-full"
            animate={{ x: [0, Math.random() * 320 - 160], y: [0, Math.random() * 160 - 80], opacity: [0, 1, 0] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            style={{ left: `${6 + i * 5}%`, top: `${16 + i * 3}%` }}
          />
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], x: [-80, 0, 0, -80] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
          className="absolute top-10 left-6 bg-white/95 backdrop-blur px-6 py-4 rounded-xl shadow-lg max-w-xl"
        >
          <p className="text-lg text-gray-800">Hola, ¿cómo podemos ayudarte hoy?</p>
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], x: [80, 0, 0, 80] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1.6, times: [0, 0.2, 0.8, 1] }}
          className="absolute top-32 right-6 bg-blue-500/95 text-white px-6 py-4 rounded-xl shadow-lg max-w-xl"
        >
          <p className="text-lg">Queremos diseñar tu sitio web.</p>
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], x: [-80, 0, 0, -80] }}
          transition={{ duration: 6, repeat: Infinity, delay: 3.2, times: [0, 0.2, 0.8, 1] }}
          className="absolute bottom-8 left-6 bg-white/95 backdrop-blur px-6 py-4 rounded-xl shadow-lg max-w-xl"
        >
          <p className="text-lg text-gray-800">¡Perfecto! Cuéntanos más sobre tu idea.</p>
        </motion.div>
      </div>
      <p className="mt-6 text-center font-bold text-gray-900 dark:text-gray-100 text-xl">Hablamos de tu proyecto</p>
    </TiltCard>
  );
}

function CodeScene() {
  return (
    <TiltCard>
      <div className="relative">
        <div className="w-full h-12 bg-gray-900 rounded-t-2xl flex items-center gap-2 px-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-3 text-xs text-white/60">Proyecto: sitio-marca</span>
        </div>
        <div className="bg-black rounded-b-2xl p-0 h-72 md:h-80 lg:h-96 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-10 bg-gray-900/70 text-gray-500 text-xs font-mono grid content-start pt-4 px-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="leading-6">{i + 1}</span>
            ))}
          </div>
          <div className="pl-12 pr-4 pt-4">
            <motion.pre className="text-green-400 font-mono text-sm md:text-base leading-7">
              <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>const design = await createWebsite();</motion.div>
              <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.4 }}>function optimizePerformance() {"{"}</motion.div>
              <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.9 }}>&nbsp;&nbsp;return responsive && fast;</motion.div>
              <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 1.3 }}>{"}"}</motion.div>
            </motion.pre>
          </div>
          <motion.div className="absolute bottom-4 left-12 right-6 h-3 rounded bg-emerald-600/30">
            <motion.div className="h-3 rounded bg-emerald-500" animate={{ width: ["8%", "94%", "62%", "100%"] }} transition={{ duration: 6, repeat: Infinity }} />
          </motion.div>
          <motion.div className="absolute top-4 right-4 text-emerald-400 text-xs" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>Lighthouse 95+</motion.div>
          <motion.div className="absolute inset-0" style={{ background: "radial-gradient(1000px circle at 80% 20%, rgba(255,255,255,0.05), transparent 40%)" }} />
        </div>
      </div>
      <p className="mt-6 text-center font-bold text-gray-900 dark:text-gray-100 text-xl">Diseñamos y revisamos</p>
    </TiltCard>
  );
}

function Globe() {
  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-90" />
      <motion.div className="absolute inset-0 rounded-full border-2 border-white/30" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-4 rounded-full border border-white/20" animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-8 rounded-full border border-white/10" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
      <div className="absolute inset-0 rounded-full shadow-[inset_0_-20px_40px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function BeamsOverlay() {
  const paths = [
    "M 15 120 C 160 40, 240 40, 385 120",
    "M 25 150 C 180 80, 220 80, 375 150",
    "M 35 180 C 200 120, 200 120, 365 180",
  ];
  return (
    <svg className="absolute inset-0" viewBox="0 0 400 240" fill="none">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth={2.5}
          stroke="url(#g)"
          strokeLinecap="round"
          strokeDasharray="12 16"
          animate={{ strokeDashoffset: [0, -56] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HostingScene() {
  return (
    <TiltCard>
      <div className="w-full h-72 md:h-80 lg:h-[28rem] rounded-2xl relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20" />
        <div className="relative z-10 flex gap-10 md:gap-12 items-end">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotateY: [0, 12, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className="w-24 md:w-28 lg:w-32 h-40 md:h-48 lg:h-56 bg-gray-300 dark:bg-gray-700 rounded-xl shadow-inner relative transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[0,1,2,3,4].map((r) => (
                <motion.div key={r} className="absolute left-4 right-4 h-4 bg-gray-400/80 dark:bg-gray-600/80 rounded" style={{ top: 14 + r * 24 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 + r * 0.2 }} />
              ))}
              <motion.div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded bg-white/40 dark:bg-black/30">EDGE</motion.div>
              <motion.div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-gray-700 dark:text-gray-200" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>WWW</motion.div>
            </motion.div>
          ))}
          <div className="hidden md:block"><Globe /></div>
        </div>
        <BeamsOverlay />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-6 right-6 w-12 h-12 bg-primary rounded-full grid place-items-center text-white text-2xl shadow-lg"
        >
          ✓
        </motion.div>
      </div>
      <p className="mt-6 text-center font-bold text-gray-900 dark:text-gray-100 text-xl">Hosting y despliegue</p>
    </TiltCard>
  );
}

function ProcessTimeline() {
  const steps = [
    { title: "Descubrimiento", desc: "Objetivos, audiencia, contenido." },
    { title: "Diseño", desc: "UI/UX fiel a tu marca." },
    { title: "Desarrollo", desc: "Código escalable y rápido." },
    { title: "Despliegue", desc: "Hosting global y monitoreo." },
  ];
  return (
    <div className="mt-24 w-full">
      <div className="hidden md:grid grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.28, delay: i * 0.08 }} className="relative">
            <div className="h-3 rounded bg-muted overflow-hidden">
              <motion.div className="h-3 bg-primary" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.15 }} />
            </div>
            <div className="mt-4">
              <div className="text-sm font-semibold">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="md:hidden space-y-5">
        {steps.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.08 }} className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cameraScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const cameraY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);

  useEffect(() => { if (inView) controls.start("visible"); }, [inView, controls]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = (currentTarget as HTMLDivElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = clamp((clientX - cx) / (rect.width / 2), -1, 1);
    const ny = clamp((clientY - cy) / (rect.height / 2), -1, 1);
    mouseX.set(nx);
    mouseY.set(ny);
    (currentTarget as HTMLDivElement).style.setProperty("--x", `${((nx + 1) / 2) * 100}%`);
    (currentTarget as HTMLDivElement).style.setProperty("--y", `${((ny + 1) / 2) * 100}%`);
  }, [mouseX, mouseY]);

  const containerVariants = useMemo(() => ({ hidden: {}, visible: { transition: { staggerChildren: 0.45 } } }), []);
  const itemVariants = useMemo(() => ({ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }), []);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[140vh] flex flex-col justify-center items-center gap-16 md:gap-24"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      onMouseMove={onMouseMove}
      style={{ scale: cameraScale, y: cameraY }}
    >
      <ParallaxBackground mouseX={mouseX} mouseY={mouseY} reduce={reduce} />

      <div className="grid w-full max-w-7xl gap-10 md:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <motion.div variants={itemVariants}><ChatScene /></motion.div>
        <motion.div variants={itemVariants}><CodeScene /></motion.div>
        <motion.div className="xl:block md:col-span-2 xl:col-span-1" variants={itemVariants}><HostingScene /></motion.div>
      </div>

      <ProcessTimeline />
    </motion.div>
  );
}
