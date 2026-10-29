"use client";

import { useEffect, useCallback } from "react";
import { getCalendlyThemeUrl } from "@/lib/calendly";

export function CalendlyEmbed() {
  const initBadge = useCallback(() => {
    if (typeof window === "undefined" || !window.Calendly?.initBadgeWidget) {
      return;
    }

    if (document.querySelector(".calendly-badge-widget")) {
      return;
    }

    window.Calendly.initBadgeWidget({
      url: getCalendlyThemeUrl(),
      text: "Schedule time with me",
      color: "#0ea5e9",
      textColor: "#ffffff",
      branding: false,
    });
  }, []);

  useEffect(() => {
    // Unregister any rogue service workers on localhost
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    // 1. Inject external stylesheet
    const cssId = "calendly-widget-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // 2. Inject external script
    const scriptId = "calendly-widget-js";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        initBadge();
      };
      document.body.appendChild(script);
    } else {
      initBadge();
    }
  }, [initBadge]);

  return null;
}
