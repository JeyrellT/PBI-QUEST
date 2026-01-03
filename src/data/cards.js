// ============================================
// DATARESCUE: Sistema de Cartas (Skills/Habilidades)
// ============================================

/**
 * Tipos de cartas:
 * - HERO: Funciones operativas (DAX/agregación)
 * - WILDCARD: Conocimiento y limpieza
 */

export const CARDS = {
    // ============================================
    // CARTAS HÉROE (Funciones DAX/Agregación)
    // ============================================
    hero: [
        {
            id: 'SUM',
            name: 'SUM',
            type: 'HERO',
            icon: '➕',
            color: '#22c55e',
            description: 'Suma todos los valores de una columna numérica.',
            syntax: 'SUM(tabla[columna])',
            example: 'Total Ventas = SUM(Ventas[Monto])',
            unlocksAt: 1, // Nivel requerido para desbloquear
            power: 10,
            category: 'aggregation'
        },
        {
            id: 'AVERAGE',
            name: 'AVERAGE',
            type: 'HERO',
            icon: '📊',
            color: '#3b82f6',
            description: 'Calcula el promedio de una columna numérica.',
            syntax: 'AVERAGE(tabla[columna])',
            example: 'Ticket Promedio = AVERAGE(Ventas[Monto])',
            unlocksAt: 2,
            power: 10,
            category: 'aggregation'
        },
        {
            id: 'MAX',
            name: 'MAX',
            type: 'HERO',
            icon: '⬆️',
            color: '#f59e0b',
            description: 'Encuentra el valor máximo de una columna.',
            syntax: 'MAX(tabla[columna])',
            example: 'Venta Mayor = MAX(Ventas[Monto])',
            unlocksAt: 2,
            power: 8,
            category: 'aggregation'
        },
        {
            id: 'MIN',
            name: 'MIN',
            type: 'HERO',
            icon: '⬇️',
            color: '#06b6d4',
            description: 'Encuentra el valor mínimo de una columna.',
            syntax: 'MIN(tabla[columna])',
            example: 'Venta Menor = MIN(Ventas[Monto])',
            unlocksAt: 2,
            power: 8,
            category: 'aggregation'
        },
        {
            id: 'COUNT',
            name: 'COUNT',
            type: 'HERO',
            icon: '🔢',
            color: '#8b5cf6',
            description: 'Cuenta celdas numéricas no vacías.',
            syntax: 'COUNT(tabla[columna])',
            example: 'Transacciones = COUNT(Ventas[ID])',
            unlocksAt: 3,
            power: 8,
            category: 'counting'
        },
        {
            id: 'COUNTROWS',
            name: 'COUNTROWS',
            type: 'HERO',
            icon: '📋',
            color: '#ec4899',
            description: 'Cuenta el número total de filas en una tabla.',
            syntax: 'COUNTROWS(tabla)',
            example: 'Total Filas = COUNTROWS(Ventas)',
            unlocksAt: 4,
            power: 10,
            category: 'counting'
        },
        {
            id: 'DISTINCTCOUNT',
            name: 'DISTINCTCOUNT',
            type: 'HERO',
            icon: '🎯',
            color: '#14b8a6',
            description: 'Cuenta valores únicos (sin repetir).',
            syntax: 'DISTINCTCOUNT(tabla[columna])',
            example: 'Clientes Únicos = DISTINCTCOUNT(Ventas[Cliente])',
            unlocksAt: 5,
            power: 15,
            category: 'counting'
        },
        {
            id: 'IF',
            name: 'IF',
            type: 'HERO',
            icon: '❓',
            color: '#f97316',
            description: 'Evalúa una condición y devuelve diferentes valores.',
            syntax: 'IF(condición, valor_si_true, valor_si_false)',
            example: 'Estado = IF([Ventas] > 1000, "Alto", "Bajo")',
            unlocksAt: 4,
            power: 20,
            category: 'logic'
        },
        {
            id: 'AND',
            name: 'AND',
            type: 'HERO',
            icon: '🔗',
            color: '#84cc16',
            description: 'TRUE solo si TODAS las condiciones son verdaderas.',
            syntax: 'AND(condición1, condición2)',
            example: 'IF(AND([Edad]>18, [Activo]=TRUE), "Válido", "Inválido")',
            unlocksAt: 6,
            power: 15,
            category: 'logic'
        },
        {
            id: 'OR',
            name: 'OR',
            type: 'HERO',
            icon: '⚡',
            color: '#eab308',
            description: 'TRUE si al menos UNA condición es verdadera.',
            syntax: 'OR(condición1, condición2)',
            example: 'IF(OR([Riesgo]="Alto", [Deuda]>5000), "Revisar", "OK")',
            unlocksAt: 6,
            power: 15,
            category: 'logic'
        },
        {
            id: 'CALCULATE',
            name: 'CALCULATE',
            type: 'HERO',
            icon: '🔮',
            color: '#a855f7',
            description: 'Evalúa una expresión con filtros modificados. ¡La más poderosa!',
            syntax: 'CALCULATE(expresión, filtro1, filtro2...)',
            example: 'Ventas USA = CALCULATE(SUM([Ventas]), País="USA")',
            unlocksAt: 7,
            power: 30,
            category: 'advanced'
        },
        {
            id: 'FILTER',
            name: 'FILTER',
            type: 'HERO',
            icon: '🔍',
            color: '#0ea5e9',
            description: 'Devuelve una tabla filtrada por una condición.',
            syntax: 'FILTER(tabla, condición)',
            example: 'COUNTROWS(FILTER(Clientes, [Activo]=TRUE))',
            unlocksAt: 5,
            power: 20,
            category: 'advanced'
        }
    ],

    // ============================================
    // CARTAS COMODÍN (Conocimiento + Limpieza)
    // ============================================
    wildcard: [
        {
            id: 'POWER_QUERY_BASICS',
            name: '¿Qué es Power Query?',
            type: 'WILDCARD',
            icon: '📖',
            color: '#64748b',
            description: 'Power Query es el motor de ETL de Power BI para transformar y limpiar datos.',
            knowledge: 'Power Query te permite: importar desde múltiples fuentes, limpiar datos sucios, combinar tablas, crear columnas calculadas.',
            unlocksAt: 1,
            power: 5,
            category: 'knowledge'
        },
        {
            id: 'DATA_TYPES',
            name: 'Tipos de Datos',
            type: 'WILDCARD',
            icon: '🏷️',
            color: '#78716c',
            description: 'Distingue entre datos cualitativos (texto) y cuantitativos (números).',
            knowledge: 'Cualitativos: Nombre, País, Categoría. Cuantitativos: Monto, Edad, Peso. ¡No sumes texto!',
            unlocksAt: 1,
            power: 5,
            category: 'knowledge'
        },
        {
            id: 'TRIM_CLEAN',
            name: 'Trim & Clean',
            type: 'WILDCARD',
            icon: '✂️',
            color: '#0d9488',
            description: 'Remueve espacios extra y caracteres no imprimibles.',
            syntax: 'Text.Trim([columna]) / Text.Clean([columna])',
            example: '"  Hola  " → "Hola"',
            unlocksAt: 2,
            power: 10,
            category: 'cleaning',
            unlocks: ['trim', 'clean']
        },
        {
            id: 'REPLACE_VALUES',
            name: 'Reemplazar Valores',
            type: 'WILDCARD',
            icon: '🔄',
            color: '#6366f1',
            description: 'Cambia un valor por otro en toda la columna.',
            syntax: 'Text.Replace([columna], "viejo", "nuevo")',
            example: '"N/A" → null, "kg" → ""',
            unlocksAt: 3,
            power: 12,
            category: 'cleaning',
            unlocks: ['replace']
        },
        {
            id: 'SPLIT_COLUMN',
            name: 'Dividir Columna',
            type: 'WILDCARD',
            icon: '✂️',
            color: '#f43f5e',
            description: 'Divide una columna en múltiples por un delimitador.',
            syntax: 'Text.Split([columna], "-")',
            example: '"A-001-2024" → ["A", "001", "2024"]',
            unlocksAt: 4,
            power: 15,
            category: 'transformation',
            unlocks: ['split']
        },
        {
            id: 'PIVOT_UNPIVOT',
            name: 'Pivot vs Unpivot',
            type: 'WILDCARD',
            icon: '🔀',
            color: '#8b5cf6',
            description: 'Transforma filas en columnas (pivot) o viceversa (unpivot).',
            knowledge: 'Pivot: Para crear tablas resumen. Unpivot: Para normalizar datos anchos en formato largo.',
            unlocksAt: 6,
            power: 20,
            category: 'transformation',
            unlocks: ['pivot', 'unpivot']
        },
        {
            id: 'MERGE_APPEND',
            name: 'Combinar Tablas',
            type: 'WILDCARD',
            icon: '🔗',
            color: '#22c55e',
            description: 'Merge (JOIN horizontal) vs Append (unión vertical).',
            knowledge: 'Merge: Combina tablas por columna clave (como VLOOKUP). Append: Apila tablas con mismas columnas.',
            unlocksAt: 5,
            power: 18,
            category: 'transformation',
            unlocks: ['merge', 'append']
        },
        {
            id: 'ERROR_HANDLING',
            name: 'Manejo de Errores',
            type: 'WILDCARD',
            icon: '🛡️',
            color: '#ef4444',
            description: 'Usa TRY...OTHERWISE para manejar errores de conversión.',
            syntax: 'try Number.FromText([valor]) otherwise null',
            example: 'Convierte texto a número, si falla devuelve null.',
            unlocksAt: 4,
            power: 15,
            category: 'cleaning',
            unlocks: ['try_otherwise']
        },
        {
            id: 'DATE_INTELLIGENCE',
            name: 'Inteligencia Temporal',
            type: 'WILDCARD',
            icon: '📅',
            color: '#3b82f6',
            description: 'Funciones DAX para análisis temporal (YTD, MTD, SAMEPERIODLASTYEAR).',
            knowledge: 'Requiere una tabla calendario. Permite comparar períodos: este mes vs mes anterior, este año vs año pasado.',
            unlocksAt: 7,
            power: 25,
            category: 'advanced',
            unlocks: ['time_intelligence']
        },
        {
            id: 'OUTLIER_DETECTION',
            name: 'Detección de Outliers',
            type: 'WILDCARD',
            icon: '📍',
            color: '#f97316',
            description: 'Identifica valores atípicos usando estadísticas.',
            knowledge: 'Métodos: IQR (1.5 * rango intercuartil), Z-score (> 3 desviaciones), Percentil (> P95 * 1.5).',
            unlocksAt: 5,
            power: 20,
            category: 'analysis',
            unlocks: ['outlier_rules']
        }
    ]
};

