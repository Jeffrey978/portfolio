import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { BlenderLabSection } from "@/components/sections/blender-lab";
import { BentoAboutSection } from "@/components/sections/bento-about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full relative z-10">
      <HeroSection />
      <ProjectsSection />
      <BlenderLabSection />
      <BentoAboutSection />
      <ContactSection />
    </main>
  );
}
