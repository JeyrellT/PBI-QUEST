import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, Eye, Zap, Target,
    BookOpen, Lightbulb, ChevronDown, ChevronUp,
    CheckCircle, MessageCircle, ArrowRight, Sparkles,
    Trophy, Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import '../../styles/NeuroLearning.css';

// eslint sometimes misses JSX member usage (<motion.div>)
void motion;

// ─── Persistence helper ───────────────────────────────────────
const STORAGE_KEY = 'powerbi-quest-neuro-progress';

const loadNeuroProgress = (missionId) => {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return data[missionId] || {};
    } catch { return {}; }
};

const saveNeuroProgress = (missionId, progress) => {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        data[missionId] = { ...data[missionId], ...progress, updatedAt: Date.now() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* silent */ }
};

// ─── Mini confetti burst ──────────────────────────────────────
const miniCelebration = (colors = ['#8b5cf6', '#06b6d4', '#22c55e']) => {
    confetti({
        particleCount: 25,
        spread: 55,
        startVelocity: 20,
        gravity: 0.8,
        ticks: 60,
        colors,
        origin: { y: 0.7 }
    });
};

const bigCelebration = () => {
    const defaults = { startVelocity: 25, spread: 360, ticks: 80, zIndex: 9999 };
    confetti({ ...defaults, particleCount: 50, origin: { x: 0.3, y: 0.6 }, colors: ['#ffd700', '#ff8c00', '#8b5cf6'] });
    setTimeout(() => {
        confetti({ ...defaults, particleCount: 35, origin: { x: 0.7, y: 0.6 }, colors: ['#06b6d4', '#22c55e', '#c084fc'] });
    }, 200);
};

