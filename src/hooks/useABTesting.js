/**
 * Sistema de A/B Testing para Power BI Quest
 * 
 * Propósito:
 * - Medir efectividad de cambios pedagógicos
 * - Comparar métricas antes/después de mejoras
 * - Tomar decisiones basadas en datos
 * 
 * Métricas clave:
 * - Tasa de completación por misión
 * - Tiempo promedio por misión
 * - Intentos promedio por verificación
 * - Retención día 1, 7, 30
 * - Puntuación NPS (si implementado)
 */

// Constantes
const STORAGE_KEY = 'powerbi-quest-ab-testing';
const EVENTS_KEY = 'powerbi-quest-analytics-events';
const MAX_EVENTS = 1000;

// Grupos de experimento
export const EXPERIMENT_GROUPS = {
    CONTROL: 'control',
    VARIANT_A: 'variant_a',  // Con micro-victorias
    VARIANT_B: 'variant_b',  // Con diagnóstico + micro-victorias
};

// Experimentos activos
export const ACTIVE_EXPERIMENTS = {
    'onboarding-flow': {
        id: 'onboarding-flow',
        name: 'Flujo de Onboarding Mejorado',
        description: 'Prueba de micro-misiones de zona segura vs flujo tradicional',
        startDate: '2026-02-01',
        endDate: '2026-03-01',
        variants: {
            control: { weight: 33, features: { microMissions: false, diagnostic: false } },
            variant_a: { weight: 33, features: { microMissions: true, diagnostic: false } },
            variant_b: { weight: 34, features: { microMissions: true, diagnostic: true } }
        }
    },
    'micro-victories': {
        id: 'micro-victories',
        name: 'Sistema de Micro-Victorias',
        description: 'Prueba de feedback instantáneo cada 20-30 segundos',
        startDate: '2026-02-01',
        endDate: '2026-03-01',
        variants: {
            control: { weight: 50, features: { enabled: false } },
            variant_a: { weight: 50, features: { enabled: true } }
        }
    },
    'character-mentors': {
        id: 'character-mentors',
        name: 'Personajes como Mentores',
        description: 'Uso de personajes de The Office para feedback emocional',
        startDate: '2026-02-01',
        endDate: '2026-03-01',
        variants: {
            control: { weight: 50, features: { enabled: false } },
            variant_a: { weight: 50, features: { enabled: true } }
        }
    }
};

/**
 * Obtener o crear ID de usuario anónimo
 */
const getAnonymousUserId = () => {
    let id = localStorage.getItem('powerbi-quest-anon-id');
    if (!id) {
        id = 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('powerbi-quest-anon-id', id);
    }
    return id;
};

/**
 * Obtener datos almacenados
 */
const getStoredData = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : { 
            userId: getAnonymousUserId(),
            assignments: {},
            firstVisit: new Date().toISOString()
        };
    } catch (e) {
        console.error('Error loading A/B testing data:', e);
        return { userId: getAnonymousUserId(), assignments: {}, firstVisit: new Date().toISOString() };
    }
};

/**
 * Guardar datos
 */
const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving A/B testing data:', e);
    }
};

/**
 * Obtener eventos almacenados
 */
