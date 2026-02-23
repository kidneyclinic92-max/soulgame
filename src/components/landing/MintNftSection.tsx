import Image from "next/image";

export default function MintNftSection() {
  return (
    <section id="mint-nft" className="relative py-20 md:py-28 overflow-hidden min-h-[32rem] md:min-h-[38rem] flex flex-col justify-center">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/assets/mint.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority={false}
        />
      </div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-surface-950/60" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/95 via-surface-900/50 to-surface-950" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(124,58,237,0.12),transparent_50%)]" aria-hidden />

      <div className="container-custom relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* First line: Mint Your Exclusive Free NFT – per-word colors */}
          <h2 className="font-hero font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide mb-4">
            <span className="text-pink-500">Mint</span>{" "}
            <span className="text-pink-500">Your</span>{" "}
            <span className="text-purple-400">Exclusive</span>{" "}
            <span className="text-blue-400">Free</span>{" "}
            <span className="text-blue-400">NFT</span>
          </h2>

          {/* Second line: golden / orange */}
          <p className="text-amber-400 font-bold text-lg sm:text-xl md:text-2xl">
            Limited Available — Get Yours Before They&apos;re Gone!
          </p>
        </div>
      </div>
    </section>
  );
}
