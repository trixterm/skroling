# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling & commands

### Install dependencies

This project uses `npm` (a `package-lock.json` is present).

- Install: `npm install`

### Run the development server

- Start dev server (Next.js with Turbopack on port 3000):
  - `npm run dev`

### Build and run in production

- Build optimized production bundle:
  - `npm run build`
- Start the production server (after `npm run build`):
  - `npm run start`

### Linting

ESLint is configured via `eslint.config.mjs` using Next.js core web vitals + TypeScript presets.

- Run lint over the whole project:
  - `npm run lint`

### Bundle analysis (optional)

`next.config.ts` conditionally enables `webpack-bundle-analyzer` when `ANALYZE=true`.

- Generate a static bundle report:
  - `ANALYZE=true npm run build`

### Tests

There is currently **no** `test` script or test framework configured in `package.json`. If a test runner is added (e.g. Jest, Vitest, Playwright), update this section with commands for running the full suite and individual tests.

---

## Application architecture

### Framework, routing & entrypoints

- The app uses **Next.js App Router** (Next 16) with the root at `app/`.
- Global layout and metadata live in `app/layout.tsx`:
  - Loads local "Rothek" font and Google Montserrat via `next/font`.
  - Configures global `Metadata` and `Viewport` (Open Graph, Twitter, robots, etc.).
  - Wraps all pages with `BodyClassProvider` and `ClientLayoutWrapper`.
- Top-level routes are implemented as folders under `app/` with `page.tsx` files, e.g.:
  - `app/page.tsx` – landing page; composes `HeroHomeSection`, `WorkSection`, `ServicesSection`, `ResultsSection`, `TestimonialsSection`.
  - `app/home/page.tsx` – alternate home route using the same section components with a slightly different reveal composition.
  - `app/about/page.tsx`, `app/services/page.tsx`, `app/work/page.tsx`, `app/contact/page.tsx`, `app/testing/page.tsx` – additional pages.
- 404 handling is implemented in `app/not-found.tsx`.

### Global layout, theming & body classes

**ClientLayoutWrapper (`app/ClientLayoutWrapper.tsx`)**

This is the main client-side layout wrapper applied around all route content:

- Wraps everything with `PageTransition` (`components/animations/PageTransition.tsx`) to drive route change animations.
- Wraps with `SmoothScroll` (`components/SmoothScroll.tsx`), which initializes **Lenis** smooth scrolling and exposes the instance as `window.__lenis` for use by scroll-based animations.
- Provides `AnimationProvider` context (`context/AnimationContext.tsx`) for sharing simple animation state (`introFinished`) between components.
- Renders global chrome:
  - `Header` (desktop header with logo, navigation, and theme toggle).
  - `MobileHeader` (mobile navigation).
  - Main content `<main id="main-content">{children}</main>`.
  - `FooterSection` (hidden on the `/contact` route).
  - Cursor-related overlay components `CursorOpen` and `CursorTopNav` (dynamically imported and disabled on the server).

**BodyClassProvider (`app/BodyClassProvider.tsx`)**

- Listens to `usePathname()` and sets a single `page-*` class on `<body>` derived from the current route.
- Format:
  - `/` → `page-home`
  - `/work` → `page-work`
  - `/about/team` → `page-about-team`
- When adding route-specific styling, prefer targeting these `page-*` classes rather than hard-coding paths elsewhere.

**Theming (`components/ThemeToggle.tsx` and `HeroHomeSection`)**

- Theme is controlled via a `dark` class on `<html>` plus Tailwind / custom CSS.
- `ThemeToggle`:
  - Reads `localStorage.theme` on mount (defaults to `"dark"`).
  - Toggles `document.documentElement.classList` (`dark` on/off) and persists `localStorage.theme`.
- `HeroHomeSection` (`components/sections/HeroHomeSection.tsx`) ties into theme state:
  - Uses `localStorage.hero_animation_seen` and `localStorage.theme` to decide whether to play an initial "flashlight" reveal animation.
  - On first visit, forces dark mode and interactive reveal; once finished, sets `theme="light"`, removes `dark`, and marks `hero_animation_seen="true"`.
- When changing theming or the hero behavior, keep these localStorage keys and the `dark`-class contract in sync.

### Navigation & site configuration

**Site configuration (`config/site.config.ts`)**

