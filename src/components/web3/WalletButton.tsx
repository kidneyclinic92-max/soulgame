"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Wallet } from "lucide-react";

export default function WalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const truncated = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  if (isConnected && address) {
    return (
      <button
        onClick={() => open({ view: "Account" })}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-500/30 bg-brand-500/5
                   hover:bg-brand-500/10 hover:border-brand-500/50 transition-all duration-200"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-medium text-white">{truncated}</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="btn-primary text-sm px-4 py-2.5 gap-2"
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Wallet</span>
    </button>
  );
}
