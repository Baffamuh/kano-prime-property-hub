import { Check, MapPin } from "lucide-react";
import type { Property } from "@/lib/content";
import { useContent, waLink } from "@/lib/content";

export function PropertyCard({ p }: { p: Property }) {
  const c = useContent();
  return (
    <article className="group flex flex-col border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-0 top-4 bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-foreground">
          {p.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <MapPin className="h-3 w-3" /> {p.location} · {p.type}
        </p>
        <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {p.features.map((f) => (
            <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-gold" />{f}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-4 mt-6">
          <div>
            <p className="text-xs text-muted-foreground">{p.size}</p>
            <p className="font-display text-2xl text-primary">{p.price}</p>
          </div>
          <a href={waLink(c.phonePrimary, `Hello, I'm interested in ${p.title} (${p.price}).`)} target="_blank" rel="noreferrer" className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
