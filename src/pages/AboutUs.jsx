import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, Star, BookOpen } from 'lucide-react';
import { teamMembers } from '../constants/data';
import { fadeInUp, staggerContainer, staggerFast } from '../animations/variants';

function MemberCard({ member, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="relative overflow-hidden glass-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Front face */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -20 : 0 }}
        transition={{ duration: 0.35 }}
        className="p-7 flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <div className="relative mb-5">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold font-display overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
              border: `2px solid ${member.color}40`,
              color: member.color,
              boxShadow: `0 0 30px ${member.color}20`,
            }}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              member.initials
            )}
          </div>
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ border: `1px solid ${member.color}` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-1">{member.name}</h3>
        <div
          className="tag text-xs mb-3"
          style={{
            background: `${member.color}15`,
            border: `1px solid ${member.color}30`,
            color: member.color,
          }}
        >
          {member.role}
        </div>
        <p className="text-slate-500 text-xs mb-4 leading-relaxed">{member.affiliation}</p>
        <div className="gradient-divider w-24 my-4" />
        <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
        <div className="mt-5 text-slate-600 text-xs flex items-center gap-1">
          <span>Hover to see achievements</span>
        </div>
      </motion.div>

      {/* Back face (overlay) */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 p-7 flex flex-col"
        style={{
          background: `linear-gradient(135deg, ${member.color}12, rgba(4,13,30,0.97))`,
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          {/* Small avatar on back face */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-display text-sm overflow-hidden"
            style={{ background: `${member.color}20`, color: member.color }}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              member.initials
            )}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{member.name}</div>
            <div className="text-slate-500 text-xs">Key Achievements</div>
          </div>
        </div>

        <div className="flex-1 space-y-2.5 mb-5">
          {member.achievements.map((ach, i) => (
            <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
              <Star size={12} style={{ color: member.color }} className="flex-shrink-0 mt-0.5" />
              <span>{ach}</span>
            </div>
          ))}
        </div>

        <div className="gradient-divider my-3" />

        <div className="space-y-2">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-3 text-slate-400 hover:text-white text-xs transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <Mail size={13} style={{ color: member.color }} />
            <span className="font-mono truncate">{member.email}</span>
          </a>
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-3 text-slate-400 hover:text-white text-xs transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <Phone size={13} style={{ color: member.color }} />
            <span className="font-mono">{member.phone}</span>
          </a>
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          {Object.entries(member.links).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="tag text-xs capitalize"
              style={{ background: `${member.color}15`, borderColor: `${member.color}30`, color: member.color }}
            >
              {platform.replace('_', ' ')}
              <ExternalLink size={9} />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutUs() {
  return (
    <div className="min-h-screen py-24 pb-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="section-eyebrow justify-center">
            The Research Team
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-display font-black text-5xl lg:text-6xl text-white mb-4"
          >
            The Minds Behind{' '}
            <span className="gradient-text">MANŌ</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            An interdisciplinary team of researchers, engineers, and data scientists united
            by a shared mission: making mental healthcare accessible through technology.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-slate-500 text-sm font-mono">
            Hover over each card to reveal achievements and contact information
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {teamMembers.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </motion.div>

        {/* Research group banner */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 text-center relative overflow-hidden"
        > */}
          {/* <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="relative">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <BookOpen size={28} className="text-indigo-400" />
            </div>
            <h2 className="font-display font-bold text-3xl text-white mb-3">Research Group Affiliation</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              MANŌ is conducted under the umbrella of the <span className="text-indigo-400 font-semibold">AI & Healthcare Research Initiative</span>,
              a collaborative research cluster spanning three Sri Lankan universities, with active
              international collaboration in the field of digital mental health.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['University of Moratuwa', 'SLIIT', 'NSBM Green University', 'University of Kelaniya'].map(uni => (
                <span key={uni} className="tag tag-primary text-xs">{uni}</span>
              ))}
            </div>
          </div> */}
        {/* </motion.div> */}
      </div>
    </div>
  );
}
