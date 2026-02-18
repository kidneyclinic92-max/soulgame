import Link from "next/link";
import { Trophy, Calendar, Users, DollarSign, ArrowRight } from "lucide-react";

const tournaments = [
  {
    title: "Soul Championship Series",
    game: "Valorant",
    prizePool: "$10,000",
    teams: "32/64",
    date: "Mar 15, 2026",
    status: "Registration Open",
    statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
  },
  {
    title: "Legends Arena Cup",
    game: "League of Legends",
    prizePool: "$5,000",
    teams: "16/16",
    date: "Mar 22, 2026",
    status: "Full",
    statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    title: "Battle Royale Showdown",
    game: "Fortnite",
    prizePool: "$3,000",
    teams: "78/100",
    date: "Mar 28, 2026",
    status: "Registration Open",
    statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
  },
];

export default function TournamentsSection() {
  return (
    <section id="tournaments" className="py-20 md:py-32 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3 block">
              Tournaments
            </span>
            <h2 className="section-heading mb-3">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
            <p className="section-subheading">
              Compete for glory and prizes in our featured tournaments.
            </p>
          </div>
          <Link
            href="/tournaments"
            className="btn-secondary self-start sm:self-auto text-sm whitespace-nowrap"
          >
            All Tournaments
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Tournaments List */}
        <div className="space-y-4">
          {tournaments.map((tournament, index) => (
            <div
              key={tournament.title}
              className="card-glow flex flex-col md:flex-row md:items-center gap-4 md:gap-6 group"
            >
              {/* Icon */}
              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 w-fit shrink-0">
                <Trophy className="w-6 h-6 text-brand-400" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                    {tournament.title}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${tournament.statusColor}`}
                  >
                    {tournament.status}
                  </span>
                </div>
                <p className="text-sm text-surface-400">{tournament.game}</p>
              </div>

              {/* Details */}
              <div className="flex flex-wrap items-center gap-6 text-sm shrink-0">
                <div className="flex items-center gap-2 text-surface-400">
                  <DollarSign className="w-4 h-4 text-brand-400" />
                  <span>{tournament.prizePool}</span>
                </div>
                <div className="flex items-center gap-2 text-surface-400">
                  <Users className="w-4 h-4 text-brand-400" />
                  <span>{tournament.teams} teams</span>
                </div>
                <div className="flex items-center gap-2 text-surface-400">
                  <Calendar className="w-4 h-4 text-brand-400" />
                  <span>{tournament.date}</span>
                </div>
              </div>

              {/* Action */}
              <Link
                href="/tournaments"
                className="btn-primary text-sm px-5 py-2.5 shrink-0 w-full md:w-auto"
              >
                Register
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
