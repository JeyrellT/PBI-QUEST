import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ToastContext = createContext({
    showToast: (message, type, options) => console.log('Toast:', message, type, options)
});

export const useToast = () => useContext(ToastContext);

// Mapeo de tipos a imágenes predeterminadas
const DEFAULT_IMAGES = {
    success: '/images/ui/toast-success.png',
    error: '/images/ui/toast-error.png',
    info: '/images/ui/toast-info.png',
    levelup: '/images/ui/toast-levelup.png',
    streak: '/images/ui/toast-streak.png',
    achievement: '/images/ui/toast-achievement.png'
};

const DEFAULT_TITLES = {
    success: '¡Éxito!',
    error: 'Error',
    info: 'Información',
    levelup: '¡Nivel Completado!',
    streak: '¡Racha en Fuego!',
    achievement: 'Logro Desbloqueado'
};

const TOAST_COLORS = {
    success: 'border-green-500 shadow-green-500/20',
    error: 'border-red-500 shadow-red-500/20',
    info: 'border-blue-500 shadow-blue-500/20',
    levelup: 'border-yellow-400 shadow-yellow-400/30',
    streak: 'border-orange-500 shadow-orange-500/30',
    achievement: 'border-purple-500 shadow-purple-500/30'
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', options = {}) => {
        const id = Date.now();
        // Options puede incluir: title, image, duration
        const duration = options.duration || 4000;

        setToasts(prev => [...prev, { id, message, type, ...options }]);

        // Auto remove
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container" style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                pointerEvents: 'none',
                alignItems: 'flex-end'
            }}>
                <AnimatePresence>
                    {toasts.map(toast => {
                        const image = toast.image || DEFAULT_IMAGES[toast.type] || DEFAULT_IMAGES.info;
                        const title = toast.title || DEFAULT_TITLES[toast.type] || 'Notificación';
                        const glowClass = TOAST_COLORS[toast.type] || TOAST_COLORS.info;

                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                layout
                                className={`premium-toast ${glowClass}`}
                                style={{
                                    background: 'rgba(15, 23, 42, 0.95)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    color: 'white',
                                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                                    pointerEvents: 'auto',
                                    width: '380px',
                                    minHeight: '80px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Efecto de brillo de fondo */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                                    pointerEvents: 'none'
                                }} />

                                {/* Imagen Premium */}
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    flexShrink: 0,
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: 'rgba(0,0,0,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                                }}>
                                    <img
                                        src={image}
                                        alt="icon"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>

                                {/* Contenido */}
                                <div style={{ flex: 1, zIndex: 1 }}>
                                    <h4 style={{
                                        margin: '0 0 4px 0',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                    }}>
                                        {title}
                                    </h4>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '0.9rem',
                                        color: '#cbd5e1',
                                        lineHeight: '1.4'
                                    }}>
                                        {toast.message}
                                    </p>
                                </div>

                                {/* Botón cerrar */}
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#94a3b8',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.2)'; e.target.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.color = '#94a3b8'; }}
                                >
                                    <X size={14} />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
