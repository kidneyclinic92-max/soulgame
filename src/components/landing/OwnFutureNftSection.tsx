"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NFT_IMAGES = [
  "/assets/nft1.png",
  "/assets/nft2.png",
  "/assets/nft3.png",
  "/assets/nft4.png",
];

function NftCard({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="aspect-square rounded-xl bg-surface-800/80 border border-surface-700/50 flex items-center justify-center">
        <span className="text-surface-500 text-sm">NFT</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full aspect-square object-cover rounded-xl border border-surface-700/50"
      onError={() => setError(true)}
    />
  );
}

export default function OwnFutureNftSection() {
  return (
    <section id="future-nft" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/assets/nft.png"
          alt=""
          fill
          className="object-cover opacity-40"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-surface-950/70" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/50 to-surface-950" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_80%,rgba(124,58,237,0.08),transparent)]" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading: Own Your (magenta–purple) | Future NFT (blue–cyan) */}
          <h2 className="font-hero font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12">
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Own Your
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Future NFT
            </span>
          </h2>

          {/* Four NFT portraits in a row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {NFT_IMAGES.map((src, i) => (
              <NftCard key={src} src={src} alt={`NFT character ${i + 1}`} />
            ))}
          </div>

          {/* Login to Mint button */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-brand-500 via-brand-400 to-cyan-500
                       hover:from-brand-400 hover:to-cyan-400
                       shadow-lg shadow-brand-500/25 transition-all duration-300"
          >
            Login to Mint
          </Link>
        </div>
      </div>
    </section>
  );
}
