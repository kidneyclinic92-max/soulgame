"use client";

import dynamic from "next/dynamic";

const DashboardPageClient = dynamic(
  () => import("./DashboardPageClient"),
  { ssr: false, loading: () => (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-brand-500/30 border-t-brand-400 rounded-full animate-spin" />
    </div>
  ) }
);

export default function DashboardPage() {
  return <DashboardPageClient />;
}
