import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, ChevronLeft, X, Rocket, Target, Trophy,
    Coins, Map, BookOpen, Sparkles, CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Import images
import welcomeImg from '../../assets/tutorial/welcome.png';
import worldsImg from '../../assets/tutorial/worlds.png';
import missionsImg from '../../assets/tutorial/missions.png';
import academyImg from '../../assets/tutorial/academy.png';

const ONBOARDING_STEPS = [
    {
        id: 'welcome',
        title: '¡Bienvenido a Power BI Quest! 🎮',
        description: 'Estás a punto de convertirte en un maestro del análisis de datos. Este juego te enseñará Power BI mientras completas misiones épicas en mundos temáticos.',
        icon: Rocket,
        image: welcomeImg,
        color: '#a855f7',
        tips: [
            'Aprende haciendo: cada misión es un proyecto real',
            'Gana XP y monedas por completar desafíos',
            'Desbloquea mundos y habilidades nuevas'
        ]
    },
    {
        id: 'worlds',
        title: 'Explora Mundos Temáticos 🌍',
        description: 'Cada mundo tiene una historia única con datos reales. Desde la oficina de Dunder Mifflin hasta rescatar datos de villanos en DataRescue.',
        icon: Map,
        image: worldsImg,
        color: '#3b82f6',
        tips: [
            'Empieza con "Dunder Mifflin" - está desbloqueado',
            'Gana monedas para desbloquear más mundos',
            'Cada mundo enseña diferentes habilidades de Power BI'
        ]
    },
    {
        id: 'missions',
        title: 'Completa Misiones 🎯',
        description: 'Las misiones son tu camino al éxito. Cada una te guía paso a paso para crear reportes y dashboards reales.',
        icon: Target,
        image: missionsImg,
        color: '#22c55e',
        tips: [
            'Descarga los datasets con un click',
            'Sigue la guía paso a paso en Power BI',
            'Marca como completada cuando termines'
        ]
    },
    {
        id: 'progression',
        title: 'Progresa y Sube de Nivel ⬆️',
        description: 'Gana XP por cada misión completada. Al subir de nivel, desbloqueas misiones más avanzadas y nuevas habilidades.',
        icon: Trophy,
        image: welcomeImg, // Reusing welcome image which has progression UI
        color: '#f59e0b',
        tips: [
            'Cada 400 XP subes un nivel',
            'Los niveles desbloquean misiones avanzadas',
            'Mantén tu racha diaria para bonificaciones'
        ]
    },
    {
        id: 'rewards',
        title: 'Gana Recompensas 💰',
        description: 'Completa misiones para ganar monedas. Úsalas para desbloquear nuevos mundos con desafíos únicos.',
        icon: Coins,
        image: missionsImg, // Reusing missions image which has coins
        color: '#eab308',
        tips: [
            'Cada mundo cuesta 200 monedas',
            'Las misiones difíciles dan más recompensas',
            'Los logros dan XP bonus'
        ]
    },
    {
        id: 'academy',
        title: 'Visita la Academia 📚',
        description: 'Si necesitas ayuda, la Academia tiene lecciones y tutoriales para cada concepto de Power BI y DAX.',
        icon: BookOpen,
        image: academyImg,
        color: '#06b6d4',
        tips: [
            'Consulta la Academia si te atascas',
            'Aprende funciones DAX paso a paso',
            'Referencias rápidas siempre disponibles'
        ]
    },
    {
        id: 'ready',
        title: '¡Estás Listo! 🚀',
        description: 'Tu aventura comienza ahora. Dirígete a los Mundos y empieza tu primera misión en Dunder Mifflin.',
        icon: Sparkles,
        image: worldsImg, // Reusing worlds image for the start
        color: '#ec4899',
        tips: [
            'Tu primera misión: "Bienvenido a Dunder Mifflin"',
            'No te preocupes por equivocarte, puedes repetir',
            '¡Diviértete aprendiendo!'
        ]
    }
];

