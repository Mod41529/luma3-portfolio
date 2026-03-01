import SideNav from '@/components/SideNav'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import VideoSection from '@/components/VideoSection'
import MusicSection from '@/components/MusicSection'
import { DesignSection, DevelopmentSection, BusinessSection } from '@/components/HubSection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      {/* Left sidebar — hidden on Hero, fades in on scroll */}
      <SideNav />

      <main>
        {/* Hero: full width, no left offset — SideNav is hidden here */}
        <Hero />

        {/* All sections below Hero get left offset to clear the SideNav */}
        <div className="md:pl-[200px]">
          <BentoGrid />
          <VideoSection />
          <MusicSection />
          <DesignSection />
          <DevelopmentSection />
          <BusinessSection />

          <AboutSection />
          <ContactSection />

          {/* Footer */}
          <footer className="px-6 md:px-12 py-6 border-t border-[#e5e5e5]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#a3a3a3]">© 2026 luma3</span>
              <span className="font-mono text-[10px] text-[#c3c3c3]">Seoul, Korea</span>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
