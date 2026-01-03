import { useState, useEffect } from 'react';

/**
 * Hook para detectar el tipo de dispositivo y tamaño de pantalla
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize({
        width,
        height: window.innerHeight,
      });
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Ejecutar inmediatamente
    handleResize();

    // Listener con debounce para mejor rendimiento
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    // Breakpoints útiles
    isSmallMobile: windowSize.width < 480,
    isMediumScreen: windowSize.width >= 768 && windowSize.width < 1200,
    isLargeScreen: windowSize.width >= 1200,
  };
};

export default useResponsive;
