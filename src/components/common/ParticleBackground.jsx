import React, { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';

/**
 * Fondo de partículas interactivas premium
 * Se adapta automáticamente según las capacidades del dispositivo
 */
const ParticleBackground = ({ 
  variant = 'default', // 'default' | 'aurora' | 'stars' | 'magic' | 'celebration'
  intensity = 1,
  interactive = true,
  className = '',
}) => {
  const { effectsConfig, shouldUseLightEffects } = useDeviceCapabilities();
  
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Configuraciones de partículas según variante
  const getParticleConfig = useMemo(() => {
    const baseCount = effectsConfig.particles.count * intensity;
    const speed = effectsConfig.particles.speed;
    const enableInteractivity = interactive && effectsConfig.particles.interactivity;

    const configs = {
      default: {
        particles: {
          number: { value: baseCount, density: { enable: true, area: 800 } },
          color: { value: ['#00d2ff', '#9d50bb', '#ffb800', '#ff6b6b'] },
          shape: { type: 'circle' },
          opacity: { 
            value: { min: 0.1, max: 0.5 },
            animation: { enable: true, speed: 0.5, minimumValue: 0.1 }
          },
          size: { 
            value: { min: 1, max: 4 },
            animation: { enable: true, speed: 2, minimumValue: 0.5 }
          },
          move: {
            enable: true,
            speed: speed * 0.8,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          links: {
            enable: !shouldUseLightEffects,
            distance: 120,
            color: '#00d2ff',
            opacity: 0.15,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: enableInteractivity, mode: 'grab' },
            onClick: { enable: enableInteractivity, mode: 'push' },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.4 } },
            push: { quantity: 4 },
          },
        },
      },

      aurora: {
        particles: {
          number: { value: baseCount * 0.5, density: { enable: true, area: 1000 } },
          color: { 
            value: ['#00d2ff', '#9d50bb', '#00ff88', '#ff6b6b'],
            animation: { enable: true, speed: 10, sync: false }
          },
          shape: { type: 'circle' },
          opacity: { 
            value: { min: 0.05, max: 0.3 },
            animation: { enable: true, speed: 0.3, minimumValue: 0.05 }
          },
          size: { 
            value: { min: 20, max: 80 },
            animation: { enable: true, speed: 3, minimumValue: 10 }
          },
          move: {
            enable: true,
            speed: speed * 0.3,
            direction: 'top',
            random: true,
            straight: false,
            outModes: { default: 'out' },
            drift: 2,
          },
          blur: { enable: true, value: 20 },
        },
        interactivity: {
          events: {
            onHover: { enable: enableInteractivity, mode: 'bubble' },
          },
          modes: {
            bubble: { distance: 200, size: 100, opacity: 0.4 },
          },
        },
      },

      stars: {
        particles: {
          number: { value: baseCount * 1.5, density: { enable: true, area: 800 } },
          color: { value: ['#ffffff', '#fffacd', '#87ceeb'] },
          shape: { type: 'star', options: { star: { sides: 5 } } },
          opacity: { 
            value: { min: 0.2, max: 1 },
            animation: { enable: true, speed: 1, minimumValue: 0.2 }
          },
          size: { 
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 1, minimumValue: 0.5 }
          },
          move: {
            enable: true,
            speed: speed * 0.2,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          twinkle: {
            particles: { enable: true, frequency: 0.05, opacity: 1 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: enableInteractivity, mode: 'repulse' },
          },
          modes: {
            repulse: { distance: 100, speed: 0.5 },
          },
        },
      },

      magic: {
        particles: {
          number: { value: baseCount * 0.7, density: { enable: true, area: 800 } },
          color: { 
            value: ['#ffd700', '#ff6b6b', '#9d50bb', '#00d2ff'],
            animation: { enable: true, speed: 20, sync: false }
          },
          shape: { type: ['circle', 'triangle'] },
          opacity: { 
            value: { min: 0.3, max: 0.8 },
            animation: { enable: true, speed: 1, minimumValue: 0.1 }
          },
          size: { 
            value: { min: 2, max: 6 },
            animation: { enable: true, speed: 3, minimumValue: 1 }
          },
          move: {
            enable: true,
            speed: speed * 1.5,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
            trail: {
              enable: !shouldUseLightEffects,
              length: 10,
              fillColor: 'rgba(0,0,0,0.1)',
            },
          },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 5 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: enableInteractivity, mode: 'attract' },
            onClick: { enable: enableInteractivity, mode: 'push' },
          },
          modes: {
            attract: { distance: 150, speed: 1 },
            push: { quantity: 8 },
          },
        },
      },

      celebration: {
        particles: {
          number: { value: baseCount * 2, density: { enable: true, area: 600 } },
          color: { value: ['#ffd700', '#ff6b6b', '#00ff88', '#00d2ff', '#9d50bb', '#ff69b4'] },
          shape: { type: ['circle', 'square', 'triangle'] },
          opacity: { 
            value: { min: 0.5, max: 1 },
            animation: { enable: true, speed: 2, minimumValue: 0.3 }
          },
          size: { 
            value: { min: 3, max: 8 },
            animation: { enable: true, speed: 5, minimumValue: 2 }
          },
          move: {
            enable: true,
            speed: speed * 3,
            direction: 'bottom',
            random: true,
            straight: false,
            outModes: { default: 'out' },
            gravity: { enable: true, acceleration: 2 },
          },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 10 },
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 10,
          },
        },
        interactivity: {
          events: {
            onClick: { enable: enableInteractivity, mode: 'push' },
          },
          modes: {
            push: { quantity: 20 },
          },
        },
      },
    };

    return configs[variant] || configs.default;
  }, [variant, intensity, interactive, effectsConfig, shouldUseLightEffects]);

  // No renderizar si las partículas están deshabilitadas
  if (!effectsConfig.particles.enabled) {
    return null;
  }

  return (
    <Particles
      className={`particles-container ${className}`}
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: shouldUseLightEffects ? 30 : 60,
        detectRetina: true,
        ...getParticleConfig,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleBackground;
