import React, { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Lightbulb, Sparkles } from 'lucide-react';

/**
 * Tooltip Component - Tooltips informativos con animación
 */
export const Tooltip = ({ children, content, position = 'top', delay = 300 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef(null);

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = () => {
        clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    const positions = {
        top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
        bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
        left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
        right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' }
    };

    return (
        <div 
            style={{ position: 'relative', display: 'inline-flex' }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: 'absolute',
                            ...positions[position],
                            background: 'rgba(15, 15, 25, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                            zIndex: 1000,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                            pointerEvents: 'none'
                        }}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * HelpBubble - Burbuja de ayuda contextual
 */
export const HelpBubble = ({ text, type = 'info' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const colors = {
        info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', icon: HelpCircle },
        tip: { bg: 'rgba(250, 204, 21, 0.1)', border: '#facc15', icon: Lightbulb },
        magic: { bg: 'rgba(168, 85, 247, 0.1)', border: '#a855f7', icon: Sparkles }
    };

    const config = colors[type];
    const Icon = config.icon;

    return (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0
                }}
            >
                <Icon size={14} color={config.border} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            marginTop: '8px',
                            background: 'rgba(15, 15, 25, 0.98)',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${config.border}`,
                            borderRadius: '12px',
                            padding: '12px 16px',
                            fontSize: '0.85rem',
                            color: 'var(--text-primary)',
                            width: '250px',
                            zIndex: 1000,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                        }}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0
                            }}
                        >
                            <X size={14} color="var(--text-muted)" />
                        </button>
                        <p style={{ margin: 0, lineHeight: 1.5 }}>{text}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * ProgressIndicator - Indicador de progreso con etapas
 */
export const ProgressIndicator = ({ steps, currentStep, color = 'var(--primary)' }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <motion.div
                        initial={false}
                        animate={{
                            backgroundColor: index <= currentStep ? color : 'var(--border)',
                            scale: index === currentStep ? 1.2 : 1
                        }}
                        style={{
                            width: index === currentStep ? '12px' : '8px',
                            height: index === currentStep ? '12px' : '8px',
                            borderRadius: '50%',
                            transition: 'all 0.3s ease'
                        }}
                        title={step.label}
                    />
                    {index < steps.length - 1 && (
                        <motion.div
                            initial={false}
                            animate={{
                                backgroundColor: index < currentStep ? color : 'var(--border)'
                            }}
                            style={{
                                flex: 1,
                                height: '2px',
                                borderRadius: '1px'
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

/**
 * PulseButton - Botón con efecto de pulso para llamar atención
 */
export const PulseButton = ({ children, onClick, color = 'var(--primary)', pulse = true, ...props }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                position: 'relative',
                background: color,
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                overflow: 'visible',
                ...props.style
            }}
            {...props}
        >
            {pulse && (
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '12px',
                        border: `2px solid ${color}`,
                        pointerEvents: 'none'
                    }}
                />
            )}
            {children}
        </motion.button>
    );
};

/**
 * FloatingAction - Botón de acción flotante
 */
// eslint-disable-next-line no-unused-vars
export const FloatingAction = ({ icon: IconComponent, onClick, label, color = 'var(--primary)' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                width: isHovered ? 'auto' : '56px',
                height: '56px',
                borderRadius: isHovered ? '28px' : '50%',
                background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: isHovered ? '0 20px' : '0',
                cursor: 'pointer',
                boxShadow: `0 4px 20px ${color}40`,
                zIndex: 900,
                transition: 'all 0.3s ease'
            }}
        >
            <IconComponent size={24} color="white" />
            <AnimatePresence>
                {isHovered && label && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        style={{ color: 'white', fontWeight: 600, whiteSpace: 'nowrap' }}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

/**
 * ConfettiButton - Botón que dispara confetti al hacer click
 */
export const ConfettiButton = ({ children, onClick, ...props }) => {
    const handleClick = async (e) => {
        const confetti = (await import('canvas-confetti')).default;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { x, y },
            colors: ['#00d2ff', '#9d50bb', '#ffb800', '#4ade80']
        });

        if (onClick) onClick(e);
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default {
    Tooltip,
    HelpBubble,
    ProgressIndicator,
    PulseButton,
    FloatingAction,
    ConfettiButton
};
