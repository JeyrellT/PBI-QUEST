import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';
import { useSound } from '../../context/SoundContext';

/**
 * Componente de animación de recompensas premium
 * Muestra confetti, partículas, y contadores animados
 */
const RewardAnimation = ({ 
  show, 
  type = 'xp', // 'xp' | 'coins' | 'achievement' | 'levelUp' | 'mission' | 'world'
  value = 0,
  onComplete,
  duration = 3000,
}) => {
  const { effectsConfig, shouldUseLightEffects } = useDeviceCapabilities();
  const { sounds } = useSound();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!show) {
      setDisplayValue(0);
      return;
    }

    // Reproducir sonido según tipo
    switch (type) {
      case 'xp':
        sounds.xpGain();
        break;
      case 'coins':
        sounds.coins();
        break;
      case 'achievement':
        sounds.achievement();
        break;
      case 'levelUp':
        sounds.levelUp();
        break;
      case 'mission':
        sounds.missionComplete();
        break;
      case 'world':
        sounds.worldUnlock();
        break;
      default:
        sounds.success();
    }

    // Animación de confetti
    if (effectsConfig.confetti.enabled) {
      const particleCount = effectsConfig.confetti.particleCount;
      
      switch (type) {
        case 'levelUp':
        case 'world': {
          // Gran celebración
          const end = Date.now() + 2000;
          const frame = () => {
            confetti({
              particleCount: Math.floor(particleCount / 10),
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#ffd700', '#ff6b6b', '#00d2ff', '#9d50bb'],
            });
            confetti({
              particleCount: Math.floor(particleCount / 10),
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#ffd700', '#ff6b6b', '#00d2ff', '#9d50bb'],
            });
            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          };
          frame();
          break;
        }
          
        case 'achievement':
          confetti({
            particleCount: particleCount,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ffb800', '#ff8c00'],
          });
          break;
          
        case 'coins':
          // Lluvia de monedas doradas
          confetti({
            particleCount: Math.floor(particleCount / 2),
            spread: 60,
            origin: { y: 0.3 },
            colors: ['#ffd700', '#ffb800', '#daa520'],
            shapes: ['circle'],
            gravity: 1.5,
          });
          break;
          
        case 'xp':
        case 'mission':
        default:
          confetti({
            particleCount: Math.floor(particleCount / 2),
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00d2ff', '#9d50bb', '#00ff88'],
          });
      }
    }

    // Animación del contador
    const incrementDuration = Math.min(1500, duration - 500);
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, Math.round(increment * step));
      setDisplayValue(current);
      
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, incrementDuration / steps);

    // Llamar onComplete después de la duración
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [show, type, value, duration, effectsConfig, sounds, onComplete]);

  const getIcon = () => {
    switch (type) {
      case 'xp': return '⚡';
      case 'coins': return '💰';
      case 'achievement': return '🏆';
      case 'levelUp': return '🆙';
      case 'mission': return '✅';
      case 'world': return '🌍';
      default: return '✨';
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'xp': return 'XP';
      case 'coins': return 'Monedas';
      case 'achievement': return 'Logro';
      case 'levelUp': return 'Nivel';
      case 'mission': return 'Misión';
      case 'world': return 'Mundo';
      default: return 'Recompensa';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'xp': return '#00d2ff';
      case 'coins': return '#ffd700';
      case 'achievement': return '#ffb800';
      case 'levelUp': return '#9d50bb';
      case 'mission': return '#00ff88';
      case 'world': return '#ff6b6b';
      default: return '#00d2ff';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="reward-animation-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            className="reward-content"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [180, 0, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: shouldUseLightEffects ? 0.4 : 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '2rem 3rem',
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '20px',
              border: `2px solid ${getColor()}`,
              boxShadow: `0 0 40px ${getColor()}40, inset 0 0 20px ${getColor()}20`,
            }}
          >
            {/* Icono animado */}
            <motion.span
              style={{ fontSize: '4rem' }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 0.5,
                repeat: 2,
                repeatType: 'reverse',
              }}
            >
              {getIcon()}
            </motion.span>

            {/* Valor animado */}
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: getColor(),
                fontWeight: 'bold',
              }}
            >
              <motion.span
                style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)' }}
                key={displayValue}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                +{displayValue.toLocaleString()}
              </motion.span>
              <span style={{ fontSize: '1.5rem', opacity: 0.8 }}>{getLabel()}</span>
            </motion.div>

            {/* Partículas flotantes */}
            {!shouldUseLightEffects && (
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0, 
                      y: 0,
                      x: `${50 + (Math.random() - 0.5) * 100}%`,
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [0, -100],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '20%',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: getColor(),
                      boxShadow: `0 0 10px ${getColor()}`,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Componente de XP flotante que sube desde un punto
 */
export const FloatingXP = ({ show, value, position = { x: '50%', y: '50%' }, onComplete }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 0, 
            scale: 0.5,
            x: '-50%',
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [0, -80],
            scale: [0.5, 1.2, 1, 0.8],
          }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            zIndex: 9999,
            pointerEvents: 'none',
            color: '#00d2ff',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textShadow: '0 0 10px rgba(0, 210, 255, 0.8)',
          }}
        >
          +{value} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Componente de monedas flotantes
 */
export const FloatingCoins = ({ show, value, position = { x: '50%', y: '50%' }, onComplete }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 0, 
            scale: 0.5,
            x: '-50%',
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [0, -80],
            scale: [0.5, 1.2, 1, 0.8],
          }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            zIndex: 9999,
            pointerEvents: 'none',
            color: '#ffd700',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
          }}
        >
          +{value} 💰
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardAnimation;
