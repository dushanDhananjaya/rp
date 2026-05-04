import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerFast } from '../animations/variants';

// ─── EmailJS config — replace these after setting up your account ────────────
const EMAILJS_SERVICE_ID  = 'service_nzswmba';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_fiviexs';  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'TCg3_eVi8BJ_Yq2lM';   // e.g. 'aBcDeFgHiJkLmNoP'
// ─────────────────────────────────────────────────────────────────────────────

const contactInfo = [
  
  {
    icon: Mail,
    label: 'Research Inquiries',
    value: 'visitmanoplatform@gmail.com',
    color: '#8b5cf6',
    href: 'mailto:visitmanoplatform@gmail.com',
  },
  {
    icon: Phone,
    label: 'Research Lab',
    value: '+94 11 2650301',
    color: '#22d3ee',
    href: 'tel:+94112650301',
  },
  {
    icon: Phone,
    label: 'Team Lead',
    value: '+94 77 234 5678',
    color: '#10b981',
    href: 'tel:+94772345678',
  },
  {
    icon: MapPin,
    label: 'Primary Location',
    value: 'SLIIT Malabe Campus, Sri Lanka',
    color: '#f59e0b',
    href: null,
  },
];

const FAQs = [
  { q: 'How can I collaborate with the MANŌ team?', a: 'We welcome academic and industry collaborations. Please email our PI directly with your proposal and institutional affiliation.' },
  { q: 'Is the MANŌ dataset publicly available?', a: 'Our synthetic dataset will be released on request for research purposes after the viva assessment, pending ethics review completion.' },
  { q: 'Can I access the research paper?', a: 'The final paper is available in our documents repository. A preprint will be submitted to arXiv upon viva completion.' },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formState.name,
          from_email:   formState.email,
          subject:      formState.subject,
          message:      formState.message,
          reply_to:     formState.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

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
            Get in Touch
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-display font-black text-5xl lg:text-6xl text-white mb-4"
          >
            Contact the{' '}
            <span className="gradient-text">Research Team</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 max-w-xl mx-auto">
            Whether you're a researcher, collaborator, clinician, or student interested in 
            our work — we'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info panel */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div key={i} variants={fadeInUp}>
                  {info.href ? (
                    <a href={info.href} className="glass-card p-5 flex items-start gap-4 block">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${info.color}20`, border: `1px solid ${info.color}30` }}
                      >
                        <Icon size={18} style={{ color: info.color }} />
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs mb-1">{info.label}</div>
                        <div className="text-white text-sm font-medium leading-snug">{info.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="glass-card p-5 flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${info.color}20`, border: `1px solid ${info.color}30` }}
                      >
                        <Icon size={18} style={{ color: info.color }} />
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs mb-1">{info.label}</div>
                        <div className="text-white text-sm font-medium leading-snug">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Office hours */}
            <motion.div variants={fadeInUp} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={16} className="text-indigo-400" />
                <span className="text-white font-semibold text-sm">Response Time</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We typically respond within <span className="text-indigo-400 font-semibold">1–2 business days</span>. 
                For urgent academic matters, please email the PI directly.
              </p>
            </motion.div>

            {/* FAQ */}
            <motion.div variants={fadeInUp} className="glass-card p-5">
              <h3 className="font-display font-semibold text-white mb-4">Quick FAQs</h3>
              <div className="space-y-3">
                {FAQs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                      className="text-left w-full text-slate-300 text-xs font-semibold hover:text-white transition-colors flex items-start gap-2"
                    >
                      <span className="text-indigo-400 flex-shrink-0 mt-0.5">Q.</span>
                      {faq.q}
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFAQ === i ? 'auto' : 0, opacity: openFAQ === i ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-500 text-xs leading-relaxed pt-2 pl-5">{faq.a}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <h2 className="font-display font-bold text-2xl text-white mb-2">Send a Message</h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill out the form below and our team will get back to you promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-400 text-xs mb-2 font-medium">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. Jane Smith"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-2 font-medium">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@university.edu"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-2 font-medium">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder="Research collaboration inquiry"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-2 font-medium">Message *</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describe your inquiry, collaboration proposal, or question in detail..."
                    className="form-input resize-none"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="btn-primary w-full justify-center"
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                >
                  {status === 'idle' && (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle size={16} />
                      <span>Message Sent!</span>
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <AlertCircle size={16} />
                      <span>Failed to Send</span>
                    </>
                  )}
                </motion.button>

                {/* Success message */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                  >
                    <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                    <p className="text-emerald-300 text-sm">
                      Thank you! We've received your message and will respond within 1–2 business days.
                    </p>
                  </motion.div>
                )}

                {/* Error message */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                  >
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                    <p className="text-red-300 text-sm">
                      Something went wrong. Please try again or email us directly at mano@gmail.com.
                    </p>
                  </motion.div>
                )}

                <p className="text-slate-600 text-xs text-center">
                  Your information is kept strictly confidential and will not be shared with third parties.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
