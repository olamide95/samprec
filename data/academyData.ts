/* ============================================================================
 * Samprec Academy — courses, learning paths, cohorts and FAQs
 * ----------------------------------------------------------------------------
 * Optional fields (duration, mode, feeNaira) appear in the UI only when set.
 * Setting feeNaira AND NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY turns on online payment
 * for that course in the enrolment wizard.
 * ========================================================================== */

export type CourseCategory =
  | "Professional Certification"
  | "Project Controls & Software"
  | "Digital Construction"
  | "Career & Workplace";

export type Role = "cost" | "pm" | "design" | "graduate" | "leader";
export type Goal = "certification" | "software" | "digital" | "foundation";
export type Level = "Foundation" | "Intermediate" | "Advanced";

export interface CourseModule {
  title: string;
  points: string[];
}

export interface Course {
  slug: string;
  code: string;
  title: string;
  category: CourseCategory;
  level: Level;
  summary: string;
  description: string;
  outcomes: string[];
  modules: CourseModule[];
  audience: string;
  prerequisites: string;
  certification?: string;
  roles: Role[];
  goals: Goal[];
  /** Optional — fill in when confirmed. */
  duration?: string;
  mode?: string;
  feeNaira?: number;
  /** True when the outline is still being finalised. */
  outlinePending?: boolean;
}

export interface Cohort {
  id: string;
  courseSlug: string;
  startDate: string; // ISO yyyy-mm-dd
  endDate?: string;
  mode: "Classroom (Jabi)" | "Virtual" | "Blended";
  seats?: number;
  status: "Open" | "Few seats" | "Full";
}

export interface LearningPath {
  id: string;
  title: string;
  summary: string;
  outcome: string;
  steps: string[]; // course slugs in order
}

export const courseCategories: CourseCategory[] = [
  "Professional Certification",
  "Project Controls & Software",
  "Digital Construction",
  "Career & Workplace",
];

