import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CHARACTER_MENTORS } from '../../data/worlds';

/**
 * MicroVictoryToast - Sistema de retroalimentación instantánea
 * 
 * Fundamentos de Neurociencia:
 * - Sistema de Recompensa (Dopamina): Liberación con anticipación y logro
 * - Feedback Loop: Retroalimentación cada 20-30 segundos máximo
 * - Emociones + Memoria: Las emociones positivas mejoran la consolidación
 * 
 * @param {Object} props
 * @param {Object} props.victory - Objeto de victoria a mostrar
 * @param {Function} props.onComplete - Callback cuando termina la animación
 */
const MicroVictoryToast = ({ victory, onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (victory?.confetti) {
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.8 },
                colors: ['#00d2ff', '#ffd700', '#22c55e']
            });
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 300);
        }, victory?.duration || 2000);

        return () => clearTimeout(timer);
    }, [victory, onComplete]);

    const character = victory?.character ? CHARACTER_MENTORS[victory.character] : null;

    const getAnimationVariants = () => {
        switch (victory?.animation) {
            case 'bounce':
                return {
                    initial: { scale: 0, y: 50 },
                    animate: { scale: 1, y: 0 },
                    exit: { scale: 0, y: -20 }
                };
            case 'sparkle':
                return {
                    initial: { scale: 0, rotate: -10 },
                    animate: { scale: 1, rotate: 0 },
                    exit: { scale: 0, opacity: 0 }
                };
            case 'glow-gold':
                return {
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 1.1, opacity: 0 }
                };
            case 'pop':
                return {
                    initial: { scale: 0.5, opacity: 0 },
                    animate: { scale: [0.5, 1.1, 1], opacity: 1 },
                    exit: { scale: 0, opacity: 0 }
                };
            case 'slide-up':
            default:
                return {
                    initial: { y: 100, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    exit: { y: -50, opacity: 0 }
                };
        }
    };

    const variants = getAnimationVariants();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="micro-victory-toast-content"
                    initial={variants.initial}
                    animate={variants.animate}
                    exit={variants.exit}
                    transition={{ type: 'spring', duration: 0.4 }}
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {/* Toast principal */}
                    <motion.div
                        style={{
                            background: victory?.animation === 'glow-gold' 
                                ? 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.2) 100%)'
                                : 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(16,185,129,0.2) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: victory?.animation === 'glow-gold'
                                ? '1px solid rgba(255,215,0,0.4)'
                                : '1px solid rgba(34,197,94,0.4)',
                            borderRadius: '16px',
                            padding: '16px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: victory?.animation === 'glow-gold'
                                ? '0 0 30px rgba(255,215,0,0.3)'
                                : '0 0 20px rgba(34,197,94,0.3)'
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>
                            {victory?.message?.match(/^[^\s]+/)?.[0] || '✨'}
                        </span>
                        <div>
                            <p style={{ 
                                color: 'white', 
                                margin: 0, 
                                fontWeight: '600',
                                fontSize: '16px'
                            }}>
                                {victory?.message?.replace(/^[^\s]+\s/, '') || 'Victoria'}
                            </p>
                            {victory?.xp > 0 && (
                                <p style={{ 
                                    color: '#ffd700', 
                                    margin: '4px 0 0 0',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    +{victory.xp} XP
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* Quote del personaje (si aplica) */}
                    {character && victory?.quote && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                background: 'rgba(0,0,0,0.7)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                maxWidth: '320px'
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: character.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                flexShrink: 0
                            }}>
                                {character.name.charAt(0)}
                            </div>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                margin: 0,
                                fontSize: '13px',
                                fontStyle: 'italic',
                                lineHeight: '1.4'
                            }}>
                                {victory.quote}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MicroVictoryToast;
