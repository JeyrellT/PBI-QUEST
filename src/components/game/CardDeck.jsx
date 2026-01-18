import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Sparkles, Zap, Shield, Brain, ZoomIn, Image } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import useSound from '../../hooks/useSound';
import { HERO_CARDS, VILLAIN_CARDS, SPECIAL_CARDS, COVER_CARD, getUnlockedCards } from '../../data/pdfCards';
import { getAssetPath } from '../../utils/assetPath';
import Portal from '../common/Portal';
import '../../styles/CardDeck.css';
import '../../styles/premium-cards.css';

// Componente de partículas para cartas
const CardParticles = () => (
    <div className="card-particles">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="card-particle" />
        ))}
    </div>
);

const CardDeck = ({ isOpen, onClose }) => {
    const { user } = useGame();
    const { sounds } = useSound();
    const [selectedCard, setSelectedCard] = useState(null);
    const [viewingImage, setViewingImage] = useState(null); // Para ver imagen PDF a tamaño completo
    const [imageErrors, setImageErrors] = useState({}); // Track de errores de carga de imagen
    const [filter, setFilter] = useState('all'); // 'all', 'heroes', 'villains', 'special'
    
    // Función para manejar errores de carga de imagen
    const handleImageError = (cardId) => {
        setImageErrors(prev => ({ ...prev, [cardId]: true }));
    };
    
    // Handler para seleccionar carta con sonido
    const handleCardSelect = (card) => {
        sounds.cardFlip();
        setSelectedCard(card);
    };
    
    // Handler para filtros con sonido
    const handleFilterChange = (newFilter) => {
        sounds.click();
        setFilter(newFilter);
    };
    
    const unlockedCards = getUnlockedCards(user.level);
    const unlockedIds = unlockedCards.map(c => c.id);
    
    // Agrupar cartas por categoría
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'aggregation': return <Zap size={14} />;
            case 'statistics': return <Sparkles size={14} />;
            case 'counting': return <span>🔢</span>;
            case 'logic': return <Brain size={14} />;
            case 'antagonist': return <Shield size={14} />;
            case 'wildcard': return <span>🃏</span>;
            default: return null;
        }
    };
    
    const getCategoryLabel = (category) => {
        switch (category) {
            case 'aggregation': return 'Agregación';
            case 'statistics': return 'Estadística';
            case 'counting': return 'Conteo';
            case 'logic': return 'Lógica';
            case 'antagonist': return 'Antagonista';
            case 'wildcard': return 'Comodín';
            default: return category;
        }
    };
    
    const getFilteredCards = () => {
        let cards = [];
        
        if (filter === 'all' || filter === 'heroes') {
            cards = [...cards, ...HERO_CARDS];
        }
        if (filter === 'all' || filter === 'villains') {
            cards = [...cards, ...VILLAIN_CARDS];
        }
        if (filter === 'all' || filter === 'special') {
            cards = [...cards, ...SPECIAL_CARDS];
        }
        
        return cards;
    };
    
    const filteredCards = getFilteredCards();
    const unlockedCount = HERO_CARDS.filter(c => unlockedIds.includes(c.id)).length + 
                         SPECIAL_CARDS.filter(c => unlockedIds.includes(c.id)).length;
    const totalHeroCards = HERO_CARDS.length + SPECIAL_CARDS.length;
    
    if (!isOpen) return null;
    
    return (
        <Portal>
            <AnimatePresence>
                <motion.div 
                    className="card-deck-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div 
                        className="card-deck-modal glass"
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                    {/* Header */}
                    <div className="card-deck-header">
                        <div className="deck-title-section">
                            <h2 className="font-heading">🃏 Tu Mazo de Cartas</h2>
                            <div className="deck-progress">
                                <span className="progress-text">{unlockedCount}/{totalHeroCards} Cartas Desbloqueadas</span>
                                <div className="progress-bar-mini">
                                    <motion.div 
                                        className="progress-fill-mini"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(unlockedCount / totalHeroCards) * 100}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                    
                    {/* Filtros */}
                    <div className="card-filters">
                        <button 
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('all')}
                        >
                            Todas
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'heroes' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('heroes')}
                        >
                            🦸 Héroes
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'villains' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('villains')}
                        >
                            👾 Villanos
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'special' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('special')}
                        >
                            ✨ Especiales
                        </button>
                    </div>
                    
                    {/* Grid de Cartas */}
                    <div className="cards-grid">
                        {filteredCards.map((card, index) => {
                            const isUnlocked = card.type === 'villain' || unlockedIds.includes(card.id);
                            const hasImage = card.image && !imageErrors[card.id];
                            
                            return (
                                <motion.div
                                    key={card.id}
                                    className={`game-card ${isUnlocked ? 'unlocked' : 'locked'} ${card.type}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={isUnlocked ? { 
                                        scale: 1.05, 
                                        rotateY: 5,
                                        rotateX: 2,
                                        boxShadow: `0 20px 40px ${card.color}44`
                                    } : {}}
                                    onClick={() => isUnlocked && handleCardSelect(card)}
                                    onMouseEnter={() => isUnlocked && sounds.hover()}
                                    style={{ 
                                        '--card-color': card.color,
                                        cursor: isUnlocked ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    {/* Partículas decorativas para cartas desbloqueadas */}
                                    {isUnlocked && <CardParticles />}
                                    {/* Card Image / Icon */}
                                    <div className="card-image-area" style={{ backgroundColor: `${card.color}22` }}>
                                        {hasImage ? (
                                            <>
                                                <img 
                                                    src={getAssetPath(card.image)} 
                                                    alt={card.name}
                                                    className="card-pdf-image"
                                                    onError={() => handleImageError(card.id)}
                                                />
                                                {isUnlocked && (
                                                    <button 
                                                        className="view-image-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setViewingImage(card);
                                                        }}
                                                        title="Ver carta completa"
                                                    >
                                                        <ZoomIn size={16} />
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <span className="card-icon-large">{card.icon}</span>
                                        )}
                                        {!isUnlocked && (
                                            <div className="lock-overlay">
                                                <Lock size={32} />
                                                <span>Nivel {card.unlocksAtLevel}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Card Content */}
                                    <div className="card-content">
                                        <div className="card-type-badge" style={{ backgroundColor: card.color }}>
                                            {getCategoryIcon(card.category)}
                                            <span>{getCategoryLabel(card.category)}</span>
                                        </div>
                                        <h3 className="card-name">{card.name}</h3>
                                        <p className="card-superpower">{card.superpower}</p>
                                        {card.daxFunction && (
                                            <code className="card-dax">{card.daxFunction}</code>
                                        )}
                                    </div>
                                    
                                    {/* Power Badge */}
                                    <div className="card-power-badge" style={{ backgroundColor: card.color }}>
                                        ⚡ {card.power}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    
                    {/* Portada del juego */}
                    <div className="cover-section">
                        <motion.div 
                            className="cover-card glass"
                            whileHover={{ scale: 1.02 }}
                            style={{ borderColor: COVER_CARD.color }}
                        >
                            <div className="cover-image-placeholder">
                                <span>🦸‍♂️ vs 👾</span>
                            </div>
                            <div className="cover-info">
                                <h3>{COVER_CARD.name}</h3>
                                <p>{COVER_CARD.description}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* Modal de Detalle de Carta */}
                <AnimatePresence>
                    {selectedCard && (
                        <motion.div 
                            className="card-detail-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCard(null)}
                        >
                            <motion.div 
                                className="card-detail-modal"
                                initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ '--card-color': selectedCard.color }}
                            >
                                <div className="detail-card-front">
                                    {/* Imagen de la carta del PDF en la parte superior */}
                                    <div className="detail-image-area">
                                        {selectedCard.image && !imageErrors[selectedCard.id] ? (
                                            <img 
                                                src={getAssetPath(selectedCard.image)} 
                                                alt={selectedCard.name}
                                                className="detail-card-image"
                                                onError={() => handleImageError(selectedCard.id)}
                                            />
                                        ) : (
                                            <div className="detail-icon-fallback" style={{ backgroundColor: `${selectedCard.color}22` }}>
                                                <span className="detail-icon">{selectedCard.icon}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="detail-content">
                                        <div className="detail-type-badge" style={{ backgroundColor: selectedCard.color }}>
                                            {selectedCard.type === 'hero' ? '🦸 HÉROE' : 
                                             selectedCard.type === 'villain' ? '👾 VILLANO' : '✨ ESPECIAL'}
                                        </div>
                                        
                                        <h2 className="detail-name">{selectedCard.name}</h2>
                                        <p className="detail-superpower">"{selectedCard.superpower}"</p>
                                        
                                        <div className="detail-description">
                                            <p>{selectedCard.description}</p>
                                        </div>
                                        
                                        {selectedCard.daxFunction && (
                                            <div className="detail-syntax">
                                                <h4>Sintaxis DAX:</h4>
                                                <code>{selectedCard.daxFunction}</code>
                                            </div>
                                        )}
                                        
                                        {selectedCard.effect && (
                                            <div className="detail-effect">
                                                <h4>Efecto:</h4>
                                                <p>{selectedCard.effect}</p>
                                            </div>
                                        )}
                                        
                                        {selectedCard.weakness && (
                                            <div className="detail-weakness">
                                                <h4>Debilidad:</h4>
                                                <p>{selectedCard.weakness}</p>
                                            </div>
                                        )}
                                        
                                        <div className="detail-stats">
                                            <div className="stat">
                                                <span className="stat-label">Poder</span>
                                                <span className="stat-value" style={{ color: selectedCard.color }}>
                                                    ⚡ {selectedCard.power}
                                                </span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-label">Categoría</span>
                                                <span className="stat-value">
                                                    {getCategoryLabel(selectedCard.category)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Botón para ver imagen PDF */}
                                        {selectedCard.image && !imageErrors[selectedCard.id] && (
                                            <button 
                                                className="view-pdf-card-btn"
                                                onClick={() => {
                                                    setSelectedCard(null);
                                                    setViewingImage(selectedCard);
                                                }}
                                            >
                                                <Image size={18} />
                                                Ver Carta Original (PDF)
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <button className="close-detail-btn" onClick={() => setSelectedCard(null)}>
                                    Cerrar
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Modal de Imagen PDF a Pantalla Completa */}
                <AnimatePresence>
                    {viewingImage && (
                        <motion.div 
                            className="pdf-image-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setViewingImage(null)}
                        >
                            <motion.div 
                                className="pdf-image-container"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="pdf-image-header">
                                    <h3 style={{ color: viewingImage.color }}>
                                        {viewingImage.icon} {viewingImage.name}
                                    </h3>
                                    <button 
                                        className="close-pdf-btn"
                                        onClick={() => setViewingImage(null)}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                
                                <div className="pdf-image-wrapper">
                                    <img 
                                        src={getAssetPath(viewingImage.image)} 
                                        alt={`Carta ${viewingImage.name}`}
                                        className="pdf-full-image"
                                        onError={() => handleImageError(viewingImage.id)}
                                    />
                                </div>
                                
                                <div className="pdf-image-footer">
                                    <span className="pdf-card-type" style={{ backgroundColor: viewingImage.color }}>
                                        {viewingImage.type === 'hero' ? '🦸 HÉROE' : 
                                         viewingImage.type === 'villain' ? '👾 VILLANO' : '✨ ESPECIAL'}
                                    </span>
                                    <span className="pdf-card-power">⚡ Poder: {viewingImage.power}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
        </Portal>
    );
};

export default CardDeck;
