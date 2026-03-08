import SideNav from '@/components/SideNav'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import VideoSection from '@/components/VideoSection'
import MusicSection from '@/components/MusicSection'
import { DesignSection, DevelopmentSection, BusinessSection } from '@/components/HubSection'
import AISection from '@/components/AISection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import BackToTop from '@/components/BackToTop'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <>
      {/* Left sidebar — hidden on Hero, fades in on scroll */}
      <SideNav />

      {/* Mobile top nav — hidden on desktop where SideNav handles navigation */}
      <Navigation />

      {/* Desktop theme toggle — fixed top-right, always visible */}
      <div className="fixed top-5 right-6 z-50 hidden md:flex">
        <ThemeToggle />
      </div>

      {/* Floating back-to-top button */}
      <BackToTop />

      <main>
        {/* Hero: full width, no left offset — SideNav is hidden here */}
        <Hero />

        {/* All sections below Hero get left offset to clear the SideNav */}
        <div className="md:pl-[200px]">
          <BentoGrid />

          <div className="mt-16 md:mt-24">
            <VideoSection />
          </div>

          <div className="mt-16 md:mt-24">
            <MusicSection />
          </div>

          <div className="mt-16 md:mt-24">
            <DesignSection />
          </div>

          <div className="mt-16 md:mt-24">
            <AISection />
          </div>

          <div className="mt-16 md:mt-24">
            <DevelopmentSection />
          </div>

          <div className="mt-16 md:mt-24">
            <BusinessSection />
          </div>

          <div className="mt-16 md:mt-24">
            <AboutSection />
          </div>

          <ContactSection />

          {/* Footer */}
          <footer className="px-6 md:px-12 py-8 border-t border-border">
            <div className="flex items-center gap-6">
              <span className="font-mono text-[10px] text-fg-subtle">© 2026 luma3</span>
              <span className="text-border">·</span>
              <a
                href="mailto:yusung8307@gmail.com"
                className="font-mono text-[10px] text-fg-subtle hover:text-fg transition-colors duration-150"
              >
                yusung8307@gmail.com
              </a>
              <span className="text-border">·</span>
              <a
                href="https://github.com/Mod41529"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-fg-subtle hover:text-fg transition-colors duration-150"
              >
                GitHub
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
