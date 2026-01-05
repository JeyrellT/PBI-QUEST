import { useState, useEffect, useMemo } from 'react';

/**
 * Hook para detectar capacidades del dispositivo y optimizar efectos premium
 * Versión ligera para móvil, versión completa para escritorio
 */
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowEnd: false,
    prefersReducedMotion: false,
    hasTouch: false,
    devicePixelRatio: 1,
    connectionSpeed: 'fast',
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      // Detectar dispositivos de bajo rendimiento
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = navigator.deviceMemory || 4; // GB
      const isLowEnd = hardwareConcurrency <= 2 || deviceMemory <= 2;
      
      // Preferencias de movimiento reducido
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Detectar touch
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Ratio de píxeles
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Velocidad de conexión
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      let connectionSpeed = 'fast';
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          connectionSpeed = 'slow';
        } else if (effectiveType === '3g') {
          connectionSpeed = 'medium';
        }
      }

      setCapabilities({
        isMobile,
        isTablet,
        isDesktop,
        isLowEnd,
        prefersReducedMotion,
        hasTouch,
        devicePixelRatio,
        connectionSpeed,
      });
    };

    checkCapabilities();
    
    const handleResize = () => {
      checkCapabilities();
    };

    window.addEventListener('resize', handleResize);
    
    // Listener para cambios en preferencia de movimiento
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkCapabilities);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', checkCapabilities);
    };
  }, []);

  // Configuración de efectos basada en capacidades
  const effectsConfig = useMemo(() => {
    const { isMobile, isTablet, isLowEnd, prefersReducedMotion, connectionSpeed } = capabilities;
    
    // Versión ligera: móvil, tablet, bajo rendimiento, o conexión lenta
    const useLightVersion = isMobile || isTablet || isLowEnd || prefersReducedMotion || connectionSpeed === 'slow';
    
    return {
      // Partículas
      particles: {
        enabled: !prefersReducedMotion,
        count: useLightVersion ? 15 : 80,
        speed: useLightVersion ? 0.5 : 1,
        interactivity: !useLightVersion,
      },
      
      // Animaciones
      animations: {
        enabled: !prefersReducedMotion,
        duration: useLightVersion ? 0.3 : 0.6,
        stagger: useLightVersion ? 0.05 : 0.1,
        spring: useLightVersion ? { stiffness: 300, damping: 30 } : { stiffness: 200, damping: 20 },
      },
      
      // Efectos de blur/glass
      blur: {
        enabled: !isLowEnd,
        amount: useLightVersion ? '10px' : '20px',
      },
      
      // Sombras
      shadows: {
        enabled: true,
        intensity: useLightVersion ? 'light' : 'full',
      },
      
      // Parallax
      parallax: {
        enabled: !useLightVersion && !prefersReducedMotion,
        intensity: 0.5,
      },
      
      // Sonidos
      sounds: {
        enabled: true, // Los sonidos no afectan rendimiento
        volume: 0.3,
      },
      
      // Aurora/Gradientes animados
      aurora: {
        enabled: !useLightVersion,
        complexity: useLightVersion ? 'simple' : 'full',
      },
      
      // Efectos 3D
      effects3D: {
        enabled: !useLightVersion && !prefersReducedMotion,
        perspective: 1000,
      },
      
      // Confetti
      confetti: {
        enabled: !prefersReducedMotion,
        particleCount: useLightVersion ? 30 : 100,
      },
    };
  }, [capabilities]);

  return {
    ...capabilities,
    effectsConfig,
    // Helpers
    shouldUseLightEffects: capabilities.isMobile || capabilities.isTablet || capabilities.isLowEnd,
    canUseHeavyEffects: capabilities.isDesktop && !capabilities.isLowEnd && !capabilities.prefersReducedMotion,
  };
};

export default useDeviceCapabilities;
