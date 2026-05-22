import type { LucideIcon } from "lucide-react";

interface FeatureCardLearnProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCardLearn = ({ Icon, title, description, delay = 0 }: FeatureCardLearnProps) => {
  return (
    <div
      className="group cursor-pointer transition-all duration-500 ease-out hover:scale-105 opacity-0 animate-fade-in-up relative p-8 rounded-2xl"
      style={{ 
        animationDelay: `${delay}s`,
        background: 'rgba(255, 255, 255, 0.75)',
        border: '1px solid rgba(251, 207, 232, 0.6)',
        boxShadow: '0 4px 20px rgba(244, 114, 182, 0.15)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(244, 114, 182, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(244, 114, 182, 0.15)';
      }}
    >
      <div className="relative z-10">
        <div className="mb-4">
          <Icon 
            size={48} 
            className="transition-all duration-300 group-hover:drop-shadow-lg" 
            strokeWidth={1.5}
            style={{ color: '#db2777' }}
          />
        </div>
        <h3 className="text-xl font-serif font-semibold mb-2 transition-colors duration-300" style={{ color: '#831843' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed font-sans" style={{ color: '#9f1239' }}>
          {description}
        </p>
      </div>
      
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(244, 114, 182, 0.05) 100%)'
        }}
      />
    </div>
  );
};

export default FeatureCardLearn;