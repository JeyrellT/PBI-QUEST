import React, { createContext, useContext, useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../data/achievements';
import { useToast } from './ToastContext';
import { getUnlockedCards, CARD_UNLOCK_PROGRESSION } from '../data/pdfCards';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const { showToast } = useToast();
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('powerbi-quest-user');
        return saved ? JSON.parse(saved) : {
            name: 'Analista Novato',
            level: 1,
            xp: 0,
            coins: 0,
            streak: 1,
            lastActive: new Date().toISOString(),
            achievements: [],
            completedMissions: [],
            unlockedWorlds: ['office'],
            scoreLog: [],
            stats: {
                visualizations: 0,
                daxFunctions: 0
            },
            // Sistema de cartas
            viewedCards: [],           // IDs de cartas que el jugador ha visto
            cardsUsedInMissions: {}    // { missionId: [cardIds] }
        };
    });

    useEffect(() => {
        localStorage.setItem('powerbi-quest-user', JSON.stringify(user));
    }, [user]);

    // Helper to calculate level based on XP
    // 400 XP por nivel para progresión más fluida y accesible
    // Protección: nunca retorna nivel menor a 1, y XP negativo se trata como 0
    const calculateLevel = (xp) => Math.max(1, Math.floor(Math.max(0, xp) / 400) + 1);

    // Auto-correct level if XP doesn't match on load
    useEffect(() => {
        const correctLevel = calculateLevel(user.xp);
        if (user.level !== correctLevel) {
            setUser(prev => ({ ...prev, level: correctLevel }));
        }
    }, [user.xp]); // Check whenever XP changes (or on mount/restore)

    // Multiplier Logic based on Streak
    const getStreakMultiplier = (streak) => {
        if (streak >= 7) return 1.5;
        if (streak >= 5) return 1.2;
        if (streak >= 3) return 1.1;
        return 1.0;
    };

    // Función para calcular días desde última actividad
    const getDaysSinceLastActive = (lastActive) => {
        const last = new Date(lastActive);
        const now = new Date();
        // Normalizar a inicio del día para comparar solo fechas
        last.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        const diffTime = now - last;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    // Actualizar racha: incrementa si es nuevo día, resetea si 3+ días inactivo
    const updateStreak = () => {
        const daysSinceActive = getDaysSinceLastActive(user.lastActive);

        if (daysSinceActive === 0) {
            // Mismo día, no hacer nada
            return;
        }

        if (daysSinceActive >= 3) {
            // 3+ días de inactividad: resetear racha
            showToast('¡Racha perdida por inactividad! Tu racha se ha reiniciado.', 'error');
            setUser(prev => ({
                ...prev,
                streak: 1,
                lastActive: new Date().toISOString()
            }));
        } else if (daysSinceActive === 1) {
            // Día consecutivo: incrementar racha
            setUser(prev => {
                const newStreak = prev.streak + 1;
                if (newStreak === 3 || newStreak === 5 || newStreak === 7) {
                    showToast(`🔥 ¡Racha de ${newStreak} días! Multiplicador: ${getStreakMultiplier(newStreak)}x`, 'success');
                }
                return {
                    ...prev,
                    streak: newStreak,
                    lastActive: new Date().toISOString()
                };
            });
        } else {
            // 2 días sin actividad: mantener racha pero actualizar fecha
            setUser(prev => ({
                ...prev,
                lastActive: new Date().toISOString()
            }));
        }
    };

    // Verificar racha al cargar la aplicación
    useEffect(() => {
        const daysSinceActive = getDaysSinceLastActive(user.lastActive);
        if (daysSinceActive >= 3) {
            showToast(`⚠️ Han pasado ${daysSinceActive} días. Tu racha se reiniciará.`, 'error');
            setUser(prev => ({
                ...prev,
                streak: 1,
                lastActive: new Date().toISOString()
            }));
        }
    }, []); // Solo al montar el componente

    // Tier Logic
    const getTier = (xp) => {
        if (xp >= 20000) return { name: 'Diamante', color: '#b9f2ff', icon: '💎' };
        if (xp >= 10000) return { name: 'Platino', color: '#e5e4e2', icon: '💿' };
        if (xp >= 5000) return { name: 'Oro', color: '#ffd700', icon: '🥇' };
        if (xp >= 2000) return { name: 'Plata', color: '#c0c0c0', icon: '🥈' };
        return { name: 'Bronce', color: '#cd7f32', icon: '🥉' };
    };

    // Función auxiliar para calcular logros desbloqueados (para uso atómico dentro de setUser)
    const getNewAchievements = (currentUser) => {
        return ACHIEVEMENTS.filter(achievement => 
            !currentUser.achievements.includes(achievement.id) && 
            achievement.condition(currentUser)
        );
    };

    // Función auxiliar para aplicar logros atómicamente dentro de un estado de usuario
    // Retorna el usuario actualizado con logros, XP y logs
    const applyAchievements = (userState, newAchievements) => {
        if (newAchievements.length === 0) return userState;

        const earnedXP = newAchievements.reduce((sum, ach) => sum + (ach.xp || 0), 0);
        const newTotalXP = Math.max(0, userState.xp + earnedXP);

        const newLogs = newAchievements.map(ach => ({
            date: new Date().toISOString(),
            type: 'achievement',
            reason: ach.title || 'Logro',
            xp: ach.xp || 0,
            coins: 0
        }));

        // Mostrar toasts para cada logro (fuera del flujo de estado)
        newAchievements.forEach(ach => {
            setTimeout(() => showToast(`¡Logro Desbloqueado: ${ach.title}!`, 'success'), 0);
        });

        return {
            ...userState,
            achievements: [...userState.achievements, ...newAchievements.map(a => a.id)],
            xp: newTotalXP,
            level: calculateLevel(newTotalXP),
            scoreLog: [...(userState.scoreLog || []), ...newLogs]
        };
    };

    // checkAchievements - ahora delega a las funciones auxiliares para mantener compatibilidad
    const checkAchievements = (currentUser) => {
        const newAchievements = getNewAchievements(currentUser);

        if (newAchievements.length > 0) {
            setUser(prev => applyAchievements(prev, newAchievements));
        }
    };

    const addXP = (amount, reason = 'Bono') => {
        // Validación: solo permitir cantidades positivas
        if (typeof amount !== 'number' || amount <= 0) {
            console.warn('addXP: amount debe ser un número positivo, recibido:', amount);
            return;
        }

        showToast(`+${amount} XP: ${reason}`, 'info');
        setUser(prev => {
            // Protección contra XP negativo
            const newXP = Math.max(0, prev.xp + amount);
            const newLevel = calculateLevel(newXP);
            const oldLevel = prev.level;

            let updatedUser = {
                ...prev,
                xp: newXP,
                level: newLevel,
                scoreLog: [...(prev.scoreLog || []), {
                    date: new Date().toISOString(),
                    type: 'bonus',
                    reason,
                    xp: amount,
                    coins: 0
                }]
            };

            // Notificar si subió de nivel
            if (newLevel > oldLevel) {
                setTimeout(() => {
                    showToast(`🎉 ¡Subiste al nivel ${newLevel}!`, 'success');
                    checkNewCardsUnlocked(newLevel);
                }, 100);
            }

            // Verificar logros atómicamente
            const newAchievements = getNewAchievements(updatedUser);
            updatedUser = applyAchievements(updatedUser, newAchievements);

            return updatedUser;
        });
    };

    const completeMission = (missionId, worldId, rewards, missionTitle) => {
        if (user.completedMissions.includes(missionId)) return;

        // Validación de rewards
        const safeRewards = {
            xp: Math.max(0, rewards?.xp || 0),
            coins: Math.max(0, rewards?.coins || 0)
        };

        setUser(prev => {
            // Calcular si debemos incrementar la racha (nuevo día)
            const daysSinceActive = getDaysSinceLastActive(prev.lastActive);
            let newStreak = Math.max(1, prev.streak || 1);

            if (daysSinceActive === 1) {
                // Día consecutivo: incrementar racha
                newStreak = prev.streak + 1;
                if (newStreak === 3 || newStreak === 5 || newStreak === 7) {
                    setTimeout(() => showToast(`🔥 ¡Racha de ${newStreak} días! Multiplicador: ${getStreakMultiplier(newStreak)}x`, 'success'), 500);
                }
            } else if (daysSinceActive >= 3) {
                // Perdió la racha
                newStreak = 1;
            }
            // Si daysSinceActive === 0 o === 2, mantener racha actual

            const multiplier = getStreakMultiplier(newStreak);
            // Asegurar que finalXP sea siempre positivo
            const finalXP = Math.max(1, Math.round(safeRewards.xp * multiplier));
            // Protección contra XP negativo
            const newTotalXP = Math.max(0, prev.xp + finalXP);
            const oldLevel = prev.level;
            const newLevel = calculateLevel(newTotalXP);

            showToast(`Misión Completada: ${missionTitle} (+${finalXP} XP)`, 'success');

            // Notificar si subió de nivel
            if (newLevel > oldLevel) {
                setTimeout(() => {
                    showToast(`🎉 ¡Subiste al nivel ${newLevel}!`, 'success');
                    checkNewCardsUnlocked(newLevel);
                }, 200);
            }

            let updatedUser = {
                ...prev,
                xp: newTotalXP,
                level: newLevel,
                coins: Math.max(0, prev.coins + safeRewards.coins), // Protección coins
                streak: newStreak,
                lastActive: new Date().toISOString(),
                completedMissions: [...prev.completedMissions, missionId],
                scoreLog: [...(prev.scoreLog || []), {
                    date: new Date().toISOString(),
                    type: 'mission',
                    reason: missionTitle,
                    xp: finalXP,
                    coins: safeRewards.coins,
                    multiplier: multiplier > 1 ? multiplier : null
                }],
                stats: {
                    ...prev.stats,
                    visualizations: Math.max(0, (prev.stats?.visualizations || 0) + 5),
                    daxFunctions: Math.max(0, (prev.stats?.daxFunctions || 0) + 2)
                }
            };

            // Verificar logros atómicamente (sin setTimeout para evitar race conditions)
            const newAchievements = getNewAchievements(updatedUser);
            updatedUser = applyAchievements(updatedUser, newAchievements);

            return updatedUser;
        });
    };

    const unlockWorld = (worldId, cost) => {
        // Validación de costo
        const safeCost = Math.max(0, cost || 0);

        setUser(prev => {
            // Validación atómica dentro de setUser para evitar race conditions
            if (prev.unlockedWorlds.includes(worldId)) {
                // Ya está desbloqueado, no hacer nada
                return prev;
            }

            if (prev.coins < safeCost) {
                // Monedas insuficientes - mostrar error y no modificar estado
                setTimeout(() => showToast(`Monedas insuficientes. Necesitas ${safeCost}.`, 'error'), 0);
                return prev;
            }

            // Desbloquear mundo - protección contra monedas negativas
            const newCoins = Math.max(0, prev.coins - safeCost);
            setTimeout(() => showToast(`¡Mundo Desbloqueado! -${safeCost} monedas`, 'success'), 0);

            return {
                ...prev,
                coins: newCoins,
                unlockedWorlds: [...prev.unlockedWorlds, worldId],
                scoreLog: [...(prev.scoreLog || []), {
                    date: new Date().toISOString(),
                    type: 'unlock',
                    reason: `Desbloqueo de Mundo: ${worldId}`,
                    xp: 0,
                    coins: -safeCost
                }]
            };
        });
    };

    // Level Progress Logic
    const getLevelStats = () => {
        const xpPerLevel = 400; // Mismo valor que calculateLevel
        const currentLevelXP = (user.level - 1) * xpPerLevel;
        const nextLevelXP = user.level * xpPerLevel;
        const xpInCurrentLevel = user.xp - currentLevelXP;
        const progress = Math.min(100, Math.max(0, (xpInCurrentLevel / xpPerLevel) * 100));

        return {
            currentLevelXP,
            nextLevelXP,
            xpInCurrentLevel,
            xpNeededForLevel: xpPerLevel,
            progress
        };
    };

    // =========================================================================
    // SISTEMA DE CARTAS
    // =========================================================================

    // Marcar una carta como vista
    const markCardAsViewed = (cardId) => {
        if (!user.viewedCards?.includes(cardId)) {
            setUser(prev => ({
                ...prev,
                viewedCards: [...(prev.viewedCards || []), cardId]
            }));
        }
    };

    // Registrar cartas usadas en una misión
    const recordCardsUsedInMission = (missionId, cardIds) => {
        setUser(prev => ({
            ...prev,
            cardsUsedInMissions: {
                ...(prev.cardsUsedInMissions || {}),
                [missionId]: cardIds
            }
        }));
    };

    // Obtener cartas desbloqueadas para el nivel actual
    const getPlayerUnlockedCards = () => {
        return getUnlockedCards(user.level);
    };

    // Verificar si hay nuevas cartas disponibles al subir de nivel
    const checkNewCardsUnlocked = (newLevel) => {
        const newCards = CARD_UNLOCK_PROGRESSION[newLevel];
        if (newCards && newCards.length > 0) {
            const cardNames = newCards.map(id => id.charAt(0).toUpperCase() + id.slice(1)).join(', ');
            showToast(`🃏 ¡Nuevas cartas desbloqueadas: ${cardNames}!`, 'success');
        }
    };

    // Ensure weeklyChallenge state exists
    useEffect(() => {
        if (!user.weeklyChallenge) {
            setUser(prev => ({
                ...prev,
                weeklyChallenge: {
                    currentWeek: 1,
                    nextUnlockDate: null,
                    history: []
                }
            }));
        }
    }, [user.weeklyChallenge]);

    const completeWeeklyChallenge = (weekNumber, xpReward) => {
        // Validación: solo permitir XP positivo
        const safeXPReward = Math.max(0, xpReward || 0);
        if (safeXPReward <= 0) {
            console.warn('completeWeeklyChallenge: xpReward debe ser positivo');
            return;
        }

        const nextUnlock = new Date();
        nextUnlock.setDate(nextUnlock.getDate() + 7); // Unlock next challenge in 7 days

        setUser(prev => {
            // Protección contra XP negativo
            const newTotalXP = Math.max(0, prev.xp + safeXPReward);
            const oldLevel = prev.level;
            const newLevel = calculateLevel(newTotalXP);

            showToast(`¡Reto Semanal Completado! +${safeXPReward} XP`, 'success');
            setTimeout(() => showToast(`📅 Próximo reto desbloqueable en 7 días`, 'info'), 1500);

            // Notificar si subió de nivel
            if (newLevel > oldLevel) {
                setTimeout(() => {
                    showToast(`🎉 ¡Subiste al nivel ${newLevel}!`, 'success');
                    checkNewCardsUnlocked(newLevel);
                }, 300);
            }

            let updatedUser = {
                ...prev,
                xp: newTotalXP,
                level: newLevel,
                weeklyChallenge: {
                    currentWeek: (prev.weeklyChallenge?.currentWeek || 0) + 1,
                    nextUnlockDate: nextUnlock.toISOString(),
                    history: [...(prev.weeklyChallenge?.history || []), { week: weekNumber, date: new Date().toISOString() }]
                },
                scoreLog: [...(prev.scoreLog || []), {
                    date: new Date().toISOString(),
                    type: 'challenge',
                    reason: `Reto Semanal #${weekNumber}`,
                    xp: safeXPReward,
                    coins: 0
                }]
            };

            // Verificar logros atómicamente
            const newAchievements = getNewAchievements(updatedUser);
            updatedUser = applyAchievements(updatedUser, newAchievements);

            return updatedUser;
        });
    };

    return (
        <GameContext.Provider value={{
            user,
            addXP,
            completeMission,
            unlockWorld,
            getTier,
            getStreakMultiplier,
            updateStreak,
            levelStats: getLevelStats(),
            // Sistema de cartas
            markCardAsViewed,
            recordCardsUsedInMission,
            getPlayerUnlockedCards,
            checkNewCardsUnlocked,
            // Retos Semanales
            completeWeeklyChallenge
        }}>
            {children}
        </GameContext.Provider>
    );
};
