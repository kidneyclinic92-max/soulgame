"use client";

import { useState } from "react";
import {
  Twitter,
  MessageCircle,
  Youtube,
  Instagram,
  Linkedin,
  X,
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
