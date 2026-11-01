import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Building2, ExternalLink, Inbox, LayoutGrid, LogOut, Map, Menu, Pencil, Plus, Settings, Trash2, Trophy, Wallet, X,
} from "lucide-react";
import {
  defaultContent, ensureRefs, formatNaira, nextRef, parsePrice, resetContent, saveContent, saveEnquiries,
  useContent, useEnquiries, type Enquiry, type Property, type SiteContent,
} from "@/lib/content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Prime Zone Hub — Admin portal" },
      { name: "description", content: "Prime Zone Estates admin portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

// Demo credentials. Client-side only — not real security.
const DEMO_USER = "admin";
const PASSCODE = "primezone2026";
const inp = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-hub focus:outline-none";
const btn = "inline-flex items-center gap-2 rounded-xl bg-hub px-5 py-3 text-sm font-semibold text-hub-foreground hover:opacity-90";

type Tab = "overview" | "properties" | "zones" | "agents" | "enquiries" | "settings";
const NAV: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "zones", label: "Zones & Areas", icon: Map },
  { id: "agents", label: "Agents & Sales", icon: Trophy },
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "settings", label: "Site settings", icon: Settings },
];

function F({ label, value, onChange, area, type }: { label: string; value: string; onChange: (v: string) => void; area?: boolean; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      {area ? <textarea rows={3} className={inp} value={value} onChange={(e) => onChange(e.target.value)} /> : <input type={type} className={inp} value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`}>{children}</div>;
}

function Admin() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => setAuthed(sessionStorage.getItem("pz-admin") === "1"), []);
  if (!authed) return <Login onDone={() => setAuthed(true)} />;
  return <Portal onSignOut={() => { sessionStorage.removeItem("pz-admin"); setAuthed(false); }} />;
}

function Login({ onDone }: { onDone: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-hub px-5">
      <div className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-2xl">
        <p className="font-display text-3xl font-bold text-hub">Prime Zone Hub</p>
        <p className="text-sm text-muted-foreground">Admin portal sign in</p>
        <div className="mt-6 rounded-xl border border-hub-active bg-hub-active/15 p-4 text-sm">
          <p className="font-bold uppercase tracking-wider text-hub">Demo login</p>
          <p className="mt-2">Username: <code className="font-semibold">{DEMO_USER}</code></p>
          <p>Passcode: <code className="font-semibold">{PASSCODE}</code></p>
          <button type="button" onClick={() => { setUser(DEMO_USER); setPass(PASSCODE); }} className="mt-3 rounded-lg bg-hub px-4 py-2 text-xs font-semibold text-hub-foreground">Fill demo details</button>
        </div>
        <form className="mt-6 space-y-3" onSubmit={(e) => {
          e.preventDefault();
          if (user.trim().toLowerCase() === DEMO_USER && pass === PASSCODE) { sessionStorage.setItem("pz-admin", "1"); onDone(); }
          else setErr("Wrong username or passcode");
        }}>
          <input className={inp} placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} />
          <input type="password" className={inp} placeholder="Passcode" value={pass} onChange={(e) => setPass(e.target.value)} />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className={`${btn} w-full justify-center`}>Sign in</button>
        </form>
        <Link to="/" className="mt-6 block text-center text-sm text-muted-foreground underline">Back to website</Link>
      </div>
    </div>
  );
}

function Portal({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [open, setOpen] = useState(false);
  const nav = (
    <nav className="space-y-1">
      {NAV.map((n) => (
        <button key={n.id} onClick={() => { setTab(n.id); setOpen(false); }}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-medium transition ${tab === n.id ? "bg-hub-active text-hub-active-foreground" : "text-hub-foreground/85 hover:bg-hub-foreground/10"}`}>
          <n.icon className="h-5 w-5" /> {n.label}
        </button>
      ))}
    </nav>
  );
  return (
    <div className="flex min-h-screen bg-hub-bg">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 flex-col bg-hub p-5 text-hub-foreground md:flex ${open ? "flex" : "hidden"}`}>
        <div className="mb-8 flex items-start justify-between px-2">
          <div>
            <p className="font-display text-2xl font-bold">Prime Zone Hub</p>
            <p className="text-sm opacity-70">Admin portal</p>
          </div>
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
        </div>
        {nav}
        <div className="mt-auto space-y-1">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 opacity-85 hover:bg-hub-foreground/10"><ExternalLink className="h-5 w-5" /> View website</Link>
          <button onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 opacity-85 hover:bg-hub-foreground/10"><LogOut className="h-5 w-5" /> Sign out</button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-foreground/40 md:hidden" onClick={() => setOpen(false)} />}
      <div className="min-w-0 flex-1 md:ml-72">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background px-4 md:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
          <span className="font-display text-xl font-bold text-hub">Prime Zone Hub</span>
        </header>
        <main className="mx-auto max-w-6xl p-5 md:p-10">
          {tab === "overview" && <Overview go={setTab} />}
          {tab === "properties" && <Properties />}
          {tab === "zones" && <Zones />}
          {tab === "agents" && <Agents />}
          {tab === "enquiries" && <Enquiries />}
          {tab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

function Title({ t, sub, action }: { t: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-4xl font-bold text-hub">{t}</h1>
        {sub && <p className="mt-1 text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Overview({ go }: { go: (t: Tab) => void }) {
  const c = useContent();
  const enq = useEnquiries();
  const value = c.properties.reduce((s, p) => s + (parsePrice(p.price) ?? 0), 0);
  const stats = [
    { label: "Total listings", v: String(c.properties.length), icon: Building2 },
    { label: "Available", v: String(c.properties.filter((p) => p.status !== "Sold Out").length), icon: Map },
    { label: "New enquiries", v: String(enq.filter((e) => e.status === "New").length), icon: Inbox },
    { label: "Portfolio value", v: formatNaira(value), icon: Wallet },
  ];
  return (
    <>
      <Title t="Welcome back" sub="Here's how Prime Zone looks today." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <div className="flex items-start justify-between"><p className="text-sm text-muted-foreground">{s.label}</p><s.icon className="h-6 w-6 text-hub" /></div>
            <p className="mt-4 font-display text-3xl font-bold">{s.v}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <div className="flex items-center justify-between"><h2 className="font-display text-2xl font-bold">Recent enquiries</h2><button onClick={() => go("enquiries")} className="text-sm font-semibold text-hub">View all</button></div>
        {enq.length === 0 ? <p className="py-8 text-center text-muted-foreground">No enquiries yet.</p> : (
          <ul className="mt-4 divide-y divide-border">
            {enq.slice(0, 5).map((e) => (
              <li key={e.id} className="flex items-center justify-between py-3 text-sm">
                <span><b>{e.name}</b> · {e.phone}{e.propertyRef && ` · ${e.propertyRef}`}</span>
                <StatusPill s={e.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

function StatusPill({ s }: { s: string }) {
  const cls = s === "New" || s === "Available" ? "bg-hub-active text-hub-active-foreground" : s === "Closed" || s === "Sold Out" ? "bg-hub text-hub-foreground" : "bg-gold text-gold-foreground";
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{s}</span>;
}

function useDraft() {
  const c = useContent();
  const update = (patch: Partial<SiteContent>) => saveContent({ ...c, ...patch });
  return { c, update };
}

function Properties() {
  const { c, update } = useDraft();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [edit, setEdit] = useState<Property | null>(null);
  const list = useMemo(() => c.properties.filter((p) =>
    (status === "all" || p.status === status) &&
    `${p.ref} ${p.title} ${p.location}`.toLowerCase().includes(q.trim().toLowerCase())), [c.properties, q, status]);

  const newProp = (): Property => ({
    id: `p-${Date.now()}`, ref: nextRef(c.properties), title: "", location: c.zones[0]?.name ?? "", type: "Residential Plot",
    price: "", size: "", image: c.layoutImage, description: "", features: [], status: "Available",
  });

  return (
    <>
      <Title t="Properties" sub={`${c.properties.length} listings in total`} action={<button className={btn} onClick={() => setEdit(newProp())}><Plus className="h-4 w-4" /> New property</button>} />
      <div className="space-y-3">
        <input className={`${inp} py-3.5`} placeholder="Search title, ref or area…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className={`${inp} py-3.5`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          {["Available", "Selling Fast", "Sold Out"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {list.length === 0 ? <p className="py-20 text-center text-lg text-muted-foreground">No listings match.</p> : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {list.map((p) => (
            <Card key={p.id} className="flex gap-4">
              <img src={p.image} alt="" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs font-bold text-hub">{p.ref}</p>
                <p className="truncate font-semibold">{p.title || "Untitled"}</p>
                <p className="text-sm text-muted-foreground">{p.location} · {parsePrice(p.price) ? formatNaira(parsePrice(p.price)!) : p.price}</p>
                <div className="mt-2 flex items-center gap-3">
                  <StatusPill s={p.status} />
                  <button onClick={() => setEdit(p)} className="text-hub" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => confirm(`Delete ${p.ref}?`) && update({ properties: c.properties.filter((x) => x.id !== p.id) })} className="text-destructive" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {edit && (
        <PropertyEditor p={edit} zones={c.zones.map((z) => z.name)} onClose={() => setEdit(null)}
          onSave={(p) => {
            const exists = c.properties.some((x) => x.id === p.id);
            update({ properties: ensureRefs(exists ? c.properties.map((x) => (x.id === p.id ? p : x)) : [p, ...c.properties]) });
            setEdit(null);
          }} />
      )}
    </>
  );
}

function PropertyEditor({ p: init, zones, onSave, onClose }: { p: Property; zones: string[]; onSave: (p: Property) => void; onClose: () => void }) {
  const [p, setP] = useState(init);
  const s = (patch: Partial<Property>) => setP({ ...p, ...patch });
  const priceNum = String(parsePrice(p.price) ?? "");
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 md:items-center" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-card p-6 md:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <div><p className="font-mono text-sm font-bold text-hub">REF: {p.ref}</p><h2 className="font-display text-2xl font-bold">{init.title ? "Edit property" : "New property"}</h2></div>
          <button onClick={onClose} aria-label="Close"><X /></button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2"><F label="Title" value={p.title} onChange={(v) => s({ title: v })} /></div>
          <label className="block text-sm"><span className="mb-1 block font-semibold">Price (₦ Naira)</span>
            <div className="flex items-center rounded-lg border border-input"><span className="px-3 font-semibold">₦</span>
              <input inputMode="numeric" className="w-full bg-transparent py-2.5 pr-3 text-sm outline-none" placeholder="e.g. 4500000 (blank = Negotiable)" value={priceNum}
                onChange={(e) => { const d = e.target.value.replace(/\D/g, ""); s({ price: d ? formatNaira(Number(d)) : "Negotiable" }); }} />
            </div>
          </label>
          <F label="Size" value={p.size} onChange={(v) => s({ size: v })} />
          <label className="text-sm"><span className="mb-1 block font-semibold">Zone / area</span>
            <select className={inp} value={p.location} onChange={(e) => s({ location: e.target.value })}>
              {[...new Set([...zones, p.location])].filter(Boolean).map((z) => <option key={z}>{z}</option>)}
            </select>
          </label>
          <F label="Title document" value={p.titleDoc ?? ""} onChange={(v) => s({ titleDoc: v })} />
          <label className="text-sm"><span className="mb-1 block font-semibold">Type</span>
            <select className={inp} value={p.type} onChange={(e) => s({ type: e.target.value as Property["type"] })}>
              {["Residential Plot", "Commercial Plot", "Joint Venture", "Estate Home"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="text-sm"><span className="mb-1 block font-semibold">Status</span>
            <select className={inp} value={p.status} onChange={(e) => s({ status: e.target.value as Property["status"] })}>
              {["Available", "Selling Fast", "Sold Out"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <div className="md:col-span-2"><F label="Image link" value={p.image} onChange={(v) => s({ image: v })} /></div>
          <div className="md:col-span-2"><F label="Description" value={p.description} onChange={(v) => s({ description: v })} area /></div>
          <div className="md:col-span-2"><F label="Features (comma separated)" value={p.features.join(", ")} onChange={(v) => s({ features: v.split(",").map((x) => x.trim()).filter(Boolean) })} /></div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-border px-5 py-3 text-sm">Cancel</button>
          <button onClick={() => p.title.trim() ? onSave(p) : alert("Please enter a title")} className={btn}>Save property</button>
        </div>
      </div>
    </div>
  );
}

function Zones() {
  const { c, update } = useDraft();
  const [name, setName] = useState("");
  const [areas, setAreas] = useState("");
  return (
    <>
      <Title t="Zones & Areas" sub="Group listings by Kano zone." />
      <Card>
        <form className="grid gap-3 md:grid-cols-[1fr_2fr_auto]" onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; update({ zones: [...c.zones, { name: name.trim(), areas }] }); setName(""); setAreas(""); }}>
          <input className={inp} placeholder="Zone name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={inp} placeholder="Areas covered" value={areas} onChange={(e) => setAreas(e.target.value)} />
          <button className={btn}><Plus className="h-4 w-4" /> Add zone</button>
        </form>
      </Card>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {c.zones.map((z) => (
          <Card key={z.name} className="flex items-center justify-between">
            <div><p className="font-semibold">{z.name}</p><p className="text-sm text-muted-foreground">{z.areas}</p>
              <p className="mt-1 text-xs text-hub">{c.properties.filter((p) => p.location === z.name).length} listings</p></div>
            <button onClick={() => confirm(`Remove ${z.name}?`) && update({ zones: c.zones.filter((x) => x.name !== z.name) })} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
          </Card>
        ))}
      </div>
    </>
  );
}

function Agents() {
  const { c, update } = useDraft();
  const [a, setA] = useState({ name: "", phone: "" });
  const setSales = (id: string, sales: number) => update({ agents: c.agents.map((x) => (x.id === id ? { ...x, sales: Math.max(0, sales) } : x)) });
  return (
    <>
      <Title t="Agents & Sales" sub="Track who is closing deals." />
      <Card>
        <form className="grid gap-3 md:grid-cols-[1fr_1fr_auto]" onSubmit={(e) => { e.preventDefault(); if (!a.name.trim()) return; update({ agents: [...c.agents, { id: `a-${Date.now()}`, name: a.name, phone: a.phone, sales: 0 }] }); setA({ name: "", phone: "" }); }}>
          <input className={inp} placeholder="Agent name" value={a.name} onChange={(e) => setA({ ...a, name: e.target.value })} />
          <input className={inp} placeholder="Phone" value={a.phone} onChange={(e) => setA({ ...a, phone: e.target.value })} />
          <button className={btn}><Plus className="h-4 w-4" /> Add agent</button>
        </form>
      </Card>
      <div className="mt-4 space-y-3">
        {[...c.agents].sort((x, y) => y.sales - x.sales).map((ag, i) => (
          <Card key={ag.id} className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-hub font-bold text-hub-foreground">{i + 1}</span>
            <div className="flex-1"><p className="font-semibold">{ag.name}</p><p className="text-sm text-muted-foreground">{ag.phone}</p></div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSales(ag.id, ag.sales - 1)} className="h-8 w-8 rounded-lg border border-border">−</button>
              <span className="w-16 text-center text-sm"><b>{ag.sales}</b> sales</span>
              <button onClick={() => setSales(ag.id, ag.sales + 1)} className="h-8 w-8 rounded-lg border border-border">+</button>
            </div>
            <button onClick={() => confirm("Remove agent?") && update({ agents: c.agents.filter((x) => x.id !== ag.id) })} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
          </Card>
        ))}
      </div>
    </>
  );
}

function Enquiries() {
  const list = useEnquiries();
  const [f, setF] = useState("all");
  const shown = list.filter((e) => f === "all" || e.status === f);
  const setStatus = (id: string, status: Enquiry["status"]) => saveEnquiries(list.map((e) => (e.id === id ? { ...e, status } : e)));
  return (
    <>
      <Title t="Enquiries" sub="Messages and inspection bookings from the website (saved on this browser)." />
      <select className={`${inp} mb-4 py-3.5`} value={f} onChange={(e) => setF(e.target.value)}>
        <option value="all">All statuses</option><option>New</option><option>Contacted</option><option>Closed</option>
      </select>
      {shown.length === 0 ? <p className="py-20 text-center text-lg text-muted-foreground">No enquiries yet.</p> : (
        <div className="space-y-3">
          {shown.map((e) => (
            <Card key={e.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{e.name} <span className="font-normal text-muted-foreground">· {e.phone}{e.email && ` · ${e.email}`}</span></p>
                <select className="rounded-lg border border-input bg-background px-2 py-1 text-sm" value={e.status} onChange={(ev) => setStatus(e.id, ev.target.value as Enquiry["status"])}>
                  <option>New</option><option>Contacted</option><option>Closed</option>
                </select>
              </div>
              {e.propertyRef && <p className="mt-1 font-mono text-xs font-bold text-hub">REF: {e.propertyRef}</p>}
              <p className="mt-2 text-sm">{e.message}</p>
              <p className="mt-2 text-xs text-muted-foreground">{new Date(e.date).toLocaleString()}</p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function SettingsTab() {
  const stored = useContent();
  const [d, setD] = useState<SiteContent>(stored);
  const [msg, setMsg] = useState("");
  useEffect(() => setD(stored), [stored]);
  const set = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => setD({ ...d, [k]: v });
  return (
    <>
      <Title t="Site settings" sub="Contact details, text and images." action={
        <div className="flex flex-wrap items-center gap-2">
          {msg && <span className="text-sm text-hub">{msg}</span>}
          <button onClick={() => { const b = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "content.json"; a.click(); }} className="rounded-xl border border-border px-4 py-3 text-sm">Export</button>
          <label className="cursor-pointer rounded-xl border border-border px-4 py-3 text-sm">Import
            <input type="file" accept="application/json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setD({ ...defaultContent, ...JSON.parse(await f.text()) }); }} />
          </label>
          <button onClick={() => { if (confirm("Restore all original content?")) resetContent(); }} className="rounded-xl border border-border px-4 py-3 text-sm">Reset</button>
          <button onClick={() => { saveContent(d); setMsg("Saved!"); setTimeout(() => setMsg(""), 2500); }} className={btn}>Save changes</button>
        </div>
      } />
      <div className="space-y-6">
        <Card className="grid gap-4 md:grid-cols-2">
          <h2 className="font-display text-2xl font-bold md:col-span-2">Contact details</h2>
          <F label="Primary phone (also WhatsApp)" value={d.phonePrimary} onChange={(v) => set("phonePrimary", v)} />
          <F label="Second phone" value={d.phoneSecondary} onChange={(v) => set("phoneSecondary", v)} />
          <F label="Email" value={d.email} onChange={(v) => set("email", v)} />
          <F label="Instagram link" value={d.instagram} onChange={(v) => set("instagram", v)} />
          <div className="md:col-span-2"><F label="Office address" value={d.address} onChange={(v) => set("address", v)} /></div>
        </Card>
        <Card className="grid gap-4">
          <h2 className="font-display text-2xl font-bold">Home & About text</h2>
          <F label="Hero headline" value={d.heroHeadline} onChange={(v) => set("heroHeadline", v)} />
          <F label="Hero sub-headline" value={d.heroSubheadline} onChange={(v) => set("heroSubheadline", v)} area />
          <F label="Quote" value={d.quote} onChange={(v) => set("quote", v)} />
          <F label="Quote explanation" value={d.quoteBody} onChange={(v) => set("quoteBody", v)} area />
          <F label="About us text" value={d.aboutText} onChange={(v) => set("aboutText", v)} area />
        </Card>
        <Card className="grid gap-4">
          <h2 className="font-display text-2xl font-bold">Images (paste image links)</h2>
          <F label="Home banner image" value={d.heroImage} onChange={(v) => set("heroImage", v)} />
          <F label="Layout / aerial image" value={d.layoutImage} onChange={(v) => set("layoutImage", v)} />
          <F label="CEO photo" value={d.ceoImage} onChange={(v) => set("ceoImage", v)} />
        </Card>
      </div>
    </>
  );
}
