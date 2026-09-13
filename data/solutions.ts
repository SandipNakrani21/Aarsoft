import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CircuitBoard,
  ClipboardList,
  Gauge,
  LayoutGrid,
  ShoppingCart,
  Users,
  UserSquare2,
  Zap,
} from "lucide-react";

export type Solution = {
  title: string;
  icon: LucideIcon;
  /** Business value, not the technology. */
  value: string;
  outcomes: string[];
};

export const solutions: Solution[] = [
  {
    title: "SaaS Platforms",
    icon: Gauge,
    value:
      "Turn a product idea into a multi-tenant platform you can sell, bill and support without rebuilding it at every stage of growth.",
    outcomes: ["Multi-tenant architecture", "Subscription billing", "Usage analytics"],
  },
  {
    title: "Enterprise Software",
    icon: Building2,
    value:
      "Replace the manual coordination between departments with systems that hold the process, the permissions and the audit trail.",
    outcomes: ["Role-based access", "Audit trails", "Department workflows"],
  },
  {
    title: "CRM Systems",
    icon: UserSquare2,
    value:
      "Give sales one place to see every account, so forecasting stops depending on who remembers to update a spreadsheet.",
    outcomes: ["Pipeline visibility", "Activity history", "Forecast reporting"],
  },
  {
    title: "ERP Systems",
    icon: LayoutGrid,
    value:
      "Connect inventory, procurement, production and finance so a single change updates everywhere at once.",
    outcomes: ["Single source of truth", "Faster month-end", "Live stock positions"],
  },
  {
    title: "E-commerce",
    icon: ShoppingCart,
    value:
      "Sell across channels with stock, pricing and orders staying consistent, even during your busiest week of the year.",
    outcomes: ["Multi-channel stock", "Checkout performance", "Order orchestration"],
  },
  {
    title: "Business Automation",
    icon: Zap,
    value:
      "Remove the repetitive handoffs that quietly consume a day of your team's week, every week.",
    outcomes: ["Approval workflows", "Scheduled processes", "Exception handling"],
  },
  {
    title: "AI Applications",
    icon: CircuitBoard,
    value:
      "Make the knowledge already inside your business searchable, and let routine judgement calls happen in seconds.",
    outcomes: ["Grounded assistants", "Document extraction", "Human review steps"],
  },
  {
    title: "Customer Portals",
    icon: Users,
    value:
      "Let customers check status, download documents and raise requests themselves, instead of emailing your team.",
    outcomes: ["Self-service status", "Secure documents", "Reduced support load"],
  },
  {
    title: "Internal Business Tools",
    icon: ClipboardList,
    value:
      "Replace the fragile spreadsheet that runs a critical process with something your team can rely on.",
    outcomes: ["Validated data entry", "Clear ownership", "Change history"],
  },
];
