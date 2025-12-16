import React from 'react';

import Hero from '../../../components/about/Hero';
import MissionSection from '../../../components/about/Mission';
import Values from '../../../components/about/Values';
import Leaders from '../../../components/about/Leaders';

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden selection:bg-black selection:text-white">
    
      <Hero />
      <MissionSection />
      <Values />
      <Leaders />
      
    </main>
  );
}