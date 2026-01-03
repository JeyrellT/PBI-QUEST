import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/game/Dashboard';
import WorldMap from './components/game/WorldMap';
import Achievements from './components/game/Achievements';
import Academy from './components/game/Academy';
import Leaderboard from './components/game/Leaderboard';
import LevelUpModal from './components/common/LevelUpModal';
import OnboardingTutorial from './components/common/OnboardingTutorial';
import { useOnboarding } from './hooks/useOnboarding';
import { DailyTipBanner, MotivationalPopup } from './components/common/MotivationalMessages';
import { getRandomMessage } from './utils/motivationalMessages';
import { ToastProvider } from './context/ToastContext';
import { GameProvider, useGame } from './context/GameContext';

const AppContent = () => {
  const { user } = useGame();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(user.level);
  
  // Onboarding state
  const { showOnboarding, completeOnboarding, isLoaded } = useOnboarding();
  
  // Motivational popup state
  const [motivationalPopup, setMotivationalPopup] = useState({ show: false, message: null });

  // Check for level up
  useEffect(() => {
    if (user.level > prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(user.level);
      
      // Show motivational message after level up modal closes
      setTimeout(() => {
        setMotivationalPopup({
          show: true,
          message: getRandomMessage('levelUp', { level: user.level })
        });
      }, 3500);
    }
  }, [user.level, prevLevel]);

  // Welcome message on first visit of the day
  useEffect(() => {
    const lastVisit = localStorage.getItem('powerbi-quest-last-visit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today && isLoaded && !showOnboarding) {
      localStorage.setItem('powerbi-quest-last-visit', today);
      setTimeout(() => {
        setMotivationalPopup({
          show: true,
          message: getRandomMessage('welcome')
        });
      }, 1500);
    }
  }, [isLoaded, showOnboarding]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'worlds':
        return <WorldMap />;
      case 'achievements':
        return <Achievements />;
      case 'academy':
        return <Academy />;
      case 'social':
        return <Leaderboard />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Onboarding Tutorial for new users */}
      {isLoaded && showOnboarding && (
        <OnboardingTutorial onComplete={completeOnboarding} />
      )}
      
      {/* Motivational Popup */}
      <MotivationalPopup
        show={motivationalPopup.show}
        message={motivationalPopup.message}
        onClose={() => setMotivationalPopup({ show: false, message: null })}
      />
      
      <LevelUpModal
        show={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        level={user.level}
      />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <Header />
        {/* Daily Tip Banner */}
        <DailyTipBanner onAction={() => setActiveTab('academy')} />
        <div className="content-area" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
