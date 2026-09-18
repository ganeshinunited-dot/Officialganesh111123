import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../data/projects';
import { BlogPost } from '../types';
import { playSound } from '../utils/sound';
import { BrandLogo } from './BrandLogo';
import { BlogReaderModal } from './BlogReaderModal';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const handleOpenPost = (post: BlogPost) => {
    playSound('click');
    setActivePost(post);
  };

  return (
    <section id="blog" className="relative py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header with 'g' Logo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <BrandLogo variant="light" size="sm" />
              </div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono font-semibold">
                ARTICLES &amp; GROWTH ESSAYS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-950 tracking-tight">
              Thoughts on growth &amp; design
            </h2>
          </div>

          <p className="text-neutral-600 text-sm sm:text-base max-w-md leading-relaxed">
            Real-world lessons from scaling digital advertising, crafting intuitive software interfaces, and building lightning-fast websites.
          </p>
        </div>

        {/* Clean Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mt-8 sm:mt-10 items-stretch">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => handleOpenPost(post)}
              className="group p-5 sm:p-8 rounded-2xl border border-neutral-200 bg-neutral-50/40 hover:bg-white hover:border-neutral-900 active:scale-[0.99] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
            >
              <div>
                {/* Top Meta Row with 'g' logo & date */}
                <div className="flex items-center justify-between gap-3 text-xs text-neutral-500 font-mono mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-neutral-900 text-white flex items-center justify-center shrink-0">
                      <BrandLogo variant="light" size="sm" />
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {post.date}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Blog Title */}
                <h3 className="text-lg sm:text-2xl font-display font-bold text-neutral-900 group-hover:text-black leading-snug tracking-tight">
                  {post.title}
                </h3>

                {/* Short Clean Excerpt */}
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-neutral-600 leading-relaxed font-normal">
                  {post.description}
                </p>
              </div>

              {/* Read More Action */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-neutral-200/70 flex items-center justify-between min-h-[44px]">
                <span className="text-xs font-mono text-neutral-400">By Ganesh Karki</span>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black group-hover:translate-x-1 transition-transform">
                  Read more
                  <ArrowRight className="w-4 h-4 text-neutral-700 group-hover:text-black" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Full Article Reader */}
      <AnimatePresence>
        {activePost && (
          <BlogReaderModal post={activePost} onClose={() => setActivePost(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
