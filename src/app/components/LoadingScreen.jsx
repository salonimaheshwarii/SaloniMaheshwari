'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="text-center">
        {/* Professional Loading Icon */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="w-16 h-16 mx-auto mb-8"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 rounded-lg"></div>
            <div className="absolute inset-2 border-2 border-blue-500 rounded-lg"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg"></div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h1
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl font-semibold text-blue-400 mb-4"
        >
          LOADING PORTFOLIO
        </motion.h1>

        {/* Progress Bar */}
        <div className="w-80 h-3 bg-slate-800 rounded-lg mx-auto mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-slate-300 text-lg font-medium">
          {progress}% COMPLETE
        </p>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => {
          // Use deterministic positions based on index to avoid hydration mismatch
          const left = ((i * 17 + 23) % 100);
          const top = ((i * 31 + 47) % 100);
          const delay = (i * 0.3) % 2;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}