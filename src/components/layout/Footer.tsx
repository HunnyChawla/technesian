import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Eye Hospital Suite", href: "/#eye-hospital" },
  { label: "Live Queue & TV Display", href: "/#queue" },
];

const companyLinks = [
  { label: "About Technesian", href: "/#about" },
  { label: "Why Cura", href: "/#benefits" },
  { label: "Pricing FAQ", href: "/pricing#faq" },
];

export function Footer() {
  return (
    <footer className="bg-[#071120] py-14 text-slate-300 md:py-16">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/cura-logo-v2.png"
                alt=""
                width={44}
                height={44}
                className="size-11 shrink-0 object-contain opacity-95 brightness-0 invert"
              />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                  Cura
                </span>
                <span className="mt-0.5 text-[0.65rem] font-medium tracking-[0.14em] text-slate-400 uppercase">
                  by Technesian
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A complete hospital management system — OPD to discharge, lab to
              billing — built in India for hospitals that want their day to run
              on one screen.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-white">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-white">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="size-5 shrink-0 text-primary" />
                <a
                  href="mailto:contact@technesian.com"
                  className="break-all transition-colors hover:text-primary"
                >
                  contact@technesian.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="size-5 shrink-0 text-primary" />
                <a
                  href="tel:+919896853727"
                  className="transition-colors hover:text-primary"
                >
                  +91 98968 53727
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-5 shrink-0 text-primary" />
                <span>
                  Technesian HQ
                  <br />
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Technesian. All rights reserved.</p>
          <p>Built by Technesian</p>
        </div>
      </div>
    </footer>
  );
}
