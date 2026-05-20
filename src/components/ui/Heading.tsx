import { cn } from "@/lib/utils/cn";

type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";

type Props = {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: HeadingSize;
  className?: string;
  children: React.ReactNode;
};

const sizeStyles: Record<HeadingSize, string> = {
  display:
    "text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] leading-[0.95] tracking-tight",
  xl: "text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-tight",
  lg: "text-2xl sm:text-3xl md:text-5xl leading-tight tracking-tight",
  md: "text-xl sm:text-2xl md:text-3xl leading-tight",
  sm: "text-lg sm:text-xl md:text-2xl leading-snug",
};

export function Heading({
  as: Tag = "h2",
  size = "lg",
  className,
  children,
}: Props) {
  return (
    <Tag
      className={cn("font-heading text-balance", sizeStyles[size], className)}
    >
      {children}
    </Tag>
  );
}
