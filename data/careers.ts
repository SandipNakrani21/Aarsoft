/**
 * Sample roles. These are illustrative openings — replace `openRoles` with
 * real vacancies before publishing, or set it to an empty array to show the
 * "no current openings" state.
 */

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Clock,
  Globe2,
  HeartPulse,
  Sprout,
  Users2,
} from "lucide-react";

export type Role = {
  slug: string;
  title: string;
  discipline: "Engineering" | "Design" | "Quality" | "Platform";
  location: string;
  type: "Full-time" | "Contract";
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const openRoles: Role[] = [
  {
    slug: "dotnet-developer",
    title: ".NET Developer",
    discipline: "Engineering",
    location: "Hybrid / Remote",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Build and maintain ASP.NET Core services behind business platforms used every day by operational teams.",
    responsibilities: [
      "Design and build APIs and background services in ASP.NET Core",
      "Model relational data and write queries that stay fast as volume grows",
      "Review pull requests and contribute to engineering standards",
    ],
    requirements: [
      "Solid C# and ASP.NET Core experience",
      "Comfortable with SQL Server or PostgreSQL",
      "Familiarity with automated testing and CI pipelines",
    ],
  },
  {
    slug: "angular-developer",
    title: "Angular Developer",
    discipline: "Engineering",
    location: "Hybrid / Remote",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Build data-heavy interfaces that stay responsive and accessible as the product grows.",
    responsibilities: [
      "Build features in Angular with TypeScript and RxJS",
      "Turn design system components into reusable, accessible code",
      "Profile and improve front-end performance",
    ],
    requirements: [
      "Strong Angular and TypeScript experience",
      "Understanding of accessible markup and keyboard interaction",
      "Experience consuming and shaping REST APIs",
    ],
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    discipline: "Engineering",
    location: "Hybrid / Remote",
    type: "Full-time",
    experience: "3–6 years",
    summary:
      "Own features end to end, from data model through interface, on custom platforms and web applications.",
    responsibilities: [
      "Deliver features across the stack with React or Angular and .NET or Node.js",
      "Contribute to architecture decisions and technical planning",
      "Support releases and investigate production issues",
    ],
    requirements: [
      "Production experience on both front end and back end",
      "Confidence with relational data modelling",
      "Clear written communication for specs and reviews",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    discipline: "Design",
    location: "Hybrid / Remote",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Design complex business applications, from research through a component system engineers can build exactly.",
    responsibilities: [
      "Run user interviews and usability testing",
      "Design flows and interfaces for data-heavy products",
      "Maintain and extend the shared design system",
    ],
    requirements: [
      "Portfolio showing applied product work, not only visual concepts",
      "Fluency in Figma and component-based design",
      "Working knowledge of WCAG requirements",
    ],
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    discipline: "Quality",
    location: "Hybrid / Remote",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Own quality across delivery, from test strategy to automation running in the pipeline.",
    responsibilities: [
      "Define test strategy and write automated end-to-end tests",
      "Maintain regression suites inside CI",
      "Investigate defects and drive them to root cause",
    ],
    requirements: [
      "Experience with a modern automation framework",
      "Strong API testing skills",
      "Precise, reproducible defect reporting",
    ],
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    discipline: "Engineering",
    location: "Hybrid / Remote",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Build retrieval and automation systems grounded in client data, with evaluation built in.",
    responsibilities: [
      "Build retrieval pipelines over client documents and structured data",
      "Design evaluation sets and track accuracy across changes",
      "Integrate AI capabilities into existing production systems",
    ],
    requirements: [
      "Python or TypeScript experience building with AI APIs",
      "Understanding of retrieval, embeddings and evaluation",
      "Judgement about where a human review step is required",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    discipline: "Platform",
    location: "Hybrid / Remote",
    type: "Full-time",
    experience: "3–6 years",
    summary:
      "Build the pipelines, environments and monitoring that make deployment routine.",
    responsibilities: [
      "Define infrastructure as code on Azure or AWS",
      "Build and maintain CI/CD pipelines",
      "Set up logging, metrics and alerting tied to user impact",
    ],
    requirements: [
      "Hands-on Azure or AWS experience",
      "Docker and container orchestration",
      "Infrastructure as code in a production setting",
    ],
  },
];

export const benefits: { title: string; icon: LucideIcon; description: string }[] = [
  {
    title: "Flexible working",
    icon: Clock,
    description: "Hybrid and remote arrangements, with hours that fit around real life.",
  },
  {
    title: "Learning budget",
    icon: BookOpen,
    description: "Time and budget for courses, certifications and conferences each year.",
  },
  {
    title: "Real ownership",
    icon: Sprout,
    description: "You own features end to end, including the decisions that shape them.",
  },
  {
    title: "Health cover",
    icon: HeartPulse,
    description: "Medical cover for you and your immediate family.",
  },
  {
    title: "Global projects",
    icon: Globe2,
    description: "Work with clients across industries and regions, not one account forever.",
  },
  {
    title: "Small teams",
    icon: Users2,
    description: "Project teams stay small, so your work is visible and your voice carries.",
  },
];

export const culturePoints: { title: string; description: string }[] = [
  {
    title: "Engineers talk to clients",
    description:
      "The people building the system join the conversations that shape it. Requirements do not arrive through three layers of translation.",
  },
  {
    title: "Reviews are for learning",
    description:
      "Code review exists to improve the code and the engineer, not to gatekeep. Nobody merges alone, including senior engineers.",
  },
  {
    title: "Estimates are honest",
    description:
      "We do not commit teams to dates that require weekend work. When something is late, we say so early.",
  },
  {
    title: "Deep work is protected",
    description:
      "Meetings are clustered so there are long uninterrupted blocks. Most days have one scheduled call at most.",
  },
];