- Central config for site metadata and navigation (`SiteConfig` and `siteConfig`):
  - `siteName`, `domain`, `about`, SEO keywords, default OpenGraph/Twitter image, etc.
  - `links` (website, GitHub, LinkedIn, tips, email).
  - `social` link definitions.
  - `navigation`: the canonical nav items for the main menu.
- `buildMetadata(overrides)` builds a consistent `Metadata` object for routes based on `siteConfig.seo`. Route files can call this helper when defining their `metadata` export.

**Navbar (`components/Navbar.tsx`, `Header.tsx`, `NavbarWrapper.tsx`)**

- `Navbar`:
  - Reads `siteConfig.navigation` and renders a pill-style top navigation bar.
  - Uses `useSelectedLayoutSegment()` to mark an item as active; `/` is considered active when the segment is `null`.
- `Header` renders `Logo`, `NavbarWrapper` (which currently just mounts `Navbar`), and `ThemeToggle` into a fixed top header on desktop.
- When adding/removing main navigation routes, update `siteConfig.navigation` and provide a matching `app/<route>/page.tsx` so the nav doesn’t link to 404s.

### Page sections, animations & scroll system

The UX is built out of reusable **sections** and **animation wrappers**.

**Sections (`components/sections/*`)**

- Page-level content is broken into semantic sections, e.g.:
  - `HeroHomeSection`, `WorkSection`, `ServicesSection`, `ResultsSection`, `TestimonialsSection`, `ExperienceSection`, `MyExpertiseSection`, `FaqSection`, `FooterSection`, `FooterSection2`, etc.
- These section components are composed into route pages (e.g. `app/page.tsx`, `app/home/page.tsx`, `app/contact/page.tsx`).
- Many sections delegate micro-interactions to animation components under `components/animations/`.

**Scroll & transition infrastructure**

- `SmoothScroll` (Lenis):
  - Instantiated once at the root of `ClientLayoutWrapper`.
  - Drives smooth scrolling via `requestAnimationFrame` and a `ResizeObserver`.
  - Exposes the Lenis instance on `window.__lenis` for integrations (e.g. GSAP ScrollTrigger that needs to respond to virtual scroll positions).

- `PageTransition` (`components/animations/PageTransition.tsx`):
  - Global route transition controller.
  - Intercepts document-level click events on internal `<a>` elements:
    - Skips external links (`http`, `mailto:`, `tel:`), hash links (`#...`), and links that open in a new tab or are marked `rel="external"`.
  - Orchestrates multiple phases (`idle → contentFadingOut → entering → holding → exiting → contentFadingIn`) using timers and a CSS module (`PageTransition.module.css`).
  - Overlays a full-screen colored layer while pushing the next route and fades the new content in as the overlay exits.
- When adding links that should **not** trigger page transitions (e.g. in-page anchors), ensure they meet one of the skip conditions above.

**GSAP-based reveal effects**

- `components/Reveal.tsx` and `components/animations/SectionReveal.tsx` are simple wrappers that:
  - Use `useEffect` + `gsap` + `ScrollTrigger` to animate children into view on scroll (opacity, `y`, blur, etc.).
- Many animation components under `components/animations/` follow this pattern:
  - `ServicesReveal`, `WorkCardsAnimation`, `VideoExpandAnimation`, etc. encapsulate GSAP/ScrollTrigger logic for specific sections.
- Some heavier animations (e.g. `VideoExpandAnimation`) are **lazily imported** from sections like `ServicesSection` to keep the initial JS bundle smaller.
- `next.config.ts` sets `reactStrictMode: false` specifically to avoid conflicts between GSAP’s DOM manipulations (e.g. `ScrollTrigger` pinning) and React’s strict double-invocation of effects. If you re-enable strict mode, review GSAP usage carefully.

### Contact & email flow

There are two parallel email mechanisms; the primary one is built around Next.js **server actions**.

**Server action–based contact flow (`actions/contact.ts` + `ContactForm` / `ContactForm2`)**

- `types/contact.ts` defines the shared types:
  - `ContactFormData`, `FormErrors`, and `SubmissionResponse`.
