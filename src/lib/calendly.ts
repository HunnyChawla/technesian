import { SITE } from "@/lib/site";

export interface CalendlyPrefill {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  customAnswers?: Record<string, string>;
}

export interface CalendlyOptions {
  url?: string;
  prefill?: CalendlyPrefill;
  utm?: Record<string, string>;
}

export interface CalendlyBadgeOptions {
  url: string;
  text: string;
  color: string;
  textColor: string;
  branding?: boolean;
}

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: CalendlyBadgeOptions) => void;
      initPopupWidget: (options: CalendlyOptions) => void;
      closePopupWidget?: () => void;
    };
  }
}

/**
 * Appends website brand theme parameters to Calendly URLs.
 * Calendly requires hex colors without the '#' prefix.
 */
export function getCalendlyThemeUrl(baseUrl: string = SITE.calendlyUrl): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("primary_color", "0ea5e9");
    url.searchParams.set("text_color", "0b1729");
    url.searchParams.set("background_color", "ffffff");
    url.searchParams.set("hide_gdpr_banner", "1");
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/**
 * Programmatically triggers Calendly's interactive popup modal with brand theme.
 * Falls back to opening the URL in a new tab if the script was blocked by tracking protection.
 */
export function openCalendlyDemo(customUrl?: string) {
  const url = customUrl ? getCalendlyThemeUrl(customUrl) : getCalendlyThemeUrl();
  if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url });
  } else if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
