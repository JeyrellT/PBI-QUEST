import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle2, Download, Play, Coins, Layers } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WORLDS } from '../../data/worlds';
import { useDataGenerator } from '../../hooks/useDataGenerator';
import { getCardsForMission, MISSION_REQUIRED_CARDS } from '../../data/pdfCards';
import MissionCardSelector from './MissionCardSelector';
import CardDeck from './CardDeck';
import confetti from 'canvas-confetti';
import MissionValidator from './MissionValidator';

const WorldMap = () => {
    const { user, completeMission, unlockWorld } = useGame();
    const {
        generateTreasuryData,
        generateSalesData,
        generateChemicalInventory,
        generatePlayerProfiles,
        generateWizardTransactions,
        generateDataRescueBundle,
        generateDataRescueDuplicated,
        generateDataRescueFixedDataset,
        downloadCSV
    } = useDataGenerator();

    const [selectedWorld, setSelectedWorld] = useState(null);
    const [selectedMission, setSelectedMission] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); // 'details' or 'guide'
    const [showCardSelector, setShowCardSelector] = useState(false);
    const [showCardDeck, setShowCardDeck] = useState(false);
    const [pendingMission, setPendingMission] = useState(null);

    // Dataset sessions (para validar contra el MISMO dataset descargado)
    const [datasetSessions, setDatasetSessions] = useState({}); // { [datasetName]: { seed, answerKey, stepKey } }

    // Victory Modal State
    const [showVictoryModal, setShowVictoryModal] = useState(false);
    const [missionResults, setMissionResults] = useState(null);

    // Costo para desbloquear mundos (reducido a 100 para mejor progresión)
    const WORLD_UNLOCK_COST = 100;

    // Verificar si la misión requiere selección de cartas (solo DataRescue HQ)
    const missionRequiresCards = (missionId) => {
        return MISSION_REQUIRED_CARDS[missionId] !== undefined;
    };

    const handleUnlockWorld = (world) => {
        if (user.coins >= WORLD_UNLOCK_COST) {
            unlockWorld(world.id, WORLD_UNLOCK_COST);
            confetti({
                particleCount: 100,
                spread: 60,
                origin: { y: 0.6 },
                colors: [world.color, '#ffd700', '#ffffff']
            });
        }
    };

    const handleStartMission = (mission) => {
        // Si es una misión de DataRescue HQ que requiere cartas, mostrar selector
        if (missionRequiresCards(mission.id)) {
            setPendingMission(mission);
            setShowCardSelector(true);
        } else {
            // Misión normal sin requisito de cartas
            setSelectedMission(mission);
            setActiveTab('details');
        }
    };

    const handleCardsSelected = (selectedCardIds) => {
        // Las cartas fueron seleccionadas correctamente, iniciar la misión
        setShowCardSelector(false);
        setSelectedMission(pendingMission);
        setActiveTab('details');
        setPendingMission(null);

        // Celebrar la selección correcta
        confetti({
            particleCount: 50,
            spread: 40,
            origin: { y: 0.7 },
            colors: ['#fbbf24', '#22c55e', '#3b82f6']
        });
    };

    const handleCardSelectorCancel = () => {
        setShowCardSelector(false);
        setPendingMission(null);
    };

    const handleDownloadData = (datasetName) => {
        let data;
        if (datasetName.includes('treasury') || datasetName.includes('tax')) {
            data = generateTreasuryData(500);
        } else if (datasetName.includes('chemical') || datasetName.includes('car_wash')) {
            data = generateChemicalInventory(200);
        } else if (datasetName.includes('player') || datasetName.includes('debt')) {
            data = generatePlayerProfiles(456);
        } else if (datasetName.includes('vault') || datasetName.includes('magic')) {
            data = generateWizardTransactions(300);
        } else if (datasetName.includes('datarescue_duplicated')) {
            // DataRescue: Dataset con duplicados para misión COUNT vs COUNTROWS
            const bundle = generateDataRescueFixedDataset('datarescue_duplicated');
            if (bundle) {
                data = bundle.playRows;
                setDatasetSessions(prev => ({
                    ...prev,
                    [datasetName]: { seed: bundle.seed, answerKey: bundle.answerKey, stepKey: bundle.stepKey }
                }));
            } else {
                data = generateDataRescueDuplicated(120, 0.12);
            }
        } else if (datasetName.includes('datarescue_full_challenge')) {
            // DataRescue: Dataset completo para misión final (más filas, más corrupciones)
            const bundle = generateDataRescueFixedDataset('datarescue_full_challenge') || generateDataRescueBundle(200, 'hard');
            data = bundle.playRows;
            setDatasetSessions(prev => ({
                ...prev,
                [datasetName]: { seed: bundle.seed, answerKey: bundle.answerKey, stepKey: bundle.stepKey }
            }));
        } else if (datasetName.includes('datarescue')) {
            // DataRescue: Dataset corrupto estándar
            const bundle = generateDataRescueFixedDataset('datarescue_corrupted') || generateDataRescueBundle(120, 'medium');
            data = bundle.playRows;
            setDatasetSessions(prev => ({
                ...prev,
                [datasetName]: { seed: bundle.seed, answerKey: bundle.answerKey, stepKey: bundle.stepKey }
            }));
        } else {
            // Default fallback
            data = generateSalesData(500);
        }
        downloadCSV(data, datasetName);
    };

    // Callback cuando el MissionValidator confirma éxito
    const handleValidationSuccess = (results) => {
        setMissionResults(results);
        setShowVictoryModal(true);

        // Confetti burst initial
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [selectedWorld.color, '#ffffff', '#00d2ff']
        });
    };

    // Al cerrar el modal de victoria
    const handleVictoryContinue = () => {
        if (!selectedMission) return;

        // Otorgar recompensas reales
        completeMission(selectedMission.id, selectedWorld.id, {
            xp: missionResults?.xpEarned || selectedMission.xp,
            coins: selectedMission.coins
        }, selectedMission.title);

        // Reset states
        setShowVictoryModal(false);
        setMissionResults(null);
        setSelectedMission(null);
    };

    return (
        <div className="world-map-container" style={{ width: '100%' }}>
            <AnimatePresence mode="wait">
                {selectedMission ? (
                    <motion.div
                        key="mission-detail"
                        className="mission-detail"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="btn btn-ghost" onClick={() => setSelectedMission(null)}>
                            ← Volver a {selectedWorld.name}
                        </button>

                        <div className="mission-header">
                            <div className="mission-title-group">
                                <div className="mission-chapter-badge">Capítulo {selectedMission.chapter}</div>
                                <h1 className="font-heading">{selectedMission.title}</h1>
                                <div className="mission-tags">
                                    <span className="tag xp">⚡ +{selectedMission.xp} XP</span>
                                    <span className="tag coins">💰 +{selectedMission.coins} Monedas</span>
                                </div>
                            </div>
                        </div>

                        <div className="mission-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                                onClick={() => setActiveTab('details')}
                            >
                                Misión
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
                                onClick={() => setActiveTab('guide')}
                            >
                                Guía Paso a Paso
                            </button>
                        </div>

                        <div className="mission-content-layout">
                            {activeTab === 'details' ? (
                                <motion.div
                                    key="tab-details"
                                    className="mission-details-grid"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Story Context - Full Width Top */}
                                    <div className="story-context-box">
                                        <h3>Contexto de la Historia</h3>
                                        <p className="story-text">{selectedMission.storyContext}</p>
                                    </div>

                                    {/* Main Content Grid - 2 Columns */}
                                    <div className="mission-two-column">
                                        {/* Left Column */}
                                        <div className="mission-left-column">
                                            <div className="mission-description glass">
                                                <h3>Tu Tarea</h3>
                                                <p>{selectedMission.description}</p>
                                            </div>

                                            <div className="objectives glass">
                                                <h3>Objetivos de la Misión</h3>
                                                <ul>
                                                    {selectedMission.objectives.map((obj, i) => (
                                                        <li key={i}>
                                                            <div className="checkbox"></div>
                                                            <span>{obj}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {selectedMission.expectedOutcome && (
                                                <div className="expected-outcome">
                                                    <h3>Resultado Esperado</h3>
                                                    <p>{selectedMission.expectedOutcome}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column */}
                                        <div className="mission-right-column">
                                            <div className="dataset-card glass">
                                                <h3>Datasets Requeridos</h3>
                                                <div className="dataset-list">
                                                    {selectedMission.datasets.map((ds, i) => (
                                                        <div key={i} className="dataset-item">
                                                            <span>{ds}.csv</span>
                                                            <button className="btn btn-secondary btn-sm" onClick={() => handleDownloadData(ds)}>
                                                                <Download size={16} />
                                                                Descargar
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <MissionValidator
                                                mission={selectedMission}
                                                datasetSession={datasetSessions[selectedMission.datasets?.[0]]}
                                                onValidationComplete={handleValidationSuccess}
                                            />


                                            {/* Victory Modal Overlay */}
                                            {showVictoryModal && (
                                                <motion.div
                                                    className="victory-modal-overlay"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    style={{
                                                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                                        background: 'rgba(0,0,0,0.85)', zIndex: 1000,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        padding: '20px',
                                                        backdropFilter: 'blur(8px)'
                                                    }}
                                                >
                                                    <motion.div
                                                        className="victory-card"
                                                        initial={{ scale: 0.8, y: 50 }}
                                                        animate={{ scale: 1, y: 0 }}
                                                        style={{
                                                            maxWidth: '500px', width: '100%',
                                                            background: 'var(--bg-surface)',
                                                            border: '1px solid var(--accent-gold)',
                                                            borderRadius: '24px',
                                                            padding: '32px',
                                                            textAlign: 'center',
                                                            boxShadow: '0 0 60px rgba(255, 215, 0, 0.15)',
                                                            position: 'relative',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        <div style={{
                                                            position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
                                                            background: 'linear-gradient(90deg, #ffd700, #ffaa00)'
                                                        }}></div>

                                                        <h2 className="gradient-text" style={{
                                                            fontSize: '2.5rem',
                                                            marginBottom: '8px',
                                                            background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent'
                                                        }}>
                                                            ¡Misión Cumplida!
                                                        </h2>

                                                        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                                                            Has demostrado tu valía, analista.
                                                        </p>

                                                        {selectedMission?.winImage && (
                                                            <div style={{
                                                                margin: '0 0 24px 0',
                                                                borderRadius: '16px',
                                                                overflow: 'hidden',
                                                                border: '1px solid rgba(255,255,255,0.1)',
                                                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                                            }}>
                                                                <img
                                                                    src={selectedMission.winImage}
                                                                    alt="Success"
                                                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                                                />
                                                            </div>
                                                        )}

                                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                                                            <div style={{
                                                                background: 'rgba(34, 197, 94, 0.15)',
                                                                color: '#22c55e',
                                                                padding: '8px 16px',
                                                                borderRadius: '20px',
                                                                fontWeight: 'bold',
                                                                display: 'flex', alignItems: 'center', gap: '6px'
                                                            }}>
                                                                ⚡ +{missionResults?.xpEarned || selectedMission.xp} XP
                                                            </div>
                                                            <div style={{
                                                                background: 'rgba(255, 215, 0, 0.15)',
                                                                color: '#ffaa00',
                                                                padding: '8px 16px',
                                                                borderRadius: '20px',
                                                                fontWeight: 'bold',
                                                                display: 'flex', alignItems: 'center', gap: '6px'
                                                            }}>
                                                                💰 +{selectedMission.coins} Monedas
                                                            </div>
                                                        </div>

                                                        <button
                                                            className="btn btn-primary"
                                                            style={{
                                                                width: '100%',
                                                                fontSize: '1.1rem',
                                                                padding: '16px',
                                                                background: 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)',
                                                                color: '#000',
                                                                border: 'none',
                                                                fontWeight: 'bold'
                                                            }}
                                                            onClick={handleVictoryContinue}
                                                        >
                                                            Continuar la Aventura →
                                                        </button>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="tab-guide"
                                    className="guide-container glass"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="guide-section">
                                        <h3><Play size={20} /> Pasos a Seguir</h3>
                                        <div className="steps-list">
                                            {selectedMission.guide?.map((step, i) => (
                                                <div key={i} className="step-item">
                                                    <p>{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="tips-section">
                                        <h3><CheckCircle2 size={20} /> Consejos Pro</h3>
                                        <ul className="tips-list">
                                            {selectedMission.tips?.map((tip, i) => (
                                                <li key={i}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div >
                ) : (
                    <motion.div
                        key="world-map-view"
                        className="world-map"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="font-heading page-title">Explora los Mundos</h1>

                        <AnimatePresence mode="wait">
                            {!selectedWorld ? (
                                <motion.div
                                    key="worlds-grid"
                                    className="worlds-grid"
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                        }
                                    }}
                                >
                                    {[...WORLDS].sort((a, b) => (a.order || 99) - (b.order || 99)).map(world => {
                                        const isUnlocked = user.unlockedWorlds.includes(world.id);
                                        const completedCount = world.missions.filter(m => user.completedMissions.includes(m.id)).length;

                                        return (
                                            <motion.div
                                                key={world.id}
                                                className={`world-card glass ${!isUnlocked ? 'locked' : ''} ${!isUnlocked && user.coins >= WORLD_UNLOCK_COST ? 'can-unlock' : ''}`}
                                                onClick={() => isUnlocked ? setSelectedWorld(world) : (user.coins >= WORLD_UNLOCK_COST && handleUnlockWorld(world))}
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.8, y: 30 },
                                                    visible: {
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: 0,
                                                        transition: { type: "spring", stiffness: 200, damping: 20 }
                                                    }
                                                }}
                                                whileHover={isUnlocked ? {
                                                    scale: 1.05,
                                                    y: -10,
                                                    borderColor: world.color,
                                                    boxShadow: `0 15px 40px ${world.color}33`
                                                } : {}}
                                                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                                            >
                                                <div className="world-card-image">
                                                    <motion.img
                                                        src={world.image}
                                                        alt={world.name}
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.8 }}
                                                    />
                                                    <div className="world-card-overlay"></div>
                                                    <motion.div
                                                        className="world-icon-badge"
                                                        style={{ backgroundColor: world.color }}
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        {world.icon}
                                                    </motion.div>
                                                </div>
                                                <div className="world-info">
                                                    <h2 className="font-heading">{world.name}</h2>
                                                    <p className="subtitle">{world.subtitle}</p>
                                                    <p className="description">{world.description}</p>
                                                </div>
                                                <div className="world-footer">
                                                    {isUnlocked ? (
                                                        <div className="progress-info">
                                                            <div className="progress-bar">
                                                                <motion.div
                                                                    className="progress-fill"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${(completedCount / world.missions.length) * 100}%` }}
                                                                    style={{ backgroundColor: world.color }}
                                                                    transition={{ duration: 1, delay: 0.5 }}
                                                                ></motion.div>
                                                            </div>
                                                            <span>{completedCount}/{world.missions.length} Misiones</span>
                                                        </div>
                                                    ) : (
                                                        <div className="unlock-info" style={{ cursor: user.coins >= WORLD_UNLOCK_COST ? 'pointer' : 'not-allowed' }}>
                                                            <span>{user.coins >= WORLD_UNLOCK_COST ? 'Click para desbloquear' : `Necesitas ${WORLD_UNLOCK_COST}`}</span>
                                                            <Coins size={14} color="var(--accent-gold)" />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="world-detail"
                                    className="world-detail"
                                    initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                >
                                    <button className="btn btn-ghost" onClick={() => setSelectedWorld(null)}>
                                        ← Volver al Mapa
                                    </button>

                                    <div className="world-hero-modern glass">
                                        <div className="world-hero-image">
                                            <img src={selectedWorld.image} alt={selectedWorld.name} />
                                            <div className="world-hero-overlay"></div>
                                        </div>
                                        <div className="world-hero-content">
                                            <div className="world-arc-badge">Arco: {selectedWorld.storyArc}</div>
                                            <h1 className="font-heading">{selectedWorld.name}</h1>
                                            <p className="world-prologue-text">"{selectedWorld.prologue}"</p>
                                        </div>
                                    </div>

                                    <motion.div
                                        className="missions-timeline"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: { staggerChildren: 0.1 }
                                            }
                                        }}
                                    >
                                        {selectedWorld.missions.map((mission, index) => {
                                            const isCompleted = user.completedMissions.includes(mission.id);
                                            const isLocked = user.level < mission.level;

                                            return (
                                                <motion.div
                                                    key={mission.id}
                                                    className={`mission-timeline-item ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
                                                    variants={{
                                                        hidden: { opacity: 0, x: -20 },
                                                        visible: { opacity: 1, x: 0 }
                                                    }}
                                                >
                                                    <div className="timeline-connector"></div>
                                                    <motion.div
                                                        className="mission-card-modern glass"
                                                        whileHover={!isLocked ? { scale: 1.02, x: 10 } : {}}
                                                    >
                                                        <div className="mission-status-icon">
                                                            {isCompleted ? (
                                                                <CheckCircle2 size={24} color="var(--accent-green)" />
                                                            ) : isLocked ? (
                                                                <Lock size={24} color="var(--text-dim)" />
                                                            ) : (
                                                                <div className="mission-chapter-circle">{mission.chapter}</div>
                                                            )}
                                                        </div>
                                                        <div className="mission-main-info">
                                                            <div className="mission-meta-top">
                                                                <span className="chapter-label">Capítulo {mission.chapter}</span>
                                                                {isLocked && <span className="level-req">Nivel {mission.level} requerido</span>}
                                                                {!isLocked && missionRequiresCards(mission.id) && (
                                                                    <span className="mission-card-indicator">
                                                                        🃏 Requiere cartas
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h3>{mission.title}</h3>
                                                            <p>{mission.description}</p>
                                                        </div>
                                                        <div className="mission-actions-right">
                                                            <div className="mission-rewards-small">
                                                                <span>⚡ {mission.xp}</span>
                                                                <span>💰 {mission.coins}</span>
                                                            </div>
                                                            <button
                                                                className={`btn btn-primary btn-sm ${isLocked ? 'disabled' : ''}`}
                                                                disabled={isLocked}
                                                                onClick={() => handleStartMission(mission)}
                                                            >
                                                                {isCompleted ? 'Repetir' : missionRequiresCards(mission.id) ? '🃏 Elegir Cartas' : 'Empezar'}
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence >

            {/* Botón flotante para ver el mazo de cartas */}
            < motion.button
                className="floating-deck-btn glass"
                onClick={() => setShowCardDeck(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                title="Ver tu mazo de cartas"
            >
                <Layers size={24} />
                <span>Mazo</span>
            </motion.button >

            {/* Modal del Mazo de Cartas */}
            < AnimatePresence >
                {showCardDeck && (
                    <CardDeck
                        isOpen={showCardDeck}
                        onClose={() => setShowCardDeck(false)}
                    />
                )}
            </AnimatePresence >

            {/* Selector de Cartas para Misiones */}
            < AnimatePresence >
                {showCardSelector && pendingMission && (
                    <MissionCardSelector
                        missionId={pendingMission.id}
                        onCardsSelected={handleCardsSelected}
                        onCancel={handleCardSelectorCancel}
                        maxSlots={5}
                    />
                )}
            </AnimatePresence >
        </div >
    );
};

export default WorldMap;
