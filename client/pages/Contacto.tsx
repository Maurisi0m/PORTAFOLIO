import { Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Contacto() {
  return (
    <motion.div
      className="py-12 md:py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <header className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-500 to-amber-400">
          Contacto
        </h1>
        <p className="mt-3 text-base md:text-lg text-muted-foreground">
          Hablemos de tu proyecto. Respuesta rápida y atenta.
        </p>
      </header>

      <motion.div
        className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] place-items-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <motion.a
          href="https://wa.me/527711596460?text=Hola%20Memo,%20me%20gustar%C3%ADa%20cotizar%20un%20sitio%20web"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group relative overflow-hidden rounded-3xl border border-transparent p-8 md:p-10 min-h-[220px] md:min-h-[260px] bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white shadow-lg hover:shadow-2xl transform-gpu will-change-transform transition-shadow duration-300"
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-xl bg-white shadow-md">
              <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
                <path
                  fill="#25D366"
                  d="M16 3C9.383 3 4 8.383 4 15c0 2.117.555 4.105 1.52 5.834L4 29l8.37-1.49A11.9 11.9 0 0 0 16 27c6.617 0 12-5.383 12-12S22.617 3 16 3z"
                />
                <path
                  fill="#fff"
                  d="M22.2 19.6c-.326.922-1.9 1.744-2.678 1.778-.714.031-1.63 0.044-2.634-.403-1.889-.83-3.09-2.754-3.186-2.879-.093-.125-.761-1.01-.761-1.93s.483-1.364.653-1.55c.17-.186.37-.232.494-.232s.247.001.355.006c.114.006.27-.043.423.322.158.377.535 1.302.584 1.395.046.093.076.199.014.324-.062.125-.093.199-.186.31-.093.112-.197.25-.28.336-.093.093-.19.195-.082.383.109.186.487.8 1.046 1.296.718.638 1.323.836 1.51.93.187.093.295.078.405-.046.109-.125.467-.543.592-.731.125-.186.249-.156.405-.093.155.062.983.464 1.151.548.17.078.28.125.326.187.047.062.047.944-.28 1.866z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-sm">
              WhatsApp
            </h3>
            <p className="mt-2 text-base md:text-lg font-semibold opacity-95">
              +52 771 159 6460
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-base md:text-lg font-semibold underline underline-offset-4 decoration-white/50 transition group-hover:tracking-wide group-hover:-translate-y-px">
              Escríbeme
            </span>
          </div>
        </motion.a>

        <motion.a
          href="mailto:dedbensec@gmail.com?subject=Solicitud%20de%20sitio%20web"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group relative overflow-hidden rounded-3xl border border-transparent p-8 md:p-10 min-h-[220px] md:min-h-[260px] bg-gradient-to-br from-rose-500 via-red-500 to-orange-400 text-white shadow-lg hover:shadow-2xl transform-gpu will-change-transform transition-shadow duration-300"
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-xl bg-white text-red-600 shadow-md">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-sm">
              Email
            </h3>
            <p className="mt-2 text-base md:text-lg font-semibold opacity-95">
              dedbensec@gmail.com
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-base md:text-lg font-semibold underline underline-offset-4 decoration-white/50 transition group-hover:tracking-wide group-hover:-translate-y-px">
              Enviar correo
            </span>
          </div>
        </motion.a>

        <motion.a
          href="https://instagram.com/that_bussy_acc"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group relative overflow-hidden rounded-3xl border border-transparent p-8 md:p-10 min-h-[220px] md:min-h-[260px] bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 text-white shadow-lg hover:shadow-2xl transform-gpu will-change-transform transition-shadow duration-300"
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-xl bg-white text-fuchsia-600 shadow-md">
              <Instagram className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-sm">
              Instagram
            </h3>
            <p className="mt-2 text-base md:text-lg font-semibold opacity-95">
              @that_bussy_acc
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-base md:text-lg font-semibold underline underline-offset-4 decoration-white/50 transition group-hover:tracking-wide group-hover:-translate-y-px">
              Visitar perfil
            </span>
          </div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
