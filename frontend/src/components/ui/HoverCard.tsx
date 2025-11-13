import React from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  glowEffect?: boolean;
  onClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  scale = 1.02,
  glowEffect = false,
  onClick
}) => {
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      whileHover={{
        scale,
        boxShadow: glowEffect
          ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.15)'
          : '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: scale * 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;
