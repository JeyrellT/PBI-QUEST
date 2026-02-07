import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
    Clock, Target, BookOpen, CheckCircle, 
    XCircle, HelpCircle, Play, ArrowRight,
    Sparkles, AlertCircle
} from 'lucide-react';
import { MISSION_EXPECTATIONS_TEMPLATES } from '../../data/worlds';

/**
 * MissionExpectations - Modal de expectativas claras antes de iniciar misión
 * 
 * Fundamentos pedagógicos:
 * - Teoría de la Expectativa (Vroom): Claridad sobre esfuerzo → resultado
 * - Reducción de ansiedad: Saber qué esperar reduce el estrés
 * - Contrato de aprendizaje: Compromiso mutuo claro
 * - Objetivos SMART: Específicos, medibles, alcanzables
 * 
 * @param {Object} props
 * @param {Object} props.mission - Datos de la misión
 * @param {Function} props.onStart - Callback al iniciar
 * @param {Function} props.onCancel - Callback al cancelar
 */
const MissionExpectations = ({ mission, onStart, onCancel }) => {
    const template = MISSION_EXPECTATIONS_TEMPLATES[mission?.missionType || 'practice'];

    // Close on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onCancel();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCancel]);
    
    // Datos por defecto si no están en la misión
    const expectations = {
        duration: mission?.estimatedMinutes 
            ? `${mission.estimatedMinutes} minutos` 
            : '15-20 minutos',
        difficulty: mission?.level === 1 ? '⭐ Principiante' 
            : mission?.level === 2 ? '⭐⭐ Básico'
            : mission?.level === 3 ? '⭐⭐⭐ Intermedio'
            : '⭐⭐⭐⭐ Avanzado',
        tools: ['Power BI Desktop'],
        requirements: mission?.prerequisiteKnowledge || [],
        youWillLearn: mission?.learningObjectives || [],
        youWillNotLearn: mission?.notCovered || [],
        supportAvailable: template?.features || []
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
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(10px)',
                zIndex: 1500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
            onClick={onCancel}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '24px',
                    maxWidth: '650px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                {/* Header con tipo de misión */}
                <div style={{
                    padding: '24px 24px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>{template?.icon || '🎯'}</span>
                        <div>
                            <span style={{
                                color: '#00d2ff',
                                fontSize: '12px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {template?.label || 'Misión'}
                            </span>
                            <h2 style={{ 
                                color: 'white', 
                                margin: '4px 0 0 0',
                                fontSize: '20px',
                                fontWeight: '700'
                            }}>
                                {mission?.title}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onCancel}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            fontSize: '24px',
                            padding: '4px'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Contenido */}
                <div style={{ padding: '24px' }}>
                    {/* Quick stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            background: 'rgba(0,210,255,0.1)',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <Clock size={20} color="#00d2ff" style={{ marginBottom: '4px' }} />
                            <p style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                                {expectations.duration}
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(255,215,0,0.1)',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <Target size={20} color="#ffd700" style={{ marginBottom: '4px' }} />
                            <p style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                                {expectations.difficulty}
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(34,197,94,0.1)',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center'
                        }}>
                            <Sparkles size={20} color="#22c55e" style={{ marginBottom: '4px' }} />
                            <p style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                                +{mission?.xp || 0} XP
                            </p>
                        </div>
                    </div>

                    {/* Descripción de la misión */}
                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        marginBottom: '24px',
                        padding: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        borderLeft: '3px solid #00d2ff'
                    }}>
                        {mission?.description}
                    </p>

                    {/* Recap de misión anterior */}
                    {mission?.previousMissionRecap && (
                        <details style={{
                            marginBottom: '20px',
                            background: 'rgba(168,85,247,0.08)',
                            border: '1px solid rgba(168,85,247,0.2)',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}>
                            <summary style={{
                                padding: '12px 16px',
                                color: '#a855f7',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                listStyle: 'none'
                            }}>
                                <BookOpen size={16} />
                                Recuerda lo que aprendiste...
                            </summary>
                            <div style={{
                                padding: '0 16px 12px',
                                color: 'rgba(255,255,255,0.75)',
                                fontSize: '13px',
                                lineHeight: '1.6'
                            }}>
                                {mission.previousMissionRecap}
                            </div>
                        </details>
                    )}

                    {/* Lo que aprenderás */}
                    {expectations.youWillLearn.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{
                                color: '#22c55e',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <CheckCircle size={16} />
                                Lo que aprenderás
                            </h4>
                            <ul style={{ 
                                margin: 0, 
                                paddingLeft: '20px',
                                color: 'rgba(255,255,255,0.8)'
                            }}>
                                {expectations.youWillLearn.slice(0, 4).map((item, idx) => (
                                    <li key={idx} style={{ 
                                        marginBottom: '8px',
                                        fontSize: '14px'
                                    }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Requisitos previos (si hay) */}
                    {expectations.requirements.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{
                                color: '#f59e0b',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <AlertCircle size={16} />
                                Antes de empezar, asegúrate de:
                            </h4>
                            <ul style={{ 
                                margin: 0, 
                                paddingLeft: '20px',
                                color: 'rgba(255,255,255,0.7)'
                            }}>
                                {expectations.requirements.map((item, idx) => (
                                    <li key={idx} style={{ 
                                        marginBottom: '6px',
                                        fontSize: '13px'
                                    }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Ayuda disponible */}
                    <div style={{
                        background: 'rgba(0,210,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '24px'
                    }}>
                        <h4 style={{
                            color: '#00d2ff',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <HelpCircle size={16} />
                            Ayuda disponible
                        </h4>
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '8px' 
                        }}>
                            {expectations.supportAvailable.map((feature, idx) => (
                                <span key={idx} style={{
                                    background: 'rgba(0,210,255,0.1)',
                                    border: '1px solid rgba(0,210,255,0.2)',
                                    borderRadius: '20px',
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.8)'
                                }}>
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Analogía (si existe) */}
                    {mission?.realWorldAnalogy && (
                        <div style={{
                            background: 'rgba(168,85,247,0.1)',
                            border: '1px solid rgba(168,85,247,0.2)',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '24px'
                        }}>
                            <h4 style={{
                                color: '#a855f7',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <BookOpen size={16} />
                                Para entenderlo mejor...
                            </h4>
                            <p style={{
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: '14px',
                                margin: 0,
                                lineHeight: '1.6'
                            }}>
                                {mission.realWorldAnalogy}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer con botones */}
                <div style={{
                    padding: '16px 24px 24px',
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'transparent',
                            color: 'white',
                            fontSize: '15px',
                            cursor: 'pointer'
                        }}
                    >
                        Todavía no
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onStart}
                        style={{
                            padding: '12px 32px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 15px rgba(34,197,94,0.3)'
                        }}
                    >
                        <Play size={18} />
                        ¡Estoy listo!
                        <ArrowRight size={16} />
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MissionExpectations;
