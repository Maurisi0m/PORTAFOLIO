import {
  BadgeCheck,
  Globe2,
  Layers,
  Palette,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { AboutServiceAnimations } from "@/components/ui/AboutServiceAnimations";

export default function AboutService() {
  return (
    <motion.div
      className="py-12 md:py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <header className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Sobre el servicio</h1>
        <p className="mt-2 text-muted-foreground">
          Creo sitios web a medida con foco en velocidad, diseño y conversión.
          Cada proyecto se adapta a tu marca y objetivos.
        </p>
      </header>

      {/* Progressive Animations */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <AboutServiceAnimations />
      </motion.section>

      <motion.section
        className="mt-10 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {[
          {
            icon: <Palette className="h-4 w-4 text-primary" />,
            title: "Diseño a tu medida",
            desc: "Identidad visual coherente, tipografía moderna y paleta de colores optimizada para accesibilidad.",
          },
          {
            icon: <Rocket className="h-4 w-4 text-primary" />,
            title: "Alto rendimiento",
            desc: "Buenas prácticas de performance, imágenes optimizadas y carga progresiva para que tu sitio vuele.",
          },
          {
            icon: <ShieldCheck className="h-4 w-4 text-primary" />,
            title: "Seguridad y confianza",
            desc: "Implementación de medidas de seguridad esenciales y cumplimiento de estándares web.",
          },
          {
            icon: <BadgeCheck className="h-4 w-4 text-primary" />,
            title: "SEO y analítica",
            desc: "Optimización para buscadores y métricas para entender y mejorar tus resultados.",
          },
        ].map(({ icon, title, desc }, index) => (
          <motion.div
            key={title}
            className={`rounded-2xl border p-6 ${index === 3 ? 'bg-gradient-to-r from-primary/20 via-violet-500/20 to-fuchsia-500/20 animate-gradient' : 'bg-background/50'}`}
            initial={{ rotateX: 0, rotateY: 0 }}
            whileHover={{ rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <h3 className={`font-semibold flex items-center gap-2 ${index === 3 ? 'text-white' : ''}`}>
              {icon} {title}
            </h3>
            <p className={`mt-2 text-sm ${index === 3 ? 'text-white' : 'text-muted-foreground'}`}>{desc}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="mt-12 rounded-2xl border p-6 md:p-8 bg-gradient-to-br from-primary/10 to-violet-500/10 relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="grid gap-6 md:grid-cols-2 items-center relative z-10">
          <div>
            <h3 className="text-xl font-semibold">Tecnología confiable</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Trabajo con tecnologías modernas que garantizan estabilidad y
              escalabilidad.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" /> React + Tailwind
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-primary" /> Hosting en
                Netlify/Vercel o de tu preferencia
              </li>
            </ul>
          </div>
          <motion.div className="h-40 sm:h-56 rounded-xl" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:400%_400%]"
          style={{ filter: "blur(60px)" }}
        />
      </motion.section>
    </motion.div>
  );
}
