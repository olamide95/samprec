/* ============================================================================
 * Samprec Digitals — solutions, process, sectors and readiness assessment
 * ========================================================================== */

export type DemoKind = "erp" | "procurement" | "bim" | "pointcloud" | "readiness";

export interface DigitalSolution {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  features: { title: string; text: string }[];
  modules: string[];
  deliverables: string[];
  forWho: string[];
  demo: DemoKind;
  faq: { q: string; a: string }[];
}

export const digitalSolutions: DigitalSolution[] = [
  {
    slug: "bespoke-erp",
    index: "01",
    title: "Bespoke ERP Systems",
    tagline: "One system for projects, money and people.",
    summary:
      "Enterprise resource planning built around how construction and consultancy firms actually run — projects, cost codes, procurement and people in one system.",
    problem:
      "Most project organisations run on disconnected spreadsheets: budgets in one file, payments in another, procurement in email. Nobody sees the true cost position until it is too late to act.",
    features: [
      { title: "Project cost control", text: "Budgets, commitments and actuals by cost code, updated as transactions happen." },
      { title: "Procurement to payment", text: "Requisitions, purchase orders, goods received and supplier invoices in one approval chain." },
      { title: "People & payroll", text: "Staff records, attendance and payroll workflows aligned with Nigerian statutory deductions." },
      { title: "Executive dashboards", text: "Portfolio, cash flow and margin views for leadership — live, not month-end." },
    ],
    modules: ["Projects & cost codes", "Budgeting & forecasting", "Procurement & inventory", "Accounts payable / receivable", "HR & payroll", "Document management", "Dashboards & reports", "Role-based access & audit trail"],
    deliverables: ["Process discovery report", "System design & prototype", "Configured ERP with data migration", "User training & manuals", "Post-launch support"],
    forWho: ["Contractors", "Consultancy firms", "Developers", "Facility managers"],
    demo: "erp",
    faq: [
      { q: "Why bespoke instead of off-the-shelf?", a: "Off-the-shelf ERPs force project businesses into retail or manufacturing workflows. A bespoke system models your cost codes, approval chains and reporting exactly — and you only pay for what you use." },
      { q: "Can you migrate our existing data?", a: "Yes. Migration from spreadsheets and legacy systems is planned during discovery and verified before go-live." },
      { q: "Is it cloud or on-premise?", a: "Either. Most clients choose secure cloud hosting; on-premise deployment is available where policy requires it." },
    ],
  },
  {
    slug: "mda-e-procurement",
    index: "02",
    title: "MDA e-Procurement Platforms",
    tagline: "Transparent tendering, advert to award.",
    summary:
      "Digital procurement platforms for Ministries, Departments and Agencies — transparent tendering from advertisement to award, with a complete audit trail.",
    problem:
      "Paper-based procurement is slow, opaque and hard to audit. Bidders travel to submit documents, evaluations are difficult to reconstruct, and records are vulnerable to loss or dispute.",
    features: [
      { title: "Vendor registry", text: "Online vendor registration, document upload and prequalification by category." },
      { title: "Sealed e-bidding", text: "Bids are encrypted on submission and only unsealed at the scheduled opening." },
      { title: "Weighted evaluation", text: "Technical and financial scoring with configurable weights, computed automatically." },
      { title: "Full audit trail", text: "Every action time-stamped and attributed — ready for review by oversight bodies." },
    ],
    modules: ["Procurement planning", "Tender advertisement", "Vendor registration & prequalification", "Electronic bid submission", "Bid opening", "Evaluation & scoring", "Award & contract register", "Reports & audit log"],
    deliverables: ["Workflow mapping to procurement regulations", "Configured platform", "Vendor onboarding support", "Officer training", "Hosting, security & support"],
    forWho: ["Ministries", "Departments & Agencies", "State governments", "Donor-funded programmes"],
    demo: "procurement",
    faq: [
      { q: "Does it follow public procurement rules?", a: "Workflows are configured to the procuring entity's regulatory framework during discovery, including thresholds, approvals and standstill periods." },
      { q: "How are bids kept confidential?", a: "Submissions are sealed until the opening time, and every access is logged in the audit trail." },
      { q: "Do vendors need training?", a: "The vendor portal is designed for self-service, and onboarding guides and help-desk support are provided." },
    ],
  },
  {
    slug: "bim-workflows",
    index: "03",
    title: "BIM Workflows",
    tagline: "The model as the single source of truth.",
    summary:
      "Building Information Modelling that connects design, quantities and programme — so the model drives decisions, not just drawings.",
    problem:
      "Design, cost and programme are often produced separately and drift apart. Clashes are found on site, quantities are re-measured by hand, and changes ripple through slowly.",
    features: [
      { title: "Model-based take-off", text: "Quantities extracted from the model and linked to the cost plan." },
      { title: "Clash coordination", text: "Federated models checked for clashes before they reach site." },
      { title: "4D / 5D linking", text: "Model elements linked to programme and cost for sequencing and cash flow." },
      { title: "Execution planning", text: "BIM execution plans and information requirements set up from day one." },
    ],
    modules: ["BIM execution planning", "Model authoring support", "Federation & clash detection", "Quantity take-off", "4D programme linking", "5D cost linking", "Common data environment setup"],
    deliverables: ["BIM execution plan", "Coordinated federated model", "Clash reports", "Model-based quantities", "4D/5D visualisations"],
    forWho: ["Clients & developers", "Design teams", "Contractors", "Cost consultants"],
    demo: "bim",
    faq: [
      { q: "We don't have a BIM model yet — can you help?", a: "Yes. We can author models from drawings, or point-cloud scans for existing buildings, and set up the workflow around them." },
      { q: "How does BIM help cost management?", a: "Quantities come straight from the model, so cost plans update as the design changes — and design options can be compared quickly." },
    ],
  },
  {
    slug: "point-cloud-surveying",
    index: "04",
    title: "Point Cloud Surveying",
    tagline: "Reality, captured to the millimetre.",
    summary:
      "Laser-scan capture of existing buildings and sites into accurate point clouds for refurbishment, verification and as-built records.",
    problem:
      "Refurbishment and verification projects are planned from outdated or missing drawings. Manual surveys are slow, incomplete and miss what matters.",
    features: [
      { title: "3D laser scanning", text: "Millions of measured points capture geometry quickly and completely." },
      { title: "Scan-to-BIM", text: "Point clouds converted into usable BIM models and drawings." },
      { title: "As-built verification", text: "Compare what was built against design to verify quantities and quality." },
      { title: "Progress monitoring", text: "Repeat scans document progress for valuations and records." },
    ],
    modules: ["Site scanning", "Registration & cleaning", "Scan-to-BIM modelling", "2D drawing extraction", "Deviation analysis", "Progress scans"],
    deliverables: ["Registered point cloud", "As-built BIM model", "Floor plans, sections & elevations", "Deviation reports"],
    forWho: ["Refurbishment projects", "Facility managers", "Funders & monitors", "Heritage and public buildings"],
    demo: "pointcloud",
    faq: [
      { q: "How accurate is a point cloud?", a: "Accuracy depends on the scanner and setup, and is agreed in the survey specification before capture." },
      { q: "Can the building stay in use during scanning?", a: "Usually, yes. Scans are planned around occupants and operations." },
    ],
  },
  {
    slug: "digital-transformation",
    index: "05",
    title: "Digital Transformation",
    tagline: "From paper and spreadsheets to connected delivery.",
    summary:
      "Advisory and implementation that moves project organisations from spreadsheets and paper to connected, data-driven delivery.",
    problem:
      "Technology bought without a strategy becomes shelfware. Transformation fails when processes, data and people are not changed together.",
    features: [
      { title: "Readiness assessment", text: "A clear baseline of your processes, data, tools and skills." },
      { title: "Roadmap", text: "Prioritised initiatives with costs, owners and quick wins." },
      { title: "Integration", text: "Connect the systems you already use instead of replacing everything." },
      { title: "Change & training", text: "People brought along through training delivered with Samprec Academy." },
    ],
    modules: ["Digital maturity assessment", "Process mapping", "Technology roadmap", "Systems integration", "Data & reporting", "Training & change management"],
    deliverables: ["Readiness report", "Transformation roadmap", "Implementation support", "Training programme", "KPIs and benefits tracking"],
    forWho: ["Construction & consultancy firms", "Public institutions", "Developers", "Facility operators"],
    demo: "readiness",
    faq: [
      { q: "Where do we start?", a: "With the free readiness assessment on this site. It gives an instant baseline, and a consultant can review it with you." },
      { q: "Do we have to replace our current software?", a: "No. Integration and better use of existing tools often deliver the fastest returns." },
    ],
  },
];

