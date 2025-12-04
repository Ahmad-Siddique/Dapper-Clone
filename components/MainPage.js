import React from 'react'
import HeroSection from './HeroSection'
import Header from './Header'
import StatsSection from './StatsSection'
import ServicesSection from './ServicesSection'

import DemandSection from './DemandGen'
import DemandTeamSection from './DemandTeam'
import ResultsSection from './ResultsSection'
import CompareSection from './CompareSection'
import TalkToExpertSection from './TalkToExpertSection'
import Footer from './Footer'

const MainPage = () => {
  return (
    <div>
    {/* <div className='text-center'> */}
    <Header />
    {/* </div> */}
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
  )
}

export default MainPage