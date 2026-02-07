/**
 * Sistema de Repaso Espaciado (Spaced Repetition System)
 * 
 * Fundamentos de Neurociencia:
 * - Curva del Olvido de Ebbinghaus: Olvidamos ~70% en 24h sin refuerzo
 * - Repetición Espaciada: Repasar a intervalos crecientes consolida memoria
 * - Efecto de Testing: Recordar activamente fortalece más que re-leer
 * 
 * Intervalos basados en el algoritmo SM-2 simplificado:
 * - 1 día después del aprendizaje inicial
 * - 3 días después del primer repaso
 * - 7 días después del segundo repaso
 * - 14 días después del tercer repaso
 */

// Constantes
const STORAGE_KEY = 'powerbi-quest-spaced-repetition';
const REVIEW_INTERVALS = [1, 3, 7, 14, 30]; // días

/**
 * Estructura de un ítem de repaso:
 * {
 *   conceptId: string,           // ID del concepto (ej: 'dax-sum')
 *   conceptName: string,         // Nombre legible
 *   worldId: string,             // Mundo donde se aprendió
 *   missionId: string,           // Misión donde se aprendió
 *   learnedAt: ISO string,       // Fecha de aprendizaje
 *   nextReviewAt: ISO string,    // Próximo repaso programado
 *   reviewCount: number,         // Cantidad de repasos completados
 *   ease: number,                // Factor de facilidad (1.3-2.5)
 *   lastResult: 'easy'|'good'|'hard'|null
 * }
 */

// Obtener datos del localStorage
const getStoredData = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : { items: [], settings: { enabled: true } };
    } catch (e) {
        console.error('Error loading spaced repetition data:', e);
        return { items: [], settings: { enabled: true } };
    }
};

// Guardar datos
const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving spaced repetition data:', e);
    }
};

/**
 * Registrar un nuevo concepto aprendido
 */
export const registerLearnedConcept = (concept) => {
    const data = getStoredData();
    
    // Verificar si ya existe
    const existingIndex = data.items.findIndex(item => item.conceptId === concept.conceptId);
    
    const now = new Date();
    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + REVIEW_INTERVALS[0]);
    
    const newItem = {
        conceptId: concept.conceptId,
        conceptName: concept.conceptName || concept.conceptId,
        worldId: concept.worldId,
        missionId: concept.missionId,
        learnedAt: now.toISOString(),
        nextReviewAt: nextReview.toISOString(),
        reviewCount: 0,
        ease: 2.0,
        lastResult: null
    };
    
    if (existingIndex >= 0) {
        // Actualizar existente si se vuelve a aprender
        data.items[existingIndex] = {
            ...data.items[existingIndex],
            learnedAt: now.toISOString(),
            nextReviewAt: nextReview.toISOString()
        };
    } else {
        data.items.push(newItem);
    }
    
    saveData(data);
    return newItem;
};

/**
 * Registrar resultado de un repaso
 */
export const recordReviewResult = (conceptId, result) => {
    const data = getStoredData();
    const itemIndex = data.items.findIndex(item => item.conceptId === conceptId);
    
    if (itemIndex < 0) return null;
    
    const item = data.items[itemIndex];
    const now = new Date();
    
    // Ajustar ease basado en resultado
    let easeAdjustment = 0;
    let intervalMultiplier = 1;
    
    switch (result) {
        case 'easy':
            easeAdjustment = 0.15;
            intervalMultiplier = 1.5;
            break;
        case 'good':
            easeAdjustment = 0;
            intervalMultiplier = 1;
            break;
        case 'hard':
            easeAdjustment = -0.2;
            intervalMultiplier = 0.5;
            break;
        case 'forgot':
            easeAdjustment = -0.3;
            intervalMultiplier = 0; // Reiniciar
            break;
        default:
            break;
    }
    
    // Calcular nuevo ease (mínimo 1.3, máximo 2.5)
    const newEase = Math.max(1.3, Math.min(2.5, item.ease + easeAdjustment));
    
    // Calcular próximo intervalo
    let nextIntervalDays;
    if (intervalMultiplier === 0) {
        // Reiniciar si olvidó
        nextIntervalDays = REVIEW_INTERVALS[0];
        item.reviewCount = 0;
    } else {
        const baseInterval = REVIEW_INTERVALS[Math.min(item.reviewCount, REVIEW_INTERVALS.length - 1)];
        nextIntervalDays = Math.round(baseInterval * newEase * intervalMultiplier);
    }
    
    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + nextIntervalDays);
    
    // Actualizar item
    data.items[itemIndex] = {
        ...item,
        reviewCount: item.reviewCount + 1,
        ease: newEase,
        lastResult: result,
        nextReviewAt: nextReview.toISOString(),
        lastReviewedAt: now.toISOString()
    };
    
    saveData(data);
    return data.items[itemIndex];
};

