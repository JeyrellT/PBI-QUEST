import { useState, useCallback, useMemo } from 'react';
import { MICRO_VICTORIES } from '../data/worlds';

/**
 * Hook para manejar micro-victorias
 * 
 * Fundamentos de Neurociencia:
 * - Sistema de Recompensa (Dopamina): Liberación con anticipación y logro
 * - Feedback Loop: Retroalimentación cada 20-30 segundos máximo
 * 
 * @returns {Object} - { microVictory, currentVictory, clearVictory }
 */
export const useMicroVictories = () => {
    const [victoryQueue, setVictoryQueue] = useState([]);
    const [currentVictory, setCurrentVictory] = useState(null);

    // Disparar una micro-victoria por tipo
    const microVictory = useCallback((victoryKey, character = null) => {
        const victory = MICRO_VICTORIES[victoryKey];
        if (victory) {
            const victoryWithCharacter = character 
                ? { ...victory, character } 
                : victory;
            
            // Si no hay victoria actual, mostrar inmediatamente
            setCurrentVictory(prev => {
                if (!prev) {
                    return victoryWithCharacter;
                }
                // Si ya hay una, agregar a la cola
                setVictoryQueue(queue => [...queue, victoryWithCharacter]);
                return prev;
            });
        }
    }, []);

    // Limpiar victoria actual y mostrar siguiente de la cola
    const clearVictory = useCallback(() => {
        setCurrentVictory(() => {
            // Intentar obtener siguiente de la cola
            let next = null;
            setVictoryQueue(queue => {
                if (queue.length > 0) {
                    [next] = queue;
                    return queue.slice(1);
                }
                return queue;
            });
            return next;
        });
    }, []);

    // Disparar victoria personalizada
    const triggerCustomVictory = useCallback((customVictory) => {
        setCurrentVictory(prev => {
            if (!prev) {
                return customVictory;
            }
            setVictoryQueue(queue => [...queue, customVictory]);
            return prev;
        });
    }, []);

    return useMemo(() => ({
        microVictory,
        triggerCustomVictory,
        currentVictory,
        clearVictory,
        queueLength: victoryQueue.length
    }), [microVictory, triggerCustomVictory, currentVictory, clearVictory, victoryQueue.length]);
};

export default useMicroVictories;
