import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
  return (
    <motion.div
      className="py-12 md:py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <header className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Preguntas frecuentes</h1>
        <p className="mt-2 text-muted-foreground">
          Respuestas claras para ayudarte a decidir.
        </p>
      </header>

      <motion.div
        className="mt-8 rounded-2xl border p-4 md:p-6 bg-background/50"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Cuánto tarda un proyecto?</AccordionTrigger>
            <AccordionContent>
              Depende del alcance. Un landing puede demorar 1-2 semanas; sitios
              más complejos, 3-4+ semanas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Ofreces mantenimiento?</AccordionTrigger>
            <AccordionContent>
              Sí. Puedo ofrecer planes de soporte y mejoras continuas según tus
              necesidades.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Puedo pagar en partes?</AccordionTrigger>
            <AccordionContent>
              Generalmente 50% al inicio y 50% al entregar. Podemos acordar un
              plan que te funcione.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
}
