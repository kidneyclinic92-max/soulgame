"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trophy,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Wallet,
  Coins,
  Sparkles,
  Layers,
  Gamepad2,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useUser } from "@/context/UserContext";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Earnings", href: "/dashboard/earnings", icon: Coins },
  { name: "Play to Earn", href: "/dashboard/play-to-earn", icon: Sparkles },
  { name: "My Collection", href: "/dashboard/collection", icon: Layers },
  { name: "My Games", href: "/dashboard/games", icon: Gamepad2 },
  { name: "Tournaments", href: "/dashboard/tournaments", icon: Trophy },
  { name: "Statistics", href: "/dashboard/stats", icon: BarChart3 },
  { name: "Friends", href: "/dashboard/friends", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useUser();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  const initials = user?.username?.slice(0, 2).toUpperCase() || "SG";

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-surface-900/80 backdrop-blur-xl border-r border-surface-800/50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-surface-800/50">
          <Logo href="/" size="sm" className="h-6 w-auto" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-surface-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active ? "bg-brand-500/10 text-brand-300 border border-brand-500/20" : "text-surface-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <link.icon className="w-4.5 h-4.5 shrink-0" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-surface-800/50">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-800/30">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.username ?? "—"}</p>
              <p className="text-xs text-brand-400 truncate">{user?.totalPoints ?? 0} SOUL pts</p>
            </div>
            <button onClick={logout} className="p-1 text-surface-500 hover:text-white transition-colors" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50 flex items-center px-4 md:px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-surface-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
              <input type="text" placeholder="Search games, players..." className="input-field py-2 pl-9 text-sm bg-surface-900/40" />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 text-surface-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full" />
            </button>
            {isConnected ? (
              <button onClick={() => open({ view: "Account" })} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-500/20 bg-brand-500/5 hover:bg-brand-500/10 transition-all cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-white">{displayAddress}</span>
              </button>
            ) : (
              <button onClick={() => open()} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-700/50 text-surface-400 hover:text-white hover:border-brand-500/30 transition-all text-xs">
                <Wallet className="w-3.5 h-3.5" />
                Connect
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
