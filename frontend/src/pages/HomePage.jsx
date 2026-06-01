import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import EarningsSection from '../components/EarningsSection'
import RequirementsSection from '../components/RequirementsSection'
import FAQSection from '../components/FAQSection'
import ContactoPage from './ContactoPage';
import Testimonios from '../components/Testimonios';


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-night text-white">
        <HeroSection />
        <EarningsSection />
        <RequirementsSection />
        <FAQSection />
        <Testimonios />
        <ContactoPage />
      </main>
    </>
  )
}