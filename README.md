# Samprec Consultants — samprecconsultants.com

Corporate flagship for **Samprec Consultants Limited**, unifying the consultancy, **Samprec Digitals** and **Samprec Academy**.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript 5 (strict) · Tailwind CSS 4 · Framer Motion · lucide-react · self-hosted fonts (Space Grotesk, Inter, JetBrains Mono via Fontsource, so no Google Fonts call at build time).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots. |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` / `PAYSTACK_SECRET_KEY` | Optional. Enables online payment in the Academy enrolment wizard for any course with `feeNaira` set. Payments are verified server-side (`/api/paystack/verify`) against the course fee × seats before confirmation. |
| `FORMS_WEBHOOK_URL` | Optional. Proposal-wizard and enrolment submissions are POSTed here as JSON (Zapier, Make, Formspree, your own API). If unset, forms open the visitor's email client pre-filled to info@samprecconsultants.com.ng, and a WhatsApp hand-off is offered. |

> Keep TypeScript on 5.x. Next 15 cannot load its config with TypeScript 7.

## Pages

### Consultancy
| Route | Contents |
|---|---|
| `/` | Hero, three-pillar ecosystem, services grid, filterable projects, credentials, insights |
| `/about` | Philosophy, vision, interactive 6-stage lifecycle, leadership |
| `/services` | Six tabbed deep-dives (`?tab=<id>`) |
| `/projects`, `/projects/[slug]` | Filterable archive and case studies |
| `/insights`, `/insights/[slug]` | Searchable articles, newsletter signup |
| `/contact` | 5-step proposal wizard with live scope estimator, office cards with maps |

### Samprec Academy (own sub-navigation, warm theme)
| Route | Contents |
|---|---|
| `/academy` | Hero with course search, 4 tracks, **course finder** (3-question recommender), **learning paths**, popular courses, corporate band, FAQ (FAQPage JSON-LD) |
| `/academy/courses` | Catalogue with search, track and level filters (URL-synced, shareable) |
| `/academy/courses/[slug]` | Full course page: outcomes, curriculum accordion, audience, prerequisites, certification, learning-path context, sticky enrol card, print outline, share, related courses (Course JSON-LD) |
| `/academy/enrol` | 3-step enrolment wizard (`?course=`): cohort or preferred month, participant & sponsor details, review, then **Paystack payment** or invoice request |
| `/academy/schedule` | Published cohorts grouped by month, or waitlist mode when none are set |
| `/academy/corporate` | Process, delivery formats, corporate training request form |

### Samprec Digitals (own sub-navigation, dark theme)
| Route | Contents |
|---|---|
| `/digitals` | Live point-cloud hero, solutions, tabbed live demos, delivery process, readiness CTA, project brief form |
| `/digitals/solutions`, `/digitals/solutions/[slug]` | Solution pages: problem, features, embedded live demo, modules, deliverables, FAQ, pre-filled brief form |
| `/digitals/demos` | All four working demos: **e-procurement tender simulator** (sealed bids, opening, weighted evaluation, audit trail), **BIM 5D cost explorer**, **ERP cost-control dashboard** (approvals queue), **3D point-cloud viewer** (orbit, zoom, colouring, density) |
| `/digitals/assessment` | 10-question **digital readiness assessment**: radar chart, dimension scores, priority actions, "send my results" |
| `/digitals/start` | Project brief / demo booking |

### Site-wide
- **⌘K / Ctrl K search** across pages, services, projects, courses, solutions and articles (also the search button in the header).
- WhatsApp button with a context-aware message (Consultants / Academy / Digitals).
- Newsletter signup (footer and Insights).
- Every form posts to `FORMS_WEBHOOK_URL`; if that's unset, it falls back to a pre-filled email, so no enquiry is lost.

Demos use clearly labelled sample data and don't represent client information.

## Editing content

All copy lives in **`data/samprecData.ts`** (company, services, projects, insights, navigation), **`data/academyData.ts`** (courses, modules, learning paths, cohorts, FAQs) and **`data/digitalsData.ts`** (solutions, process, readiness questions). `samprecData.ts` re-exports everything. Add a project, course or article there and pages, filters, navigation mega-menus and the sitemap update automatically.

## Drop-in assets

| Asset | Where | How |
|---|---|---|
| Logo | `public/brand/samprec-logo.png` | Replace the file. Use a larger/SVG version for sharper rendering. |
| Project photos | `public/projects/*.jpg` | Set `image: "/projects/limi-hospital.jpg"` on the project. It replaces the line-drawing visual with an optimised `next/image`. |
| Leader portrait | `public/team/ayodele-faleye.jpg` | Set `leader.image`. |

Until photos are supplied, every project uses a bespoke architectural line drawing (`components/ui/Blueprint.tsx`), so no page shows a broken image or grey box.

## Content to confirm before launch

- **Academy:** add `duration`, `mode` and `feeNaira` to each course when confirmed (shown automatically; `feeNaira` also enables online payment). Publish intakes in the `cohorts` array to switch the schedule out of waitlist mode. **PMBP** and **LSYP** need their full names and outlines.
- **Insights:** the three articles are original starter pieces published under "Samprec Insights". Review or replace them, and adjust the dates.
- **Projects:** the `disciplines` and `role` fields for The Address Hotel are general. Refine them to the actual scope delivered.
- **Academy email:** enrolments currently go to info@samprecconsultants.com.ng. Change `offices[1].email` / the modal if the Academy has its own inbox.

## Structure

```
app/                 routes, metadata, sitemap, robots, /api/inquiry
components/
  layout/            UtilityBar (ecosystem switcher), Header (mega-menus), Footer
  ui/                MagneticButton, Reveal, SectionHeading, PageHero, Blueprint
  home/ about/ services/ projects/ academy/ insights/ contact/
data/samprecData.ts  typed content layer
lib/                 utils (form submit, mailto), seo helper
```
# samprec
