import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Domain = lazy(() => import('./pages/Domain'));
const Milestones = lazy(() => import('./pages/Milestones'));
const Documents = lazy(() => import('./pages/Documents'));
const Presentations = lazy(() => import('./pages/Presentations'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));

// Page loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-500"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

// Animated route wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/domain" element={<Domain />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/presentations" element={<Presentations />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Main app */}
      {loaded && (
        <div className="min-h-screen animated-gradient noise-bg">
          {/* Background orbs that persist across pages */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="orb orb-1" style={{ opacity: 0.5 }} />
            <div className="orb orb-2" style={{ opacity: 0.4 }} />
          </div>

          <Navigation />
          <main className="relative z-10">
            <AnimatedRoutes />
          </main>
        </div>
      )}
    </BrowserRouter>
  );
}
