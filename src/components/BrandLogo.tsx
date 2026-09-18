import React from 'react';
import { motion } from 'motion/react';

export interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light'; // 'dark' = dark mark for light background, 'light' = white mark for dark background
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Bespoke sculpted designer lowercase "g" mark
// Mathematical bounds: x: 0.5..23.8 (w: 23.3, center: 12.15), y: 1.5..33.0 (h: 31.5, center: 17.25)
// In a 36x36 square coordinate space with viewBox="-5.85 -0.75 36 36",
// margins are exactly equal: Left: 6.35, Right: 6.35, Top: 2.25, Bottom: 2.25.
const G_PATH = `
  M 17 7.5
  C 20.5 6 22.8 4.2 23.5 2.8
  C 23.8 2 22.8 1.5 21.2 1.8
  C 18.8 2.3 17 4.8 16.2 7
  C 14.8 5.6 12.6 5 10 5
  C 4.2 5 0.5 9.5 0.5 15.5
  C 0.5 21.5 4.5 25.8 10.5 25.8
  C 13 25.8 15.2 24.8 16.6 23.2
  L 16.6 24.8
  C 16.6 28.5 13.8 30.5 9.5 30.5
  C 6.5 30.5 3.8 29.6 1.8 28
  L 0.6 30.5
  C 2.8 32.2 6.5 33 10 33
  C 16.8 33 20.5 29 20.5 24
  L 20.5 7.5
  Z
  M 10.5 8.2
  C 14.2 8.2 16.6 11.2 16.6 15.5
  C 16.6 19.8 14.2 22.6 10.5 22.6
  C 6.8 22.6 4.2 19.8 4.2 15.5
  C 4.2 11.2 6.8 8.2 10.5 8.2
  Z
`.replace(/\s+/g, ' ').trim();

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark
    ? 'text-black hover:text-neutral-700'
    : 'text-white hover:text-neutral-200';

  const sizeClasses = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-8 h-8 sm:w-8.5 sm:h-8.5',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
    xl: 'w-11 h-11 sm:w-12 sm:h-12',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-label="Ganesh"
    >
      <motion.svg
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        viewBox="-5.85 -0.75 36 36"
        className={`${sizeClasses} ${textColor} transition-colors duration-200 block`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={G_PATH} />
      </motion.svg>
    </div>
  );
};
