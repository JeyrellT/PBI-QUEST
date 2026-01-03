// Sistema de Cartas del Juego - DataRescue HQ
// Basado en el PDF: "DataRescue: La Rebelión de la Base Corrupta"

// ============================================================================
// HÉROES (Funciones DAX) - Cartas de poder que el jugador colecciona
// ============================================================================
export const HERO_CARDS = [
    {
        id: 'sumator',
        name: 'Sumator',
        type: 'hero',
        category: 'aggregation',
        superpower: 'Acumulación Masiva',
        daxFunction: 'SUM(<columna>)',
        description: 'Acumula y combina todos los valores de una columna para generar un total imparable.',
        image: '/images/cards/sumator.png',
        color: '#22c55e',
        icon: '➕',
        unlocksAtLevel: 1,
        power: 10
    },
    {
        id: 'promediador',
        name: 'Promediador',
        type: 'hero',
        category: 'statistics',
        superpower: 'Equilibrio Perfecto',
        daxFunction: 'AVERAGE(<columna>)',
        description: 'Encuentra el punto medio exacto entre todas las energías (valores) de una columna.',
        image: '/images/cards/promediador.png',
        color: '#3b82f6',
        icon: '⚖️',
        unlocksAtLevel: 1,
        power: 10
    },
    {
        id: 'maximo',
        name: 'Máximo',
        type: 'hero',
        category: 'statistics',
        superpower: 'Pico Supremo',
        daxFunction: "MAX('Tabla'[Columna])",
        description: 'Identifica la fuerza más poderosa (valor más alto) dentro de un grupo.',
        image: '/images/cards/maximo.png',
        color: '#ef4444',
        icon: '⬆️',
        unlocksAtLevel: 1,
        power: 10
    },
    {
        id: 'minimo',
        name: 'Mínimo',
        type: 'hero',
        category: 'statistics',
        superpower: 'Detección de Humildad',
        daxFunction: "MIN('Columna')",
        description: 'Encuentra la fuerza más modesta (valor más bajo) en su entorno.',
        image: '/images/cards/minimo.png',
        color: '#06b6d4',
        icon: '⬇️',
        unlocksAtLevel: 1,
        power: 10
    },
    {
        id: 'contador',
        name: 'Contador',
        type: 'hero',
        category: 'counting',
        superpower: 'Censo Infalible',
        daxFunction: 'COUNT(columna)',
        description: 'Cuenta con precisión la cantidad de celdas que contienen números en una columna.',
        image: '/images/cards/contador.png',
        color: '#8b5cf6',
        icon: '🔢',
        unlocksAtLevel: 2,
        power: 12
    },
    {
        id: 'filator',
        name: 'Filator',
        type: 'hero',
        category: 'counting',
        superpower: 'Enumeración Total',
        daxFunction: 'COUNTROWS(tabla)',
        description: 'Enumera todas las filas de una tabla con exactitud milimétrica.',
        image: '/images/cards/filator.png',
        color: '#f97316',
        icon: '📊',
        unlocksAtLevel: 2,
        power: 12
    },
    {
        id: 'unica',
        name: 'Única',
        type: 'hero',
        category: 'counting',
        superpower: 'Detección de Singularidades',
        daxFunction: 'DISTINCTCOUNT(Columna)',
        description: 'Identifica y cuenta elementos únicos, ignorando duplicados.',
        image: '/images/cards/unica.png',
        color: '#ec4899',
        icon: '💎',
        unlocksAtLevel: 2,
        power: 15
    },
    {
        id: 'decisor',
        name: 'Decisor',
        type: 'hero',
        category: 'logic',
        superpower: 'Bifurcación del Destino',
        daxFunction: 'IF(condición, v_verdadero, v_falso)',
        description: 'Toma decisiones basadas en condiciones específicas, eligiendo caminos distintos.',
        image: '/images/cards/decisor.png',
        color: '#eab308',
        icon: '🔀',
        unlocksAtLevel: 3,
        power: 15
    },
    {
        id: 'conjuntor',
        name: 'Conjuntor',
        type: 'hero',
        category: 'logic',
        superpower: 'Fuerza Combinada',
        daxFunction: 'AND(cond1, cond2)',
        description: 'Combina múltiples condiciones y asegura que todas se cumplan simultáneamente.',
        image: '/images/cards/conjuntor.png',
        color: '#14b8a6',
        icon: '🔗',
        unlocksAtLevel: 3,
        power: 15
    },
    {
        id: 'alternador',
        name: 'Alternador',
        type: 'hero',
        category: 'logic',
        superpower: 'Selección Flexible',
        daxFunction: 'OR(cond1, cond2)',
        description: 'Evalúa múltiples condiciones y considera verdadero si al menos una se cumple.',
        image: '/images/cards/alternador.png',
        color: '#a855f7',
        icon: '⚡',
        unlocksAtLevel: 3,
        power: 15
    }
];