// ─── XP Flyout component ─────────────────────────────────────
const XPFlyout = ({ xp, visible }) => {
    if (!visible) return null;
    return (
        <motion.div
            className="neuro-xp-flyout"
            initial={{ scale: 0.5, opacity: 0, y: 0 }}
            animate={{ scale: 1.2, opacity: 1, y: -30 }}
            exit={{ scale: 0.8, opacity: 0, y: -80 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
        >
            +{xp} XP ⚡
        </motion.div>
    );
};

// ─── XP award values ─────────────────────────────────────────
const XP_REWARDS = {
    primingComplete: 15,
    chunkComplete: 5,
    allChunksComplete: 20,
    recallCorrect: 10,
    recallPartial: 5,
    recallForgot: 2,
    elaborativeAnswer: 8,
    allSectionsComplete: 30
};

/**
 * NeuroLearningPanel — Premium Panel de técnicas de neurociencia
 * 
 * Técnicas: Priming, Chunking, Elaborative Interrogation, Dual Coding,
 * Generation Effect, Retrieval Practice, Emotional Anchoring
 */

// ─── Componente: Priming Question ─────────────────────────────
const PrimingSection = ({ priming, onComplete, savedState, onSaveState }) => {
    const [answers, setAnswers] = useState(savedState?.answers || {});
    const [revealed, setRevealed] = useState(savedState?.revealed || {});
    const [allDone, setAllDone] = useState(savedState?.allDone || false);

    if (!priming?.questions?.length) return null;

    const handleReveal = (idx) => {
        const newRevealed = { ...revealed, [idx]: true };
        setRevealed(newRevealed);
        const newState = { answers, revealed: newRevealed, allDone: false };

        if (priming.questions.every((_, i) => newRevealed[i])) {
            setAllDone(true);
            newState.allDone = true;
            miniCelebration(['#8b5cf6', '#c084fc', '#a78bfa']);
            onComplete?.();
        }
        onSaveState?.({ ...newState, allDone: newState.allDone });
    };

    return (
        <div className="neuro-section priming neuro-fade-in">
            <div className="neuro-section-header">
                <div className="neuro-section-icon purple">
                    <Zap size={18} color="#a78bfa" />
                </div>
                <div>
                    <h4 className="neuro-section-title">🧠 Activa tu cerebro primero</h4>
                    <p className="neuro-section-desc">
                        Antes de aprender, piensa en lo que ya sabes. No hay respuestas incorrectas.
                    </p>
                </div>
            </div>

            {priming.questions.map((q, idx) => (
                <div key={idx} style={{ marginBottom: idx < priming.questions.length - 1 ? '14px' : 0 }}>
                    <p style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-main)',
                        fontWeight: 600,
                        marginBottom: '8px',
                        lineHeight: 1.5
                    }}>
                        {q.question}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                            type="text"
                            className="neuro-input"
                            placeholder={q.placeholder || 'Escribe lo que piensas...'}
                            value={answers[idx] || ''}
                            onChange={(e) => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                            disabled={revealed[idx]}
                            style={revealed[idx] ? {
                                borderColor: 'rgba(34, 197, 94, 0.35)',
                                background: 'rgba(34, 197, 94, 0.05)'
                            } : {}}
                        />
                        {!revealed[idx] && (
                            <button className="neuro-btn reveal" onClick={() => handleReveal(idx)}>
                                <Eye size={14} /> Revelar
                            </button>
                        )}
                        {revealed[idx] && (
                            <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0 }} />
                        )}
                    </div>
                    <AnimatePresence>
                        {revealed[idx] && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.4 }}
                                className="neuro-insight-box success"
                                style={{ marginTop: '8px' }}
                            >
                                <Lightbulb size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                                <span>{q.insight}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            <AnimatePresence>
                {allDone && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="neuro-complete-banner section"
                        style={{ marginTop: '14px' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Sparkles size={16} color="#22c55e" />
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#4ade80' }}>
                                ¡Cerebro activado! +{XP_REWARDS.primingComplete} XP
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Ahora estás listo para aprender con mayor retención
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Componente: Chunking Visual ──────────────────────────────
const ChunkingSection = ({ chunks, savedState, onSaveState, onChunkComplete }) => {
    const [activeChunk, setActiveChunk] = useState(savedState?.activeChunk || 0);
    const [completedChunks, setCompletedChunks] = useState(
        new Set(savedState?.completedChunks || [])
    );

    if (!chunks?.length) return null;

    const markDone = (idx) => {
        const newCompleted = new Set([...completedChunks, idx]);
        setCompletedChunks(newCompleted);
        miniCelebration(['#06b6d4', '#22d3ee', '#67e8f9']);
        onChunkComplete?.(XP_REWARDS.chunkComplete);

        const nextState = { activeChunk: idx + 1, completedChunks: [...newCompleted] };

        if (newCompleted.size === chunks.length) {
            onChunkComplete?.(XP_REWARDS.allChunksComplete);
        }

        if (idx < chunks.length - 1) {
            setTimeout(() => {
                setActiveChunk(idx + 1);
                onSaveState?.(nextState);
            }, 400);
        } else {
            onSaveState?.(nextState);
        }
    };

    const allComplete = completedChunks.size === chunks.length;

    return (
        <div className="neuro-section chunking neuro-fade-in">
            <div className="neuro-section-header">
                <div className="neuro-section-icon cyan">
                    <Target size={18} color="#22d3ee" />
                </div>
                <div>
                    <h4 className="neuro-section-title">📦 Aprende en bloques pequeños</h4>
                    <p className="neuro-section-desc">
                        Tu cerebro retiene mejor en grupos de 3-4 ideas. Un bloque a la vez.
                    </p>
                </div>
            </div>

            {/* Progress dots */}
            <div className="neuro-chunk-dots">
                {chunks.map((_, idx) => (
                    <div
                        key={idx}
                        className={`neuro-chunk-dot ${
                            completedChunks.has(idx) ? 'completed' :
                            idx === activeChunk ? 'active' : 'pending'
                        }`}
                        onClick={() => setActiveChunk(idx)}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeChunk}
                    initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="neuro-chunk-card">
                        <div className="neuro-chunk-title">
                            <span className="emoji">{chunks[activeChunk].emoji}</span>
                            <h5>{chunks[activeChunk].title}</h5>
                            <span className="neuro-chunk-badge">
                                {activeChunk + 1}/{chunks.length}
                            </span>
                        </div>

                        <p className="neuro-chunk-content">
                            {chunks[activeChunk].content}
                        </p>

                        {chunks[activeChunk].visualHint && (
                            <div className="neuro-insight-box visual">
                                <Eye size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                                <span>{chunks[activeChunk].visualHint}</span>
                            </div>
                        )}

                        {chunks[activeChunk].analogy && (
                            <div className="neuro-insight-box analogy">
                                <Lightbulb size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                                <span>Analogía: {chunks[activeChunk].analogy}</span>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'flex-end' }}>
                        {activeChunk > 0 && (
                            <button
                                className="neuro-btn ghost"
                                onClick={() => setActiveChunk(activeChunk - 1)}
                            >
                                ← Anterior
                            </button>
                        )}
                        {!completedChunks.has(activeChunk) ? (
                            <button className="neuro-btn done" onClick={() => markDone(activeChunk)}>
                                <CheckCircle size={14} /> Entendido
                            </button>
                        ) : activeChunk < chunks.length - 1 ? (
                            <button className="neuro-btn next" onClick={() => setActiveChunk(activeChunk + 1)}>
                                Siguiente <ArrowRight size={14} />
                            </button>
                        ) : null}
                    </div>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {allComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="neuro-complete-banner section"
                        style={{ marginTop: '14px' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Sparkles size={16} color="#22c55e" />
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#4ade80' }}>
                                ¡Todos los bloques completados! +{XP_REWARDS.allChunksComplete} XP
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Componente: Recall Challenge (Retrieval Practice) ────────
const RecallChallenge = ({ challenges, onComplete, savedState, onSaveState, onRecallRate }) => {
    const [currentIdx, setCurrentIdx] = useState(savedState?.currentIdx || 0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [selfRating, setSelfRating] = useState(null);
    const [completed, setCompleted] = useState(savedState?.completed || []);

    if (!challenges?.length) return null;

    const current = challenges[currentIdx];
    const allDone = completed.length === challenges.length;

    const handleRate = (rating) => {
        setSelfRating(rating);
        const newCompleted = [...completed, { idx: currentIdx, rating }];
        setCompleted(newCompleted);

        const xpMap = { forgot: XP_REWARDS.recallForgot, partial: XP_REWARDS.recallPartial, knew: XP_REWARDS.recallCorrect };
        onRecallRate?.(xpMap[rating] || 0);

        if (rating === 'knew') miniCelebration(['#22c55e', '#4ade80', '#86efac']);

        const nextState = { currentIdx: currentIdx + 1, completed: newCompleted };

        setTimeout(() => {
            if (currentIdx < challenges.length - 1) {
                setCurrentIdx(currentIdx + 1);
                setUserAnswer('');
                setShowAnswer(false);
                setSelfRating(null);
            } else {
                bigCelebration();
                onComplete?.(newCompleted.length);
            }
            onSaveState?.(nextState);
        }, 800);
    };

    if (allDone) {
        const knewCount = completed.filter(c => c.rating === 'knew').length;
        return (
            <div className="neuro-complete-banner final neuro-fade-in">
                <Trophy size={28} color="#ffd700" style={{ margin: '0 auto 8px', display: 'block' }} />
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#ffd700', fontWeight: 700 }}>
                    ¡Recall completado! {knewCount}/{challenges.length} recordados
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Recordar activamente es 3x más efectivo que releer (Roediger &amp; Karpicke, 2006)
                </p>
            </div>
        );
    }

    const ratingOptions = [
        { key: 'forgot', label: '😵 No lo sabía', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { key: 'partial', label: '🤔 Parcial', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { key: 'knew', label: '😊 Lo sabía', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' }
    ];

    return (
        <div className="neuro-section recall neuro-fade-in">
            <div className="neuro-section-header">
                <div className="neuro-section-icon amber">
                    <Brain size={18} color="#fbbf24" />
                </div>
                <div>
                    <h4 className="neuro-section-title">🧪 Desafío de Recall — SIN mirar arriba</h4>
                    <p className="neuro-section-desc">
                        Intenta recordar. El intento ya consolida memoria, incluso si fallas.
                    </p>
                </div>
                <span className="neuro-chunk-badge" style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    borderColor: 'rgba(245, 158, 11, 0.15)'
                }}>
                    {currentIdx + 1}/{challenges.length}
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3 }}
                >
                    <p style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        marginBottom: '10px',
                        lineHeight: 1.5
                    }}>
                        {current.question}
                    </p>

                    <input
                        type="text"
                        className="neuro-input"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Escribe lo que recuerdas..."
                        disabled={showAnswer}
                        style={showAnswer ? {
                            borderColor: 'rgba(245, 158, 11, 0.3)',
                            background: 'rgba(245, 158, 11, 0.03)'
                        } : {}}
                    />

                    {!showAnswer ? (
                        <button
                            className="neuro-btn reveal"
                            style={{ marginTop: '10px' }}
                            onClick={() => setShowAnswer(true)}
                        >
                            <Eye size={14} /> Revelar respuesta
                        </button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="neuro-insight-box success" style={{ marginTop: '10px', marginBottom: '12px' }}>
                                <CheckCircle size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                                <div>
                                    <p style={{ margin: 0, fontWeight: 700, color: '#4ade80' }}>
                                        {current.answer}
                                    </p>
                                    {current.explanation && (
                                        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            {current.explanation}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                ¿Qué tan bien lo recordaste?
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {ratingOptions.map(r => (
                                    <button
                                        key={r.key}
                                        className={`neuro-rating-btn ${selfRating === r.key ? 'selected' : ''}`}
                                        onClick={() => handleRate(r.key)}
                                        disabled={selfRating !== null}
                                        style={selfRating === r.key ? {
                                            borderColor: r.color,
                                            background: r.bg,
                                            color: r.color
                                        } : {}}
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// ─── Componente: Elaborative Interrogation (¿Por qué?) ───────
const ElaborativeSection = ({ questions, savedState, onSaveState, onElaborativeComplete }) => {
    const [answers, setAnswers] = useState(savedState?.answers || {});
    const [expanded, setExpanded] = useState(savedState?.expanded || {});

    if (!questions?.length) return null;

    const handleAnswer = (idx, value) => {
        const newAnswers = { ...answers, [idx]: value };
        setAnswers(newAnswers);
        onSaveState?.({ answers: newAnswers, expanded });

        // Award XP when answer crosses 10 char threshold
        if (value.length > 10 && (!answers[idx] || answers[idx].length <= 10)) {
            onElaborativeComplete?.(XP_REWARDS.elaborativeAnswer);
        }
    };

    const handleExpand = (idx) => {
        const newExpanded = { ...expanded, [idx]: true };
        setExpanded(newExpanded);
        onSaveState?.({ answers, expanded: newExpanded });
    };

    const allAnswered = questions.every((_, i) => answers[i]?.length > 10);

    return (
        <div className="neuro-section elaborative neuro-fade-in">
            <div className="neuro-section-header">
                <div className="neuro-section-icon pink">
                    <MessageCircle size={18} color="#f472b6" />
                </div>
                <div>
                    <h4 className="neuro-section-title">🤔 Piensa más profundo — ¿Por qué?</h4>
                    <p className="neuro-section-desc">
                        Explicarte &quot;por qué&quot; duplica la retención (Pressley et al., 1992)
                    </p>
                </div>
            </div>

            {questions.map((q, idx) => (
                <div key={idx} style={{ marginBottom: '14px' }}>
                    <p style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-main)',
                        fontWeight: 600,
                        marginBottom: '6px',
                        lineHeight: 1.5
                    }}>
                        {q.question}
                    </p>
                    <textarea
                        className="neuro-input neuro-textarea"
                        value={answers[idx] || ''}
                        onChange={(e) => handleAnswer(idx, e.target.value)}
                        placeholder="Explica con tus propias palabras..."
                        rows={2}
                    />
                    {answers[idx]?.length > 10 && !expanded[idx] && (
                        <button
                            className="neuro-btn reveal"
                            onClick={() => handleExpand(idx)}
                            style={{ marginTop: '6px' }}
                        >
                            <Lightbulb size={14} /> Ver explicación del experto
                        </button>
                    )}
                    <AnimatePresence>
                        {expanded[idx] && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="neuro-insight-box expert"
                                style={{ marginTop: '8px' }}
                            >
                                <Lightbulb size={14} style={{ marginTop: '2px', flexShrink: 0, color: '#f472b6' }} />
                                <span>{q.expertAnswer}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            <AnimatePresence>
                {allAnswered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="neuro-complete-banner section"
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Star size={16} color="#f472b6" />
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f472b6' }}>
                                ¡Reflexión profunda completada!
                            </span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Explicar con tus palabras crea conexiones neuronales más fuertes
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Componente: Cognitive Load Meter ─────────────────────────
const CognitiveLoadMeter = ({ level, maxConcepts }) => {
    if (!level) return null;

    const levels = {
        low: { label: 'Baja', color: '#22c55e', emoji: '🟢', width: '33%', tip: 'Ideal para comenzar — relájate y absorbe' },
        medium: { label: 'Media', color: '#f59e0b', emoji: '🟡', width: '66%', tip: 'Concentración activa — toma notas' },
        high: { label: 'Alta', color: '#ef4444', emoji: '🔴', width: '100%', tip: 'Descansos cada 15min — divide en sesiones' }
    };

    const cfg = levels[level] || levels.low;

    return (
        <div className="neuro-load-meter">
            <Brain size={16} color={cfg.color} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                }}>
                    <span>Carga cognitiva: {cfg.emoji} {cfg.label}</span>
                    {maxConcepts && <span>Máx {maxConcepts} conceptos</span>}
                </div>
                <div className="neuro-load-bar">
                    <div
                        className="neuro-load-fill"
                        style={{ width: cfg.width, background: cfg.color }}
                    />
                </div>
                <p style={{ margin: '5px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)', opacity: 0.8 }}>
                    💡 {cfg.tip}
                </p>
            </div>
        </div>
    );
};

// ─── Componente Principal ─────────────────────────────────────
const NeuroLearningPanel = ({ mission, onAllComplete }) => {
    const missionId = mission?.id;
    const [isOpen, setIsOpen] = useState(true);
    const [primingDone, setPrimingDone] = useState(false);
    const [recallDone, setRecallDone] = useState(false);
    const [totalXP, setTotalXP] = useState(0);
    const [showXPFlyout, setShowXPFlyout] = useState(false);
    const [lastXP, setLastXP] = useState(0);
    const [savedProgress] = useState(() => loadNeuroProgress(missionId));

    const neuro = mission?.neuroLearning;
    if (!neuro) return null;

    const hasPriming = neuro.priming?.questions?.length > 0;
    const hasChunks = neuro.chunks?.length > 0;
    const hasRecall = neuro.recallChallenges?.length > 0;
    const hasElaborative = neuro.elaborativeQuestions?.length > 0;
    const hasAnyContent = hasPriming || hasChunks || hasRecall || hasElaborative;
    if (!hasAnyContent) return null;

    const sections = [
        hasPriming && 'priming',
        hasChunks && 'chunking',
        hasElaborative && 'elaborative',
        hasRecall && 'recall'
    ].filter(Boolean);

    const completedSections = [
        primingDone && 'priming',
        recallDone && 'recall'
    ].filter(Boolean);
    const progress = sections.length > 0 ? (completedSections.length / sections.length) * 100 : 0;

    const addXP = (amount) => {
        setTotalXP(prev => prev + amount);
        setLastXP(amount);
        setShowXPFlyout(true);
        setTimeout(() => setShowXPFlyout(false), 1500);
        saveNeuroProgress(missionId, { totalXP: totalXP + amount });
    };

    const saveSectionState = (section, state) => {
        saveNeuroProgress(missionId, { [section]: state });
    };

    return (
        <div className="neuro-panel" style={{ marginTop: '20px' }}>
            {/* Cognitive Load Meter */}
            <CognitiveLoadMeter
                level={neuro.cognitiveLoad}
                maxConcepts={mission.maxConceptsIntroduced}
            />

            {/* Collapsible Header */}
            <div
                className={`neuro-header ${isOpen ? 'open' : 'closed'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="neuro-header-left">
                    <div className="neuro-brain-icon">
                        <Brain size={22} color="#a78bfa" />
                    </div>
                    <div>
                        <h3 className="neuro-header-title">
                            Aprendizaje basado en Neurociencia
                        </h3>
                        <p className="neuro-header-subtitle">
                            {neuro.techniquesSummary || 'Priming → Chunking → Práctica → Recall'}
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {totalXP > 0 && (
                        <div className="neuro-xp-badge">
                            <Zap size={12} /> {totalXP} XP
                        </div>
                    )}
                    {isOpen
                        ? <ChevronUp size={18} color="var(--text-muted)" />
                        : <ChevronDown size={18} color="var(--text-muted)" />
                    }
                </div>
            </div>

            {/* Progress Bar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="neuro-progress-bar">
                            <div className="neuro-progress-track">
                                <div
                                    className="neuro-progress-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="neuro-progress-label">
                                {completedSections.length}/{sections.length} secciones
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="neuro-body">
                            {/* 1. Priming */}
                            {hasPriming && (
                                <PrimingSection
                                    priming={neuro.priming}
                                    onComplete={() => {
                                        setPrimingDone(true);
                                        addXP(XP_REWARDS.primingComplete);
                                    }}
                                    savedState={savedProgress?.priming}
                                    onSaveState={(s) => saveSectionState('priming', s)}
                                />
                            )}

                            {/* 2. Chunking — shown after priming or immediately */}
                            {hasChunks && (primingDone || !hasPriming) && (
                                <ChunkingSection
                                    chunks={neuro.chunks}
                                    savedState={savedProgress?.chunking}
                                    onSaveState={(s) => saveSectionState('chunking', s)}
                                    onChunkComplete={(xp) => addXP(xp)}
                                />
                            )}

                            {/* 3. Elaborative Interrogation */}
                            {hasElaborative && (
                                <ElaborativeSection
                                    questions={neuro.elaborativeQuestions}
                                    savedState={savedProgress?.elaborative}
                                    onSaveState={(s) => saveSectionState('elaborative', s)}
                                    onElaborativeComplete={(xp) => addXP(xp)}
                                />
                            )}

                            {/* 4. Recall Challenge — at the end */}
                            {hasRecall && (
                                <RecallChallenge
                                    challenges={neuro.recallChallenges}
                                    onComplete={(count) => {
                                        setRecallDone(true);
                                        addXP(XP_REWARDS.allSectionsComplete);
                                        onAllComplete?.({ recallCount: count, neuroXP: totalXP });
                                    }}
                                    savedState={savedProgress?.recall}
                                    onSaveState={(s) => saveSectionState('recall', s)}
                                    onRecallRate={(xp) => addXP(xp)}
                                />
                            )}

                            {/* Neuroscience fact */}
                            {neuro.scienceFact && (
                                <div className="neuro-science-fact">
                                    <BookOpen size={14} style={{ marginTop: '2px', flexShrink: 0 }} color="#6366f1" />
                                    <span>
                                        <strong>Dato científico:</strong> {neuro.scienceFact}
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* XP Flyout */}
            <AnimatePresence>
                {showXPFlyout && <XPFlyout xp={lastXP} visible={showXPFlyout} />}
            </AnimatePresence>
        </div>
    );
};

export default NeuroLearningPanel;