import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icon-names";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  /** Inverted colours for dark sections. */
  onDark?: boolean;
  icon?: IconName;
  children: ReactNode;
};

/** Pill-shaped link (brand manual 4.4). Internal paths navigate client-side. */
export function Button({
  href,
  variant = "outline",
  size = "md",
  onDark = false,
  icon,
  children,
}: ButtonProps) {
  const className = [
    styles.button,
    variant === "primary" && styles.primary,
    size === "sm" && styles.small,
    onDark && styles.onDark,
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
