import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SunMoonToggleProps {
  className?: string;
  title?: string;
}

const SunMoonToggle: React.FC<SunMoonToggleProps> = ({ className = '', title }) => {
  const { theme, actualTheme, setTheme } = useTheme();

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const label = title || `Theme: ${theme} → ${nextTheme}`;

  const handleClick = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  const isDark = actualTheme === 'dark';

  return (
    <button
      type="button"
      onClick={handleClick}
      title={label}
      aria-label={label}
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 dark:border-dark-700 backdrop-blur-xs bg-white/70 dark:bg-dark-700/70 hover:bg-white hover:dark:bg-dark-700 transition-colors ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ background: isDark ? 'radial-gradient(40px 40px at 70% 30%, rgba(255,255,255,0.1), rgba(0,0,0,0))' : 'radial-gradient(40px 40px at 30% 30%, rgba(255,255,0,0.15), rgba(0,0,0,0))' }}
        className="absolute inset-0 rounded-xl"
      />
      <AnimatePresence mode="popLayout" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Moon className="w-5 h-5 text-gray-200" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Sun className="w-5 h-5 text-yellow-500" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.span
        aria-hidden
        className="absolute -z-10"
        initial={false}
        animate={{
          boxShadow: isDark
            ? '0 0 20px rgba(59,130,246,0.35)'
            : '0 0 20px rgba(234,179,8,0.35)'
        }}
      />
    </button>
  );
};

export default SunMoonToggle;


