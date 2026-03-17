import Image from "next/image";

export default function JoinDiscordSection() {
  return (
    <section id="join-discord" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-surface-950" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/95 via-surface-900/50 to-surface-950" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Image with Discord icon overlaid on center */}
          <div className="relative w-full flex justify-center mb-0">
            <Image
              src="/assets/asset1.png"
              alt=""
              width={1000}
              height={500}
              className="object-contain opacity-90 max-h-[40vh] md:max-h-[45vh] w-auto"
              priority={false}
            />
            {/* Discord icon – centered on the image */}
            <div className="absolute bottom-[19%] left-[49.5%] -translate-x-1/2 translate-y-1/2 z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-brand-500 via-purple-500 to-cyan-500 p-[3px] shadow-lg shadow-brand-500/30">
                <div className="w-full h-full rounded-full bg-surface-950 flex items-center justify-center p-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full text-white"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Spacing for the overlapping icon */}
          <div className="mt-14 md:mt-16">
            <h2 className="font-hero font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
              <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                JOIN US ON DISCORD
              </span>
            </h2>

            <p className="text-amber-400 font-semibold text-lg sm:text-xl mb-4">
              Your Gateway to Exclusive Benefits
            </p>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
              Connect, collaborate, and stay ahead. Be part of the conversation that shapes Element of Soul.
            </p>

            <a
              href="https://discord.com/invite/P4TyH7XyWR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white
                         bg-gradient-to-r from-brand-500 via-purple-400 to-cyan-500
                         hover:from-brand-400 hover:to-cyan-400
                         shadow-lg shadow-brand-500/25 transition-all duration-300"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
