import { describe, expect, it } from "vitest";
import { defaultContent, filterProperties, waLink } from "@/lib/content";

describe("content rules", () => {
  it("WhatsApp link converts Nigerian number to 234 format", () => {
    expect(waLink("07036722139").startsWith("https://wa.me/2347036722139")).toBe(true);
  });
  it("filters properties by location", () => {
    const r = filterProperties(defaultContent.properties, "Gwarzo Road", "all", "");
    expect(r.every((p) => p.location === "Gwarzo Road")).toBe(true);
    expect(r.length).toBe(2);
  });
});
