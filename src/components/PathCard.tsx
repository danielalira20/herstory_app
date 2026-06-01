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

  const cardBg = isSearch
    ? "linear-gradient(135deg, rgba(216,180,254,0.85) 0%, rgba(233,213,255,0.9) 100%)"
    : "linear-gradient(135deg, rgba(249,168,212,0.75) 0%, rgba(252,207,232,0.85) 100%)";

  const borderColor = isSearch
    ? "rgba(168, 85, 247, 0.3)"
    : "rgba(236, 72, 153, 0.3)";

  const glowColor = isSearch
    ? "rgba(168, 85, 247, 0.15)"
    : "rgba(236, 72, 153, 0.15)";

  const accentColor = isSearch
    ? "rgba(168, 85, 247, 0.6)"
    : "rgba(236, 72, 153, 0.6)";

  const textColor = isSearch ? "text-purple-900" : "text-pink-900";
  const textMuted = isSearch ? "text-purple-700/70" : "text-pink-700/70";
  const textLight = isSearch ? "text-purple-600/60" : "text-pink-600/60";

  const badgeBg = isSearch
    ? "rgba(168, 85, 247, 0.12)"
    : "rgba(236, 72, 153, 0.12)";
  const badgeBorder = isSearch
    ? "rgba(168, 85, 247, 0.25)"
    : "rgba(236, 72, 153, 0.25)";
  const badgeText = isSearch ? "text-purple-700" : "text-pink-700";

  const checkBg = isSearch
    ? "rgba(168, 85, 247, 0.15)"
    : "rgba(236, 72, 153, 0.15)";
  const checkBorder = isSearch
    ? "rgba(168, 85, 247, 0.3)"
    : "rgba(236, 72, 153, 0.3)";
  const checkIcon = isSearch ? "text-purple-600" : "text-pink-600";

  const buttonGradient = isSearch
    ? "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)"
    : "linear-gradient(135deg, #ec4899 0%, #db2777 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`
        relative rounded-3xl p-8 md:p-10 flex flex-col
        shadow-xl
        transition-all duration-500 ease-out
        ${isOtherHovered ? "opacity-50 scale-[0.98]" : "opacity-100"}
        overflow-hidden group
      `}
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* Glow sutil al hacer hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `0 8px 40px ${glowColor}, 0 0 80px ${glowColor}`,
        }}
      />

      {/* Shimmer en hover */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"
        style={{
          background: `linear-gradient(to right, transparent, ${isSearch ? "rgba(168,85,247,0.06)" : "rgba(236,72,153,0.06)"}, transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-col flex-grow">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs uppercase tracking-wider font-semibold mb-6 w-fit ${badgeText}`}
          style={{
            background: badgeBg,
            border: `1px solid ${badgeBorder}`,
          }}
        >
          <badge.icon className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span>{badge.text}</span>
        </motion.span>

        {/* Ícono */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${accentColor.replace("0.6", "0.15")}, ${accentColor.replace("0.6", "0.08")})`,
            border: `1px solid ${accentColor.replace("0.6", "0.2")}`,
          }}
        >
          {icon}
        </motion.div>

        {/* Título */}
        <h3 className={`text-2xl md:text-3xl font-bold mb-4 font-serif ${textColor}`}>
          {title}
        </h3>

        {/* Descripción */}
        <p className={`text-base leading-relaxed mb-6 min-h-[4.5rem] ${textMuted}`}>
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.3 + index * 0.08 }}
              className={`flex items-start gap-3 text-sm ${textMuted}`}
            >
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  background: checkBg,
                  border: `1px solid ${checkBorder}`,
                }}
              >
                <Check className={`w-3 h-3 ${checkIcon}`} strokeWidth={3} />
              </span>
              <span className="leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Botón CTA */}
        <Link to={buttonLink}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full font-semibold py-3.5 px-6 rounded-full text-white transition-all duration-300"
            style={{
              background: buttonGradient,
              boxShadow: `0 4px 15px ${glowColor}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 25px ${accentColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 15px ${glowColor}`;
            }}
          >
            {buttonText}
          </motion.button>
        </Link>

        {/* Micro texto */}
        <p className={`text-xs text-center mt-4 leading-relaxed ${textLight}`}>
          {microText}
        </p>
      </div>
    </motion.div>
  );
};

export default PathCard;