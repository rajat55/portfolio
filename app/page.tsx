import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import SystemDesignSection from "@/components/SystemDesignSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import FooterSection from "@/components/FooterSection";
import DsaStatsSection from "@/components/DSA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />

      <DsaStatsSection/>
      <SystemDesignSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <FooterSection />
    </main>
  );
}
