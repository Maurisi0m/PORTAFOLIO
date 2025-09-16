import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useScroll,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function TypeLine({
  text,
  startDelay = 0,
  speed = 30,
  loop = true,
  className = "",
  start = true,
}: {
  text: string;
  startDelay?: number;
  speed?: number;
  loop?: boolean;
  className?: string;
  start?: boolean;
}) {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);
  useEffect(() => {
    if (!started) return;
    if (i <= text.length) {
      const id = setTimeout(() => setI((v) => v + 1), speed);
      return () => clearTimeout(id);
    }
    if (loop) {
      const id = setTimeout(() => setI(0), 1200);
      return () => clearTimeout(id);
    }
  }, [i, started, text, speed, loop]);
  return (
    <div className={className}>
      <span>{text.slice(0, Math.min(i, text.length))}</span>
      <motion.span
        className="inline-block w-0.5 h-4 align-[-2px] bg-current ml-0.5"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
}

function PhoneChatScene() {
  return (
    <div className="w-full grid place-items-center relative">
      <motion.section
        initial={{ opacity: 0, rotate: 90, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="relative w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] aspect-[9/19]">
          <div className="absolute inset-0 rounded-[3rem] bg-neutral-900 shadow-2xl" />
          <div className="absolute inset-[8px] rounded-[2.6rem] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black/80 rounded-b-2xl" />
            <div className="absolute top-2 left-4 right-4 flex items-center justify-between text-[10px] text-black/60 dark:text-white/70">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-2 bg-black/40 dark:bg-white/30 rounded-sm" />
                <span className="w-3 h-2 bg-black/40 dark:bg-white/30 rounded-sm" />
                <span className="w-3 h-2 bg-black/40 dark:bg-white/30 rounded-sm" />
              </span>
            </div>
            <div className="absolute inset-0 pt-8 px-3">
              <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white text-gray-900 px-3 py-2 shadow"
                  >
                    Hola, ¿cómo podemos ayudarte hoy?
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                    className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-blue-500 text-white px-3 py-2 shadow"
                  >
                    Quiero un sitio web estilo freelancer.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.6 }}
                    className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-blue-500 text-white px-3 py-2 shadow"
                  >
                    Y un landing page con formulario de contacto.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 2.5 }}
                    className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white text-gray-900 px-3 py-2 shadow"
                  >
                    ¡Perfecto! Cuéntanos más sobre tu idea.
                  </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-black/40 rounded-full blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.section>
      <motion.div className="absolute right- top-1/2 -translate-y-">
        <TypeLine
          text="Planeamos tu proyecto"
          speed={100}
          loop={false}
          className="text-6xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}

