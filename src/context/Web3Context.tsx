"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum, polygon, base, optimism, sepolia } from "@reown/appkit/networks";
import { type ReactNode } from "react";

// 1. Get your free project ID at https://dashboard.reown.com
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "";

// 2. App metadata for WalletConnect
const metadata = {
  name: "Soul Gaming",
  description: "Soul Gaming — The Ultimate Gaming Platform",
  url: typeof window !== "undefined" ? window.location.origin : "https://soulgaming.com",
  icons: ["/icon.png"],
};

// 3. Supported networks
const networks = [mainnet, arbitrum, polygon, base, optimism, sepolia] as const;

// 4. Create the Ethers adapter
const ethersAdapter = new EthersAdapter();

// 5. Initialize AppKit (must be called outside React component)
createAppKit({
  adapters: [ethersAdapter],
  metadata,
  networks: [...networks],
  projectId,
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: true,
    socials: ["google", "discord", "x", "github"],
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "#7c3aed",
    "--w3m-color-mix-strength": 25,
    "--w3m-accent": "#7c3aed",
    "--w3m-border-radius-master": "2px",
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
