"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { cn } from "@/lib/utils";

/**
 * Homepage anchors are written as `/#id` rather than `#id` so they also work
 * when the user is on /pricing.
 */
const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Benefits", href: "/#benefits" },
  { label: "About", href: "/#about" },
];

const hashSectionIds = navItems
  .filter((item) => item.href.startsWith("/#"))
  .map((item) => item.href.slice(2));

/** Distance below the viewport top at which a section becomes "current". */
const SPY_MARKER = 140;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!onHome) {
        setActiveSection(null);
        return;
      }

      // Of the sections whose top has passed the marker, the lowest one on
      // the page is the one being read. Measured rather than assumed from
      // nav order, so reordering the page cannot desync the highlight.
      let current: string | null = null;
      let currentTop = -Infinity;
      let lastId: string | null = null;
      let lastTop = -Infinity;

      for (const id of hashSectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { top } = element.getBoundingClientRect();
        if (top > lastTop) {
          lastTop = top;
          lastId = id;
        }
        if (top <= SPY_MARKER && top > currentTop) {
          currentTop = top;
          current = id;
        }
      }

      // The final section can be too short to ever reach the marker, so it
      // would never highlight without this.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      setActiveSection(atBottom ? lastId : current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [onHome]);

  // The mobile menu closes from the link/button handlers below; Escape and a
  // scroll lock are handled here while it is open.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        solid
          ? "border-b border-border/70 bg-background/85 py-3 shadow-sm backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="shell flex items-center justify-between">
        {/* The logo asset is a square mark (500x500), so it is sized as an
            icon and paired with a wordmark rather than stretched to a bar. */}
        <Link href="/" className="group flex items-center gap-2.5">
          {/*
            cura-mark.png is a 96px source for a 44px slot. The 500px original
            was 208 KB, and `priority` preloaded all of it at highest priority
            — competing with the CSS and fonts that actually gate LCP, for a
            decorative mark. Both are gone.
          */}
          <Image
            src="/cura-mark.png"
            alt=""
            width={44}
            height={44}
            className="size-10 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 md:size-11"
          />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-xl font-extrabold tracking-tight text-ink">
              Cura
            </span>
            <span className="mt-0.5 text-[0.65rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
              by Technesian
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 text-sm font-medium md:flex"
        >
          {navItems.map((item) => {
            // Hash items share the homepage pathname, so keying off the
            // pathname alone lit all of them at once. Which one is current
            // is a scroll position, not a route.
            const isHash = item.href.startsWith("/#");
            const active = isHash
              ? onHome && activeSection === item.href.slice(2)
              : item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? (isHash ? "location" : "page") : undefined}
                className={cn(
                  "group relative py-2 transition-colors hover:text-primary-strong",
                  active ? "text-primary-strong" : "text-foreground/80"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] w-full origin-left bg-primary transition-transform duration-300 ease-out",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <BookDemoModal>
            <Button className="hidden h-11 rounded-full bg-primary px-7 font-medium text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-lg sm:inline-flex">
              Book a Demo
            </Button>
          </BookDemoModal>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-border/70 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border/60 py-4 font-heading text-lg font-semibold text-foreground last:border-b-0 hover:text-primary-strong"
            >
              {item.label}
            </Link>
          ))}
          <BookDemoModal>
            <Button className="mt-5 h-12 w-full rounded-full bg-primary text-base font-medium text-white shadow-md shadow-primary/25 hover:bg-primary-strong">
              Book a Demo
            </Button>
          </BookDemoModal>
        </nav>
      </div>
    </header>
  );
}
