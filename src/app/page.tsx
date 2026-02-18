import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import CommunityDrivenSection from "@/components/landing/CommunityDrivenSection";
import CraftCollectSection from "@/components/landing/CraftCollectSection";
import MintNftSection from "@/components/landing/MintNftSection";
import OwnFutureNftSection from "@/components/landing/OwnFutureNftSection";
import JoinDiscordSection from "@/components/landing/JoinDiscordSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CommunityDrivenSection />
        <CraftCollectSection />
        <MintNftSection />
        <OwnFutureNftSection />
        <JoinDiscordSection />
      </main>
      <Footer />
    </>
  );
}
