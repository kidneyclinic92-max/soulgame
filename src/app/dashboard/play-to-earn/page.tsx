"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gamepad2,
  Sparkles,
  ChevronLeft,
  Trophy,
  Zap,
  Loader2,
  Check,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Game {
  id: string;
  name: string;
  slug: string;
  genre: string;
  description: string | null;
  pointsPerWin: number;
  pointsPerMatch: number;
}

export default function PlayToEarnPage() {
  const { user, refetch: refetchUser } = useUser();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/games/play-to-earn")
      .then((res) => res.json())
      .then((json) => setGames(json.data?.games ?? []))
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, []);

  const recordReward = async (gameId: string, type: "game_win" | "game_played") => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "Please sign in to earn rewards." });
      return;
    }

    setRecording(gameId + type);
    setMessage(null);

    try {
      const res = await fetch("/api/rewards/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, gameId }),
      });

      const data = await res.json();

      if (res.ok) {
        const points = data.data?.pointsEarned ?? 0;
        setMessage({
          type: "success",
          text: `+${points} SOUL points earned! Keep playing to earn more.`,
        });
        refetchUser();
      } else {
        setMessage({ type: "error", text: data.error ?? "Failed to record reward." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setRecording(null);
    }
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
          <h1 className="text-2xl md:text-3xl font-bold text-white">Play to Earn</h1>
          <p className="text-surface-400 mt-0.5">
            Play supported games and claim SOUL points for wins and matches
          </p>
        </div>
      </div>

      {!user && (
        <div className="card border-amber-500/20 bg-amber-500/5">
          <p className="text-amber-200 text-sm">
            Sign in to your account to record games and earn SOUL points.
          </p>
          <Link href="/login?redirect=/dashboard/play-to-earn" className="btn-primary mt-3 inline-flex text-sm">
            Sign In
          </Link>
        </div>
      )}

      {message && (
        <div
          className={`card ${
            message.type === "success"
              ? "border-green-500/20 bg-green-500/5"
              : "border-red-500/20 bg-red-500/5"
          }`}
        >
          <p className={message.type === "success" ? "text-green-200 text-sm" : "text-red-200 text-sm"}>
            {message.text}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center">
            <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
          </div>
        ) : games.length === 0 ? (
          <div className="col-span-full card py-12 text-center">
            <Gamepad2 className="w-12 h-12 text-surface-600 mx-auto mb-3" />
            <p className="text-surface-400">No play-to-earn games available yet</p>
            <p className="text-sm text-surface-500 mt-1">Check back soon for supported games</p>
          </div>
        ) : (
          games.map((game) => (
            <div key={game.id} className="card-glow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/20 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-6 h-6 text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <p className="text-xs text-surface-500">{game.genre}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Trophy className="w-3.5 h-3.5" />
                      Win: {game.pointsPerWin} pts
                    </span>
                    <span className="flex items-center gap-1 text-brand-400">
                      <Zap className="w-3.5 h-3.5" />
                      Play: {game.pointsPerMatch} pts
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => recordReward(game.id, "game_win")}
                  disabled={!user || recording !== null}
                  className="btn-primary text-sm flex-1 py-2 flex items-center justify-center gap-2"
                >
                  {recording === game.id + "game_win" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Trophy className="w-4 h-4" />
                      I Won
                    </>
                  )}
                </button>
                <button
                  onClick={() => recordReward(game.id, "game_played")}
                  disabled={!user || recording !== null}
                  className="btn-secondary text-sm flex-1 py-2 flex items-center justify-center gap-2"
                >
                  {recording === game.id + "game_played" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Played
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card border-brand-500/20 bg-brand-500/5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white">How it works</h3>
            <ul className="text-sm text-surface-400 mt-2 space-y-1">
              <li>• <strong className="text-surface-300">I Won</strong> — Claim points for a match win (higher reward)</li>
              <li>• <strong className="text-surface-300">Played</strong> — Claim points for completing a match</li>
              <li>• SOUL points can be used for rewards, tournaments, and more (coming soon)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
