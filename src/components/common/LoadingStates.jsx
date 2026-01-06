import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './LoadingStates.css';

/**
 * Estados de carga premium y elegantes
 */

/**
 * Spinner premium con gradiente
 */
export const PremiumSpinner = ({ 
  size = 40, 
  color = 'primary',
  className = '' 
}) => {
  const colors = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gold: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    custom: color
  };

  return (
    <div className={`premium-spinner ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="premium-spinner-circle"
        style={{ background: colors[color] || colors.primary }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="premium-spinner-glow" />
    </div>
  );
};

/**
 * Puntos de carga animados
 */
export const LoadingDots = ({ 
  size = 'medium',
  color = '#00d2ff',
  className = '' 
}) => {
  const sizes = {
    small: 6,
    medium: 10,
    large: 14
  };

  const dotSize = sizes[size] || sizes.medium;

  return (
    <div className={`loading-dots ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="loading-dot"
          style={{ 
            width: dotSize, 
            height: dotSize,
            background: color
          }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1
          }}
        />
      ))}
    </div>
  );
};

/**
 * Barra de progreso premium
 */
export const PremiumProgressBar = ({ 
  progress = 0, // 0-100
  showPercentage = true,
  height = 8,
  animated = true,
  className = '' 
}) => {
  return (
    <div className={`premium-progress-bar ${className}`}>
      {showPercentage && (
        <div className="premium-progress-label">
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div 
        className="premium-progress-track" 
        style={{ height: `${height}px` }}
      >
        <motion.div
          className={`premium-progress-fill ${animated ? 'animated' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}
        />
      </div>
    </div>
  );
};

/**
 * Círculo de progreso premium
 */
export const CircularProgress = ({ 
  progress = 0, // 0-100
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
  className = '' 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`circular-progress ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          className="circular-progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          className="circular-progress-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200
          }}
        />
      </svg>
      {showPercentage && (
        <div className="circular-progress-text">
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
};

/**
 * Skeleton loader premium
 */
export const SkeletonLoader = ({ 
  variant = 'text', // 'text' | 'card' | 'avatar' | 'custom'
  width = '100%',
  height = 20,
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return (
          <div className="skeleton-text" style={{ width, height }}>
            <div className="skeleton-shimmer" />
          </div>
        );
      
      case 'avatar':
        return (
          <div className="skeleton-avatar" style={{ width: height, height }}>
            <div className="skeleton-shimmer" />
          </div>
        );
      
      case 'card':
        return (
          <div className="skeleton-card" style={{ width, height }}>
            <div className="skeleton-card-header">
              <div className="skeleton-avatar" />
              <div className="skeleton-text-group">
                <div className="skeleton-text" />
                <div className="skeleton-text" />
              </div>
            </div>
            <div className="skeleton-card-content">
              <div className="skeleton-text" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
            </div>
            <div className="skeleton-shimmer" />
          </div>
        );
      
      default:
        return (
          <div className="skeleton-custom" style={{ width, height }}>
            <div className="skeleton-shimmer" />
          </div>
        );
    }
  };

  return (
    <div className={`skeleton-loader ${className}`}>
      {[...Array(count)].map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * Pulse loader (para botones)
 */
export const PulseLoader = ({ 
  size = 20,
  color = '#00d2ff',
  className = '' 
}) => {
  return (
    <div className={`pulse-loader ${className}`}>
      <motion.div
        className="pulse-loader-circle"
        style={{ 
          width: size, 
          height: size,
          background: color
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

/**
 * Pantalla de carga completa premium
 */
export const FullScreenLoader = ({ 
  message = 'Cargando...',
  showLogo = true,
  className = ''
}) => {
  return (
    <motion.div
      className={`fullscreen-loader ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fullscreen-loader-content">
        {showLogo && (
          <motion.div
            className="fullscreen-loader-logo"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <div className="logo-placeholder">PBI</div>
          </motion.div>
        )}
        <PremiumSpinner size={60} />
        {message && (
          <motion.p
            className="fullscreen-loader-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.p>
        )}
      </div>
      <div className="fullscreen-loader-background" />
    </motion.div>
  );
};

/**
 * Shimmer effect para imágenes cargando
 */
export const ImageLoader = ({ 
  width = '100%',
  height = 200,
  className = ''
}) => {
  return (
    <div className={`image-loader ${className}`} style={{ width, height }}>
      <div className="image-loader-placeholder">
        <div className="skeleton-shimmer" />
      </div>
    </div>
  );
};

/**
 * Loading overlay para secciones
 */
export const LoadingOverlay = ({ 
  show = true,
  message = '',
  blur = true,
  className = ''
}) => {
  if (!show) return null;

  return (
    <motion.div
      className={`loading-overlay ${blur ? 'blur' : ''} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-overlay-content">
        <PremiumSpinner size={50} />
        {message && <p>{message}</p>}
      </div>
    </motion.div>
  );
};

/**
 * Typing indicator (estilo chat)
 */
export const TypingIndicator = ({ className = '' }) => {
  return (
    <div className={`typing-indicator ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="typing-dot"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15
          }}
        />
      ))}
    </div>
  );
};

export default PremiumSpinner;
