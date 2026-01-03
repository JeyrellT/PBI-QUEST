import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Target, TrendingUp, Flame, Zap, Star, Clock } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WORLDS } from '../../data/worlds';
import { getAssetPath } from '../../utils/assetPath';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = Number(value) || 0;
        if (start === end) {
            setCount(end);
            return;
        }

        const incrementTime = Math.abs(duration / (end || 1));
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span className="animated-number">{count}</span>;
};

// Progress Ring Component
const ProgressRing = ({ progress = 0, size = 60, strokeWidth = 6, color = 'var(--primary)' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));
    const offset = circumference - (safeProgress / 100) * circumference;

    return (
        <svg className="progress-ring" width={size} height={size}>
            <circle
                className="progress-ring-bg"
                stroke="var(--border)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="progress-ring-fill"
                stroke={color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
        </svg>
    );
};

const Dashboard = ({ setActiveTab }) => {
    const { user, getTier, getStreakMultiplier, levelStats } = useGame();

    // Safety check for user context
    if (!user) return <div className="p-8 text-center">Cargando datos del analista...</div>;

    const { xpInCurrentLevel, xpNeededForLevel, progress } = levelStats || { xpInCurrentLevel: 0, xpNeededForLevel: 100, progress: 0 };

    // Narrative Rank Logic
    const getRank = (level) => {
        if (level <= 2) return { title: 'Analista Novato', icon: '🌱', color: '#94a3b8' };
        if (level <= 5) return { title: 'Estratega de Datos', icon: '📊', color: '#38bdf8' };
        if (level <= 8) return { title: 'Arquitecto de Insights', icon: '🏛️', color: '#818cf8' };
        if (level <= 10) return { title: 'Maestro de la Visualización', icon: '🔮', color: '#fbbf24' };
        return { title: 'Leyenda de los Datos', icon: '👑', color: '#f472b6' };
    };

    const rank = getRank(user.level || 1);
    const tier = getTier ? getTier(user.xp || 0) : { name: 'Bronce', icon: '🥉', color: '#cd7f32' };
    const multiplier = getStreakMultiplier ? getStreakMultiplier(user.streak || 0) : 1;

    const totalMissions = WORLDS.reduce((acc, w) => acc + (w.missions?.length || 0), 0);
    const completedCount = (user.completedMissions?.length || 0);
    const completionRate = totalMissions > 0 ? Math.round((completedCount / totalMissions) * 100) : 0;

    const stats = [
        { label: 'Misiones', value: completedCount, icon: Target, color: 'var(--primary)', emoji: '🎯' },
        { label: 'Nivel', value: user.level || 1, icon: TrendingUp, color: 'var(--secondary)', emoji: '⬆️' },
        { label: 'Logros', value: user.achievements?.length || 0, icon: Trophy, color: 'var(--accent-gold)', emoji: '🏆' },
        { label: 'Monedas', value: user.coins || 0, icon: Star, color: 'var(--accent-green)', emoji: '💰' },
    ];

    const timeAgo = (dateString) => {
        if (!dateString) return 'Desconocido';
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        if (seconds < 60) return 'Hace un momento';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `Hace ${minutes}m`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `Hace ${hours}h`;
        const days = Math.floor(hours / 24);
        return `Hace ${days}d`;
    };

    const getLogIcon = (type) => {
        switch (type) {
            case 'mission': return '✅';
            case 'achievement': return '🏅';
            case 'unlock': return '🌍';
            case 'level_up': return '🆙';
            case 'bonus': return '✨';
            default: return '📌';
        }
    };

    const getLogTitle = (type) => {
        switch (type) {
            case 'mission': return 'Misión completada';
            case 'achievement': return 'Logro desbloqueado';
            case 'unlock': return 'Mundo desbloqueado';
            case 'level_up': return '¡Subiste de nivel!';
            case 'bonus': return 'Bono recibido';
            default: return 'Actividad';
        }
    };

    const recentActivity = user.scoreLog
        ? [...user.scoreLog].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(log => ({
            action: getLogTitle(log.type),
            detail: log.reason,
            time: timeAgo(log.date),
            emoji: getLogIcon(log.type)
        }))
        : [];

    const recommendedMission = WORLDS[0]?.missions[0] || { title: 'Sin misiones', description: 'No hay misiones disponibles', xp: 0, coins: 0 };

    return (
        <div className="dashboard page-container-animate">
            <div className="liquid-geometry">
                <motion.div
                    className="blob-obj"
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 90, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <motion.section
                className="dashboard-hero-modern glass"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-background">
                    <img src={getAssetPath('/images/dashboard-hero.png')} alt="Hero" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-badges">
                        <motion.div className="rank-badge" style={{ backgroundColor: `${rank.color}33`, borderColor: rank.color, color: rank.color }}>
                            <span>{rank.icon} {rank.title}</span>
                        </motion.div>
                        <motion.div className="tier-badge" style={{ backgroundColor: `${tier.color}33`, borderColor: tier.color, color: tier.color }}>
                            <span>{tier.icon} Rango {tier.name}</span>
                        </motion.div>
                    </div>
                    <h1 className="hero-welcome font-heading">¡Hola, {user.name}!</h1>
                    <p className="hero-subtitle">Tu viaje hacia la maestría de datos continúa. El mundo necesita tus insights.</p>

                    <div className="hero-stats-row">
                        <div className="streak-badge-modern">
                            <Flame size={24} style={{ color: 'var(--accent-gold)' }} />
                            <div className="streak-info">
                                <span className="streak-num">{user.streak || 0}</span>
                                <span className="streak-text">Días de racha</span>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={() => setActiveTab('worlds')}>
                            <Play size={20} fill="currentColor" />
                            <span>Continuar Aventura</span>
                        </button>
                    </div>
                </div>
            </motion.section>

            <section className="xp-section-modern glass">
                <div className="xp-header">
                    <div className="xp-title-group">
                        <Zap size={18} className="xp-icon" />
                        <span className="xp-label font-heading">Progreso de Nivel</span>
                    </div>
                    <span className="xp-value font-heading">{Math.round(xpInCurrentLevel)} / {xpNeededForLevel} XP</span>
                </div>
                <div className="xp-bar-container">
                    <div className="xp-bar-modern">
                        <motion.div
                            className="xp-fill-modern"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5 }}
                        />
                    </div>
                    <div className="xp-markers">
                        <span className="marker">Nivel {user.level}</span>
                        <span className="marker">Nivel {(user.level || 1) + 1}</span>
                    </div>
                </div>
            </section>

            <div className="stats-grid-modern">
                {stats.map((stat, idx) => (
                    <motion.div key={idx} className="stat-card-modern glass" whileHover={{ y: -5 }}>
                        <div className="stat-main">
                            <div className="stat-icon-box" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <div className="stat-data">
                                <p className="stat-label">{stat.label}</p>
                                <h3 className="stat-value font-heading"><AnimatedCounter value={stat.value} /></h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="main-column">
                    <section className="featured-mission-modern glass">
                        <div className="featured-header">
                            <span className="font-heading">✨ Recomendada</span>
                        </div>
                        <div className="featured-body">
                            <h2 className="font-heading">{recommendedMission.title}</h2>
                            <p>{recommendedMission.description}</p>
                            <button className="btn btn-primary" onClick={() => setActiveTab('worlds')}>
                                Empezar
                            </button>
                        </div>
                    </section>

                    <section className="progress-section-modern">
                        <h2 className="font-heading">📊 Dominios</h2>
                        <div className="progress-grid-modern">
                            {WORLDS.filter(w => user.unlockedWorlds?.includes(w.id)).slice(0, 4).map(world => {
                                const worldCompleted = world.missions.filter(m => user.completedMissions?.includes(m.id)).length;
                                const p = Math.round((worldCompleted / world.missions.length) * 100);
                                return (
                                    <div key={world.id} className="progress-card-modern glass">
                                        <ProgressRing progress={p} color={world.color} />
                                        <div>
                                            <h4 className="font-heading">{world.name}</h4>
                                            <span>{p}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <div className="side-column">
                    <section className="activity-feed-modern glass">
                        <h3 className="font-heading">Bitácora</h3>
                        <div className="activity-list-modern">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="activity-item-modern">
                                    <span>{item.emoji}</span>
                                    <div>
                                        <p className="font-heading">{item.action}</p>
                                        <p>{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
