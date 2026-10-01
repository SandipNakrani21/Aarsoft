import { PageTransition } from "@/components/layout/PageTransition";

/* A template re-mounts on every navigation, which is what triggers the entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