- `actions/contact.ts` implements `submitContactForm(data: ContactFormData)` (server action):
  - Validates fields (name, email format, project details length, at least one service).
  - Sanitizes user inputs to strip angle brackets and limit length.
  - Sends an email via `Resend` using environment variables:
    - `RESEND_API_KEY` – API key for Resend.
    - `EMAIL_FROM` – sender address (defaults to `onboarding@resend.dev` if unset).
    - `EMAIL_TO` – recipient address.
  - Returns a structured `SubmissionResponse` with `success`, `message`, optional field-level `errors`, and an `emailId` if available.
- `components/ContactForm.tsx` and `components/ContactForm2.tsx` are two client-side form UIs that call `submitContactForm`:
  - Manage `status` (`idle | submitting | success | error`) and show inline validation errors based on `FormErrors`.
  - `ContactForm2` uses a reduced local state (`MinimalFormData`) and supplies default values for fields like `nameSurname` when building a full `ContactFormData` payload.
- The `/contact` page (`app/contact/page.tsx`) wraps `ContactForm2` in a GSAP-driven message intro:
  - Animated avatar, SVG border drawing, typewriter text, and sound effect (audio from `/pop-alert.mp3`).
  - Once the intro finishes, the contact form fades/slides into view.

**Legacy API route (`app/api/contact/route.ts`)**

- Separate `/api/contact` POST endpoint using **Nodemailer** directly:
  - Reads `name`, `email`, `message` from the JSON body.
  - Sends via SMTP using environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `TO_EMAIL`.
- This appears to be an alternative/older implementation alongside the Resend-based server action. If you consolidate email handling, ensure you update or remove this route and its associated environment variables accordingly.

**Standalone Resend helper (`lib/resend.ts`)**

- Simple `"use server"` helper that instantiates `Resend` with `RESEND_API_KEY` and exposes `sendEmail()` which sends a hard-coded test email.
- Currently not wired into the main contact flow; treat as an experimental utility or remove if no longer needed.

### Styling, assets & utilities

- **Global styles**:
  - `app/globals.css` holds global CSS, including classes used by sections, headers, cursors, and theme-related styles.
- **Tailwind**:
  - Configured in `tailwind.config.js` with `content` spanning `app/**/*.{js,ts,jsx,tsx}` and `components/**/*.{js,ts,jsx,tsx}`.
  - Some components rely more on custom class names than pure utility classes, but Tailwind is available for utility styling.
- **Fonts & assets**:
  - Local Rothek font variants are stored in `public/fonts/Trial-Rothek/*` and registered via `localFont` in `app/layout.tsx` as CSS variable `--font-roth`.
  - Images, videos, and other media are under `public/images`, `public/videos`, and `public/scripts`.
- **Utility functions**:
  - `lib/utils.ts` defines `cn(...inputs)` (Tailwind-aware class name merge using `clsx` + `tailwind-merge`).

### TypeScript, linting & module resolution

- **TypeScript config (`tsconfig.json`)**:
  - `strict: true`, `noEmit: true`, `moduleResolution: "bundler"`, JSX set to `react-jsx`.
  - Path alias: `@/*` → project root (`./*`). Most imports in the app (e.g. `@/components/...`, `@/config/site.config`) use this alias.
- **ESLint (`eslint.config.mjs`)**:
  - Uses `eslint-config-next` presets (`core-web-vitals` + TypeScript) with explicit global ignores for `.next`, `out`, `build`, and `next-env.d.ts`.

### Performance & bundling specifics (Next.js config)

Key points from `next.config.ts` that affect how you work in this codebase:

- `reactStrictMode` is disabled due to GSAP ScrollTrigger + React concurrency issues.
- `compiler.removeConsole` strips console logs in production builds except `console.error` and `console.warn`.
- `images` config enables AVIF/WEBP output, sets device/image sizes, and applies strict CSP settings for optimized images.
- `experimental.optimizePackageImports` is enabled for (`"gsap"`, `"swiper"`, `"lucide-react"`, `"@/components"`) to reduce bundle size; when importing from these libraries, prefer named imports so this optimization is effective.
- Custom `webpack` config in production:
  - Deterministic module IDs, single runtime chunk, and tuned `splitChunks` cache groups.
  - Separate vendor chunks for `node_modules`, `gsap`, and `swiper`.
- Static asset and Next.js static chunks (`/_next/static/...`) are served with aggressive long-term caching headers.

When making structural or performance-sensitive changes (especially around animations, routing, or imports from large libraries like GSAP and Swiper), review `next.config.ts` and the existing animation infrastructure to keep behavior and bundle size consistent.
