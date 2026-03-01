import SideNav from '@/components/SideNav'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import FeaturedWork from '@/components/FeaturedWork'
import VideoSection from '@/components/VideoSection'
import MusicSection from '@/components/MusicSection'
import { DesignSection, DevelopmentSection, BusinessSection } from '@/components/HubSection'

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
          <FeaturedWork />

          {/* About */}
          <section id="about" className="px-6 md:px-12 py-16 md:py-20 border-t border-[#e5e5e5]">
            <div className="max-w-5xl flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="text-[clamp(1.1rem,2.8vw,1.6rem)] font-light text-[#737373] leading-relaxed max-w-2xl">
                Structured thinking applied to creative work —
                <br />
                <span className="text-[#1a1a1a]">systems as a design tool.</span>
              </p>

              <div className="shrink-0 space-y-1 text-sm text-[#737373]">
                <p className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-[0.3em] mb-2">
                  Background
                </p>
                <p>Business Strategy &amp; Finance</p>
                <p>AI-powered Creative Operations</p>
                <p>Sungkyunkwan University</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-6 md:px-12 py-8 border-t border-[#e5e5e5]">
            <div className="max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-[#a3a3a3]">© 2026 luma3</span>
              <div className="flex items-center gap-6 text-sm text-[#737373]">
                <a
                  href="mailto:hello@luma3.dev"
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                >
                  hello@luma3.dev
                </a>
                <a
                  href="https://github.com/Mod41529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                >
                  GitHub
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