/**
 * Obtener conceptos que necesitan repaso
 */
export const getDueReviews = () => {
    const data = getStoredData();
    const now = new Date();
    
    return data.items.filter(item => {
        const nextReview = new Date(item.nextReviewAt);
        return nextReview <= now;
    }).sort((a, b) => {
        // Priorizar los más atrasados
        return new Date(a.nextReviewAt) - new Date(b.nextReviewAt);
    });
};

/**
 * Obtener próximos repasos (para mostrar en UI)
 */
export const getUpcomingReviews = (days = 7) => {
    const data = getStoredData();
    const now = new Date();
    const futureLimit = new Date(now);
    futureLimit.setDate(futureLimit.getDate() + days);
    
    return data.items.filter(item => {
        const nextReview = new Date(item.nextReviewAt);
        return nextReview > now && nextReview <= futureLimit;
    }).sort((a, b) => {
        return new Date(a.nextReviewAt) - new Date(b.nextReviewAt);
    });
};

/**
 * Obtener estadísticas de repaso
 */
export const getReviewStats = () => {
    const data = getStoredData();
    const dueNow = getDueReviews();
    const upcoming = getUpcomingReviews(7);
    
    const masteredCount = data.items.filter(item => item.reviewCount >= 4 && item.ease >= 2.0).length;
    
    return {
        totalConcepts: data.items.length,
        dueNow: dueNow.length,
        upcomingThisWeek: upcoming.length,
        mastered: masteredCount,
        learningProgress: data.items.length > 0 
            ? Math.round((masteredCount / data.items.length) * 100) 
            : 0
    };
};

/**
 * Generar preguntas de repaso para un concepto
 */
export const generateReviewQuestions = (conceptId) => {
    // Banco de preguntas por concepto
    const questionBank = {
        'pbi-awareness': [
            { q: '¿Power BI es gratuito?', a: 'Sí', options: ['Sí', 'No'], type: 'choice' },
            { q: '¿Qué puedes crear con Power BI?', a: 'Dashboards interactivos', options: ['Dashboards interactivos', 'Videojuegos', 'Documentos Word'], type: 'choice' }
        ],
        'pbi-interface': [
            { q: '¿Cuántas vistas principales tiene Power BI Desktop?', a: '3', type: 'number' },
            { q: '¿Cómo se llama la vista donde creas gráficos?', a: 'Informe', options: ['Informe', 'Datos', 'Modelo'], type: 'choice' }
        ],
        'data-import': [
            { q: '¿Qué botón usas para cargar datos en Power BI?', a: 'Obtener datos', options: ['Obtener datos', 'Guardar', 'Publicar'], type: 'choice' },
            { q: '¿Puedes importar archivos Excel en Power BI?', a: 'Sí', options: ['Sí', 'No'], type: 'choice' }
        ],
        'data-cleaning': [
            { q: '¿Qué herramienta usas para limpiar datos en Power BI?', a: 'Power Query', options: ['Power Query', 'DAX', 'Excel'], type: 'choice' },
            { q: '¿Text.Proper convierte "JUAN" a qué?', a: 'Juan', type: 'text' }
        ],
        'dax-sum-avg': [
            { q: '¿Qué función suma todos los valores de una columna?', a: 'SUM', options: ['SUM', 'COUNT', 'MAX'], type: 'choice' },
            { q: '¿AVERAGE calcula el...?', a: 'Promedio', options: ['Promedio', 'Total', 'Máximo'], type: 'choice' }
        ],
        'dax-calculate': [
            { q: '¿CALCULATE permite aplicar qué a un cálculo?', a: 'Filtros', options: ['Filtros', 'Colores', 'Animaciones'], type: 'choice' },
            { q: '¿Es CALCULATE la función más poderosa de DAX?', a: 'Sí', options: ['Sí', 'No'], type: 'choice' }
        ],
        'dax-distinctcount': [
            { q: '¿DISTINCTCOUNT ignora valores...?', a: 'Duplicados', options: ['Duplicados', 'Grandes', 'Pequeños'], type: 'choice' },
            { q: '¿Para qué usarías DISTINCTCOUNT?', a: 'Contar clientes únicos', options: ['Contar clientes únicos', 'Sumar ventas', 'Calcular promedios'], type: 'choice' }
        ]
    };
    
    const questions = questionBank[conceptId] || [];
    
    // Seleccionar pregunta aleatoria
    if (questions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * questions.length);
    return {
        ...questions[randomIndex],
        conceptId
    };
};

/**
 * Hook para usar el sistema de repaso espaciado
 */
export const useSpacedRepetition = () => {
    return {
        registerConcept: registerLearnedConcept,
        recordResult: recordReviewResult,
        getDue: getDueReviews,
        getUpcoming: getUpcomingReviews,
        getStats: getReviewStats,
        generateQuestion: generateReviewQuestions
    };
};

export default useSpacedRepetition;
