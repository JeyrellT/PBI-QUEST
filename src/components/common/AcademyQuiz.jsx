import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, Award, ChevronRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * AcademyQuiz - Quiz component for Academy lessons
 * Parent should use a key prop to reset this component when quiz changes:
 * <AcademyQuiz key={quiz?.id} quiz={quiz} onComplete={...} />
 * 
 * Props:
 * - quiz: { questions: Array, xpBonus: number }
 * - onComplete: (passed, correctCount) => void
 */
const AcademyQuiz = ({ quiz, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const questions = quiz?.questions || [];
    const totalQuestions = questions.length;
    const currentQ = questions[currentQuestion];

    const handleSelectAnswer = (index) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const handleConfirm = () => {
        if (selectedAnswer === null) return;
        
        const isCorrect = selectedAnswer === currentQ.correctIndex;
        setAnswers([...answers, { questionId: currentQ.id, isCorrect, selected: selectedAnswer }]);
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            // Quiz finished
            const correctCount = [...answers, { isCorrect: selectedAnswer === currentQ.correctIndex }]
                .filter(a => a.isCorrect).length;
            const passed = correctCount >= Math.ceil(totalQuestions / 2);
            
            setQuizCompleted(true);
            
            if (passed) {
                // Celebration confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
                });
            }
            
            if (onComplete) {
                onComplete(passed, correctCount);
            }
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setAnswers([]);
        setQuizCompleted(false);
    };

    if (!quiz || questions.length === 0) {
        return null;
    }

    // Quiz Completed View
    if (quizCompleted) {
        const finalCorrect = answers.filter(a => a.isCorrect).length;
        const passed = finalCorrect >= Math.ceil(totalQuestions / 2);
        const percentage = Math.round((finalCorrect / totalQuestions) * 100);

        return (
            <motion.div 
                className="academy-quiz-container completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="quiz-result-card glass">
                    <motion.div 
                        className={`result-icon ${passed ? 'success' : 'retry'}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10 }}
                    >
                        {passed ? <Award size={48} /> : <RotateCcw size={48} />}
                    </motion.div>
                    
                    <h3>{passed ? '¡Excelente trabajo!' : '¡Casi lo logras!'}</h3>
                    
                    <div className="result-stats">
                        <div className="stat-circle" style={{ 
                            background: `conic-gradient(${passed ? '#10b981' : '#f59e0b'} ${percentage}%, rgba(255,255,255,0.1) 0%)`
                        }}>
                            <span className="stat-value">{percentage}%</span>
                        </div>
                        <p>{finalCorrect} de {totalQuestions} correctas</p>
                    </div>

                    {passed ? (
                        <div className="xp-bonus-earned">
                            <Sparkles size={20} />
                            <span>+{quiz.xpBonus} XP ganados</span>
                        </div>
                    ) : (
                        <p className="retry-message">
                            Necesitas al menos {Math.ceil(totalQuestions / 2)} respuestas correctas para ganar XP.
                        </p>
                    )}

                    <div className="result-actions">
                        {!passed && (
                            <motion.button 
                                className="btn btn-primary"
                                onClick={handleRetry}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <RotateCcw size={18} />
                                Intentar de nuevo
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="academy-quiz-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="quiz-header">
                <div className="quiz-title">
                    <HelpCircle size={20} />
                    <span>Quiz de Práctica</span>
                    {quiz.xpBonus && (
                        <span className="xp-bonus-badge">+{quiz.xpBonus} XP</span>
                    )}
                </div>
                <div className="quiz-progress">
                    <span>Pregunta {currentQuestion + 1} de {totalQuestions}</span>
                    <div className="progress-dots">
                        {questions.map((_, idx) => (
                            <span 
                                key={idx} 
                                className={`dot ${idx < currentQuestion ? 'completed' : ''} ${idx === currentQuestion ? 'current' : ''} ${answers[idx]?.isCorrect === true ? 'correct' : ''} ${answers[idx]?.isCorrect === false ? 'incorrect' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentQuestion}
                    className="quiz-question"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <h4>{currentQ.question}</h4>
                    
                    <div className="quiz-options">
                        {currentQ.options.map((option, idx) => {
                            const isSelected = selectedAnswer === idx;
                            const isCorrect = idx === currentQ.correctIndex;
                            const showCorrectness = showResult;
                            
                            let optionClass = 'quiz-option';
                            if (isSelected) optionClass += ' selected';
                            if (showCorrectness && isCorrect) optionClass += ' correct';
                            if (showCorrectness && isSelected && !isCorrect) optionClass += ' incorrect';

                            return (
                                <motion.button
                                    key={idx}
                                    className={optionClass}
                                    onClick={() => handleSelectAnswer(idx)}
                                    disabled={showResult}
                                    whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                                    whileTap={!showResult ? { scale: 0.98 } : {}}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                                    <span className="option-text">{option}</span>
                                    {showCorrectness && isCorrect && <CheckCircle2 size={20} className="option-icon" />}
                                    {showCorrectness && isSelected && !isCorrect && <XCircle size={20} className="option-icon" />}
                                </motion.button>
                            );
                        })}
                    </div>

                    {showResult && currentQ.explanation && (
                        <motion.div 
                            className="quiz-explanation"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <div className="explanation-icon">
                                {selectedAnswer === currentQ.correctIndex ? (
                                    <CheckCircle2 size={18} className="correct" />
                                ) : (
                                    <XCircle size={18} className="incorrect" />
                                )}
                            </div>
                            <p>{currentQ.explanation}</p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="quiz-actions">
                {!showResult ? (
                    <motion.button 
                        className="btn btn-primary"
                        onClick={handleConfirm}
                        disabled={selectedAnswer === null}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Confirmar respuesta
                    </motion.button>
                ) : (
                    <motion.button 
                        className="btn btn-primary"
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {currentQuestion < totalQuestions - 1 ? (
                            <>Siguiente <ChevronRight size={18} /></>
                        ) : (
                            <>Ver resultado <Award size={18} /></>
                        )}
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

export default AcademyQuiz;
