import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, TrendingUp, Users, Activity, Zap, Lock, Clock, CheckCircle, XCircle, Crown, Flame, Target, Award, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WEEKLY_CHALLENGES } from '../../data/weeklyChallenges';
import '../../styles/Leaderboard.css';

const Leaderboard = () => {
    const { user, getTier, completeWeeklyChallenge } = useGame();

    // Quiz State
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null); // null, true, false
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    // Initial check to avoid undefined access
    const challengeState = user.weeklyChallenge || { currentWeek: 1, nextUnlockDate: null };
    const currentWeekData = WEEKLY_CHALLENGES.find(w => w.week === challengeState.currentWeek);

    // Check if locked by time
    const [timeLeft, setTimeLeft] = useState('');
    const isTimeLocked = challengeState.nextUnlockDate && new Date() < new Date(challengeState.nextUnlockDate);

    useEffect(() => {
        if (isTimeLocked) {
            const timer = setInterval(() => {
                const now = new Date();
                const unlock = new Date(challengeState.nextUnlockDate);
                const diff = unlock - now;

                if (diff <= 0) {
                    // Time up, refresh logic (in a real app, maybe force reload user)
                    setTimeLeft('');
                } else {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                }
            }, 60000); // Update every minute
            return () => clearInterval(timer);
        }
    }, [isTimeLocked, challengeState.nextUnlockDate]);

    // Simulated Rivals with Premium Avatars
    const rivals = [
        { name: 'Dax Master', xp: 25400, level: 26, avatar: '/images/avatars/dax-master.png', isImage: true },
        { name: 'Viz Queen', xp: 21200, level: 22, avatar: '/images/avatars/viz-queen.png', isImage: true },
        { name: 'Power User 404', xp: 18500, level: 19, avatar: '/images/avatars/power-user.png', isImage: true },
        { name: 'Data Dragon', xp: 15600, level: 16, avatar: '/images/avatars/data-dragon.png', isImage: true },
        { name: 'Insight Hunter', xp: 12400, level: 13, avatar: '🏹', isImage: false },
        { name: 'Chart Wizard', xp: 9800, level: 10, avatar: '🔮', isImage: false },
        { name: 'Query King', xp: 7500, level: 8, avatar: '👑', isImage: false },
        { name: 'Pivot Pro', xp: 4200, level: 5, avatar: '⚡', isImage: false },
    ];

    // Validación: asegurar que los datos del usuario sean coherentes antes de mostrar
    const safeUserXP = Math.max(0, user.xp || 0);
    const safeUserLevel = Math.max(1, user.level || 1);
    const safeUserName = user.name || 'Analista';

    // Combine user with rivals and sort
    const allPlayers = [
        ...rivals,
        { name: `${safeUserName} (Tú)`, xp: safeUserXP, level: safeUserLevel, avatar: '👤', isUser: true, isImage: false }
    ].sort((a, b) => b.xp - a.xp);

    const handleStartQuiz = () => {
        setShowQuiz(true);
        setCurrentQuestionIdx(0);
        setCorrectCount(0);
        setQuizCompleted(false);
        setIsCorrect(null);
        setSelectedOption(null);
    };

    const handleAnswer = (optionIndex) => {
        if (selectedOption !== null) return; // Prevent double click

        setSelectedOption(optionIndex);
        const currentQ = currentWeekData.questions[currentQuestionIdx];
        const correct = optionIndex === currentQ.correctAnswer;

        setIsCorrect(correct);
        if (correct) setCorrectCount(prev => prev + 1);

        // Wait a bit then move next
        setTimeout(() => {
            if (currentQuestionIdx < currentWeekData.questions.length - 1) {
                setCurrentQuestionIdx(prev => prev + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setQuizCompleted(true);
            }
        }, 1500);
    };

    const handleFinishQuiz = () => {
        const passThreshold = Math.ceil(currentWeekData.questions.length * 0.7); // 70% to pass? Or just 100? Let's say all 4 for logic "aumentando dificultad" implies mastery.
        // User requested "group of 4 questions", "linked to power bi".
        // Let's be nice: 3/4 is enough to pass, but 4/4 gives bonus?
        // Let's strictly require 4/4 for the "Challenge" feel if it's weekly?
        // "si no lo hace esta semana, la otra semana tiene el mismo" -> implies you MUST pass it to move on.
        // Let's pass with 3/4 to not be too frustrating.

        if (correctCount >= 3) {
            completeWeeklyChallenge(currentWeekData.week, currentWeekData.xpReward);
        }
        setShowQuiz(false);
    };

    return (
        <div className="leaderboard-container animate-fade-in" style={{ position: 'relative' }}>
            {/* Community Hero Section */}
            <div className="leaderboard-header glass community-hero">
                <div className="hero-content">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="hero-text"
                    >
                        <h1 className="font-heading gradient-text">Salón de la Fama</h1>
                        <p className="hero-subtitle">Los analistas más legendarios en la historia de Power BI Quest.</p>

                        <div className="community-stats-row">
                            <motion.div 
                                className="stat-pill"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Users size={16} /> <span>500 Graduados</span>
                            </motion.div>
                            <motion.div 
                                className="stat-pill"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Activity size={16} /> <span>3,200+ Misiones</span>
                            </motion.div>
                            <motion.div 
                                className="stat-pill success"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Flame size={16} /> <span>Temporada Activa</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-trophy"
                        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Trophy size={180} className="trophy-glow" color="#ffd700" strokeWidth={1} style={{ opacity: 0.8 }} />
                    </motion.div>
                </div>
            </div>

            {/* Weekly Challenge Banner */}
            <AnimatePresence mode="wait">
                {currentWeekData ? (
                    <motion.div
                        key="challenge-banner"
                        className={`weekly-challenge-banner ${isTimeLocked ? 'locked' : ''}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            background: isTimeLocked
                                ? 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))'
                                : 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.1))',
                            border: isTimeLocked ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(6, 182, 212, 0.3)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Background Decoration */}
                        {!isTimeLocked && (
                            <div className="banner-glow" style={{
                                position: 'absolute', right: '-50px', top: '-50px',
                                width: '200px', height: '200px',
                                background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
                                filter: 'blur(40px)', opacity: 0.6
                            }} />
                        )}

                        <div className="challenge-icon" style={{
                            background: isTimeLocked ? '#334155' : 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                            boxShadow: isTimeLocked ? 'none' : '0 0 20px rgba(6, 182, 212, 0.4)'
                        }}>
                            {isTimeLocked ? <Lock size={24} color="#94a3b8" /> : <Star size={24} fill="white" color="white" />}
                        </div>

                        <div className="challenge-info">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                    fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase',
                                    color: isTimeLocked ? '#94a3b8' : 'var(--accent-gold)',
                                    letterSpacing: '1px'
                                }}>
                                    {isTimeLocked ? 'PRÓXIMO RETO' : 'RETO DISPONIBLE'}
                                </span>
                                {isTimeLocked && timeLeft && (
                                    <span style={{ fontSize: '0.75rem', background: '#334155', padding: '2px 8px', borderRadius: '12px' }}>
                                        <Clock size={10} style={{ display: 'inline', marginRight: '4px' }} />
                                        {timeLeft}
                                    </span>
                                )}
                            </div>
                            <h3 style={{ opacity: isTimeLocked ? 0.6 : 1, marginBottom: '4px' }}>
                                Semana {currentWeekData.week}: "{currentWeekData.title}"
                            </h3>
                            <p style={{ opacity: isTimeLocked ? 0.6 : 1, maxWidth: '600px' }}>
                                {isTimeLocked
                                    ? "Completa el tiempo de espera para demostrar que has asimilado los conocimientos."
                                    : currentWeekData.description}
                                {!isTimeLocked && <span style={{ color: 'var(--accent-green)', fontWeight: 'bold', marginLeft: '8px' }}>+{currentWeekData.xpReward} XP</span>}
                            </p>
                        </div>

                        <button
                            className="btn-challenge"
                            disabled={isTimeLocked}
                            onClick={handleStartQuiz}
                            style={{
                                opacity: isTimeLocked ? 0.5 : 1,
                                cursor: isTimeLocked ? 'not-allowed' : 'pointer',
                                filter: isTimeLocked ? 'grayscale(100%)' : 'none'
                            }}
                        >
                            {isTimeLocked ? 'En enfriamiento' : 'Aceptar Reto'}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        className="weekly-challenge-banner completed"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(0,0,0,0))', border: '1px solid rgba(34, 197, 94, 0.3)' }}
                    >
                        <div className="challenge-icon" style={{ background: '#22c55e' }}>
                            <Trophy size={24} fill="white" color="white" />
                        </div>
                        <div className="challenge-info">
                            <h3>¡Temporada Completada!</h3>
                            <p>Has dominado todos los retos semanales disponibles. ¡Increíble!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quiz Modal Overlay */}
            <AnimatePresence>
                {showQuiz && currentWeekData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass"
                            style={{
                                width: '100%', maxWidth: '600px', padding: '2rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative'
                            }}
                        >
                            {!quizCompleted ? (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>
                                            Pregunta {currentQuestionIdx + 1}/{currentWeekData.questions.length}
                                        </span>
                                        <button onClick={() => setShowQuiz(false)} style={{ color: 'var(--text-muted)' }}>
                                            <XCircle size={24} />
                                        </button>
                                    </div>

                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>
                                        {currentWeekData.questions[currentQuestionIdx].question}
                                    </h2>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {currentWeekData.questions[currentQuestionIdx].options.map((opt, idx) => {
                                            let bgColor = 'rgba(255,255,255,0.05)';
                                            let borderColor = 'rgba(255,255,255,0.1)';

                                            // Validate answer visually if selected
                                            if (selectedOption !== null) {
                                                if (idx === currentWeekData.questions[currentQuestionIdx].correctAnswer) {
                                                    bgColor = 'rgba(34, 197, 94, 0.2)';
                                                    borderColor = '#22c55e';
                                                } else if (idx === selectedOption) {
                                                    bgColor = 'rgba(239, 68, 68, 0.2)';
                                                    borderColor = '#ef4444';
                                                } else {
                                                    bgColor = 'rgba(0,0,0,0.2)'; // dim others
                                                }
                                            }

                                            return (
                                                <motion.button
                                                    key={idx}
                                                    whileHover={selectedOption === null ? { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
                                                    onClick={() => handleAnswer(idx)}
                                                    style={{
                                                        padding: '1.25rem',
                                                        borderRadius: '12px',
                                                        border: `1px solid ${borderColor}`,
                                                        background: bgColor,
                                                        color: 'white',
                                                        textAlign: 'left',
                                                        fontSize: '1rem',
                                                        cursor: selectedOption === null ? 'pointer' : 'default',
                                                        transition: 'all 0.3s ease',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {opt}
                                                    {selectedOption !== null && idx === currentWeekData.questions[currentQuestionIdx].correctAnswer && (
                                                        <CheckCircle size={20} color="#22c55e" />
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        {correctCount >= 3 ? (
                                            <Trophy size={80} color="#ffd700" style={{ margin: '0 auto', filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))' }} />
                                        ) : (
                                            <XCircle size={80} color="#ef4444" style={{ margin: '0 auto' }} />
                                        )}
                                    </div>

                                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                                        {correctCount >= 3 ? '¡Reto Completado!' : 'Inténtalo de nuevo'}
                                    </h2>

                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                                        Has respondido correctamente {correctCount} de {currentWeekData.questions.length} preguntas.
                                        {correctCount >= 3
                                            ? ' ¡Has demostrado tu conocimiento y ganado experiencia!'
                                            : ' Necesitas al menos 3 respuestas correctas para avanzar.'}
                                    </p>

                                    <button
                                        onClick={handleFinishQuiz}
                                        style={{
                                            background: correctCount >= 3 ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                            color: correctCount >= 3 ? 'black' : 'white',
                                            padding: '12px 32px',
                                            borderRadius: '24px',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {correctCount >= 3 ? 'Reclamar Recompensa' : 'Cerrar'}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Leaderboard Table */}
            <motion.div
                className="leaderboard-table-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="leaderboard-row header-row">
                    <span className="rank-cell">#</span>
                    <span className="player-cell">Analista</span>
                    <span className="tier-cell">Rango</span>
                    <span className="xp-cell">Experiencia</span>
                </div>

                {allPlayers.map((player, index) => {
                    const tier = getTier(player.xp);
                    const rank = index + 1;
                    const isTop3 = rank <= 3;

                    return (
                        <motion.div
                            key={player.name}
                            className={`leaderboard-row ${player.isUser ? 'user-row' : ''} ${isTop3 ? 'top-rank' : ''}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.4 }}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
                        >
                            <div className="rank-cell">
                                {rank === 1 ? <Medal className="rank-medal rank-1" color="#ffd700" size={32} /> :
                                    rank === 2 ? <Medal className="rank-medal rank-2" color="#c0c0c0" size={28} /> :
                                        rank === 3 ? <Medal className="rank-medal rank-3" color="#cd7f32" size={26} /> :
                                            <span className="rank-number">{rank}</span>}
                            </div>
                            <div className="player-cell">
                                <div className={`player-avatar-wrapper ${isTop3 ? 'glow-avatar' : ''}`}>
                                    {player.isImage ? (
                                        <img src={player.avatar} alt={player.name} className="avatar-img" />
                                    ) : (
                                        <span className="avatar-emoji">{player.avatar}</span>
                                    )}
                                    {player.isUser && <div className="online-indicator"></div>}
                                </div>
                                <div className="player-details">
                                    <span className="player-name">
                                        {player.name}
                                        {isTop3 && <Star size={12} fill="currentColor" className="star-badge" />}
                                    </span>
                                    <span className="player-sub">Nivel {player.level} • {tier.name}</span>
                                </div>
                            </div>
                            <div className="tier-cell">
                                <span className={`tier-badge`} style={{
                                    color: tier.color,
                                    borderColor: tier.color,
                                    background: `linear-gradient(90deg, ${tier.color}10, transparent)`
                                }}>
                                    {tier.icon} {tier.name}
                                </span>
                            </div>
                            <div className="xp-cell">
                                <span className="xp-val">{player.xp.toLocaleString()}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Leyendas del Power BI - Sección Premium */}
            <motion.div 
                className="legends-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <div className="legends-header">
                    <div className="legends-title-row">
                        <Crown size={24} className="crown-icon" />
                        <h2>Leyendas de Power BI</h2>
                    </div>
                    <p className="legends-subtitle">Analistas que dominaron cada reto y alcanzaron la excelencia</p>
                </div>
                
                <div className="legends-grid">
                    <motion.div 
                        className="legend-card gold"
                        whileHover={{ scale: 1.03, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="legend-badge">
                            <Sparkles size={20} />
                            <span>Velocista DAX</span>
                        </div>
                        <div className="legend-avatar gold-glow">
                            <img src="/images/avatars/dax-master.png" alt="Dax Master" />
                        </div>
                        <h3>Dax Master</h3>
                        <p className="legend-achievement">Completó 50 fórmulas DAX en tiempo récord</p>
                        <div className="legend-stats">
                            <span><Trophy size={14} /> 25,400 XP</span>
                            <span><Target size={14} /> 98% precisión</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="legend-card silver"
                        whileHover={{ scale: 1.03, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="legend-badge">
                            <Award size={20} />
                            <span>Maestra Visual</span>
                        </div>
                        <div className="legend-avatar silver-glow">
                            <img src="/images/avatars/viz-queen.png" alt="Viz Queen" />
                        </div>
                        <h3>Viz Queen</h3>
                        <p className="legend-achievement">Creó los dashboards más impactantes</p>
                        <div className="legend-stats">
                            <span><Trophy size={14} /> 21,200 XP</span>
                            <span><Star size={14} /> 45 logros</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="legend-card bronze"
                        whileHover={{ scale: 1.03, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="legend-badge">
                            <Flame size={20} />
                            <span>Racha Imparable</span>
                        </div>
                        <div className="legend-avatar bronze-glow">
                            <img src="/images/avatars/power-user.png" alt="Power User" />
                        </div>
                        <h3>Power User 404</h3>
                        <p className="legend-achievement">30 días consecutivos de práctica</p>
                        <div className="legend-stats">
                            <span><Trophy size={14} /> 18,500 XP</span>
                            <span><Flame size={14} /> 30 días</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Tu Progreso Personal */}
            <motion.div 
                className="stats-footer personal-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <motion.div 
                    className="footer-card your-position"
                    whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
                >
                    <div className="position-badge">
                        <span className="position-number">#{allPlayers.findIndex(p => p.isUser) + 1}</span>
                    </div>
                    <div>
                        <p className="stat-label">TU POSICIÓN ACTUAL</p>
                        <h2 className="stat-value">Top {Math.round((allPlayers.findIndex(p => p.isUser) + 1) / allPlayers.length * 100)}%</h2>
                        <p className="stat-hint">¡Sigue subiendo en el ranking!</p>
                    </div>
                </motion.div>
                <motion.div 
                    className="footer-card next-milestone"
                    whileHover={{ scale: 1.02, borderColor: 'var(--accent-gold)' }}
                >
                    <div className="milestone-icon">
                        <Target size={28} />
                    </div>
                    <div>
                        <p className="stat-label">PRÓXIMA META</p>
                        <h2 className="stat-value">
                            {allPlayers.findIndex(p => p.isUser) > 0 
                                ? `${(allPlayers[allPlayers.findIndex(p => p.isUser) - 1].xp - user.xp).toLocaleString()} XP`
                                : '¡Eres #1!'
                            }
                        </h2>
                        <p className="stat-hint">
                            {allPlayers.findIndex(p => p.isUser) > 0 
                                ? `Para superar a ${allPlayers[allPlayers.findIndex(p => p.isUser) - 1].name}`
                                : 'Mantén tu posición'
                            }
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Leaderboard;
