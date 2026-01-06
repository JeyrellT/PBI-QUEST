import './HapticFeedback.css';

/**
 * Sistema de Haptic Feedback - Engine y Hook
 * Separado para Fast Refresh
 */

class HapticEngine {
  constructor() {
    this.isSupported = 'vibrate' in navigator;
    this.isEnabled = true;
  }

  // Patrones de vibración predefinidos
  patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
    success: [10, 50, 10],
    error: [20, 100, 20],
    warning: [15, 80, 15],
    selection: [5],
    impact: [15],
    notification: [10, 30, 10, 30, 10],
    double: [10, 50, 10],
    triple: [10, 30, 10, 30, 10],
    heartbeat: [15, 30, 15, 300, 15, 30, 15],
    pattern: [10, 20, 30, 20, 10]
  };

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  vibrate(pattern = 'light') {
    if (!this.isSupported || !this.isEnabled) return;

    const vibrationPattern = typeof pattern === 'string' 
      ? this.patterns[pattern] 
      : pattern;

    if (vibrationPattern) {
      try {
        navigator.vibrate(vibrationPattern);
      } catch (error) {
        console.warn('Vibration failed:', error);
      }
    }
  }

  // Métodos de conveniencia
  light() { this.vibrate('light'); }
  medium() { this.vibrate('medium'); }
  heavy() { this.vibrate('heavy'); }
  success() { this.vibrate('success'); }
  error() { this.vibrate('error'); }
  warning() { this.vibrate('warning'); }
  selection() { this.vibrate('selection'); }
  impact() { this.vibrate('impact'); }
  notification() { this.vibrate('notification'); }
}

// Instancia singleton
export const haptic = new HapticEngine();

/**
 * Hook para usar haptic feedback
 */
export const useHaptic = () => {
  return {
    vibrate: (pattern) => haptic.vibrate(pattern),
    light: () => haptic.light(),
    medium: () => haptic.medium(),
    heavy: () => haptic.heavy(),
    success: () => haptic.success(),
    error: () => haptic.error(),
    warning: () => haptic.warning(),
    selection: () => haptic.selection(),
    impact: () => haptic.impact(),
    notification: () => haptic.notification(),
    enable: () => haptic.enable(),
    disable: () => haptic.disable(),
    toggle: () => haptic.toggle(),
    isSupported: haptic.isSupported
  };
};
