import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarCheck, Check, MapPin, MessageCircle, Phone, Share2, ShieldCheck, Calculator } from "lucide-react";
import { defaultContent, addEnquiry, formatNaira, monthlyInstalment, parsePrice, useContent, waLink } from "@/lib/content";
import { Price, PropertyCard } from "@/components/property-card";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const p = defaultContent.properties.find((x) => x.id === params.id);
    return { title: p?.title ?? "Property", description: p?.description ?? "Verified property in Kano." };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title} | Prime Zone Estates Kano` },
      { name: "description", content: loaderData?.description },
      { property: "og:title", content: `${loaderData?.title} — Prime Zone Estates` },
      { property: "og:description", content: loaderData?.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Detail,
  notFoundComponent: () => <p className="py-32 text-center">Property not found.</p>,
});

const inp = "h-12 w-full border border-input bg-background px-3 text-sm";

function Detail() {
  const { id } = Route.useParams();
  const c = useContent();
  const p = c.properties.find((x) => x.id === id);
  const [dep, setDep] = useState(30);
  const [months, setMonths] = useState(12);
  const [form, setForm] = useState({ name: "", phone: "", date: "", mode: "In person" });
  if (!p) throw notFound();
  const n = parsePrice(p.price);
  const msg = `Hello Prime Zone Estates, I'd like to book an inspection.\nProperty: ${p.title} (Ref ${p.ref})\nName: ${form.name}\nPhone: ${form.phone}\nPreferred date: ${form.date}\nInspection: ${form.mode}`;

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 text-navy-foreground">
          <Link to="/properties" className="mb-6 inline-flex w-fit items-center gap-2 text-sm opacity-80 hover:opacity-100"><ArrowLeft className="h-4 w-4" /> All properties</Link>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="bg-gold px-3 py-1 text-gold-foreground">{p.status}</span>
            <span className="flex items-center gap-1 bg-background px-3 py-1 text-primary"><ShieldCheck className="h-3.5 w-3.5" />{p.titleDoc || "Verified title"}</span>
            <span className="bg-navy-foreground/15 px-3 py-1">Ref {p.id.toUpperCase()}</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl md:text-6xl">{p.title}</h1>
          <p className="mt-3 flex items-center gap-2 opacity-85"><MapPin className="h-4 w-4 text-gold" /> {p.location}, Kano</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_400px]">
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
            {[["Reference", p.ref], ["Price", <Price key="p" price={p.price} />], ["Plot size", p.size || "—"], ["Type", p.type], ["Title", p.titleDoc || "Verified"]].map(([k, v]) => (
              <div key={String(k)} className="bg-card p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
                <p className="mt-1 font-display text-xl text-primary">{v}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-display text-3xl">Overview</h2>
            <p className="mt-4 leading-relaxed text-foreground/85">{p.description}</p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Features & amenities</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => <li key={f} className="flex gap-3 border border-border p-4"><Check className="h-5 w-5 shrink-0 text-gold" />{f}</li>)}
            </ul>
          </div>

          {n && (
            <div className="border border-border bg-muted p-8">
              <h2 className="flex items-center gap-3 font-display text-3xl"><Calculator className="h-7 w-7 text-gold" /> Payment plan calculator</h2>
              <p className="mt-2 text-sm text-muted-foreground">Estimate an instalment plan. Final terms are confirmed by our sales team.</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <label className="text-sm font-semibold">Initial deposit: {dep}%
                  <input type="range" min={10} max={100} step={5} value={dep} onChange={(e) => setDep(+e.target.value)} className="mt-3 w-full accent-[var(--color-primary)]" />
                </label>
                <label className="text-sm font-semibold">Duration: {months} months
                  <input type="range" min={3} max={24} step={3} value={months} onChange={(e) => setMonths(+e.target.value)} className="mt-3 w-full accent-[var(--color-primary)]" />
                </label>
              </div>
              <div className="mt-6 grid gap-px bg-border sm:grid-cols-2">
                <div className="bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Deposit today</p><p className="font-display text-3xl text-primary">{formatNaira((n * dep) / 100)}</p></div>
                <div className="bg-card p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Monthly</p><p className="font-display text-3xl text-primary">{formatNaira(monthlyInstalment(n, dep, months))}</p></div>
              </div>
            </div>
          )}

          <div>
            <h2 className="font-display text-3xl">Location</h2>
            <iframe title="Map" className="mt-5 h-80 w-full border border-border" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(p.location + ", Kano, Nigeria")}&z=13&output=embed`} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-border bg-card p-7 shadow-[0_30px_60px_-30px_var(--color-primary)]">
            <Price price={p.price} className="font-display text-4xl text-primary" />
            <p className="mt-1 text-xs text-muted-foreground">REF: {p.ref} · {p.size}</p>
            <h3 className="mt-6 flex items-center gap-2 font-semibold"><CalendarCheck className="h-5 w-5 text-gold" /> Schedule an inspection</h3>
            <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); addEnquiry({ name: form.name, phone: form.phone, message: `Inspection request (${form.mode}) for ${form.date}`, propertyRef: p.ref }); window.open(waLink(c.phonePrimary, msg), "_blank"); }}>
              <input required className={inp} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required className={inp} placeholder="Phone / WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input required type="date" className={inp} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <select className={inp} value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                <option>In person</option><option>Video call (diaspora)</option>
              </select>
              <button className="w-full bg-primary py-3.5 font-semibold text-primary-foreground hover:bg-primary/90">Book inspection</button>
            </form>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <a href={waLink(c.phonePrimary, `Hello, I'm interested in ${p.title} (Ref ${p.ref}, ${p.price}).`)} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 border border-border py-3 hover:border-primary"><MessageCircle className="h-4 w-4 text-whatsapp" />WhatsApp</a>
              <a href={`tel:${c.phonePrimary}`} className="flex flex-col items-center gap-1 border border-border py-3 hover:border-primary"><Phone className="h-4 w-4 text-primary" />Call</a>
              <button type="button" onClick={() => navigator.share ? navigator.share({ title: p.title, url: location.href }) : navigator.clipboard.writeText(location.href)} className="flex flex-col items-center gap-1 border border-border py-3 hover:border-primary"><Share2 className="h-4 w-4 text-primary" />Share</button>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <h2 className="font-display text-3xl">Similar properties</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {c.properties.filter((x) => x.id !== p.id).slice(0, 3).map((x) => <PropertyCard key={x.id} p={x} />)}
        </div>
      </section>
    </>
  );
}
