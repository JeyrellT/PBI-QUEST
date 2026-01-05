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
        power: 10,
        tacticalQuestion: {
            q: "El dataset tiene celdas vacías (null) en la columna 'Ventas'. Si usas SUM directamente, ¿qué ocurre?",
            options: [
                "Da error ('NaN') inmediatamente.",
                "Ignora los nulos (los trata como 0) y suma el resto.",
                "Devuelve 'null' como resultado total."
            ],
            correct: "Ignora los nulos (los trata como 0) y suma el resto."
        }
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
        power: 10,
        tacticalQuestion: {
            q: "Corruptex insertó un valor de 5,000,000 en un rango de datos que va de 10 a 100. ¿Cuál es el riesgo de usar PROMEDIADOR aquí?",
            options: [
                "El promedio se inflará drásticamente, ocultando la tendencia real.",
                "AVERAGE ignorará automáticamente el outlier.",
                "Dará un error de desbordamiento de memoria."
            ],
            correct: "El promedio se inflará drásticamente, ocultando la tendencia real."
        }
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
        power: 10,
        tacticalQuestion: {
            q: "Si aplicas MÁXIMO a una columna de fechas (Date), ¿qué dato estratégico obtienes?",
            options: [
                "La fecha más reciente (última actualización).",
                "La fecha más antigua (inicio del periodo).",
                "El día con mayor número de transacciones."
            ],
            correct: "La fecha más reciente (última actualización)."
        }
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
        power: 10,
        tacticalQuestion: {
            q: "Ojo al dato: Si usas MÍNIMO en una columna de texto (Nombres de Clientes), ¿qué determina el resultado?",
            options: [
                "El orden alfabético (A-Z, el primero).",
                "La longitud del nombre (el más corto).",
                "El valor con menos caracteres especiales."
            ],
            correct: "El orden alfabético (A-Z, el primero)."
        }
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
        power: 12,
        tacticalQuestion: {
            q: "Tienes 1000 transacciones, pero 200 no tienen 'Descuento' (celda vacía). Si usas CONTADOR sobre la columna 'Descuento', ¿qué obtienes?",
            options: [
                "800",
                "1000",
                "200"
            ],
            correct: "800"
        }
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
        power: 12,
        tacticalQuestion: {
            q: "Si aplicas FILATOR (COUNTROWS) en una tabla que está filtrada por 'Año=2024', ¿el recuento incluye las filas ocultas de 2023?",
            options: [
                "No, respeta el contexto de filtro actual (solo cuenta 2024).",
                "Sí, siempre cuenta la tabla completa sin importar filtros.",
                "Depende de si la tabla está conectada a otra."
            ],
            correct: "No, respeta el contexto de filtro actual (solo cuenta 2024)."
        }
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
        power: 15,
        tacticalQuestion: {
            q: "Alerta de duplicados: Tienes 'Cliente A' y 'Cliente A ' (con un espacio extra al final). ¿Cuántos valores únicos ve esta carta?",
            options: [
                "2 (El espacio cuenta, son valores distintos).",
                "1 (Power BI normaliza los espacios automáticamente).",
                "0 (Los marca como error)."
            ],
            correct: "2 (El espacio cuenta, son valores distintos)."
        }
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
        power: 15,
        tacticalQuestion: {
            q: "Necesitas clasificar en 3 categorias: 'Alto', 'Medio' y 'Bajo'. ¿Cómo estructuras la táctica con DECISOR (IF)?",
            options: [
                "Anidando IFs: IF(val>100, 'Alto', IF(val>50, 'Medio', 'Bajo')).",
                "Usando tres IFs separados uno tras otro.",
                "IF(val>100 AND val>50, 'Alto', 'Bajo')."
            ],
            correct: "Anidando IFs: IF(val>100, 'Alto', IF(val>50, 'Medio', 'Bajo'))."
        }
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
        power: 15,
        tacticalQuestion: {
            q: "Buscas clientes que sean 'VIP' Y ademas sean 'Nuevos'. Tienes 50 VIPs y 30 Nuevos. ¿Puede el resultado de CONJUNTOR (AND) ser 60?",
            options: [
                "Imposible, la intersección nunca puede ser mayor al grupo más pequeño (30).",
                "Sí, si se suman los grupos.",
                "Depende de los duplicados."
            ],
            correct: "Imposible, la intersección nunca puede ser mayor al grupo más pequeño (30)."
        }
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
        power: 15,
        tacticalQuestion: {
            q: "Cuidado: La condición es 'Ventas > 1000 OR Ganancia > 500'. Si una fila cumple AMBAS condiciones, ¿qué devuelve el ALTERNADOR?",
            options: [
                "Devuelve TRUE (Verdadero).",
                "Devuelve FALSE (debe ser uno u otro, no ambos).",
                "Da error de lógica circular."
            ],
            correct: "Devuelve TRUE (Verdadero)."
        }
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
        description: 'Objetivo: Consolidar el rendimiento financiero global. Amenaza: Brechas de datos (nulos) detectadas en la columna de ingresos. Requerimiento: Una función para agregar el volumen total y otra para sanear los vacíos antes del cálculo.',
        villainAppears: true
    },
    'datarescue-2': {
        required: ['promediador'],
        optional: ['maximo', 'minimo'],
        description: 'Objetivo: Análisis de distribución de carga. El sistema requiere identificar el valor central representativo de los pesos de envío para calibrar los sensores de equilibrio.',
        villainAppears: false
    },
    'datarescue-3': {
        required: ['maximo', 'decisor'],
        optional: ['promediador', 'minimo'],
        description: 'Objetivo: Auditoría de anomalías extremas. Se busca el pico más alto de volumen cúbico (CBM), pero existen ruidos en la señal. Aísla el valor extremo solo si cumple con los parámetros de validez.',
        villainAppears: true
    },
    'datarescue-4': {
        required: ['filator', 'unica'],
        optional: ['contador'],
        description: 'Objetivo: Auditoría de integridad. El dataset ha sido inflado con clones. Tu misión es doble: determina la magnitud del ataque (total de filas afectadas) y recupera la cifra real de entidades singulares (sin clones).',
        villainAppears: true
    },
    'datarescue-5': {
        required: ['unica'],
        optional: ['filator', 'contador'],
        description: 'Objetivo: Purga de identidades. La normalización de nombres ha fallado. Necesitamos un conteo estricto de clientes individuales, ignorando cualquier repetición o variación en el registro.',
        villainAppears: false
    },
    'datarescue-6': {
        required: ['decisor', 'alternador'],
        optional: ['conjuntor'],
        description: 'Objetivo: Protocolo de Clasificación de Amenazas. Identifica transacciones que cumplan AL MENOS UNO de los dos criterios de peligro: "Monto Excesivo" o "Origen Desconocido". Etiquétalas para cuarentena.',
        villainAppears: true
    },
    'datarescue-7': {
        required: ['sumator', 'promediador', 'maximo', 'minimo', 'contador', 'filator', 'unica', 'decisor', 'conjuntor', 'alternador'],
        optional: [],
        description: 'Objetivo: DEFENSA TOTAL DEL NÚCLEO. Múltiples vectores de corrupción detectados: duplicidad masiva, nulos sistémicos y lógica invertida. Se requiere un despliegue de fuerza completa (Agregación, Conteo y Lógica) para restaurar el orden.',
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
