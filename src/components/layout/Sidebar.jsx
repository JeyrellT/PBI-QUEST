import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Globe, Award, Users, BookOpen, Settings, Zap, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose, isMobile }) => {
    const { user } = useGame();

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'worlds', icon: Globe, label: 'Mundos' },
        { id: 'achievements', icon: Award, label: 'Logros' },
        { id: 'academy', icon: BookOpen, label: 'Academy' },
        { id: 'social', icon: Users, label: 'Comunidad' },
    ];

    return (
        <aside className={`sidebar glass ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}>
            {isMobile && (
                <button className="sidebar-close-btn" onClick={onClose} aria-label="Cerrar menú">
                    <X size={24} />
                </button>
            )}
            <div className="sidebar-logo">
                <Zap size={32} color="var(--primary)" fill="var(--primary)" />
                <span className="font-heading">PBI QUEST</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <motion.button
                        key={item.id}
                        layout
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="active-tab-blob"
                                className="active-tab-bg"
                                style={{
                                    borderRadius: '50px',
                                    filter: 'blur(10px)',
                                    opacity: 0.6
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 30,
                                    mass: 1.5
                                }}
                            />
                        )}
                        <span className="nav-content">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: activeTab === item.id ? 1.2 : 1,
                                    color: activeTab === item.id ? 'var(--primary)' : 'var(--text-muted)'
                                }}
                            >
                                <item.icon size={20} />
                            </motion.div>
                            <span>{item.label}</span>
                        </span>
                    </motion.button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <motion.div
                    className="user-mini-profile"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                    <motion.div
                        className="avatar-ring"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="avatar">
                            {user.name[0]}
                        </div>
                    </motion.div>
                    <div className="user-info">
                        <p className="user-name">{user.name}</p>
                        <p className="user-level">Nivel {user.level}</p>
                    </div>
                </motion.div>
            </div>
        </aside>
    );
};

export default Sidebar;
