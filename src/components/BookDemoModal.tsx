import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BookDemoModalProps {
  children: ReactNode;
}

export function BookDemoModal({ children }: BookDemoModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule a personalized demo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full bg-slate-50">
          {/* Actual Google Form embedded link */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeMYQxNElE_-MkaNsTAaI3XrbQs65Ks7np8zflyUXJ1lmVZFg/viewform?embedded=true"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full h-full"
          >
            Loading…
          </iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
