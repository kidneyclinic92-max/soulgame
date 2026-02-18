"use client";

import { useState, useEffect } from "react";
import { Coins, TrendingUp, ChevronLeft, Receipt } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string | null;
  createdAt: string;
  game: { name: string; slug: string } | null;
}

interface EarningsData {
  summary: { totalPoints: number; totalEarnings: number };
  transactions: Transaction[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export default function EarningsPage() {
  const { user } = useUser();
  const [data, setData] = useState<EarningsData | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    fetch(`/api/user/earnings?page=${page}&limit=20`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((json) => {
        setData(json.data);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [page]);

  const summary = data?.summary ?? { totalPoints: user?.totalPoints ?? 0, totalEarnings: user?.totalEarnings ?? 0 };
  const transactions = data?.transactions ?? [];
  const pagination = data?.pagination ?? { page: 1, totalPages: 1, total: 0 };

  const formatType = (type: string) => {
    return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Earnings</h1>
          <p className="text-surface-400 mt-0.5">Your SOUL points and reward history</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Coins className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-sm text-surface-400">Total SOUL Points</span>
          </div>
          <div className="text-3xl font-bold text-white">{summary.totalPoints}</div>
          <p className="text-xs text-surface-500 mt-1">Earn more by playing games and winning matches</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-surface-400">Total Earnings</span>
          </div>
          <div className="text-3xl font-bold text-white">${summary.totalEarnings.toFixed(2)}</div>
          <p className="text-xs text-surface-500 mt-1">Lifetime earnings (tournaments, rewards)</p>
        </div>
      </div>

      {/* Transaction history */}
      <div className="card">
        <div className="flex items-center gap-2 mb-5">
          <Receipt className="w-5 h-5 text-brand-400" />
          <h2 className="text-lg font-bold text-white">Transaction History</h2>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-400 rounded-full animate-spin" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-12 text-center">
            <Coins className="w-12 h-12 text-surface-600 mx-auto mb-3" />
            <p className="text-surface-400">No transactions yet</p>
            <p className="text-sm text-surface-500 mt-1">Play games to start earning SOUL points</p>
            <Link href="/dashboard/play-to-earn" className="btn-primary mt-4 inline-flex">
              Play to Earn
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-surface-800/50">
                    <th className="pb-3 text-xs font-semibold text-surface-400 uppercase tracking-wider">Date</th>
                    <th className="pb-3 text-xs font-semibold text-surface-400 uppercase tracking-wider">Type</th>
                    <th className="pb-3 text-xs font-semibold text-surface-400 uppercase tracking-wider">Game / Source</th>
                    <th className="pb-3 text-xs font-semibold text-surface-400 uppercase tracking-wider text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-surface-800/30 hover:bg-surface-800/20 transition-colors">
                      <td className="py-3 text-sm text-surface-300">
                        {new Date(tx.createdAt).toLocaleDateString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="py-3 text-sm text-white">{formatType(tx.type)}</td>
                      <td className="py-3 text-sm text-surface-400">{tx.game?.name ?? "—"}</td>
                      <td className="py-3 text-sm font-semibold text-green-400 text-right">+{tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-800/50">
                <p className="text-sm text-surface-500">
                  Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page >= pagination.totalPages}
                    className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
