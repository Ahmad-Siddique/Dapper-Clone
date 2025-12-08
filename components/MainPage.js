// components/MainPage.jsx
import React from 'react';
import HeroSection from './HeroSection';
import Header from './Header';
import StatsSection from './StatsSection';
import ServicesSection from './ServicesSection';
import DemandSection from './DemandGen';
import DemandTeamSection from './DemandTeam';
import ResultsSection from './ResultsSection';
import CompareSection from './CompareSection';
import TalkToExpertSection from './TalkToExpertSection';
import Footer from './Footer';
import CursorTrail from './CursorTrail';

const MainPage = () => {
  return (
    <CursorTrail>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <DemandSection />
        {/* <DemandTeamSection /> */}
        <ResultsSection />
        <CompareSection />
        <TalkToExpertSection />
        <Footer />
      </div>
    </CursorTrail>
  );
};

export default MainPage;
