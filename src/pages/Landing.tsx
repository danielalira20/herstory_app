import HeroSection from '@/components/HeroSection'
import ChoosePathSection from '@/components/ChoosePathSection'
import ManifestoSection from '@/components/ManifestoSection'
import ImpactSection from "@/components/ImpactSection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ChoosePathSection />
      <ImpactSection />
      <ManifestoSection />
    </div>
  )
}
