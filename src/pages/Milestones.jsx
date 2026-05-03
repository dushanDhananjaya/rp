import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { milestones } from '../constants/data';
import { fadeInUp, staggerContainer, staggerFast } from '../animations/variants';

const categories = ['all', 'proposal', 'progress', 'final', 'viva'];

const categoryColors = {
  proposal: { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)', text: '#818cf8' },
  progress: { bg: 'rgba(34,211,238,0.15)', border: 'rgba(34,211,238,0.3)', text: '#22d3ee' },
  final: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)', text: '#34d399' },
  viva: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
};

function MilestoneCard({ milestone, index }) {
  const [expanded, setExpanded] = useState(false);
  const colors = categoryColors[milestone.category];
  const isCompleted = milestone.status === 'completed';

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="glass-card overflow-hidden"
    >


      <div className="p-7">
        {/* Header row */}
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span
              className="tag text-xs"
              style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
            >
              {milestone.category.charAt(0).toUpperCase() + milestone.category.slice(1)}
            </span>
            {isCompleted ? (
              <span className="tag tag-success text-xs">
                <CheckCircle size={10} />
                Completed
              </span>
            ) : (
              <span className="tag tag-pending text-xs">
                <Clock size={10} />
                Upcoming
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-xl text-white">{milestone.title}</h3>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{milestone.description}</p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide' : 'Show'} deliverables
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-5 space-y-4">
            <div>
              <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Deliverables</h4>
              <ul className="space-y-2">
                {milestone.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <div className="w-4 h-4 rounded-full border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                      {isCompleted && <CheckCircle size={10} className="text-indigo-400" />}
                    </div>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            {(milestone.presentationLink || milestone.documentLink) && (
              <div className="flex gap-3 pt-2 flex-wrap">
                {milestone.presentationLink && (
                  <a
                    href={milestone.presentationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs py-2 px-4"
                  >
                    <span>Presentation</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {milestone.documentLink && (
                  <a
                    href={milestone.documentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2 px-4"
                  >
                    <span>Document</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Milestones() {
  const [filter, setFilter] = useState('all');

  const filtered = milestones.filter(m => filter === 'all' || m.category === filter);

  const completedCount = milestones.filter(m => m.status === 'completed').length;

  return (
    <div className="min-h-screen py-24 pb-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="section-eyebrow justify-center">
            Project Timeline
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-display font-black text-5xl lg:text-6xl text-white mb-4"
          >
            Research{' '}
            <span className="gradient-text">Milestones</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 max-w-xl mx-auto">
            Track our research journey from proposal to final assessment — every milestone,
            deliverable, and result documented.
          </motion.p>
        </motion.div>

        {/* Completed count badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card px-8 py-4 flex items-center gap-3">
            <Trophy size={20} className="text-indigo-400" />
            <span className="font-display font-bold text-2xl gradient-text">{completedCount}/4</span>
            <span className="text-slate-400 text-sm">Milestones Completed</span>
          </div>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                filter === cat
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-500 border border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Milestone cards */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-4xl mx-auto"
        >
          {filtered.map((m, i) => (
            <MilestoneCard key={m.id} milestone={m} index={i} />
          ))}
        </motion.div>

        {/* Timeline visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 glass-card p-8 max-w-4xl mx-auto"
        >
          <h3 className="font-display font-bold text-xl text-white mb-8 text-center">Project Timeline Overview</h3>
          <div className="relative">
            {/* Timeline bar */}
            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(completedCount / milestones.length) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #22d3ee)' }}
              />
            </div>
            {/* Dots */}
            <div className="flex justify-between">
              {milestones.map((m, i) => (
                <div key={m.id} className="flex flex-col items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-navy-900 transition-all"
                    style={{
                      background: m.status === 'completed' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                      boxShadow: m.status === 'completed' ? '0 0 12px rgba(99,102,241,0.6)' : 'none'
                    }}
                  />
                  <span className="text-xs text-slate-500 text-center max-w-16 leading-tight hidden sm:block">
                    {m.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
