import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { PREMIUM_TIP_CATEGORIES } from '../../data/worlds';
import './PremiumTipsPanel.css';

/**
 * Panel de tips premium con categorías interactivas
 * Diseño robusto y premium para el sistema de ayuda
 */
const PremiumTipsPanel = ({ premiumTips, onClose }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [expandedTip, setExpandedTip] = useState(null);
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    // Categorías disponibles basadas en los tips proporcionados
    const availableCategories = useMemo(() => {
        if (!premiumTips) return [];
        return Object.keys(premiumTips).filter(cat => 
            premiumTips[cat] && premiumTips[cat].length > 0
        );
    }, [premiumTips]);

    // Tips filtrados por dificultad
    const filteredTips = useMemo(() => {
        if (!activeCategory || !premiumTips[activeCategory]) return [];
        
        const tips = premiumTips[activeCategory];
        if (difficultyFilter === 'all') return tips;
        
        return tips.filter(tip => tip.difficulty === difficultyFilter);
    }, [activeCategory, premiumTips, difficultyFilter]);

    // Total de tips disponibles
    const totalTips = useMemo(() => {
        if (!premiumTips) return 0;
        return Object.values(premiumTips).reduce((sum, tips) => sum + (tips?.length || 0), 0);
    }, [premiumTips]);

    if (!premiumTips || availableCategories.length === 0) {
        return null;
    }

    const getDifficultyBadge = (difficulty) => {
        const badges = {
            beginner: { label: 'Básico', color: '#22c55e', icon: '🌱' },
            intermediate: { label: 'Intermedio', color: '#f59e0b', icon: '🌿' },
            advanced: { label: 'Avanzado', color: '#ef4444', icon: '🌳' }
        };
        return badges[difficulty] || badges.beginner;
    };

    return (
        <motion.div 
            className="premium-tips-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            {/* Header */}
            <div className="premium-tips-header">
                <div className="premium-tips-title">
                    <span className="premium-tips-icon">💡</span>
                    <h3>Centro de Ayuda Premium</h3>
                    <span className="tips-count">{totalTips} tips disponibles</span>
                </div>
                {onClose && (
                    <button className="premium-tips-close" onClick={onClose}>
                        ✕
                    </button>
                )}
            </div>

            {/* Filtro de dificultad */}
            <div className="difficulty-filter">
                <span className="filter-label">Nivel:</span>
                <div className="filter-buttons">
                    {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
                        <button
                            key={level}
                            className={`filter-btn ${difficultyFilter === level ? 'active' : ''}`}
                            onClick={() => setDifficultyFilter(level)}
                        >
                            {level === 'all' ? '📚 Todos' : 
                             level === 'beginner' ? '🌱 Básico' :
                             level === 'intermediate' ? '🌿 Intermedio' : '🌳 Avanzado'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categorías */}
            <div className="premium-tips-categories">
                {availableCategories.map(categoryKey => {
                    const category = PREMIUM_TIP_CATEGORIES[categoryKey];
                    const tipCount = premiumTips[categoryKey]?.length || 0;
                    const isActive = activeCategory === categoryKey;
                    
                    return (
                        <motion.button
                            key={categoryKey}
                            className={`category-btn ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveCategory(isActive ? null : categoryKey)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ 
                                borderColor: isActive ? category?.color : 'transparent',
                                backgroundColor: isActive ? `${category?.color}15` : 'transparent'
                            }}
                        >
                            <span className="category-icon">{category?.icon}</span>
                            <span className="category-label">{category?.label}</span>
                            <span className="category-count">{tipCount}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Lista de Tips */}
            <AnimatePresence mode="wait">
                {activeCategory && (
                    <motion.div
                        className="premium-tips-list"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {filteredTips.length === 0 ? (
                            <div className="no-tips-message">
                                <span>🔍</span>
                                <p>No hay tips de este nivel en esta categoría</p>
                            </div>
                        ) : (
                            filteredTips.map((tip, index) => {
                                const isExpanded = expandedTip === `${activeCategory}-${index}`;
                                const diffBadge = getDifficultyBadge(tip.difficulty);
                                
                                return (
                                    <motion.div
                                        key={`${activeCategory}-${index}`}
                                        className={`tip-card ${isExpanded ? 'expanded' : ''}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <button
                                            className="tip-header"
                                            onClick={() => setExpandedTip(
                                                isExpanded ? null : `${activeCategory}-${index}`
                                            )}
                                        >
                                            <div className="tip-title-row">
                                                <span className="tip-number">#{index + 1}</span>
                                                <span className="tip-title">{tip.title}</span>
                                            </div>
                                            <div className="tip-meta">
                                                <span 
                                                    className="difficulty-badge"
                                                    style={{ backgroundColor: diffBadge.color }}
                                                >
                                                    {diffBadge.icon} {diffBadge.label}
                                                </span>
                                                <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
                                                    ▼
                                                </span>
                                            </div>
                                        </button>
                                        
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    className="tip-content"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                >
                                                    <pre className="tip-text">{tip.content}</pre>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mensaje cuando no hay categoría seleccionada */}
            {!activeCategory && (
                <div className="select-category-prompt">
                    <span className="prompt-icon">👆</span>
                    <p>Selecciona una categoría para ver los tips</p>
                </div>
            )}

            {/* Footer con descripción de categoría activa */}
            {activeCategory && PREMIUM_TIP_CATEGORIES[activeCategory] && (
                <div className="category-description">
                    <span style={{ color: PREMIUM_TIP_CATEGORIES[activeCategory].color }}>
                        {PREMIUM_TIP_CATEGORIES[activeCategory].icon}
                    </span>
                    <span>{PREMIUM_TIP_CATEGORIES[activeCategory].description}</span>
                </div>
            )}
        </motion.div>
    );
};

export default PremiumTipsPanel;
