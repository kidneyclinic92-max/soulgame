"use client";

import { useState } from "react";
import {
  Twitter,
  Youtube,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";

function SoundCloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.054-.049-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.035.104-.094l.2-1.308-.2-1.332c-.015-.057-.047-.094-.104-.094m1.848-1.6c-.074 0-.12.063-.127.134l-.2 2.892.2 2.787c.007.07.053.13.127.13.073 0 .12-.06.127-.13l.224-2.787-.224-2.892c-.007-.071-.054-.134-.127-.134m.927-.665c-.084 0-.138.07-.145.15l-.18 3.557.18 3.318c.007.08.061.145.145.145.08 0 .136-.065.142-.145l.203-3.318-.203-3.557c-.006-.08-.062-.15-.142-.15m.98-.365c-.094 0-.154.08-.16.165l-.164 3.922.164 3.397c.006.09.066.16.16.16.09 0 .153-.07.158-.16l.186-3.397-.186-3.922c-.005-.085-.068-.165-.158-.165m1.008-.163c-.104 0-.17.088-.176.18l-.148 4.085.148 3.422c.006.098.072.176.176.176.098 0 .168-.078.174-.176l.168-3.422-.168-4.085c-.006-.092-.076-.18-.174-.18m1.095-.087c-.114 0-.186.098-.19.196l-.135 4.172.135 3.428c.004.104.076.19.19.19.108 0 .184-.086.19-.19l.15-3.428-.15-4.172c-.006-.098-.082-.196-.19-.196m1.118-.156c-.124 0-.2.105-.206.21l-.12 4.328.12 3.397c.006.113.082.207.206.207.118 0 .198-.094.204-.207l.136-3.397-.136-4.328c-.006-.105-.086-.21-.204-.21m1.174.19c-.09 0-.175.073-.183.163l-.108 4.138.108 3.352c.008.09.093.157.183.157.084 0 .173-.067.18-.157l.122-3.352-.122-4.138c-.007-.09-.096-.164-.18-.164m2.283-1.27c-.04 0-.08.014-.11.037-.01.008-.018.02-.028.03-.04.04-.063.1-.066.16l-.082 4.993.082 3.345c.003.06.026.115.066.155.01.012.02.02.03.03.03.02.07.035.11.035.04 0 .083-.015.113-.038.012-.008.022-.018.03-.03.04-.04.064-.095.067-.155l.093-3.345-.093-4.993c-.003-.06-.027-.12-.067-.16-.008-.01-.018-.022-.03-.03-.03-.023-.073-.037-.113-.037m-1.155.96c-.134 0-.217.112-.22.222l-.1 3.81.1 3.378c.003.11.086.218.22.218.127 0 .215-.108.218-.218l.112-3.378-.112-3.81c-.003-.11-.09-.222-.218-.222m3.59-1.472c-.12 0-.235.048-.318.13-.05.05-.078.07-.09.16l-.073 5.373.073 3.308c.012.09.04.11.09.16.083.082.198.13.318.13.12 0 .235-.048.317-.13.052-.05.08-.07.09-.16l.083-3.308-.083-5.373c-.01-.09-.038-.11-.09-.16-.082-.082-.197-.13-.317-.13m1.18-.105c-.192 0-.348.155-.353.347l-.063 5.478.063 3.26c.005.187.16.34.353.34.187 0 .346-.153.35-.34l.07-3.26-.07-5.478c-.004-.192-.163-.347-.35-.347m1.21-.028c-.21 0-.38.168-.384.378l-.054 5.506.054 3.233c.004.207.174.373.384.373.207 0 .377-.166.38-.373l.062-3.233-.062-5.506c-.003-.21-.173-.378-.38-.378m1.234.14c-.03-.207-.19-.362-.397-.362-.208 0-.37.155-.398.362l-.048 5.366.048 3.193c.028.207.19.354.398.354.207 0 .367-.147.397-.354l.054-3.193-.054-5.366m.793-1.174c-.223 0-.41.186-.416.41l-.04 5.934.04 3.155c.006.22.193.403.416.403.22 0 .406-.183.414-.403l.046-3.155-.046-5.934c-.008-.224-.194-.41-.414-.41m1.243-.112c-.232 0-.422.19-.428.42l-.033 6.046.033 3.127c.006.228.196.415.428.415.23 0 .42-.187.428-.415l.036-3.127-.036-6.046c-.008-.23-.198-.42-.428-.42m1.267.636c-.237 0-.434.198-.44.434l-.024 5.41.024 3.09c.006.234.203.428.44.428.234 0 .432-.194.44-.428l.026-3.09-.026-5.41c-.008-.236-.206-.434-.44-.434m1.29-.403c-.248 0-.45.202-.455.45l-.018 5.813.018 3.057c.005.244.207.446.455.446.243 0 .447-.202.452-.446l.02-3.057-.02-5.812c-.005-.25-.21-.452-.452-.452m1.608.27c-.09-.032-.183-.05-.28-.05-.1 0-.19.018-.28.05-.28.1-.478.37-.488.69l-.01 5.103.01 3.04c.01.32.208.59.488.69.09.032.18.05.28.05.1 0 .19-.018.28-.05.28-.1.48-.37.49-.69l.008-3.04-.01-5.103c-.008-.32-.208-.59-.488-.69" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const socials = [
  { name: "Twitter", icon: Twitter, href: "https://x.com/ElementsofaSoul" },
  { name: "Discord", icon: DiscordIcon, href: "https://discord.com/invite/eoas" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/channel/UCrNASt96lwJv-VsjKJTBApg" },
  { name: "SoundCloud", icon: SoundCloudIcon, href: "https://soundcloud.com/elements-of-a-soul" },
];

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="w-full bg-slate-900 border-t border-slate-800/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Logo href="/" size="lg" className="h-11 w-auto md:h-12" />
            </div>
          <p className="text-slate-300 text-sm leading-relaxed">
              Empowering gamers worldwide with competitive play, NFT collectibles, and rewards. Join thousands and level up your experience.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Soul Gaming. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => setShowTerms(true)}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Terms &amp; Conditions
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setShowPrivacy(true)}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </button>
            </div>
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

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowTerms(false)}>
          <div
            className="relative bg-surface-900 border border-surface-700/50 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-surface-900 border-b border-surface-700/50 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">Terms &amp; Conditions</h2>
              <button onClick={() => setShowTerms(false)} className="p-1 text-surface-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 text-surface-300 text-sm leading-relaxed space-y-5">
              <p>
                Welcome to Soul Gaming! These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website and services. By using our website, you agree to be bound by these Terms. If you do not agree, please do not use our services.
              </p>

              <div>
                <h3 className="text-white font-semibold mb-2">1. Acceptance of Terms</h3>
                <p>By accessing or using our website, you confirm that you have read, understood, and agree to these Terms and our Privacy Policy.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Use of Services</h3>
                <p className="mb-2">You agree to use the services provided by Soul Gaming for lawful purposes only. You are prohibited from:</p>
                <ul className="list-disc list-inside space-y-1 text-surface-400">
                  <li>Engaging in any activity that violates local, state, national, or international laws.</li>
                  <li>Using our services to transmit harmful or malicious content.</li>
                  <li>Attempting to disrupt the functionality of our website or services.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. User Accounts</h3>
                <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Intellectual Property</h3>
                <p>All content on the Soul Gaming website, including text, graphics, logos, and software, is the property of Soul Gaming or its licensors and is protected by copyright, trademark, and other laws.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">5. Limitation of Liability</h3>
                <p>Soul Gaming is not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">6. Modifications to Terms</h3>
                <p>We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the website constitutes acceptance of the updated Terms.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">7. Termination</h3>
                <p>We may terminate or suspend your access to our services at our sole discretion, without prior notice, for any conduct that we deem to violate these Terms or is harmful to others.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">8. Governing Law</h3>
                <p>These Terms are governed by the applicable laws of your jurisdiction, without regard to its conflict of law principles.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">9. Contact Us</h3>
                <p>For questions or concerns about these Terms, please contact us at <a href="mailto:tos@soulgaming.com" className="text-brand-400 hover:text-brand-300 underline">tos@soulgaming.com</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowPrivacy(false)}>
          <div
            className="relative bg-surface-900 border border-surface-700/50 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-surface-900 border-b border-surface-700/50 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
              <button onClick={() => setShowPrivacy(false)} className="p-1 text-surface-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 text-surface-300 text-sm leading-relaxed space-y-5">
              <p>
                Welcome to Soul Gaming! Your privacy is important to us, and we are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
              </p>

              <div>
                <h3 className="text-white font-semibold mb-2">1. Information We Collect</h3>
                <p className="mb-2">We may collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-1 text-surface-400">
                  <li><span className="text-white font-medium">Personal Information:</span> Such as your name, email address, and other details you provide when signing up or contacting us.</li>
                  <li><span className="text-white font-medium">Usage Data:</span> Information about your interactions with our website, including IP address, browser type, and pages visited.</li>
                  <li><span className="text-white font-medium">Cookies:</span> Small data files used to enhance your browsing experience.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. How We Use Your Information</h3>
                <p className="mb-2">The information we collect is used for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1 text-surface-400">
                  <li>To provide and maintain our services.</li>
                  <li>To respond to your inquiries and provide customer support.</li>
                  <li>To improve and personalize your experience on our website.</li>
                  <li>To comply with legal obligations and resolve disputes.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. Sharing Your Information</h3>
                <p className="mb-2">We do not sell or trade your personal information. However, we may share your information with third parties in the following situations:</p>
                <ul className="list-disc list-inside space-y-1 text-surface-400">
                  <li>With your consent.</li>
                  <li>To comply with legal obligations or protect our rights.</li>
                  <li>With service providers who help us operate our website or deliver services to you.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Your Rights</h3>
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 text-surface-400">
                  <li>Access and review the personal data we hold about you.</li>
                  <li>Request corrections or updates to your personal data.</li>
                  <li>Request the deletion of your personal data, subject to legal obligations.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">5. Security of Your Information</h3>
                <p>We implement reasonable technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">6. Updates to This Privacy Policy</h3>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Please review this page periodically for updates.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">7. Contact Us</h3>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@soulgaming.com" className="text-brand-400 hover:text-brand-300 underline">privacy@soulgaming.com</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
