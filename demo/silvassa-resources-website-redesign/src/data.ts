export const COMPANY = {
  name: "Silvassa Resources",
  full: "Silvassa Resources Private Limited",
  group: "Dixit Group of Companies",
  tagline: "We change the world of work",
  phone: "0260 - 2633385",
  phoneRaw: "+912602633385",
  email: "srplsilvassa@gmail.com",
  website: "silvassaresources.com",
  address:
    "Shop no. 228-230, 2nd Floor, Landmark Business Hub, Nr. Civil Court, Tokarkhada, Silvassa, U.T. of Dadra & Nagar Haveli – 396230",
  mapUrl: "https://goo.gl/maps/7jkWNRRcPcYPuwDJ8",
  hoursWeek: "Mon – Fri: 10:00 AM – 5:00 PM",
  hoursWeekend: "Sat – Sun: 10:00 AM – 1:00 PM",
  founded: "1996",
  incorporated: "2007",
};

export const STATS = [
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 250, suffix: "+", label: "Satisfied Companies" },
  { value: 5000, suffix: "+", label: "Employees Paid / Month" },
  { value: 6, suffix: "+", label: "States of Operation" },
];

export type Sector = { name: string; icon: string };

export const SECTORS: Sector[] = [
  { name: "Manufacturing", icon: "🏭" },
  { name: "Textile Industries", icon: "🧵" },
  { name: "Pharmaceutical", icon: "💊" },
  { name: "Engineering", icon: "⚙️" },
  { name: "Chemical", icon: "🧪" },
  { name: "Printing", icon: "🖨️" },
  { name: "Oil & Lubricant", icon: "🛢️" },
  { name: "Food Processing", icon: "🍱" },
  { name: "Electronics", icon: "🔌" },
  { name: "Paper Products", icon: "📄" },
  { name: "Agricultural", icon: "🌾" },
  { name: "Plastic Granule", icon: "♻️" },
  { name: "Rubber Manufacturing", icon: "🛞" },
  { name: "Stationery", icon: "✏️" },
];

export type Role = { title: string; desc: string };

export const ROLES: Role[] = [
  { title: "Welders", desc: "Certified arc, MIG & TIG welders for precision fabrication." },
  { title: "Fitters & Machinists", desc: "Assembly, fitting and CNC machine operation experts." },
  { title: "Electricians", desc: "Licensed electricians for industrial wiring & maintenance." },
  { title: "Lab Technicians", desc: "Quality control & laboratory testing professionals." },
  { title: "Painters", desc: "Industrial spray, powder coat and surface finishing." },
  { title: "Data Entry Operators", desc: "Accurate back-office and documentation staff." },
  { title: "Skilled Resources", desc: "Trade-tested specialists matched to your line." },
  { title: "Helpers & Workers", desc: "Reliable general workforce for every shift." },
];

export const WHY = [
  {
    title: "Full Sponsorship & Compliance",
    desc: "We take complete ownership of compensation, insurance and labour-law obligations for every worker we deploy.",
    icon: "shield",
  },
  {
    title: "Payroll Management",
    desc: "End-to-end payroll for your contract staff — statutory deductions, ESIC, PF and timely disbursement handled.",
    icon: "wallet",
  },
  {
    title: "Trade-Tested Talent",
    desc: "Every candidate is screened, skill-verified and matched to the exact requirement of your production line.",
    icon: "badge",
  },
  {
    title: "Rapid Deployment",
    desc: "A ready bench of skilled and semi-skilled manpower lets us mobilise teams at remarkably short notice.",
    icon: "bolt",
  },
];

export const PROCESS = [
  { step: "01", title: "Understand", desc: "We map your role specs, volumes, shift patterns and compliance needs." },
  { step: "02", title: "Source & Screen", desc: "Candidates are sourced, skill-tested and background verified." },
  { step: "03", title: "Deploy", desc: "Vetted manpower is mobilised on-site under our sponsorship." },
  { step: "04", title: "Manage", desc: "Ongoing payroll, attendance, compliance & replacement support." },
];

/* ---- About page ---- */
export const REGISTRATIONS = [
  { label: "EPFO Registered", desc: "Employees' Provident Fund Organisation compliant." },
  { label: "GST Registered", desc: "Fully registered under the Goods & Services Tax act." },
  { label: "Service Tax Act", desc: "Registered and statute-compliant operations." },
  { label: "Govt. Statute Compliant", desc: "We follow all government regulations end-to-end." },
];

export const SISTER_CONCERNS = [
  { name: "Dixit & Company", type: "Proprietary Firm" },
  { name: "Pratibha A Dixit", type: "Proprietary Firm" },
];

export type Member = { name: string; role: string };

export const TEAM: Member[] = [
  { name: "Amit Dixit", role: "Director" },
  { name: "Abhishek Dixit", role: "Director" },
];

/* ---- Mission: the 3 E's ---- */
export const MISSION_PILLARS = [
  {
    e: "Engage",
    title: "Engage manpower by skill",
    desc: "We collaborate with a perfect recruitment plan and workforce solution that grows with you — matching the right people to the right roles.",
    icon: "badge",
  },
  {
    e: "Endeavour",
    title: "Endeavour to develop",
    desc: "We train, we consult and we offer strategic workforce advice within each candidate's particular field of expertise.",
    icon: "bolt",
  },
  {
    e: "Empower",
    title: "Empower through network",
    desc: "Our network empowers us to bring our clients an unlimited pool of talent — partnering for success, not just placement.",
    icon: "shield",
  },
];

/* ---- Services / specializations ---- */
export const SERVICES = [
  {
    title: "Contract Staffing",
    desc: "Flexible, sponsored contract workforce for short-term projects and ongoing operations alike.",
    icon: "badge",
  },
  {
    title: "Payroll Outsourcing",
    desc: "Complete payroll for your contract staff — PF, ESIC, statutory deductions and timely disbursement.",
    icon: "wallet",
  },
  {
    title: "HR & Compliance",
    desc: "100% compliance-oriented HR solutions covering labour law, insurance and statutory obligations.",
    icon: "shield",
  },
  {
    title: "Skilled Manpower Supply",
    desc: "Welders, fitters, electricians, technicians and more — trade-tested and ready to deploy.",
    icon: "bolt",
  },
  {
    title: "Recruitment Partnership",
    desc: "We work as HR partners, not contractors — focused on recruiting the right candidate for your success.",
    icon: "users",
  },
  {
    title: "Workforce Consulting",
    desc: "Strategic workforce planning and advisory to scale your teams efficiently and compliantly.",
    icon: "chart",
  },
];

export const VALUES = [
  { title: "Meticulous Planning", desc: "Every deployment is mapped to your exact role specs, volumes and shifts." },
  { title: "On-Time Mobilisation", desc: "A ready talent bench means teams arrive when you need them." },
  { title: "Perfect Execution", desc: "Skill-verified, background-checked workers who perform from day one." },
  { title: "Transparent Pricing", desc: "Clear, compliant and competitive — no hidden costs." },
];
