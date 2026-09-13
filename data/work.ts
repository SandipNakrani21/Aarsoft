/**
 * Delivered platforms, taken from the Aarsoft reference site.
 *
 * Client names are deliberately absent and no numeric business results are
 * claimed — the "outcomes" describe what each platform does. Add client
 * names and measured results here once they are confirmed for publication.
 */

export type CaseStudy = {
  slug: string;
  /** Industry the platform was built for. */
  category: string;
  /** Short capability tags shown on the card. */
  tags: string[];
  title: string;
  excerpt: string;
  description: string;
  technology: string[];
  outcomes: string[];
  challenge: string;
  approach: string[];
  /** Accent controls which approved gradient the visual uses. */
  accent: "lavender" | "gold" | "dark";
  /** Abstract visual variant rendered for this project. */
  visual: "crm" | "ops" | "commerce" | "ai";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "travel-management-platform",
    category: "Travel & Hospitality",
    tags: ["Web", "CRM"],
    title: "Travel Management Platform",
    excerpt:
      "Streamlining bookings and guest journeys with a unified digital platform.",
    description:
      "A single platform covering enquiry, booking, itinerary and guest communication, so travel teams stop switching between disconnected tools.",
    technology: ["React", "ASP.NET Core", "SQL Server", "Azure"],
    outcomes: [
      "Enquiry through to booking in one workflow",
      "Itineraries generated from live booking data",
      "Guest communication tied to each reservation",
    ],
    challenge:
      "Booking details, itineraries and guest correspondence lived in separate systems and inboxes. Building one traveller's itinerary meant reconciling several sources by hand, and changes rarely reached everyone who needed them.",
    approach: [
      "Mapped the full journey from first enquiry to post-trip follow-up with the operations team",
      "Modelled bookings, itinerary items and guests so a change propagates everywhere at once",
      "Built itinerary generation directly from booking records rather than manual documents",
      "Connected guest communication to the reservation so history stays with the booking",
    ],
    accent: "lavender",
    visual: "crm",
  },
  {
    slug: "manufacturing-erp",
    category: "Manufacturing",
    tags: ["ERP"],
    title: "Manufacturing ERP",
    excerpt: "Connecting production, inventory and reporting in one system.",
    description:
      "An ERP built around a manufacturer's actual production process, linking shop floor activity to stock positions and management reporting.",
    technology: [".NET", "ASP.NET Core", "PostgreSQL", "Docker"],
    outcomes: [
      "Production, inventory and reporting on one record",
      "Live stock positions tied to production activity",
      "Reporting that does not depend on spreadsheets",
    ],
    challenge:
      "Production planning, stock and finance each kept their own numbers. Reconciling them was a monthly exercise, and by the time the report was ready the shop floor had already moved on.",
    approach: [
      "Modelled the production process with the people running it, including the undocumented exceptions",
      "Made inventory a single authoritative record that production activity updates directly",
      "Migrated legacy stock and order data with validation and reconciliation before cutover",
      "Built operational reporting on the live data rather than periodic exports",
    ],
    accent: "dark",
    visual: "ops",
  },
  {
    slug: "healthcare-management-platform",
    category: "Healthcare",
    tags: ["Business Management"],
    title: "Healthcare Management Platform",
    excerpt: "Bringing patient records and operations into a single workflow.",
    description:
      "A platform where scheduling, patient records and reporting share one workflow, designed around how clinical and administrative teams actually work.",
    technology: ["Angular", "ASP.NET Core", "SQL Server", "Azure"],
    outcomes: [
      "Scheduling and patient records in one workflow",
      "Role-based access across clinical and admin teams",
      "Reporting built on a single source of truth",
    ],
    challenge:
      "Appointments, patient records and reporting sat in separate systems. Staff re-keyed the same details repeatedly, and any question that spanned two systems took a person to answer.",
    approach: [
      "Established retention, access and audit requirements before designing the data model",
      "Built role-based access that reflects real clinical and administrative responsibilities",
      "Unified scheduling and records so one update is visible everywhere immediately",
      "Rolled out in stages with parallel running until each team signed off",
    ],
    accent: "lavender",
    visual: "ai",
  },
  {
    slug: "ecommerce-platform",
    category: "E-commerce",
    tags: ["Web", "CMS"],
    title: "E-commerce Platform",
    excerpt: "Powering product, orders and fulfillment for a growing storefront.",
    description:
      "A commerce platform connecting catalogue, orders, inventory and payments, built to stay consistent as the storefront grows.",
    technology: ["React", "Node.js", "PostgreSQL", "AWS"],
    outcomes: [
      "Catalogue and pricing managed in one place",
      "Orders and fulfillment connected to live stock",
      "Checkout performance tested against peak demand",
    ],
    challenge:
      "Stock levels differed between the storefront and the warehouse, so overselling during promotions was routine. Each incident cost a refund and, more often, a customer.",
    approach: [
      "Made inventory a single service that every channel reads from",
      "Introduced stock reservation at checkout rather than decrement at fulfillment",
      "Load-tested the checkout path against realistic peak-period traffic",
      "Built a back office showing catalogue, orders and stock together",
    ],
    accent: "gold",
    visual: "commerce",
  },
  {
    slug: "logistics-management-system",
    category: "Logistics",
    tags: ["ERP", "Workforce"],
    title: "Logistics Management System",
    excerpt: "Real-time visibility across shipments, fleets and warehouses.",
    description:
      "An operations system giving dispatch, drivers and warehouse teams the same live picture of every shipment.",
    technology: ["React", ".NET", "PostgreSQL", "Azure"],
    outcomes: [
      "Live shipment status across dispatch and warehouse",
      "Fleet and driver activity visible in one view",
      "Offline-tolerant updates from the field",
    ],
    challenge:
      "Shipment status depended on phone calls between dispatch, drivers and the warehouse. Nobody had the same picture at the same time, and customer updates were always one step behind.",
    approach: [
      "Built one shipment record that dispatch, drivers and warehouse all update",
      "Designed field updates to work on unreliable connections and sync when back online",
      "Added operational dashboards showing fleet and warehouse status together",
      "Instrumented the flow so delays surface to the team before the customer notices",
    ],
    accent: "dark",
    visual: "ops",
  },
  {
    slug: "workforce-rostering-platform",
    category: "Care Services",
    tags: ["Rostering", "HR"],
    title: "Workforce & Rostering Platform",
    excerpt: "Coordinating shifts and care teams with real-time scheduling.",
    description:
      "A rostering platform handling shift scheduling, attendance and coordination for care teams working in the field.",
    technology: ["React", "ASP.NET Core", "SQL Server", "CI/CD"],
    outcomes: [
      "Shift scheduling with real-time changes",
      "Attendance captured from the field",
      "Coordination across distributed care teams",
    ],
    challenge:
      "Rosters were built in spreadsheets and shared by message. A single change meant contacting everyone affected, and attendance had to be reconciled manually before payroll.",
    approach: [
      "Modelled shifts, availability and coverage rules with the scheduling team",
      "Built real-time roster changes that notify only the people affected",
      "Captured attendance in the field, including where connectivity is poor",
      "Connected attendance records to payroll reporting to remove manual reconciliation",
    ],
    accent: "gold",
    visual: "crm",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
