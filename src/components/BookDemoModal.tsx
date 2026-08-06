import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SITE } from "@/lib/site";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeMYQxNElE_-MkaNsTAaI3XrbQs65Ks7np8zflyUXJ1lmVZFg/viewform";

interface BookDemoModalProps {
  children: React.ReactElement;
}

export function BookDemoModal({ children }: BookDemoModalProps) {
  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule a personalized demo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 w-full flex-col bg-slate-50">
          <iframe
            src={`${FORM_URL}?embedded=true`}
            title="Book a demo — Cura by Technesian"
            loading="lazy"
            className="w-full flex-1 border-0"
          >
            Loading…
          </iframe>
          {/*
            The embed is cross-origin and is blocked outright by strict
            tracking-protection settings. Without this fallback the only
            conversion path on the site can silently disappear.
          */}
          <p className="border-t px-6 py-3 text-center text-xs text-muted-foreground">
            Form not loading?{" "}
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-strong underline underline-offset-2"
            >
              Open it in a new tab
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-primary-strong underline underline-offset-2"
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
