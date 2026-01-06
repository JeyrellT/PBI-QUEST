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
import { PageTransition } from './components/common/PageTransitions';
import { useOnboarding } from './hooks/useOnboarding';
import useResponsive from './hooks/useResponsive';
import { DailyTipBanner, MotivationalPopup } from './components/common/MotivationalMessages';
import { getRandomMessage } from './utils/motivationalMessages';
import { ToastProvider } from './context/ToastContext';
import { GameProvider, useGame } from './context/GameContext';
import { SoundProvider } from './context/SoundContext';

// Importar estilos premium
import './styles/premium-theme.css';
import './styles/premium-effects.css';
import './styles/premium-cards.css';

const AppContent = () => {
  const { user } = useGame();
  const { isMobile, isTablet } = useResponsive();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(user.level);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Onboarding state
  const { showOnboarding, completeOnboarding, isLoaded } = useOnboarding();
  
  // Motivational popup state
  const [motivationalPopup, setMotivationalPopup] = useState({ show: false, message: null });

  // Cerrar sidebar al cambiar de tab en móvil
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile || isTablet) {
      setSidebarOpen(false);
    }
  };

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
    <div className={`app-container ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`}>
      {/* Overlay para cerrar sidebar en móvil */}
      {(isMobile || isTablet) && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

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

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile || isTablet}
      />
      <main className="main-content">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          isMobile={isMobile || isTablet} 
        />
        {/* Daily Tip Banner */}
        <DailyTipBanner onAction={() => setActiveTab('academy')} />
        <div className="content-area" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <PageTransition key={activeTab} variant="premium">
              {renderContent()}
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <GameProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </GameProvider>
  );
};

export default App;
