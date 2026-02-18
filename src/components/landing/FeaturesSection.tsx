import {
  Trophy,
  Users,
  Shield,
  Zap,
  BarChart3,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Competitive Tournaments",
    description:
      "Enter daily, weekly, and seasonal tournaments. Compete for prizes, glory, and a spot on the global leaderboard.",
  },
  {
    icon: Users,
    title: "Thriving Community",
    description:
      "Connect with thousands of gamers. Form teams, join clans, and build friendships that last beyond the game.",
  },
  {
    icon: Shield,
    title: "Fair Play Guaranteed",
    description:
      "Advanced anti-cheat systems and skill-based matchmaking ensure every match is fair and competitive.",
  },
  {
    icon: Zap,
    title: "Low Latency Servers",
    description:
      "Lightning-fast servers across the globe. Experience minimal lag and maximum performance in every game.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track your performance with in-depth stats and analytics. Identify strengths, weaknesses, and track your improvement.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated team is always here to help. Get support via live chat, tickets, or our comprehensive knowledge base.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3 block">
            Features
          </span>
          <h2 className="section-heading mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Dominate</span>
          </h2>
          <p className="section-subheading mx-auto">
            A complete platform built from the ground up for serious gamers
            who demand the best experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-glow group"
            >
              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 w-fit mb-5
                              group-hover:bg-brand-500/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
