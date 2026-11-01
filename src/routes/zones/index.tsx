import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { useContent } from "@/lib/content";
import { PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/zones/")({
  head: () => ({
    meta: [
      { title: "Browse Land by Zone in Kano | Prime Zone Estates" },
      { name: "description", content: "Explore plots and estates by zone: BUK New Site, Gwarzo Road, Nasarawa GRA and more across Kano." },
      { property: "og:title", content: "Browse Property by Zone — Kano" },
      { property: "og:description", content: "Every Prime Zone listing grouped by Kano zone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Zones,
});

function Zones() {
  const c = useContent();
  return (
    <>
      <PageHeader eyebrow="Browse by zone" title="Find property in your preferred zone" sub="Every listing is grouped by zone. Pick one to see all properties there." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {c.zones.map((z) => {
          const count = c.properties.filter((p) => p.location === z.name).length;
          return (
            <Link key={z.name} to="/zones/$zone" params={{ zone: z.name }} className="group border border-border bg-card p-7 transition hover:border-primary hover:shadow-lg">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"><MapPin className="h-4 w-4 text-gold" /> Kano</p>
              <h2 className="mt-3 font-display text-3xl">{z.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{z.areas}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="bg-gold px-3 py-1 text-sm font-semibold text-gold-foreground">{count} {count === 1 ? "property" : "properties"}</span>
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
