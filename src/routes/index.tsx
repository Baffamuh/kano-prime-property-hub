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
      if (!e?.isIntersecting) return;
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

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">How it works</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Own land in 4 simple steps</h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-4">
            {[
              ["01", "Choose a plot", "Browse verified layouts online or speak to an advisor."],
              ["02", "Inspect", "Visit the site with us, or join a live video inspection from abroad."],
              ["03", "Pay securely", "Outright or flexible instalments into our corporate account only."],
              ["04", "Get documents", "Receive your allocation letter, survey plan and title papers."],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-card p-8">
                <p className="font-display text-5xl text-gold">{n}</p>
                <h3 className="mt-4 font-display text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Client stories</p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">Trusted by investors at home and abroad</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Aminu S.", "Civil servant, Kano", "I bought my first plot near BUK New Site on instalments. Documents were ready exactly as promised."],
            ["Hauwa M.", "Nurse, London (UK)", "I inspected by video call from London. The whole process was transparent from start to finish."],
            ["Engr. Bello Y.", "Landowner, Nasarawa GRA", "Our joint venture with Prime Zone turned an idle plot into income. Very professional team."],
          ].map(([n, r, q]) => (
            <figure key={n} className="border border-border bg-card p-8">
              <Quote className="h-8 w-8 text-gold" />
              <blockquote className="mt-4 text-foreground/85">{q}</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4"><p className="font-semibold">{n}</p><p className="text-sm text-muted-foreground">{r}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">FAQ</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Questions buyers ask us</h2>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-gold px-6 py-3 font-semibold text-gold-foreground">Ask an expert <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="divide-y divide-navy-foreground/15 border-y border-navy-foreground/15">
            {[
              ["Are your lands verified?", "Yes. Every plot is checked with the Kano State land registry before listing, and comes with a survey plan and title document."],
              ["Can I pay in instalments?", "Yes. Most plots offer flexible plans from 3 to 24 months after an initial deposit. Use the calculator on any property page."],
              ["I live abroad. Can I still buy?", "Absolutely. We offer video inspections, digital documentation and see prices in USD or GBP using the switcher at the top."],
              ["What is a joint venture?", "Landowners partner with us to develop their land; profits or finished units are shared by agreement."],
            ].map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl">{q}<span className="text-gold transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-sm opacity-80">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