type CodeToken = { t: string; c?: string };
function TokenTypeLine({
  tokens,
  startDelay = 0,
  speed = 24,
  loop = false,
}: {
  tokens: CodeToken[];
  startDelay?: number;
  speed?: number;
  loop?: boolean;
}) {
  const totalLen = useMemo(
    () => tokens.reduce((acc, tk) => acc + tk.t.length, 0),
    [tokens],
  );
  const [started, setStarted] = useState(false);
  const [pos, setPos] = useState(0);
  const offsets = useMemo(() => {
    const out: number[] = [];
    let acc = 0;
    for (const tk of tokens) {
      out.push(acc);
      acc += tk.t.length;
    }
    return out;
  }, [tokens]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (pos <= totalLen) {
      const id = setTimeout(() => setPos((v) => v + 1), speed);
      return () => clearTimeout(id);
    }
    if (loop) {
      const id = setTimeout(() => setPos(0), 800);
      return () => clearTimeout(id);
    }
  }, [pos, started, totalLen, speed, loop]);

  return (
    <pre className="font-mono text-[13px] md:text-sm leading-7 whitespace-pre-wrap">
      {tokens.map((tk, i) => {
        const start = offsets[i];
        const end = start + tk.t.length;
        const show = clamp(pos - start, 0, tk.t.length);
        const content = tk.t.slice(0, show);
        return (
          <span key={i} className={tk.c}>
            {content}
          </span>
        );
      })}
      {pos <= totalLen && (
        <motion.span
          className="inline-block w-0.5 h-4 align-[-2px] bg-white/80 ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}
    </pre>
  );
}

function MonitorCodeScene() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="w-full grid place-items-center"
    >
      <div className="w-full max-w-5xl">
        {/* Monitor body */}
        <div className="relative rounded-[1.5rem] bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 shadow-[0_50px_140px_-30px_rgba(0,0,0,0.6)]">
          {/* Top bar with camera and power led */}
          <div className="h-12 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
          </div>

          {/* Screen taller */}
          <div className="relative mx-4 mb-4 rounded-xl overflow-hidden bg-black ring-1 ring-neutral-800 h-[28rem] md:h-[32rem] lg:h-[36rem]">
            {/* Tabs */}
            <div className="h-9 flex items-center gap-2 px-3 bg-neutral-900/80 border-b border-neutral-800">
              <div className="px-2.5 py-1 text-xs rounded bg-neutral-800 text-neutral-200">
                App.tsx
              </div>
              <div className="px-2.5 py-1 text-xs rounded text-neutral-400">
                styles.css
              </div>
              <div className="px-2.5 py-1 text-xs rounded text-neutral-400">
                README.md
              </div>
              <div className="ml-auto text-[10px] text-neutral-500">
                UTF-8 • LF • React • TypeScript
              </div>
            </div>

            {/* Code area */}
            <div className="relative p-4 md:p-6 h-[calc(100%-2.25rem)] overflow-hidden">
              {/* Scanlines */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
                }}
              />
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(255,255,255,0.05),transparent_40%)]" />

              {/* Line numbers */}
              <div className="absolute left-0 top-9 bottom-0 w-8 bg-neutral-950/70 text-neutral-600 text-[11px] font-mono grid content-start pt-6 px-2">
                {Array.from({ length: 26 }).map((_, i) => (
                  <span key={i} className="leading-7">
                    {i + 1}
                  </span>
                ))}
              </div>

              {/* Code lines with true typing across tokens */}
              <div className="pl-8 mt-2">
                <TokenTypeLine
                  startDelay={200}
                  speed={18}
                  tokens={[
                    { t: "import ", c: "text-sky-400" },
                    { t: "React", c: "text-emerald-300" },
                    { t: ", { ", c: "text-neutral-300" },
                    { t: "useState", c: "text-purple-400" },
                    { t: ", ", c: "text-neutral-300" },
                    { t: "useEffect", c: "text-purple-400" },
                    { t: " } from ", c: "text-neutral-300" },
                    { t: '"react"', c: "text-amber-300" },
                    { t: ";", c: "text-neutral-500" },
                  ]}
                />
                <TokenTypeLine
                  startDelay={900}
                  speed={18}
                  tokens={[
                    { t: "const ", c: "text-sky-400" },
                    { t: "App", c: "text-emerald-300" },
                    { t: " = () => ", c: "text-neutral-300" },
                    { t: "{", c: "text-neutral-500" },
                  ]}
                />
                <TokenTypeLine
                  startDelay={1300}
                  speed={18}
                  tokens={[
                    { t: "  const ", c: "text-sky-400" },
                    { t: "[ready, setReady]", c: "text-emerald-300" },
                    { t: " = ", c: "text-neutral-300" },
                    { t: "useState", c: "text-purple-400" },
                    { t: "(", c: "text-neutral-500" },
                    { t: "false", c: "text-amber-300" },
                    { t: ")", c: "text-neutral-500" },
                    { t: ";", c: "text-neutral-500" },
                  ]}
                />
                <TokenTypeLine
                  startDelay={1750}
                  speed={18}
                  tokens={[
                    { t: "  useEffect", c: "text-purple-400" },
                    { t: "(() => ", c: "text-neutral-300" },
                    { t: "{", c: "text-neutral-500" },
                    { t: " const ", c: "text-sky-400" },
                    { t: "t", c: "text-emerald-300" },
                    {
                      t: " = setTimeout(() => setReady(true), ",
                      c: "text-neutral-300",
                    },
                    { t: "600", c: "text-amber-300" },
                    {
                      t: "); return () => clearTimeout(t); }",
                      c: "text-neutral-300",
                    },
                    { t: ", []);", c: "text-neutral-500" },
                  ]}
                />
                <TokenTypeLine
                  startDelay={2450}
                  speed={18}
                  tokens={[
                    { t: "  return ", c: "text-sky-400" },
                    { t: "(", c: "text-neutral-500" },
                    { t: "<", c: "text-blue-400" },
                    { t: "div", c: "text-blue-400" },
                    { t: " ", c: "" },
                    { t: "className", c: "text-fuchsia-400" },
                    { t: "=", c: "text-neutral-300" },
                    { t: '"hero"', c: "text-amber-300" },
                    { t: ">Hola ", c: "text-neutral-100" },
                    { t: "👋", c: "" },
                    { t: "</", c: "text-blue-400" },
                    { t: "div", c: "text-blue-400" },
                    { t: ">)", c: "text-neutral-500" },
                  ]}
                />
                <TokenTypeLine
                  startDelay={3150}
                  speed={18}
                  tokens={[{ t: "}", c: "text-neutral-500" }]}
                />
                <TokenTypeLine
                  startDelay={3400}
                  speed={18}
                  tokens={[
                    { t: "export default ", c: "text-sky-400" },
                    { t: "App", c: "text-emerald-300" },
                    { t: ";", c: "text-neutral-500" },
                  ]}
                />
              </div>

              {/* Minimap */}
              <div className="absolute right-2 top-12 bottom-2 w-1.5 rounded bg-gradient-to-b from-emerald-500/40 via-emerald-400/30 to-emerald-500/20" />
            </div>
          </div>
        </div>
        {/* Stand */}
        <div className="w-28 h-6 bg-neutral-800 mx-auto rounded-b-md mt-2" />
        <div className="w-16 h-4 bg-neutral-900 mx-auto rounded-b-md" />
      </div>
      <motion.div className="w-full flex justify-center mt-6">
        <TypeLine
          text="Diseñamos y revisamos"
          speed={100}
          loop={false}
          className="text-6xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap drop-shadow-2xl text-center"
        />
      </motion.div>
    </motion.section>
  );
}

