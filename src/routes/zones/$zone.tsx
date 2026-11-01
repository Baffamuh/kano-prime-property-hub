import { createFileRoute, Link } from "@tanstack/react-router";
import { useContent } from "@/lib/content";
import { PropertyCard } from "@/components/property-card";
import { PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/zones/$zone")({
  head: ({ params }) => ({
    meta: [
      { title: `Land & Property in ${params.zone}, Kano | Prime Zone Estates` },
      { name: "description", content: `Verified plots and estate homes for sale in ${params.zone}, Kano.` },
      { property: "og:title", content: `Property in ${params.zone}, Kano` },
      { property: "og:description", content: `All Prime Zone listings in ${params.zone}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ZonePage,
});

function ZonePage() {
  const { zone } = Route.useParams();
  const c = useContent();
  const z = c.zones.find((x) => x.name === zone);
  const list = c.properties.filter((p) => p.location === zone);
  return (
    <>
      <PageHeader eyebrow="Zone" title={zone} sub={z?.areas} />
      <section className="mx-auto max-w-7xl px-5 py-14">
        <Link to="/zones" className="text-sm font-semibold text-primary">← All zones</Link>
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No listings in this zone yet.</p>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        )}
      </section>
    </>
  );
}
