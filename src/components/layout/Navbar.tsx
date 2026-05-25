"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BookDemoModal } from "@/components/BookDemoModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/cura-logo-v2.png"
            alt="Cura by Technesian"
            width={130}
            height={44}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {["Features", "About", "Benefits"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().split(' ')[0]}`}
              className="relative text-foreground/80 hover:text-primary transition-colors py-2 group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <BookDemoModal>
            <Button className="bg-primary hover:bg-primary-strong text-white font-medium rounded-full px-7 h-11 shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:-translate-y-0.5">
              Book a Demo
            </Button>
          </BookDemoModal>
        </div>
      </div>
    </header>
  );
}
