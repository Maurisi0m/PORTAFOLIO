import {
  BadgeCheck,
  Globe2,
  Layers,
  Palette,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { AboutServiceAnimations } from "@/components/ui/AboutServiceAnimations";
import { useRef } from "react";

export default function AboutService() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      className="py-12 md:py-16 relative"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Immersive fade in overlay */}
      <motion.div
        className="fixed inset-0 z-10 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, transparent 70%)",
        }}
      />
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
        ref={sectionRef}
        className="mt-10 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"
        style={{ y }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {[
          {
            icon: <Palette className="h-5 w-5 text-primary" />,
            title: "Diseño a tu medida",
            desc: "Identidad visual coherente, tipografía moderna y paleta de colores optimizada para accesibilidad.",
          },
          {
            icon: <Rocket className="h-5 w-5 text-primary" />,
            title: "Alto rendimiento",
            desc: "Buenas prácticas de performance, imágenes optimizadas y carga progresiva para que tu sitio vuele.",
          },
          {
            icon: <ShieldCheck className="h-5 w-5 text-primary" />,
            title: "Seguridad y confianza",
            desc: "Implementación de medidas de seguridad esenciales y cumplimiento de estándares web.",
          },
          {
            icon: <BadgeCheck className="h-5 w-5 text-primary" />,
            title: "SEO y analítica",
            desc: "Optimización para buscadores y métricas para entender y mejorar tus resultados.",
          },
        ].map(({ icon, title, desc }, index) => {
          const cardRef = useRef<HTMLDivElement>(null);
          const mouseX = useMotionValue(0);
          const mouseY = useMotionValue(0);
          const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
          const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
          const scale = useSpring(1, { stiffness: 300, damping: 30 });

          const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set((e.clientX - centerX) / rect.width);
            mouseY.set((e.clientY - centerY) / rect.height);
          };

          const handleMouseEnter = () => scale.set(1.05);
          const handleMouseLeave = () => {
            scale.set(1);
            mouseX.set(0);
            mouseY.set(0);
          };

          return (
            <motion.div
              ref={cardRef}
              key={title}
              className={`relative rounded-2xl border p-8 overflow-hidden ${index === 3 ? 'bg-gradient-to-r from-primary/20 via-violet-500/20 to-fuchsia-500/20 animate-gradient' : 'bg-background/50'}`}
              style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              {/* Floating leaf-like elements */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-6 h-6 bg-violet-500/10 rounded-full"
                animate={{
                  x: [0, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Pulsing border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/20"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                className={`relative z-10 ${index === 3 ? 'text-white' : ''}`}
              >
                <motion.div
                  className="inline-block"
                >
                  {icon}
                </motion.div>
                <h3 className={`font-semibold flex items-center gap-3 text-lg ${index === 3 ? 'text-white' : ''}`}>
                  {title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${index === 3 ? 'text-white/90' : 'text-muted-foreground'}`}>{desc}</p>
              </motion.div>
            </motion.div>
          );
        })}
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
