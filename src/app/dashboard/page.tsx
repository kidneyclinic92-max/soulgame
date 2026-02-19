"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coins,
  Sparkles,
  ChevronRight,
  Trophy,
  TrendingUp,
  Gamepad2,
  Wallet,
  Copy,
  Check,
} from "lucide-react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useUser } from "@/context/UserContext";

interface EarningsSummary {
  totalPoints: number;
  totalEarnings: number;
  transactions: Array<{
    id: string;
    amount: number;
    type: string;
    description: string | null;
    createdAt: string;
    game: { name: string } | null;
  }>;
}

interface PlayToEarnGame {
  id: string;
  name: string;
  slug: string;
  genre: string;
  pointsPerWin: number;
  pointsPerMatch: number;
}

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const [earnings, setEarnings] = useState<EarningsSummary | null>(null);
  const [p2eGames, setP2eGames] = useState<PlayToEarnGame[]>([]);
  const { user } = useUser();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    Promise.all([
      fetch("/api/user/earnings?limit=5", { headers: { Authorization: `Bearer ${token}` } }),
      fetch("/api/games/play-to-earn"),
    ])
      .then(async ([earningsRes, gamesRes]) => {
        if (earningsRes.ok) {
          const { data } = await earningsRes.json();
          setEarnings(data);
        }
        if (gamesRes.ok) {
          const { data } = await gamesRes.json();
          setP2eGames(data.games || []);
        }
      })
      .catch(console.error);
  }, []);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentTransactions = earnings?.transactions?.slice(0, 5) ?? [];

  return (
    <div className="space-y-6">
      {/* Welcome + Earnings highlight */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Welcome back, <span className="gradient-text">{user?.username ?? "Player"}</span>
        </h1>
        <p className="text-surface-400 mt-1">
          Here&apos;s your gaming overview and earnings.
        </p>
      </div>

      {/* Earnings summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/earnings" className="card-glow group">
          <div className="flex items-center justify-between mb-3">
            <Coins className="w-6 h-6 text-amber-400" />
            <ChevronRight className="w-4 h-4 text-surface-500 group-hover:text-brand-400 transition-colors" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">
            {user?.totalPoints ?? earnings?.totalPoints ?? 0}
          </div>
          <div className="text-sm text-surface-400 mt-1">SOUL Points</div>
          <div className="text-xs text-brand-400 mt-2">View earnings →</div>
        </Link>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">
            ${(user?.totalEarnings ?? earnings?.totalEarnings ?? 0).toFixed(2)}
          </div>
          <div className="text-sm text-surface-400 mt-1">Total Earnings</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <Sparkles className="w-6 h-6 text-brand-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">
            {p2eGames.length}
          </div>
          <div className="text-sm text-surface-400 mt-1">Play-to-Earn Games</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">—</div>
          <div className="text-sm text-surface-400 mt-1">Tournaments Joined</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Play to Earn games - main CTA */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Play Games, Earn Rewards</h2>
            <Link
              href="/dashboard/play-to-earn"
              className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
            >
              All games
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {p2eGames.slice(0, 4).map((game) => (
              <Link
                key={game.id}
                href="/dashboard/play-to-earn"
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-800/30 hover:bg-surface-800/50 border border-surface-800/50 hover:border-brand-500/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{game.name}</p>
                  <p className="text-xs text-surface-500">
                    Win: {game.pointsPerWin} pts · Play: {game.pointsPerMatch} pts
                  </p>
                </div>
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              </Link>
            ))}
          </div>
          <Link
            href="/dashboard/play-to-earn"
            className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Play to Earn
          </Link>
        </div>

        {/* Right column: Recent earnings + Wallet */}
        <div className="space-y-6">
          {/* Recent earnings */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Recent Earnings</h2>
              <Link
                href="/dashboard/earnings"
                className="text-xs text-brand-400 hover:text-brand-300"
              >
                View all
              </Link>
            </div>
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-surface-500 py-4 text-center">
                No earnings yet. Play games to earn SOUL points!
              </p>
            ) : (
              <div className="space-y-2">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-2 border-b border-surface-800/50 last:border-0"
                  >
                    <div>
                      <p className="text-sm text-white">
                        {tx.game?.name ?? tx.type.replace("_", " ")}
                      </p>
                      <p className="text-xs text-surface-500">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-400">+{tx.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wallet */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Wallet</h2>
              {isConnected && (
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Connected
                </span>
              )}
            </div>
            {isConnected && address ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-800/30">
                  <Wallet className="w-4 h-4 text-brand-400 shrink-0" />
                  <code className="flex-1 text-xs text-surface-300 font-mono truncate">
                    {address}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-1 text-surface-400 hover:text-white transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <button onClick={() => open({ view: "Account" })} className="btn-secondary text-xs w-full py-2">
                  Manage Wallet
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Wallet className="w-8 h-8 text-surface-600 mx-auto mb-3" />
                <p className="text-sm text-surface-400 mb-4">Connect wallet for Web3 features</p>
                <button onClick={() => open()} className="btn-primary text-sm w-full">
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
