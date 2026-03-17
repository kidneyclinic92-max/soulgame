import {
  Twitter,
  MessageCircle,
  Youtube,
  Instagram,
  Linkedin,
} from "lucide-react";
import Logo from "@/components/Logo";

const socials = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Discord", icon: MessageCircle, href: "https://discord.com/invite/P4TyH7XyWR" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800/50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        {/* Main content: Soul Gaming + description – centered */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Logo href="/" size="lg" className="h-11 w-auto md:h-12" />
          </div>
          <h2 className="text-white text-lg font-bold mb-3">Soul Gaming</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Empowering gamers worldwide with competitive play, NFT collectibles, and rewards. Join thousands and level up your experience.
          </p>
        </div>

        {/* Bottom strip: copyright + social icons – centered */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Soul Gaming. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