export const courses: Course[] = [
  {
    slug: "pmp-exam-preparation",
    code: "PMP",
    title: "PMP Exam Preparation",
    category: "Professional Certification",
    level: "Advanced",
    summary: "Structured preparation for PMI's Project Management Professional certification exam.",
    description:
      "An exam-focused programme that takes experienced project practitioners through the PMI exam content outline — people, process and business environment — across predictive, agile and hybrid approaches, with timed practice and exam strategy.",
    outcomes: [
      "Map your experience to the PMI exam content outline",
      "Apply predictive, agile and hybrid approaches to scenario questions",
      "Complete full-length timed mock exams",
      "Meet the 35 contact-hour education requirement",
    ],
    modules: [
      { title: "Exam orientation", points: ["PMI eligibility and application", "Exam content outline and question styles", "Personal study plan"] },
      { title: "People domain", points: ["Leading and building teams", "Stakeholder engagement", "Conflict and negotiation"] },
      { title: "Process domain", points: ["Scope, schedule and cost", "Risk and quality", "Procurement and integration"] },
      { title: "Business environment", points: ["Compliance and governance", "Benefits and value delivery", "Organisational change"] },
      { title: "Agile & hybrid", points: ["Agile principles and frameworks", "Adaptive planning", "Choosing a delivery approach"] },
      { title: "Exam readiness", points: ["Full-length mock exams", "Review of weak areas", "Exam-day strategy"] },
    ],
    audience: "Project managers and team leads with project experience preparing for the PMP exam.",
    prerequisites: "Project leadership experience meeting PMI's eligibility requirements.",
    certification: "Prepares candidates for the PMI PMP® examination.",
    roles: ["pm", "leader", "cost"],
    goals: ["certification"],
  },
  {
    slug: "rics-apc-coaching",
    code: "RICS",
    title: "RICS APC Coaching",
    category: "Professional Certification",
    level: "Advanced",
    summary: "Mentored coaching for surveyors working toward chartered membership of the RICS.",
    description:
      "One-to-one and group coaching through the RICS Assessment of Professional Competence — from choosing a pathway and competencies to writing the submission and rehearsing the final assessment interview — led by a chartered member.",
    outcomes: [
      "Select the right pathway and competencies for your experience",
      "Write a strong summary of experience and case study",
      "Demonstrate ethics and professionalism to RICS standards",
      "Perform confidently at the final assessment interview",
    ],
    modules: [
      { title: "Pathway planning", points: ["APC routes and pathways", "Mandatory, core and optional competencies", "Structured training planning"] },
      { title: "Written submission", points: ["Summary of experience", "Case study selection and writing", "CPD records"] },
      { title: "Ethics & professionalism", points: ["RICS Rules of Conduct", "Professional statements", "Ethics scenarios"] },
      { title: "Interview preparation", points: ["Presentation rehearsal", "Mock interviews with feedback", "Handling technical questioning"] },
    ],
    audience: "Quantity surveyors and construction professionals pursuing MRICS.",
    prerequisites: "A relevant degree and/or professional experience in surveying or construction.",
    certification: "Prepares candidates for the RICS APC final assessment.",
    roles: ["cost"],
    goals: ["certification"],
  },
  {
    slug: "oracle-primavera-p6",
    code: "P6",
    title: "Oracle Primavera P6",
    category: "Project Controls & Software",
    level: "Intermediate",
    summary: "Planning, scheduling and controlling projects in Oracle Primavera P6.",
    description:
      "Hands-on training in Primavera P6 Professional, building a construction programme from the work breakdown structure through logic, resources and costs to baselining, progress updating and reporting.",
    outcomes: [
      "Build a WBS and logic-linked programme in P6",
      "Identify and manage the critical path",
      "Resource- and cost-load activities",
      "Baseline, update progress and produce reports",
    ],
    modules: [
      { title: "P6 fundamentals", points: ["Enterprise structure (EPS/OBS)", "Calendars", "Project setup"] },
      { title: "Scheduling", points: ["WBS and activities", "Relationships, lags and constraints", "Critical path analysis"] },
      { title: "Resources & cost", points: ["Resource dictionary", "Resource and cost loading", "Levelling"] },
      { title: "Control", points: ["Baselines", "Progress updating", "Earned value basics", "Layouts and reports"] },
    ],
    audience: "Planners, project controls staff, site engineers and project managers.",
    prerequisites: "Basic understanding of construction project delivery. A laptop is recommended.",
    roles: ["pm", "cost", "design"],
    goals: ["software"],
  },
  {
    slug: "bim-essentials",
    code: "BIM",
    title: "BIM Essentials",
    category: "Digital Construction",
    level: "Foundation",
    summary: "The principles and practice of Building Information Modelling on real projects.",
    description:
      "A practical introduction to BIM as a process, not just software: information requirements, execution planning, model coordination and how models feed quantities, cost and programme.",
    outcomes: [
      "Explain BIM concepts, maturity levels and benefits",
      "Read and contribute to information requirements and BIM execution plans",
      "Understand federated models and clash coordination",
      "Use models for quantities and cost",
    ],
    modules: [
      { title: "BIM foundations", points: ["What BIM is — and isn't", "Maturity levels", "Roles and responsibilities"] },
      { title: "Information management", points: ["Information requirements", "BIM execution plans", "Common data environments"] },
      { title: "Coordination", points: ["Federated models", "Clash detection workflow", "Issue tracking"] },
      { title: "BIM for cost & time", points: ["Model-based quantities", "4D and 5D concepts", "Case examples"] },
    ],
    audience: "Architects, engineers, quantity surveyors and project managers new to BIM.",
    prerequisites: "None. Familiarity with construction drawings is helpful.",
    roles: ["design", "cost", "pm", "graduate"],
    goals: ["digital", "software"],
  },
  {
    slug: "autocad-navisworks",
    code: "CAD",
    title: "AutoCAD & Navisworks",
    category: "Digital Construction",
    level: "Foundation",
    summary: "2D drafting in AutoCAD and model review and coordination in Navisworks.",
    description:
      "Produce clean, standards-based drawings in AutoCAD, then bring models together in Navisworks to review, detect clashes and simulate construction sequence.",
    outcomes: [
      "Draft and annotate drawings in AutoCAD",
      "Manage layers, blocks and plotting",
      "Aggregate models in Navisworks",
      "Run clash detection and timeliner sequences",
    ],
    modules: [
      { title: "AutoCAD drafting", points: ["Interface and drawing setup", "Draw and modify tools", "Dimensions and annotation"] },
      { title: "Drawing management", points: ["Layers and standards", "Blocks and xrefs", "Layouts and plotting"] },
      { title: "Navisworks review", points: ["Appending models", "Navigation and viewpoints", "Measurements and redlines"] },
      { title: "Coordination", points: ["Clash Detective", "Timeliner 4D sequencing", "Reporting"] },
    ],
    audience: "Draughtspersons, designers, site engineers and technical staff.",
    prerequisites: "Basic computer literacy. A laptop is recommended.",
    roles: ["design", "graduate"],
    goals: ["software", "digital"],
  },
  {
    slug: "ai-for-construction",
    code: "AI",
    title: "AI for Construction",
    category: "Digital Construction",
    level: "Foundation",
    summary: "Practical use of artificial intelligence tools across estimating, planning and reporting.",
    description:
      "A grounded introduction to AI for built-environment professionals: what current tools do well, where they fail, and how to use them responsibly to speed up estimating, documentation, planning and reporting.",
    outcomes: [
      "Understand how modern AI tools work and their limits",
      "Use AI assistants to draft and review project documents",
      "Apply AI to data analysis and reporting",
      "Set guardrails for accuracy, confidentiality and accountability",
    ],
    modules: [
      { title: "AI fundamentals", points: ["Machine learning and generative AI", "Capabilities and limitations", "Prompting well"] },
      { title: "AI in practice", points: ["Estimating support and BOQ review", "Specifications and reports", "Meeting and site records"] },
      { title: "Data & automation", points: ["Spreadsheet analysis with AI", "Dashboards and summaries", "Workflow automation"] },
      { title: "Responsible use", points: ["Verification and accountability", "Confidentiality and data", "Firm policy"] },
    ],
    audience: "Construction and consultancy professionals at any level.",
    prerequisites: "None.",
    roles: ["cost", "pm", "design", "graduate", "leader"],
    goals: ["digital"],
  },
  {
    slug: "pmbp",
    code: "PMBP",
    title: "PMBP",
    category: "Professional Certification",
    level: "Intermediate",
    summary: "A Samprec Academy professional programme.",
    description: "Full programme details are being finalised. Register your interest and the Academy will send the outline and next cohort date.",
    outcomes: ["Programme outcomes available on request"],
    modules: [{ title: "Programme outline", points: ["Available on request from the Academy"] }],
    audience: "Built-environment professionals.",
    prerequisites: "Contact the Academy.",
    roles: ["pm", "leader"],
    goals: ["certification"],
    outlinePending: true,
  },
  {
    slug: "lsyp",
    code: "LSYP",
    title: "LSYP",
    category: "Career & Workplace",
    level: "Foundation",
    summary: "A Samprec Academy development programme.",
    description: "Full programme details are being finalised. Register your interest and the Academy will send the outline and next cohort date.",
    outcomes: ["Programme outcomes available on request"],
    modules: [{ title: "Programme outline", points: ["Available on request from the Academy"] }],
    audience: "Early-career professionals.",
    prerequisites: "Contact the Academy.",
    roles: ["graduate"],
    goals: ["foundation"],
    outlinePending: true,
  },
  {
    slug: "microsoft-office-essentials",
    code: "MSO",
    title: "Microsoft Office Essentials",
    category: "Career & Workplace",
    level: "Foundation",
    summary: "Productive, professional use of Word, Excel and PowerPoint for project work.",
    description:
      "The everyday tools of professional practice, taught through construction and consultancy examples — from cost spreadsheets and reports to client presentations.",
    outcomes: [
      "Build reliable Excel workbooks with formulas, tables and charts",
      "Produce structured, professional reports in Word",
      "Design clear presentations in PowerPoint",
      "Work faster with shortcuts and templates",
    ],
    modules: [
      { title: "Excel", points: ["Formulas and functions", "Tables, filters and pivot tables", "Charts", "Cost sheet example"] },
      { title: "Word", points: ["Styles and templates", "Tables of contents", "Report layout"] },
      { title: "PowerPoint", points: ["Slide structure", "Visual clarity", "Presenting data"] },
      { title: "Productivity", points: ["Shortcuts", "File management", "Collaboration"] },
    ],
    audience: "Graduates, administrators and professionals refreshing core skills.",
    prerequisites: "Basic computer literacy.",
    roles: ["graduate", "cost", "pm"],
    goals: ["foundation", "software"],
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: "chartered-surveyor",
    title: "Chartered Surveyor Track",
    summary: "From strong fundamentals to chartered membership.",
    outcome: "Ready for the RICS APC final assessment",
    steps: ["microsoft-office-essentials", "bim-essentials", "rics-apc-coaching"],
  },
  {
    id: "project-controls",
    title: "Project Controls Track",
    summary: "Plan it, control it, then certify it.",
    outcome: "P6-proficient and PMP exam-ready",
    steps: ["microsoft-office-essentials", "oracle-primavera-p6", "pmp-exam-preparation"],
  },
  {
    id: "digital-construction",
    title: "Digital Construction Track",
    summary: "Draw, model, coordinate — then automate.",
    outcome: "A BIM-literate, AI-enabled practitioner",
    steps: ["autocad-navisworks", "bim-essentials", "ai-for-construction"],
  },
];

