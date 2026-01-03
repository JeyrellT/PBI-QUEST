import React, { useState } from 'react';
import { Menu, Search, Bell, Coins, Flame, HelpCircle, Trophy, Target, BookOpen } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Tooltip, HelpBubble } from '../common/InteractiveElements';
import '../../styles/Header.css';

const Header = ({ onMenuClick, isMobile }) => {
    const { user, levelStats } = useGame();
    const { xpInCurrentLevel, xpNeededForLevel, progress } = levelStats;
    const [showNotifications, setShowNotifications] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // Fake notifications for demo
    const notifications = [
        { id: 1, text: '¡Nueva misión disponible en DataRescue!', icon: Target, time: 'Hace 2 min' },
        { id: 2, text: '¡Completaste 5 días de racha!', icon: Trophy, time: 'Hace 1 hora' },
        { id: 3, text: 'Nuevo contenido en la Academia', icon: BookOpen, time: 'Hace 3 horas' },
    ];

    return (
        <header className="header">
            {isMobile && (
                <button className="menu-toggle" onClick={onMenuClick} aria-label="Abrir menú">
                    <Menu size={24} />
                </button>
            )}

            {!isMobile && (
                <div className="search-bar">
                    <Search size={16} color="var(--text-muted)" />
                    <input type="text" placeholder="Buscar misiones, mundos..." />
                </div>
            )}

            <div className="header-stats">
                <div className="stat-group">
                    <Tooltip content={`¡${user.streak} días seguidos! Mantén tu racha jugando cada día.`} position="bottom">
                        <div className="stat-badge stat-badge-interactive">
                            <div className="stat-icon-wrapper">
                                <Flame size={16} color="var(--accent-red)" fill="var(--accent-red)" />
                            </div>
                            <span>{user.streak}</span>
                        </div>
                    </Tooltip>

                    <Tooltip content={`${user.coins} monedas disponibles. Úsalas para desbloquear mundos nuevos.`} position="bottom">
                        <div className="stat-badge stat-badge-interactive">
                            <div className="stat-icon-wrapper">
                                <Coins size={16} color="var(--accent-gold)" fill="var(--accent-gold)" />
                            </div>
                            <span>{user.coins}</span>
                        </div>
                    </Tooltip>
                </div>

                <Tooltip content={`Nivel ${user.level}: ${Math.round(progress)}% hacia el siguiente nivel`} position="bottom">
                    <div className="xp-container-header">
                        <div className="xp-info-header">
                            <span className="xp-level-badge">Nivel {user.level}</span>
                            <span className="xp-numbers">{Math.round(xpInCurrentLevel)} / {xpNeededForLevel} XP</span>
                        </div>
                        <div className="xp-bar-header-bg">
                            <motion.div 
                                className="xp-bar-header-fill" 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </Tooltip>

                {/* Help Button */}
                <button 
                    className="icon-button"
                    onClick={() => setShowHelp(!showHelp)}
                    style={{ position: 'relative' }}
                >
                    <HelpCircle size={20} />
                </button>

                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                    <button 
                        className="icon-button"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && <span className="notification-dot"></span>}
                    </button>
                    
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '8px',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '12px',
                                    width: '300px',
                                    padding: '8px',
                                    zIndex: 1000,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                                }}
                            >
                                <div style={{ 
                                    padding: '8px 12px', 
                                    borderBottom: '1px solid var(--border-color)',
                                    marginBottom: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                        Notificaciones
                                    </span>
                                    <span style={{ 
                                        fontSize: '0.75rem', 
                                        color: 'var(--accent-primary)',
                                        cursor: 'pointer'
                                    }}>
                                        Marcar todo como leído
                                    </span>
                                </div>
                                {notifications.map(notif => (
                                    <motion.div
                                        key={notif.id}
                                        whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '12px',
                                            padding: '10px 12px',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{
                                            background: 'rgba(168, 85, 247, 0.2)',
                                            borderRadius: '8px',
                                            padding: '8px',
                                            flexShrink: 0
                                        }}>
                                            <notif.icon size={16} color="var(--accent-primary)" />
                                        </div>
                                        <div>
                                            <p style={{ 
                                                margin: 0, 
                                                fontSize: '0.85rem',
                                                color: 'var(--text-primary)'
                                            }}>
                                                {notif.text}
                                            </p>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                color: 'var(--text-muted)' 
                                            }}>
                                                {notif.time}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Help Panel */}
            <AnimatePresence>
                {showHelp && (
                    <HelpBubble
                        title="Ayuda Rápida"
                        content={
                            <div>
                                <p><strong>🔥 Racha:</strong> Días consecutivos jugando</p>
                                <p><strong>🪙 Monedas:</strong> Desbloquean mundos nuevos</p>
                                <p><strong>⭐ XP:</strong> Te suben de nivel</p>
                                <p><strong>🎯 Consejo:</strong> Completa misiones diarias para maximizar recompensas</p>
                            </div>
                        }
                        onClose={() => setShowHelp(false)}
                        position="bottom-right"
                    />
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
