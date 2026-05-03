import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: logo, 1: tagline, 2: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="orb orb-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className="orb orb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

          {/* Logo area */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Main logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
              className="relative"
            >
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #22d3ee)',
                }}
              >
                {/* Animated shine */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                  }}
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="font-display font-black text-4xl text-white relative z-10">M</span>
              </div>

              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{ border: '2px solid rgba(99,102,241,0.6)' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={phase >= 0 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display font-black text-5xl tracking-tight gradient-text mb-2">
                MANŌ
              </h1>
              <div className="gradient-divider w-48 mx-auto my-3" />
            </motion.div>

            {/* Tagline */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-slate-400 text-sm tracking-[0.2em] uppercase font-mono text-center"
                >
                  Mental Health AI Research Group
                </motion.p>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-0.5 rounded-full overflow-hidden mt-4"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #22d3ee)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
