import { cn } from "@/lib/utils/cn";

type SectionPadding = "none" | "sm" | "default" | "lg";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  padding?: SectionPadding;
};

const paddingStyles: Record<SectionPadding, string> = {
  none: "",
  sm: "py-12 md:py-16",
  default: "py-[var(--section-py)]",
  lg: "py-24 md:py-32",
};

export function Section({
  children,
  className,
  id,
  padding = "default",
}: Props) {
  return (
    <section id={id} className={cn(paddingStyles[padding], className)}>
      {children}
    </section>
  );
}
