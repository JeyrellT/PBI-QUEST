import React, { createContext, useContext } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const SoundContext = createContext(null);

/**
 * Provider de sonidos para toda la aplicación
 */
export const SoundProvider = ({ children }) => {
  const soundEffects = useSoundEffects();

  return (
    <SoundContext.Provider value={soundEffects}>
      {children}
    </SoundContext.Provider>
  );
};

/**
 * Hook para usar sonidos en cualquier componente
 */
export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    // Retornar funciones vacías si no hay provider
    return {
      sounds: {
        click: () => {},
        hover: () => {},
        success: () => {},
        levelUp: () => {},
        achievement: () => {},
        reward: () => {},
        coins: () => {},
        cardFlip: () => {},
        cardUnlock: () => {},
        missionComplete: () => {},
        worldUnlock: () => {},
        error: () => {},
        transition: () => {},
        pop: () => {},
        xpGain: () => {},
        streakBonus: () => {},
      },
      isEnabled: false,
      toggleSound: () => {},
      volume: 0.5,
      adjustVolume: () => {},
    };
  }
  return context;
};

export default SoundContext;
