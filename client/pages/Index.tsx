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
  Users,
  Star,
  TrendingUp,
  ExternalLink,
  Layout,
  Globe,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Decorative3D from "@/components/ui/Decorative3D";
import { Typewriter } from "@/components/ui/typewriter";

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
        className="relative left-1/2 -translate-x-1/2 w-screen pt-24 md:pt-32"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,transparent_60%)]" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(closest-side,theme(colors.violet.500/30),transparent)] blur-3xl" />
        </div>
        <div
          ref={heroRef}
          className="relative isolate mx-auto px-6 md:px-10 max-w-7xl text-center md:text-left md:grid md:grid-cols-12 md:gap-10 md:items-center"
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
          <div className="md:col-span-7 mx-auto md:mx-0 max-w-[900px]">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm md:text-base text-muted-foreground bg-background/60 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Experiencias web inmersivas
            </span>
            <h1 className="mt-6 text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight leading-[1.02] text-balance">
              <Typewriter text="Un sitio web hace tus ideas realidad" speed={40} />
            </h1>
            <p className="mt-6 text-lg sm:text-2xl md:text-3xl text-muted-foreground">
              Todo lo que necesitas para impulsar tu negocio: diseño, desarrollo, rendimiento y SEO, en una experiencia moderna y profesional.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/30">
                <Link to="/cotizaciones">
                  Cotiza tu proyecto <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link to="/contacto">Hablar ahora</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block md:col-span-5 relative min-h-[320px]">
            <Decorative3D />
            <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/25),transparent)] blur-3xl" />
          </div>
        </div>
      </motion.section>

      {/* FEATURES AS LARGE SECTIONS */}
      {[
        {
          id: "tecnologia",
          kicker: "Tecnología moderna",
          title: "Desarrollo con stack actual",
          desc:
            "Construido con React, Tailwind y buenas prácticas para escalar de forma segura y flexible.",
          image: "/placeholder.svg",
          icon: <Code2 className="h-5 w-5" />,
        },
        {
          id: "rapidez",
          kicker: "Rendimiento y accesibilidad",
          title: "Velocidad que impulsa tu negocio",
          desc:
            "Cargas veloces, Core Web Vitals optimizados y SEO técnico para que te encuentren y conviertan.",
          image: "/placeholder.svg",
          icon: <Bolt className="h-5 w-5" />,
        },
        {
          id: "resultados",
          kicker: "Enfocado en resultados",
          title: "Diseño que convierte",
          desc:
            "UX/UI orientada a objetivos con mensajes claros, jerarquía visual y llamados a la acción efectivos.",
          image: "/placeholder.svg",
          icon: <Award className="h-5 w-5" />,
        },
      ].map((s, i) => (
        <motion.section
          key={s.id}
          id={s.id}
          className="scroll-mt-24 mt-24 md:mt-32 relative left-1/2 -translate-x-1/2 w-screen"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-none bg-gradient-to-b from-background/20 to-background/0 p-12 md:p-20">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/15),transparent)] blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
              <div className={i % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:order-2"}>
                <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm md:text-base text-muted-foreground bg-background/60 backdrop-blur">
                  <span className="text-primary">{s.icon}</span> {s.kicker}
                </div>
                <h3 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-6 text-lg sm:text-2xl md:text-3xl text-muted-foreground max-w-4xl">
                  {s.desc}
                </p>
              </div>
              <div className={i % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:order-1"}>
                <div className="relative w-full overflow-hidden rounded-3xl bg-background shadow-2xl min-h-[380px] md:min-h-[520px]">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* HECHO A TU MEDIDA */}
      <motion.section
        id="personalizado"
        className="scroll-mt-24 mt-24 md:mt-32 px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Hecho a tu medida</h2>
          <p className="mt-2 text-muted-foreground">
            Cada sitio web se diseña desde cero para reflejar tu marca única, adaptándose a tus necesidades específicas y objetivos de negocio.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Identidad visual personalizada",
              desc: "Colores, tipografías y elementos gráficos que representan tu marca de manera auténtica.",
              icon: <Sparkles className="h-6 w-6" />,
            },
            {
              title: "Funcionalidades específicas",
              desc: "Integraciones, formularios, e-commerce o cualquier feature que necesites para tu negocio.",
              icon: <Bolt className="h-6 w-6" />,
            },
            {
              title: "Optimización para conversión",
              desc: "Diseño UX/UI enfocado en guiar a tus visitantes hacia acciones concretas.",
              icon: <TrendingUp className="h-6 w-6" />,
            },
            {
              title: "Responsive y accesible",
              desc: "Experiencia perfecta en todos los dispositivos, con estándares de accesibilidad web.",
              icon: <MonitorSmartphone className="h-6 w-6" />,
            },
            {
              title: "SEO integrado",
              desc: "Estructura y código optimizado para que tu sitio aparezca en los primeros resultados de búsqueda.",
              icon: <Globe className="h-6 w-6" />,
            },
            {
              title: "Mantenimiento incluido",
              desc: "Actualizaciones, soporte técnico y mejoras continuas para mantener tu sitio al día.",
              icon: <Shield className="h-6 w-6" />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-background/30 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 backdrop-blur"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/10),transparent)] blur-2xl group-hover:bg-[radial-gradient(closest-side,theme(colors.primary/20),transparent)] transition-all" />
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-2xl md:text-3xl">{item.title}</h3>
              </div>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
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
          <h2 className="text-3xl md:text-4xl font-bold">Cómo trabajo</h2>
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

      {/* PORTAFOLIO PREVIEW */}
      <motion.section
        id="portafolio"
        className="hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Portafolio destacado</h2>
          <p className="mt-2 text-muted-foreground">
            Algunos ejemplos de proyectos realizados con diferentes estilos y enfoques.
          </p>
        </div>
        <div className="mt-12 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {[
            {
              title: "Cafetería Moderna",
              desc: "Sitio web para cafetería con menú interactivo, galería de productos y sistema de pedidos en línea.",
              url: "https://cafeteriaejemplo.netlify.app",
              icon: <Layout className="h-5 w-5" />,
              image: "/cafe.png",
            },
            {
              title: "Hotel Boutique",
              desc: "Página web de hotel con reservas en línea, galería de habitaciones, servicios y ubicación.",
              url: "https://hotelejemplo.netlify.app",
              icon: <Globe className="h-5 w-5" />,
              image: "/hotel.png",
            },
            {
              title: "Blog de Artículos",
              desc: "Plataforma de blogging con artículos categorizados, sistema de búsqueda y diseño responsive.",
              url: "https://articuloweb.netlify.app",
              icon: <Smartphone className="h-5 w-5" />,
              image: "/articulo.png",
            },
          ].map((d, i) => (
            <motion.a
              key={d.title}
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-background/30 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 backdrop-blur"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/10),transparent)] blur-2xl group-hover:bg-[radial-gradient(closest-side,theme(colors.primary/20),transparent)] transition-all" />
              {d.image && (
                <img
                  src={d.image}
                  alt={d.title}
                  className="mb-4 w-full rounded-lg object-cover transition-transform group-hover:scale-105"
                  style={{ maxHeight: "180px" }}
                />
              )}
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary/10 to-violet-500/10 text-primary">
                  {d.icon}
                </div>
                <h3 className="font-semibold">{d.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{d.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                Ver demo <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/demos">Ver todos los demos</Link>
          </Button>
        </div>
      </motion.section>

      {/* STATS */}
      <motion.section
        className="mt-16 sm:mt-20 px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] max-w-4xl mx-auto">
          {[
            { number: "50+", label: "Proyectos completados", icon: <Award className="h-6 w-6" /> },
            { number: "100%", label: "Satisfacción cliente", icon: <Star className="h-6 w-6" /> },
            { number: "24/7", label: "Soporte disponible", icon: <Shield className="h-6 w-6" /> },
            { number: "3+", label: "Años de experiencia", icon: <TrendingUp className="h-6 w-6" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl border bg-background/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA STRIP */}
      <motion.section
        id="cta"
        className="scroll-mt-24 mt-24 md:mt-32 relative left-1/2 -translate-x-1/2 w-screen"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden rounded-none p-10 md:p-16 bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10">
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
