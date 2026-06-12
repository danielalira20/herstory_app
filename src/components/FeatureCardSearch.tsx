import { LucideIcon } from 'lucide-react';

interface FeatureCardSearchProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCardSearch = ({ icon: Icon, title, description, delay = '0ms' }: FeatureCardSearchProps) => {
  return (
    <div 
      className="group relative p-8 rounded-2xl transition-all duration-500 ease-out cursor-pointer opacity-0 animate-fade-in-up hover:translate-y-[-12px] hover:scale-[1.03] h-full"
      style={{ 
        animationDelay: delay,
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(196, 181, 253, 0.3)',
        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.1)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(168, 85, 247, 0.25)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.1)'}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(192, 132, 252, 0.05) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-5">
          <Icon className="w-10 h-10 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-xl font-semibold text-purple-900 mb-3 font-serif tracking-wide">
          {title}
        </h3>
        
        <p className="text-purple-700 leading-relaxed font-light">
          {description}
        </p>
      </div>
      
      {/* Subtle border glow on hover */}
      <div 
        className="absolute inset-0 rounded-2xl border transition-all duration-500"
        style={{
          borderColor: 'rgba(168, 85, 247, 0)'
        }}
      />
    </div>
  );
};

export default FeatureCardSearch;
