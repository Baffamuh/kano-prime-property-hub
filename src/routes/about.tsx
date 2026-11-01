import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useContent } from "@/lib/content";
import { PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Prime Zone Estates Ltd — Kano Real Estate Developer" },
      { name: "description", content: "Meet Prime Zone Estates and Chairman & CEO Muhsin Ibrahim Abubakar, the Muhsin Estate Expert, modernising Kano's real estate market." },
      { property: "og:title", content: "About Prime Zone Estates Ltd" },
      { property: "og:description", content: "Secure, transparent property development in Kano." },
    ],
  }),
  component: About,
});

function About() {
  const c = useContent();
  return (
    <>
      <PageHeader eyebrow="About us" title="Modernising Kano's real estate market." />
      <section className="mx-auto max-w-4xl px-5 py-20 text-lg leading-relaxed text-foreground/85">
        <p>{c.aboutText}</p>
      </section>
      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold" />
            <img src={c.ceoImage} alt="Muhsin Ibrahim Abubakar, Chairman & CEO" className="relative aspect-[4/5] w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Leadership spotlight</p>
            <h2 className="mt-3 font-display text-5xl">Muhsin Ibrahim Abubakar</h2>
            <p className="mt-1 font-semibold text-gold">Chairman & CEO · “Muhsin Estate Expert”</p>
            <p className="mt-6 text-muted-foreground">
              Widely known on social media as Muhsin Estate Expert, he brings deep local market knowledge and a proven track record in land acquisition, layout development and property marketing across Kano. His mission: help everyday earners and diaspora Nigerians own secure, appreciating assets at home.
            </p>
            <a href={c.instagram} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 font-semibold text-primary-foreground">
              <Instagram className="h-4 w-4" /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
