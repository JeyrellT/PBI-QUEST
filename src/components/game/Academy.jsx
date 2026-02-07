import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Lightbulb, BookOpen, Zap, Target, Brain, Sparkles, Clock, TrendingUp, 
    CheckCircle2, Star, X, Search, Filter, Award, ChevronRight, 
    GraduationCap, Route, BookMarked, Bookmark, BookmarkCheck,
    Info, AlertCircle, Trophy
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { 
    academyCategories, 
    academyLessons, 
    learningPaths, 
    quickTips, 
    glossary,
    lessonQuizzes 
} from '../../data/academyData';
import AcademyQuiz from '../common/AcademyQuiz';
import '../../styles/Academy.css';

// Images
import pbiEcosystemImg from '../../assets/academy/pbi-ecosystem.png';
import interfaceViewsImg from '../../assets/academy/interface-views.png';
import dragDropImg from '../../assets/academy/drag-drop.png';
import dataSourcesImg from '../../assets/academy/data-sources.png';
import powerQueryRefineryImg from '../../assets/academy/power-query-refinery.png';
import magicColumnImg from '../../assets/academy/magic-column.png';
import daxIntroImg from '../../assets/academy/dax-intro.png';
import sumAggImg from '../../assets/academy/sum-agg.png';
import calculateImg from '../../assets/academy/calculate.png';
import chartGalleryImg from '../../assets/academy/chart-gallery.png';
import kpiCardImg from '../../assets/academy/kpi-card.png';
import slicersImg from '../../assets/academy/slicers.png';

const ACADEMY_IMAGES = {
    'pbi-ecosystem': pbiEcosystemImg,
    'interface-views': interfaceViewsImg,
    'drag-drop': dragDropImg,
    'data-sources': dataSourcesImg,
    'power-query-refinery': powerQueryRefineryImg,
    'magic-column': magicColumnImg,
    'dax-intro': daxIntroImg,
    'sum-agg': sumAggImg,
    'calculate': calculateImg,
    'chart-gallery': chartGalleryImg,
    'kpi-card': kpiCardImg,
    'slicers': slicersImg
};

// Neuroaprendizaje: Estimación de tiempo de lectura
const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

// Neuroaprendizaje: Nivel de dificultad numérico
const getDifficultyScore = (level) => {
    const levels = { 'Principiante': 1, 'Intermedio': 2, 'Avanzado': 3, 'Todos': 1 };
    return levels[level] || 1;
};

// XP rewards for lesson completion
const LESSON_XP = {
    'Principiante': 10,
    'Intermedio': 15,
    'Avanzado': 20,
    'Todos': 10
};

