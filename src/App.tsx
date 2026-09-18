/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Services } from './components/Services';
import { Methodology } from './components/Methodology';
import { FAQ } from './components/FAQ';
import { BlogSection } from './components/BlogSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ContactDrawer } from './components/ContactDrawer';
import { CustomCursor } from './components/CustomCursor';
import { SpecialOfferPage } from './components/SpecialOfferPage';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactInitialMessage, setContactInitialMessage] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'offer'>('home');

  // Handle URL hash routing (#offer vs #home)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#offer' || hash.startsWith('#offer')) {
        setCurrentView('offer');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToOffer = () => {
    window.location.hash = 'offer';
    setCurrentView('offer');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Initialize Lenis 120fps physics smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, [currentView]);

  const handleOpenContact = (initialScope?: string) => {
    if (initialScope) {
      setContactInitialMessage(`Hi Ganesh, I'd like to discuss "${initialScope}" for our business.`);
    } else {
      setContactInitialMessage('');
    }
    setContactOpen(true);
  };

  const handleOpenEstimator = () => {
    if (currentView !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById('estimator');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimate = (summary: string) => {
    setContactInitialMessage(`Hi Ganesh, I used your "Want to grow your brand" budget analyzer with the following setup:\n\n${summary}\n\nI'd like to move forward with aligning a proposal.`);
    setContactOpen(true);
  };

  const handleStartSimilarProject = (projectTitle: string) => {
    setSelectedProject(null);
    setContactInitialMessage(`Hi Ganesh, I reviewed your case study "${projectTitle}" and I'm looking to achieve similar growth results with high-ROAS Meta Ads and 100% UI/UX quality.`);
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#09090b] selection:bg-neutral-900 selection:text-white relative overflow-x-hidden font-sans">
      {/* Precision Inverted Physics Cursor */}
      <CustomCursor />

      {/* Conditional Separate Page View for Special Offer */}
      {currentView === 'offer' ? (
        <SpecialOfferPage
          onNavigateHome={navigateToHome}
          onOpenContact={handleOpenContact}
        />
      ) : (
        <>
          {/* Floating Header */}
          <Navigation
            onOpenContact={handleOpenContact}
            onOpenEstimator={handleOpenEstimator}
            onNavigateToOffer={navigateToOffer}
            currentView="home"
          />

          {/* Main Page Flow */}
          <main>
            {/* Kinetic Hero */}
            <Hero
              onOpenContact={handleOpenContact}
              onOpenEstimator={handleOpenEstimator}
              onNavigateToOffer={navigateToOffer}
            />

            {/* Continuous Brand Marquee */}
            <Marquee />

            {/* Selected Works Showcase */}
            <ProjectShowcase
              onSelectProject={(project) => setSelectedProject(project)}
            />

            {/* Services & Capabilities */}
            <Services
              onOpenContact={handleOpenContact}
              onNavigateToOffer={navigateToOffer}
            />

            {/* Big Numbers & Founder Quote */}
            <Methodology />

            {/* Scope & Budget Calculator */}
            <ProjectEstimator
              onApplyEstimate={handleApplyEstimate}
            />

            {/* Frequently Asked Questions */}
            <FAQ
              onOpenContact={handleOpenContact}
            />

            {/* Articles & Insights */}
            <BlogSection />
          </main>

          {/* Contact Section & Footer */}
          <Footer
            onOpenContact={handleOpenContact}
            onNavigateToOffer={navigateToOffer}
          />
        </>
      )}

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartSimilar={handleStartSimilarProject}
      />

      {/* Quick Contact Drawer */}
      <ContactDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        initialMessage={contactInitialMessage}
      />
    </div>
  );
}
