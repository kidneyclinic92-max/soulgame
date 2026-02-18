import Link from "next/link";

export default function CommunityDrivenSection() {
  return (
    <section id="community-driven" className="relative py-20 md:py-28 bg-surface-950 overflow-hidden">
      {/* Optional: dark industrial-style gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/95 via-surface-900/30 to-surface-950" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(124,58,237,0.08),transparent)]" aria-hidden />

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Tagline – gold */}
          <p className="text-amber-400 font-semibold text-lg mb-4">
            Where Time and Effort Always Pay Off
          </p>

          {/* Main heading – two lines, purple to blue gradient */}
          <h2 className="font-hero font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              A Community-Driven
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Gaming Experience
            </span>
          </h2>

          {/* Paragraph – white, center-aligned */}
          <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
            our community is ingeniously woven into the gameplay, ensuring that both gamers and non-gamers are rewarded for their time and effort. As a community member, you are an integral part of the entire game economy.
          </p>

          {/* CTA – Join Discord */}
          <a
            href="https://discord.gg/soulgaming"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white mx-auto
                       bg-gradient-to-r from-brand-500 via-brand-400 to-cyan-500
                       hover:from-brand-400 hover:to-cyan-400
                       shadow-lg shadow-brand-500/25 transition-all duration-300"
          >
            Join Discord
          </a>
        </div>
      </div>
    </section>
  );
}