const Academy = () => {
    const { addXP } = useGame();
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showIntroModal, setShowIntroModal] = useState(() => {
        const hasSeenIntro = localStorage.getItem('academy_intro_seen');
        return !hasSeenIntro;
    });
    const [readLessons, setReadLessons] = useState(() => {
        const saved = localStorage.getItem('academy_read_lessons');
        return saved ? JSON.parse(saved) : [];
    });
    const [completedQuizzes, setCompletedQuizzes] = useState(() => {
        const saved = localStorage.getItem('academy_completed_quizzes');
        return saved ? JSON.parse(saved) : [];
    });
    const [bookmarkedLessons, setBookmarkedLessons] = useState(() => {
        const saved = localStorage.getItem('academy_bookmarks');
        return saved ? JSON.parse(saved) : [];
    });
    
    // New state for filters and search
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('lessons'); // 'lessons', 'paths', 'glossary'

    // Filter lessons
    const filteredLessons = useMemo(() => {
        let lessons = selectedCategory === 'all'
            ? academyLessons
            : academyLessons.filter(lesson => lesson.categoryId === selectedCategory);
        
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            lessons = lessons.filter(lesson => 
                lesson.title.toLowerCase().includes(query) ||
                lesson.description.toLowerCase().includes(query) ||
                lesson.content.toLowerCase().includes(query)
            );
        }
        
        // Difficulty filter
        if (difficultyFilter !== 'all') {
            lessons = lessons.filter(lesson => lesson.level === difficultyFilter);
        }
        
        return lessons;
    }, [selectedCategory, searchQuery, difficultyFilter]);

    // Get contextual tips for current category
    const currentTips = useMemo(() => {
        if (selectedCategory === 'all') {
            return Object.values(quickTips).flat().slice(0, 3);
        }
        return quickTips[selectedCategory] || quickTips.basics;
    }, [selectedCategory]);

    // Estadísticas de progreso
    const stats = useMemo(() => {
        const totalLessons = academyLessons.length;
        const completedLessons = readLessons.length;
        const progress = Math.round((completedLessons / totalLessons) * 100);
        const totalMinutes = academyLessons.reduce((acc, l) => acc + parseInt(l.duration) || 0, 0);
        const completedMinutes = academyLessons
            .filter(l => readLessons.includes(l.id))
            .reduce((acc, l) => acc + parseInt(l.duration) || 0, 0);
        const quizzesCompleted = completedQuizzes.length;
        const totalQuizzes = Object.keys(lessonQuizzes).length;
        return { totalLessons, completedLessons, progress, totalMinutes, completedMinutes, quizzesCompleted, totalQuizzes };
    }, [readLessons, completedQuizzes]);

    // Marcar lección como leída y dar XP
    const markAsRead = useCallback((lessonId, lesson) => {
        if (!readLessons.includes(lessonId)) {
            const updated = [...readLessons, lessonId];
            setReadLessons(updated);
            localStorage.setItem('academy_read_lessons', JSON.stringify(updated));
            
            // Award XP for reading
            const xpAmount = LESSON_XP[lesson.level] || 10;
            addXP(xpAmount, `Lección: ${lesson.title}`);
        }
    }, [readLessons, addXP]);

    // Handle quiz completion
    const handleQuizComplete = useCallback((lessonId, passed, correctCount, xpBonus) => {
        if (passed && !completedQuizzes.includes(lessonId)) {
            const updated = [...completedQuizzes, lessonId];
            setCompletedQuizzes(updated);
            localStorage.setItem('academy_completed_quizzes', JSON.stringify(updated));
            
            // Award bonus XP
            addXP(xpBonus, `Quiz completado: ${selectedLesson?.title}`);
        }
    }, [completedQuizzes, addXP, selectedLesson]);

    // Toggle bookmark
    const toggleBookmark = useCallback((lessonId) => {
        const updated = bookmarkedLessons.includes(lessonId)
            ? bookmarkedLessons.filter(id => id !== lessonId)
            : [...bookmarkedLessons, lessonId];
        setBookmarkedLessons(updated);
        localStorage.setItem('academy_bookmarks', JSON.stringify(updated));
    }, [bookmarkedLessons]);

    // Al abrir una lección, marcarla como leída
    const handleSelectLesson = (lesson) => {
        setSelectedLesson(lesson);
        markAsRead(lesson.id, lesson);
    };

    // Learning path progress
    const getPathProgress = (path) => {
        const completed = path.lessons.filter(id => readLessons.includes(id)).length;
        return Math.round((completed / path.lessons.length) * 100);
    };

    // Cerrar modal de introducción
    const closeIntroModal = () => {
        setShowIntroModal(false);
        localStorage.setItem('academy_intro_seen', 'true');
    };

    // Render content with improved formatting
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            const trimmed = line.trim();

            // Helper to render bold text
            const renderFormattedText = (text) => {
                const parts = text.split(/\*\*([^*]+)\*\*/g);
                return parts.map((part, i) =>
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                );
            };

            // Headers
            if (trimmed.startsWith('###')) {
                return <h3 key={index}>{trimmed.replace('###', '').trim()}</h3>;
            }

            // Game tips (special styling)
            if (trimmed.startsWith('🎮')) {
                return <p key={index} className="game-tip-highlight">{renderFormattedText(trimmed)}</p>;
            }

            // Bullet points
            if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                return <li key={index}>{renderFormattedText(trimmed.replace(/^[-•]/, '').trim())}</li>;
            }

            // Numbered lists
            if (/^[0-9]+\./.test(trimmed)) {
                return <li key={index}>{renderFormattedText(trimmed)}</li>;
            }

            // Code blocks (DAX)
            if (trimmed.includes(' = ') && (trimmed.includes('SUM(') || trimmed.includes('CALCULATE(') || trimmed.includes('IF(') || trimmed.includes('AVERAGE(') || trimmed.includes('COUNTROWS(') || trimmed.includes('DIVIDE(') || trimmed.includes('DISTINCTCOUNT(') || trimmed.includes('MAX(') || trimmed.includes('MIN(') || trimmed.includes('COUNT(') || trimmed.includes('OR(') || trimmed.includes('AND(') || trimmed.includes('SWITCH('))) {
                return (
                    <pre key={index} className="code-block dax-code">
                        <code>{trimmed}</code>
                    </pre>
                );
            }

            // M code (Power Query)
            if (trimmed.startsWith('=') && !trimmed.startsWith('==')) {
                return (
                    <pre key={index} className="code-block m-code">
                        <code>{trimmed}</code>
                    </pre>
                );
            }

            // Tables (lines with |)
            if (trimmed.includes('|') && trimmed.startsWith('|')) {
                const cells = trimmed.split('|').filter(c => c.trim());
                const isHeader = index > 0 && content.split('\n')[index - 1]?.includes('|');
                return (
                    <div key={index} className={`table-row ${!isHeader ? 'table-header' : ''}`}>
                        {cells.map((cell, i) => (
                            <span key={i} className="table-cell">{renderFormattedText(cell.trim())}</span>
                        ))}
                    </div>
                );
            }

            return trimmed ? <p key={index}>{renderFormattedText(trimmed)}</p> : <br key={index} />;
        });
    };

    return (
        <div className="academy-container">
            {/* Modal de Introducción a la Academia */}
            <AnimatePresence>
                {showIntroModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeIntroModal}
                    >
                        <motion.div
                            className="academy-intro-modal glass"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={closeIntroModal}>
                                <X size={24} />
                            </button>

                            <div className="modal-header">
                                <div className="modal-icon">
                                    <BookOpen size={48} strokeWidth={1.5} />
                                </div>
                                <h2>¡Bienvenido a la Academia! 📚</h2>
                                <p className="modal-subtitle">
                                    Tu centro de conocimiento de Power BI
                                </p>
                            </div>

                            <div className="modal-content">
                                <div className="intro-section">
                                    <div className="intro-highlight">
                                        <Sparkles size={20} />
                                        <span>¿Qué encontrarás aquí?</span>
                                    </div>
                                    <p className="intro-description">
                                        La Academia es tu biblioteca personal de Power BI. Aquí encontrarás todo lo que necesitas 
                                        para dominar cada concepto, desde lo más básico hasta técnicas avanzadas de DAX.
                                    </p>
                                </div>

                                <div className="categories-preview">
                                    {academyCategories.map((category) => (
                                        <motion.div
                                            key={category.id}
                                            className="category-preview-card"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <div className="category-icon" style={{ background: category.gradient }}>
                                                <span>{category.icon}</span>
                                            </div>
                                            <div className="category-info">
                                                <h4>{category.title}</h4>
                                                <p>{category.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="intro-features">
                                    <div className="feature-item">
                                        <Brain size={24} className="feature-icon" />
                                        <div>
                                            <strong>Aprende a tu ritmo</strong>
                                            <p>Lecciones cortas de 3-8 minutos con ejemplos prácticos</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <Target size={24} className="feature-icon" />
                                        <div>
                                            <strong>Conectado a las misiones</strong>
                                            <p>Cada lección está vinculada a los mundos del juego</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <Zap size={24} className="feature-icon" />
                                        <div>
                                            <strong>Referencias rápidas</strong>
                                            <p>Encuentra rápido funciones DAX, tips y soluciones</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="intro-tip">
                                    <Lightbulb size={20} />
                                    <div>
                                        <strong>💡 Tip Pro:</strong> Si te atascas en una misión, busca la lección relacionada 
                                        en la Academia. Cada misión incluye referencias a las lecciones que necesitas.
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary btn-large" onClick={closeIntroModal}>
                                    <Sparkles size={20} />
                                    ¡Empezar a Aprender!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {selectedLesson ? (
                    <motion.div
                        key="lesson-detail"
                        className="lesson-detail"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="btn btn-ghost back-button" onClick={() => setSelectedLesson(null)}>
                            ← Volver a la Academia
                        </button>

                        <div className="detail-content glass" style={{ position: 'relative', overflow: 'hidden' }}>
                            <div className="detail-hero-gradient" style={{
                                background: academyCategories.find(c => c.id === selectedLesson.categoryId)?.gradient,
                                position: 'absolute', top: 0, left: 0, right: 0, height: '120px', opacity: 0.2, zIndex: 0
                            }}></div>
                            
                            {/* Neuroaprendizaje: Indicador de categoría */}
                            <div className="lesson-category-indicator" style={{ position: 'relative', zIndex: 1 }}>
                                {academyCategories.find(c => c.id === selectedLesson.categoryId)?.icon}{' '}
                                {academyCategories.find(c => c.id === selectedLesson.categoryId)?.title}
                            </div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2>{selectedLesson.title}</h2>
                                
                                {/* Neuroaprendizaje: Meta información mejorada */}
                                <div className="detail-meta-header enhanced">
                                    <span className="lesson-meta-item">
                                        <Clock size={16} />
                                        {selectedLesson.duration}
                                    </span>
                                    <span className="lesson-meta-item">
                                        <TrendingUp size={16} />
                                        {selectedLesson.level}
                                    </span>
                                    <span className="lesson-meta-item difficulty">
                                        {[...Array(getDifficultyScore(selectedLesson.level))].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </span>
                                    {readLessons.includes(selectedLesson.id) && (
                                        <span className="lesson-meta-item completed">
                                            <CheckCircle2 size={16} />
                                            Leído
                                        </span>
                                    )}
                                </div>

                                {/* Neuroaprendizaje: Resumen antes del contenido */}
                                <div className="lesson-summary-box">
                                    <Brain size={20} />
                                    <div>
                                        <strong>Lo que aprenderás:</strong>
                                        <p>{selectedLesson.description}</p>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                {selectedLesson.imageId && ACADEMY_IMAGES[selectedLesson.imageId] && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="lesson-hero-image-container"
                                        style={{ margin: '2rem 0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <img
                                            src={ACADEMY_IMAGES[selectedLesson.imageId]}
                                            alt={selectedLesson.title}
                                            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }}
                                        />
                                    </motion.div>
                                )}

                                {/* YouTube Video Embed */}
                                {selectedLesson.isVideo && selectedLesson.youtubeId && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="youtube-video-container"
                                        style={{
                                            margin: '2rem 0',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                            border: '2px solid rgba(255, 0, 0, 0.3)',
                                            position: 'relative',
                                            paddingBottom: '56.25%', /* 16:9 aspect ratio */
                                            height: 0
                                        }}
                                    >
                                        <iframe
                                            src={`https://www.youtube.com/embed/${selectedLesson.youtubeId}?rel=0&modestbranding=1`}
                                            title={selectedLesson.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                border: 'none'
                                            }}
                                        />
                                    </motion.div>
                                )}

                                <div className="rich-content">
                                    {renderContent(selectedLesson.content)}
                                </div>

                                {/* Quiz Section */}
                                {lessonQuizzes[selectedLesson.id] && (
                                    <motion.div 
                                        className="quiz-section"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="quiz-section-header">
                                            <Award size={24} />
                                            <div>
                                                <h3>¡Pon a prueba tu conocimiento!</h3>
                                                <p>Completa el quiz opcional para ganar XP bonus</p>
                                            </div>
                                            {completedQuizzes.includes(selectedLesson.id) && (
                                                <span className="quiz-completed-badge">
                                                    <CheckCircle2 size={16} /> Completado
                                                </span>
                                            )}
                                        </div>
                                        
                                        {!completedQuizzes.includes(selectedLesson.id) ? (
                                            <AcademyQuiz 
                                                quiz={lessonQuizzes[selectedLesson.id]}
                                                lessonTitle={selectedLesson.title}
                                                onComplete={(passed, correctCount) => 
                                                    handleQuizComplete(
                                                        selectedLesson.id, 
                                                        passed, 
                                                        correctCount, 
                                                        lessonQuizzes[selectedLesson.id].xpBonus
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="quiz-already-completed">
                                                <Trophy size={32} />
                                                <p>¡Ya completaste este quiz y ganaste +{lessonQuizzes[selectedLesson.id].xpBonus} XP!</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Game Relevance Badge */}
                                {selectedLesson.gameRelevance && (
                                    <div className="game-relevance-section">
                                        <span className="relevance-label">📍 Útil para:</span>
                                        <div className="relevance-badges">
                                            {selectedLesson.gameRelevance.map(worldId => (
                                                <span key={worldId} className="world-badge">
                                                    {worldId === 'office' && '🏢 Dunder Mifflin'}
                                                    {worldId === 'datarescue' && '🦸‍♂️ DataRescue'}
                                                    {worldId === 'stark' && '🦸 Stark Industries'}
                                                    {worldId === 'squid-game' && '🎰 Squid Game'}
                                                    {worldId === 'hogwarts' && '🧙 Gringotts'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Related Lessons Section */}
                                {selectedLesson.relatedLessons && selectedLesson.relatedLessons.length > 0 && (
                                    <div className="related-lessons-section">
                                        <span className="relevance-label">📚 Lecciones relacionadas:</span>
                                        <div className="related-lessons-grid">
                                            {selectedLesson.relatedLessons.map(lessonId => {
                                                const relatedLesson = academyLessons.find(l => l.id === lessonId);
                                                if (!relatedLesson) return null;
                                                const category = academyCategories.find(c => c.id === relatedLesson.categoryId);
                                                return (
                                                    <motion.button
                                                        key={lessonId}
                                                        className="related-lesson-card"
                                                        onClick={() => setSelectedLesson(relatedLesson)}
                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        style={{
                                                            '--card-gradient': category?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                        }}
                                                    >
                                                        <span className="related-lesson-icon">
                                                            {relatedLesson.isVideo ? '🎬' : category?.icon || '📄'}
                                                        </span>
                                                        <span className="related-lesson-title">{relatedLesson.title}</span>
                                                        <span className="related-lesson-duration">{relatedLesson.duration}</span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="official-link-box">
                                    <motion.a
                                        href={selectedLesson.officialLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`btn ${selectedLesson.isVideo ? 'btn-youtube' : 'btn-microsoft'}`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {selectedLesson.isVideo ? (
                                            <>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                </svg>
                                                Ver video completo en YouTube ↗
                                            </>
                                        ) : (
                                            <>
                                                <svg width="16" height="16" viewBox="0 0 21 21" fill="none" style={{ marginRight: '8px' }}>
                                                    <rect width="10" height="10" fill="#F25022" />
                                                    <rect x="11" width="10" height="10" fill="#7FBA00" />
                                                    <rect y="11" width="10" height="10" fill="#00A4EF" />
                                                    <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
                                                </svg>
                                                Ver documentación oficial en Microsoft Learn ↗
                                            </>
                                        )}
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="academy-grid"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <header className="academy-header">
                            <div className="academy-title-row">
                                <div>
                                    <h1>Academia Power BI</h1>
                                    <p>Aprende paso a paso con la guía oficial de Microsoft</p>
                                </div>
                                <div className="progress-stats-container">
                                    <div className="progress-stat-item">
                                        <Sparkles size={18} className="stat-icon gold" />
                                        <span className="stat-value">{stats.completedLessons}</span>
                                        <span className="stat-label">/ {stats.totalLessons} lecciones</span>
                                    </div>
                                    <div className="progress-stat-item mini">
                                        <Award size={16} className="stat-icon" />
                                        <span className="stat-value">{stats.quizzesCompleted}</span>
                                        <span className="stat-label">/ {stats.totalQuizzes} quizzes</span>
                                    </div>
                                    <div className="progress-bar-container">
                                        <motion.div 
                                            className="progress-bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stats.progress}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                    <span className="progress-percentage">{stats.progress}% completado</span>
                                </div>
                            </div>
                        </header>

                        {/* Tab Navigation */}
                        <div className="academy-tabs-nav">
                            <button 
                                className={`tab-btn ${activeTab === 'lessons' ? 'active' : ''}`}
                                onClick={() => setActiveTab('lessons')}
                            >
                                <BookOpen size={18} /> Lecciones
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'paths' ? 'active' : ''}`}
                                onClick={() => setActiveTab('paths')}
                            >
                                <Route size={18} /> Rutas de Aprendizaje
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'glossary' ? 'active' : ''}`}
                                onClick={() => setActiveTab('glossary')}
                            >
                                <BookMarked size={18} /> Glosario
                            </button>
                            {bookmarkedLessons.length > 0 && (
                                <button 
                                    className={`tab-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('bookmarks')}
                                >
                                    <Bookmark size={18} /> Favoritos ({bookmarkedLessons.length})
                                </button>
                            )}
                        </div>

                        {/* ============ LESSONS TAB ============ */}
                        {activeTab === 'lessons' && (
                            <>
                                {/* Search and Filter Bar */}
                                <div className="search-filter-bar glass">
                                    <div className="search-input-wrapper">
                                        <Search size={20} />
                                        <input 
                                            type="text"
                                            placeholder="Buscar lecciones, DAX, Power Query..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="search-input"
                                        />
                                        {searchQuery && (
                                            <button className="clear-search" onClick={() => setSearchQuery('')}>
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="filter-buttons">
                                        <Filter size={18} />
                                        {['all', 'Principiante', 'Intermedio', 'Avanzado'].map(level => (
                                            <button 
                                                key={level}
                                                className={`filter-btn ${difficultyFilter === level ? 'active' : ''}`}
                                                onClick={() => setDifficultyFilter(level)}
                                            >
                                                {level === 'all' ? 'Todos' : level}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Tips Panel */}
                                <motion.div 
                                    className="tips-box glass"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="tips-header">
                                        <Lightbulb size={24} className="tips-icon" />
                                        <h3>
                                            {selectedCategory === 'all' ? 'Tips Rápidos' : `Tips de ${academyCategories.find(c => c.id === selectedCategory)?.title}`}
                                        </h3>
                                    </div>
                                    <div className="tips-grid">
                                        {currentTips.map((tip, idx) => (
                                            <div key={idx} className="tip-item">
                                                <div className="tip-icon-wrapper" style={{ 
                                                    background: `linear-gradient(135deg, ${['#10b981', '#f59e0b', '#8b5cf6'][idx % 3]}, ${['#059669', '#d97706', '#7c3aed'][idx % 3]})`
                                                }}>
                                                    <span style={{ fontSize: '1.1rem' }}>{tip.icon}</span>
                                                </div>
                                                <div className="tip-content">
                                                    <p>{tip.tip}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Categories Tabs */}
                                <nav className="categories-tabs">
                                    <motion.button
                                        className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory('all')}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        🎓 Todos
                                    </motion.button>
                                    {academyCategories.map(cat => (
                                        <motion.button
                                            key={cat.id}
                                            className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {cat.icon} {cat.title}
                                            {cat.lessonCount && <span className="tab-count">{cat.lessonCount}</span>}
                                        </motion.button>
                                    ))}
                                </nav>

                                {/* Search Results Info */}
                                {(searchQuery || difficultyFilter !== 'all') && (
                                    <div className="search-results-info">
                                        <Info size={16} />
                                        <span>
                                            {filteredLessons.length} {filteredLessons.length === 1 ? 'lección encontrada' : 'lecciones encontradas'}
                                            {searchQuery && ` para "${searchQuery}"`}
                                            {difficultyFilter !== 'all' && ` (${difficultyFilter})`}
                                        </span>
                                        <button 
                                            className="clear-filters"
                                            onClick={() => { setSearchQuery(''); setDifficultyFilter('all'); }}
                                        >
                                            Limpiar filtros
                                        </button>
                                    </div>
                                )}

                                {/* Lessons Grid */}
                                <motion.div
                                    className="lessons-grid"
                                    initial="hidden"
                                    animate="visible"
                                    key={selectedCategory + searchQuery + difficultyFilter}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                                    }}
                                >
                                    {filteredLessons.length === 0 ? (
                                        <div className="no-results">
                                            <AlertCircle size={48} />
                                            <h3>No se encontraron lecciones</h3>
                                            <p>Intenta con otros términos de búsqueda o filtros</p>
                                        </div>
                                    ) : (
                                        filteredLessons.map(lesson => {
                                            const category = academyCategories.find(c => c.id === lesson.categoryId);
                                            const isCompleted = readLessons.includes(lesson.id);
                                            const hasQuiz = lessonQuizzes[lesson.id];
                                            const quizCompleted = completedQuizzes.includes(lesson.id);
                                            const isBookmarked = bookmarkedLessons.includes(lesson.id);
                                            
                                            return (
                                                <motion.div
                                                    key={lesson.id}
                                                    className={`lesson-card glass ${lesson.isVideo ? 'is-video' : ''} ${isCompleted ? 'completed' : ''}`}
                                                    onClick={() => handleSelectLesson(lesson)}
                                                    variants={{
                                                        hidden: { opacity: 0, y: 20 },
                                                        visible: { opacity: 1, y: 0 }
                                                    }}
                                                    whileHover={{ scale: 1.02, y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="lesson-card-header" style={{ background: category?.gradient, height: '6px', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                                                    
                                                    <div className="lesson-badges">
                                                        {isCompleted && (
                                                            <div className="lesson-completed-badge" title="Ya completaste esta lección">
                                                                <CheckCircle2 size={18} />
                                                            </div>
                                                        )}
                                                        {hasQuiz && (
                                                            <div className={`lesson-quiz-badge ${quizCompleted ? 'completed' : ''}`} title={quizCompleted ? 'Quiz completado' : 'Tiene quiz disponible'}>
                                                                <Award size={16} />
                                                            </div>
                                                        )}
                                                        {isBookmarked && (
                                                            <div className="lesson-bookmark-badge" title="En favoritos">
                                                                <Bookmark size={16} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div style={{ marginTop: '10px' }}>
                                                        <h3>{lesson.isVideo && '🎬 '}{lesson.title}</h3>
                                                        <p>{lesson.description}</p>
                                                    </div>
                                                    
                                                    <div className="lesson-meta">
                                                        <span className="lesson-duration">{lesson.isVideo ? '▶️' : '⏱️'} {lesson.duration}</span>
                                                        <span className={`lesson-level-badge lesson-badge ${lesson.level.toLowerCase()}`}>
                                                            {[...Array(getDifficultyScore(lesson.level))].map((_, i) => (
                                                                <Star key={i} size={10} fill="currentColor" style={{ marginRight: '2px' }} />
                                                            ))}
                                                            {lesson.level}
                                                        </span>
                                                        <span className="lesson-xp-badge">
                                                            +{LESSON_XP[lesson.level] || 10} XP
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </motion.div>
                            </>
                        )}

                        {/* ============ LEARNING PATHS TAB ============ */}
                        {activeTab === 'paths' && (
                            <div className="learning-paths-container">
                                <div className="paths-intro">
                                    <GraduationCap size={32} />
                                    <div>
                                        <h2>Rutas de Aprendizaje</h2>
                                        <p>Sigue caminos estructurados para dominar Power BI paso a paso</p>
                                    </div>
                                </div>

                                <div className="paths-grid">
                                    {learningPaths.map(path => {
                                        const progress = getPathProgress(path);
                                        const isComplete = progress === 100;
                                        
                                        return (
                                            <motion.div 
                                                key={path.id}
                                                className={`path-card glass ${isComplete ? 'completed' : ''}`}
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <div className="path-header" style={{ borderColor: path.color }}>
                                                    <span className="path-badge" style={{ background: path.color }}>{path.badge}</span>
                                                    <div className="path-info">
                                                        <h3>{path.title}</h3>
                                                        <p>{path.description}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="path-meta">
                                                    <span><Clock size={14} /> {path.estimatedTime}</span>
                                                    <span><Star size={14} /> {path.difficulty}</span>
                                                    <span><Sparkles size={14} /> +{path.xpReward} XP</span>
                                                </div>

                                                <div className="path-progress">
                                                    <div className="path-progress-bar">
                                                        <div 
                                                            className="path-progress-fill" 
                                                            style={{ width: `${progress}%`, background: path.color }}
                                                        />
                                                    </div>
                                                    <span>{progress}% completado</span>
                                                </div>

                                                <div className="path-lessons">
                                                    {path.lessons.map((lessonId, idx) => {
                                                        const lesson = academyLessons.find(l => l.id === lessonId);
                                                        const isLessonComplete = readLessons.includes(lessonId);
                                                        
                                                        return lesson ? (
                                                            <button 
                                                                key={lessonId}
                                                                className={`path-lesson-item ${isLessonComplete ? 'completed' : ''}`}
                                                                onClick={() => handleSelectLesson(lesson)}
                                                            >
                                                                <span className="lesson-number">{idx + 1}</span>
                                                                <span className="lesson-title">{lesson.title}</span>
                                                                {isLessonComplete ? (
                                                                    <CheckCircle2 size={16} className="check" />
                                                                ) : (
                                                                    <ChevronRight size={16} />
                                                                )}
                                                            </button>
                                                        ) : null;
                                                    })}
                                                </div>

                                                {isComplete && (
                                                    <div className="path-complete-badge">
                                                        <Trophy size={20} /> ¡Ruta Completada!
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ============ GLOSSARY TAB ============ */}
                        {activeTab === 'glossary' && (
                            <div className="glossary-container">
                                <div className="glossary-intro">
                                    <BookMarked size={32} />
                                    <div>
                                        <h2>Glosario de Términos</h2>
                                        <p>Referencia rápida de conceptos clave de Power BI</p>
                                    </div>
                                </div>

                                <div className="glossary-grid">
                                    {glossary.map((item) => {
                                        const category = academyCategories.find(c => c.id === item.category);
                                        return (
                                            <motion.div 
                                                key={item.term}
                                                className="glossary-card glass"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <div className="glossary-term">
                                                    <span className="term-icon" style={{ background: category?.gradient }}>
                                                        {category?.icon || '📖'}
                                                    </span>
                                                    <strong>{item.term}</strong>
                                                </div>
                                                <p>{item.definition}</p>
                                                <span className="glossary-category">{category?.title || item.category}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ============ BOOKMARKS TAB ============ */}
                        {activeTab === 'bookmarks' && (
                            <div className="bookmarks-container">
                                <div className="bookmarks-intro">
                                    <Bookmark size={32} />
                                    <div>
                                        <h2>Mis Favoritos</h2>
                                        <p>Lecciones que has guardado para acceso rápido</p>
                                    </div>
                                </div>

                                <motion.div
                                    className="lessons-grid"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                                    }}
                                >
                                    {bookmarkedLessons.length === 0 ? (
                                        <div className="no-results">
                                            <Bookmark size={48} />
                                            <h3>No tienes favoritos</h3>
                                            <p>Marca lecciones con el ícono de marcador para accederlas rápido</p>
                                        </div>
                                    ) : (
                                        bookmarkedLessons.map(lessonId => {
                                            const lesson = academyLessons.find(l => l.id === lessonId);
                                            if (!lesson) return null;
                                            
                                            const category = academyCategories.find(c => c.id === lesson.categoryId);
                                            const isCompleted = readLessons.includes(lesson.id);
                                            
                                            return (
                                                <motion.div
                                                    key={lesson.id}
                                                    className={`lesson-card glass ${isCompleted ? 'completed' : ''}`}
                                                    onClick={() => handleSelectLesson(lesson)}
                                                    variants={{
                                                        hidden: { opacity: 0, y: 20 },
                                                        visible: { opacity: 1, y: 0 }
                                                    }}
                                                    whileHover={{ scale: 1.02, y: -5 }}
                                                >
                                                    <div className="lesson-card-header" style={{ background: category?.gradient, height: '6px', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                                                    <div className="lesson-badges">
                                                        {isCompleted && (
                                                            <div className="lesson-completed-badge">
                                                                <CheckCircle2 size={18} />
                                                            </div>
                                                        )}
                                                        <div className="lesson-bookmark-badge active">
                                                            <BookmarkCheck size={16} />
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <h3>{lesson.title}</h3>
                                                        <p>{lesson.description}</p>
                                                    </div>
                                                    <div className="lesson-meta">
                                                        <span className="lesson-duration">⏱️ {lesson.duration}</span>
                                                        <span className="lesson-level-badge">{lesson.level}</span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Academy;
