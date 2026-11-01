import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { defaultContent, resetContent, saveContent, useContent, type Property, type SiteContent } from "@/lib/content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Prime Zone Estates" },
      { name: "description", content: "Site content control panel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

// Simple client-side passcode. Change it here. Not a substitute for real security.
const PASSCODE = "primezone2026";
const inp = "w-full border border-input bg-background px-3 py-2 text-sm";

function F({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold">{label}</span>
      {area ? <textarea rows={3} className={inp} value={value} onChange={(e) => onChange(e.target.value)} /> : <input className={inp} value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

function Admin() {
  const stored = useContent();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [d, setD] = useState<SiteContent>(stored);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setAuthed(sessionStorage.getItem("pz-admin") === "1");
  }, []);
  useEffect(() => setD(stored), [stored]);

  if (!authed)
    return (
      <section className="mx-auto max-w-sm px-5 py-24">
        <h1 className="font-display text-4xl">Admin sign in</h1>
        <div className="mt-6 border border-gold bg-gold/10 p-4 text-sm">
          <p className="font-bold uppercase tracking-wider text-primary">Demo login</p>
          <p className="mt-2">Username: <code className="font-semibold">admin</code></p>
          <p>Passcode: <code className="font-semibold">{PASSCODE}</code></p>
          <button type="button" onClick={() => { setUser("admin"); setPass(PASSCODE); }} className="mt-3 bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Fill demo details</button>
        </div>
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (user.trim().toLowerCase() === "admin" && pass === PASSCODE) { sessionStorage.setItem("pz-admin", "1"); setAuthed(true); }
            else setMsg("Wrong username or passcode");
          }}
        >
          <input className={inp} placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} />
          <input type="password" className={inp} placeholder="Passcode" value={pass} onChange={(e) => setPass(e.target.value)} />
          {msg && <p className="text-sm text-destructive">{msg}</p>}
          <button className="w-full bg-primary py-3 font-semibold text-primary-foreground">Enter</button>
        </form>
      </section>
    );

  const set = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => setD({ ...d, [k]: v });
  const setP = (i: number, patch: Partial<Property>) => set("properties", d.properties.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  const save = () => { saveContent(d); setMsg("Saved! Changes are live on this browser."); setTimeout(() => setMsg(""), 3000); };

  return (
    <section className="mx-auto max-w-5xl space-y-10 px-5 py-14">
      <div className="sticky top-20 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background py-4">
        <h1 className="font-display text-4xl">Control Panel</h1>
        <button onClick={() => { sessionStorage.removeItem("pz-admin"); setAuthed(false); }} className="text-sm text-muted-foreground underline">Sign out</button>
        <div className="flex flex-wrap items-center gap-2">
          {msg && <span className="text-sm text-primary">{msg}</span>}
          <button onClick={() => { const b = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "content.json"; a.click(); }} className="border border-border px-4 py-2 text-sm">Export</button>
          <label className="cursor-pointer border border-border px-4 py-2 text-sm">Import
            <input type="file" accept="application/json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setD({ ...defaultContent, ...JSON.parse(await f.text()) }); }} />
          </label>
          <button onClick={() => { if (confirm("Restore all original content?")) resetContent(); }} className="border border-border px-4 py-2 text-sm">Reset</button>
          <button onClick={save} className="bg-primary px-6 py-2 font-semibold text-primary-foreground">Save changes</button>
        </div>
      </div>

      <div className="grid gap-4 border border-border p-6 md:grid-cols-2">
        <h2 className="font-display text-2xl md:col-span-2">Contact details</h2>
        <F label="Primary phone (also WhatsApp)" value={d.phonePrimary} onChange={(v) => set("phonePrimary", v)} />
        <F label="Second phone" value={d.phoneSecondary} onChange={(v) => set("phoneSecondary", v)} />
        <F label="Email" value={d.email} onChange={(v) => set("email", v)} />
        <F label="Instagram link" value={d.instagram} onChange={(v) => set("instagram", v)} />
        <div className="md:col-span-2"><F label="Office address" value={d.address} onChange={(v) => set("address", v)} /></div>
      </div>

      <div className="grid gap-4 border border-border p-6">
        <h2 className="font-display text-2xl">Home & About text</h2>
        <F label="Hero headline" value={d.heroHeadline} onChange={(v) => set("heroHeadline", v)} />
        <F label="Hero sub-headline" value={d.heroSubheadline} onChange={(v) => set("heroSubheadline", v)} area />
        <F label="Quote" value={d.quote} onChange={(v) => set("quote", v)} />
        <F label="Quote explanation" value={d.quoteBody} onChange={(v) => set("quoteBody", v)} area />
        <F label="About us text" value={d.aboutText} onChange={(v) => set("aboutText", v)} area />
      </div>

      <div className="grid gap-4 border border-border p-6">
        <h2 className="font-display text-2xl">Images (paste image links)</h2>
        <F label="Home banner image" value={d.heroImage} onChange={(v) => set("heroImage", v)} />
        <F label="Layout / aerial image" value={d.layoutImage} onChange={(v) => set("layoutImage", v)} />
        <F label="CEO photo" value={d.ceoImage} onChange={(v) => set("ceoImage", v)} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Property listings</h2>
          <button
            onClick={() => set("properties", [{ id: crypto.randomUUID(), title: "New property", location: "BUK New Site", type: "Residential Plot", price: "₦0", size: "", image: d.layoutImage, description: "", features: ["Electricity access"], status: "Available" }, ...d.properties])}
            className="flex items-center gap-1 bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground"
          ><Plus className="h-4 w-4" /> Add property</button>
        </div>
        {d.properties.map((p, i) => (
          <div key={p.id} className="grid gap-3 border border-border p-5 md:grid-cols-[120px_1fr]">
            <img src={p.image} alt="" className="aspect-square w-full object-cover" />
            <div className="grid gap-3 md:grid-cols-2">
              <F label="Title" value={p.title} onChange={(v) => setP(i, { title: v })} />
              <F label="Price" value={p.price} onChange={(v) => setP(i, { price: v })} />
              <F label="Location" value={p.location} onChange={(v) => setP(i, { location: v })} />
              <F label="Size" value={p.size} onChange={(v) => setP(i, { size: v })} />
              <F label="Title document (e.g. C of O, R of O)" value={p.titleDoc ?? ""} onChange={(v) => setP(i, { titleDoc: v })} />
              <label className="text-sm"><span className="mb-1 block font-semibold">Type</span>
                <select className={inp} value={p.type} onChange={(e) => setP(i, { type: e.target.value as Property["type"] })}>
                  {["Residential Plot", "Commercial Plot", "Joint Venture", "Estate Home"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="text-sm"><span className="mb-1 block font-semibold">Status</span>
                <select className={inp} value={p.status} onChange={(e) => setP(i, { status: e.target.value as Property["status"] })}>
                  {["Available", "Selling Fast", "Sold Out"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <div className="md:col-span-2"><F label="Image link" value={p.image} onChange={(v) => setP(i, { image: v })} /></div>
              <div className="md:col-span-2"><F label="Description" value={p.description} onChange={(v) => setP(i, { description: v })} area /></div>
              <div className="md:col-span-2"><F label="Features (comma separated)" value={p.features.join(", ")} onChange={(v) => setP(i, { features: v.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
              <button onClick={() => confirm("Remove this property?") && set("properties", d.properties.filter((_, j) => j !== i))} className="flex items-center gap-1 justify-self-start text-sm text-destructive">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
