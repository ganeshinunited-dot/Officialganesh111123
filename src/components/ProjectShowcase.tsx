import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';
import { playSound } from '../utils/sound';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'Meta Ads', 'SaaS', 'UI/UX', 'Web Design'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (activeFilter === 'Meta Ads') return p.tags.includes('Meta Ads');
        if (activeFilter === 'SaaS') return p.tags.includes('SaaS');
        if (activeFilter === 'UI/UX') return p.tags.includes('UI/UX');
        if (activeFilter === 'Web Design') return p.tags.includes('Web Design') || p.tags.includes('Framer');
        return true;
      });

  return (
    <section id="cases" className="relative py-24 sm:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
              FEATURED CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#09090b] tracking-tight">
              Engineered for Conversion.<br className="hidden sm:inline" /> Designed to Scale.
            </h2>
          </div>

          <p className="text-neutral-500 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            A curated selection of multi-million dollar Meta advertising campaigns, SaaS product design systems, and modern web experiences.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 py-5 sm:py-8 overflow-x-auto no-scrollbar touch-pan-x">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            const count = filter === 'All'
              ? PROJECTS.length
              : PROJECTS.filter(p => {
                  if (filter === 'Meta Ads') return p.tags.includes('Meta Ads');
                  if (filter === 'SaaS') return p.tags.includes('SaaS');
                  if (filter === 'UI/UX') return p.tags.includes('UI/UX');
                  if (filter === 'Web Design') return p.tags.includes('Web Design') || p.tags.includes('Framer');
                  return false;
                }).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  playSound('click');
                  setActiveFilter(filter);
                }}
                className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200/80'
                }`}
              >
                <span>{filter}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                onClick={() => {
                  playSound('click');
                  onSelectProject(project);
                }}
                className="group cursor-pointer rounded-2xl border border-neutral-200/80 bg-white hover:border-neutral-400 active:scale-[0.99] hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.08)] transition-all overflow-hidden flex flex-col h-full"
              >
                {/* Visual Thumbnail Window */}
                <div className="relative h-56 sm:h-64 md:h-60 lg:h-64 xl:h-72 w-full bg-neutral-100 overflow-hidden flex items-center justify-center p-5 sm:p-6 border-b border-neutral-100 shrink-0">
                  {/* Subtle decorative background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient} opacity-60 group-hover:scale-105 transition-transform duration-500`} />

                  {/* Browser Mockup / Graphic Frame */}
                  <div className="relative z-10 w-full h-full rounded-xl bg-white shadow-sm border border-black/5 p-4 flex flex-col justify-between overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
                        growth.ganeshkarki/{project.id}
                      </span>
                    </div>

                    <div className="my-auto text-center py-4">
                      <span className="font-display font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight block">
                        {project.title}
                      </span>
                      <span className="text-xs text-neutral-500 mt-1 block font-medium">
                        {project.metrics.value} • {project.metrics.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[11px] text-neutral-400">
                      <span>{project.category}</span>
                      <span className="font-medium text-black group-hover:underline flex items-center gap-0.5">
                        View case study <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Tags */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-display font-bold text-neutral-900 group-hover:text-black transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-black" />
                    </h3>

                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                    <span>{project.client}</span>
                    <span className="font-medium text-neutral-800">{project.year}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
