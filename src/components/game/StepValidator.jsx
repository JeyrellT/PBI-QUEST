import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, UploadCloud, Loader2 } from 'lucide-react';

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

const normalizeText = (v) => (v ?? '').toString().trim().toLowerCase();

const StepValidator = ({
    steps,
    datasetSession,
    onComplete
}) => {
    const [answers, setAnswers] = useState({});
    const [stepStatus, setStepStatus] = useState({}); // { stepId: { passed, message } }
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPhotoChecking, setIsPhotoChecking] = useState(false);

    const resolvedSteps = useMemo(() => steps || [], [steps]);

    const resolveExpected = (step) => {
        if (step.expectedFrom) {
            // expectedFrom: "answerKey.GananciaTotal" o "stepKey.invalidProfitCount"
            const fromAnswerKey = step.expectedFrom.startsWith('answerKey.')
                ? getByPath(datasetSession?.answerKey, step.expectedFrom.replace(/^answerKey\./, ''))
                : undefined;
            if (fromAnswerKey !== undefined) return fromAnswerKey;

            const fromStepKey = step.expectedFrom.startsWith('stepKey.')
                ? getByPath(datasetSession?.stepKey, step.expectedFrom.replace(/^stepKey\./, ''))
                : undefined;
            return fromStepKey;
        }
        return step.expected;
    };

    const validateStep = async (step) => {
        const userValue = answers[step.id];
        const expected = resolveExpected(step);

        if (step.type === 'photo') {
            if (!userValue) {
                setStepStatus(prev => ({
                    ...prev,
                    [step.id]: { passed: false, message: 'Sube una imagen para continuar.' }
                }));
                return false;
            }

            setIsPhotoChecking(true);
            await new Promise(r => setTimeout(r, step.simulatedDelayMs || 1800));
            setIsPhotoChecking(false);

            setStepStatus(prev => ({
                ...prev,
                [step.id]: { passed: true, message: step.successMessage || 'Revisión automática completada: correcto.' }
            }));
            return true;
        }

        if (step.type === 'mcq') {
            const ok = normalizeText(userValue) === normalizeText(expected);
            setStepStatus(prev => ({
                ...prev,
                [step.id]: { passed: ok, message: ok ? 'Correcto.' : 'Respuesta incorrecta.' }
            }));
            return ok;
        }

        if (step.type === 'multiSelect') {
            const selected = Array.isArray(userValue) ? userValue : [];
            const exp = Array.isArray(expected) ? expected : [];
            const upperSel = selected.map(s => s.toUpperCase()).sort();
            const upperExp = exp.map(s => s.toUpperCase()).sort();
            const ok = upperSel.length === upperExp.length && upperSel.every((v, i) => v === upperExp[i]);
            setStepStatus(prev => ({
                ...prev,
                [step.id]: { passed: ok, message: ok ? 'Correcto.' : 'Selecciona exactamente el conjunto correcto.' }
            }));
            return ok;
        }

        if (step.type === 'setMatch') {
            const userCodes = (userValue || '')
                .split(',')
                .map(c => c.trim().toUpperCase())
                .filter(Boolean);
            const exp = Array.isArray(expected) ? expected.map(c => c.toUpperCase()) : [];
            const ok = exp.every(code => userCodes.includes(code));
            setStepStatus(prev => ({
                ...prev,
                [step.id]: { passed: ok, message: ok ? 'Correcto.' : 'Te faltan códigos esperados.' }
            }));
            return ok;
        }

        // numeric / text (default)
        if (step.type === 'numeric') {
            const n = Number(userValue);
            if (!Number.isFinite(n)) {
                setStepStatus(prev => ({
                    ...prev,
                    [step.id]: { passed: false, message: 'Ingresa un número válido.' }
                }));
                return false;
            }
            const tol = step.tolerance ?? 0;
            const lower = expected * (1 - tol);
            const upper = expected * (1 + tol);
            const ok = n >= lower && n <= upper;
            setStepStatus(prev => ({
                ...prev,
                [step.id]: { passed: ok, message: ok ? 'Correcto.' : `Fuera de rango (±${Math.round(tol * 100)}%).` }
            }));
            return ok;
        }

        const ok = normalizeText(userValue) === normalizeText(expected);
        setStepStatus(prev => ({
            ...prev,
            [step.id]: { passed: ok, message: ok ? 'Correcto.' : 'Respuesta incorrecta.' }
        }));
        return ok;
    };

    const allPassed = resolvedSteps.length > 0 && resolvedSteps.every(s => stepStatus[s.id]?.passed);

    const step = resolvedSteps[activeIndex];
    if (!step) return null;

    const datasetMissing = resolvedSteps.some(s => s.expectedFrom) && !datasetSession;

    return (
        <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '18px',
            marginTop: '16px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                    <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem' }}>Verificación por Pasos</h3>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Paso {activeIndex + 1} de {resolvedSteps.length}
                    </p>
                </div>
                {allPassed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e' }}>
                        <CheckCircle size={18} />
                        <span style={{ fontSize: '0.85rem' }}>Pasos completos</span>
                    </div>
                )}
            </div>

            {datasetMissing && (
                <div style={{
                    marginTop: '12px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    background: 'rgba(251, 191, 36, 0.12)',
                    border: '1px solid rgba(251, 191, 36, 0.25)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                }}>
                    Descarga el dataset de la misión primero para habilitar la verificación automática.
                </div>
            )}

            <div style={{ marginTop: '14px' }}>
                <div style={{
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '10px'
                }}>
                    {step.prompt}
                </div>

                {step.type === 'mcq' && (
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {(step.options || []).map(opt => {
                            const selected = answers[step.id] === opt;
                            return (
                                <button
                                    key={opt}
                                    className={`btn ${selected ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ justifyContent: 'flex-start' }}
                                    onClick={() => setAnswers(prev => ({ ...prev, [step.id]: opt }))}
                                    disabled={datasetMissing}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                )}

                {step.type === 'multiSelect' && (
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {(step.options || []).map(opt => {
                            const arr = Array.isArray(answers[step.id]) ? answers[step.id] : [];
                            const selected = arr.includes(opt);
                            return (
                                <button
                                    key={opt}
                                    className={`btn ${selected ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ justifyContent: 'flex-start' }}
                                    onClick={() => {
                                        setAnswers(prev => {
                                            const cur = Array.isArray(prev[step.id]) ? prev[step.id] : [];
                                            const next = selected ? cur.filter(x => x !== opt) : [...cur, opt];
                                            return { ...prev, [step.id]: next };
                                        });
                                    }}
                                    disabled={datasetMissing}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                )}

                {(step.type === 'numeric' || step.type === 'text' || step.type === 'setMatch') && (
                    <input
                        value={answers[step.id] ?? ''}
                        onChange={(e) => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
                        type={step.type === 'numeric' ? 'number' : 'text'}
                        placeholder={step.placeholder || ''}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg)',
                            color: 'var(--text-main)'
                        }}
                        disabled={datasetMissing}
                    />
                )}

                {step.type === 'photo' && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px dashed var(--border)',
                        background: 'var(--bg)'
                    }}>
                        <UploadCloud size={20} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                {answers[step.id]?.name || 'Sube una captura (simulación de revisión)'}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                PNG/JPG. No se envía a servidor; se valida de forma simulada.
                            </div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                setAnswers(prev => ({ ...prev, [step.id]: f || null }));
                            }}
                        />
                    </div>
                )}

                <AnimatePresence>
                    {stepStatus[step.id] && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            style={{
                                marginTop: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: stepStatus[step.id].passed ? '#22c55e' : '#ef4444',
                                fontSize: '0.85rem'
                            }}
                        >
                            {stepStatus[step.id].passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
                            <span>{stepStatus[step.id].message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button
                    className="btn btn-secondary"
                    onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                    disabled={activeIndex === 0}
                >
                    Anterior
                </button>
                <button
                    className="btn btn-primary"
                    onClick={async () => {
                        const ok = await validateStep(step);
                        if (!ok) return;
                        if (activeIndex < resolvedSteps.length - 1) {
                            setActiveIndex(i => i + 1);
                            return;
                        }
                        if (resolvedSteps.every(s => (s.id === step.id ? ok : stepStatus[s.id]?.passed))) {
                            onComplete?.({ answers });
                        }
                    }}
                    disabled={datasetMissing || isPhotoChecking}
                >
                    {isPhotoChecking ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <Loader2 size={16} className="spin" />
                            Analizando...
                        </span>
                    ) : activeIndex < resolvedSteps.length - 1 ? 'Validar y seguir' : 'Validar paso final'}
                </button>
            </div>
        </div>
    );
};

export default StepValidator;
