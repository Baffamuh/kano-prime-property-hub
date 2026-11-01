import { useSyncExternalStore } from "react";
import ceoAsset from "@/assets/ceo.jpg.asset.json";

export type Property = {
  id: string;
  title: string;
  location: string;
  type: "Residential Plot" | "Commercial Plot" | "Joint Venture" | "Estate Home";
  price: string;
  size: string;
  image: string;
  description: string;
  features: string[];
  status: "Available" | "Selling Fast" | "Sold Out";
  titleDoc?: string;
};

export type SiteContent = {
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  instagram: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  quote: string;
  quoteBody: string;
  aboutText: string;
  ceoImage: string;
  layoutImage: string;
  properties: Property[];
};

const LAYOUT_IMG =
  "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1600&q=80";

export const defaultContent: SiteContent = {
  phonePrimary: "07036722139",
  phoneSecondary: "07078444344",
  email: "info@primezoneestates.ng",
  address: "No 25 Sulaiman Crescent, beside Ni'imah Hotel, Nasarawa GRA, Kano State, Nigeria",
  instagram: "https://instagram.com",
  heroHeadline: "Turning Your Real Estate Dreams into Reality.",
  heroSubheadline: "Secure, verified land and modern estate layouts in the heart of Kano.",
  heroImage:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80",
  quote: "Buy the bush, sell the city.",
  quoteBody:
    "Land on the edge of a growing city is where quiet wealth is built. For salary earners, an early plot near new development corridors turns monthly savings into a passive asset that appreciates while you work.",
  aboutText:
    "Prime Zone Estates Ltd is a Kano-based real estate development and property marketing firm dedicated to modernising the city's property market. We acquire, plan and document land with full transparency, so every client — from first-time buyers to diaspora investors — owns property that is secure, verified and ready to grow in value.",
  ceoImage: ceoAsset.url,
  layoutImage: LAYOUT_IMG,
  properties: [
    {
      id: "buk-1",
      title: "BUK New Site Residential Layout",
      location: "BUK New Site",
      type: "Residential Plot",
      price: "₦4,500,000",
      size: "600 sqm",
      image: LAYOUT_IMG,
      description:
        "High-value residential plots minutes from Bayero University Kano New Site — ideal for homes, student hostels and long-term appreciation.",
      features: ["Electricity access", "Graded access roads", "Pre-verified title / C of O"],
      status: "Selling Fast",
      titleDoc: "C of O",
    },
    {
      id: "gwarzo-1",
      title: "Gwarzo Road Prime Layout",
      location: "Gwarzo Road",
      type: "Residential Plot",
      price: "₦3,200,000",
      size: "500 sqm",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      description:
        "Planned layout along the Gwarzo Road growth corridor with fast-rising land values.",
      features: ["Electricity access", "Access roads", "Occupancy permit ready"],
      status: "Available",
    },
    {
      id: "gwarzo-com",
      title: "Gwarzo Road Commercial Frontage",
      location: "Gwarzo Road",
      type: "Commercial Plot",
      price: "₦9,000,000",
      size: "900 sqm",
      image:
        "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80",
      description: "Road-facing commercial plots suited for plazas, filling stations and shops.",
      features: ["Major road frontage", "Electricity access", "Verified documents"],
      status: "Available",
    },
    {
      id: "jv-1",
      title: "Nasarawa GRA Joint Venture",
      location: "Nasarawa GRA",
      type: "Joint Venture",
      price: "Negotiable",
      size: "2,000 sqm",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      description:
        "Partner with us to develop luxury terraces on a prime GRA site. Landowners and investors welcome.",
      features: ["Prime GRA address", "Shared-profit structure", "Full legal documentation"],
      status: "Available",
    },
  ],
};

const KEY = "primezone-content-v2";
const listeners = new Set<() => void>();
let cache: SiteContent | null = null;

function read(): SiteContent {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...defaultContent, ...JSON.parse(raw) } : defaultContent;
  } catch {
    cache = defaultContent;
  }
  return cache!;
}

export function saveContent(next: SiteContent) {
  cache = next;
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function resetContent() {
  localStorage.removeItem(KEY);
  cache = defaultContent;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useContent(): SiteContent {
  return useSyncExternalStore(subscribe, read, () => defaultContent);
}

export function waLink(phone: string, text = "Hello Prime Zone Estates, I'm interested in your properties.") {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "234");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function filterProperties(list: Property[], location: string, type: string, q: string) {
  const s = q.trim().toLowerCase();
  return list.filter(
    (p) =>
      (location === "all" || p.location === location) &&
      (type === "all" || p.type === type) &&
      (!s || `${p.title} ${p.description} ${p.location}`.toLowerCase().includes(s)),
  );
}

/** Parse a naira price like "₦4,500,000" into a number; null when not numeric (e.g. "Negotiable"). */
export function parsePrice(price: string): number | null {
  const n = Number(price.replace(/[^\d.]/g, ""));
  return n > 0 ? n : null;
}

export type Currency = "NGN" | "USD" | "GBP";
/** Approximate naira per unit — indicative only. */
export const RATES: Record<Currency, number> = { NGN: 1, USD: 1600, GBP: 2050 };
const SYM: Record<Currency, string> = { NGN: "₦", USD: "$", GBP: "£" };

export function formatMoney(naira: number, cur: Currency) {
  const v = naira / RATES[cur];
  return SYM[cur] + Math.round(v).toLocaleString("en-US");
}

/** Monthly instalment for an interest-free payment plan. */
export function monthlyInstalment(price: number, depositPct: number, months: number) {
  const balance = price * (1 - depositPct / 100);
  return months > 0 ? balance / months : balance;
}

let cur: Currency = "NGN";
const curL = new Set<() => void>();
export function setCurrency(c: Currency) {
  cur = c;
  try { localStorage.setItem("pz-cur", c); } catch { /* ignore */ }
  curL.forEach((l) => l());
}
export function useCurrency(): Currency {
  return useSyncExternalStore(
    (l) => { curL.add(l); return () => curL.delete(l); },
    () => { try { const s = localStorage.getItem("pz-cur") as Currency | null; if (s && s !== cur && RATES[s]) cur = s; } catch { /* ignore */ } return cur; },
    () => "NGN",
  );
}