// ============================================================================
// VILLANOS - Obstáculos que afectan las misiones
// ============================================================================
export const VILLAIN_CARDS = [
    {
        id: 'datacorruptor',
        name: 'Datacorruptor',
        type: 'villain',
        category: 'antagonist',
        superpower: 'Distorsión de Datos',
        effect: 'Inyecta valores nulos, typos y formatos inválidos en los datasets.',
        weakness: 'Vulnerable a combinaciones de IF + OR/AND para limpiar datos.',
        description: 'El villano principal. Distorsiona medidas con valores nulos, duplicados y outliers.',
        image: '/images/cards/datacorruptor.png',
        color: '#1f2937',
        icon: '👾',
        power: 50
    }
];

// ============================================================================
// CARTAS ESPECIALES
// ============================================================================
export const SPECIAL_CARDS = [
    {
        id: 'comodin',
        name: 'Comodín',
        type: 'special',
        category: 'wildcard',
        superpower: 'Sustitución Universal',
        effect: 'Puede sustituir a cualquier carta héroe en la selección de misión.',
        description: 'El héroe con la "J" en el pecho. Rodeado de símbolos matemáticos (Σ, FX, +, ≠). Puede tomar el lugar de cualquier función.',
        image: '/images/cards/comodin.png',
        color: '#fbbf24',
        icon: '🃏',
        unlocksAtLevel: 4, // Se desbloquea como recompensa especial
        power: 20
    }
];

// ============================================================================
// PORTADA / ARTE DEL JUEGO
// ============================================================================
export const COVER_CARD = {
    id: 'portada',
    name: 'DataRescue: La Rebelión de la Base Corrupta',
    type: 'cover',
    description: 'La batalla entre el orden (datos limpios) y el caos (errores). Los héroes DAX se enfrentan al ejército de datos corruptos.',
    image: '/images/cards/portada.png',
    color: '#e63946'
};

// ============================================================================
// CURVA DE DESBLOQUEO POR NIVEL
// ============================================================================
export const CARD_UNLOCK_PROGRESSION = {
    1: ['sumator', 'promediador', 'maximo', 'minimo'], // Fundamentos
    2: ['contador', 'filator', 'unica'],               // Conteo
    3: ['decisor', 'conjuntor', 'alternador'],         // Lógica
    4: ['comodin']                                     // Especial
};

// ============================================================================
// CARTAS REQUERIDAS POR MISIÓN (DataRescue HQ)
// ============================================================================
export const MISSION_REQUIRED_CARDS = {
    'datarescue-1': {
        required: ['sumator', 'decisor'],
        optional: ['promediador'],
        description: 'Usa SUM para calcular la Ganancia Total y IF para manejar valores nulos.',
        villainAppears: true
    },
    'datarescue-2': {
        required: ['promediador'],
        optional: ['maximo', 'minimo'],
        description: 'AVERAGE para calcular el peso promedio por país.',
        villainAppears: false
    },
    'datarescue-3': {
        required: ['maximo', 'decisor'],
        optional: ['promediador', 'minimo'],
        description: 'MAX para encontrar el CBM máximo y IF para detectar outliers.',
        villainAppears: true
    },
    'datarescue-4': {
        required: ['filator', 'unica'],
        optional: ['contador'],
        description: 'COUNTROWS vs COUNT para entender duplicados, DISTINCTCOUNT para el conteo real.',
        villainAppears: true
    },
    'datarescue-5': {
        required: ['unica'],
        optional: ['filator', 'contador'],
        description: 'DISTINCTCOUNT para contar clientes únicos después de normalizar.',
        villainAppears: false
    },
    'datarescue-6': {
        required: ['decisor', 'alternador'],
        optional: ['conjuntor'],
        description: 'IF + OR para clasificar operaciones de riesgo.',
        villainAppears: true
    },
    'datarescue-7': {
        required: ['sumator', 'promediador', 'maximo', 'minimo', 'contador', 'filator', 'unica', 'decisor', 'conjuntor', 'alternador'],
        optional: [],
        description: '¡Batalla Final! Necesitas dominar TODAS las funciones para vencer a Datacorruptor.',
        villainAppears: true,
        isBossBattle: true
    }
};

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Obtiene todas las cartas héroe desbloqueadas para un nivel dado
 */
