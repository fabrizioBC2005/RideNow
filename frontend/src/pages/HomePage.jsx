import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import EarningsSection from '../components/EarningsSection'
import RequirementsSection from '../components/RequirementsSection'
import FAQSection from '../components/FAQSection'
import ContactoPage from './ContactoPage';


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <EarningsSection />
        <RequirementsSection />
        <FAQSection />
        <ContactoPage />


      </main>
    </>
  )
}