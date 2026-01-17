import EventSection from "@/components/event-section";
import { HeroSection } from "@/components/hero-section-5";
import { div } from "framer-motion/client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#352939]">
      <HeroSection />
      <EventSection />
    </div>
  );
}
