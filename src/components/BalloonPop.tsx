import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface BalloonProps {
  color: string;
  delay: number;
  rotation: number;
  xOffset: number;
  exploding: boolean;
}

const colors = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#10b981',
  yellow: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
};

const BalloonItem = ({ color, delay, rotation, xOffset, exploding }: BalloonProps) => {
  if (exploding) {
    return (
      <motion.div
        initial={{ scale: 1.2, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ left: `calc(50% + ${xOffset}px)`, top: '50%' }}
      >
        {/* Particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, scale: 1 }}
              animate={{ 
                x: Math.cos(rad) * 80, 
                y: Math.sin(rad) * 80,
                scale: 0,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, y: 200, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1, rotate: rotation }}
      transition={{ 
        duration: 0.4, 
        delay, 
        type: 'spring', 
        stiffness: 200, 
        damping: 12 
      }}
      className="absolute pointer-events-none flex flex-col items-center drop-shadow-xl"
      style={{ left: `calc(50% + ${xOffset}px)`, top: 'calc(50% - 60px)' }}
    >
      <div 
        className="relative w-20 h-24 rounded-[50%] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2),inset_5px_5px_15px_rgba(255,255,255,0.4)]"
        style={{ backgroundColor: color }}
      >
        {/* Little tie at the bottom */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4"
          style={{
            backgroundColor: color,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
        {/* Highlight reflection */}
        <div className="absolute top-3 left-3 w-4 h-8 rounded-full bg-white/40 rotate-[20deg]" />
      </div>
      {/* String */}
      <svg className="w-6 h-24 mt-2" viewBox="0 0 24 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0 C 20 30, 4 60, 12 100" stroke="currentColor" strokeWidth="2" className="text-gray-300" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

export const BalloonAnimation = ({
  show,
  exploding,
}: {
  show: boolean;
  exploding: boolean;
}) => {
  if (!show && !exploding) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {show && (
          <motion.div 
            className="absolute inset-0"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
            animate={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            <BalloonItem color={colors.red} delay={0} rotation={-10} xOffset={-60} exploding={exploding} />
            <BalloonItem color={colors.blue} delay={0.1} rotation={5} xOffset={0} exploding={exploding} />
            <BalloonItem color={colors.yellow} delay={0.05} rotation={15} xOffset={60} exploding={exploding} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