/**
 * Published cohorts. Leave empty until dates are confirmed — the schedule page
 * and enrolment wizard switch to "register interest" mode automatically.
 */
export const cohorts: Cohort[] = [];

export const roleOptions: { id: Role; label: string }[] = [
  { id: "cost", label: "Quantity surveyor / cost professional" },
  { id: "pm", label: "Project manager / planner" },
  { id: "design", label: "Architect, engineer or draughtsperson" },
  { id: "graduate", label: "Graduate / early career" },
  { id: "leader", label: "Manager / organisation leader" },
];

export const goalOptions: { id: Goal; label: string }[] = [
  { id: "certification", label: "Earn a professional certification" },
  { id: "software", label: "Master industry software" },
  { id: "digital", label: "Get ahead in digital construction" },
  { id: "foundation", label: "Build strong career foundations" },
];

export const academyFaqs = [
  { q: "Where do classes hold?", a: "Classroom sessions hold at the Samprec Academy office, Plot No 20, I.T. Igbani Street, Jabi District, Abuja. Selected programmes are also delivered virtually or in-house for organisations." },
  { q: "How do I enrol?", a: "Open any course and choose Enrol. Where online payment is enabled you can pay securely by card or bank transfer; otherwise the Academy confirms your seat, cohort date and payment details by email and phone." },
  { q: "Can you train our whole team?", a: "Yes. Corporate and in-house programmes can be scheduled for your organisation, at your premises or ours, and tailored to your projects." },
  { q: "Do I need a laptop?", a: "For software courses (Primavera P6, AutoCAD & Navisworks, Microsoft Office) a laptop is recommended. The Academy will advise on software setup before your cohort starts." },
  { q: "Will I receive a certificate?", a: "Participants who complete a programme receive a Samprec Academy certificate of completion. Certification courses such as PMP and RICS APC prepare you for the awarding body's own assessment." },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

/** Ranks courses for the course finder. */
export function recommendCourses(role: Role | null, goal: Goal | null, experience: "early" | "mid" | "senior" | null) {
  return courses
    .map((c) => {
      let score = 0;
      if (role && c.roles.includes(role)) score += 3;
      if (goal && c.goals.includes(goal)) score += 4;
      if (experience === "early" && c.level === "Foundation") score += 2;
      if (experience === "mid" && c.level === "Intermediate") score += 2;
      if (experience === "senior" && c.level === "Advanced") score += 2;
      if (c.outlinePending) score -= 1;
      return { course: c, score };
    })
    .filter((r) => r.score > 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
