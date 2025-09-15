import { ExternalLink, Globe, Layout, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const demos = [
  {
    title: "Cafetería Moderna",
    desc: "Sitio web para cafetería con menú interactivo, galería de productos y sistema de pedidos en línea. Diseño moderno con énfasis en la experiencia del usuario.",
    url: "https://cafeteriaejemplo.netlify.app",
    icon: <Layout className="h-5 w-5" />,
    image: "/cafe.png",
  },
  {
    title: "Hotel Boutique",
    desc: "Página web de hotel con reservas en línea, galería de habitaciones, servicios y ubicación. Interfaz elegante con navegación intuitiva.",
    url: "https://hotelejemplo.netlify.app",
    icon: <Globe className="h-5 w-5" />,
    image: "/hotel.png",
  },
  {
    title: "Blog de Artículos",
    desc: "Plataforma de blogging con artículos categorizados, sistema de búsqueda y diseño responsive. Perfecto para compartir contenido de calidad.",
    url: "https://articuloweb.netlify.app",
    icon: <Smartphone className="h-5 w-5" />,
    image: "/articulo.png",
  },
];

export default function Demos() {
  return (
    <motion.div
      className="py-12 md:py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <header className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Demos</h1>
        <p className="mt-2 text-muted-foreground">
          Explora ejemplos de estilos y enfoques que puedo adaptar a tu marca.
        </p>
      </header>

      <motion.div
        className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {demos.map((d) => (
          <a
            key={d.title}
            href={d.url}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl border bg-background/50 p-6 hover:shadow-lg"
          >
            <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/10),transparent)] blur-2xl" />
            {d.image && (
              <img
                src={d.image}
                alt={d.title}
                className="mb-4 w-full rounded-lg object-cover"
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
              Abrir demo <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
