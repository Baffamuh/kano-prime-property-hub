import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Maximize2, MapPin, ShieldCheck } from "lucide-react";
import type { Property } from "@/lib/content";
import { formatNaira, parsePrice } from "@/lib/content";

export function Price({ price, className = "" }: { price: string; className?: string }) {
  const n = parsePrice(price);
  return <span className={className}>{n ? formatNaira(n) : price}</span>;
}

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group flex flex-col border border-border bg-card transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_var(--color-primary)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <span className={`absolute left-0 top-4 px-3 py-1 text-xs font-bold uppercase tracking-wider ${p.status === "Sold Out" ? "bg-destructive text-destructive-foreground" : "bg-gold text-gold-foreground"}`}>
          {p.status}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 bg-background/95 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          <ShieldCheck className="h-3.5 w-3.5" /> {p.titleDoc || "Verified title"}
        </span>
        <Price price={p.price} className="absolute bottom-4 left-5 font-display text-3xl text-navy-foreground" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <MapPin className="h-3 w-3" /> {p.location} · {p.type}
        </p>
        <p className="mt-2 inline-block self-start border border-gold px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-primary">REF: {p.ref}</p>
        <h3 className="mt-2 font-display text-2xl leading-tight">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 mt-6 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground"><Maximize2 className="h-4 w-4 text-gold" /> {p.size || "—"}</span>
          <span className="flex items-center gap-1 font-semibold text-primary">View details <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </div>
      </div>
    </Link>
  );
}
