"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const VIDEO_SRC = "/assets/video5.mp4";

export default function CraftCollectSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        if (e.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2, rootMargin: "50px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft-collect"
      className="relative py-20 md:py-28 bg-surface-950 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/assets/collectncraft.png"
          alt=""
          fill
          className="object-cover opacity-40"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/95 via-surface-900/50 to-surface-950" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(124,58,237,0.06),transparent)]" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-amber-400 font-semibold text-lg mb-4">
            Craft Game Items, Collect NFTs, and Win Big!
          </p>

          <h2 className="font-hero font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Craft, Collect, and Win Big!
            </span>
          </h2>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
            Take part in crafting valuable game items, collecting exclusive NFTS, and uncovering rare land plots. Even non-gamers can play a key role in creating and gathering rewards. Plus, enjoy chances to win in our raffles, with prizes ranging from iPhones to Bitcoin, all from a prize pool of over $20,000. Don&apos;t miss out on exclusive NFT avatars and exciting rewards!
          </p>

          <a
            href="/games"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-brand-500 via-purple-400 to-cyan-500
                       hover:from-brand-400 hover:to-cyan-400
                       shadow-lg shadow-brand-500/25 transition-all duration-300"
          >
            EOAS Game
          </a>
        </div>

        {/* Video container */}
        <div className="rounded-xl overflow-hidden border-4 border-brand-500/50 md:border-[6px] md:border-brand-400/60 bg-surface-900/30 w-full max-w-6xl mx-auto">
          <video
            ref={videoRef}
            className="block w-full h-auto"
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            src={VIDEO_SRC}
            onError={() => setVideoError(true)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          {videoError && (
            <div className="flex flex-col items-center justify-center gap-2 bg-surface-900 p-6 text-center min-h-[200px]">
              <p className="text-surface-400 text-sm">Video could not be loaded.</p>
              <p className="text-surface-500 text-xs max-w-md">
                Add your file at <code className="bg-surface-800 px-1.5 py-0.5 rounded">public/assets/video5.mp4</code> (or update VIDEO_SRC in CraftCollectSection.tsx if your file has a different name).
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
