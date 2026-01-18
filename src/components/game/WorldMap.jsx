import React, { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle2, Download, Play, Coins, Layers, Award, BookOpen, Target, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import useSound from '../../hooks/useSound';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';
import ParticleBackground from '../common/ParticleBackground';
import Portal from '../common/Portal';
import { WORLDS } from '../../data/worlds';
import { getAssetPath } from '../../utils/assetPath';
import { useDataGenerator } from '../../hooks/useDataGenerator';
import { MISSION_REQUIRED_CARDS } from '../../data/pdfCards';
import MissionCardSelector from './MissionCardSelector';
import CardDeck from './CardDeck';
import confetti from 'canvas-confetti';
import MissionValidator from './MissionValidator';

const WorldMap = () => {
    const {
        user,
        completeMission,
        unlockWorld,
        recordMissionPerformance,
        unlockWorldSkills,
        completeWorld,
        getWorldPerformanceSummary
    } = useGame();
    const { sounds } = useSound();
    const { canUseHeavyEffects } = useDeviceCapabilities();
    const containerRef = useRef(null);

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

    // NUEVO: Estados para narrativas y epílogo
    const [showNarrativeModal, setShowNarrativeModal] = useState(false);
    const [currentNarrative, setCurrentNarrative] = useState(null);
    const [showEpilogueModal, setShowEpilogueModal] = useState(false);
    const [epilogueWorld, setEpilogueWorld] = useState(null);
    const [showReviewMode, setShowReviewMode] = useState(false);
    const [reviewQuestions, setReviewQuestions] = useState([]);

    // Costo para desbloquear mundos (reducido a 100 para mejor progresión)
    const WORLD_UNLOCK_COST = 100;

    // NUEVO: Generar preguntas de repaso basadas en las habilidades del mundo
    const generateReviewQuestions = (world) => {
        const questions = [];

        // Preguntas de repaso basadas en conceptos clave de Power BI
        const reviewBank = {
            'data-import': [
                { q: '¿Qué opción de Power BI usas para cargar datos desde un archivo Excel?', a: 'Obtener Datos', options: ['Obtener Datos', 'Transformar Datos', 'Publicar', 'Nuevo Visual'] },
                { q: '¿Qué herramienta usas para limpiar y transformar datos antes de cargarlos?', a: 'Power Query', options: ['Power Query', 'DAX Studio', 'Power Pivot', 'Excel'] }
            ],
            'data-cleaning': [
                { q: '¿Qué función de Power Query convierte "JUAN PÉREZ" a "Juan Pérez"?', a: 'Text.Proper', options: ['Text.Proper', 'Text.Upper', 'Text.Lower', 'Text.Clean'] },
                { q: '¿Cómo manejas fechas en formatos mixtos (DD/MM vs MM/DD)?', a: 'Cambiar Tipo con Configuración Regional', options: ['Cambiar Tipo con Configuración Regional', 'Eliminar la columna', 'Ignorar el problema', 'Usar DATEVALUE'] }
            ],
            'dax-sum-avg': [
                { q: '¿Cuál es la diferencia entre una Medida y una Columna Calculada?', a: 'Medidas calculan en tiempo de consulta, columnas en tiempo de carga', options: ['Medidas calculan en tiempo de consulta, columnas en tiempo de carga', 'No hay diferencia', 'Columnas son más rápidas', 'Medidas solo funcionan en tablas'] },
                { q: '¿Qué función DAX suma todos los valores de una columna?', a: 'SUM', options: ['SUM', 'SUMX', 'TOTAL', 'ADD'] }
            ],
            'dax-calculate': [
                { q: '¿Para qué sirve la función CALCULATE en DAX?', a: 'Evaluar una expresión con filtros modificados', options: ['Evaluar una expresión con filtros modificados', 'Sumar valores', 'Crear columnas', 'Importar datos'] },
                { q: '¿Qué función DAX es considerada la más poderosa y versátil?', a: 'CALCULATE', options: ['CALCULATE', 'SUM', 'IF', 'FILTER'] }
            ],
            'dax-distinctcount': [
                { q: '¿Qué diferencia hay entre COUNT y DISTINCTCOUNT?', a: 'DISTINCTCOUNT ignora duplicados', options: ['DISTINCTCOUNT ignora duplicados', 'COUNT es más rápido', 'Son idénticas', 'COUNT solo funciona con números'] },
                { q: '¿Cuándo usarías DISTINCTCOUNT en lugar de COUNTROWS?', a: 'Cuando quieres contar valores únicos de una columna', options: ['Cuando quieres contar valores únicos de una columna', 'Siempre', 'Nunca', 'Para tablas grandes'] }
            ],
            'profitability': [
                { q: '¿Qué es el margen de beneficio?', a: 'Ganancia dividida entre ventas totales', options: ['Ganancia dividida entre ventas totales', 'Ventas menos costos', 'Precio de venta', 'Costos totales'] },
                { q: '¿Para qué sirve VAR en DAX?', a: 'Definir variables para código más limpio y eficiente', options: ['Definir variables para código más limpio y eficiente', 'Calcular varianza', 'Crear variaciones de datos', 'Validar datos'] }
            ]
        };

        // Seleccionar preguntas basadas en las habilidades del mundo
        if (world.skillsLearned) {
            world.skillsLearned.forEach(skill => {
                const skillQuestions = reviewBank[skill.id] || [];
                if (skillQuestions.length > 0) {
                    // Seleccionar una pregunta aleatoria de cada habilidad
                    const randomQ = skillQuestions[Math.floor(Math.random() * skillQuestions.length)];
                    questions.push({ ...randomQ, skillId: skill.id, skillName: skill.name });
                }
            });
        }

        return questions;
    };

    // Iniciar modo repaso
    const handleStartReview = (world) => {
        const questions = generateReviewQuestions(world);
        setReviewQuestions(questions.map(q => ({ ...q, userAnswer: null, isCorrect: null })));
        setShowReviewMode(true);
        setShowEpilogueModal(false);
    };

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

    const handleCardsSelected = () => {
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

        // Registrar rendimiento de la misión
        if (selectedWorld && selectedMission) {
            recordMissionPerformance(selectedWorld.id, selectedMission.id, {
                wrongAnswers: results.wrongAnswers || 0,
                attempts: results.attempts || 1,
                hints: results.hintsUsed || 0,
                skillsDemo: results.skillsDemo || selectedMission.skillsDemo || []
            });

            // Desbloquear habilidades demostradas
            if (selectedMission.skillsDemo?.length > 0) {
                unlockWorldSkills(selectedWorld.id, selectedMission.skillsDemo);
            }
        }

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

        // Reset victory modal
        setShowVictoryModal(false);
        setMissionResults(null);

        // Verificar si se completó el mundo
        const allMissionIds = selectedWorld.missions.map(m => m.id);
        const willCompleteWorld = allMissionIds.every(
            id => id === selectedMission.id || user.completedMissions.includes(id)
        );

        if (willCompleteWorld && selectedWorld.epilogue) {
            // Marcar mundo como completado
            completeWorld(selectedWorld.id);

            // Mostrar epílogo después de un momento
            setTimeout(() => {
                setEpilogueWorld(selectedWorld);
                setShowEpilogueModal(true);

                // Gran celebración
                confetti({
                    particleCount: 300,
                    spread: 100,
                    origin: { y: 0.5 },
                    colors: [selectedWorld.color, '#ffd700', '#22c55e', '#ffffff']
                });
            }, 500);
        } else if (selectedMission.outroNarrative) {
            // Mostrar narrativa de transición
            setCurrentNarrative({
                type: 'outro',
                text: selectedMission.outroNarrative,
                missionTitle: selectedMission.title
            });
            setShowNarrativeModal(true);
        }

        setSelectedMission(null);
    };

    return (
        <div className="world-map-container" ref={containerRef} style={{ width: '100%', position: 'relative' }}>
            {/* Fondo de partículas mágicas (solo desktop) */}
            {canUseHeavyEffects && !selectedWorld && (
                <div className="world-map-particles" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}>
                    <ParticleBackground variant="magic" intensity={0.4} interactive={false} />
                </div>
            )}

            <AnimatePresence mode="wait">
                {selectedMission ? (
                    <motion.div
                        key="mission-detail"
                        className="mission-detail"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <button
                            className="btn btn-ghost"
                            onClick={() => {
                                sounds.click();
                                setSelectedMission(null);
                            }}
                        >
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
                                                <Portal>
                                                <motion.div
                                                    className="victory-modal-overlay"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    style={{
                                                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                                        background: 'rgba(0,0,0,0.85)', zIndex: 1000,
                                                        display: 'flex',
                                                        padding: '20px',
                                                        backdropFilter: 'blur(8px)',
                                                        overflowY: 'auto'
                                                    }}
                                                >
                                                    <motion.div
                                                        className="victory-card"
                                                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                                                        animate={{ scale: 1, y: 0, opacity: 1 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                        style={{
                                                            margin: 'auto',
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
                                                                    src={getAssetPath(selectedMission.winImage)}
                                                                    alt="Success"
                                                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                                                />
                                                            </div>
                                                        )}

                                                        {selectedMission?.acquiredSkills && (
                                                            <div style={{ marginBottom: '24px' }}>
                                                                <h4 style={{
                                                                    fontSize: '1rem',
                                                                    color: 'var(--accent-gold)',
                                                                    marginBottom: '12px'
                                                                }}>
                                                                    Habilidades Adquiridas
                                                                </h4>
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                                                                    {selectedMission.acquiredSkills.map((skill, i) => (
                                                                        <span key={i} style={{
                                                                            background: 'rgba(59, 130, 246, 0.2)',
                                                                            border: '1px solid rgba(59, 130, 246, 0.4)',
                                                                            borderRadius: '12px',
                                                                            padding: '6px 12px',
                                                                            fontSize: '0.85rem',
                                                                            color: '#60a5fa'
                                                                        }}>
                                                                            ✨ {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
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
                                                </Portal>
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
                                            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                                        }
                                    }}
                                >
                                    {[...WORLDS].sort((a, b) => (a.order || 99) - (b.order || 99)).map(world => {
                                        const isUnlocked = user.unlockedWorlds.includes(world.id);
                                        const completedCount = world.missions.filter(m => user.completedMissions.includes(m.id)).length;
                                        const isWorldCompleted = completedCount === world.missions.length;

                                        return (
                                            <motion.div
                                                key={world.id}
                                                className={`world-card glass ${!isUnlocked ? 'locked' : ''} ${!isUnlocked && user.coins >= WORLD_UNLOCK_COST ? 'can-unlock' : ''} ${isWorldCompleted ? 'world-completed' : ''}`}
                                                style={{
                                                    borderColor: isWorldCompleted ? '#22c55e' : undefined,
                                                    borderWidth: isWorldCompleted ? '2px' : undefined
                                                }}
                                                onClick={() => {
                                                    if (isUnlocked) {
                                                        sounds.click();
                                                        setSelectedWorld(world);
                                                    } else if (user.coins >= WORLD_UNLOCK_COST) {
                                                        handleUnlockWorld(world);
                                                    }
                                                }}
                                                onMouseEnter={() => isUnlocked && sounds.hover()}
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.9, y: 20 },
                                                    visible: {
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: 0,
                                                        transition: { type: "spring", stiffness: 350, damping: 25 }
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
                                                        src={getAssetPath(world.image)}
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

                                                {/* Badge de Completado */}
                                                {isWorldCompleted && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        right: '12px',
                                                        background: '#22c55e',
                                                        color: '#000',
                                                        padding: '6px 10px',
                                                        borderRadius: '20px',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.75rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        zIndex: 5,
                                                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
                                                    }}>
                                                        <span>✓</span> COMPLETADO
                                                    </div>
                                                )}
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
                                            <img src={getAssetPath(selectedWorld.image)} alt={selectedWorld.name} />
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
                                        {selectedWorld.missions.map((mission) => {
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

            {/* Botón flotante para ver el mazo de cartas (Solo DataRescue) */}
            {selectedWorld?.id === 'datarescue' && (
                <motion.button
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
                </motion.button>
            )}

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

            {/* NUEVO: Modal de Narrativa de Transición */}
            <AnimatePresence>
                {showNarrativeModal && currentNarrative && (
                    <Portal>
                    <motion.div
                        className="narrative-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.9)', zIndex: 1000,
                            display: 'flex',
                            padding: '20px',
                            backdropFilter: 'blur(10px)',
                            overflowY: 'auto'
                        }}
                        onClick={() => setShowNarrativeModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                margin: 'auto',
                                maxWidth: '600px', width: '100%',
                                background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-main))',
                                border: '1px solid var(--accent-gold)',
                                borderRadius: '24px',
                                padding: '32px',
                                textAlign: 'center',
                                boxShadow: '0 0 60px rgba(255, 215, 0, 0.1)'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📖</div>
                            <h2 style={{
                                color: 'var(--accent-gold)',
                                marginBottom: '8px',
                                fontSize: '1.3rem'
                            }}>
                                Continuará...
                            </h2>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.9rem',
                                marginBottom: '24px'
                            }}>
                                {currentNarrative.missionTitle}
                            </p>
                            <div style={{
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '16px',
                                padding: '24px',
                                marginBottom: '24px',
                                textAlign: 'left'
                            }}>
                                <p style={{
                                    color: 'var(--text-main)',
                                    fontSize: '1rem',
                                    lineHeight: '1.7',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {currentNarrative.text}
                                </p>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowNarrativeModal(false)}
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-gold), #ffaa00)',
                                    color: '#000',
                                    padding: '14px 32px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                Continuar →
                            </button>
                        </motion.div>
                    </motion.div>
                    </Portal>
                )}
            </AnimatePresence>

            {/* NUEVO: Modal de Epílogo del Mundo */}
            <AnimatePresence>
                {showEpilogueModal && epilogueWorld && (
                    <Portal>
                    <motion.div
                        className="epilogue-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.95)', zIndex: 1001,
                            display: 'flex',
                            padding: '20px',
                            backdropFilter: 'blur(12px)',
                            overflowY: 'auto'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.7, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.7, y: 50 }}
                            style={{
                                maxWidth: '700px', width: '100%',
                                background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-main))',
                                border: '2px solid var(--accent-gold)',
                                borderRadius: '24px',
                                padding: '40px',
                                textAlign: 'center',
                                boxShadow: '0 0 80px rgba(255, 215, 0, 0.2)',
                                margin: 'auto'
                            }}
                        >
                            {/* Header */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏆</div>
                                <h1 style={{
                                    background: 'linear-gradient(135deg, #ffd700, #ffaa00)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: '2rem',
                                    marginBottom: '8px'
                                }}>
                                    ¡Mundo Completado!
                                </h1>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                    {epilogueWorld.name}
                                </p>
                            </motion.div>

                            {/* Epílogo */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    margin: '24px 0',
                                    textAlign: 'left'
                                }}
                            >
                                <p style={{
                                    color: 'var(--text-main)',
                                    fontSize: '1rem',
                                    lineHeight: '1.8',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {epilogueWorld.epilogue}
                                </p>
                            </motion.div>

                            {/* Habilidades Adquiridas */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                style={{ marginBottom: '24px' }}
                            >
                                <h3 style={{
                                    color: 'var(--accent-green)',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    <Award size={20} />
                                    Habilidades Adquiridas
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                    justifyContent: 'center'
                                }}>
                                    {epilogueWorld.skillsLearned?.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.id}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.7 + skillIndex * 0.1 }}
                                            style={{
                                                background: 'rgba(34, 197, 94, 0.15)',
                                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                                borderRadius: '12px',
                                                padding: '12px 16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                            title={skill.description}
                                        >
                                            <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                                            <span style={{ color: '#22c55e', fontWeight: '600', fontSize: '0.9rem' }}>
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Resumen de Rendimiento */}
                            {(() => {
                                const summary = getWorldPerformanceSummary(epilogueWorld.id);
                                if (!summary) return null;

                                return (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        style={{ marginBottom: '24px' }}
                                    >
                                        <h3 style={{
                                            color: '#a855f7',
                                            marginBottom: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}>
                                            <TrendingUp size={20} />
                                            Tu Rendimiento
                                        </h3>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            gap: '12px',
                                            marginBottom: '16px'
                                        }}>
                                            <div style={{
                                                background: 'rgba(168, 85, 247, 0.15)',
                                                borderRadius: '12px',
                                                padding: '16px'
                                            }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a855f7' }}>
                                                    {summary.perfectMissions}/{summary.totalMissions}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    Misiones Perfectas
                                                </div>
                                            </div>
                                            <div style={{
                                                background: summary.totalWrongAnswers === 0
                                                    ? 'rgba(34, 197, 94, 0.15)'
                                                    : 'rgba(239, 68, 68, 0.15)',
                                                borderRadius: '12px',
                                                padding: '16px'
                                            }}>
                                                <div style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 'bold',
                                                    color: summary.totalWrongAnswers === 0 ? '#22c55e' : '#ef4444'
                                                }}>
                                                    {summary.totalWrongAnswers}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    Errores Totales
                                                </div>
                                            </div>
                                            <div style={{
                                                background: 'rgba(255, 184, 0, 0.15)',
                                                borderRadius: '12px',
                                                padding: '16px'
                                            }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffb800' }}>
                                                    {summary.totalHints}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    Pistas Usadas
                                                </div>
                                            </div>
                                        </div>

                                        {/* Áreas de Mejora */}
                                        {summary.areasToImprove.length > 0 && (
                                            <div style={{
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                borderRadius: '12px',
                                                padding: '16px',
                                                textAlign: 'left'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    marginBottom: '12px',
                                                    color: '#ef4444'
                                                }}>
                                                    <AlertCircle size={18} />
                                                    <span style={{ fontWeight: '600' }}>Puntos a Reforzar</span>
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                    {summary.areasToImprove.map(area => (
                                                        <span
                                                            key={area.id}
                                                            style={{
                                                                background: 'rgba(239, 68, 68, 0.2)',
                                                                borderRadius: '8px',
                                                                padding: '6px 12px',
                                                                fontSize: '0.85rem',
                                                                color: '#fca5a5'
                                                            }}
                                                        >
                                                            {area.icon} {area.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Badge de Perfecto */}
                                        {summary.isPerfectRun && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1, type: 'spring' }}
                                                style={{
                                                    background: 'linear-gradient(135deg, #ffd700, #ffaa00)',
                                                    borderRadius: '12px',
                                                    padding: '16px',
                                                    marginTop: '16px',
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <Sparkles size={20} />
                                                ¡PERFECT RUN! +{epilogueWorld.perfectRunBonus || 300} XP Bonus
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })()}

                            {/* Botones de Acción */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleStartReview(epilogueWorld)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '14px 24px'
                                    }}
                                >
                                    <BookOpen size={18} />
                                    Modo Repaso
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowEpilogueModal(false);
                                        setEpilogueWorld(null);
                                        setSelectedWorld(null);
                                    }}
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-gold), #ffaa00)',
                                        color: '#000',
                                        padding: '14px 32px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ¡Explorar Nuevos Mundos! →
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    </Portal>
                )}
            </AnimatePresence>

            {/* NUEVO: Modal de Modo Repaso */}
            <AnimatePresence>
                {showReviewMode && reviewQuestions.length > 0 && (
                    <Portal>
                    <motion.div
                        className="review-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.95)', zIndex: 1002,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '20px',
                            backdropFilter: 'blur(12px)',
                            overflowY: 'auto'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                maxWidth: '700px', width: '100%',
                                background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-main))',
                                border: '1px solid #a855f7',
                                borderRadius: '24px',
                                padding: '32px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                margin: '20px 0'
                            }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📚</div>
                                <h2 style={{ color: '#a855f7', marginBottom: '8px' }}>
                                    Modo Repaso
                                </h2>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    Repasa los conceptos clave de Power BI
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {reviewQuestions.map((rq, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            background: 'rgba(0,0,0,0.3)',
                                            borderRadius: '16px',
                                            padding: '20px',
                                            border: rq.isCorrect === true
                                                ? '2px solid #22c55e'
                                                : rq.isCorrect === false
                                                    ? '2px solid #ef4444'
                                                    : '1px solid var(--border)'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '12px',
                                            fontSize: '0.85rem',
                                            color: 'var(--text-muted)'
                                        }}>
                                            <Target size={14} />
                                            {rq.skillName}
                                        </div>
                                        <p style={{
                                            color: 'var(--text-main)',
                                            fontWeight: '600',
                                            marginBottom: '16px'
                                        }}>
                                            {rq.q}
                                        </p>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '10px'
                                        }}>
                                            {rq.options.map((opt, optIdx) => (
                                                <button
                                                    key={optIdx}
                                                    onClick={() => {
                                                        if (rq.userAnswer !== null) return;
                                                        const isCorrect = opt === rq.a;
                                                        setReviewQuestions(prev =>
                                                            prev.map((q, i) =>
                                                                i === idx
                                                                    ? { ...q, userAnswer: opt, isCorrect }
                                                                    : q
                                                            )
                                                        );
                                                    }}
                                                    disabled={rq.userAnswer !== null}
                                                    style={{
                                                        padding: '12px',
                                                        borderRadius: '10px',
                                                        cursor: rq.userAnswer !== null ? 'default' : 'pointer',
                                                        fontSize: '0.9rem',
                                                        transition: 'all 0.2s',
                                                        background: rq.userAnswer === opt
                                                            ? rq.isCorrect
                                                                ? 'rgba(34, 197, 94, 0.3)'
                                                                : 'rgba(239, 68, 68, 0.3)'
                                                            : rq.userAnswer !== null && opt === rq.a
                                                                ? 'rgba(34, 197, 94, 0.2)'
                                                                : 'rgba(255,255,255,0.05)',
                                                        color: rq.userAnswer === opt
                                                            ? rq.isCorrect ? '#22c55e' : '#ef4444'
                                                            : 'var(--text-main)',
                                                        border: rq.userAnswer === opt
                                                            ? rq.isCorrect
                                                                ? '2px solid #22c55e'
                                                                : '2px solid #ef4444'
                                                            : rq.userAnswer !== null && opt === rq.a
                                                                ? '2px solid #22c55e'
                                                                : '1px solid var(--border)'
                                                    }}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        {rq.userAnswer !== null && !rq.isCorrect && (
                                            <p style={{
                                                marginTop: '12px',
                                                fontSize: '0.85rem',
                                                color: '#22c55e'
                                            }}>
                                                ✓ Respuesta correcta: {rq.a}
                                            </p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Resultado del Repaso */}
                            {reviewQuestions.every(q => q.userAnswer !== null) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '24px',
                                        padding: '24px',
                                        background: 'rgba(168, 85, 247, 0.1)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(168, 85, 247, 0.3)'
                                    }}
                                >
                                    <h3 style={{ color: '#a855f7', marginBottom: '12px' }}>
                                        Resultado del Repaso
                                    </h3>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                        {reviewQuestions.filter(q => q.isCorrect).length} / {reviewQuestions.length}
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                                        respuestas correctas
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setShowReviewMode(false);
                                            setReviewQuestions([]);
                                        }}
                                        style={{
                                            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                                            padding: '12px 24px'
                                        }}
                                    >
                                        Cerrar Repaso
                                    </button>
                                </motion.div>
                            )}

                            {/* Botón Cerrar */}
                            {!reviewQuestions.every(q => q.userAnswer !== null) && (
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => {
                                        setShowReviewMode(false);
                                        setReviewQuestions([]);
                                    }}
                                    style={{
                                        marginTop: '24px',
                                        width: '100%'
                                    }}
                                >
                                    Salir del Repaso
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                    </Portal>
                )}
            </AnimatePresence>
        </div >
    );
};

export default WorldMap;
