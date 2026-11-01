import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { filterProperties, useContent } from "@/lib/content";
import { PropertyCard } from "@/components/property-card";
import { PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Land for Sale near BUK New Site & Gwarzo Road | Prime Zone Estates" },
      { name: "description", content: "Browse verified residential and commercial plots for sale near Bayero University Kano New Site and along Gwarzo Road." },
      { property: "og:title", content: "Land for Sale near BUK New Site, Kano" },
      { property: "og:description", content: "Verified plots with electricity, access roads and title documents." },
    ],
  }),
  component: Properties,
});

const sel = "h-12 border border-input bg-background px-3 text-sm";

function Properties() {
  const c = useContent();
  const [loc, setLoc] = useState("all");
  const [type, setType] = useState("all");
  const [q, setQ] = useState("");
  const locations = useMemo(() => [...new Set(c.properties.map((p) => p.location))], [c.properties]);
  const types = useMemo(() => [...new Set(c.properties.map((p) => p.type))], [c.properties]);
  const list = filterProperties(c.properties, loc, type, q);

  return (
    <>
      <PageHeader eyebrow="Properties & Projects" title="Land for sale near BUK New Site" sub="High-value plots with electricity access, access roads and pre-verified title documents." />
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-12 grid overflow-hidden border border-border md:grid-cols-2">
          <img src={c.layoutImage} alt="Aerial view of estate layout master plan" className="h-full max-h-80 w-full object-cover" />
          <div className="p-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Active project</p>
            <h2 className="mt-2 font-display text-3xl">BUK New Site / Gwarzo Road Layouts</h2>
            <p className="mt-3 text-muted-foreground">Planned residential plots in Kano's fastest-growing corridor, close to Bayero University Kano New Site. Every plot comes with electricity access, graded roads and verified occupancy documents.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, ref code or area…" className={`${sel} w-full pl-10`} />
          </div>
          <select value={loc} onChange={(e) => setLoc(e.target.value)} className={sel} aria-label="Location">
            <option value="all">All locations</option>
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className={sel} aria-label="Investment type">
            <option value="all">All investment types</option>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No properties match your search.</p>}
      </section>
    </>
  );
}
