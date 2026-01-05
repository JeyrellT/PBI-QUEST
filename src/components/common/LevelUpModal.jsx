import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, X, Zap, Sparkles, Crown, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from '../../context/SoundContext';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';

// Premium particle component
const FloatingParticle = ({ delay, color }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            y: [50, 0, -100, -200],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30]
        }}
        transition={{ 
            duration: 3,
            delay,
            ease: "easeOut",
            repeat: Infinity
        }}
        style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 10px ${color}`,
            left: `${Math.random() * 100}%`
        }}
    />
);

// Animated ring effect
const PulseRing = ({ delay, size }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ 
            scale: [0.8, 2],
            opacity: [0.6, 0]
        }}
        transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            ease: "easeOut"
        }}
        style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: '2px solid var(--accent-gold)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}
    />
);

const LevelUpModal = ({ show, onClose, level, rewards }) => {
    const [showContent, setShowContent] = useState(false);
    const { sounds } = useSound();
    const { effectsConfig, shouldUseLightEffects } = useDeviceCapabilities();

    useEffect(() => {
        if (show) {
            // Delay content for dramatic effect
            setTimeout(() => setShowContent(true), 300);
            
            // Reproducir sonido de level up
            sounds.levelUp();
            
            // Enhanced confetti burst (adaptado al dispositivo)
            const particleCount = effectsConfig.confetti.particleCount;
            const duration = shouldUseLightEffects ? 2000 : 4000;
            const end = Date.now() + duration;

            // Initial burst
            confetti({
                particleCount: particleCount,
                spread: 70,
                origin: { x: 0.5, y: 0.6 },
                colors: ['#ffd700', '#ffb800', '#00d2ff', '#9d50bb', '#ff6b6b'],
                ticks: 200,
                gravity: 0.8,
                scalar: 1.2
            });

            // Solo animación continua en desktop
            if (!shouldUseLightEffects) {
                const frame = () => {
                    confetti({
                        particleCount: 3,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#00d2ff', '#9d50bb', '#ffb800']
                    });
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#00d2ff', '#9d50bb', '#ffb800']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                };
                frame();
            }
        } else {
            setShowContent(false);
        }
    }, [show]);

    const particles = Array.from({ length: 15 }, (_, i) => ({
        delay: i * 0.2,
        color: ['#ffd700', '#00d2ff', '#9d50bb', '#ff6b6b'][i % 4]
    }));

    return (
        <AnimatePresence>
            {show && (
                <motion.div 
                    className="modal-overlay" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(20px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    {/* Ambient floating particles */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                        {particles.map((p, i) => (
                            <FloatingParticle key={i} delay={p.delay} color={p.color} />
                        ))}
                    </div>

                    {/* Radial glow background */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0.4 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            width: '600px',
                            height: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,184,0,0.3) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                            pointerEvents: 'none'
                        }}
                    />

                    <motion.div
                        className="level-up-card"
                        initial={{ scale: 0.3, opacity: 0, rotateX: 90, y: 100 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotateX: -45, y: -50 }}
                        transition={{ 
                            type: "spring", 
                            damping: 20,
                            stiffness: 100,
                            mass: 0.8
                        }}
                        style={{
                            width: '450px',
                            maxWidth: '90vw',
                            padding: '3.5rem 2.5rem',
                            textAlign: 'center',
                            borderRadius: '32px',
                            border: '2px solid rgba(255, 184, 0, 0.5)',
                            background: 'linear-gradient(165deg, rgba(40, 35, 20, 0.95) 0%, rgba(15, 15, 25, 0.98) 50%, rgba(20, 15, 30, 0.95) 100%)',
                            backdropFilter: 'blur(40px)',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: `
                                0 50px 100px rgba(0, 0, 0, 0.6),
                                0 0 80px rgba(255, 184, 0, 0.2),
                                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                                inset 0 0 60px rgba(255, 184, 0, 0.05)
                            `
                        }}
                    >
                        {/* Animated border glow */}
                        <motion.div
                            animate={{ 
                                rotate: 360,
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ 
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            style={{
                                position: 'absolute',
                                inset: '-3px',
                                borderRadius: '34px',
                                background: 'conic-gradient(from 0deg, #ffd700, #ff8c00, #ffd700, #ffb800, #ffd700)',
                                opacity: 0.6,
                                filter: 'blur(8px)',
                                zIndex: -1
                            }}
                        />

                        {/* Top shine effect */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)'
                        }} />

                        {/* Pulse rings behind trophy */}
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <PulseRing delay={0} size="120px" />
                            <PulseRing delay={0.5} size="120px" />
                            <PulseRing delay={1} size="120px" />
                        </div>

                        <AnimatePresence>
                            {showContent && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ position: 'relative', zIndex: 1 }}
                                >
                                    {/* Trophy Icon */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ 
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 12,
                                            delay: 0.1
                                        }}
                                        style={{
                                            background: 'linear-gradient(145deg, #ffd700, #ff9500)',
                                            padding: '2rem',
                                            borderRadius: '50%',
                                            boxShadow: `
                                                0 0 60px rgba(255, 184, 0, 0.6),
                                                0 20px 40px rgba(0, 0, 0, 0.4),
                                                inset 0 2px 0 rgba(255, 255, 255, 0.3)
                                            `,
                                            marginBottom: '2rem',
                                            display: 'inline-flex',
                                            position: 'relative'
                                        }}
                                    >
                                        <Trophy size={72} color="white" fill="white" strokeWidth={1.5} />
                                        
                                        {/* Sparkles around trophy */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            style={{ position: 'absolute', inset: '-20px' }}
                                        >
                                            <Sparkles style={{ position: 'absolute', top: 0, left: '50%', color: '#ffd700' }} size={16} />
                                            <Sparkles style={{ position: 'absolute', bottom: 0, right: 0, color: '#ffd700' }} size={14} />
                                            <Sparkles style={{ position: 'absolute', top: '50%', left: 0, color: '#ffd700' }} size={12} />
                                        </motion.div>
                                    </motion.div>

                                    {/* Level Up Text */}
                                    <motion.div
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <motion.p
                                            style={{
                                                fontSize: '0.875rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '3px',
                                                color: 'var(--accent-gold)',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            <Crown size={14} style={{ display: 'inline', marginRight: '8px' }} />
                                            ¡Subiste de Nivel!
                                        </motion.p>
                                        
                                        <motion.h2
                                            className="font-heading"
                                            style={{
                                                fontSize: '4rem',
                                                fontWeight: 900,
                                                marginBottom: '0.5rem',
                                                background: 'linear-gradient(135deg, #fff 0%, #ffd700 50%, #ff9500 100%)',
                                                backgroundSize: '200% auto',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: 'none',
                                                lineHeight: 1
                                            }}
                                        >
                                            Nivel {level}
                                        </motion.h2>
                                    </motion.div>

                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        style={{ 
                                            fontSize: '1.1rem', 
                                            color: 'rgba(255,255,255,0.7)', 
                                            marginBottom: '2.5rem',
                                            lineHeight: 1.5
                                        }}
                                    >
                                        ¡Increíble! Has desbloqueado nuevas habilidades de análisis.
                                    </motion.p>

                                    {/* Rewards Preview */}
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '1.5rem',
                                            marginBottom: '2.5rem',
                                            padding: '1.25rem',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255,255,255,0.08)'
                                        }}
                                    >
                                        <motion.div 
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.75rem',
                                                padding: '0.75rem 1.25rem',
                                                background: 'rgba(0, 210, 255, 0.1)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(0, 210, 255, 0.2)',
                                                cursor: 'default'
                                            }}
                                        >
                                            <Zap size={20} color="var(--primary)" />
                                            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>+Poder</span>
                                        </motion.div>
                                        <motion.div 
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.75rem',
                                                padding: '0.75rem 1.25rem',
                                                background: 'rgba(255, 184, 0, 0.1)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255, 184, 0, 0.2)',
                                                cursor: 'default'
                                            }}
                                        >
                                            <Star size={20} color="var(--accent-gold)" />
                                            <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>Nuevos Retos</span>
                                        </motion.div>
                                        <motion.div 
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.75rem',
                                                padding: '0.75rem 1.25rem',
                                                background: 'rgba(157, 80, 187, 0.1)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(157, 80, 187, 0.2)',
                                                cursor: 'default'
                                            }}
                                        >
                                            <TrendingUp size={20} color="var(--secondary)" />
                                            <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>Ranking</span>
                                        </motion.div>
                                    </motion.div>

                                    {/* CTA Button */}
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        whileHover={{ 
                                            scale: 1.05,
                                            boxShadow: '0 15px 40px rgba(255, 184, 0, 0.5)'
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={onClose}
                                        style={{
                                            background: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)',
                                            color: '#1a1a2e',
                                            border: 'none',
                                            padding: '1.25rem 3rem',
                                            borderRadius: '999px',
                                            fontSize: '1.2rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            boxShadow: `
                                                0 8px 30px rgba(255, 184, 0, 0.4),
                                                inset 0 1px 0 rgba(255, 255, 255, 0.3)
                                            `,
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <span style={{ position: 'relative', zIndex: 1 }}>¡A por más!</span>
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '200%' }}
                                            transition={{ duration: 0.6 }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '50%',
                                                height: '100%',
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                                transform: 'skewX(-20deg)'
                                            }}
                                        />
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LevelUpModal;
