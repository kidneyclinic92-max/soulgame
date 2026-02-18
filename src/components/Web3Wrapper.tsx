"use client";

import { type ReactNode } from "react";
import { Web3Provider } from "@/context/Web3Context";

/**
 * Wrapper that loads Web3/Reown only when this chunk is loaded.
 * Used with next/dynamic to keep WalletConnect out of the initial bundle.
 */
export default function Web3Wrapper({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
