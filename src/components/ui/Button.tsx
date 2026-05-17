import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gold text-background hover:bg-gold-light",
  secondary:
    "bg-transparent text-gold border border-gold/60 hover:bg-gold/10",
  outline:
    "bg-transparent text-foreground border border-border-strong hover:border-foreground",
  ghost: "bg-transparent text-foreground hover:text-gold",
};

const base =
  "inline-flex items-center justify-center px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-200";

export function Button({
  children,
  variant = "primary",
  className,
  href,
  type = "button",
}: Props) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
