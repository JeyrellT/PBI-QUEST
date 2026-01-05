import React, { createContext } from 'react';
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

export default SoundContext;
