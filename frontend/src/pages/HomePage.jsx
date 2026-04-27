import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import EarningsSection from '../components/EarningsSection'
import RequirementsSection from '../components/RequirementsSection'
import FAQSection from '../components/FAQSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <EarningsSection />
        <RequirementsSection />
        <FAQSection />
      </main>
    </>
  )
}