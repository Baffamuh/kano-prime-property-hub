# Kano Prime Property Hub

Create a modern, clean, premium real estate agency website for "Prime Zone Estates Ltd", a major real estate development and property marketing firm based in Kano, Nigeria. The website must look professional, trustworthy, and high-end, utilizing a responsive layout with sharp geometric sections and smooth navigation. Use the attached company logo for the branding.

Target Audience: Local property investors, land buyers, joint-venture seekers, and diaspora Nigerians wanting secure investments in Kano. 

Deployment & Technical Constraints (Strict Zero-Budget Environment):
- The application will be deployed for free on Vercel. 
- Ensure the codebase is fully optimized for a standard, zero-config Vercel deployment (clean package.json scripts, standard framework configurations, and error-free TypeScript/JavaScript compilation).
- Absolutely zero external API integration or premium third-party dependencies that require paid subscriptions, API keys, credits, tokens, or usage meters now or in the future.
- All dynamic features must be simulated or handled strictly client-side using local state to guarantee 100% free operation indefinitely.

Non-Technical Admin Control Dashboard (No Developer Needed for Content Updates):
- Implement a protected client-side "/admin" route or a local login modal. 
- Build a fully functional, simple client-side Admin Control Panel where a non-technical admin can independently manage the website without a developer. 
- The admin dashboard must allow editing of: phone numbers, the home page text, adding/removing property listings, updating land prices, and pasting new Unsplash/Instagram image URLs.
- To maintain a 100% free architecture, have the system save these dashboard updates locally using browser state / localStorage, or read them from a single central 'content.json' file that the admin can easily update via Lovable's interface. The developer should only be required for deep technical infrastructure support.

Image Style Requirements (Integrate Free Unsplash Placeholders):
- Hero Banner Image: Use a high-quality free asset matching "modern two-story architectural house exterior, luxury residential development with interlocking tile driveway".
- Properties/Layouts Images: Use an asset matching "aerial drone view of suburban land development master plan layout".
- About Us/CEO Image: Use a professional profile placeholder matching "confident young African male entrepreneur or real estate executive portrait".

Implement the following page sections and features:

1. Navigation Bar & Floating Elements:
   - Header with logo placeholder and links to Home, Properties, Services, About Us, Contact.
   - A floating, sticky action button linking directly to WhatsApp using the primary contact number: https://wa.me (This completely bypasses any paid chat widget/API needs).

2. Home Page:
   - Hero Section: Headline: "Turning Your Real Estate Dreams into Reality." Subheadline: "Secure, verified land and modern estate layouts in the heart of Kano." Include the premium house exterior image background. CTAs: "View Available Plots" and "Contact an Expert".
   - Quote Callout Banner: Highlight the company's core philosophy: "Buy the bush, sell the city." Frame it as an investment insight for salary earners looking to build passive wealth.
   - Stats Section: Interactive quick counters displaying "100+ Properties Sold", "Verified Certificates of Occupancy", and "Secure Planned Layouts".

3. Properties / Projects Section (Grid Layout):
   - Active Real Estate Feature: Showcase "BUK New Site / Gwarzo Road Layouts". 
   - Details to include on property cards: High-value residential development plots, proximity to Bayero University Kano New Site, layout features (electricity access, access roads, and pre-verified title documents / occupancy permits).
   - Implement a simple search/filter component to sort listings by location or investment type, handled entirely via client-side code without external database APIs.

4. Services Section:
   - Provide three clean feature cards detailing:
     * Residential Land Sales: Premium estate plots with verified documentation.
     * Joint Venture (JV) Real Estate Partnerships: Collaboration on property development projects.
     * Layout Design & Investment Advisory: Professional property consulting for wealth building.

5. About Us Section:
   - Text Content: Tell the story of Prime Zone Estates Ltd as an organization dedicated to modernizing Kano's real estate market through secure, transparent property development.
   - Leadership Spotlight: Feature the Chairman & CEO, Muhsin Ibrahim Abubakar (widely known on social media as "Muhsin Estate Expert"), emphasizing his deep local market expertise and proven real estate track record. Include a link placeholder to his Instagram profile: https://instagram.com

6. Contact Us Section:
   - Client-Side Contact Form: Collects Name, Email, Phone Number, and Message. Handle form submissions strictly on the frontend (e.g., display a highly styled, native success modal on submit) without using external paid form APIs or backend email servers.
   - Office Address Details: No 25 Sulaiman Crescent, beside Ni'imah Hotel, Nasarawa GRA, Kano State, Nigeria.
   - Phone Numbers: 07036722139 and 07078444344.
   - Map View: Insert a static or free client-side iframe placeholder focused on the Nasarawa GRA region in Kano instead of calling the premium Google Maps API.

Ensure all layout components, typography, and color schemes reflect a premium, reliable corporate brand. Optimize the initial pages for search terms like "Real estate developer in Kano" and "Land for sale near BUK New Site".

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kano-prime-property-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6db826ab-1ae5-4562-9067-b23950129654).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
