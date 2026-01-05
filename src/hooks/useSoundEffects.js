import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

// Definición de sonidos con URLs de sonidos gratuitos o generados
const SOUND_DEFINITIONS = {
  // UI Interactions
  click: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    volume: 0.3,
  },
  hover: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    volume: 0.15,
  },

  // Positive feedback
  success: {
    src: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
    volume: 0.4,
  },
  levelUp: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
    volume: 0.5,
  },
  achievement: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
    volume: 0.45,
  },
  reward: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
    volume: 0.4,
  },
  coins: {
    src: 'https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3',
    volume: 0.35,
  },

  // Game events
  cardFlip: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2073/2073-preview.mp3',
    volume: 0.3,
  },
  cardUnlock: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2021/2021-preview.mp3',
    volume: 0.4,
  },
  missionComplete: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2063/2063-preview.mp3',
    volume: 0.5,
  },
  worldUnlock: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2016/2016-preview.mp3',
    volume: 0.5,
  },

  // Negative feedback
  error: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
    volume: 0.3,
  },

  // Ambient/Navigation
  transition: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    volume: 0.2,
  },
  pop: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3',
    volume: 0.25,
  },

  // XP and progress
  xpGain: {
    src: 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3',
    volume: 0.3,
  },
  streakBonus: {
    src: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
    volume: 0.4,
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
