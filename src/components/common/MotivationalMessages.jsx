import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote, X, ChevronRight } from 'lucide-react';
import { getRandomMessage } from '../../utils/motivationalMessages';

/**
 * Mensajes motivacionales categorizados por contexto (para uso interno)
 */
const MOTIVATIONAL_MESSAGES = {
    // Mensajes de bienvenida (al iniciar sesión)
    welcome: [
        { text: "¡Hora de convertir datos en insights! 📊", author: "Power BI Quest" },
        { text: "Cada día es una oportunidad para aprender algo nuevo.", author: "Tu mentor" },
        { text: "Los datos son el nuevo petróleo. ¡A refinar! ⛽", author: "Analista Senior" },
        { text: "Un dashboard bien hecho vale más que mil palabras.", author: "Data Wisdom" },
        { text: "¡Bienvenido de vuelta, Analista! Tu misión te espera.", author: "Power BI Quest" },
    ],

    // Después de completar una misión
    missionComplete: [
        { text: "¡Excelente trabajo! Los datos nunca mienten cuando los tratas bien. 🎯", author: "Michael Scott (datos edition)" },
        { text: "Un paso más cerca de ser un Maestro de Datos. 🏆", author: "Tu progreso" },
        { text: "La visualización perfecta comienza con la limpieza perfecta.", author: "Power Query Guru" },
        { text: "¡Así se hace! Dwight estaría orgulloso de tu eficiencia. 📈", author: "Dunder Mifflin" },
        { text: "Los KPIs que rescatas hoy, salvan decisiones mañana. 💡", author: "DataRescue HQ" },
    ],

    // Cuando sube de nivel
    levelUp: [
        { text: "¡Nuevo nivel desbloqueado! El poder de DAX crece en ti. ⚡", author: "Power BI Quest" },
        { text: "Con gran poder de datos, viene gran responsabilidad de insights.", author: "Data-Man" },
        { text: "Tu progreso es la mejor medida de tu éxito. 📊", author: "Métricas de Vida" },
        { text: "¡Nivel alcanzado! Las funciones avanzadas te esperan.", author: "DAX Master" },
    ],

    // Para mantener la racha
    streak: [
        { text: "¡Tu racha está en fuego! 🔥 No la dejes enfriar.", author: "Streak Master" },
        { text: "La consistencia es la madre del dominio.", author: "Disciplina de Datos" },
        { text: "Cada día de práctica te acerca a la excelencia.", author: "Tu mentor" },
        { text: "¡{streak} días seguidos! Eres imparable. 💪", author: "Racha Tracker" },
    ],

    // Cuando el usuario está atascado (sin completar misiones por un tiempo)
    encouragement: [
        { text: "Recuerda: todos los expertos fueron principiantes alguna vez.", author: "Sabiduría" },
        { text: "La Academia está aquí para ayudarte. ¡No dudes en consultarla! 📚", author: "Tu guía" },
        { text: "Un pequeño paso en datos es un gran salto en insights.", author: "Data Philosophy" },
        { text: "Los errores son oportunidades de aprendizaje disfrazadas.", author: "Growth Mindset" },
    ],

    // Tips de Power BI
    powerBiTips: [
        { text: "Tip: CALCULATE es la función más poderosa de DAX. ¡Domínala!", author: "DAX Tips" },
        { text: "Tip: Siempre crea una tabla calendario para análisis temporal.", author: "Best Practices" },
        { text: "Tip: Los slicers sincronizan páginas. ¡Úsalos sabiamente!", author: "UX de Reportes" },
        { text: "Tip: Power Query primero, DAX después. El orden importa.", author: "ETL Wisdom" },
        { text: "Tip: DISTINCTCOUNT es tu amigo contra los duplicados.", author: "Conteos Correctos" },
        { text: "Tip: Usa variables (VAR) en DAX para código más limpio.", author: "Clean Code" },
    ],

    // Cuando desbloquea algo nuevo
    unlock: [
        { text: "¡Nuevo territorio desbloqueado! La aventura continúa. 🗺️", author: "Explorer" },
        { text: "Has ganado acceso a nuevos desafíos. ¡Adelante!", author: "Power BI Quest" },
        { text: "El conocimiento es la llave que abre todas las puertas.", author: "Wisdom" },
    ]
};

/**
 * Componente de Quote Card
 */
export const QuoteCard = ({ message, onDismiss, autoHide = true, duration = 5000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoHide) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onDismiss) setTimeout(onDismiss, 300);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [autoHide, duration, onDismiss]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: '16px',
                        padding: '20px 24px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Sparkle decoration */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            opacity: 0.1
                        }}
                    >
                        <Sparkles size={80} color="#a855f7" />
                    </motion.div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                            borderRadius: '50%',
                            padding: '8px',
                            flexShrink: 0
                        }}>
                            <Quote size={20} color="white" />
                        </div>

                        <div style={{ flex: 1 }}>
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-primary)',
                                margin: 0,
                                lineHeight: 1.5,
                                fontStyle: 'italic'
                            }}>
                                "{message.text}"
                            </p>
                            <p style={{
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)',
                                margin: '8px 0 0 0'
                            }}>
                                — {message.author}
                            </p>
                        </div>

                        {onDismiss && (
                            <button
                                onClick={() => {
                                    setIsVisible(false);
                                    setTimeout(onDismiss, 300);
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/**
 * Banner de tip diario
 */
export const DailyTipBanner = ({ onAction }) => {
    const [dismissed, setDismissed] = useState(false);

    // Initialize tip synchronously to avoid setState in useEffect
    const [tip] = useState(() => {
        const lastTipDate = localStorage.getItem('powerbi-quest-last-tip-date');
        const today = new Date().toDateString();

        if (lastTipDate !== today) {
            localStorage.setItem('powerbi-quest-last-tip-date', today);
            return getRandomMessage('powerBiTips');
        }
        return null;
    });

    if (!tip || dismissed) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
                background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
                borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={18} color="#22c55e" />
                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    <strong>Tip del día:</strong> {tip.text}
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {onAction && (
                    <button
                        onClick={onAction}
                        style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            color: '#22c55e',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        Aprender más <ChevronRight size={14} />
                    </button>
                )}
                <button
                    onClick={() => setDismissed(true)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: 'var(--text-muted)'
                    }}
                >
                    <X size={16} />
                </button>
            </div>
        </motion.div>
    );
};

/**
 * Popup motivacional que aparece después de acciones
 */
export const MotivationalPopup = ({ show, message, onClose, duration = 4000 }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    return (
        <AnimatePresence>
            {show && message && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(15, 15, 25, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: '16px',
                        padding: '16px 24px',
                        maxWidth: 'min(400px, 90vw)',
                        width: 'max-content',
                        textAlign: 'center',
                        zIndex: 1500,
                        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Sparkles size={24} color="#a855f7" />
                        <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem' }}>
                            {message.text}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default {
    MOTIVATIONAL_MESSAGES,
    getRandomMessage,
    QuoteCard,
    DailyTipBanner,
    MotivationalPopup
};
