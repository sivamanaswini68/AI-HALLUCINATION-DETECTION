/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhatIsHallucination } from './components/WhatIsHallucination';
import { VerifyWorkspace } from './components/VerifyWorkspace';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BenchmarkSection } from './components/BenchmarkSection';
import { ModelComparisonSection } from './components/ModelComparisonSection';
import { ResearchAnalyticsSection } from './components/ResearchAnalyticsSection';
import { HumanValidationLab } from './components/HumanValidationLab';
import { PresentationGuide } from './components/PresentationGuide';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLiveWeb, setIsLiveWeb] = useState<boolean>(true);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);

  // Check backend grounding status
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setIsLiveWeb(Boolean(data.hasLiveWebGrounding));
      })
      .catch(() => {
        setIsLiveWeb(false);
      });
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll listener to update active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'what-is-hallucination',
        'verify',
        'how-it-works',
        'benchmark',
        'model-comparison',
        'research',
        'human-validation',
      ];

      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Top Laboratory Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isLiveWeb={isLiveWeb}
        onStartPresentation={() => setIsPresentationOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Page 1: Home / Hero with Animated Pipeline & Example */}
        <div id="home">
          <HeroSection
            onVerifyClick={() => handleNavigate('verify')}
            onHowItWorksClick={() => handleNavigate('how-it-works')}
          />
        </div>

        {/* Page 2: What is Hallucination? & Interactive Education */}
        <WhatIsHallucination />

        {/* Page 3: Main Verification Workspace (Step 1, 2, 3, 9-step animation, Result, Forensics, Graph, Corrected Answer) */}
        <VerifyWorkspace />

        {/* Page 4: How It Works & Architecture */}
        <HowItWorksSection />

        {/* Page 5: Standardized Benchmark Mode */}
        <BenchmarkSection />

        {/* Page 6: Model Comparison */}
        <ModelComparisonSection />

        {/* Page 7: Research Error Analytics */}
        <ResearchAnalyticsSection />

        {/* Page 8: Human Evaluator Agreement Lab */}
        <HumanValidationLab />
      </main>

      {/* Presentation Mode Guide Overlay */}
      <PresentationGuide
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        onNavigateSection={handleNavigate}
      />

      {/* Laboratory Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
