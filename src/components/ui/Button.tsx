import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
};

const base = "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 will-change-transform active:scale-[0.97]";
const variants = {
  primary: "bg-primary text-white hover:bg-primary-soft hover:shadow-glow",
  secondary: "glass text-ink hover:border-white/25 hover:bg-white/[0.07]",
  ghost: "text-ink-muted hover:text-ink",
};
const sizes = { md: "h-10 px-5 text-sm", lg: "h-12 px-7 text-[0.95rem]" };

export function Button({ variant = "primary", size = "lg", className = "", children, ...rest }: Props) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
