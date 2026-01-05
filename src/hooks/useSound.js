import { useContext } from 'react';
import SoundContext from '../context/SoundContext';

/**
 * Hook para usar sonidos en cualquier componente
 */
const useSound = () => {
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

export default useSound;
