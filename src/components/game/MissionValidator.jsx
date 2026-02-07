import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, XCircle, AlertTriangle, HelpCircle,
    Target, Lightbulb, RotateCcw, Trophy, Sparkles,
    ChevronDown, ChevronUp, Calculator, TrendingDown, BookOpen,
    Skull
} from 'lucide-react';
import confetti from 'canvas-confetti';
import StepValidator from './StepValidator';
import PremiumTipsPanel from '../common/PremiumTipsPanel';
import MissionInsights from '../common/MissionInsights';
import NeuroLearningPanel from '../common/NeuroLearningPanel';
import { calculateMissionScore } from '../../utils/calculateMissionScore';

// eslint sometimes misses JSX member usage (<motion.div>)
void motion;

/**
 * MissionValidator - Componente para validar respuestas de misiones
 * Permite al usuario ingresar sus respuestas y compara con el answer key
 * Trackea respuestas incorrectas para penalización en scoring
 */
const MissionValidator = ({ mission, datasetSession, onValidationComplete }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [validationResult, setValidationResult] = useState(null);
    const [showHints, setShowHints] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
    const [stepsPassed, setStepsPassed] = useState(false);

    // NUEVO: Estados para paneles premium
    const [showPremiumTips, setShowPremiumTips] = useState(false);
    const [showInsights, setShowInsights] = useState(false);

    // NUEVO: Trackear respuestas incorrectas acumuladas
    const [totalWrongAnswers, setTotalWrongAnswers] = useState(0);

    // Estado para revelar respuestas después de 3 intentos
    const [revealedAnswers, setRevealedAnswers] = useState(false);

    // Estados para sistema de villano (DataRescue)
    const [corruptionLevel, setCorruptionLevel] = useState(0);
    const [villainMessage, setVillainMessage] = useState(null);

    const validation = mission?.validation;
    const verification = mission?.verification;
    const missionSteps = mission?.missionSteps;

    const getByPath = (obj, path) => {
        if (!path) return undefined;
        const parts = path.split('.').filter(Boolean);
        let cur = obj;
        for (const p of parts) {
            if (cur == null) return undefined;
            cur = cur[p];
        }
        return cur;
    };

    const resolveExpected = (expectedFrom, fallback) => {
        if (!expectedFrom) return fallback;
        if (expectedFrom.startsWith('answerKey.')) {
            const v = getByPath(datasetSession?.answerKey, expectedFrom.replace(/^answerKey\./, ''));
            return v !== undefined ? v : fallback;
        }
        if (expectedFrom.startsWith('stepKey.')) {
            const v = getByPath(datasetSession?.stepKey, expectedFrom.replace(/^stepKey\./, ''));
            return v !== undefined ? v : fallback;
        }
        return fallback;
    };

    // Si no hay validación ni verificación definida, mostrar mensaje
    if (!validation && !verification) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginTop: '20px'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <AlertTriangle size={24} color="var(--accent-gold)" />
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--text-main)' }}>
                            Validación Manual
                        </h3>
                        <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Esta misión requiere revisión manual. Compara tu trabajo con el resultado esperado
                            y marca como completada cuando estés satisfecho.
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Obtener campos de validación según el tipo
    const getValidationFields = () => {
        if (verification) {
            return verification.map((v, index) => ({
                id: `q_${index}`,
                label: v.question,
                type: v.type === 'number' ? 'number' : (v.options ? 'choice' : 'text'),
                expected: v.answer,
                tolerance: v.type === 'number' ? 0.05 : 0, // Default 5% tolerance for numbers
                hint: v.hint,
                options: v.options || null,
                acceptedAnswers: v.acceptedAnswers || null,
                academyHint: v.academyHint || null
            }));
        }

        switch (validation.type) {
            case 'numeric':
                return [{
                    id: validation.measureId,
                    label: validation.measureId.replace(/([A-Z])/g, ' $1').trim(),
                    type: 'number',
                    expected: resolveExpected(validation.expectedFrom, validation.expectedValue),
                    tolerance: validation.tolerance
                }];
            case 'composite':
                return validation.measures.map(m => ({
                    id: m.id,
                    label: m.id.replace(/([A-Z])/g, ' $1').trim(),
                    type: 'number',
                    expected: resolveExpected(m.expectedFrom, m.expectedValue),
                    tolerance: m.tolerance
                }));
            case 'setMatch':
                return [{
                    id: validation.measureId,
                    label: 'Códigos detectados (separados por coma)',
                    type: 'text',
                    expected: resolveExpected(validation.expectedSetFrom, validation.expectedSet)
                }];
            case 'confusionMatrix':
                return [{
                    id: validation.measureId,
                    label: validation.measureId.replace(/([A-Z])/g, ' $1').trim(),
                    type: 'number',
                    expected: resolveExpected(validation.expectedFrom, validation.expectedValue),
                    tolerance: validation.tolerance
                }];
            default:
                return [];
        }
    };

    const fields = getValidationFields();

    // Manejar cambio en inputs
    const handleInputChange = (fieldId, value) => {
        setUserAnswers(prev => ({
            ...prev,
            [fieldId]: value
        }));
        setValidationResult(null);
    };

    // Validar respuestas
    const validateAnswers = () => {
        if (missionSteps?.length && !stepsPassed) {
            setValidationResult({
                results: {},
                allCorrect: false,
                error: 'Completa la verificación por pasos antes de validar.'
            });
            return;
        }

        // Verificar datos faltantes (por si no descargaron el dataset)
        const missingData = fields.some(f => f.expected === undefined);
        if (missingData) {
            setValidationResult({
                results: {},
                allCorrect: false,
                error: 'Faltan datos para validar. Asegúrate de haber descargado el dataset.'
            });
            return;
        }

        setAttempts(prev => prev + 1);
        const results = {};
        let allCorrect = true;
        let wrongInThisAttempt = 0;

        fields.forEach(field => {
            const userValue = userAnswers[field.id];
            let isCorrect = false;

            if (field.type === 'number') {
                const numValue = parseFloat(userValue);
                if (!isNaN(numValue)) {
                    const tolerance = field.tolerance || 0;
                    const lowerBound = field.expected * (1 - tolerance);
                    const upperBound = field.expected * (1 + tolerance);
                    isCorrect = numValue >= lowerBound && numValue <= upperBound;
                }
            } else if (field.type === 'choice') {
                // Para selección de opciones (case insensitive)
                isCorrect = userValue?.trim().toLowerCase() === field.expected.toString().toLowerCase();
            } else if (field.type === 'text') {
                if (Array.isArray(field.expected)) {
                    // Para setMatch antiguo
                    const userCodes = userValue?.split(',').map(c => c.trim().toUpperCase()) || [];
                    const expectedCodes = field.expected.map(c => c.toUpperCase());
                    isCorrect = expectedCodes.every(code => userCodes.includes(code));
                } else {
                    // Para verificación simple de texto (case insensitive)
                    const userNorm = (userValue || '').trim().toLowerCase();
                    const expectedNorm = field.expected.toString().toLowerCase();
                    isCorrect = userNorm === expectedNorm;

                    // Verificar respuestas alternativas aceptadas
                    if (!isCorrect && field.acceptedAnswers) {
                        isCorrect = field.acceptedAnswers.some(alt =>
                            userNorm === alt.toLowerCase().trim()
                        );
                    }
                }
            }

            results[field.id] = {
                userValue,
                expected: field.expected,
                isCorrect,
                tolerance: field.tolerance
            };

            if (!isCorrect) {
                allCorrect = false;
                wrongInThisAttempt++;
            }
        });

        // Acumular respuestas incorrectas para penalización
        if (wrongInThisAttempt > 0) {
            setTotalWrongAnswers(prev => prev + wrongInThisAttempt);
        }

        setValidationResult({ results, allCorrect, wrongInThisAttempt });

        // Logic for DataRescue Villain
        if (mission.villainPenalty?.active) {
            if (!allCorrect) {
                // Increase corruption on failure
                const newCorruption = Math.min(100, corruptionLevel + 15);
                setCorruptionLevel(newCorruption);

                // Trigger random taunt
                const taunts = mission.villainPenalty.taunts || ["¡Fallaste! ¡Más datos corruptos!"];
                const taunt = taunts[Math.floor(Math.random() * taunts.length)];
                setVillainMessage(taunt);

                // Clear taunt after 3 seconds
                setTimeout(() => setVillainMessage(null), 3500);
            }
        }

        if (allCorrect) {
            // Celebración!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Obtener perfil de scoring del mundo (si existe)
            const scoringProfile = mission.scoringProfile || 'office-standard';

            // Calcular score usando el nuevo sistema con penalización de corrupción
            const corruptionPenalty = corruptionLevel / 100;
            const totalWrong = totalWrongAnswers + wrongInThisAttempt;

            const scoreResult = calculateMissionScore(
                mission.xp,
                scoringProfile,
                {
                    hints: hintsUsed,
                    attempts: attempts,
                    wrongAnswers: totalWrong
                }
            );

            // Aplicar penalización extra de corrupción si existe
            const finalMultiplier = Math.max(0.1, scoreResult.multiplier - corruptionPenalty);
            const finalXP = Math.round(mission.xp * finalMultiplier);

            if (onValidationComplete) {
                onValidationComplete({
                    success: true,
                    attempts,
                    hintsUsed,
                    wrongAnswers: totalWrong,
                    xpEarned: finalXP,
                    bonusMultiplier: finalMultiplier,
                    isPerfect: scoreResult.isPerfect && corruptionLevel === 0,
                    breakdown: scoreResult.breakdown,
                    skillsDemo: mission.skillsDemo || []
                });
            }
        }
    };

    // Obtener hint progresivo
    const getHint = () => {
        setShowHints(true);
        setHintsUsed(prev => prev + 1);
    };

    // Reset
    const resetValidation = () => {
        setUserAnswers({});
        setValidationResult(null);
        setShowHints(false);
        setStepsPassed(false);
        setCorruptionLevel(0);
        setVillainMessage(null);
        setTotalWrongAnswers(0);
        setAttempts(0);
        setHintsUsed(0);
        setRevealedAnswers(false);
    };

    // Generar hints basados en los tips de la misión
    const hints = mission?.tips || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                marginTop: '20px',
                overflow: 'hidden'
            }}

        >
            {/* Villain Message Overlay */}
            < AnimatePresence >
                {villainMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            background: '#ef4444',
                            color: 'white',
                            padding: '12px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Skull size={20} />
                        {villainMessage}
                    </motion.div>
                )}
            </AnimatePresence >

            {/* Header */}
            < div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: validationResult?.allCorrect
                        ? 'linear-gradient(90deg, rgba(34, 197, 94, 0.1), transparent)'
                        : 'transparent',
                    borderBottom: isExpanded ? '1px solid var(--border)' : 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        background: validationResult?.allCorrect
                            ? 'rgba(34, 197, 94, 0.2)'
                            : 'rgba(168, 85, 247, 0.2)',
                        borderRadius: '10px',
                        padding: '10px'
                    }}>
                        {validationResult?.allCorrect
                            ? <Trophy size={20} color="#22c55e" />
                            : <Target size={20} color="#a855f7" />
                        }
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>
                            Validación de Respuestas
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {validationResult?.allCorrect
                                ? '¡Todas las respuestas son correctas!'
                                : `${fields.length} campo(s) a validar • Intento ${attempts || 0}`
                            }
                        </p>

                        {/* Corruption Bar if active */}
                        {mission.villainPenalty?.active && (
                            <div style={{ marginTop: '6px', width: '100%', maxWidth: '200px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#ef4444', marginBottom: '2px' }}>
                                    <span>Corrupción: {corruptionLevel}%</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <motion.div
                                        animate={{ width: `${corruptionLevel}%` }}
                                        style={{ height: '100%', background: '#ef4444' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div >

            {/* Content */}
            < AnimatePresence >
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '24px' }}>
                            {/* Step-based verification (progressive) */}
                            {missionSteps?.length > 0 && (
                                <StepValidator
                                    steps={missionSteps}
                                    datasetSession={datasetSession}
                                    onComplete={() => setStepsPassed(true)}
                                />
                            )}

                            {/* NeuroLearning Panel — técnicas de neurociencia */}
                            {mission?.neuroLearning && (
                                <NeuroLearningPanel
                                    mission={mission}
                                    onAllComplete={(stats) => {
                                        // Bonus: students who complete neuro panel get subtle positive reinforcement
                                        console.log('NeuroLearning complete:', stats);
                                    }}
                                />
                            )}

                            {/* Read-first banner for guided learning */}
                            {mission?.readFirstMessage && (
                                <div style={{
                                    marginBottom: '20px',
                                    padding: '16px 20px',
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.06))',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '12px',
                                    backdropFilter: 'blur(8px)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.03), transparent)',
                                        animation: 'neuro-shimmer 4s infinite',
                                        pointerEvents: 'none'
                                    }} />
                                    <div style={{
                                        background: 'rgba(59, 130, 246, 0.15)',
                                        borderRadius: '10px',
                                        padding: '8px',
                                        display: 'flex',
                                        flexShrink: 0,
                                        border: '1px solid rgba(59, 130, 246, 0.2)'
                                    }}>
                                        <BookOpen size={18} color="#60a5fa" />
                                    </div>
                                    <div>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '0.88rem',
                                            fontWeight: 700,
                                            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                            📖 Lee antes de responder
                                        </p>
                                        <p style={{
                                            margin: '4px 0 0 0',
                                            fontSize: '0.85rem',
                                            color: 'var(--text-main)',
                                            lineHeight: 1.55,
                                            opacity: 0.9
                                        }}>
                                            {mission.readFirstMessage}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Required Cards */}
                            {validation?.requiredCards && (
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--text-muted)',
                                        marginBottom: '8px'
                                    }}>
                                        Funciones DAX requeridas:
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {validation.requiredCards.map(card => (
                                            <span
                                                key={card}
                                                style={{
                                                    background: 'rgba(168, 85, 247, 0.2)',
                                                    border: '1px solid rgba(168, 85, 247, 0.3)',
                                                    borderRadius: '6px',
                                                    padding: '4px 10px',
                                                    fontSize: '0.8rem',
                                                    color: '#a855f7',
                                                    fontFamily: 'monospace'
                                                }}
                                            >
                                                {card}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input Fields */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {fields.map(field => {
                                    const result = validationResult?.results?.[field.id];
                                    const isCorrect = result?.isCorrect;
                                    const hasResult = result !== undefined;

                                    return (
                                        <div key={field.id}>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginBottom: '8px',
                                                fontSize: '0.9rem',
                                                color: 'var(--text-main)'
                                            }}>
                                                <Calculator size={16} color="var(--text-muted)" />
                                                {field.label}
                                                {field.tolerance > 0 && (
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        color: 'var(--text-muted)'
                                                    }}>
                                                        (±{field.tolerance * 100}% tolerancia)
                                                    </span>
                                                )}
                                            </label>
                                            {/* Choice buttons */}
                                            {field.type === 'choice' && field.options ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {field.options.map(option => {
                                                        const isSelected = userAnswers[field.id] === option;
                                                        const optionCorrect = hasResult && isSelected && isCorrect;
                                                        const optionWrong = hasResult && isSelected && !isCorrect;
                                                        const optionIsAnswer = hasResult && !isCorrect && option === field.expected;
                                                        return (
                                            <button
                                                                key={option}
                                                                onClick={() => handleInputChange(field.id, option)}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    padding: '12px 16px',
                                                                    background: optionCorrect
                                                                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(34, 197, 94, 0.06))'
                                                                        : optionWrong
                                                                            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.06))'
                                                                            : optionIsAnswer
                                                                                ? 'rgba(34, 197, 94, 0.06)'
                                                                                : isSelected
                                                                                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(139, 92, 246, 0.08))'
                                                                                    : 'rgba(255, 255, 255, 0.03)',
                                                                    border: `1.5px solid ${
                                                                        optionCorrect ? '#22c55e'
                                                                        : optionWrong ? '#ef4444'
                                                                        : optionIsAnswer ? '#22c55e60'
                                                                        : isSelected ? '#a855f7'
                                                                        : 'rgba(255, 255, 255, 0.08)'
                                                                    }`,
                                                                    borderRadius: '12px',
                                                                    color: 'var(--text-main)',
                                                                    fontSize: '0.93rem',
                                                                    cursor: 'pointer',
                                                                    textAlign: 'left',
                                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                    backdropFilter: 'blur(4px)',
                                                                    boxShadow: isSelected && !hasResult
                                                                        ? '0 0 0 3px rgba(168, 85, 247, 0.1)'
                                                                        : optionCorrect
                                                                            ? '0 0 12px rgba(34, 197, 94, 0.15)'
                                                                            : 'none'
                                                                }}
                                                            >
                                                                <span>{option}</span>
                                                                {optionCorrect && <CheckCircle size={18} color="#22c55e" />}
                                                                {optionWrong && <XCircle size={18} color="#ef4444" />}
                                                                {optionIsAnswer && <CheckCircle size={18} color="#22c55e60" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                /* Number and text inputs */
                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        type={field.type === 'number' ? 'number' : 'text'}
                                                        value={userAnswers[field.id] || ''}
                                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                        placeholder={field.type === 'number'
                                                            ? 'Ingresa el valor calculado...'
                                                            : 'Escribe tu respuesta...'}
                                                        style={{
                                                            width: '100%',
                                                            padding: '12px 40px 12px 16px',
                                                            background: 'rgba(255, 255, 255, 0.04)',
                                                            border: `1.5px solid ${hasResult
                                                                ? (isCorrect ? '#22c55e' : '#ef4444')
                                                                : 'rgba(255, 255, 255, 0.1)'
                                                                }`,
                                                            borderRadius: '12px',
                                                            color: 'var(--text-main)',
                                                            fontSize: '0.95rem',
                                                            outline: 'none',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            backdropFilter: 'blur(4px)',
                                                            boxShadow: hasResult
                                                                ? (isCorrect ? '0 0 12px rgba(34, 197, 94, 0.1)' : '0 0 12px rgba(239, 68, 68, 0.1)')
                                                                : 'none'
                                                        }}
                                                    />
                                                    {hasResult && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            right: '12px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)'
                                                        }}>
                                                            {isCorrect
                                                                ? <CheckCircle size={20} color="#22c55e" />
                                                                : <XCircle size={20} color="#ef4444" />
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {hasResult && !isCorrect && (
                                                <>
                                                    <p style={{
                                                        margin: '8px 0 0 0',
                                                        fontSize: '0.8rem',
                                                        color: '#ef4444'
                                                    }}>
                                                        Valor esperado: {Array.isArray(result.expected)
                                                            ? result.expected.join(', ')
                                                            : (result.expected?.toLocaleString() || 'N/A')
                                                        }
                                                    </p>
                                                    {field.hint && (
                                                        <div style={{
                                                            margin: '6px 0 0 0',
                                                            fontSize: '0.8rem',
                                                            color: '#fbbf24',
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: '8px',
                                                            padding: '8px 12px',
                                                            borderRadius: '10px',
                                                            background: 'rgba(245, 158, 11, 0.06)',
                                                            border: '1px solid rgba(245, 158, 11, 0.12)'
                                                        }}>
                                                            💡 {field.hint}
                                                        </div>
                                                    )}
                                                    {field.academyHint && (
                                                        <div style={{
                                                            margin: '6px 0 0 0',
                                                            fontSize: '0.8rem',
                                                            color: '#60a5fa',
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: '8px',
                                                            padding: '8px 12px',
                                                            borderRadius: '10px',
                                                            background: 'rgba(59, 130, 246, 0.06)',
                                                            border: '1px solid rgba(59, 130, 246, 0.12)'
                                                        }}>
                                                            📖 {field.academyHint}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Hints Section */}
                            <AnimatePresence>
                                {showHints && hintsUsed > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{
                                            marginTop: '20px',
                                            padding: '16px',
                                            background: 'rgba(255, 184, 0, 0.1)',
                                            border: '1px solid rgba(255, 184, 0, 0.3)',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '12px'
                                        }}>
                                            <Lightbulb size={18} color="#ffb800" />
                                            <span style={{
                                                fontWeight: 600,
                                                color: '#ffb800',
                                                fontSize: '0.9rem'
                                            }}>
                                                Pista {hintsUsed} de {hints.length}
                                            </span>
                                        </div>
                                        {hints.slice(0, hintsUsed).map((hint, idx) => (
                                            <p
                                                key={idx}
                                                style={{
                                                    margin: idx === 0 ? 0 : '8px 0 0 0',
                                                    fontSize: '0.85rem',
                                                    color: 'var(--text-main)'
                                                }}
                                            >
                                                • {hint}
                                            </p>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {validationResult?.error && (
                                <div style={{
                                    marginBottom: '16px',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#ef4444',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <AlertTriangle size={18} />
                                    {validationResult.error}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginTop: '24px',
                                flexWrap: 'wrap'
                            }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={validateAnswers}
                                    disabled={Object.keys(userAnswers).length === 0}
                                    style={{
                                        flex: 1,
                                        padding: '14px 24px',
                                        background: validationResult?.allCorrect
                                            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                            : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        opacity: Object.keys(userAnswers).length === 0 ? 0.5 : 1
                                    }}
                                >
                                    {validationResult?.allCorrect ? (
                                        <>
                                            <Sparkles size={18} />
                                            ¡Completado!
                                        </>
                                    ) : (
                                        <>
                                            <Target size={18} />
                                            Validar Respuestas
                                        </>
                                    )}
                                </motion.button>

                                {!validationResult?.allCorrect && hintsUsed < hints.length && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={getHint}
                                        style={{
                                            padding: '14px 20px',
                                            background: 'rgba(255, 184, 0, 0.1)',
                                            border: '1px solid rgba(255, 184, 0, 0.3)',
                                            borderRadius: '10px',
                                            color: '#ffb800',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <HelpCircle size={18} />
                                        Pista (-10% XP)
                                    </motion.button>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={resetValidation}
                                    style={{
                                        padding: '14px 20px',
                                        background: 'transparent',
                                        border: '1px solid var(--border)',
                                        borderRadius: '10px',
                                        color: 'var(--text-muted)',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <RotateCcw size={18} />
                                    Reset
                                </motion.button>

                                {/* Botón de Tips Premium */}
                                {mission?.premiumTips && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowPremiumTips(!showPremiumTips)}
                                        style={{
                                            padding: '14px 20px',
                                            background: showPremiumTips 
                                                ? 'linear-gradient(135deg, #ffd700, #f59e0b)'
                                                : 'rgba(255, 215, 0, 0.1)',
                                            border: '1px solid rgba(255, 215, 0, 0.3)',
                                            borderRadius: '10px',
                                            color: showPremiumTips ? '#000' : '#ffd700',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <Lightbulb size={18} />
                                        Ayuda Premium
                                    </motion.button>
                                )}

                                {/* Botón de Insights */}
                                {(mission?.whyItMatters || mission?.selfAssessment) && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowInsights(!showInsights)}
                                        style={{
                                            padding: '14px 20px',
                                            background: showInsights 
                                                ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                                                : 'rgba(99, 102, 241, 0.1)',
                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                            borderRadius: '10px',
                                            color: showInsights ? '#fff' : '#a5b4fc',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <BookOpen size={18} />
                                        ¿Por qué?
                                    </motion.button>
                                )}
                            </div>

                            {/* Botón "Revelar respuestas" - aparece después de 3 intentos fallidos */}
                            {attempts >= 3 && !revealedAnswers && !validationResult?.allCorrect && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => setRevealedAnswers(true)}
                                    style={{
                                        width: '100%',
                                        marginTop: '12px',
                                        padding: '12px 24px',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '12px',
                                        color: '#ef4444',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <HelpCircle size={16} />
                                    Revelar respuestas (-50% XP)
                                </motion.button>
                            )}

                            {/* Panel de respuestas reveladas */}
                            {revealedAnswers && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={{
                                        marginTop: '16px',
                                        padding: '16px',
                                        background: 'rgba(239, 68, 68, 0.05)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        borderRadius: '12px'
                                    }}
                                >
                                    <p style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '12px', fontWeight: '600' }}>
                                        No pasa nada, lo importante es aprender. Revisa los conceptos:
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                                        {fields.map(field => (
                                            <div key={field.id} style={{
                                                padding: '8px 12px',
                                                background: 'rgba(255,255,255,0.03)',
                                                borderRadius: '8px',
                                                fontSize: '0.85rem'
                                            }}>
                                                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{field.label}</span>
                                                <br />
                                                <span style={{ color: '#22c55e', fontWeight: '600' }}>
                                                    Respuesta: {field.options ? field.expected : field.expected.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (onValidationComplete) {
                                                const penalizedXP = Math.round((mission?.xp || 100) * 0.5);
                                                onValidationComplete({
                                                    success: true,
                                                    attempts,
                                                    hintsUsed: hintsUsed + 1,
                                                    wrongAnswers: totalWrongAnswers,
                                                    xpEarned: penalizedXP,
                                                    bonusMultiplier: 0.5,
                                                    isPerfect: false,
                                                    breakdown: { revealPenalty: true },
                                                    skillsDemo: mission?.skillsDemo || [],
                                                    revealedAnswer: true
                                                });
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontSize: '0.95rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Completar misión con respuestas reveladas (+{Math.round((mission?.xp || 100) * 0.5)} XP)
                                    </button>
                                </motion.div>
                            )}

                            {/* Panel de Tips Premium */}
                            <AnimatePresence>
                                {showPremiumTips && mission?.premiumTips && (
                                    <PremiumTipsPanel 
                                        premiumTips={mission.premiumTips}
                                        onClose={() => setShowPremiumTips(false)}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Panel de Insights */}
                            <AnimatePresence>
                                {showInsights && (
                                    <MissionInsights
                                        whyItMatters={mission?.whyItMatters}
                                        selfAssessment={mission?.selfAssessment}
                                        interfaceGuide={mission?.interfaceGuide}
                                        onClose={() => setShowInsights(false)}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Attempt Info */}
                            {attempts > 0 && !validationResult?.allCorrect && (
                                <p style={{
                                    marginTop: '16px',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-muted)',
                                    textAlign: 'center'
                                }}>
                                    Intentos: {attempts} • Pistas usadas: {hintsUsed} •
                                    XP potencial: {Math.round(mission.xp * Math.max(0.5, 1 - hintsUsed * 0.1 - Math.max(0, (attempts - 1) * 0.05)))}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </motion.div >
    );
};

export default MissionValidator;
