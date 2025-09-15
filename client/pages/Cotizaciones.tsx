import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Cotizaciones() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    console.log("Nueva solicitud de cotización:", payload);
    const nombre = String(payload.nombre || "");
    const email = String(payload.email || "");
    const tipo = String(payload.tipo || "");
    const presupuesto = String(payload.presupuesto || "");
    const descripcion = String(payload.descripcion || "");
    const phone = "527711596460";
    const text = `Solicitud de cotización%0A%0ANombre: ${encodeURIComponent(nombre)}%0AEmail: ${encodeURIComponent(email)}%0ATipo de sitio: ${encodeURIComponent(tipo)}%0APresupuesto (MXN): ${encodeURIComponent(presupuesto)}%0ADescripción: ${encodeURIComponent(descripcion)}`;
    const url = `https://wa.me/${phone}?text=${text}`;
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (_) {
      window.location.href = url;
    }
    setSubmitted(true);
  }

  return (
    <motion.div
      className="py-12 md:py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <header className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Cotizaciones</h1>
        <p className="mt-2 text-muted-foreground">
          Completa el formulario y recibirás una propuesta personalizada para tu
          proyecto.
        </p>
      </header>

      <motion.div
        className="mt-8 grid gap-8 md:grid-cols-2"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border p-6 bg-background/50 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <input
                name="nombre"
                autoComplete="name"
                required
                className="mt-1 w-full rounded-md border bg-background px-3 py-3 sm:py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 w-full rounded-md border bg-background px-3 py-3 sm:py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Tipo de sitio</label>
              <select
                name="tipo"
                className="mt-1 w-full rounded-md border bg-background px-3 py-3 sm:py-2 outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Landing page</option>
                <option>Sitio informativo</option>
                <option>Tienda online</option>
                <option>Aplicación web</option>
                <option>No sé</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">
                Presupuesto estimado (MXN)
              </label>
              <select
                name="presupuesto"
                className="mt-1 w-full rounded-md border bg-background px-3 py-3 sm:py-2 outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Menos de $2,000 MXN</option>
                <option>$5,000 - $15,000 MXN</option>
                <option>$15,000 - $30,000 MXN</option>
                <option>Más de $30,000 MXN</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Descripción del proyecto
            </label>
            <textarea
              name="descripcion"
              rows={5}
              className="mt-1 w-full rounded-md border bg-background px-3 py-3 sm:py-2 outline-none focus:ring-2 focus:ring-primary"
              placeholder="Cuéntame sobre tu proyecto, objetivos y referencias"
            />
          </div>
          <Button type="submit" className="w-full">
            Enviar solicitud
          </Button>
          {submitted && (
            <p className="text-sm text-green-600">
              ¡Gracias! Te responderé pronto al correo indicado.
            </p>
          )}
        </form>
        <aside className="rounded-2xl border p-6 bg-gradient-to-br from-primary/10 to-violet-500/10">
          <h3 className="font-semibold">Qué incluye</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Diseño moderno y responsive</li>
            <li>Optimización SEO básica</li>
            <li>Adaptado a tus necesidades</li>
            <li>Guía de mantenimiento</li>
            <li>Soporte post-lanzamiento</li>
            <li>Integración con redes sociales</li>
            <li>Guía de manipulación de contenido para la administración del sitio</li>
          </ul>
          <div className="mt-6">
            <h4 className="font-semibold">Plazos</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Esto va dependiendo del alcance y lo que el cliente necesite, la entrega estimada es de 1 a 4 semanas.
            </p>
          </div>
        </aside>
      </motion.div>
    </motion.div>
  );
}
