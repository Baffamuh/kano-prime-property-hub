import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { useContent } from "@/lib/content";
import { PageHeader } from "@/components/site-shell";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Prime Zone Estates — Nasarawa GRA, Kano" },
      { name: "description", content: "Visit us at No 25 Sulaiman Crescent, Nasarawa GRA, Kano or call 07036722139 to buy land near BUK New Site." },
      { property: "og:title", content: "Contact Prime Zone Estates Ltd" },
      { property: "og:description", content: "Speak to a Kano real estate expert today." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const field = "h-12 w-full border border-input bg-background px-4 text-sm focus:border-primary focus:outline-none";

function Contact() {
  const c = useContent();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const r = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    form.reset();
    setDone(true);
  }

  return (
    <>
      <PageHeader eyebrow="Contact us" title="Let's find your next property." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2">
        <form onSubmit={submit} noValidate className="space-y-4">
          {(["name", "email", "phone"] as const).map((n) => (
            <div key={n}>
              <input name={n} type={n === "email" ? "email" : n === "phone" ? "tel" : "text"} placeholder={n === "name" ? "Full name" : n === "email" ? "Email address" : "Phone number"} className={field} />
              {errors[n] && <p className="mt-1 text-xs text-destructive">{errors[n]}</p>}
            </div>
          ))}
          <div>
            <textarea name="message" rows={5} placeholder="How can we help?" className={`${field} h-auto py-3`} />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button className="bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-primary/90">Send message</button>
        </form>
        <div className="space-y-6">
          <div className="space-y-4 border-l-4 border-gold bg-muted p-8">
            <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" />{c.address}</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" />
              <a href={`tel:${c.phonePrimary}`} className="hover:underline">{c.phonePrimary}</a> ·
              <a href={`tel:${c.phoneSecondary}`} className="hover:underline">{c.phoneSecondary}</a>
            </p>
            <p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" />{c.email}</p>
          </div>
          <iframe
            title="Map of Nasarawa GRA, Kano"
            className="h-80 w-full border border-border"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=8.5250%2C11.9850%2C8.5600%2C12.0100&layer=mapnik&marker=11.9975%2C8.5425"
          />
        </div>
      </section>
      <Dialog open={done} onOpenChange={setDone}>
        <DialogContent className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-gold" />
          <DialogTitle className="font-display text-3xl">Message received</DialogTitle>
          <DialogDescription>Thank you for reaching out. A Prime Zone property expert will contact you shortly. For a faster response, call {c.phonePrimary}.</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
