import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ColorPaletteSection from './components/ColorPaletteSection';
import RoomAnalyzerSection from './components/RoomAnalyzerSection';
import MoodBoardSection from './components/MoodBoardSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ColorPaletteSection />
        <MoodBoardSection />
        <RoomAnalyzerSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;