const OnboardingTutorial = ({ onComplete, onSkip }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    const step = ONBOARDING_STEPS[currentStep];
    const Icon = step.icon;
    const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    // Use ref to track completed steps without triggering re-renders
    const completedStepsRef = useRef(completedSteps);

    useEffect(() => {
        // Mark current step as viewed
        if (!completedStepsRef.current.includes(step.id)) {
            const newSteps = [...completedStepsRef.current, step.id];
            completedStepsRef.current = newSteps;
            // Defer state update to avoid cascading renders
            Promise.resolve().then(() => setCompletedSteps(newSteps));
        }
    }, [currentStep, step.id]);

    const handleNext = () => {
        if (isLastStep) {
            handleComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        // Celebration confetti
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#00d2ff', '#9d50bb', '#ffb800', '#4ade80', '#f472b6']
        });

        // Save that user completed onboarding
        localStorage.setItem('powerbi-quest-onboarding-complete', 'true');

        if (onComplete) onComplete();
    };

    const handleSkip = () => {
        localStorage.setItem('powerbi-quest-onboarding-complete', 'true');
        if (onSkip) onSkip();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(15px)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: '1000px',
                    height: '600px',
                    background: '#0f172a',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    position: 'relative'
                }}
            >
                {/* Skip Button */}
                <button
                    onClick={handleSkip}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        zIndex: 10,
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                    }}
                >
                    Saltar <X size={16} />
                </button>

                {/* Left Side - Image */}
                <div style={{
                    flex: '1',
                    background: `linear-gradient(to bottom right, ${step.color}20, #000000)`,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={step.id}
                            src={step.image}
                            alt={step.title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.8,
                                mixBlendMode: 'overlay' // Makes it blend nicely with the dark bg
                            }}
                        />
                    </AnimatePresence>

                    {/* Overlay gradient to ensure text readability if we put text here, but mostly for style */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to right, transparent, #0f172a)`
                    }} />

                    {/* Glowing orb effect behind image */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        background: step.color,
                        filter: 'blur(100px)',
                        opacity: 0.3,
                        zIndex: -1
                    }} />
                </div>

                {/* Right Side - Content */}
                <div style={{
                    flex: '1',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    {/* Progress Dots */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '2rem'
                    }}>
                        {ONBOARDING_STEPS.map((s, idx) => (
                            <motion.div
                                key={s.id}
                                animate={{
                                    width: idx === currentStep ? '24px' : '8px',
                                    backgroundColor: idx === currentStep
                                        ? step.color
                                        : 'rgba(255, 255, 255, 0.1)'
                                }}
                                style={{
                                    height: '8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setCurrentStep(idx)}
                            />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                color: step.color,
                                marginBottom: '1rem',
                                background: `${step.color}15`,
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}>
                                <Icon size={18} />
                                <span>PASO {currentStep + 1} DE {ONBOARDING_STEPS.length}</span>
                            </div>

                            <motion.h1
                                style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 800,
                                    marginBottom: '1rem',
                                    color: 'white',
                                    lineHeight: 1.2
                                }}
                            >
                                {step.title}
                            </motion.h1>

                            <motion.p
                                style={{
                                    fontSize: '1.1rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '2rem',
                                    lineHeight: 1.6
                                }}
                            >
                                {step.description}
                            </motion.p>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                marginBottom: '3rem'
                            }}>
                                {step.tips.map((tip, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        <div style={{
                                            minWidth: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            background: `${step.color}30`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CheckCircle size={12} color={step.color} />
                                        </div>
                                        <span>{tip}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div style={{
                        marginTop: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <button
                            onClick={handlePrev}
                            disabled={isFirstStep}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: isFirstStep ? 'rgba(255,255,255,0.1)' : 'white',
                                cursor: isFirstStep ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '1rem',
                                padding: '10px'
                            }}
                        >
                            <ChevronLeft size={20} /> Anterior
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${step.color}40` }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            style={{
                                background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                                border: 'none',
                                borderRadius: '12px',
                                padding: '14px 36px',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                boxShadow: `0 4px 15px ${step.color}30`
                            }}
                        >
                            {isLastStep ? (
                                <>¡Comenzar! <Rocket size={20} /></>
                            ) : (
                                <>Siguiente <ChevronRight size={20} /></>
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OnboardingTutorial;
