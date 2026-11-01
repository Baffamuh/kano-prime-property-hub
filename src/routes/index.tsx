import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, LayoutGrid, Quote, Home } from "lucide-react";
import { useContent } from "@/lib/content";
import { PropertyCard } from "@/components/property-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Real Estate Developer in Kano | Prime Zone Estates Ltd" },
      { name: "description", content: "Secure, verified land for sale near BUK New Site and Gwarzo Road. Prime Zone Estates is a trusted real estate developer in Kano, Nigeria." },
      { property: "og:title", content: "Prime Zone Estates Ltd — Real Estate Developer in Kano" },
      { property: "og:description", content: "Verified land and modern estate layouts near BUK New Site, Kano." },
    ],
  }),
  component: Index,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1500);
        setN(Math.round(to * k));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Index() {
  const c = useContent();
  return (
    <>
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <img src={c.heroImage} alt="Modern two-storey luxury house with interlocking driveway" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/10" />
        <div className="absolute bottom-0 left-0 h-3 w-1/3 bg-gold" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 text-navy-foreground">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Prime Zone Estates Ltd · Kano</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">{c.heroHeadline}</h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">{c.heroSubheadline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/properties" className="inline-flex items-center gap-2 bg-gold px-7 py-4 font-semibold text-gold-foreground hover:brightness-105">
              View Available Plots <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-navy-foreground/50 px-7 py-4 font-semibold hover:bg-navy-foreground/10">
              Contact an Expert
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-16 grid max-w-6xl gap-px bg-border px-5 md:grid-cols-3 relative z-10">
        {[
          { icon: Home, big: <Counter to={100} suffix="+" />, label: "Properties Sold" },
          { icon: BadgeCheck, big: "Verified", label: "Certificates of Occupancy" },
          { icon: LayoutGrid, big: "Secure", label: "Planned Layouts" },
        ].map((s) => (
          <div key={s.label} className="bg-card p-8 shadow-sm">
            <s.icon className="h-8 w-8 text-gold" />
            <p className="mt-4 font-display text-5xl text-primary">{s.big}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="relative grid gap-10 overflow-hidden bg-primary p-10 text-primary-foreground md:grid-cols-[auto_1fr] md:p-16">
          <div className="absolute -right-10 top-0 h-full w-40 skew-x-[-18deg] bg-gold/20" />
          <Quote className="h-16 w-16 text-gold" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Our investment philosophy</p>
            <blockquote className="mt-3 font-display text-4xl md:text-6xl">“{c.quote}”</blockquote>
            <p className="mt-5 max-w-2xl opacity-85">{c.quoteBody}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Featured</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">BUK New Site / Gwarzo Road Layouts</h2>
          </div>
          <Link to="/properties" className="font-semibold text-primary hover:underline">All properties →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {c.properties.slice(0, 3).map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}
