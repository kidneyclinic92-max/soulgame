import Link from "next/link";
import { ArrowRight, Users, Clock } from "lucide-react";

const games = [
  {
    title: "Valorant",
    genre: "Tactical Shooter",
    players: "12.5K online",
    image: "/games/valorant.jpg",
    color: "from-red-500/20 to-red-900/20",
    borderColor: "border-red-500/20 hover:border-red-500/40",
  },
  {
    title: "League of Legends",
    genre: "MOBA",
    players: "28.3K online",
    image: "/games/lol.jpg",
    color: "from-blue-500/20 to-blue-900/20",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
  },
  {
    title: "Fortnite",
    genre: "Battle Royale",
    players: "18.7K online",
    image: "/games/fortnite.jpg",
    color: "from-purple-500/20 to-purple-900/20",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
  },
  {
    title: "CS2",
    genre: "Competitive FPS",
    players: "15.2K online",
    image: "/games/cs2.jpg",
    color: "from-amber-500/20 to-amber-900/20",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
  },
  {
    title: "Rocket League",
    genre: "Sports",
    players: "8.9K online",
    image: "/games/rocketleague.jpg",
    color: "from-cyan-500/20 to-cyan-900/20",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
  },
  {
    title: "Apex Legends",
    genre: "Battle Royale",
    players: "11.1K online",
    image: "/games/apex.jpg",
    color: "from-rose-500/20 to-rose-900/20",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
  },
];

export default function GamesSection() {
  return (
    <section id="games" className="py-20 md:py-32 relative bg-surface-950/50">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3 block">
              Games
            </span>
            <h2 className="section-heading mb-3">
              Popular <span className="gradient-text">Games</span>
            </h2>
            <p className="section-subheading">
              Jump into the action with the most popular competitive titles.
            </p>
          </div>
          <Link
            href="/games"
            className="btn-secondary self-start sm:self-auto text-sm whitespace-nowrap"
          >
            View All Games
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.title}
              href={`/games/${game.title.toLowerCase().replace(/\s+/g, "-")}`}
              className={`group relative overflow-hidden rounded-xl border ${game.borderColor}
                          bg-gradient-to-br ${game.color} backdrop-blur-sm
                          transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              {/* Placeholder game image area */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-white/20">
                    {game.title}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/50 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-surface-400">{game.genre}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-surface-600 group-hover:text-brand-400 
                                        group-hover:translate-x-1 transition-all duration-200 mt-1" />
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-surface-400">{game.players}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
