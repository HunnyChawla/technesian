import { Cloud, HeartPulse, Lock, ShieldCheck, Smartphone } from "lucide-react";

const points = [
  { icon: ShieldCheck, label: "ABDM / ABHA ready" },
  { icon: Lock, label: "Role-based access control" },
  { icon: Cloud, label: "Cloud or on-premise" },
  { icon: HeartPulse, label: "Multi-speciality" },
  { icon: Smartphone, label: "Works on any device" },
];

export function TrustBar() {
  return (
    <div className="border-y border-border/70 bg-card/60 py-6 backdrop-blur-sm">
      <div className="shell flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {points.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <Icon className="size-4 text-primary" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
