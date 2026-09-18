import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, X, Share2, Check } from 'lucide-react';
import { BlogPost } from '../types';
import { BrandLogo } from './BrandLogo';
import { playSound } from '../utils/sound';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [shared, setShared] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when reader is open
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [post, onClose]);

  // Track reading scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      const progress = (target.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    }
  };

  const handleShare = () => {
    playSound('click');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="w-full h-full sm:h-auto sm:max-h-[92vh] max-w-3xl bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
      >
        {/* Reading Progress Indicator */}
        <div className="w-full h-1 bg-neutral-100 relative shrink-0">
          <div
            className="h-full bg-neutral-900 transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Clean Reader Top Header with 'g' Logo */}
        <header className="px-3 sm:px-8 py-3 sm:py-4 border-b border-neutral-100 bg-white/95 backdrop-blur-sm flex items-center justify-between gap-2 sm:gap-4 shrink-0 z-20">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-black hover:border-neutral-400 hover:bg-neutral-50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {/* Signature 'g' Logo in reader navigation */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center shadow-xs">
              <BrandLogo variant="light" size="sm" />
            </div>
            <span className="text-xs font-semibold text-neutral-900 tracking-tight hidden sm:inline">
              Ganesh Karki
            </span>
          </div>

          {/* Right action controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="w-10 h-10 rounded-lg border border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-50 active:bg-neutral-100 transition-all flex items-center justify-center"
              title="Copy link"
              aria-label="Copy link"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-700 transition-all flex items-center justify-center"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Article Reading View - Clean, High-Legibility, Mobile & PC Friendly */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-10 md:px-14 py-6 sm:py-12 selection:bg-neutral-900 selection:text-white"
        >
          {/* Article Header */}
          <div className="max-w-2xl mx-auto mb-10 pb-8 border-b border-neutral-200">
            {/* Date and Read Time */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-4">
              <span className="flex items-center gap-1 text-neutral-600">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-neutral-600">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-neutral-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Lead summary */}
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {post.description}
            </p>
          </div>

          {/* Clean Article Content - Questions & Full Stops only */}
          <article className="max-w-2xl mx-auto space-y-10 text-neutral-800">
            {post.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                {/* Section Question / Heading */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-neutral-900 tracking-tight pt-2">
                  {section.heading}
                </h2>

                {/* Section Paragraphs */}
                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-neutral-700 text-base sm:text-lg leading-relaxed font-normal"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>

          {/* Bottom Author Box with 'g' Logo */}
          <div className="max-w-2xl mx-auto mt-14 pt-8 border-t border-neutral-200">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BrandLogo variant="light" size="md" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Ganesh Karki</h4>
                  <p className="text-xs text-neutral-500">
                    Product Designer &amp; Meta Ads Engineer • Kathmandu
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-all text-center"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
