import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-solidarity.jpg";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  onExploreClick: () => void;
}

export const HeroSection = ({ title, subtitle, onExploreClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        
      </div>
    </section>
  );
};