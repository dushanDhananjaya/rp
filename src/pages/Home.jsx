import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Database, BarChart3, MessageSquare, ChevronDown, ExternalLink, Zap, Shield, Globe } from 'lucide-react';
import ParticleField from '../components/ParticleField';
import { fadeInUp, staggerContainer, staggerFast, scaleIn, slideUpReveal } from '../animations/variants';

const stats = [
  { label: 'Research Papers', value: '12+', icon: '📄' },
  { label: 'Dataset Records', value: '50K+', icon: '🗃️' },
  { label: 'Accuracy Rate', value: '94.2%', icon: '🎯' },
  { label: 'Team Members', value: '4', icon: '👥' },
];

const modules = [
  {
    icon: Brain,
    color: '#6366f1',
    title: 'Emotion Detection',
    description: 'Multimodal transformer-based emotion recognition from text, and physiological signals in real-time.',
    tag: 'NLP + CNN-LSTM'
  },
  {
    icon: Database,
    color: '#8b5cf6',
    title: 'Synthetic Data Engine',
    description: 'CTGAN-powered privacy-preserving clinical dataset generation with statistical fidelity preservation.',
    tag: 'CTGAN + VAE'
  },
  {
    icon: BarChart3,
    color: '#22d3ee',
    title: 'Stress Analytics',
    description: 'Predictive ML ensemble for early burnout and chronic stress detection from behavioral biomarkers.',
    tag: 'LSTM'
  },
  {
    icon: MessageSquare,
    color: '#10b981',
    title: 'AI Therapy Assistant',
    description: 'CBT-grounded conversational AI with clinical safety guardrails and evidence-based intervention logic.',
    tag: 'LLM + Gemini API'
  },
];

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index}
      className="glass-card p-6 text-center"
    >
      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className="font-display font-bold text-3xl gradient-text mb-1">{stat.value}</div>
      <div className="text-slate-400 text-sm">{stat.label}</div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particle field */}
        <div className="absolute inset-0">
          <ParticleField />
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center section-container py-32"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="tag tag-primary">
              <Zap size={10} />
              University Research Initiative 2025–2026
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-black text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none mb-6 tracking-tight"
          >
            <span className="text-white">When</span>{' '}
            <span className="gradient-text">AI</span>
            <br />
            <span className="text-white">Understands</span>
            <br />
            <span className="gradient-text-alt">the Mind</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            MANŌ is a cutting-edge research initiative pioneering the intersection of 
            <span className="text-indigo-400 font-semibold"> multimodal AI</span>, 
            <span className="text-violet-400 font-semibold"> affective computing</span>, and 
            <span className="text-cyan-400 font-semibold"> clinical mental health technology</span> — 
            building systems that detect, understand, and respond to human emotional states at scale.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/domain" className="btn-primary">
              <span>Explore Research</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/documents" className="btn-ghost">
              <span>View Documents</span>
              <ExternalLink size={16} />
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== ABSTRACT ==================== */}
      <section className="py-32 relative">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={fadeInUp} className="section-eyebrow">
                Project Abstract
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="font-display font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight"
              >
                A New Paradigm for{' '}
                <span className="gradient-text">Mental Health AI</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-400 text-lg leading-relaxed mb-6">
                MANŌ (Mental health AI for Neuro-Optimized outcomes) is a comprehensive research system 
                that addresses the global mental health crisis through four integrated AI-driven modules. 
                By combining transformer-based emotion analysis, synthetic data generation, predictive 
                stress modeling, and a conversational therapy assistant, the platform delivers 
                clinically-grounded, privacy-preserving mental health support at population scale.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/domain" className="btn-ghost inline-flex">
                  <span>Read Full Methodology</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual stat block */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Abstract card */}
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="font-mono text-slate-500 text-xs ml-2">mano_abstract.txt</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    {[
                      { key: 'Research Type', val: 'Applied + Experimental' },
                      { key: 'Domain', val: 'AI × Mental Health' },
                      { key: 'Modalities', val: 'Text, Physiological' },
                      { key: 'Duration', val: '13 months (2025–2026)' },
                    ].map((item) => (
                      <div key={item.key} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-slate-500">{item.key}</span>
                        <span className="text-indigo-300 font-medium">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl border border-indigo-500/30"
              >
                <span className="text-indigo-400 font-mono text-xs font-semibold">94.2% Accuracy</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-16 relative">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MODULES ==================== */}
      <section className="py-32 relative">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeInUp} className="section-eyebrow justify-center">
              System Architecture
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-bold text-4xl lg:text-5xl text-white mb-4"
            >
              Four Integrated{' '}
              <span className="gradient-text">AI Modules</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto">
              Each module operates independently while feeding into a unified wellness intelligence layer 
              for comprehensive mental health monitoring and intervention.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  variants={fadeInUp}
                  className="glass-card p-8 group relative overflow-hidden"
                >
                  {/* Background glow */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${mod.color}20, transparent)`, filter: 'blur(30px)' }}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${mod.color}20`, border: `1px solid ${mod.color}30` }}
                      >
                        <Icon size={24} style={{ color: mod.color }} />
                      </div>
                      <span className="tag tag-primary text-xs">{mod.tag}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-3">{mod.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{mod.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== KEY PILLARS ==================== */}
      <section className="py-24 relative">
        <div className="section-container">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="relative">
              <motion.div
                className="grid lg:grid-cols-3 gap-8"
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: <Shield size={28} style={{ color: '#6366f1' }} />, title: 'Privacy First', desc: 'Federated learning and synthetic data pipelines ensure patient data never leaves authorized boundaries.' },
                  { icon: <Globe size={28} style={{ color: '#22d3ee' }} />, title: 'Clinically Validated', desc: 'All outputs cross-validated.' },
                  { icon: <Zap size={28} style={{ color: '#10b981' }} />, title: 'Real-time Inference', desc: 'Sub-100ms latency across all modules via Redis caching and optimized model quantization.' },
                ].map((pillar, i) => (
                  <motion.div key={pillar.title} variants={fadeInUp} className="text-center">
                    <div className="flex justify-center mb-4">{pillar.icon}</div>
                    <h3 className="font-display font-bold text-xl text-white mb-3">{pillar.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-32">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display font-black text-5xl lg:text-6xl text-white mb-6">
              Ready to Explore?
            </h2>
            <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto">
              Dive into the full research journey — from domain analysis to final results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/domain" className="btn-primary">
                <span>View Domain Research</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-ghost">
                <span>Meet the Team</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
