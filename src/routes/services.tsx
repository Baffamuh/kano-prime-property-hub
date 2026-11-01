import { createFileRoute, Link } from "@tanstack/react-router";
import { Handshake, LandPlot, LineChart } from "lucide-react";
import { PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Land Sales, Joint Ventures & Advisory | Prime Zone Estates" },
      { name: "description", content: "Residential land sales, joint venture partnerships and layout design & investment advisory in Kano." },
      { property: "og:title", content: "Real Estate Services in Kano" },
      { property: "og:description", content: "Land sales, JV partnerships and investment advisory." },
    ],
  }),
  component: Services,
});

const items = [
  { icon: LandPlot, title: "Residential Land Sales", body: "Premium estate plots with verified documentation — C of O, survey plans and clean title, ready for you to build or hold." },
  { icon: Handshake, title: "Joint Venture (JV) Partnerships", body: "Collaborate with us on property development projects. Landowners and investors share in the value we create together." },
  { icon: LineChart, title: "Layout Design & Investment Advisory", body: "Professional property consulting — layout planning, site selection and wealth-building strategy for local and diaspora clients." },
];

function Services() {
  return (
    <>
      <PageHeader eyebrow="What we do" title="Services built on trust and verified title." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 md:grid-cols-3">
        {items.map((s, i) => (
          <div key={s.title} className="group relative border border-border bg-card p-10 transition-colors hover:border-primary">
            <span className="absolute right-6 top-6 font-display text-6xl text-muted">0{i + 1}</span>
            <s.icon className="h-10 w-10 text-gold" />
            <h2 className="mt-6 font-display text-3xl">{s.title}</h2>
            <p className="mt-3 text-muted-foreground">{s.body}</p>
            <div className="mt-8 h-1 w-12 bg-primary transition-all group-hover:w-24" />
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 text-center">
        <Link to="/contact" className="inline-block bg-primary px-8 py-4 font-semibold text-primary-foreground">Speak with an expert</Link>
      </section>
    </>
  );
}
