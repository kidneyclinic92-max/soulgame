import Image from "next/image";

export default function JoinDiscordSection() {
  return (
    <section id="join-discord" className="relative py-16 md:py-24 overflow-hidden bg-surface-950 min-h-[min(100vh,900px)] flex flex-col justify-center">
      {/* Background gradient – match theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" aria-hidden />

      <div className="container-custom relative z-10 flex flex-col items-center">
        {/* Heading – above the image */}
        <h2 className="font-hero font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-10 md:mb-12 text-center">
          <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            JOIN US ON DISCORD
          </span>
        </h2>

        {/* Image – between heading and button */}
        <div className="relative w-full max-w-4xl mx-auto flex justify-center my-4 md:my-6">
          <Image
            src="/assets/asset1.png"
            alt=""
            width={1000}
            height={500}
            className="object-contain opacity-90 max-h-[40vh] md:max-h-[45vh] w-auto"
            priority={false}
          />
        </div>

        {/* Join Discord button – below the image */}
        <a
          href="https://discord.gg/soulgaming"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white mt-6 md:mt-8
                     bg-gradient-to-r from-brand-500 via-purple-400 to-cyan-500
                     hover:from-brand-400 hover:to-cyan-400
                     shadow-lg shadow-brand-500/25 transition-all duration-300"
        >
          Join Discord
        </a>
      </div>
    </section>
  );
}