const getStoredEvents = () => {
    try {
        const stored = localStorage.getItem(EVENTS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

/**
 * Guardar evento
 */
const saveEvent = (event) => {
    try {
        const events = getStoredEvents();
        events.push(event);
        
        // Limitar cantidad de eventos
        const trimmedEvents = events.slice(-MAX_EVENTS);
        localStorage.setItem(EVENTS_KEY, JSON.stringify(trimmedEvents));
    } catch (e) {
        console.error('Error saving analytics event:', e);
    }
};

/**
 * Asignar usuario a un grupo de experimento
 */
export const assignToExperiment = (experimentId) => {
    const data = getStoredData();
    
    // Si ya está asignado, retornar el grupo existente
    if (data.assignments[experimentId]) {
        return data.assignments[experimentId];
    }
    
    const experiment = ACTIVE_EXPERIMENTS[experimentId];
    if (!experiment) {
        console.warn(`Experimento no encontrado: ${experimentId}`);
        return 'control';
    }
    
    // Asignar aleatoriamente basado en pesos
    const random = Math.random() * 100;
    let cumulative = 0;
    let assignedVariant = 'control';
    
    for (const [variantName, variantConfig] of Object.entries(experiment.variants)) {
        cumulative += variantConfig.weight;
        if (random < cumulative) {
            assignedVariant = variantName;
            break;
        }
    }
    
    // Guardar asignación
    data.assignments[experimentId] = {
        variant: assignedVariant,
        assignedAt: new Date().toISOString(),
        features: experiment.variants[assignedVariant].features
    };
    
    saveData(data);
    
    // Registrar evento de asignación
    trackEvent('experiment_assigned', {
        experimentId,
        variant: assignedVariant
    });
    
    return data.assignments[experimentId];
};

/**
 * Obtener features activas para un experimento
 */
export const getExperimentFeatures = (experimentId) => {
    const data = getStoredData();
    const assignment = data.assignments[experimentId];
    
    if (!assignment) {
        return assignToExperiment(experimentId).features;
    }
    
    return assignment.features;
};

/**
 * Verificar si una feature está activa
 */
export const isFeatureEnabled = (experimentId, featureName) => {
    const features = getExperimentFeatures(experimentId);
    return features?.[featureName] ?? false;
};

/**
 * Registrar un evento de analytics
 */
export const trackEvent = (eventName, properties = {}) => {
    const data = getStoredData();
    
    const event = {
        eventName,
        properties: {
            ...properties,
            userId: data.userId,
            timestamp: new Date().toISOString(),
            experiments: data.assignments
        }
    };
    
    saveEvent(event);
    
    // Log para desarrollo (solo si no estamos en producción)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        console.log('📊 Analytics Event:', eventName, properties);
    }
    
    return event;
};

/**
 * Eventos predefinidos para el sistema pedagógico
 */
export const trackMissionStart = (missionId, worldId) => {
    return trackEvent('mission_start', { missionId, worldId, startTime: Date.now() });
};

export const trackMissionComplete = (missionId, worldId, stats) => {
    return trackEvent('mission_complete', {
        missionId,
        worldId,
        duration: stats.duration,
        attempts: stats.attempts,
        hintsUsed: stats.hintsUsed,
        score: stats.score,
        perfect: stats.perfect
    });
};

export const trackMissionAbandon = (missionId, worldId, step) => {
    return trackEvent('mission_abandon', { missionId, worldId, abandonedAtStep: step });
};

export const trackCheckpointPass = (missionId, checkpointId, attempt) => {
    return trackEvent('checkpoint_pass', { missionId, checkpointId, attempt });
};

export const trackCheckpointFail = (missionId, checkpointId, attempt) => {
    return trackEvent('checkpoint_fail', { missionId, checkpointId, attempt });
};

export const trackHintUsed = (missionId, hintLevel) => {
    return trackEvent('hint_used', { missionId, hintLevel });
};

export const trackMicroVictory = (victoryType, missionId) => {
    return trackEvent('micro_victory', { victoryType, missionId });
};

export const trackDiagnosticComplete = (result) => {
    return trackEvent('diagnostic_complete', {
        route: result.route?.key,
        score: result.score,
        answers: result.answers
    });
};

export const trackReturnVisit = (daysSinceLastVisit) => {
    return trackEvent('return_visit', { daysSinceLastVisit });
};

export const trackReviewComplete = (conceptId, result) => {
    return trackEvent('review_complete', { conceptId, result });
};

/**
 * Obtener métricas calculadas
 */
export const getAnalyticsMetrics = () => {
    const events = getStoredEvents();
    
    // Calcular métricas
    const missionStarts = events.filter(e => e.eventName === 'mission_start');
    const missionCompletes = events.filter(e => e.eventName === 'mission_complete');
    const missionAbandons = events.filter(e => e.eventName === 'mission_abandon');
    
    // Tasa de completación
    const completionRate = missionStarts.length > 0 
        ? (missionCompletes.length / missionStarts.length * 100).toFixed(1)
        : 0;
    
    // Duración promedio
    const avgDuration = missionCompletes.length > 0
        ? Math.round(missionCompletes.reduce((sum, e) => sum + (e.properties.duration || 0), 0) / missionCompletes.length / 1000 / 60)
        : 0;
    
    // Intentos promedio
    const avgAttempts = missionCompletes.length > 0
        ? (missionCompletes.reduce((sum, e) => sum + (e.properties.attempts || 1), 0) / missionCompletes.length).toFixed(1)
        : 0;
    
    // Pistas usadas promedio
    const avgHints = missionCompletes.length > 0
        ? (missionCompletes.reduce((sum, e) => sum + (e.properties.hintsUsed || 0), 0) / missionCompletes.length).toFixed(1)
        : 0;
    
    // Métricas por variante de experimento
    const metricsByVariant = {};
    for (const [expId, exp] of Object.entries(ACTIVE_EXPERIMENTS)) {
        metricsByVariant[expId] = {};
        for (const variant of Object.keys(exp.variants)) {
            const variantCompletes = missionCompletes.filter(
                e => e.properties.experiments?.[expId]?.variant === variant
            );
            metricsByVariant[expId][variant] = {
                completions: variantCompletes.length,
                avgDuration: variantCompletes.length > 0
                    ? Math.round(variantCompletes.reduce((sum, e) => sum + (e.properties.duration || 0), 0) / variantCompletes.length / 1000 / 60)
                    : 0
            };
        }
    }
    
    return {
        totalEvents: events.length,
        missionStarts: missionStarts.length,
        missionCompletes: missionCompletes.length,
        missionAbandons: missionAbandons.length,
        completionRate: parseFloat(completionRate),
        avgDurationMinutes: avgDuration,
        avgAttempts: parseFloat(avgAttempts),
        avgHintsUsed: parseFloat(avgHints),
        byVariant: metricsByVariant
    };
};

/**
 * Obtener la variante asignada para un experimento
 */
export const getVariant = (experimentId) => {
    const data = getStoredData();
    const assignment = data.assignments[experimentId];
    
    if (!assignment) {
        // Asignar al experimento si no está asignado
        const newAssignment = assignToExperiment(experimentId);
        return newAssignment.variant || 'control';
    }
    
    return assignment.variant || 'control';
};

/**
 * Hook para usar A/B testing
 */
export const useABTesting = () => {
    return {
        assignToExperiment,
        getFeatures: getExperimentFeatures,
        isFeatureEnabled,
        getVariant,
        track: trackEvent,
        getMetrics: getAnalyticsMetrics,
        // Eventos específicos
        trackMissionStart,
        trackMissionComplete,
        trackMissionAbandon,
        trackCheckpointPass,
        trackCheckpointFail,
        trackHintUsed,
        trackMicroVictory,
        trackDiagnosticComplete,
        trackReturnVisit,
        trackReviewComplete
    };
};

export default useABTesting;
