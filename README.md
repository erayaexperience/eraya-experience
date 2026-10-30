# Eraya Experience

Marketing website for **Eraya Experience**, a creative and digital marketing agency based in Porvorim, Goa, working with brands across India and worldwide.

**Live:** [eraya-experience.vercel.app](https://eraya-experience.vercel.app) · **Domain:** [erayaexperience.com](https://erayaexperience.com)

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, fully static output), React 19, TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) with custom utilities in `src/app/globals.css` |
| Motion | [Framer Motion](https://motion.dev), [GSAP](https://gsap.com) ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) smooth scrolling |
| UI | Radix Select, Swiper, React Icons |
| Forms | [Web3Forms](https://web3forms.com) (no backend required) |
| Hosting | [Vercel](https://vercel.com) |

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` in the project root (it is git-ignored):

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-key
NEXT_PUBLIC_SITE_URL=https://erayaexperience.com
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Delivers contact-form submissions by email. Without it the form shows an error instead of sending. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, the sitemap, Open Graph images and structured data. Falls back to the Vercel production URL, then to `https://erayaexperience.com`. |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint (Next.js core-web-vitals and TypeScript rules) |
| `npm run typecheck` | Type-check with TypeScript |

> Don't run `npm run build` while the dev server is running. Both share the `.next` folder, and the dev server will serve stale styles. Stop the dev server, delete `.next`, then build.

## Project structure

```
src/
├── app/            Layout, page, global styles, metadata routes (robots, sitemap, manifest, icons, OG image)
├── components/     One file per page section, plus site-wide pieces (navigation, footer, cursor, smooth scroll)
│   └── ui/         Shared primitives (button, inputs, select, lightbox, section heading, parallax media, shader)
├── constants/      All page content: services, case studies, events, creators, testimonials, FAQ, contact
└── lib/            Site config (site.ts), structured data, motion presets, Lenis helpers, utilities
public/             Images, videos, llms.txt, press PDF
```

Content lives in `src/constants`, and business details (name, contact, socials, address) live in one place, `src/lib/site.ts`. Metadata, structured data, the footer and the contact section all read from it.

## Design system

### Liquid glass

Every glass surface uses one shared set of Tailwind utilities, defined in `globals.css`:

| Utility | Use |
| --- | --- |
| `glass` | Base: backdrop blur, saturation and rim highlight (all tunable with CSS variables) |
| `glass-clear` | Controls on top of imagery (navbar capsule, buttons) |
| `glass-cream`, `glass-panel` | Tinted glass behind text (menus, dropdowns) |
| `glass-gold`, `glass-gold-light` | Brand-gold accents |

`LiquidGlassFilter` (`src/components/liquid-glass-filter.tsx`) adds Apple-style edge refraction on Chromium browsers. For each glass element it builds a small, size-cached displacement map and wires it in through an SVG `feDisplacementMap`. On-screen elements are processed before first paint and the rest during idle time. Other browsers fall back to the plain blur.

Two rules keep glass working:

- **Never put a glass element inside a parent with `backdrop-filter`, `filter`, `opacity < 1`, `mask` or `clip-path`.** The parent becomes the backdrop root and the glass can no longer see the page behind it. Put the parent's glass on a separate background layer instead (see the navbar), and animate opacity on the glass element itself, not on a wrapper.
- **Nested corners use `rounded-nest`** (outer radius = inner radius + padding), driven by the `--inner` and `--pad` variables.

### Motion

- A vector logo intro plays on load. Scrolling and clicks are locked until it finishes.
- The hero stays pinned while KPIs and About slide over it.
- Scroll-linked parallax, a custom cursor (fine pointers only) and a WebGL footer shader that pauses when off screen.

## SEO, AEO and GEO

- Static rendering, a single `h1`, descriptive alt text on every image, canonical URL, Open Graph and Twitter cards.
- JSON-LD graph (`src/lib/structured-data.ts`): `WebSite`, `WebPage`, `Organization` + `ProfessionalService`, founders (`Person`) and `FAQPage`, including services, areas served (Goa, India, worldwide) and social profiles.
- `robots.txt` explicitly allows search and AI crawlers (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Applebot and others).
- `public/llms.txt` gives AI assistants a plain-text summary of the agency.
- `sitemap.xml` is generated at build time.

## Deployment

The `main` branch deploys automatically to Vercel. Set the environment variables above in the Vercel project settings. After connecting the custom domain, submit `https://erayaexperience.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.

## License

Proprietary. © Eraya Experience LLP. All rights reserved.
