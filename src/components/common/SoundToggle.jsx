import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

/**
 * Toggle de sonido para el header
 */
const SoundToggle = ({ className = '' }) => {
  const { isEnabled, toggleSound } = useSound();

  return (
    <motion.button
      className={`sound-toggle ${className}`}
      onClick={toggleSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '0.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isEnabled ? 'var(--primary)' : 'var(--text-dim)',
        transition: 'all 0.3s ease',
      }}
    >
      {isEnabled ? (
        <Volume2 size={20} />
      ) : (
        <VolumeX size={20} />
      )}
    </motion.button>
  );
};

/**
 * Control de volumen expandido (para settings)
 */
export const VolumeControl = ({ className = '' }) => {
  const { isEnabled, toggleSound, volume, adjustVolume, sounds } = useSound();

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    adjustVolume(newVolume);
    sounds.click(); // Previsualizar el volumen
  };

  return (
    <div className={`volume-control ${className}`} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.75rem 1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
    }}>
      <motion.button
        onClick={toggleSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isEnabled ? 'var(--primary)' : 'var(--text-dim)',
          padding: 0,
          display: 'flex',
        }}
      >
        {isEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </motion.button>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        disabled={!isEnabled}
        style={{
          flex: 1,
          height: '4px',
          borderRadius: '2px',
          appearance: 'none',
          background: `linear-gradient(to right, var(--primary) ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
          cursor: isEnabled ? 'pointer' : 'not-allowed',
          opacity: isEnabled ? 1 : 0.5,
        }}
      />
      
      <span style={{
        fontSize: '0.85rem',
        color: 'var(--text-dim)',
        minWidth: '35px',
        textAlign: 'right',
      }}>
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
};

export default SoundToggle;
