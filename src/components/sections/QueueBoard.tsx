import { Monitor } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * A stylised illustration of the live token board (feature #5), used as the
 * hero visual. Deliberately an illustration rather than a screenshot — swap
 * this component out for a real product screenshot once one is available.
 */

const rows = [
  { token: "A-114", name: "Rahul S.", room: "Room 3", doctor: "Dr. Mehta" },
  { token: "A-115", name: "Priya K.", room: "Room 1", doctor: "Dr. Iyer" },
  { token: "B-032", name: "Aman T.", room: "Room 5", doctor: "Dr. Bansal" },
  { token: "B-033", name: "Neha G.", room: "Room 2", doctor: "Dr. Iyer" },
];

export function QueueBoard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-border/80 bg-card shadow-[var(--shadow-pop)]",
        className
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/70 px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-amber-400/70" />
        <span className="size-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Monitor className="size-3.5" />
          Waiting area display
        </span>
      </div>

      <div className="p-5 md:p-6">
        {/* Now serving */}
        <div className="mb-5 flex items-center justify-between rounded-2xl bg-primary-deep px-5 py-4 text-white">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">
              Now serving
            </p>
            <p className="font-heading text-3xl font-extrabold tracking-tight">
              A-113
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Dr. Mehta</p>
            <p className="text-xs text-white/70">Consultation Room 3</p>
          </div>
        </div>

        {/* Up next */}
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          Up next
        </p>
        <ul className="space-y-2.5">
          {rows.map((row, index) => (
            <li
              key={row.token}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-background px-4 py-3"
            >
              <span
                className={cn(
                  "rounded-lg px-2.5 py-1 font-heading text-sm font-bold tabular-nums",
                  index === 0
                    ? "bg-accent/15 text-accent-strong"
                    : "bg-muted text-ink-soft"
                )}
              >
                {row.token}
              </span>
              <span className="flex-1 truncate text-sm font-medium text-ink">
                {row.name}
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {row.doctor}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {row.room}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Updates live as reception and doctors move the queue
        </div>
      </div>
    </div>
  );
}
