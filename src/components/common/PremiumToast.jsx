import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './PremiumToast.css';

/**
 * Sistema de notificaciones premium con glassmorphism y animaciones fluidas
 */

const TOAST_VARIANTS = {
  success: {
    icon: '✓',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#00f2fe'
  },
  error: {
    icon: '✕',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f5576c'
  },
  warning: {
    icon: '⚠',
    gradient: 'linear-gradient(135deg, #ffd89b 0%, #ff9a56 100%)',
    color: '#ff9a56'
  },
  info: {
    icon: 'ℹ',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#764ba2'
  },
  premium: {
    icon: '★',
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    color: '#ffd700'
  }
};

export const PremiumToast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose,
  position = 'top-right' // 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const variant = TOAST_VARIANTS[type] || TOAST_VARIANTS.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300);
    }, duration);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (duration / 50));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  const positionClasses = {
    'top-right': 'toast-position-top-right',
    'top-center': 'toast-position-top-center',
    'bottom-right': 'toast-position-bottom-right',
    'bottom-center': 'toast-position-bottom-center'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`premium-toast ${positionClasses[position]}`}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 300 
          }}
          style={{
            '--toast-color': variant.color,
            '--toast-gradient': variant.gradient
          }}
        >
          {/* Icono con animación */}
          <motion.div 
            className="toast-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.1,
              type: 'spring',
              damping: 12,
              stiffness: 200
            }}
          >
            {variant.icon}
          </motion.div>

          {/* Contenido */}
          <div className="toast-content">
            <p className="toast-message">{message}</p>
          </div>

          {/* Botón de cierre */}
          <button 
            className="toast-close"
            onClick={() => {
              setIsVisible(false);
              if (onClose) setTimeout(onClose, 300);
            }}
            aria-label="Cerrar notificación"
          >
            ×
          </button>

          {/* Barra de progreso */}
          <div className="toast-progress-track">
            <motion.div 
              className="toast-progress-bar"
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Contenedor de toasts apilables
 */
export const ToastContainer = ({ toasts = [], removeToast }) => {
  return (
    <div className="toast-container">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ 
              layout: { type: 'spring', damping: 25, stiffness: 300 }
            }}
            style={{ marginBottom: index < toasts.length - 1 ? '12px' : '0' }}
          >
            <PremiumToast
              {...toast}
              onClose={() => removeToast(toast.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PremiumToast;
