import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './MissionInsights.css';

/**
 * Componente que muestra insights profundos de la misión:
 * - Por qué importa este tema
 * - Auto-evaluación
 * - Guía de interfaz
 */
const MissionInsights = ({ 
    whyItMatters, 
    selfAssessment, 
    interfaceGuide,
    onClose 
}) => {
    const [activeTab, setActiveTab] = useState('why');
    const [completedChecks, setCompletedChecks] = useState({});

    const handleCheckComplete = (index) => {
        setCompletedChecks(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const completionPercentage = selfAssessment 
        ? Math.round((Object.values(completedChecks).filter(Boolean).length / selfAssessment.length) * 100)
        : 0;

    const tabs = [
        { id: 'why', label: '¿Por qué importa?', icon: '🎯', available: !!whyItMatters },
        { id: 'self', label: 'Auto-evaluación', icon: '✅', available: !!selfAssessment },
        { id: 'interface', label: 'Guía de interfaz', icon: '🖱️', available: !!interfaceGuide }
    ].filter(tab => tab.available);

    if (tabs.length === 0) return null;

    return (
        <motion.div 
            className="mission-insights"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
        >
            {/* Header con tabs */}
            <div className="insights-header">
                <div className="insights-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`insight-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                            {tab.id === 'self' && selfAssessment && (
                                <span className="completion-badge">
                                    {completionPercentage}%
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                {onClose && (
                    <button className="insights-close" onClick={onClose}>✕</button>
                )}
            </div>

            {/* Contenido */}
            <AnimatePresence mode="wait">
                {/* Tab: Por qué importa */}
                {activeTab === 'why' && whyItMatters && (
                    <motion.div
                        key="why"
                        className="insight-content why-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <h4 className="why-title">{whyItMatters.title}</h4>
                        
                        <div className="why-section">
                            <div className="why-icon">💡</div>
                            <div className="why-text">
                                <span className="why-label">La razón:</span>
                                <p>{whyItMatters.reason}</p>
                            </div>
                        </div>

                        <div className="why-section">
                            <div className="why-icon">💼</div>
                            <div className="why-text">
                                <span className="why-label">Para tu carrera:</span>
                                <p>{whyItMatters.careerConnection}</p>
                            </div>
                        </div>

                        <div className="why-section example">
                            <div className="why-icon">📖</div>
                            <div className="why-text">
                                <span className="why-label">Ejemplo real:</span>
                                <p>{whyItMatters.realExample}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tab: Auto-evaluación */}
                {activeTab === 'self' && selfAssessment && (
                    <motion.div
                        key="self"
                        className="insight-content self-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="self-header">
                            <h4>Verifica tu aprendizaje</h4>
                            <div className="progress-ring">
                                <span className="progress-text">{completionPercentage}%</span>
                            </div>
                        </div>

                        <div className="self-checklist">
                            {selfAssessment.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className={`self-item ${completedChecks[index] ? 'completed' : ''}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <button 
                                        className="self-checkbox"
                                        onClick={() => handleCheckComplete(index)}
                                    >
                                        {completedChecks[index] ? '✓' : ''}
                                    </button>
                                    <div className="self-text">
                                        <p className="self-question">{item.question}</p>
                                        <p className="self-criteria">
                                            <strong>Criterio:</strong> {item.criteria}
                                        </p>
                                        {!completedChecks[index] && (
                                            <p className="self-action">
                                                <strong>Acción:</strong> {item.action}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {completionPercentage === 100 && (
                            <motion.div 
                                className="self-complete-message"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                🎉 ¡Excelente! Estás listo para la siguiente misión
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Tab: Guía de interfaz */}
                {activeTab === 'interface' && interfaceGuide && (
                    <motion.div
                        key="interface"
                        className="insight-content interface-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <h4>🖱️ Dónde encontrar cada cosa</h4>
                        <div className="interface-grid">
                            {Object.entries(interfaceGuide).map(([key, value], index) => (
                                <motion.div 
                                    key={key}
                                    className="interface-item"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <span className="interface-key">
                                        {formatInterfaceKey(key)}
                                    </span>
                                    <span className="interface-value">{value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Formatear keys de camelCase a texto legible
function formatInterfaceKey(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

export default MissionInsights;
