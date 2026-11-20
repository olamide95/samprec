/* ============================================================================
 * Samprec Consultants Limited — typed content layer
 * ----------------------------------------------------------------------------
 * Every page reads from this file. Edit copy, add projects, courses or
 * articles here — no component changes required. Optional `image` fields
 * point at files in /public (see README "Drop-in assets").
 * ========================================================================== */

import { courses, learningPaths } from "./academyData";
import { digitalSolutions } from "./digitalsData";

export * from "./academyData";
export * from "./digitalsData";

/* ---------------------------------------------------------------- Types -- */

export type Pillar = "corporate" | "digitals" | "academy";

export interface Office {
  id: "utako" | "jabi";
  name: string;
  role: string;
  address: string;
  phones: string[];
  email: string;
  hours: string;
  mapQuery: string;
}

export interface Leader {
  name: string;
  title: string;
  credentials: { code: string; label: string }[];
  bio: string[];
  image?: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  deliverables: string[];
  outcomes: string[];
  lifecycleStages: number[]; // indexes into `lifecycle`
}

export type ProjectSector = "Healthcare" | "Hospitality" | "Public Infrastructure";

export interface Project {
  slug: string;
  title: string;
  location: string;
  city: "Abuja" | "Lagos";
  sector: ProjectSector;
  client: string;
  role: string;
  disciplines: string[];
  summary: string;
  narrative: string[];
  highlights: { label: string; value: string }[];
  image?: string;
  featured: boolean;
}

export interface Article {
  slug: string;
  title: string;
  category: "Construction Economics" | "PPP & Finance" | "Regulation & Approvals";
  excerpt: string;
  author: string;
  date: string; // ISO
  readMinutes: number;
  body: { heading?: string; paragraphs: string[] }[];
}

export interface LifecycleStage {
  index: string;
  title: string;
  short: string;
  description: string;
  activities: string[];
}

/* -------------------------------------------------------------- Company -- */

export const company = {
  name: "Samprec Consultants Limited",
  shortName: "Samprec",
  domain: "samprecconsultants.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://samprecconsultants.com",
  tagline: "Cost, project and digital consultancy for the Nigerian built environment.",
  intro:
    "Samprec Consultants Limited was founded to meet the growing need for environmentally responsive and economic designs, project management and construction in the Nigerian building industry.",
  about:
    "The firm offers Quantity Surveying, Project Management, Mechanical and Electrical Cost Management, PPP advisory consultancy services, trainings and construction to all sectors of the construction industry. The ultimate satisfaction of our clients informed the choice of our team, which is highly professional and imaginative.",
  ownership:
    "100% indigenous Nigerian ownership, duly registered with the Corporate Affairs Commission, Abuja.",
  vision:
    "To become the leading one-stop firm offering comprehensive consultancy services in the construction industry through innovation, commitment to excellence and ethical professionalism.",
  primaryEmail: "info@samprecconsultants.com.ng",
  primaryPhone: "+234 806 557 7580",
  whatsapp: "2348065577580",
  hours: "Monday – Saturday, 9:00 AM – 5:00 PM",
  subdomains: {
    academy: "https://academy.samprecconsultants.com",
    digitals: "https://digitals.samprecconsultants.com",
  },
} as const;

export const offices: Office[] = [
  {
    id: "utako",
    name: "Main Office — Utako",
    role: "Consultancy headquarters",
    address: "Plot 22 I.T. Igbani, Utako, Abuja 900108, FCT, Nigeria",
    phones: ["+234 806 557 7580"],
    email: "info@samprecconsultants.com.ng",
    hours: "Mon – Sat, 9:00 AM – 5:00 PM",
    mapQuery: "Plot 22 I.T. Igbani Street, Utako, Abuja",
  },
  {
    id: "jabi",
    name: "Academy Office — Jabi",
    role: "Samprec Academy training centre",
    address: "Plot No 20, I.T. Igbani Street, Jabi District, Abuja",
    phones: ["+234 805 798 7769", "+234 816 456 8364"],
    email: "info@samprecconsultants.com.ng",
    hours: "Mon – Sat, 9:00 AM – 5:00 PM",
    mapQuery: "Plot 20 I.T. Igbani Street, Jabi, Abuja",
  },
];

