import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, Star, Filter } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { ACHIEVEMENTS } from '../../data/achievements';
import { getAssetPath } from '../../utils/assetPath';
import '../../styles/Achievements.css';

const AchievementImage = ({ src, alt, icon }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className="achievement-art" style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
                {icon}
            </div>
        );
    }
    return <img src={getAssetPath(src)} alt={alt} className="achievement-art" onError={() => setError(true)} />;
};

const Achievements = () => {
    const { user } = useGame();
    const [filter, setFilter] = useState('all'); // all, unlocked, locked

    const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
        const isUnlocked = user.achievements.includes(achievement.id);
        if (filter === 'unlocked') return isUnlocked;
        if (filter === 'locked') return !isUnlocked;
        return true;
    });

    // State for the selected achievement modal
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    return (
        <div className="achievements-page animate-fade-in">
            <div className="achievements-header">
                <div className="header-content">
                    <Trophy size={48} className="trophy-icon animate-bounce" />
                    <h1 className="font-heading">Galería de Logros</h1>
                    <p>Colecciona medallas y demuestra tu maestría</p>
                </div>

                <div className="achievements-stats">
                    <div className="stat-pill">
                        <span className="label">Desbloqueados</span>
                        <span className="value">{user.achievements.length} / {ACHIEVEMENTS.length}</span>
                    </div>
                    <div className="filter-group glass">
                        <Filter size={16} />
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </button>
                        <button
                            className={`filter-btn ${filter === 'unlocked' ? 'active' : ''}`}
                            onClick={() => setFilter('unlocked')}
                        >
                            Desbloqueados
                        </button>
                        <button
                            className={`filter-btn ${filter === 'locked' ? 'active' : ''}`}
                            onClick={() => setFilter('locked')}
                        >
                            Bloqueados
                        </button>
                    </div>
                </div>
            </div>

            <motion.div
                className="achievements-grid-3d"
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
                {filteredAchievements.map((achievement, index) => {
                    const isUnlocked = user.achievements.includes(achievement.id);

                    return (
                        <div key={achievement.id} className="achievement-card-container">
                            <motion.div
                                className={`achievement-card-3d ${isUnlocked ? 'unlocked' : 'locked'}`}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
                                    visible: { opacity: 1, scale: 1, rotateY: 0 }
                                }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                onClick={() => setSelectedAchievement(achievement)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card-face card-front">
                                    <div className="card-image-wrapper">
                                        <AchievementImage src={achievement.image} alt={achievement.title} icon={achievement.icon} />
                                        {!isUnlocked && <div className="locked-overlay"><Lock size={32} /></div>}
                                    </div>
                                    <div className={`rarity-badge ${achievement.rarity}`}>
                                        {achievement.rarity === 'legendary' && <Star size={12} fill="currentColor" />}
                                        {achievement.rarity}
                                    </div>
                                    <div className="card-content-front">
                                        <h3>{achievement.title}</h3>
                                        <div className="xp-pill">+{achievement.xp} XP</div>
                                    </div>
                                </div>
                                <div className="card-face card-back">
                                    <div className="back-content">
                                        <div className="achievement-icon-large">{achievement.icon}</div>
                                        <h3>{achievement.title}</h3>
                                        <p>{achievement.description}</p>
                                        <div className={`status-badge ${isUnlocked ? 'completed' : 'pending'}`}>
                                            {isUnlocked ? '¡Completado!' : 'En Progreso'}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Achievement Detail Modal */}
            {
                selectedAchievement && (
                    <div
                        className="modal-overlay"
                        onClick={() => setSelectedAchievement(null)}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.85)', zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(5px)',
                            animation: 'fadeIn 0.3s ease'
                        }}
                    >
                        <div
                            className="achievement-modal glass"
                            onClick={e => e.stopPropagation()}
                            style={{
                                maxWidth: '500px', width: '90%', padding: '30px',
                                textAlign: 'center', borderRadius: '24px',
                                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                position: 'relative'
                            }}
                        >
                            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                                {selectedAchievement.icon}
                            </div>
                            <h2 className="font-heading" style={{ color: 'var(--text-main)', fontSize: '2rem', marginBottom: '10px' }}>
                                {selectedAchievement.title}
                            </h2>
                            <div className={`rarity-badge ${selectedAchievement.rarity}`} style={{ display: 'inline-flex', marginBottom: '20px' }}>
                                {selectedAchievement.rarity.toUpperCase()}
                            </div>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.6' }}>
                                {selectedAchievement.description}
                            </p>

                            {/* Requirement Condition Display - Simplified */}
                            <div style={{
                                background: 'rgba(0,0,0,0.2)',
                                padding: '15px',
                                borderRadius: '12px',
                                marginBottom: '25px',
                                border: '1px solid var(--border)'
                            }}>
                                <p style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Requisito:</p>
                                <p style={{ color: 'var(--text-muted)' }}>{selectedAchievement.description}</p>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '15px',
                                alignItems: 'center'
                            }}>
                                <div className="xp-pill" style={{ fontSize: '1.1rem', padding: '8px 16px' }}>
                                    +{selectedAchievement.xp} XP
                                </div>
                                {user.achievements.includes(selectedAchievement.id) ? (
                                    <div style={{ color: '#22c55e', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Star size={20} fill="currentColor" /> ¡Completado!
                                    </div>
                                ) : (
                                    <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Lock size={18} /> Bloqueado
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={() => setSelectedAchievement(null)}
                                style={{ marginTop: '30px', width: '100%' }}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Achievements;
