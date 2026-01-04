import { HeroSection } from "@/components/hero-section"
import { ChildrenNeedHelp } from "@/components/children-need-help"
import { DonationForm } from "@/components/donation-form"
import { Testimonials } from "@/components/testimonials"
import { DonationRecent } from "@/components/donation-recent"
import { Programs } from "@/components/programs"
import { LatestNews } from "@/components/latest-news"
import { AboutFoundation } from "@/components/about-foundation"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Testimonials />
      <ChildrenNeedHelp />
      <DonationForm />
      <DonationRecent />
      <Programs />
      <LatestNews />
      <AboutFoundation />
      <Newsletter />
    </main>
  )
}
