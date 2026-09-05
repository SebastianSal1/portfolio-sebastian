export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  scopeSummary: string;
  methodology: string;
  primaryMetric: string;
  quantifiedImpact: string[];
  keyTools: string[];
}

export interface ProjectPlaceholderItem {
  id: string;
  title: string;
  shortContext: string;
  category: string;
  year: string;
  description: string;
  methodologyOverview: string;
  deliverablePreview: string;
  isPlaceholder: true;
}

export interface CompetitionPlaceholderItem {
  id: string;
  title: string;
  period: string;
  challengeContext: string;
  role: string;
  resultPlacement: string;
  keyOutput: string;
  isPlaceholder: true;
}

export interface AcademicRecord {
  institution: string;
  degree: string;
  department: string;
  period: string;
  gpa: string;
  academicStanding: string;
  focusAreas: string[];
  scholarships: Array<{ name: string; year: string; note: string }>;
  honors: Array<{ name: string; year: string; note: string }>;
}

export interface InterestItem {
  domain: string;
  currentFocus: string;
  readingThemes: string[];
}

// =============================================================================
// 1. CANONICAL EXPERIENCE DATA (Sourced from docs/CONTENT.md)
// =============================================================================
export const CANONICAL_EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "role-1",
    title: "Equity Research Intern",
    organization: "PT Henan Putihrai Sekuritas",
    period: "Jan – Jun 2026",
    location: "Jakarta, Indonesia",
    scopeSummary:
      "Supported research division producing institutional equity research and daily market reports across Indonesian capital markets.",
    methodology:
      "Discounted Cash Flow (DCF), comparable valuation multiples, macroeconomic synthesis, sector analysis, and company forecasting models.",
    primaryMetric: "15+ IDX-Listed Companies Researched & 100+ Daily Reports",
    quantifiedImpact: [
      "Conducted equity research across 15+ IDX-listed companies spanning 5 economic sectors",
      "Built multi-scenario financial valuation models forecasting corporate performance",
      "Produced 100+ daily market reports synthesizing macroeconomic indicators and sector news",
    ],
    keyTools: ["Financial Modeling", "DCF Valuation", "Macroeconomic Analysis", "Excel / VBA", "Capital Markets"],
  },
  {
    id: "role-2",
    title: "Project Engineer Intern",
    organization: "APRIL Group",
    period: "Jun – Sep 2025",
    location: "Riau, Indonesia",
    scopeSummary:
      "Supported process optimization and environmental compliance initiatives in pulping operations, focusing on pulp quality improvement and effluent reduction.",
    methodology:
      "Stochastic discrete-event simulation, energy recovery optimization, Kaizen continuous improvement, and operational KPI tracking.",
    primaryMetric: "~32% Machine Utilization Increase & $100K+/Mo Cost Efficiency",
    quantifiedImpact: [
      "Conducted discrete-event simulation increasing machine utilization by ~32%",
      "Optimized energy recovery with estimated cost efficiencies exceeding $100K/Month",
      "Assisted Kaizen improvement workflows resulting in 10% production efficiency gain",
    ],
    keyTools: ["Discrete-Event Simulation", "Kaizen / Lean", "Process Optimization", "KPI Tracking"],
  },
  {
    id: "role-3",
    title: "Backend Developer Intern",
    organization: "PT Ikonsultan Inovatama",
    period: "Aug – Sep 2024",
    location: "Jakarta, Indonesia",
    scopeSummary:
      "Engineered and optimized core financial transaction modules for an integrated web application enabling MSMEs to access telecommunications financial services.",
    methodology:
      "Core transaction state architecture, dynamic bank statement generation, Git-driven agile sprints, and relational data modeling.",
    primaryMetric: "~25% Transaction Processing Efficiency Improvement",
    quantifiedImpact: [
      "Developed and deployed 4 core financial transaction modules (withdrawal, transfer, deposit, payment)",
      "Improved transaction processing efficiency by ~25% through dynamic statement queries",
      "Contributed 10+ feature updates in 4 weeks, reducing development cycle time by 15%",
    ],
    keyTools: ["Backend Engineering", "Transaction Modules", "Git & Notion", "Agile Sprints"],
  },
];

// =============================================================================
// 2. PROJECT STRUCTURAL PLACEHOLDERS (Testing IA & visual layout only)
// Note: Factual project content population is explicitly pending.
// =============================================================================
export const PROJECT_PLACEHOLDERS: ProjectPlaceholderItem[] = [
  {
    id: "proj-ph-1",
    title: "Spatial Logistics & Dispatch Network",
    shortContext: "Operations Research, Facility Architecture",
    category: "Operations Research",
    year: "2024",
    description:
      "Provisional structural case study modeling multi-echelon facility layout, aisle transit optimization, and algorithmic routing heuristics.",
    methodologyOverview:
      "Mixed-integer linear programming (MILP) formulation coupled with graph pathfinding heuristics for high-density warehouse dispatch.",
    deliverablePreview:
      "Dual-node network topology visualization and cross-dock transit latency matrix.",
    isPlaceholder: true,
  },
  {
    id: "proj-ph-2",
    title: "Discrete-Event Manufacturing Digital Twin",
    shortContext: "Simulation Modeling, Production Lines",
    category: "Stochastic Simulation",
    year: "2023 – 2024",
    description:
      "Provisional structural model evaluating dynamic line starvation, stochastic machine downtime distributions, and buffer inventory thresholds.",
    methodologyOverview:
      "Arena simulation model evaluating closed feedback loops and Monte Carlo cycle variance under variable batch releases.",
    deliverablePreview:
      "Dynamic bottleneck identification heat map and automated throughput sensitivity dashboard.",
    isPlaceholder: true,
  },
  {
    id: "proj-ph-3",
    title: "Dynamic Corporate Valuation & LBO Matrix",
    shortContext: "Financial Modeling, Strategic Advisory",
    category: "Quantitative Finance",
    year: "2023",
    description:
      "Provisional financial analysis evaluating enterprise debt capacity, multi-scenario EBITDA waterfalls, and return sensitivities.",
    methodologyOverview:
      "Three-statement integrated financial model featuring automated debt schedule cascades and Monte Carlo IRR distributions.",
    deliverablePreview:
      "Multi-scenario executive valuation matrix with dynamic hurdle rate benchmarking.",
    isPlaceholder: true,
  },
];

