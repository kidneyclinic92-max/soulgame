"use client";

import dynamic from "next/dynamic";
import { UserProvider } from "@/context/UserContext";

// Load Web3/Reown in a separate chunk so the main bundle stays light
const Web3Wrapper = dynamic(
  () => import("@/components/Web3Wrapper"),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Web3Wrapper>
        {children}
      </Web3Wrapper>
    </UserProvider>
  );
}
