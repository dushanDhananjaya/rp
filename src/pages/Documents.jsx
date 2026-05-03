import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, CheckCircle, Clock, Filter, FolderOpen } from 'lucide-react';
import { documents } from '../constants/data';
import { fadeInUp, staggerFast } from '../animations/variants';

const categories = ['all', 'charter', 'proposal', 'checklist', 'final', 'other'];

const categoryIcons = {
  charter: '📋',
  proposal: '📝',
  checklist: '✅',
  final: '🏆',
  other: '📁',
};

const categoryColors = {
  charter: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)', text: '#818cf8' },
  proposal: { bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.3)', text: '#22d3ee' },
  checklist: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#34d399' },
  final: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
  other: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#a78bfa' },
};

function DocumentCard({ doc, index }) {
  const colors = categoryColors[doc.category];
  const isCompleted = doc.status === 'completed';

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="glass-card p-6 group relative overflow-hidden"
    >
      {/* Hover gradient */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${colors.text}15, transparent)`, filter: 'blur(20px)' }}
      />

      <div className="relative">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
          >
            {categoryIcons[doc.category]}
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span
              className="tag text-xs capitalize"
              style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
            >
              {doc.category}
            </span>
            {isCompleted ? (
              <span className="tag tag-success text-xs">
                <CheckCircle size={10} />
                Available
              </span>
            ) : (
              <span className="tag tag-pending text-xs">
                <Clock size={10} />
                Pending
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="font-display font-bold text-lg text-white mb-2">{doc.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{doc.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-slate-600 mb-5 flex-wrap">
          <span className="font-mono">{doc.version}</span>
          <span>{doc.fileType}</span>
          {doc.size && <span>{doc.size}</span>}
        </div>

        {/* Action */}
        {isCompleted && doc.link ? (
          <a
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center text-sm"
            style={{
              background: `linear-gradient(135deg, ${colors.text}40, ${colors.text}20)`,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            <span>View Document</span>
            <ExternalLink size={14} />
          </a>
        ) : (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 border border-white/5 text-sm justify-center">
            <Clock size={14} />
            <span>Document Pending</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Documents() {
  const [filter, setFilter] = useState('all');

  const filtered = documents.filter(d => filter === 'all' || d.category === filter);
  const completedCount = documents.filter(d => d.status === 'completed').length;

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
          <div className="section-eyebrow justify-center">Research Documents</div>
          <h1 className="font-display font-black text-5xl lg:text-6xl text-white mb-4">
            Document{' '}
            <span className="gradient-text">Repository</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            All research artifacts, proposals, checklists, and final publications — 
            organized and accessible in one place.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              <span className="text-slate-300">{completedCount} Available</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-amber-400" />
              <span className="text-slate-300">{documents.length - completedCount} Pending</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-indigo-400" />
              <span className="text-slate-300">{documents.length} Total</span>
            </div>
          </div>
        </motion.div>

        {/* All Documents Link Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(99,102,241,0.3)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <FolderOpen size={22} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">Complete Document Folder</h3>
              <p className="text-slate-500 text-sm">Access all research documents in our shared Google Drive repository</p>
            </div>
          </div>
          <a
            href="https://drive.google.com/drive/folders/1LhT7DlK1l9NBCyAl4O-BwBbURatYmRYt?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-shrink-0"
          >
            <span>Open Drive Folder</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Filter size={16} className="text-slate-500 self-center" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm capitalize transition-all duration-300 ${
                filter === cat
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-500 border border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat !== 'all' && <span>{categoryIcons[cat]}</span>}
              {cat}
            </button>
          ))}
        </div>

        {/* Document grid */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="card-grid"
        >
          {filtered.map((doc, i) => (
            <DocumentCard key={doc.id} doc={doc} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
