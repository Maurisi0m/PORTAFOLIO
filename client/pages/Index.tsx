import {
  ArrowRight,
  Award,
  Bolt,
  CheckCircle2,
  Code2,
  MonitorSmartphone,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/ui/typewriter";
import Decorative3D from "@/components/ui/Decorative3D";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Index() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({ x: 0, y: 0, active: false });
  return (
    <div className="pb-20">
      {/* HERO */}
      <motion.section
        className="relative pt-16 md:pt-24"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,theme(colors.violet.500/30),transparent)] blur-3xl" />
        </div>
        <div
          ref={heroRef}
          className="relative isolate text-center max-w-4xl mx-auto px-4"
          onMouseMove={(e) => {
            const rect = heroRef.current?.getBoundingClientRect();
            if (!rect) return;
            setCursor({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              active: true,
            });
          }}
          onMouseLeave={() => setCursor((p) => ({ ...p, active: false }))}
        >
          <motion.div
            className="pointer-events-none absolute -z-10 h-40 w-40 sm:h-64 sm:w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              left: cursor.x,
              top: cursor.y,
              background:
                "radial-gradient(closest-side, hsl(var(--primary)/.35), transparent)",
            }}
            animate={{
              left: cursor.x,
              top: cursor.y,
              opacity: cursor.active ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs md:text-sm text-muted-foreground bg-background/60 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Experiencias web
            inmersivas/estéticas
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <Typewriter text="Diseña y desarrollamos tu sitio web que contará tu historia" />
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            Haz que tu marca se vea mas grande con un sitio web profesional, todo con un presupuesto accesible.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-primary/30"
            >
              <Link to="/cotizaciones">
                Cotiza tu proyecto <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link to="/demos">Ver demos</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4" /> Seguro
            </div>
            <div className="inline-flex items-center gap-2">
              <MonitorSmartphone className="h-4 w-4" /> Responsiva
            </div>
            <div className="inline-flex items-center gap-2">
              <Rocket className="h-4 w-4" /> Rendimiento
            </div>
          </div>
          {/* Section quick nav */}
          <div className="mt-8 mx-auto max-w-3xl overflow-x-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-max mx-auto">
              <a
                href="#servicio"
                className="whitespace-nowrap rounded-full border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition"
              >
                Servicio
              </a>
              <a
                href="#proceso"
                className="whitespace-nowrap rounded-full border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition"
              >
                Proceso
              </a>
              <a
                href="#cta"
                className="whitespace-nowrap rounded-full border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition"
              >
                Comenzar
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FEATURES / STORY */}
      <motion.section
        id="servicio"
        className="scroll-mt-24 mt-16 sm:mt-20 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {[
          {
            icon: <Code2 className="h-5 w-5" />,
            title: "Tecnología moderna",
            desc: "Stack actualizado: React, Tailwind y buenas prácticas para escalar.",
          },
          {
            icon: <Bolt className="h-5 w-5" />,
            title: "Rápido y accesible",
            desc: "Optimizado para velocidad, SEO y accesibilidad real.",
          },
          {
            icon: <Award className="h-5 w-5" />,
            title: "Enfocado en resultados",
            desc: "Sitios que convierten, con un diseño que refleja tu marca.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border bg-background/50 p-6 transition hover:shadow-lg"
          >
            <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/10),transparent)] blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary/10 to-violet-500/10 text-primary">
                {f.icon}
              </div>
              <h3 className="font-semibold">{f.title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </motion.section>

      {/* PROCESS */}
      <motion.section
        id="proceso"
        className="scroll-mt-24 mt-16 sm:mt-20 px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold">Cómo trabajo</h2>
          <p className="mt-2 text-muted-foreground">
            Un proceso claro y colaborativo para llevar tu idea a producción con
            calidad.
          </p>
        </div>
        <div className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {[
            {
              title: "Descubrimiento",
              desc: "Conversamos sobre tu objetivo, público y estilo.",
            },
            {
              title: "Diseño y demo",
              desc: "Prototipo interactivo y revisión contigo.",
            },
            {
              title: "Lanzamiento",
              desc: "Optimización y publicación en hosting de tu preferencia.",
            },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border p-6 bg-background/50">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <CheckCircle2 className="h-4 w-4" /> Paso {i + 1}
              </div>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA STRIP */}
      <motion.section
        id="cta"
        className="scroll-mt-24 mt-16 sm:mt-20 px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden rounded-2xl border p-6 md:p-10 bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,theme(colors.violet.500/25),transparent)] blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                ¿Listo para despegar tu presencia digital?
              </h3>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Cotiza ahora y recibe una propuesta a medida para tu proyecto.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button asChild className="w-full sm:w-auto">
                <Link to="/cotizaciones">
                  Solicitar cotización <Zap className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link to="/contacto">Hablar ahora</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