export const leader: Leader = {
  name: "Ayodele Faleye",
  title: "Lead Consultant",
  credentials: [
    { code: "MRICS", label: "Member, Royal Institution of Chartered Surveyors" },
    { code: "MNIQS", label: "Member, Nigerian Institute of Quantity Surveyors" },
    { code: "PMP", label: "Project Management Professional (PMI)" },
    { code: "LEED GA", label: "LEED Green Associate (USGBC)" },
  ],
  bio: [
    "Ayodele Faleye leads Samprec's consultancy practice, bringing together chartered quantity surveying, project management and sustainability credentials under one desk.",
    "His dual RICS and NIQS membership anchors the firm's cost management work to both international and Nigerian professional standards, while PMP certification and LEED Green Associate accreditation shape how Samprec plans, controls and delivers environmentally responsive projects.",
  ],
};

export const clientTypes = [
  "Private Developers",
  "Government",
  "Agencies",
  "Financial Institutions",
  "Private Builders",
  "Donor Agencies",
] as const;

export const differentiators = [
  { title: "Client image", text: "Projects that positively and uniquely communicate the image of our clients." },
  { title: "Professionalism", text: "Chartered, certified practitioners accountable to recognised standards." },
  { title: "Timely delivery", text: "Programme discipline from feasibility through to handover." },
  { title: "Cutting-edge design", text: "Design management that challenges the brief and the budget." },
  { title: "Socially responsive", text: "Excellent, socially responsive designs for the communities they serve." },
  { title: "Green by default", text: "Environment-friendly, green design embedded at every stage." },
] as const;

/* ------------------------------------------------------------ Lifecycle -- */

export const lifecycle: LifecycleStage[] = [
  {
    index: "01",
    title: "Feasibility",
    short: "Is the project viable?",
    description:
      "We test the commercial, technical and financial case for a capital project before a single drawing is commissioned.",
    activities: ["Feasibility studies of capital projects", "Order-of-cost estimates", "Cost modelling & options appraisal", "Funding and PPP structuring review"],
  },
  {
    index: "02",
    title: "EIA",
    short: "Environmental impact",
    description:
      "Environmental management consultancy that surfaces impacts early, so mitigation is designed in rather than bolted on.",
    activities: ["Environmental scoping", "Impact assessment coordination", "Green design and LEED alignment", "Mitigation cost planning"],
  },
  {
    index: "03",
    title: "Approvals",
    short: "Permits & sign-off",
    description:
      "We coordinate the documentation and stakeholder engagement needed to move a project through regulatory approval.",
    activities: ["Approval documentation", "Design management across disciplines", "Authority engagement", "Approval programme tracking"],
  },
  {
    index: "04",
    title: "BOQ",
    short: "Measured & priced",
    description:
      "Bills of quantities, cost plans and contract documentation that give clients and bidders a single, defensible baseline.",
    activities: ["Bills of quantities preparation", "Pre-tender cost plans", "Contract documentation", "Procurement & tender evaluation"],
  },
  {
    index: "05",
    title: "Construction / M&E",
    short: "Build, control, report",
    description:
      "Post-contract cost and project control across building fabric and mechanical & electrical installations.",
    activities: ["Contract administration", "Valuations & variations", "Post-contract M&E financial management", "Site supervision & progress reporting"],
  },
  {
    index: "06",
    title: "Handover",
    short: "Close out & operate",
    description:
      "Final accounts, commissioning and a clean transition into facility management and operation.",
    activities: ["Final account settlement", "Commissioning oversight", "Handover documentation", "Facility management planning"],
  },
];

/* ------------------------------------------------------------- Services -- */