// ============================================
// Funciones auxiliares para el sistema de cartas
// ============================================

/**
 * Obtener todas las cartas disponibles para un nivel dado
 */
export const getAvailableCards = (userLevel) => {
    const heroCards = CARDS.hero.filter(card => card.unlocksAt <= userLevel);
    const wildcardCards = CARDS.wildcard.filter(card => card.unlocksAt <= userLevel);
    return { hero: heroCards, wildcard: wildcardCards };
};

/**
 * Obtener cartas bloqueadas (próximas a desbloquear)
 */
export const getLockedCards = (userLevel) => {
    const heroCards = CARDS.hero.filter(card => card.unlocksAt > userLevel);
    const wildcardCards = CARDS.wildcard.filter(card => card.unlocksAt > userLevel);
    return { hero: heroCards, wildcard: wildcardCards };
};

/**
 * Verificar si el usuario tiene las cartas requeridas para una misión
 */
export const hasRequiredCards = (unlockedCardIds, requiredCardIds) => {
    return requiredCardIds.every(id => unlockedCardIds.includes(id));
};

/**
 * Obtener carta por ID
 */
export const getCardById = (cardId) => {
    return CARDS.hero.find(c => c.id === cardId) || 
           CARDS.wildcard.find(c => c.id === cardId) || 
           null;
};

/**
 * Calcular poder total de un conjunto de cartas
 */
export const calculateTotalPower = (cardIds) => {
    return cardIds.reduce((total, id) => {
        const card = getCardById(id);
        return total + (card?.power || 0);
    }, 0);
};

/**
 * Obtener cartas por categoría
 */
export const getCardsByCategory = (category) => {
    const heroCards = CARDS.hero.filter(card => card.category === category);
    const wildcardCards = CARDS.wildcard.filter(card => card.category === category);
    return [...heroCards, ...wildcardCards];
};

export default CARDS;
