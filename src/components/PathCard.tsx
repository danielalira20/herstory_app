import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { ReactNode, ElementType } from "react";

interface PathCardProps {
  badge: { icon: ElementType; text: string };
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  microText: string;
  variant: "search" | "learn";
  delay?: number;
  isOtherHovered?: boolean;
}

const PathCard = ({
  badge,
  icon,
  title,
  description,
  features,
  buttonText,
  buttonLink,
  microText,
  variant,
  delay = 0,
  isOtherHovered = false,
}: PathCardProps) => {
  const isSearch = variant === "search";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ y: -12, scale: 1.02 }}
      className={`
        relative rounded-3xl p-8 md:p-10 min-h-[580px] flex flex-col
        ${isSearch ? 'bg-primary/95' : 'bg-gradient-to-br from-secondary to-accent'}
        backdrop-blur-xl border border-white/10
        shadow-2xl
        transition-all duration-500 ease-out
        ${isOtherHovered ? 'opacity-60' : 'opacity-100'}
        overflow-hidden group
      `}
    >
      {/* Glow effect behind card on hover */}
      <div 
        className={`
          absolute -inset-4 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10
          ${isSearch ? 'bg-primary' : 'bg-secondary'}
        `}
      />
      
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl" />
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
      
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Badge - consistent positioning */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
          className="inline-flex items-center gap-2 bg-white/15 text-primary-foreground rounded-full px-3 py-1.5 text-xs uppercase tracking-wide font-medium mb-5 w-fit"
        >
          <badge.icon className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span>{badge.text}</span>
        </motion.span>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
          className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-5"
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4 font-playfair">
          {title}
        </h3>

        {/* Emotional description - balanced line height */}
        <p className="text-primary-foreground/90 text-base leading-relaxed mb-6 min-h-[4.5rem]">
          {description}
        </p>

        {/* Features - flex-grow to push button down */}
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.3 + index * 0.08 }}
              className="flex items-start gap-3 text-primary-foreground/85 text-sm"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
              </span>
              <span className="leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link to={buttonLink}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full bg-primary-foreground font-semibold py-3.5 px-6 rounded-full 
              shadow-lg hover:shadow-xl transition-all duration-300
              ${isSearch ? 'text-primary' : 'text-secondary'}
            `}
          >
            {buttonText}
          </motion.button>
        </Link>

        {/* Micro text */}
        <p className="text-primary-foreground/60 text-xs text-center mt-4 leading-relaxed">
          {microText}
        </p>
      </div>
    </motion.div>
  );
};

export default PathCard;
