import { MessageCircle, Heart, Share2, Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Storm",
    tag: "@alexstorm",
    avatar: "AS",
    role: "Pro Player",
    text: "Soul Gaming changed how I compete online. The tournament system is flawless, and the community is incredibly supportive. Best platform I've been on.",
    color: "bg-brand-500",
  },
  {
    name: "Maya Chen",
    tag: "@mayaplays",
    avatar: "MC",
    role: "Content Creator",
    text: "The analytics dashboard is a game changer. I can track every stat and share highlights with my followers. 10/10 would recommend to any serious gamer.",
    color: "bg-accent-500",
  },
  {
    name: "Jordan Reeves",
    tag: "@jreeves_gg",
    avatar: "JR",
    role: "Team Captain",
    text: "We moved our entire clan to Soul Gaming. The team management features and tournament brackets are exactly what we needed. Our team has never been more organized.",
    color: "bg-cyan-500",
  },
  {
    name: "Sam Park",
    tag: "@sampark",
    avatar: "SP",
    role: "Casual Gamer",
    text: "I love that there's something for everyone here. Whether you're a sweaty tryhard or a casual player, Soul Gaming has the right playlist for you.",
    color: "bg-emerald-500",
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 md:py-32 relative bg-surface-950/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3 block">
            Community
          </span>
          <h2 className="section-heading mb-4">
            Loved by <span className="gradient-text">Gamers</span> Worldwide
          </h2>
          <p className="section-subheading mx-auto">
            See what our community has to say about their Soul Gaming experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.tag} className="card-glow">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center
                              text-white text-sm font-bold`}
                >
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {testimonial.name}
                    </h4>
                    <span className="text-xs text-surface-500 truncate">
                      {testimonial.tag}
                    </span>
                  </div>
                  <p className="text-xs text-brand-400">{testimonial.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-surface-300 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
