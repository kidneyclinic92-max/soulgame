"use client";

import { useState } from "react";
import Link from "next/link";

/** Logo from public/assets. Place your logo at public/assets/logo.png (or .svg / .webp). */
export const LOGO_SRC = "/assets/logo.png";

type LogoSize = "sm" | "md" | "lg";

const sizeMap: Record<LogoSize, string> = {
  sm: "h-6 w-auto",
  md: "h-8 w-auto",
  lg: "h-10 w-auto",
};

interface LogoProps {
  href?: string;
  size?: LogoSize;
  className?: string;
}

export default function Logo({ href = "/", size = "md", className = "" }: LogoProps) {
  const [error, setError] = useState(false);
  const sizeClass = sizeMap[size];

  const image = error ? (
    <span className="font-display text-lg font-bold tracking-wider">
      <span className="text-white">SOUL</span>
      <span className="text-brand-400">GAMING</span>
    </span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Soul Gaming"
      className={`object-contain ${sizeClass} ${className}`}
      onError={() => setError(true)}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center gap-2 group">
        {image}
      </Link>
    );
  }

  return <span className="inline-flex items-center">{image}</span>;
}
