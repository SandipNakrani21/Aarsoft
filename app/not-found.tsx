import Link from "next/link";
import { mainNav } from "@/data/site";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-20 pt-[calc(var(--nav-h)+4rem)]">
      <div aria-hidden="true" className="brand-grid mask-fade-b absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-[0.15] blur-[110px]"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] uppercase tracking-[0.18em] text-ink-500">
            Error 404
          </p>

          <h1 className="fluid-display mt-6 text-ink-900">
            This page doesn&apos;t <span className="text-accent">exist.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[46ch] text-xl leading-relaxed text-ink-500">
            The link may be out of date, or the page may have moved. Here is the way
            back.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" className="w-full sm:w-auto">
              Back to home
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
              Contact us
            </ButtonLink>
          </div>

          <nav aria-label="Site sections" className="mt-10 border-t border-ink-200 pt-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[1.125rem] text-ink-500 transition-colors hover:text-ink-900 link-gradient"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
