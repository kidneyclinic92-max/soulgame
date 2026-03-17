"use client";

import { useState } from "react";
import {
  Wallet,
  Copy,
  Check,
  Sparkles,
  Layers,
} from "lucide-react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useUser } from "@/context/UserContext";

export default function DashboardPageClient() {
  const [copied, setCopied] = useState(false);
  const { user } = useUser();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Welcome */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Welcome back, <span className="gradient-text">{user?.username ?? "Player"}</span>
        </h1>
        <p className="text-surface-400 mt-1">
          Here&apos;s your gaming overview.
        </p>
      </div>

      {/* Cards row */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mint NFT */}
        <div className="card p-6 flex flex-col">
          <div className="text-center py-6 flex-1 flex flex-col justify-between">
            <div>
              <Sparkles className="w-10 h-10 text-brand-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Mint Your NFT</h2>
              <p className="text-surface-400 mb-6">Browse and mint exclusive NFT collectibles</p>
            </div>
            <a
              href="https://opensea.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3"
            >
              <Sparkles className="w-4 h-4" />
              Mint NFT
            </a>
          </div>
        </div>

        {/* Stake */}
        <div className="card p-6 flex flex-col">
          <div className="text-center py-6 flex-1 flex flex-col justify-between">
            <div>
              <Layers className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Stake Crypto &amp; NFTs</h2>
              <p className="text-surface-400 mb-6">Stake your assets and earn rewards</p>
            </div>
            <button
              onClick={() => open({ view: "Account" })}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3"
            >
              <Layers className="w-4 h-4" />
              Stake Now
            </button>
          </div>
        </div>

        {/* Wallet */}
        <div className="card p-6 flex flex-col">
          <div className="text-center py-6 flex-1 flex flex-col justify-between">
            <div>
              <Wallet className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Wallet</h2>
              <p className="text-surface-400 mb-6">
                {isConnected && address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Connect wallet for Web3 features"}
              </p>
            </div>
            {isConnected ? (
              <button
                onClick={() => open({ view: "Account" })}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3"
              >
                <Wallet className="w-4 h-4" />
                Manage Wallet
              </button>
            ) : (
              <button
                onClick={() => open()}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
