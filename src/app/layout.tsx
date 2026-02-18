import type { Metadata } from "next";
import { Inter, Orbitron, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soul Gaming | Next-Level Gaming Platform",
  description:
    "Join Soul Gaming — the ultimate gaming community. Compete in tournaments, connect with players, and level up your gaming experience.",
  keywords: [
    "gaming",
    "esports",
    "tournaments",
    "gaming community",
    "soul gaming",
  ],
  openGraph: {
    title: "Soul Gaming | Next-Level Gaming Platform",
    description:
      "Join Soul Gaming — the ultimate gaming community. Compete in tournaments, connect with players, and level up your gaming experience.",
    type: "website",
    locale: "en_US",
    siteName: "Soul Gaming",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} ${sora.variable} min-h-screen flex flex-col font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
