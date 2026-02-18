/**
 * Web3 utility functions for wallet integration
 */

export const SUPPORTED_CHAINS: Record<
  number,
  { name: string; currency: string; explorer: string; rpcUrl: string }
> = {
  1: {
    name: "Ethereum Mainnet",
    currency: "ETH",
    explorer: "https://etherscan.io",
    rpcUrl: "https://eth.llamarpc.com",
  },
  137: {
    name: "Polygon",
    currency: "MATIC",
    explorer: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com",
  },
  56: {
    name: "BNB Smart Chain",
    currency: "BNB",
    explorer: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed.binance.org",
  },
  42161: {
    name: "Arbitrum One",
    currency: "ETH",
    explorer: "https://arbiscan.io",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
  10: {
    name: "Optimism",
    currency: "ETH",
    explorer: "https://optimistic.etherscan.io",
    rpcUrl: "https://mainnet.optimism.io",
  },
  8453: {
    name: "Base",
    currency: "ETH",
    explorer: "https://basescan.org",
    rpcUrl: "https://mainnet.base.org",
  },
  11155111: {
    name: "Sepolia Testnet",
    currency: "ETH",
    explorer: "https://sepolia.etherscan.io",
    rpcUrl: "https://rpc.sepolia.org",
  },
};

export type WalletType = "metamask" | "coinbase" | "trust" | "injected";

export interface WalletOption {
  id: WalletType;
  name: string;
  icon: string;
  description: string;
  checkAvailable: () => boolean;
  deepLink?: string;
}

/**
 * Check if a specific wallet provider is available in the browser
 */
function getEthereum(): any {
  if (typeof window === "undefined") return null;
  return (window as any).ethereum;
}

export const WALLET_OPTIONS: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using MetaMask browser extension",
    checkAvailable: () => {
      const eth = getEthereum();
      return !!eth?.isMetaMask;
    },
    deepLink: "https://metamask.io/download/",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Connect using Coinbase Wallet",
    checkAvailable: () => {
      const eth = getEthereum();
      return !!eth?.isCoinbaseWallet;
    },
    deepLink: "https://www.coinbase.com/wallet",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "🛡️",
    description: "Connect using Trust Wallet",
    checkAvailable: () => {
      const eth = getEthereum();
      return !!eth?.isTrust;
    },
    deepLink: "https://trustwallet.com/",
  },
  {
    id: "injected",
    name: "Browser Wallet",
    icon: "🌐",
    description: "Connect using any injected browser wallet",
    checkAvailable: () => !!getEthereum(),
  },
];

/**
 * Truncate wallet address for display
 */
export function truncateAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format balance for display
 */
export function formatBalance(balance: string, decimals = 4): string {
  const num = parseFloat(balance);
  if (isNaN(num)) return "0";
  return num.toFixed(decimals);
}

/**
 * Get chain info by chain ID
 */
export function getChainInfo(chainId: number) {
  return SUPPORTED_CHAINS[chainId] || { name: `Chain ${chainId}`, currency: "ETH", explorer: "", rpcUrl: "" };
}
