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

import { monthlyInstalment, parsePrice } from "@/lib/content";
describe("payment plan", () => {
  it("30% deposit over 12 months on ₦4,500,000", () => {
    expect(parsePrice("₦4,500,000")).toBe(4500000);
    expect(monthlyInstalment(4500000, 30, 12)).toBe(262500);
  });
  it("negotiable price is not numeric", () => {
    expect(parsePrice("Negotiable")).toBeNull();
  });
});
