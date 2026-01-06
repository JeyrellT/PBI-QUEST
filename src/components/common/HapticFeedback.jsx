import React from 'react';
import { haptic } from './hapticEngine';
import './HapticFeedback.css';

/**
 * Componente wrapper que añade haptic feedback a elementos
 */
export const HapticWrapper = ({ 
  children, 
  pattern = 'light',
  trigger = 'click', // 'click' | 'hover' | 'focus'
  disabled = false,
  className = ''
}) => {
  const handleInteraction = () => {
    if (!disabled) {
      haptic.vibrate(pattern);
    }
  };

  const handlers = {
    click: { onClick: handleInteraction },
    hover: { onMouseEnter: handleInteraction },
    focus: { onFocus: handleInteraction }
  };

  return (
    <div className={`haptic-wrapper ${className}`} {...handlers[trigger]}>
      {children}
    </div>
  );
};

/**
 * Botón con haptic feedback integrado
 */
export const HapticButton = ({ 
  children, 
  onClick,
  pattern = 'medium',
  className = '',
  variant = 'default', // 'default' | 'premium' | 'glass' | 'gradient'
  disabled = false,
  ...props 
}) => {
  const handleClick = (e) => {
    if (!disabled) {
      haptic.vibrate(pattern);
      if (onClick) onClick(e);
    }
  };

  return (
    <button
      className={`haptic-button haptic-button-${variant} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <span className="haptic-button-content">{children}</span>
      <span className="haptic-button-ripple"></span>
    </button>
  );
};

/**
 * Toggle switch premium con haptic feedback
 */
export const HapticToggle = ({ 
  checked, 
  onChange, 
  label,
  disabled = false,
  className = ''
}) => {
  const handleToggle = () => {
    if (!disabled) {
      haptic.vibrate('selection');
      if (onChange) onChange(!checked);
    }
  };

  return (
    <div className={`haptic-toggle ${className}`}>
      {label && <span className="haptic-toggle-label">{label}</span>}
      <button
        className={`haptic-toggle-button ${checked ? 'checked' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle'}
      >
        <span className="haptic-toggle-track">
          <span className="haptic-toggle-thumb"></span>
        </span>
      </button>
    </div>
  );
};

/**
 * Card interactiva con efectos premium
 */
export const InteractiveCard = ({ 
  children, 
  onClick,
  onHover,
  className = '',
  variant = 'glass', // 'glass' | 'gradient' | 'solid'
  hapticPattern = 'light',
  disabled = false
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      haptic.vibrate(hapticPattern);
      onClick(e);
    }
  };

  const handleMouseEnter = (e) => {
    if (!disabled && onHover) {
      haptic.vibrate('selection');
      onHover(e);
    }
  };

  return (
    <div
      className={`interactive-card interactive-card-${variant} ${className} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      <div className="interactive-card-content">
        {children}
      </div>
      <div className="interactive-card-glow"></div>
    </div>
  );
};

/**
 * Control de volumen/slider premium con haptic
 */
export const HapticSlider = ({ 
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  className = ''
}) => {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    haptic.vibrate('selection');
    if (onChange) onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`haptic-slider ${className}`}>
      {label && <label className="haptic-slider-label">{label}</label>}
      <div className="haptic-slider-track-container">
        <div 
          className="haptic-slider-track-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="haptic-slider-glow"></div>
        </div>
        <input
          type="range"
          className="haptic-slider-input"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          aria-label={label}
        />
        <div 
          className="haptic-slider-thumb"
          style={{ left: `${percentage}%` }}
        >
          <div className="haptic-slider-thumb-inner"></div>
        </div>
      </div>
      {showValue && (
        <span className="haptic-slider-value">{value}</span>
      )}
    </div>
  );
};

/**
 * Componente de control de haptic (para settings)
 */
export const HapticControl = () => {
  const [enabled, setEnabled] = React.useState(haptic.isEnabled);

  const handleToggle = () => {
    const newState = haptic.toggle();
    setEnabled(newState);
    haptic.vibrate('success');
  };

  if (!haptic.isSupported) {
    return null;
  }

  return (
    <div className="haptic-control">
      <div className="haptic-control-info">
        <h4>Vibración Háptica</h4>
        <p>Retroalimentación táctil en interacciones</p>
      </div>
      <HapticToggle
        checked={enabled}
        onChange={handleToggle}
      />
    </div>
  );
};

/**
 * Rating component con haptic feedback
 */
export const HapticRating = ({
  value = 0,
  onChange,
  max = 5,
  icon = '★',
  className = ''
}) => {
  const [hoverValue, setHoverValue] = React.useState(0);

  const handleClick = (rating) => {
    haptic.vibrate('success');
    if (onChange) onChange(rating);
  };

  const handleHover = (rating) => {
    haptic.vibrate('selection');
    setHoverValue(rating);
  };

  return (
    <div 
      className={`haptic-rating ${className}`}
      onMouseLeave={() => setHoverValue(0)}
    >
      {[...Array(max)].map((_, index) => {
        const rating = index + 1;
        const isActive = rating <= (hoverValue || value);
        
        return (
          <button
            key={rating}
            className={`haptic-rating-star ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleHover(rating)}
            aria-label={`Rate ${rating} out of ${max}`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};
