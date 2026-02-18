import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-brand-950/30 to-surface-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-8">
            <Sparkles className="w-8 h-8 text-brand-400" />
          </div>

          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
            Ready to Level Up{" "}
            <span className="gradient-text">Your Game</span>?
          </h2>
          <p className="text-lg text-surface-400 max-w-xl mx-auto mb-10">
            Join thousands of gamers already on Soul Gaming. Create your free
            account and start competing today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto animate-pulse-glow"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/games"
              className="btn-secondary text-base px-8 py-4 w-full sm:w-auto"
            >
              Explore Games
            </Link>
          </div>

          <p className="mt-6 text-sm text-surface-500">
            Free to join. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
