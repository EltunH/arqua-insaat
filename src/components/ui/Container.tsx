import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
};

export function Container({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
