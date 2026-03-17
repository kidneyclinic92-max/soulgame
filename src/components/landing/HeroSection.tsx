"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoInView, setVideoInView] = useState(true); // hero is in view on load

  // Load video only when hero is in view; pause when off-screen to save CPU
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        setVideoInView(e.isIntersecting);
        if (e.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2, rootMargin: "100px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video - source only when in view; pauses when scrolled away */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {videoInView && <source src="/assets/header_video.mp4" type="video/mp4" />}
        </video>
        {/* Dark overlay on top of video for readability */}
        <div className="absolute inset-0 bg-surface-950/70" />
        <div className="absolute inset-0 bg-hero-gradient opacity-60" />
      </div>

      {/* Floating glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px] animate-float z-[1]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-600/15 rounded-full blur-[120px] animate-float [animation-delay:3s] z-[1]" />

      <div className="container-custom relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Heading: single line, clean font; purple–magenta on "Unite" & "the", blue–cyan on "with" & "Elite" */}
          <h1 className="font-hero font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-tight mb-4 animate-slide-up whitespace-nowrap">
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Unite
            </span>{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              with
            </span>{" "}
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              the
            </span>{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Elite
            </span>
          </h1>

          {/* Subheading – yellow/gold */}
          <p className="text-xl sm:text-2xl font-semibold text-amber-400 mb-5 animate-slide-up [animation-delay:0.05s]">
            Join our Guild Today!
          </p>

          {/* Descriptive paragraph */}
          <p className="text-base sm:text-lg text-white/90 text-surface-200 max-w-xl mx-auto mb-6 animate-slide-up [animation-delay:0.1s] leading-relaxed">
            Become a part of a community of champions, unlock exclusive rewards, and embark on epic adventures that will shape the future of our world.
          </p>

          {/* Feature line – gift icon + prize pool */}
          <div className="flex items-center justify-center gap-2.5 mb-8 text-white/90 animate-slide-up [animation-delay:0.15s]">
            <Gift className="w-5 h-5 text-brand-400 shrink-0" />
            <span className="text-sm sm:text-base">
              Join giveaways and contests, win from a $20,000 prize pool
            </span>
          </div>

          {/* CTA – Login to Mint */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-brand-500 via-brand-400 to-cyan-500
                       hover:from-brand-400 hover:to-cyan-400
                       shadow-lg shadow-brand-500/25 transition-all duration-300 animate-slide-up [animation-delay:0.2s]"
          >
            Login to Mint
          </Link>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-950 to-transparent" />
    </section>
  );
}
