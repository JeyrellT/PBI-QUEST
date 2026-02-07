import React, { useState, useEffect, useCallback, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Brain, CheckCircle, XCircle, 
    ChevronRight, Sparkles, X,
    RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
    getDueReviews, 
    getReviewStats, 
    recordReviewResult,
    generateReviewQuestions 
} from '../../hooks/useSpacedRepetition';

/**
 * SpacedRepetitionPanel - Panel de repaso espaciado
 * 
 * Fundamentos de Neurociencia:
 * - Curva del olvido de Ebbinghaus
 * - Efecto de testing (Roediger & Karpicke)
 * - Repetición espaciada consolida memoria a largo plazo
 */
const SpacedRepetitionPanel = ({ onClose }) => {
    // Inicializar datos directamente en useState para evitar useEffect
    const [dueReviews, setDueReviews] = useState(() => getDueReviews());
    const [stats] = useState(() => getReviewStats());
    const [currentReview, setCurrentReview] = useState(() => {
        const due = getDueReviews();
        return due.length > 0 ? due[0] : null;
    });
    const [currentQuestion, setCurrentQuestion] = useState(() => {
        const due = getDueReviews();
        if (due.length > 0) {
            return generateReviewQuestions(due[0].conceptId);
        }
        return null;
    });
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [reviewsCompleted, setReviewsCompleted] = useState(0);
    const [sessionXP, setSessionXP] = useState(0);

    const startReview = useCallback((review) => {
        setCurrentReview(review);
        const question = generateReviewQuestions(review.conceptId);
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setShowResult(false);
    }, []);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (!selectedAnswer || !currentQuestion) return;

        const correct = selectedAnswer === currentQuestion.a;
        setIsCorrect(correct);
        setShowResult(true);

        // Registrar resultado
        const result = correct ? 'good' : 'hard';
        recordReviewResult(currentReview.conceptId, result);

        if (correct) {
            setSessionXP(prev => prev + 10);
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#22c55e', '#ffd700']
            });
        }
    };

    const handleNext = () => {
        setReviewsCompleted(prev => prev + 1);
        
        // Actualizar lista de pendientes
        const remaining = dueReviews.filter(r => r.conceptId !== currentReview.conceptId);
        setDueReviews(remaining);
        
        if (remaining.length > 0) {
            startReview(remaining[0]);
        } else {
            setCurrentReview(null);
            setCurrentQuestion(null);
        }
    };

    // Si no hay repasos pendientes
    if (!currentReview && dueReviews.length === 0) {
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
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    style={{
                        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                        borderRadius: '24px',
                        padding: '40px',
                        maxWidth: '450px',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <CheckCircle size={40} color="white" />
                    </div>
                    
                    <h2 style={{ color: 'white', marginBottom: '12px' }}>
                        ¡Al día con tus repasos! 🎉
                    </h2>
                    
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                        No tienes conceptos pendientes de repaso. ¡Sigue completando misiones para aprender más!
                    </p>

                    {stats && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '12px',
                            marginBottom: '24px'
                        }}>
                            <div style={{
                                background: 'rgba(0,210,255,0.1)',
                                borderRadius: '12px',
                                padding: '16px'
                            }}>
                                <p style={{ color: '#00d2ff', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                                    {stats.totalConcepts}
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: 0 }}>
                                    Conceptos aprendidos
                                </p>
                            </div>
                            <div style={{
                                background: 'rgba(34,197,94,0.1)',
                                borderRadius: '12px',
                                padding: '16px'
                            }}>
                                <p style={{ color: '#22c55e', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                                    {stats.mastered}
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: 0 }}>
                                    Dominados
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        style={{
                            padding: '14px 32px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #00d2ff 0%, #3b82f6 100%)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Continuar Aventura
                    </button>
                </motion.div>
            </motion.div>
        );
    }

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
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(15px)',
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
                    background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '24px',
                    maxWidth: '550px',
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Brain size={20} color="white" />
                        </div>
                        <div>
                            <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>
                                Repaso Espaciado
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '13px' }}>
                                {dueReviews.length} conceptos pendientes
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            padding: '8px'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Progress bar */}
                <div style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    position: 'relative'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${(reviewsCompleted / (reviewsCompleted + dueReviews.length)) * 100}%`,
                        background: 'linear-gradient(90deg, #22c55e, #10b981)',
                        transition: 'width 0.3s'
                    }} />
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                    {currentQuestion && (
                        <>
                            {/* Concepto actual */}
                            <div style={{
                                background: 'rgba(168,85,247,0.1)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <RefreshCw size={16} color="#a855f7" />
                                <span style={{ color: '#a855f7', fontSize: '14px' }}>
                                    Repasando: <strong>{currentReview.conceptName}</strong>
                                </span>
                            </div>

                            {/* Pregunta */}
                            <h4 style={{
                                color: 'white',
                                fontSize: '18px',
                                marginBottom: '20px',
                                lineHeight: '1.5'
                            }}>
                                {currentQuestion.q}
                            </h4>

                            {/* Opciones */}
                            {!showResult && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {currentQuestion.options?.map((option, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => handleAnswerSelect(option)}
                                            style={{
                                                padding: '14px 18px',
                                                borderRadius: '12px',
                                                border: selectedAnswer === option 
                                                    ? '2px solid #00d2ff'
                                                    : '1px solid rgba(255,255,255,0.1)',
                                                background: selectedAnswer === option 
                                                    ? 'rgba(0,210,255,0.1)'
                                                    : 'rgba(255,255,255,0.03)',
                                                color: 'white',
                                                fontSize: '15px',
                                                textAlign: 'left',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {option}
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Resultado */}
                            {showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div style={{
                                        padding: '16px',
                                        borderRadius: '12px',
                                        background: isCorrect 
                                            ? 'rgba(34,197,94,0.15)'
                                            : 'rgba(239,68,68,0.15)',
                                        border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                        marginBottom: '16px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                            {isCorrect ? (
                                                <CheckCircle size={20} color="#22c55e" />
                                            ) : (
                                                <XCircle size={20} color="#ef4444" />
                                            )}
                                            <span style={{ 
                                                color: isCorrect ? '#22c55e' : '#ef4444',
                                                fontWeight: '600'
                                            }}>
                                                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                                            </span>
                                            {isCorrect && (
                                                <span style={{ color: '#ffd700', fontSize: '14px' }}>
                                                    +10 XP
                                                </span>
                                            )}
                                        </div>
                                        {!isCorrect && (
                                            <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '14px' }}>
                                                La respuesta correcta es: <strong>{currentQuestion.a}</strong>
                                            </p>
                                        )}
                                    </div>

                                    {/* Botones de dificultad / siguiente */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={handleNext}
                                            style={{
                                                flex: 1,
                                                padding: '14px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #00d2ff 0%, #3b82f6 100%)',
                                                color: 'white',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            {dueReviews.length > 1 ? 'Siguiente' : 'Finalizar'}
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Botón verificar */}
                            {!showResult && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                    style={{
                                        width: '100%',
                                        marginTop: '20px',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: selectedAnswer 
                                            ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                            : 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                                        opacity: selectedAnswer ? 1 : 0.5
                                    }}
                                >
                                    Verificar Respuesta
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Footer con stats de sesión */}
                <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={16} color="#22c55e" />
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                                {reviewsCompleted} completados
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Sparkles size={16} color="#ffd700" />
                            <span style={{ color: '#ffd700', fontSize: '14px' }}>
                                +{sessionXP} XP
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/**
 * ReviewNotification - Notificación de repasos pendientes
 */
export const ReviewNotification = ({ onStartReview, onDismiss }) => {
    // Usar useMemo para evitar llamar getReviewStats en cada render
    const stats = useMemo(() => getReviewStats(), []);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Solo mostrar si hay repasos pendientes
        if (stats && stats.dueNow > 0) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [stats]);

    if (!isVisible || !stats || stats.dueNow === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="review-notification-toast"
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 50 }}
                style={{
                    position: 'fixed',
                    bottom: '100px',
                    left: '50%',
                    zIndex: 1500,
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.95) 0%, rgba(99,102,241,0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 10px 40px rgba(168,85,247,0.4)'
                }}
            >
                <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Brain size={24} color="white" />
                </div>
                
                <div>
                    <p style={{ color: 'white', margin: 0, fontWeight: '600' }}>
                        🧠 {stats.dueNow} conceptos para repasar
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontSize: '13px' }}>
                        Refuerza tu memoria y gana +{stats.dueNow * 10} XP
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={onStartReview}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'white',
                            color: '#6366f1',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        Repasar
                    </button>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            if (onDismiss) onDismiss();
                        }}
                        style={{
                            padding: '10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SpacedRepetitionPanel;
