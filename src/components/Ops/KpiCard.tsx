import React from "react";

/**
 * Props for the KpiCard component.
 */
export interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  tone?: "brand" | "cyan" | "success" | "warning" | "danger";
}

/**
 * Standardized KPI display card for operational dashboards.
 * 
 * @param {KpiCardProps} props - Component properties.
 * @returns {React.ReactElement} The KPI card markup.
 */
export function KpiCard({
  icon,
  label,
  value,
  sub,
  tone = "brand",
}: KpiCardProps): React.ReactElement {
  const grad =
    tone === "brand" ? "bg-gradient-brand"
    : tone === "cyan" ? "bg-gradient-cyan"
    : tone === "success" ? "bg-success"
    : tone === "warning" ? "bg-warning"
    : "bg-danger";
  
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${grad} text-white shadow-glow`}>
          {icon}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-4 text-3xl font-extrabold">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
