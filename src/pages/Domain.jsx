import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertCircle, Target, Layers, Code2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { domainSections, technologies, researchObjectives } from '../constants/data';
import { fadeInUp, staggerContainer, staggerFast } from '../animations/variants';

const TABS = [
  { id: 'literature', label: 'Literature Survey', icon: BookOpen },
  { id: 'gap', label: 'Research Gap', icon: AlertCircle },
  { id: 'problem', label: 'Research Problem', icon: Target },
  { id: 'objectives', label: 'Objectives', icon: Target },
  { id: 'methodology', label: 'Methodology', icon: Layers },
  { id: 'technologies', label: 'Technologies', icon: Code2 },
];

const techCategories = ['all', 'ml', 'frontend', 'backend', 'database', 'devops', 'external'];

function LiteratureCard({ paper, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-indigo-400 tag tag-primary">{paper.venue} {paper.year}</span>
          </div>
          <h3 className="font-display font-semibold text-white text-lg mb-1 leading-snug">
            {paper.paper}
          </h3>
          <p className="text-slate-500 text-sm mb-3">{paper.authors}</p>
          <div className="flex flex-wrap gap-2">
            {paper.tags.map(tag => (
              <span key={tag} className="tag tag-cyan text-xs">{tag}</span>
            ))}
          </div>
        </div>
        <button className="text-slate-500 flex-shrink-0 mt-1">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-white/5 mt-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-indigo-400 font-semibold">Relevance:</span> {paper.relevance}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Domain() {
  const [activeTab, setActiveTab] = useState('literature');
  const [techFilter, setTechFilter] = useState('all');

  const filteredTech = technologies.filter(t => techFilter === 'all' || t.category === techFilter);

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
            Research Domain
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-display font-black text-5xl lg:text-6xl text-white mb-4"
          >
            The Science Behind{' '}
            <span className="gradient-text">MANŌ</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-lg">
            A deep dive into the theoretical foundations, literature review, and methodological 
            framework underpinning our research.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Literature Survey */}
          {activeTab === 'literature' && (
            <motion.div
              variants={staggerFast}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {domainSections.literatureSurvey.map((paper, i) => (
                <LiteratureCard key={i} paper={paper} index={i} />
              ))}
            </motion.div>
          )}

          {/* Research Gap */}
          {activeTab === 'gap' && (
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    <AlertCircle size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl text-white">Research Gap Analysis</h2>
                    <p className="text-slate-500 text-sm">Identified gaps in existing mental health technology</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { num: '01', title: 'Unimodal Analysis', color: '#ef4444', desc: 'Most existing systems analyze only text OR voice, missing critical cross-modal emotional cues that emerge from the interplay between linguistic content, prosodic patterns, and physiological signals.' },
                    { num: '02', title: 'Clinical Data Scarcity', color: '#f59e0b', desc: 'Mental health datasets are severely limited due to privacy regulations, stigma-driven under-reporting, and IRB constraints — hampering model generalization across demographics and cultural contexts.' },
                    { num: '03', title: 'Reactive System Design', color: '#8b5cf6', desc: 'Existing tools respond to user-reported symptoms rather than proactively detecting early-warning behavioral patterns, missing the critical intervention window before acute episodes develop.' },
                  ].map(gap => (
                    <motion.div
                      key={gap.num}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      className="flex gap-6 p-6 rounded-2xl"
                      style={{ background: `${gap.color}08`, border: `1px solid ${gap.color}20` }}
                    >
                      <div className="font-mono font-black text-5xl opacity-20" style={{ color: gap.color }}>{gap.num}</div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white mb-2">{gap.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">{gap.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Research Problem */}
          {activeTab === 'problem' && (
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-10">
                <div className="mb-8 text-center">
                  <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6" style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    <Target size={36} className="text-indigo-400" />
                  </div>
                  <h2 className="font-display font-bold text-3xl text-white mb-3">Research Problem</h2>
                  <div className="gradient-divider w-48 mx-auto" />
                </div>
                <div className="text-center mb-10">
                  <div className="text-6xl font-bold text-indigo-400/20 font-mono mb-4">970M+</div>
                  <p className="text-slate-300 text-lg">people globally affected by mental health disorders</p>
                  <p className="text-slate-500 text-sm mt-1">WHO Global Mental Health Report, 2023</p>
                </div>
                <div className="glass p-8 rounded-2xl text-center mb-8" style={{ border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <p className="text-slate-200 text-lg leading-relaxed font-display">
                    {domainSections.researchProblem.split('**').map((part, i) =>
                      i % 2 === 1 ? <span key={i} className="text-indigo-300 font-semibold">{part}</span> : part
                    )}
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {['75% untreated', 'Stigma barrier', 'No early detection'].map(item => (
                    <div key={item} className="text-center p-4 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                      <span className="text-red-400 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Objectives */}
          {activeTab === 'objectives' && (
            <motion.div
              variants={staggerFast}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6"
            >
              {researchObjectives.map((obj, i) => (
                <motion.div key={obj.id} variants={fadeInUp} className="glass-card p-7">
                  <div className="flex items-start gap-5">
                    <div className="text-3xl flex-shrink-0 mt-1">{obj.icon}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-slate-500">OBJ.{String(obj.id).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-white mb-2">{obj.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{obj.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Methodology */}
          {activeTab === 'methodology' && (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent hidden md:block" />
                <div className="space-y-8">
                  {domainSections.methodology.map((phase, i) => (
                    <motion.div
                      key={phase.phase}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      className="flex gap-8 items-start"
                    >
                      <div className="hidden md:flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center z-10 relative" style={{ background: 'rgba(99, 102, 241, 0.15)', border: '2px solid rgba(99, 102, 241, 0.4)' }}>
                          <span className="font-mono font-bold text-indigo-400 text-sm">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                      </div>
                      <div className="glass-card p-7 flex-1">
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <span className="tag tag-primary font-mono">{phase.phase}</span>
                          <span className="tag tag-cyan text-xs">{phase.duration}</span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-white mb-3">{phase.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{phase.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technologies */}
          {activeTab === 'technologies' && (
            <div>
              {/* Category filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {techCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTechFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                      techFilter === cat
                        ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                        : 'text-slate-500 border border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <motion.div
                layout
                className="flex flex-wrap justify-center gap-3"
              >
                {filteredTech.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="tech-badge text-base py-3 px-5"
                  >
                    <span>{tech.icon}</span>
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
