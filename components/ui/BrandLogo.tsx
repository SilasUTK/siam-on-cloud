import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  variant?: "default" | "light" | "dark";
  showText?: boolean;
  className?: string;
};

const variantStyles = {
  default: {
    iconWrap: "border-cyan-200 bg-cyan-50 text-cyan-800",
    title: "text-slate-900",
    slogan: "text-slate-600",
  },
  light: {
    iconWrap: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
    title: "text-white",
    slogan: "text-slate-300",
  },
  dark: {
    iconWrap: "border-slate-800 bg-slate-900 text-slate-100",
    title: "text-slate-900",
    slogan: "text-slate-700",
  },
} as const;

export function BrandLogo({
  variant = "default",
  showText = true,
  className,
}: BrandLogoProps) {
  const styles = variantStyles[variant];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl border",
          styles.iconWrap
        )}
        aria-hidden
      >
        <Sparkles size={18} strokeWidth={2.2} />
      </span>
      {showText ? (
        <span className="flex min-w-0 flex-col">
          <span className={cn("truncate text-base font-semibold", styles.title)}>
            Siam On Cloud
          </span>
          <span className={cn("truncate text-xs", styles.slogan)}>
            Elevation of Future Journeys
          </span>
        </span>
      ) : null}
    </span>
  );
}