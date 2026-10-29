import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { SITE } from "@/lib/site";
import {
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";

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
                src="/technesian-mark.png"
                alt="Technesian"
                width={44}
                height={44}
                className="size-11 shrink-0 object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                  Technesian
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-[0.65rem] font-semibold tracking-[0.12em] text-cyan-400 uppercase">
                  <Image
                    src="/cura-mark.png"
                    alt=""
                    width={12}
                    height={12}
                    className="size-3 shrink-0 object-contain"
                  />
                  Cura HMS
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Cura is our complete hospital management system — OPD to discharge,
              lab to billing — built by Technesian for hospitals that want their
              day to run on one screen.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Follow us
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Technesian on LinkedIn"
                  className="flex size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all hover:bg-[#0077b5] hover:text-white hover:-translate-y-0.5"
                >
                  <LinkedInIcon className="size-4" />
                </a>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Technesian on Instagram"
                  className="flex size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:-translate-y-0.5"
                >
                  <InstagramIcon className="size-4" />
                </a>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Technesian on Facebook"
                  className="flex size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all hover:bg-[#1877f2] hover:text-white hover:-translate-y-0.5"
                >
                  <FacebookIcon className="size-4" />
                </a>
                <a
                  href={SITE.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Technesian on YouTube"
                  className="flex size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all hover:bg-[#ff0000] hover:text-white hover:-translate-y-0.5"
                >
                  <YouTubeIcon className="size-4" />
                </a>
                <a
                  href={SITE.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Technesian on X"
                  className="flex size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all hover:bg-black hover:text-white hover:-translate-y-0.5"
                >
                  <XIcon className="size-3.5" />
                </a>
                <a
                  href={SITE.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Technesian on Google"
                  className="flex size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all hover:bg-white hover:text-[#4285f4] hover:-translate-y-0.5"
                >
                  <GoogleIcon className="size-4" />
                </a>
              </div>
            </div>
          </div>

          <nav aria-label="Product">
            <h2 className="mb-4 font-heading font-semibold text-white">
              Product
            </h2>
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
          </nav>

          <nav aria-label="Company">
            <h2 className="mb-4 font-heading font-semibold text-white">
              Company
            </h2>
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
          </nav>

          <div>
            <h2 className="mb-4 font-heading font-semibold text-white">
              Contact
            </h2>
            {/*
              This block is the site's NAP (name, address, phone). It must stay
              byte-identical to the Google Business Profile listing and to the
              LocalBusiness schema — Google matches the site to the listing by
              comparing them. Edit src/lib/site.ts, not this markup.
            */}
            <address className="space-y-3 text-sm text-slate-400 not-italic">
              <div className="flex items-start gap-3">
                <Mail className="size-5 shrink-0 text-primary" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all transition-colors hover:text-primary"
                >
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 shrink-0 text-primary" />
                <a
                  href={`tel:${SITE.phone}`}
                  className="transition-colors hover:text-primary"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 shrink-0 text-primary" />
                <span className="not-italic">
                  {SITE.legalName}
                  <br />
                  {SITE.address.streetAddress}
                  <br />
                  {SITE.address.addressLocality}, {SITE.address.addressRegion}{" "}
                  {SITE.address.postalCode}
                </span>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <WhatsAppIcon className="size-5 shrink-0 text-[#25d366]" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    WhatsApp Chat
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <a
                      href={SITE.whatsapp.primary.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-300 transition-colors hover:text-[#25d366]"
                    >
                      {SITE.whatsapp.primary.display}
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href={SITE.whatsapp.secondary.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-300 transition-colors hover:text-[#25d366]"
                    >
                      {SITE.whatsapp.secondary.display}
                    </a>
                  </div>
                </div>
              </div>
            </address>
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
