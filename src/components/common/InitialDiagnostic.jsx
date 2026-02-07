import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronRight, ChevronLeft, CheckCircle, 
    Sparkles, Target, BookOpen, Rocket 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_DIAGNOSTIC } from '../../data/worlds';

/**
 * InitialDiagnostic - Sistema de diagnóstico para rutas adaptativas
 * 
 * Fundamentos pedagógicos:
 * - Zona de Desarrollo Próximo (Vygotsky): Evaluar conocimientos previos
 * - Teoría de la Autodeterminación (Deci & Ryan): Dar autonomía al estudiante
 * - Reducción de ansiedad: Permitir que el estudiante comunique su nivel
 * 
 * @param {Object} props
 * @param {Function} props.onComplete - Callback con resultado del diagnóstico
 * @param {Function} props.onSkip - Callback si el usuario salta el diagnóstico
 */
const InitialDiagnostic = ({ onComplete, onSkip }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);

    const diagnostic = INITIAL_DIAGNOSTIC;
    const questions = diagnostic.questions;
    const isLastQuestion = currentQuestion === questions.length - 1;
    const question = questions[currentQuestion];

    const handleAnswer = (questionId, value, tag) => {
        const newAnswers = {
            ...answers,
            [questionId]: { value, tag }
        };
        setAnswers(newAnswers);

        // Auto-avanzar después de seleccionar
        setTimeout(() => {
            if (isLastQuestion) {
                calculateResult(newAnswers);
            } else {
                setCurrentQuestion(prev => prev + 1);
            }
        }, 300);
    };

    const calculateResult = (finalAnswers) => {
        // Calcular puntuación total
        const totalScore = Object.values(finalAnswers).reduce((sum, a) => sum + a.value, 0);
        
        // Determinar ruta basada en puntuación
        let route = null;
        for (const [key, routeConfig] of Object.entries(diagnostic.routes)) {
            if (totalScore >= routeConfig.minScore && totalScore <= routeConfig.maxScore) {
                route = { ...routeConfig, key };
                break;
            }
        }

        // Si no encontró ruta, usar la más básica
        if (!route) {
            route = { ...diagnostic.routes.novice, key: 'novice' };
        }

        setResult({
            score: totalScore,
            route,
            answers: finalAnswers
        });
        setShowResult(true);

        // Confetti para celebrar
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#00d2ff', '#a855f7', '#22c55e']
        });
    };

    const handleComplete = () => {
        if (onComplete) {
            onComplete(result);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    // Renderizar pantalla de resultados
    if (showResult && result) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 100%)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    style={{
                        background: 'linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.9) 100%)',
                        borderRadius: '24px',
                        padding: '40px',
                        maxWidth: '500px',
                        width: '100%',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                boxShadow: '0 0 30px rgba(34,197,94,0.4)'
                            }}
                        >
                            <Sparkles size={40} color="white" />
                        </motion.div>

                        <h2 style={{ 
                            color: 'white', 
                            fontSize: '28px', 
                            marginBottom: '12px',
                            fontWeight: '700'
                        }}>
                            ¡Tu ruta está lista!
                        </h2>

                        <p style={{ 
                            color: 'rgba(255,255,255,0.7)', 
                            fontSize: '16px',
                            marginBottom: '24px',
                            lineHeight: '1.6'
                        }}>
                            {result.route.message}
                        </p>

                        <div style={{
                            background: 'rgba(0,210,255,0.1)',
                            border: '1px solid rgba(0,210,255,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '24px'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Target size={20} color="#00d2ff" />
                                <span style={{ color: '#00d2ff', fontWeight: '600' }}>
                                    Tu primera misión:
                                </span>
                            </div>
                            <p style={{ color: 'white', margin: 0 }}>
                                {result.route.startMission === 'office-0a' && '"El Correo de Bienvenida"'}
                                {result.route.startMission === 'office-0b' && '"Tu Escritorio Virtual"'}
                                {result.route.startMission === 'office-1' && '"Bienvenido a Dunder Mifflin"'}
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '14px',
                            marginBottom: '32px'
                        }}>
                            <BookOpen size={16} />
                            <span>{result.route.estimatedTime}</span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleComplete}
                            style={{
                                width: '100%',
                                padding: '16px 32px',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #00d2ff 0%, #3b82f6 100%)',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 15px rgba(0,210,255,0.4)'
                            }}
                        >
                            <Rocket size={20} />
                            ¡Empezar Aventura!
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    // Renderizar preguntas
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 100%)',
                backdropFilter: 'blur(20px)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    background: 'linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.9) 100%)',
                    borderRadius: '24px',
                    padding: '40px',
                    maxWidth: '600px',
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                }}
            >
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '8px'
                    }}>
                        <span style={{ 
                            color: '#00d2ff', 
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            {diagnostic.title}
                        </span>
                        <button
                            onClick={onSkip}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Saltar →
                        </button>
                    </div>
                    <p style={{ 
                        color: 'rgba(255,255,255,0.6)', 
                        fontSize: '14px',
                        margin: 0
                    }}>
                        {diagnostic.description}
                    </p>
                </div>

                {/* Progress */}
                <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '32px' 
                }}>
                    {questions.map((_, idx) => (
                        <div
                            key={idx}
                            style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: '2px',
                                background: idx <= currentQuestion 
                                    ? 'linear-gradient(90deg, #00d2ff, #3b82f6)' 
                                    : 'rgba(255,255,255,0.1)',
                                transition: 'background 0.3s'
                            }}
                        />
                    ))}
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px',
                            marginBottom: '24px'
                        }}>
                            <span style={{ fontSize: '32px' }}>{question.icon}</span>
                            <h3 style={{ 
                                color: 'white', 
                                fontSize: '20px',
                                fontWeight: '600',
                                margin: 0
                            }}>
                                {question.question}
                            </h3>
                        </div>

                        {/* Options */}
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '12px' 
                        }}>
                            {question.options.map((option, idx) => {
                                const isSelected = answers[question.id]?.value === option.value;
                                return (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleAnswer(question.id, option.value, option.tag)}
                                        style={{
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            border: isSelected 
                                                ? '2px solid #00d2ff' 
                                                : '1px solid rgba(255,255,255,0.1)',
                                            background: isSelected 
                                                ? 'rgba(0,210,255,0.1)' 
                                                : 'rgba(255,255,255,0.03)',
                                            color: 'white',
                                            fontSize: '16px',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            border: isSelected 
                                                ? '2px solid #00d2ff' 
                                                : '2px solid rgba(255,255,255,0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            {isSelected && (
                                                <CheckCircle size={16} color="#00d2ff" />
                                            )}
                                        </div>
                                        {option.text}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '32px'
                }}>
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent',
                            color: currentQuestion === 0 ? 'rgba(255,255,255,0.3)' : 'white',
                            fontSize: '14px',
                            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <ChevronLeft size={16} />
                        Anterior
                    </button>

                    <span style={{ 
                        color: 'rgba(255,255,255,0.5)', 
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {currentQuestion + 1} / {questions.length}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default InitialDiagnostic;