// =============================================================================
// 3. COMPETITION STRUCTURAL PLACEHOLDERS (Testing IA & visual layout only)
// Note: Factual competition population will occur in a dedicated content pass.
// =============================================================================
export const COMPETITION_PLACEHOLDERS: CompetitionPlaceholderItem[] = [
  {
    id: "comp-ph-1",
    title: "Industrial Engineering Competition (IECOM) 2026",
    period: "2026",
    challengeContext:
      "National corporate strategy challenge for by.U (Telkomsel digital telco brand) tackling market share erosion and youth-segment merchandise acquisition stagnation through 2028.",
    role: "Lead Strategist & Quantitative Modeler",
    resultPlacement: "1st Runner-Up / 2nd Place",
    keyOutput:
      "Formulated the 'B.Y.U Strategy' integrating multi-scenario linear regression demand forecasting, customer journey offline-to-online activation, and interactive Python Dash analytical models.",
    isPlaceholder: true,
  },
  {
    id: "comp-ph-2",
    title: "Hyundai Eco Summit 2025 (MUN Simulation)",
    period: "2025",
    challengeContext:
      "Multi-lateral environmental governance and sustainability negotiation addressing Global Environmental Data Inequality across developing nations.",
    role: "Delegate of Thailand",
    resultPlacement: "Selected Delegate / Participant",
    keyOutput:
      "Authored comprehensive policy paper and resolution framework proposing the 'Global Green Data Partnership' funded via IMF RST and green bonds under UNEP/World Bank standards.",
    isPlaceholder: true,
  },
  {
    id: "comp-ph-3",
    title: "Hackathon Digital Cooperatives 2026 (SIMKOPDES)",
    period: "2026",
    challengeContext:
      "National digital cooperative modernization challenge by Kementerian Koperasi RI & PEBS FEB UI developing real-time digital governance for Koperasi Desa/Kelurahan Merah Putih (KDKMP).",
    role: "Systems & Digital Solution Innovator",
    resultPlacement: "Top 100 Selected Participant",
    keyOutput:
      "Engineered digital platform architecture integrating real-time rural commodity tracking, transparent financial ledgers, and grassroots member services.",
    isPlaceholder: true,
  },
];

// =============================================================================
// 4. CANONICAL ACADEMICS & RECOGNITION DATA (Sourced from docs/CONTENT.md)
// =============================================================================
export const CANONICAL_ACADEMICS_DATA: AcademicRecord = {
  institution: "Institut Teknologi Bandung",
  degree: "Bachelor of Science (B.S.)",
  department: "Industrial Engineering (Teknik Industri)",
  period: "2022 – 2026 (Expected)",
  gpa: "3.83 / 4.00",
  academicStanding: "TOP 3 Ranked Student (Cohort of 120+)",
  focusAreas: [
    "Linear & Mixed-Integer Programming (MILP)",
    "Stochastic Discrete-Event Simulation",
    "Supply Chain Network Engineering",
    "Corporate Valuation & Financial Modeling",
    "Statistical Quality Control & Queuing Theory",
  ],
  scholarships: [
    {
      name: "Merit Scholarship Award",
      year: "2025",
      note: "Awarded for consistent academic distinction and institutional leadership potential.",
    },
    {
      name: "Undergraduate Academic Excellence Grant",
      year: "2023 – 2024",
      note: "Merit-based institutional award recognizing top-tier scholastic ranking in Industrial Engineering.",
    },
  ],
  honors: [
    {
      name: "National Case Competition",
      year: "2024",
      note: "Winner (1st Place) in strategic business case analysis and financial presentation.",
    },
    {
      name: "Dean's List / High Distinction Standing",
      year: "2022 – Present",
      note: "Maintained continuous high distinction across all academic semesters.",
    },
  ],
};

// =============================================================================
// 5. INTERESTS & CURRENT FOCUS DATA (Homepage only)
// =============================================================================
export const CURRENT_INTERESTS_DATA: InterestItem[] = [
  {
    domain: "Algorithmic Operations Research",
    currentFocus:
      "Investigating branch-and-price algorithms and decomposition methods for complex stochastic routing environments.",
    readingThemes: ["Large-scale MILP solvers", "Vehicle routing under demand uncertainty", "Column generation heuristics"],
  },
  {
    domain: "Quantitative Capital Allocation",
    currentFocus:
      "Exploring dynamic DCF sensitivity distributions and risk-adjusted capital structure optimization across capital-intensive assets.",
    readingThemes: ["Corporate finance valuation mechanics", "Real options analysis", "Supply chain capital intensity"],
  },
  {
    domain: "Industrial Systems Simulation",
    currentFocus:
      "Deepening stochastic queuing models and variance reduction techniques for high-throughput discrete-event assembly lines.",
    readingThemes: ["Simulation-based optimization", "Buffer allocation heuristics", "Markov decision processes"],
  },
];
