import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, MessageCircle, Phone, X, MapPin, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { setCurrency, useContent, useCurrency, waLink, type Currency } from "@/lib/content";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const c = useContent();
  const [open, setOpen] = useState(false);
  const cur = useCurrency();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-5 text-xs">
          <p className="flex items-center gap-2 opacity-80"><MapPin className="h-3.5 w-3.5 text-gold" /> Nasarawa GRA, Kano · Mon–Sat 8am–6pm</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${c.phoneSecondary}`} className="opacity-80 hover:text-gold">{c.phoneSecondary}</a>
            <div className="flex items-center gap-1" role="group" aria-label="Currency">
              {(["NGN", "USD", "GBP"] as Currency[]).map((k) => (
                <button key={k} onClick={() => setCurrency(k)} className={`px-2 py-0.5 font-semibold ${cur === k ? "bg-gold text-gold-foreground" : "opacity-70 hover:opacity-100"}`}>{k}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src={logo.url} alt="Prime Zone Estates Ltd logo" className="h-14 w-auto shrink-0 object-contain md:h-16" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary after:scale-x-100" }}
                className="relative text-sm font-semibold uppercase tracking-wider text-foreground/80 transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:${c.phonePrimary}`}
            className="hidden items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground lg:flex"
          >
            <Phone className="h-4 w-4" /> {c.phonePrimary}
          </a>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col border-t border-border px-5 py-3 md:hidden">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 font-semibold">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 py-3">
              {(["NGN", "USD", "GBP"] as Currency[]).map((k) => (
                <button key={k} onClick={() => setCurrency(k)} className={`border px-3 py-1 text-sm font-semibold ${cur === k ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{k}</button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <img src={logo.url} alt="Prime Zone Estates Ltd" className="mb-4 h-16 w-auto bg-background p-2" />
            <p className="font-display text-2xl">Prime Zone Estates Ltd</p>
            <p className="mt-3 text-sm opacity-70">
              Real estate developer in Kano — verified land, planned layouts and investment advisory.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{c.address}</p>
            <p className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-gold" />{c.phonePrimary} · {c.phoneSecondary}</p>
            <a href={c.instagram} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-gold">
              <Instagram className="h-4 w-4 text-gold" /> @muhsinestateexpert
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="opacity-80 hover:text-gold">{l.label}</Link>
            ))}
            <Link to="/admin" className="opacity-40 hover:opacity-80">Admin</Link>
          </div>
        </div>
        <p className="border-t border-navy-foreground/10 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Prime Zone Estates Ltd. All rights reserved.
        </p>
      </footer>

      <a
        href={waLink(c.phonePrimary)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

export function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute -right-20 top-0 h-full w-1/3 skew-x-[-18deg] bg-primary/40" />
      <div className="relative mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl md:text-6xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl opacity-80">{sub}</p>}
      </div>
    </section>
  );
}