export const digitalProcess = [
  { index: "01", title: "Discover", text: "We map your processes, data and pain points with the people who do the work." },
  { index: "02", title: "Design", text: "Workflows and interfaces are prototyped and validated before any build begins." },
  { index: "03", title: "Build", text: "Iterative delivery with regular demos, so you see working software early." },
  { index: "04", title: "Deploy", text: "Data migration, training and a controlled go-live." },
  { index: "05", title: "Support", text: "Ongoing support, enhancements and performance reviews." },
];

export const digitalSectors = [
  { title: "Public sector & MDAs", text: "Procurement, project monitoring and records." },
  { title: "Contractors", text: "Cost control, procurement and site reporting." },
  { title: "Consultancies", text: "Project, time and fee management." },
  { title: "Developers & funders", text: "Portfolio visibility and assurance." },
];

/* ------------------------------------------------- Readiness assessment -- */

export interface ReadinessQuestion {
  id: string;
  dimension: "Strategy" | "Processes" | "Data" | "Technology" | "People";
  question: string;
  options: { label: string; score: number }[];
}

const scale = (a: string, b: string, c: string, d: string) => [
  { label: a, score: 0 },
  { label: b, score: 1 },
  { label: c, score: 2 },
  { label: d, score: 3 },
];

export const readinessQuestions: ReadinessQuestion[] = [
  { id: "s1", dimension: "Strategy", question: "Does leadership have a written digital strategy?", options: scale("No", "Informal ideas", "Drafted, not funded", "Approved and funded") },
  { id: "s2", dimension: "Strategy", question: "How are technology investments decided?", options: scale("Ad hoc", "When something breaks", "Annual budget line", "Against a roadmap with KPIs") },
  { id: "p1", dimension: "Processes", question: "How are approvals (payments, POs, variations) handled?", options: scale("Paper and signatures", "Email chains", "Partly in a system", "Fully digital workflow") },
  { id: "p2", dimension: "Processes", question: "Are core processes documented and consistent across projects?", options: scale("No", "Some", "Most", "Yes, and reviewed") },
  { id: "d1", dimension: "Data", question: "Where does project cost data live?", options: scale("Individual spreadsheets", "Shared spreadsheets", "A central system", "Central system with live dashboards") },
  { id: "d2", dimension: "Data", question: "How long does it take to know a project's cost position?", options: scale("Weeks", "Days", "Hours", "Real time") },
  { id: "t1", dimension: "Technology", question: "Do your systems share data with each other?", options: scale("No", "Manual exports", "Some integrations", "Integrated") },
  { id: "t2", dimension: "Technology", question: "Do you use BIM or 3D models on projects?", options: scale("Never", "Occasionally", "On major projects", "As standard") },
  { id: "h1", dimension: "People", question: "How confident are staff with digital tools?", options: scale("Low", "Mixed", "Good", "High") },
  { id: "h2", dimension: "People", question: "Is there budget for digital skills training?", options: scale("None", "Occasional", "Annual", "Structured programme") },
];

export const readinessDimensions = ["Strategy", "Processes", "Data", "Technology", "People"] as const;

export const readinessAdvice: Record<(typeof readinessDimensions)[number], { low: string; solution: string }> = {
  Strategy: { low: "Agree a short digital roadmap with funded, measurable priorities.", solution: "digital-transformation" },
  Processes: { low: "Digitise approvals first — payments, POs and variations deliver quick wins.", solution: "bespoke-erp" },
  Data: { low: "Centralise cost data so the cost position is known in hours, not weeks.", solution: "bespoke-erp" },
  Technology: { low: "Integrate existing tools and pilot BIM on your next major project.", solution: "bim-workflows" },
  People: { low: "Invest in structured training through Samprec Academy.", solution: "digital-transformation" },
};

export const getSolution = (slug: string) => digitalSolutions.find((s) => s.slug === slug);
