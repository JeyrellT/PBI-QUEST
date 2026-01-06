/**
 * Configuraciones de transiciones de página
 * Separadas en archivo independiente para Fast Refresh
 */

// Variantes de animación para diferentes estilos de transición
export const pageVariants = {
  // Fade clásico
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },

  // Slide desde la derecha
  slideRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  },

  // Slide desde la izquierda
  slideLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 }
  },

  // Slide desde abajo
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 }
  },

  // Scale desde el centro
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },

  // Rotación 3D
  rotate3D: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 }
  },

  // Blur + Zoom
  blurZoom: {
    initial: { scale: 1.1, filter: 'blur(20px)', opacity: 0 },
    animate: { scale: 1, filter: 'blur(0px)', opacity: 1 },
    exit: { scale: 0.9, filter: 'blur(20px)', opacity: 0 }
  },

  // Premium (combinación de efectos)
  premium: {
    initial: { 
      y: 40, 
      scale: 0.95, 
      opacity: 0,
      filter: 'blur(10px)'
    },
    animate: { 
      y: 0, 
      scale: 1, 
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: { 
      y: -40, 
      scale: 0.95, 
      opacity: 0,
      filter: 'blur(10px)'
    }
  }
};

// Configuraciones de timing
export const pageTransition = {
  default: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.4
  },
  spring: {
    type: 'spring',
    damping: 25,
    stiffness: 300
  },
  smooth: {
    type: 'tween',
    ease: [0.4, 0, 0.2, 1],
    duration: 0.5
  },
  premium: {
    type: 'spring',
    damping: 30,
    stiffness: 250,
    mass: 1
  }
};
