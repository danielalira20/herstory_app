import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  Icon?: LucideIcon;
  icon?: LucideIcon;
  title: string;
  description: string;
  delay?: number | string;
  variant?: 'learn' | 'search';
}

const FeatureCard = ({ 
  Icon, 
  icon, 
  title, 
  description, 
  delay = 0,
  variant = 'learn'
}: FeatureCardProps) => {
  // Acepta tanto Icon como icon (mayúscula o minúscula)
  const IconComponent = Icon || icon;
  
  // Convierte delay a string si es número
  const animationDelay = typeof delay === 'number' ? `${delay}s` : delay;
  
  // Estilos según variante (Learn = rosa, Search = morado)
  const isLearn = variant === 'learn';
  
  const iconColor = isLearn 
    ? 'text-pink-300 group-hover:text-fuchsia-300' 
    : 'text-purple-300 group-hover:text-purple-200';
    
  const textColor = isLearn 
    ? 'text-pink-200/80' 
    : 'text-purple-200/80';
    
  const glowFrom = isLearn 
    ? 'from-pink-500/0 group-hover:from-pink-500/10' 
    : 'from-purple-500/0 group-hover:from-purple-500/10';
    
  const glowTo = isLearn 
    ? 'to-fuchsia-500/0 group-hover:to-fuchsia-500/10' 
    : 'to-purple-600/0 group-hover:to-purple-600/5';
    
  const borderColor = isLearn 
    ? 'border-pink-400/0 group-hover:border-pink-400/20' 
    : 'border-purple-400/0 group-hover:border-purple-400/20';

  return (
    <div
      className="group relative p-8 rounded-2xl glass transition-all duration-500 ease-out cursor-pointer opacity-0 animate-fade-in-up hover:translate-y-[-12px] hover:scale-[1.03] hover:shadow-glow-intense"
      style={{ animationDelay }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${glowFrom} ${glowTo} transition-all duration-500`} />
      
      {/* Content */}
      <div className="relative z-10">
        {IconComponent && (
          <div className="mb-5">
            <IconComponent 
              className={`w-10 h-10 ${iconColor} transition-all duration-300 group-hover:drop-shadow-lg`}
              strokeWidth={1.5}
            />
          </div>
        )}
        
        <h3 className="text-xl font-serif font-semibold text-foreground mb-3 tracking-wide transition-colors duration-300 group-hover:text-gradient">
          {title}
        </h3>
        
        <p className={`${textColor} text-sm leading-relaxed font-light`}>
          {description}
        </p>
      </div>
      
      {/* Subtle border glow on hover */}
      <div className={`absolute inset-0 rounded-2xl border ${borderColor} transition-all duration-500`} />
    </div>
  );
};

export default FeatureCard;
