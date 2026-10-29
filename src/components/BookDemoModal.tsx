"use client";

import React from "react";
import { openCalendlyDemo } from "@/lib/calendly";

interface BookDemoModalProps {
  children: React.ReactNode;
  /** Optional custom Calendly URL override for specific demo event types */
  url?: string;
  className?: string;
}

export function BookDemoModal({ children, url, className }: BookDemoModalProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openCalendlyDemo(url);
  };

  return (
    <span
      onClick={handleClick}
      className={className ? `contents ${className}` : "contents"}
      style={{ display: "contents" }}
      role="presentation"
    >
      {children}
    </span>
  );
}
