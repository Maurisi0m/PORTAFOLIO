import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import WaveLoader from "@/components/ui/WaveLoader";
import ScrollProgress from "@/components/ui/ScrollProgress";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/sobre", label: "Sobre el servicio" },
  { to: "/cotizaciones", label: "Cotizaciones" },
  { to: "/faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/favicon.ico"
            alt="ARQBYTE Logo"
            className="h-10 w-10 rounded-lg"
          />
          <span className="text-lg font-extrabold tracking-tight">
            ARQBYTE
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-sm text-foreground/80 hover:text-foreground transition-colors",
                  isActive && "text-foreground font-semibold",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button asChild size="sm" className="shadow-lg shadow-primary/30">
            <Link to="/cotizaciones">Cotiza ahora</Link>
          </Button>
        </div>
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background/95">
          <div className="container py-3 flex flex-col gap-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn("text-base py-2", isActive && "font-semibold text-primary")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-3 pt-2">
              <Button asChild size="sm" className="flex-1">
                <Link to="/cotizaciones">Cotiza ahora</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 p-[1px]">
              <div className="h-full w-full rounded-[6px] bg-background grid place-items-center text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <span className="font-bold">Memo Web Studio</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Sitios web modernos, rápidos y hermosos. Experiencias inmersivas
            para móviles y computadoras.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link className="hover:text-primary" to={n.to}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contacto</h4>
          <p className="text-sm text-muted-foreground">Escríbeme a</p>
          <a
            href="mailto:hola@memoweb.studio"
            className="text-sm underline underline-offset-4"
          >
            hola@memoweb.studio
          </a>
          <div className="mt-4 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Memo Web Studio
          </div>
        </div>
      </div>
    </footer>
  );
}

function PageTransition({
  keyPath,
  children,
}: {
  keyPath: string;
  children: React.ReactNode;
}) {
  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);
  return (
    <motion.div
      key={keyPath}
      initial={
        first.current
          ? false
          : { opacity: 0, y: 18, scale: 0.992, filter: "blur(6px)" }
      }
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, scale: 0.992, filter: "blur(4px)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const firstNavRef = useRef(true);

  // Smooth scroll to top on route change

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  // Quick wave loader on route change (skip first render)
  useEffect(() => {
    if (firstNavRef.current) {
      firstNavRef.current = false;
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 140);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Trigger loader on in-page hash navigation (section changes)
  useEffect(() => {
    const onHash = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 140);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,transparent_60%)]" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(closest-side,theme(colors.violet.500/28),transparent)] blur-3xl drop-shadow-[0_0_120px_hsl(var(--primary)/.35)]" />
        <div className="absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/25),transparent)] blur-3xl" />
      </div>
      <SiteHeader />
      <ScrollProgress />
      <WaveLoader visible={loading} />
      <main className="container px-4 md:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={"ovl-" + location.pathname}
            className="pointer-events-none fixed inset-0 z-[5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(1000px circle at 50% -10%, hsl(var(--primary)/.22), transparent 60%)",
            }}
          />
          <PageTransition keyPath={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}
