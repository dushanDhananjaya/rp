import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, ExternalLink, Play, Clock, Users, ChevronRight, Calendar } from 'lucide-react';
import { presentations } from '../constants/data';
import { fadeInUp, staggerFast } from '../animations/variants';

const categoryColors = {
  proposal: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)', text: '#818cf8', label: 'Proposal' },
  progress1: { bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.3)', text: '#22d3ee', label: 'Progress I' },
  progress2: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#34d399', label: 'Progress II' },
  final: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24', label: 'Final' },
  viva: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#a78bfa', label: 'Viva' },
};

function PresentationCard({ pres, index }) {
  const colors = categoryColors[pres.category];
  const isUpcoming = pres.status === 'upcoming';

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="glass-card overflow-hidden group"
    >
      {/* Thumbnail area */}
      <div
        className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.text}10, ${colors.text}05)` }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Slide count display */}
        <div className="relative z-10 text-center">
          {isUpcoming ? (
            <div>
              <Clock size={40} style={{ color: colors.text }} className="mx-auto mb-3 opacity-50" />
              <div className="font-mono text-sm" style={{ color: colors.text }}>Upcoming</div>
              <div className="text-slate-500 text-xs mt-1">{pres.displayDate}</div>
            </div>
          ) : (
            <div>
              <div className="font-display font-black text-6xl opacity-20" style={{ color: colors.text }}>
                {pres.slides}
              </div>
              <div className="text-slate-400 text-sm mt-1">slides</div>
            </div>
          )}
        </div>

        {/* Hover play overlay */}
        {!isUpcoming && pres.link && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: colors.text }}
            >
              <Play size={22} className="text-white ml-1" />
            </motion.div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="tag text-xs"
            style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
          >
            {colors.label}
          </span>
        </div>

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`tag text-xs ${isUpcoming ? 'tag-pending' : 'tag-success'}`}>
            {isUpcoming ? 'Upcoming' : 'Available'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-lg text-white mb-1 leading-snug">{pres.title}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: colors.text }}>{pres.subtitle}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{pres.description}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: <Calendar size={13} />, label: pres.displayDate },
            { icon: <Clock size={13} />, label: pres.duration || 'TBD' },
            { icon: <Users size={13} />, label: pres.presenter },
            { icon: <Monitor size={13} />, label: pres.slides ? `${pres.slides} slides` : 'TBD' },
          ].map((meta, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-500 text-xs">
              {meta.icon}
              <span>{meta.label}</span>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="space-y-1 mb-6">
          {pres.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-400 text-xs">
              <ChevronRight size={12} style={{ color: colors.text }} />
              {h}
            </div>
          ))}
        </div>

        {/* Action */}
        {!isUpcoming && pres.link ? (
          <a
            href={pres.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center text-sm"
            style={{
              background: `linear-gradient(135deg, ${colors.text}30, ${colors.text}15)`,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            <Play size={14} />
            <span>View Slides</span>
            <ExternalLink size={12} />
          </a>
        ) : (
          <div className="flex items-center gap-2 justify-center px-4 py-3 rounded-xl text-slate-600 border border-white/5 text-sm">
            <Clock size={14} />
            <span>Not yet available</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Presentations() {
  return (
    <div className="min-h-screen py-24 pb-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-eyebrow justify-center">Research Slides</div>
          <h1 className="font-display font-black text-5xl lg:text-6xl text-white mb-4">
            Research{' '}
            <span className="gradient-text">Presentations</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            All presentation decks from proposal to final defense — organized by milestone 
            with highlights and direct access links.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-8 mb-12 text-sm"
        >
          {[
            { label: 'Total Presentations', value: presentations.length },
            { label: 'Available Now', value: presentations.filter(p => p.status === 'completed').length },
            { label: 'Total Slides', value: presentations.reduce((s, p) => s + (p.slides || 0), 0) + '+' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-3xl gradient-text">{stat.value}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {presentations.map((pres, i) => (
            <PresentationCard key={pres.id} pres={pres} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
