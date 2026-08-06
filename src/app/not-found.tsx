import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

// No `export const metadata` here — metadata exports are only supported from
// page.tsx / layout.tsx. GitHub Pages already serves out/404.html with a real
// 404 status, so this needs no noindex either.
export default function NotFound() {
  return (
    <section className="mesh relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div className="shell relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <p className="font-heading text-6xl font-extrabold text-primary md:text-7xl">
            404
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-balance text-ink md:text-5xl">
            We can&apos;t find that page
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            The link may be out of date, or the page may have moved. Everything
            below is still where you left it.
          </p>

          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/">
              <Button className="h-13 rounded-full bg-primary px-7 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-strong">
                Back to home
                <ArrowRight className="ml-1 size-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                className="h-13 rounded-full border-primary/25 bg-card px-7 text-base font-semibold text-primary-strong hover:bg-primary/8"
              >
                See pricing
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Still stuck? Email{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-primary-strong underline underline-offset-4"
            >
              {SITE.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${SITE.phone}`}
              className="font-medium text-primary-strong underline underline-offset-4"
            >
              {SITE.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
