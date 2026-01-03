import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle, Swords, Shield, HelpCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { 
    getUnlockedCards, 
    getCardsForMission, 
    validateCardSelection,
    VILLAIN_CARDS 
} from '../../data/pdfCards';
import '../../styles/CardDeck.css';

const MissionCardSelector = ({ 
    missionId, 
    onCardsSelected, 
    onCancel,
    maxSlots = 5 
}) => {
    const { user } = useGame();
    const [selectedCards, setSelectedCards] = useState([]);
    const [validationResult, setValidationResult] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    
    const unlockedCards = getUnlockedCards(user.level);
    const missionCardInfo = getCardsForMission(missionId);
    
    // Si la misión no requiere cartas, auto-aprobar
    useEffect(() => {
        if (!missionCardInfo) {
            onCardsSelected([]);
        }
    }, [missionCardInfo, onCardsSelected]);
    
    const handleCardSelect = (card) => {
        if (selectedCards.find(c => c.id === card.id)) {
            // Deseleccionar
            setSelectedCards(prev => prev.filter(c => c.id !== card.id));
            setValidationResult(null);
        } else if (selectedCards.length < maxSlots) {
            // Seleccionar
            setSelectedCards(prev => [...prev, card]);
            setValidationResult(null);
        }
    };
    
    const handleValidate = () => {
        setIsValidating(true);
        
        // Pequeño delay para efecto dramático
        setTimeout(() => {
            const result = validateCardSelection(missionId, selectedCards.map(c => c.id));
            setValidationResult(result);
            setIsValidating(false);
            
            if (result.success) {
                // Esperar un momento para mostrar el éxito antes de continuar
                setTimeout(() => {
                    onCardsSelected(selectedCards.map(c => c.id));
                }, 1500);
            }
        }, 800);
    };
    
    const handleUseHint = () => {
        setShowHint(true);
    };
    
    if (!missionCardInfo) {
        return null; // Misión sin requisitos de cartas
    }
    
    const villain = missionCardInfo.villain;
    
    return (
        <motion.div 
            className="card-selector-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="card-selector-modal glass"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                {/* Header con contexto de batalla */}
                <div className="selector-header">
                    <div className="battle-intro">
                        {missionCardInfo.isBossBattle ? (
                            <motion.div 
                                className="boss-battle-badge"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Swords size={24} />
                                <span>¡BATALLA FINAL!</span>
                            </motion.div>
                        ) : villain ? (
                            <div className="villain-warning">
                                <AlertTriangle size={20} />
                                <span>¡Datacorruptor está activo en esta misión!</span>
                            </div>
                        ) : null}
                        
                        <h2 className="font-heading">Selecciona tu Mazo</h2>
                        <p className="selector-description">{missionCardInfo.description}</p>
                    </div>
                    
                    <button className="cancel-btn" onClick={onCancel}>
                        <X size={24} />
                    </button>
                </div>
                
                {/* Villano (si aparece) */}
                {villain && (
                    <motion.div 
                        className="villain-card-display"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="villain-label">
                            <Shield size={16} />
                            <span>Enemigo de esta misión</span>
                        </div>
                        <div className="villain-mini-card" style={{ '--card-color': villain.color }}>
                            <span className="villain-icon">{villain.icon}</span>
                            <div className="villain-info">
                                <strong>{villain.name}</strong>
                                <span>{villain.effect}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
                
                {/* Slots de cartas seleccionadas */}
                <div className="selected-slots-area">
                    <div className="slots-header">
                        <h3>Tu Mazo ({selectedCards.length}/{maxSlots})</h3>
                        {selectedCards.length > 0 && (
                            <button 
                                className="clear-btn"
                                onClick={() => {
                                    setSelectedCards([]);
                                    setValidationResult(null);
                                }}
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                    
                    <div className="card-slots">
                        {Array.from({ length: maxSlots }).map((_, index) => {
                            const card = selectedCards[index];
                            
                            return (
                                <motion.div
                                    key={index}
                                    className={`card-slot ${card ? 'filled' : 'empty'}`}
                                    initial={false}
                                    animate={card ? { scale: [1, 1.1, 1] } : {}}
                                    style={card ? { '--card-color': card.color } : {}}
                                >
                                    {card ? (
                                        <>
                                            <span className="slot-icon">{card.icon}</span>
                                            <span className="slot-name">{card.name}</span>
                                            <button 
                                                className="remove-card-btn"
                                                onClick={() => handleCardSelect(card)}
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <span className="slot-placeholder">+</span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Grid de cartas disponibles */}
                <div className="available-cards-section">
                    <h3>Cartas Disponibles (Nivel {user.level})</h3>
                    
                    <div className="available-cards-grid">
                        {unlockedCards.map((card, index) => {
                            const isSelected = selectedCards.find(c => c.id === card.id);
                            const isRequired = missionCardInfo.required.find(c => c.id === card.id);
                            
                            return (
                                <motion.div
                                    key={card.id}
                                    className={`selectable-card ${isSelected ? 'selected' : ''} ${isRequired && showHint ? 'hint-required' : ''}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCardSelect(card)}
                                    style={{ '--card-color': card.color }}
                                >
                                    {isSelected && (
                                        <div className="selected-checkmark">
                                            <Check size={16} />
                                        </div>
                                    )}
                                    
                                    {showHint && isRequired && (
                                        <motion.div 
                                            className="hint-badge"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            ⭐
                                        </motion.div>
                                    )}
                                    
                                    <span className="selectable-icon">{card.icon}</span>
                                    <span className="selectable-name">{card.name}</span>
                                    <code className="selectable-dax">{card.daxFunction?.split('(')[0] || card.name}</code>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Resultado de validación */}
                <AnimatePresence>
                    {validationResult && (
                        <motion.div 
                            className={`validation-result ${validationResult.success ? 'success' : 'error'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {validationResult.success ? (
                                <>
                                    <Check size={24} />
                                    <span>{validationResult.feedback}</span>
                                </>
                            ) : (
                                <>
                                    <X size={24} />
                                    <span>{validationResult.feedback}</span>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Acciones */}
                <div className="selector-actions">
                    <button 
                        className="hint-btn"
                        onClick={handleUseHint}
                        disabled={showHint}
                    >
                        <HelpCircle size={18} />
                        {showHint ? 'Pista Activa' : 'Usar Pista'}
                    </button>
                    
                    <button 
                        className="btn btn-ghost"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    
                    <motion.button 
                        className="btn btn-primary validate-btn"
                        onClick={handleValidate}
                        disabled={selectedCards.length === 0 || isValidating}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isValidating ? (
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                ⚡
                            </motion.span>
                        ) : (
                            <>
                                <Swords size={18} />
                                ¡Iniciar Misión!
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MissionCardSelector;
