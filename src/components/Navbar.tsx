"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import WalletButton from "@/components/web3/WalletButton";
import { useUser } from "@/context/UserContext";

const navLinks = [
  { name: "Home", href: "/#hero" },
  { name: "Community", href: "/#community-driven" },
  { name: "Craft & Collect", href: "/#craft-collect" },
  { name: "Mint NFT", href: "/#mint-nft" },
  { name: "Future NFT", href: "/#future-nft" },
  { name: "Join Discord", href: "/#join-discord" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useUser();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-black border-b border-white/5 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo href="/" size="lg" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105 md:h-14" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-base font-medium text-brand-300 hover:text-brand-200
                           rounded-lg hover:bg-brand-500/10 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Wallet */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-base font-medium text-brand-300 hover:text-brand-200
                           transition-colors duration-200"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-base font-medium text-brand-300 hover:text-brand-200
                           transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-brand-400 hover:text-brand-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-surface-800/50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-brand-300 hover:text-brand-200 hover:bg-brand-500/10
                           rounded-lg transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-surface-800/50 mt-2">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 text-base font-medium text-brand-300 hover:text-brand-200
                             border border-brand-500/30 rounded-lg transition-all duration-200"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 text-base font-medium text-brand-300 hover:text-brand-200
                             border border-brand-500/30 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
              <div className="flex justify-center">
                <WalletButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