export const getUnlockedCards = (level) => {
    const unlockedIds = [];
    for (let lvl = 1; lvl <= level; lvl++) {
        if (CARD_UNLOCK_PROGRESSION[lvl]) {
            unlockedIds.push(...CARD_UNLOCK_PROGRESSION[lvl]);
        }
    }
    return [...HERO_CARDS, ...SPECIAL_CARDS].filter(card => unlockedIds.includes(card.id));
};

/**
 * Obtiene una carta por su ID
 */
export const getCardById = (cardId) => {
    return [...HERO_CARDS, ...VILLAIN_CARDS, ...SPECIAL_CARDS].find(card => card.id === cardId);
};

/**
 * Obtiene las cartas requeridas para una misión específica
 */
export const getCardsForMission = (missionId) => {
    const missionCards = MISSION_REQUIRED_CARDS[missionId];
    if (!missionCards) return null;
    
    return {
        required: missionCards.required.map(id => getCardById(id)).filter(Boolean),
        optional: missionCards.optional.map(id => getCardById(id)).filter(Boolean),
        villain: missionCards.villainAppears ? VILLAIN_CARDS[0] : null,
        description: missionCards.description,
        isBossBattle: missionCards.isBossBattle || false
    };
};

/**
 * Valida si el jugador seleccionó las cartas correctas para una misión
 * @returns { success: boolean, missing: string[], feedback: string }
 */
export const validateCardSelection = (missionId, selectedCardIds) => {
    const missionCards = MISSION_REQUIRED_CARDS[missionId];
    if (!missionCards) return { success: true, missing: [], feedback: 'Misión sin requisitos de cartas.' };
    
    // El comodín puede sustituir cualquier carta
    const hasWildcard = selectedCardIds.includes('comodin');
    let wildcardUsed = false;
    
    const missing = [];
    for (const requiredId of missionCards.required) {
        if (!selectedCardIds.includes(requiredId)) {
            if (hasWildcard && !wildcardUsed) {
                wildcardUsed = true; // Comodín cubre esta carta
            } else {
                missing.push(requiredId);
            }
        }
    }
    
    if (missing.length === 0) {
        return {
            success: true,
            missing: [],
            feedback: '¡Excelente! Has seleccionado las cartas correctas. ¡A la misión!'
        };
    }
    
    const missingNames = missing.map(id => getCardById(id)?.name || id).join(', ');
    return {
        success: false,
        missing,
        feedback: `Te faltan cartas esenciales: ${missingNames}. Piensa qué funciones DAX necesitas para esta misión.`
    };
};

/**
 * Obtiene todas las cartas para mostrar en el deck/colección
 */
export const getAllCards = () => ({
    heroes: HERO_CARDS,
    villains: VILLAIN_CARDS,
    special: SPECIAL_CARDS,
    cover: COVER_CARD
});

export default {
    HERO_CARDS,
    VILLAIN_CARDS,
    SPECIAL_CARDS,
    COVER_CARD,
    CARD_UNLOCK_PROGRESSION,
    MISSION_REQUIRED_CARDS,
    getUnlockedCards,
    getCardById,
    getCardsForMission,
    validateCardSelection,
    getAllCards
};
