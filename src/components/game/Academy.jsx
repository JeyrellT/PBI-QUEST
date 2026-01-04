import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, BookOpen, Zap, Target, Brain, Sparkles, Clock, TrendingUp, CheckCircle2, Star } from 'lucide-react';
import { academyCategories, academyLessons } from '../../data/academyData';
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

const Academy = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [readLessons, setReadLessons] = useState(() => {
        const saved = localStorage.getItem('academy_read_lessons');
        return saved ? JSON.parse(saved) : [];
    });

    const filteredLessons = selectedCategory === 'all'
        ? academyLessons
        : academyLessons.filter(lesson => lesson.categoryId === selectedCategory);

    // Estadísticas de progreso
    const stats = useMemo(() => {
        const totalLessons = academyLessons.length;
        const completedLessons = readLessons.length;
        const progress = Math.round((completedLessons / totalLessons) * 100);
        const totalMinutes = academyLessons.reduce((acc, l) => acc + parseInt(l.duration) || 0, 0);
        const completedMinutes = academyLessons
            .filter(l => readLessons.includes(l.id))
            .reduce((acc, l) => acc + parseInt(l.duration) || 0, 0);
        return { totalLessons, completedLessons, progress, totalMinutes, completedMinutes };
    }, [readLessons]);

    // Marcar lección como leída
    const markAsRead = (lessonId) => {
        if (!readLessons.includes(lessonId)) {
            const updated = [...readLessons, lessonId];
            setReadLessons(updated);
            localStorage.setItem('academy_read_lessons', JSON.stringify(updated));
        }
    };

    // Al abrir una lección, marcarla como leída
    const handleSelectLesson = (lesson) => {
        setSelectedLesson(lesson);
        markAsRead(lesson.id);
    };

    return (
        <div className="academy-container">
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
                                    {selectedLesson.content.split('\n').map((line, index) => {
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

                                        // Code blocks (lines starting with specific patterns)
                                        if (trimmed.includes(' = ') && (trimmed.includes('SUM(') || trimmed.includes('CALCULATE(') || trimmed.includes('IF(') || trimmed.includes('AVERAGE(') || trimmed.includes('COUNTROWS(') || trimmed.includes('DIVIDE(') || trimmed.includes('DISTINCTCOUNT(') || trimmed.includes('MAX(') || trimmed.includes('MIN(') || trimmed.includes('COUNT(') || trimmed.includes('OR(') || trimmed.includes('AND('))) {
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
                                            const isHeader = index > 0 && selectedLesson.content.split('\n')[index - 1]?.includes('|');
                                            return (
                                                <div key={index} className={`table-row ${!isHeader ? 'table-header' : ''}`}>
                                                    {cells.map((cell, i) => (
                                                        <span key={i} className="table-cell">{renderFormattedText(cell.trim())}</span>
                                                    ))}
                                                </div>
                                            );
                                        }

                                        return trimmed ? <p key={index}>{renderFormattedText(trimmed)}</p> : <br key={index} />;
                                    })}
                                </div>

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
                                {/* Neuroaprendizaje: Barra de progreso global */}
                                <div className="progress-stats-container">
                                    <div className="progress-stat-item">
                                        <Sparkles size={18} className="stat-icon gold" />
                                        <span className="stat-value">{stats.completedLessons}</span>
                                        <span className="stat-label">/ {stats.totalLessons} lecciones</span>
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

                        {/* Cuadro de Tips Rápidos */}
                        <motion.div 
                            className="tips-box glass"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="tips-header">
                                <Lightbulb size={24} className="tips-icon" />
                                <h3>Tips Rápidos para Aprender</h3>
                            </div>
                            <div className="tips-grid">
                                <div className="tip-item">
                                    <div className="tip-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                        <BookOpen size={18} />
                                    </div>
                                    <div className="tip-content">
                                        <strong>Lee antes de jugar</strong>
                                        <p>Revisa la lección correspondiente antes de cada misión para entender los conceptos.</p>
                                    </div>
                                </div>
                                <div className="tip-item">
                                    <div className="tip-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                                        <Zap size={18} />
                                    </div>
                                    <div className="tip-content">
                                        <strong>Practica con atajos</strong>
                                        <p><kbd>Ctrl+Enter</kbd> ejecuta DAX • <kbd>Ctrl+S</kbd> guarda • <kbd>Alt+F4</kbd> para emergencias 😅</p>
                                    </div>
                                </div>
                                <div className="tip-item">
                                    <div className="tip-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                                        <Target size={18} />
                                    </div>
                                    <div className="tip-content">
                                        <strong>Enfócate por categoría</strong>
                                        <p>Completa todos los temas de una categoría antes de pasar a la siguiente.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

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
                                </motion.button>
                            ))}
                        </nav>

                        <motion.div
                            className="lessons-grid"
                            initial="hidden"
                            animate="visible"
                            key={selectedCategory} // Re-animate on category change
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.05 }
                                }
                            }}
                        >
                            {filteredLessons.map(lesson => {
                                const category = academyCategories.find(c => c.id === lesson.categoryId);
                                const isCompleted = readLessons.includes(lesson.id);
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
                                        {isCompleted && (
                                            <div className="lesson-completed-badge" title="Ya leíste esta lección">
                                                <CheckCircle2 size={20} />
                                            </div>
                                        )}
                                        <div style={{ marginTop: '10px' }}>
                                            <h3>{lesson.isVideo && '🎬 '}{lesson.title}</h3>
                                            <p>{lesson.description}</p>
                                        </div>
                                        <div className="lesson-meta">
                                            <span className="lesson-duration">{lesson.isVideo ? '▶️' : '⏱️'} {lesson.duration}</span>
                                            <span className={`lesson-level-badge lesson-badge ${lesson.level.toLowerCase()}`} style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                                                {[...Array(getDifficultyScore(lesson.level))].map((_, i) => (
                                                    <Star key={i} size={10} fill="currentColor" style={{ marginRight: '2px' }} />
                                                ))}
                                                {lesson.level}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Academy;
