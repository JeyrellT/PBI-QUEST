import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

// Definición de sonidos usando data URIs para evitar problemas CORS
// Estos son sonidos base64 cortos y ligeros
const SOUND_DEFINITIONS = {
  // UI Interactions - Usando CDN público de sonidos
  click: {
    src: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3',
    volume: 0.3,
  },
  hover: {
    src: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3',
    volume: 0.15,
  },

  // Positive feedback
  success: {
    src: 'https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3',
    volume: 0.4,
  },
  levelUp: {
    src: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3',
    volume: 0.5,
  },
  achievement: {
    src: 'https://cdn.freesound.org/previews/171/171671_2437358-lq.mp3',
    volume: 0.45,
  },
  reward: {
    src: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    volume: 0.4,
  },
  coins: {
    src: 'https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3',
    volume: 0.35,
  },

  // Game events
  cardFlip: {
    src: 'https://cdn.freesound.org/previews/240/240776_4107740-lq.mp3',
    volume: 0.3,
  },
  cardUnlock: {
    src: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3',
    volume: 0.4,
  },
  missionComplete: {
    src: 'https://cdn.freesound.org/previews/171/171671_2437358-lq.mp3',
    volume: 0.5,
  },
  worldUnlock: {
    src: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3',
    volume: 0.5,
  },

  // Negative feedback
  error: {
    src: 'https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3',
    volume: 0.3,
  },

  // Ambient/Navigation
  transition: {
    src: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    volume: 0.2,
  },
  pop: {
    src: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3',
    volume: 0.25,
  },

  // XP and progress
  xpGain: {
    src: 'https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3',
    volume: 0.3,
  },
  streakBonus: {
    src: 'https://cdn.freesound.org/previews/171/171671_2437358-lq.mp3',
    volume: 0.4,
  },

  // =============================================
  // MICRO-VICTORIAS (Neurociencia: Dopamina)
  // Sonidos cortos para feedback instantáneo
  // =============================================
  
  // Checkpoints y progreso
  checkpoint: {
    src: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    volume: 0.35,
  },
  microSuccess: {
    src: 'https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3',
    volume: 0.25,
  },
  
  // Sonidos mágicos/especiales
  magicSparkle: {
    src: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3',
    volume: 0.3,
  },
  chime: {
    src: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    volume: 0.3,
  },
  
  // Victoria grande
  victory: {
    src: 'https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3',
    volume: 0.5,
  },
  celebration: {
    src: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3',
    volume: 0.45,
  },
  
  // Feedback suave
  softClick: {
    src: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3',
    volume: 0.2,
  },
  hint: {
    src: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3',
    volume: 0.25,
  },
};

/**
 * Hook para gestionar efectos de sonido premium
 * Incluye control de volumen, mute, y gestión de carga
 */
export const useSoundEffects = () => {
  const soundsRef = useRef({});
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('powerbi-quest-sounds-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('powerbi-quest-sounds-volume');
    return saved !== null ? parseFloat(saved) : 0.5;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Inicializar sonidos
  useEffect(() => {
    const currentSounds = soundsRef.current;

    const loadSounds = async () => {
      Object.entries(SOUND_DEFINITIONS).forEach(([name, config]) => {
        currentSounds[name] = new Howl({
          src: [config.src],
          volume: config.volume * 0.5, // Volumen inicial
          preload: true,
        });
      });
      setIsLoaded(true);
    };

    loadSounds();

    return () => {
      // Cleanup
      Object.values(currentSounds).forEach(sound => {
        if (sound && typeof sound.unload === 'function') {
          sound.unload();
        }
      });
    };
  }, []);

  // Actualizar volumen cuando cambie
  useEffect(() => {
    Object.entries(soundsRef.current).forEach(([name, sound]) => {
      const baseVolume = SOUND_DEFINITIONS[name]?.volume || 0.3;
      sound.volume(baseVolume * volume);
    });
    localStorage.setItem('powerbi-quest-sounds-volume', volume.toString());
  }, [volume]);

  // Guardar preferencia de enabled
  useEffect(() => {
    localStorage.setItem('powerbi-quest-sounds-enabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  // Reproducir sonido
  const play = useCallback((soundName, options = {}) => {
    if (!isEnabled) return;

    const sound = soundsRef.current[soundName];
    if (sound) {
      // Aplicar opciones
      if (options.rate) {
        sound.rate(options.rate);
      }
      if (options.volume !== undefined) {
        const baseVolume = SOUND_DEFINITIONS[soundName]?.volume || 0.3;
        sound.volume(baseVolume * volume * options.volume);
      }

      sound.play();
    }
  }, [isEnabled, volume]);

  // Reproducir secuencia de sonidos
  const playSequence = useCallback((sounds, interval = 150) => {
    if (!isEnabled) return;

    sounds.forEach((soundName, index) => {
      setTimeout(() => {
        play(soundName);
      }, index * interval);
    });
  }, [isEnabled, play]);

  // Toggle sonido
  const toggleSound = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  // Ajustar volumen
  const adjustVolume = useCallback((newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  // Sonidos específicos con efectos
  const sounds = {
    // UI
    click: () => play('click'),
    hover: () => play('hover', { volume: 0.5 }),

    // Recompensas
    success: () => play('success'),
    levelUp: () => playSequence(['pop', 'levelUp', 'coins'], 200),
    achievement: () => playSequence(['pop', 'achievement'], 100),
    reward: () => play('reward'),
    coins: () => play('coins'),

    // Cartas
    cardFlip: () => play('cardFlip'),
    cardUnlock: () => playSequence(['cardFlip', 'cardUnlock'], 150),

    // Misiones
    missionComplete: () => playSequence(['success', 'missionComplete', 'xpGain'], 200),
    worldUnlock: () => playSequence(['pop', 'worldUnlock', 'achievement'], 150),

    // Feedback negativo
    error: () => play('error'),

    // Navegación
    transition: () => play('transition'),
    pop: () => play('pop'),

    // XP
    xpGain: () => play('xpGain'),
    streakBonus: () => play('streakBonus'),
    
    // =============================================
    // MICRO-VICTORIAS (Para sistema pedagógico)
    // =============================================
    checkpoint: () => play('checkpoint'),
    microSuccess: () => play('microSuccess'),
    magicSparkle: () => playSequence(['pop', 'magicSparkle'], 100),
    chime: () => play('chime'),
    victory: () => playSequence(['success', 'victory', 'celebration'], 150),
    celebration: () => play('celebration'),
    softClick: () => play('softClick'),
    hint: () => play('hint'),
    
    // Secuencias especiales para micro-victorias
    microVictory: (type) => {
      switch(type) {
        case 'file-download':
          play('softClick');
          break;
        case 'pbi-open':
          playSequence(['chime', 'pop'], 100);
          break;
        case 'data-loaded':
          playSequence(['magicSparkle', 'success'], 150);
          break;
        case 'first-measure':
          playSequence(['pop', 'achievement', 'celebration'], 150);
          break;
        case 'checkpoint':
          play('checkpoint');
          break;
        default:
          play('microSuccess');
      }
    },
  };

  return {
    play,
    playSequence,
    sounds,
    isEnabled,
    toggleSound,
    volume,
    adjustVolume,
    isLoaded,
  };
};

export default useSoundEffects;