export const services: Service[] = [
  {
    id: "quantity-surveying",
    index: "01",
    title: "Quantity Surveying & Cost Management",
    short: "Quantity Surveying",
    summary:
      "Independent cost advice from first estimate to final account — so every naira in a capital project is planned, measured and accounted for.",
    deliverables: [
      "Feasibility studies of capital projects",
      "Cost modelling and cost planning",
      "Bills of quantities",
      "Contract documentation",
      "Contract administration",
      "Valuations, variations and final accounts",
    ],
    outcomes: ["Defensible budgets", "Competitive tenders", "Controlled variations"],
    lifecycleStages: [0, 3, 4, 5],
  },
  {
    id: "project-management",
    index: "02",
    title: "Project & Programme Management",
    short: "Project Management",
    summary:
      "Single-point leadership of the client's interest across design, procurement and construction — holding time, cost and quality to account.",
    deliverables: [
      "Project briefing and execution planning",
      "Programme management across multiple projects",
      "Consultant and contractor coordination",
      "Risk and change management",
      "Progress and cost reporting",
      "Construction management",
    ],
    outcomes: ["One accountable lead", "Programme certainty", "Transparent reporting"],
    lifecycleStages: [0, 2, 4, 5],
  },
  {
    id: "mechanical-electrical",
    index: "03",
    title: "M&E Cost & Engineering Management",
    short: "M&E Cost Management",
    summary:
      "Specialist cost management of mechanical and electrical installations — often the most volatile share of a building budget.",
    deliverables: [
      "Procurement advice on M&E installation",
      "Preliminary estimates and cost plans on M&E installation",
      "Bills of quantities preparation and costing of M&E installation",
      "Evaluation and costing of design alternatives",
      "Post-contract financial management of M&E installation",
    ],
    outcomes: ["Right-sized services", "Value-engineered options", "No M&E surprises"],
    lifecycleStages: [3, 4],
  },
  {
    id: "design-management",
    index: "04",
    title: "Architectural, Civil & Structural Design Management",
    short: "Design Management",
    summary:
      "We coordinate architectural, civil and structural design so that what is drawn can be approved, priced and built.",
    deliverables: [
      "Architectural design and management",
      "Civil and structural design and management",
      "Design coordination and review",
      "Buildability and cost-in-design reviews",
      "Green and socially responsive design input",
    ],
    outcomes: ["Coordinated drawings", "Faster approvals", "Designs built to budget"],
    lifecycleStages: [1, 2, 3],
  },
  {
    id: "ppp-advisory",
    index: "05",
    title: "Infrastructure Finance & PPP Advisory",
    short: "PPP & Finance",
    summary:
      "Financial services for infrastructure and real estate — structuring PPPs and protecting funders' interests through delivery.",
    deliverables: [
      "PPP advisory services",
      "Funder's representative / lender's monitoring",
      "Infrastructure and real estate finance advisory",
      "Project bankability and cost-to-complete reviews",
    ],
    outcomes: ["Bankable projects", "Protected capital", "Independent assurance"],
    lifecycleStages: [0, 4],
  },
  {
    id: "procurement-facility",
    index: "06",
    title: "Procurement & Facility Management",
    short: "Procurement & FM",
    summary:
      "Construction procurement strategy at the front end and facility management at the back end — the full life of the asset.",
    deliverables: [
      "Construction and procurement management",
      "Procurement strategy and tender management",
      "Facility management",
      "Environmental management consultancy",
    ],
    outcomes: ["Fit-for-purpose procurement", "Lower operating cost", "Assets that perform"],
    lifecycleStages: [3, 5],
  },
];

/* ------------------------------------------------------------- Projects -- */

export const projects: Project[] = [
  {
    slug: "limi-hospital-cbd-abuja",
    title: "12-Floor Limi Hospital Building",
    location: "Central Business District, Abuja",
    city: "Abuja",
    sector: "Healthcare",
    client: "Limi Hospital",
    role: "Development oversight consultant",
    disciplines: ["Project Management", "Cost Management"],
    summary:
      "Limi Hospital, one of the foremost hospitals in Abuja (established 1982), engaged Samprec to oversee the development of a 12-floor hospital building.",
    narrative: [
      "Through our long-standing partnership with the Lead Architect on the project, Grandeur Projects Ltd, Limi Hospital — one of the foremost hospitals in Abuja, established in 1982 — engaged Samprec to oversee the development of a 12-floor hospital building in the Central Business District.",
      "Healthcare buildings concentrate complex mechanical, electrical and medical services into a tight footprint. Samprec's oversight role brings cost and programme discipline to that complexity on the client's behalf.",
    ],
    highlights: [
      { label: "Height", value: "12 floors" },
      { label: "Client est.", value: "1982" },
      { label: "Lead architect", value: "Grandeur Projects Ltd" },
      { label: "District", value: "CBD, Abuja" },
    ],
    featured: true,
  },
  {
    slug: "the-address-hotel-maitama",
    title: "The Address Hotel",
    location: "Kunene Close, Maitama, Abuja",
    city: "Abuja",
    sector: "Hospitality",
    client: "Private client",
    role: "Consultant to the client",
    disciplines: ["Quantity Surveying", "Project Management"],
    summary:
      "Samprec supported a private client in delivering high-performing, collaborative hotel facilities that foster innovation, forward-thinking business solutions and unparalleled service.",
    narrative: [
      "Samprec supported a private client in delivering high-performing, collaborative hotel facilities in Maitama, one of Abuja's premier districts.",
      "The brief called for a hotel that fosters innovation, forward-thinking business solutions and unparalleled service — a standard that has to be protected through every cost and design decision.",
    ],
    highlights: [
      { label: "Sector", value: "Hospitality" },
      { label: "District", value: "Maitama, Abuja" },
      { label: "Client", value: "Private" },
      { label: "Address", value: "Kunene Close" },
    ],
    featured: true,
  },
  {
    slug: "biogas-ikoyi-correctional-facility",
    title: "Biogas System, Ikoyi Correctional Facility",
    location: "Medium Security Custodial Centre, Ikoyi, Lagos",
    city: "Lagos",
    sector: "Public Infrastructure",
    client: "International Committee of the Red Cross (ICRC)",
    role: "Supervising consultant",
    disciplines: ["Construction Supervision", "Environmental Engineering"],
    summary:
      "The ICRC commissioned Samprec as supervising consultants for the biogas (Anaerobic Baffle Reactor) systems project at the Medium Security Custodial Centre, Ikoyi, Lagos.",
    narrative: [
      "The International Committee of the Red Cross (ICRC) commissioned Samprec as the supervising consultants for the biogas (Anaerobic Baffle Reactor) systems project at the Medium Security Custodial Centre at Ikoyi, Lagos, Nigeria.",
      "Anaerobic Baffle Reactor systems treat wastewater while recovering biogas — an environmentally responsive solution delivered inside an operational, secure public facility for a donor-agency client.",
    ],
    highlights: [
      { label: "Client", value: "ICRC" },
      { label: "System", value: "Anaerobic Baffle Reactor" },
      { label: "Role", value: "Supervising consultant" },
      { label: "City", value: "Lagos" },
    ],
    featured: true,
  },
];

