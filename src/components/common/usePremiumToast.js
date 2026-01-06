import { useState } from 'react';

/**
 * Hook para usar toasts premium
 * Separado en archivo independiente para Fast Refresh
 */
export const usePremiumToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ message, type = 'info', duration = 3000, position = 'top-right' }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration, position };
    
    setToasts(prev => [...prev, newToast]);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message, options = {}) => 
    addToast({ message, type: 'success', ...options });
  
  const error = (message, options = {}) => 
    addToast({ message, type: 'error', ...options });
  
  const warning = (message, options = {}) => 
    addToast({ message, type: 'warning', ...options });
  
  const info = (message, options = {}) => 
    addToast({ message, type: 'info', ...options });
  
  const premium = (message, options = {}) => 
    addToast({ message, type: 'premium', ...options });

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    premium
  };
};