function Globe() {
  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-90" />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border border-white/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
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
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <defs>
        <linearGradient
          id="g"
          x1="0"
          y1="0"
          x2="400"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop
            offset="50%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.9"
          />
          <stop
            offset="100%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.2"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HostingScene({ hostingRef, hostingInView }: { hostingRef: React.RefObject<HTMLDivElement>, hostingInView: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55 }}
      className="w-full grid place-items-center"
    >
      <div className="w-full max-w-5xl h-80 md:h-[22rem] lg:h-[30rem] relative flex items-center justify-center overflow-visible">
        <div className="relative z-10 flex gap-10 md:gap-12 items-end">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotateY: [0, 12, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className="w-24 md:w-28 lg:w-36 h-44 md:h-56 lg:h-64 bg-gray-300 dark:bg-gray-700 rounded-xl shadow-inner relative transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[0, 1, 2, 3, 4].map((r) => (
                <motion.div
                  key={r}
                  className="absolute left-4 right-4 h-4 bg-gray-400/80 dark:bg-gray-600/80 rounded"
                  style={{ top: 14 + r * 26 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2 + r * 0.2,
                  }}
                />
              ))}
              <motion.div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded bg-white/40 dark:bg-black/30">
                EDGE
              </motion.div>
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-gray-700 dark:text-gray-200"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                WWW
              </motion.div>
            </motion.div>
          ))}
          <div className="hidden md:block">
            <Globe />
          </div>
        </div>
        <BeamsOverlay />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-6 right-8 w-44 h-28 bg-gray-300/80 dark:bg-gray-600/70 rounded-full"
        >
          <div className="absolute top:6 left-6 w-32 h-16 bg-gray-200/80 dark:bg-gray-700/80 rounded-full" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-primary rounded-full grid place-items-center text-white text-sm shadow">
            ✓
          </div>
        </motion.div>
      </div>
      <div ref={hostingRef} className="mt-6 w-full flex justify-center">
        <TypeLine
          text="Hosting y despliegue"
          speed={100}
          loop={false}
          start={hostingInView}
          className="text-6xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap drop-shadow-2xl text-center"
        />
      </div>
    </motion.section>
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
    <div className="mt-16 w-full max-w-3xl">
      <div className="space-y-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.08 }}
            className="flex items-start gap-3"
          >
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cameraScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 1.02],
  );
  const cameraY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -10]);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { currentTarget, clientX, clientY } = e;
      const rect = (currentTarget as HTMLDivElement).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = clamp((clientX - cx) / (rect.width / 2), -1, 1);
      const ny = clamp((clientY - cy) / (rect.height / 2), -1, 1);
      mouseX.set(nx);
      mouseY.set(ny);
    },
    [mouseX, mouseY],
  );

  const containerVariants = useMemo(
    () => ({ hidden: {}, visible: { transition: { staggerChildren: 0.5 } } }),
    [],
  );
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }),
    [],
  );

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col justify-center items-center gap-14"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      onMouseMove={onMouseMove}
      style={{ scale: cameraScale, y: cameraY }}
    >
      <div className="w-full max-w-5xl grid gap-16">
        <motion.div variants={itemVariants}>
          <PhoneChatScene />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MonitorCodeScene />
        </motion.div>
        <motion.div variants={itemVariants}>
          <HostingScene />
        </motion.div>
      </div>

      <ProcessTimeline />
    </motion.div>
  );
}