/* ------------------------------------------------------------- Insights -- */

export const articles: Article[] = [
  {
    slug: "naira-volatility-and-construction-budgets",
    title: "Building budgets that survive naira volatility",
    category: "Construction Economics",
    excerpt:
      "When imported materials and M&E equipment are priced in foreign currency, a static budget is a fiction. Here is how cost plans should respond.",
    author: "Samprec Insights",
    date: "2026-10-14",
    readMinutes: 5,
    body: [
      {
        paragraphs: [
          "A significant share of a Nigerian building's cost — reinforcement, finishes, lifts, generators, chillers, switchgear — is either imported or priced off imported inputs. When the exchange rate moves, those costs move with it, often between budget approval and contract award.",
        ],
      },
      {
        heading: "Separate what moves from what doesn't",
        paragraphs: [
          "The first discipline is structural: split the cost plan into currency-exposed and locally priced elements. Labour, aggregates and much of the substructure behave very differently from mechanical and electrical packages. Treating them as one number hides the real risk.",
          "Once separated, exposed elements can carry their own contingency, their own review dates and their own approval thresholds.",
        ],
      },
      {
        heading: "Procure the volatile packages early",
        paragraphs: [
          "Long-lead, currency-exposed packages — especially M&E — benefit from early procurement advice. Fixing specifications and securing prices sooner narrows the window in which exchange movements can erode the budget.",
        ],
      },
      {
        heading: "Make fluctuation explicit in the contract",
        paragraphs: [
          "Contract documentation should state clearly whether prices are fixed or subject to fluctuation, which indices apply and how claims are evidenced. Ambiguity here is where disputes begin.",
          "None of this removes volatility. It makes it visible, priced and governed — which is what a client actually needs from a cost plan.",
        ],
      },
    ],
  },
  {
    slug: "why-ppps-succeed-or-stall",
    title: "Why infrastructure PPPs succeed — or stall",
    category: "PPP & Finance",
    excerpt:
      "Public-private partnerships promise private capital for public infrastructure. The difference between delivery and deadlock is usually decided before financial close.",
    author: "Samprec Insights",
    date: "2026-09-02",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "Public-private partnerships can unlock private finance and delivery capacity for infrastructure that public budgets alone cannot fund. But the record everywhere is mixed, and the reasons projects stall are remarkably consistent.",
        ],
      },
      {
        heading: "Success factor: a project that is genuinely bankable",
        paragraphs: [
          "Lenders fund cash flows, not ambitions. A credible demand case, realistic construction costs and a clear revenue mechanism are prerequisites. Independent cost and feasibility work at the outset is cheaper than restructuring later.",
        ],
      },
      {
        heading: "Success factor: risk sitting with whoever manages it best",
        paragraphs: [
          "Construction risk generally belongs with the contractor, demand risk is negotiated, and policy and approval risk usually stays with government. Transfers that ignore this logic get priced heavily — or collapse during negotiation.",
        ],
      },
      {
        heading: "Failure factor: weak preparation and moving scope",
        paragraphs: [
          "Projects that reach the market with incomplete feasibility, unsettled land or shifting requirements lose bidder confidence quickly. Each change reopens the financial model.",
        ],
      },
      {
        heading: "Failure factor: no independent eyes during delivery",
        paragraphs: [
          "Once construction starts, funders need assurance that money drawn matches work done. A funder's representative provides that independent verification of progress, cost-to-complete and quality — protecting both lenders and the public partner.",
          "The pattern is clear: PPPs are won or lost in preparation, and protected in delivery.",
        ],
      },
    ],
  },
  {
    slug: "navigating-building-approvals-in-abuja",
    title: "Navigating building approvals without losing the programme",
    category: "Regulation & Approvals",
    excerpt:
      "Approvals are often treated as a hurdle to clear. Treated instead as a workstream with its own programme, they stop being the reason projects start late.",
    author: "Samprec Insights",
    date: "2026-07-21",
    readMinutes: 4,
    body: [
      {
        paragraphs: [
          "Few things delay a construction start as reliably as approvals. Development permits, environmental requirements and utility consents each have their own documentation and review cycles, and they rarely run in parallel by accident.",
        ],
      },
      {
        heading: "Plan approvals as a workstream",
        paragraphs: [
          "Approvals deserve their own line in the master programme, with owners, submission dates and realistic review periods. Making them visible makes them manageable.",
        ],
      },
      {
        heading: "Coordinate the design before submission",
        paragraphs: [
          "Incomplete or uncoordinated drawings are a common reason for resubmission. Design management across architectural, civil, structural and M&E disciplines before submission reduces avoidable queries.",
        ],
      },
      {
        heading: "Bring environmental work forward",
        paragraphs: [
          "Where environmental assessment is required, starting it at feasibility rather than after design means findings shape the scheme instead of forcing redesign.",
          "The result is not a faster bureaucracy — it is a project that arrives at each approval ready to be approved.",
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------- Navigation -- */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  href: string;
  intro: string;
  links: NavLink[];
}

export const navigation: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    intro: "An indigenous Nigerian consultancy built for the full project lifecycle.",
    links: [
      { label: "Our Firm", href: "/about", description: "Philosophy, vision and who we serve" },
      { label: "Project Lifecycle", href: "/about#lifecycle", description: "Six stages, feasibility to handover" },
      { label: "Leadership", href: "/about#leadership", description: "Ayodele Faleye, Lead Consultant" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    intro: "Comprehensive consultancy across cost, programme, design and finance.",
    links: services.map((s) => ({ label: s.short, href: `/services?tab=${s.id}`, description: s.title })),
  },
  {
    label: "Projects",
    href: "/projects",
    intro: "Selected engagements across healthcare, hospitality and public infrastructure.",
    links: projects.map((p) => ({ label: p.title, href: `/projects/${p.slug}`, description: p.location })),
  },
  {
    label: "Digitals",
    href: "/digitals",
    intro: "Samprec Digitals — software, BIM and data for construction and public procurement.",
    links: [
      ...digitalSolutions.map((d) => ({ label: d.title, href: `/digitals/solutions/${d.slug}`, description: d.tagline })),
      { label: "Interactive demos", href: "/digitals/demos", description: "Try e-procurement, BIM cost, ERP and point cloud" },
      { label: "Digital readiness assessment", href: "/digitals/assessment", description: "Free 3-minute maturity score" },
    ],
  },
  {
    label: "Academy",
    href: "/academy",
    intro: "Samprec Academy — professional certification, software and digital construction training.",
    links: [
      { label: "All courses", href: "/academy/courses", description: `${courses.length} programmes across 4 tracks` },
      { label: "Course finder", href: "/academy#finder", description: "Get a recommendation in 3 questions" },
      ...learningPaths.map((p) => ({ label: p.title, href: `/academy#paths`, description: p.outcome })),
      { label: "Schedule & intakes", href: "/academy/schedule", description: "Upcoming cohorts and waitlist" },
      { label: "Corporate training", href: "/academy/corporate", description: "In-house programmes for teams" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    intro: "Perspectives on construction economics, PPPs and approvals in Nigeria.",
    links: articles.map((a) => ({ label: a.title, href: `/insights/${a.slug}`, description: a.category })),
  },
];

export const pillars: { id: Pillar; label: string; href: string; tagline: string }[] = [
  { id: "corporate", label: "Consultants", href: "/", tagline: "Cost & project consultancy" },
  { id: "digitals", label: "Digitals", href: "/digitals", tagline: "Construction technology" },
  { id: "academy", label: "Academy", href: "/academy", tagline: "Professional training" },
];

/* ------------------------------------------------------------- Helpers -- */

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
