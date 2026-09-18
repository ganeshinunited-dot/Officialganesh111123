import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ArrowRight, Award } from 'lucide-react';
import { Project } from '../types';
import { playSound } from '../utils/sound';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onStartSimilar: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onStartSimilar }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-100 bg-neutral-50/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-800">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">{project.year}</span>
            </div>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] px-3 py-1.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Visit live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onClose();
                }}
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 flex items-center justify-center text-neutral-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Case Body */}
          <div className="overflow-y-auto px-4 sm:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
            {/* Title & Tagline */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                {project.client}
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-900 mt-1">
                {project.title}
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg mt-3 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Visual Mockup Stage */}
            <div className={`w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br ${project.coverGradient} flex items-center justify-center p-6 sm:p-10 border border-black/5`}>
              <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-neutral-100 p-6 text-center">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                  PERFORMANCE CASE STUDY
                </span>
                <span className="font-display font-black text-3xl sm:text-4xl text-neutral-900 block">
                  {project.title}
                </span>
                <p className="text-xs text-neutral-500 mt-2">
                  Engineered with high-ROAS Meta ad architecture & 100% UI/UX digital craft
                </p>
              </div>
            </div>

            {/* Metrics Callout */}
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                  {project.metrics.label}
                </span>
                <span className="text-3xl sm:text-4xl font-display font-black text-neutral-900">
                  {project.metrics.value}
                </span>
              </div>
              <Award className="w-8 h-8 text-neutral-400" />
            </div>

            {/* Detailed Description */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider text-xs">
                Project Overview
              </h3>
              <p className="text-neutral-600 text-base leading-relaxed">
                {project.summary}
              </p>
              {project.challenge && (
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs text-neutral-600 leading-relaxed">
                  <strong className="text-neutral-900 block mb-1">Challenge & Objectives:</strong>
                  {project.challenge}
                </div>
              )}
            </div>

            {/* Tags / Stack */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider text-xs mb-3">
                Disciplines & Technical Execution
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-neutral-900 block text-sm">
                  Want similar scaling results for your brand?
                </span>
                <span className="text-xs text-neutral-500">
                  I can architect a bespoke Meta ad setup and 100% UI/UX redesign for your business.
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onStartSimilar(project.title);
                }}
                className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-full bg-black text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Start a Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
