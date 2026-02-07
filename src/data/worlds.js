// ============================================
// CONTEXTO DEL MULTIVERSO
// ============================================
export const UNIVERSE_CONTEXT = {
    title: 'El Multiverso de Datos',
    introImage: '/images/intro/multiverse_intro.png',
    narrative: 'El flujo de datos universal se ha fracturado. Diferentes realidades paralelas (Dimensions) están sufriendo crisis de datos únicas. Como un "Data Walker", tu misión es viajar entre estos mundos, aprender sus reglas locales (Sintaxis DAX, Limpieza M) y restaurar el orden antes de que la corrupción se propague.',
    role: 'Data Walker (Viajero de Datos)',
    worlds: [
        { id: 'office', name: 'Dimensión Papel', anomaly: 'Caos Administrativo', portalImage: '/images/intro/office_portal.png' },
        { id: 'datarescue', name: 'Dimensión Cyber-Void', anomaly: 'Corrupción Lógica', portalImage: '/images/intro/datarescue_portal.png' },
        { id: 'stark', name: 'Dimensión Tecnócrata', anomaly: 'Legado No Estructurado', portalImage: '/images/intro/stark_portal.png' },
        { id: 'squid-game', name: 'Dimensión de Riesgo', anomaly: 'Error Fatal', portalImage: '/images/intro/squid_portal.png' },
        { id: 'hogwarts', name: 'Dimensión Mágica', anomaly: 'Archivos Arcaicos', portalImage: '/images/intro/hogwarts_portal.png' }
    ]
};

// ============================================
// SCORING PROFILES - Perfiles de puntuación por mundo
// ============================================
export const SCORING_PROFILES = {
    'office-standard': {
        hintPenalty: 0.08,           // -8% por pista usada (permisivo)
        attemptPenalty: 0.04,        // -4% por intento extra (permisivo)
        wrongAnswerPenalty: 0.02,    // -2% por respuesta incorrecta (permisivo)
        minMultiplier: 0.6,          // Mínimo 60% del XP base
        perfectBonus: 1.15,          // +15% bonus si perfecto (sin errores)
        description: 'Perfil permisivo para aprendizaje con algo de picante'
    }
};

// ============================================
// SISTEMA DE TIPS PREMIUM
// ============================================
// Tips organizados por categoría para ayuda contextual
export const PREMIUM_TIP_CATEGORIES = {
    concept: {
        icon: '💡',
        label: 'Conceptos',
        description: 'Explicaciones teóricas',
        color: '#3b82f6'
    },
    interface: {
        icon: '🖱️',
        label: 'Interfaz',
        description: 'Dónde hacer click',
        color: '#22c55e'
    },
    shortcut: {
        icon: '⌨️',
        label: 'Atajos',
        description: 'Shortcuts de teclado',
        color: '#a855f7'
    },
    troubleshooting: {
        icon: '🔧',
        label: 'Problemas',
        description: 'Errores comunes',
        color: '#ef4444'
    },
    proTip: {
        icon: '🚀',
        label: 'Pro Tips',
        description: 'Consejos avanzados',
        color: '#f59e0b'
    },
    realWorld: {
        icon: '🌍',
        label: 'Mundo Real',
        description: 'Aplicación práctica',
        color: '#06b6d4'
    }
};

// ============================================
// ERRORES COMUNES POR CONCEPTO
// ============================================
export const COMMON_MISTAKES = {
    'data-import': [
        {
            mistake: 'El archivo no aparece después de importar',
            symptoms: ['Panel Campos vacío', 'No se ve la tabla'],
            causes: ['Seleccionaste "Transformar" en lugar de "Cargar"', 'El archivo está vacío'],
            solutions: [
                'En Power Query, click en "Cerrar y aplicar" (arriba izquierda)',
                'Verifica que el archivo tenga datos (ábrelo en Excel primero)'
            ],
            prevention: 'Siempre revisa la vista previa antes de cargar'
        },
        {
            mistake: 'Los números aparecen como texto',
            symptoms: ['Símbolo "ABC" en el encabezado', 'No puedes sumar la columna'],
            causes: ['El archivo tiene celdas con texto mezclado', 'Formato regional incorrecto'],
            solutions: [
                'En Power Query: click derecho en columna > Cambiar tipo > Número decimal',
                'Si falla, hay texto escondido. Usa "Reemplazar valores" para limpiar'
            ],
            prevention: 'Revisa siempre el ícono del encabezado: 123 = número, ABC = texto'
        },
        {
            mistake: 'Las fechas están desordenadas (día/mes invertidos)',
            symptoms: ['Enero aparece como día 1-12', 'Fechas imposibles como "13/15/2024"'],
            causes: ['Formato americano (MM/DD) vs español (DD/MM)'],
            solutions: [
                'En Power Query: click derecho > Cambiar tipo > Usando configuración regional',
                'Selecciona "Inglés (Estados Unidos)" si el archivo viene de allá'
            ],
            prevention: 'Pregunta siempre el origen del archivo antes de importar'
        }
    ],
    'data-cleaning': [
        {
            mistake: 'Después de limpiar, faltan filas',
            symptoms: ['Menos filas que antes', 'Datos importantes desaparecieron'],
            causes: ['Filtraste sin querer', 'Eliminaste filas con errores que tenían datos válidos'],
            solutions: [
                'En Power Query, revisa "Pasos aplicados" (derecha). Elimina el paso problemático.',
                'Usa "Reemplazar errores" en lugar de "Quitar errores"'
            ],
            prevention: 'Antes de eliminar, siempre filtra y REVISA qué se va a borrar'
        },
        {
            mistake: 'Text.Proper no funciona con nombres compuestos',
            symptoms: ['"McDonald" se convierte en "Mcdonald"', '"De La Rosa" se ve mal'],
            causes: ['Text.Proper baja todo después de la primera letra de cada palabra'],
            solutions: [
                'Para apellidos especiales, usa una tabla de excepciones',
                'Acepta que no será 100% perfecto, lo importante es consistencia'
            ],
            prevention: 'Decide una convención y aplícala siempre igual'
        }
    ],
    'dax-sum-avg': [
        {
            mistake: 'La medida muestra "Error" o está en blanco',
            symptoms: ['En lugar de número aparece vacío', 'Dice "Error"'],
            causes: ['Nombre de tabla o columna mal escrito', 'Paréntesis sin cerrar'],
            solutions: [
                'Revisa que el nombre de la tabla sea EXACTO (mayúsculas importan)',
                'Usa autocompletado: escribe las primeras letras y Power BI sugiere'
            ],
            prevention: 'Siempre usa autocompletado, nunca escribas nombres a mano'
        },
        {
            mistake: 'AVERAGE me da un número muy diferente al esperado',
            symptoms: ['El promedio parece demasiado alto o bajo'],
            causes: ['Hay celdas vacías o con cero que distorsionan', 'Confundiste AVERAGE con AVERAGEA'],
            solutions: [
                'AVERAGE ignora vacíos pero NO ceros. Filtra los ceros si no son ventas reales',
                'Usa AVERAGEX si necesitas más control'
            ],
            prevention: 'Siempre revisa los datos crudos antes de promediar'
        }
    ],
    'dax-calculate': [
        {
            mistake: 'CALCULATE no filtra nada',
            symptoms: ['El número es igual con o sin CALCULATE', 'No cambia al filtrar'],
            causes: ['El texto del filtro no coincide exactamente', 'La columna está mal referenciada'],
            solutions: [
                'El filtro debe ser EXACTO: "Dwight Schrute" ≠ "dwight schrute"',
                'Copia el valor directamente de los datos para evitar errores de tipeo'
            ],
            prevention: 'Usa slicers primero para verificar los valores exactos'
        },
        {
            mistake: 'Error de contexto circular',
            symptoms: ['Mensaje: "Se detectó una dependencia circular"'],
            causes: ['La medida se referencia a sí misma', 'Dos medidas se llaman entre sí'],
            solutions: [
                'Rompe la circularidad: crea una medida intermedia',
                'Usa VAR para calcular valores antes de usarlos'
            ],
            prevention: 'Nunca uses el nombre de la medida actual dentro de ella misma'
        }
    ]
};

// ============================================
// ATAJOS DE TECLADO POWER BI
// ============================================
export const POWERBI_SHORTCUTS = {
    general: [
        { keys: 'Ctrl + S', action: 'Guardar archivo', tip: '¡Guarda frecuentemente!' },
        { keys: 'Ctrl + Z', action: 'Deshacer', tip: 'Funciona para casi todo' },
        { keys: 'Ctrl + Y', action: 'Rehacer', tip: 'Recupera lo que deshiciste' },
        { keys: 'F5', action: 'Iniciar presentación', tip: 'Para mostrar tu dashboard' }
    ],
    navigation: [
        { keys: 'Ctrl + 1', action: 'Vista Informe', tip: 'Donde creas gráficos' },
        { keys: 'Ctrl + 2', action: 'Vista Datos', tip: 'Ver tablas como Excel' },
        { keys: 'Ctrl + 3', action: 'Vista Modelo', tip: 'Ver relaciones' }
    ],
    editing: [
        { keys: 'Alt + Enter', action: 'Nueva línea en fórmula', tip: 'Para fórmulas largas' },
        { keys: 'Ctrl + Shift + F', action: 'Formatear fórmula DAX', tip: 'Organiza tu código' },
        { keys: 'Tab', action: 'Autocompletar', tip: 'Acepta la sugerencia' }
    ],
    powerQuery: [
        { keys: 'Ctrl + Enter', action: 'Aplicar cambios', tip: 'En Power Query' },
        { keys: 'Delete', action: 'Eliminar paso seleccionado', tip: 'En panel de pasos' }
    ]
};

// ============================================
// SISTEMA DE DIAGNÓSTICO INICIAL (Neurociencia + Vygotsky)
// ============================================
// Basado en Zona de Desarrollo Próximo: evaluar conocimientos previos
// para adaptar la ruta de aprendizaje
export const INITIAL_DIAGNOSTIC = {
    worldId: 'office',
    title: '🎯 Antes de empezar...',
    subtitle: 'Queremos personalizar tu experiencia',
    description: 'Responde estas preguntas rápidas para adaptar las misiones a tu nivel.',
    estimatedTime: '1 minuto',
    questions: [
        {
            id: 'excel-experience',
            question: '¿Con qué frecuencia usas Excel u hojas de cálculo?',
            icon: '📊',
            options: [
                { text: 'Nunca o casi nunca', value: 0, tag: 'novice' },
                { text: 'A veces (fórmulas básicas como SUMA)', value: 1, tag: 'basic' },
                { text: 'Frecuentemente (tablas dinámicas, BUSCARV)', value: 2, tag: 'intermediate' },
                { text: 'Experto (VBA, Power Query en Excel)', value: 3, tag: 'advanced' }
            ]
        },
        {
            id: 'data-concepts',
            question: '¿Sabes qué significa "columna", "fila" y "filtrar datos"?',
            icon: '📋',
            options: [
                { text: 'No estoy seguro de todos', value: 0, tag: 'novice' },
                { text: 'Sí, lo básico', value: 1, tag: 'basic' }
            ]
        },
        {
            id: 'powerbi-prior',
            question: '¿Has usado Power BI antes?',
            icon: '💡',
            options: [
                { text: 'Nunca lo he abierto', value: 0, tag: 'novice' },
                { text: 'Lo abrí una vez pero no recuerdo mucho', value: 1, tag: 'basic' },
                { text: 'Sí, conozco la interfaz básica', value: 2, tag: 'intermediate' }
            ]
        },
        {
            id: 'learning-preference',
            question: '¿Cómo prefieres aprender?',
            icon: '🎓',
            options: [
                { text: 'Paso a paso, con mucha guía', value: 0, tag: 'guided' },
                { text: 'Algo de guía pero también explorar solo', value: 1, tag: 'balanced' },
                { text: 'Mínima guía, prefiero descubrir', value: 2, tag: 'explorer' }
            ]
        }
    ],
    // Rutas adaptativas basadas en puntuación
    routes: {
        novice: {
            minScore: 0,
            maxScore: 2,
            startMission: 'office-0a',  // Empieza desde el principio absoluto
            skipMissions: [],
            message: '¡Perfecto! Empezaremos desde cero, paso a paso. No te preocupes, este mundo está diseñado para principiantes totales.',
            estimatedTime: '2-3 horas para completar el mundo'
        },
        basic: {
            minScore: 3,
            maxScore: 4,
            startMission: 'office-0b',  // Salta la intro más básica
            skipMissions: ['office-0a'],
            message: '¡Genial! Tienes bases sólidas. Empezaremos con una introducción rápida a Power BI.',
            estimatedTime: '1.5-2 horas para completar el mundo'
        },
        intermediate: {
            minScore: 5,
            maxScore: 7,
            startMission: 'office-1',   // Directo a importar datos
            skipMissions: ['office-0a', 'office-0b', 'office-0'],
            message: '¡Excelente experiencia previa! Saltaremos los tutoriales básicos y pasaremos a la acción.',
            estimatedTime: '1-1.5 horas para completar el mundo'
        }
    }
};

// ============================================
// SISTEMA DE MICRO-VICTORIAS (Neurociencia: Dopamina)
// ============================================
// Basado en: La dopamina se libera con la ANTICIPACIÓN y el LOGRO
// Feedback cada 20-30 segundos máximo para mantener engagement
export const MICRO_VICTORIES = {
    onFileDownload: {
        id: 'file-download',
        message: '📥 ¡Archivo descargado!',
        xp: 2,
        sound: 'click-success',
        animation: 'pulse-green',
        duration: 1500
    },
    onPowerBIOpen: {
        id: 'pbi-open',
        message: '🎉 ¡Power BI está listo!',
        xp: 3,
        sound: 'chime',
        character: 'michael',
        quote: '"¡Ahí vamos! — Michael Scott"',
        animation: 'bounce',
        duration: 2000
    },
    onDataLoaded: {
        id: 'data-loaded',
        message: '✨ ¡Tus datos aparecieron!',
        xp: 5,
        sound: 'magic-sparkle',
        animation: 'sparkle',
        confetti: true,
        duration: 2500
    },
    onColumnTypeFixed: {
        id: 'column-type',
        message: '🔧 ¡Tipo de dato corregido!',
        xp: 3,
        sound: 'success-click',
        animation: 'checkmark',
        duration: 1500
    },
    onFirstMeasure: {
        id: 'first-measure',
        message: '🧙 ¡Tu primera medida DAX funciona!',
        xp: 10,
        sound: 'achievement',
        badge: 'first-measure',
        confetti: true,
        character: 'dwight',
        quote: '"Impresionante. Para un principiante. — Dwight"',
        animation: 'glow-gold',
        duration: 3000
    },
    onFirstVisualization: {
        id: 'first-viz',
        message: '📊 ¡Tu primer gráfico!',
        xp: 8,
        sound: 'level-up-mini',
        animation: 'pop',
        character: 'pam',
        quote: '"¡Qué bonito! Me recuerda a mis acuarelas. — Pam"',
        duration: 2500
    },
    onCheckpointPass: {
        id: 'checkpoint',
        message: '✅ ¡Checkpoint superado!',
        xp: 5,
        sound: 'checkpoint',
        animation: 'slide-up',
        duration: 1500
    },
    onMissionComplete: {
        id: 'mission-complete',
        message: '🏆 ¡Misión completada!',
        xp: 0, // XP principal viene de la misión
        sound: 'victory',
        confetti: true,
        animation: 'celebration',
        duration: 4000
    }
};

// ============================================
// PERSONAJES COMO MENTORES (Pedagogía + Emociones)
// ============================================
// Cada personaje tiene un rol pedagógico específico
export const CHARACTER_MENTORS = {
    michael: {
        id: 'michael',
        name: 'Michael Scott',
        role: 'Motivador Entusiasta',
        avatar: '/images/avatars/michael.png',
        color: '#3b82f6',
        appearsIn: ['introductions', 'celebrations', 'encouragement'],
        style: 'Humor, exageración positiva, referencias pop',
        phrases: {
            welcome: '"¡Bienvenido al mejor equipo del mundo! Según yo." — Michael',
            encouragement: '"Tú extrañas el 100% de los datos que no analizas. — Wayne Gretzky — Michael Scott"',
            celebration: '"¡AAHHH! ¡ESO ES LO QUE ELLA DIJO! Sobre tus increíbles habilidades con datos."',
            hint: '"Okay, okay, no entres en pánico. Yo tampoco entendí eso la primera vez... ni la segunda."'
        }
    },
    dwight: {
        id: 'dwight',
        name: 'Dwight K. Schrute',
        role: 'Experto Técnico',
        avatar: '/images/avatars/dwight.png',
        color: '#84cc16',
        appearsIn: ['advanced-tips', 'best-practices', 'efficiency'],
        style: 'Serio, directo, competitivo, datos',
        phrases: {
            tip: '"HECHO: Esta función es 47% más eficiente que la alternativa." — Dwight',
            correct: '"Correcto. Tu razonamiento es... aceptable." — Dwight',
            advanced: '"Como Asistente del Gerente Regional, te revelaré un secreto avanzado..." — Dwight',
            challenge: '"¿Crees que eso fue difícil? Espera a la siguiente misión. Yo la completé en la mitad del tiempo."'
        }
    },
    jim: {
        id: 'jim',
        name: 'Jim Halpert',
        role: 'Mentor Accesible',
        avatar: '/images/avatars/jim.png',
        color: '#06b6d4',
        appearsIn: ['stuck-moments', 'simplifications', 'patience'],
        style: 'Calmado, empático, simplifica, humor sutil',
        phrases: {
            stuck: '"Hey, tranquilo. Yo también me confundí la primera vez. Es más fácil de lo que parece..." — Jim',
            simplify: '"Ignora lo complicado por ahora. Solo enfócate en esto..." — Jim',
            patience: '"No hay prisa. Tómate tu tiempo para entenderlo bien." — Jim',
            support: '"*mira a la cámara* Sí, Power BI puede ser confuso. Pero lo vas a lograr."'
        }
    },
    pam: {
        id: 'pam',
        name: 'Pam Beesly',
        role: 'Refuerzo Positivo',
        avatar: '/images/avatars/pam.png',
        color: '#ec4899',
        appearsIn: ['step-completion', 'visual-feedback', 'encouragement'],
        style: 'Amable, artística, detallista, cálida',
        phrases: {
            complete: '"¡Tu gráfico quedó muy bonito! La paleta de colores es perfecta." — Pam',
            progress: '"Vas muy bien. Cada paso cuenta." — Pam',
            creative: '"Me encanta cómo organizaste eso. Muy creativo." — Pam',
            support: '"Si necesitas un descanso, está bien. Los datos seguirán aquí cuando vuelvas."'
        }
    },
    kevin: {
        id: 'kevin',
        name: 'Kevin Malone',
        role: 'Analogías Simples',
        avatar: '/images/avatars/kevin.png',
        color: '#f59e0b',
        appearsIn: ['concept-explanations', 'simplifications'],
        style: 'Simple, relaciona todo con comida, humor',
        phrases: {
            sum: '"SUM es como cuando cuento todos mis M&Ms. Los sumo. Obvio." — Kevin',
            average: '"AVERAGE es como... si tengo 3 pizzas y 3 personas. Cada uno come 1 pizza. Eso es promedio." — Kevin',
            count: '"COUNT es cuántos platos de chili puedo cargar. La respuesta correcta es muchos." — Kevin',
            simple: '"No lo pienses demasiado. Si yo lo entendí, tú también puedes."'
        }
    },
    angela: {
        id: 'angela',
        name: 'Angela Martin',
        role: 'Validación y Precisión',
        avatar: '/images/avatars/angela.png',
        color: '#8b5cf6',
        appearsIn: ['verifications', 'precision', 'final-checks'],
        style: 'Estricta pero justa, precisa, no tolera errores',
        phrases: {
            correct: '"Hmm. Tu respuesta es correcta. Supongo que no eres completamente inútil." — Angela',
            incorrect: '"Eso está mal. Revísalo de nuevo. Y esta vez, presta atención." — Angela',
            precision: '"Los decimales importan. La precisión no es opcional." — Angela',
            approval: '"...Aceptable. Pero no dejes que se te suba a la cabeza."'
        }
    },
    // ============================================
    // DATARESCUE CHARACTERS (Cyberpunk Theme)
    // ============================================
    nova: {
        id: 'nova',
        name: 'Nova - IA Guardiana',
        role: 'Guía del Sistema',
        avatar: '/images/avatars/nova.png',
        color: '#00d2ff', // Cyan Neon
        appearsIn: ['datarescue', 'mission-intro', 'hints'],
        style: 'Futurista, serena, analítica pero amable',
        phrases: {
            welcome: '"Sistema reiniciado. Hola, Usuario. Soy Nova, tu interfaz de defensa de datos."',
            encouragement: '"Tus patrones lógicos son prometedores. Continúa así."',
            celebration: '"Amenaza neutralizada. Integridad de datos restaurada."',
            hint: '"Detecto una anomalía en tu fórmula. Revisa los paréntesis."'
        }
    },
    cipher: {
        id: 'cipher',
        name: 'Cipher - El Arquitecto',
        role: 'Experto en DAX',
        avatar: '/images/avatars/cipher.png',
        color: '#8b5cf6', // Purple Neon
        appearsIn: ['datarescue', 'advanced-dax', 'logic-checks'],
        style: 'Críptico, sabio, enfocado en la estructura',
        phrases: {
            tip: '"El código es ley. Si la sintaxis falla, la realidad falla."',
            correct: '"Elegante. Una solución digna de un arquitecto."',
            advanced: '"CALCULATE no es solo una función. Es un manipulador de realidades (contextos)."',
            challenge: '"Corruptex usa el caos. Nosotros usamos el Orden."'
        }
    },
    glitch: {
        id: 'glitch',
        name: 'Glitch - Hacktivista',
        role: 'Trucos Sucios',
        avatar: '/images/avatars/glitch.png',
        color: '#10b981', // Green Matrix
        appearsIn: ['datarescue', 'shortcuts', 'dirty-data'],
        style: 'Rebelde, rápido, jerga hacker',
        phrases: {
            stuck: '"¿Te atoraste? Pff, mira este atajo. De nada."',
            simplify: '"No lo hagas bonito, hazlo funcional. A romper cosas."',
            patience: '"Corruptex dejó una puerta trasera. Vamos a entrar."',
            support: '"Tranqui, hasta a mí se me olvida cerrar comillas a veces."'
        }
    },
    corruptex: {
        id: 'corruptex',
        name: 'Lord Corruptex',
        role: 'El Villano',
        avatar: '/images/avatars/corruptex.png',
        color: '#ef4444', // Red Danger
        appearsIn: ['datarescue', 'errors', 'boss-fights'],
        style: 'Arrogante, caótico, disfruta el desorden',
        phrases: {
            taunt: '"¿Crees que puedes limpiar mi caos? ¡Qué tierno!"',
            failure: '"¡Jajaja! ¡Tus cálculos son tan vacíos como tus nulos!"',
            challenge: '"He inyectado mil errores más mientras leías esto."',
            defeat: '"¡No! ¡Mis preciosos errores! ¡Volveré con datos no estructurados!"'
        }
    },
    // ============================================
    // STARK INDUSTRIES MENTORS
    // ============================================
    pepper: {
        id: 'pepper',
        name: 'Pepper Potts',
        role: 'CEO Stark Ind.',
        avatar: '/images/avatars/pepper.png',
        color: '#ff9f43',
        appearsIn: ['stark', 'business', 'audit'],
        style: 'Profesional, urgente, orientada a resultados',
        phrases: {
            welcome: '"Gracias por venir. Tony dejó un desastre y la junta está furiosa."',
            tip: '"Recuerda: Si no es rentable, no es Stark Tech."',
            celebration: '"Excelente. La empresa es solvente un día más gracias a ti."'
        }
    },
    friday: {
        id: 'friday',
        name: 'F.R.I.D.A.Y.',
        role: 'IA Avanzada',
        avatar: '/images/avatars/friday.png',
        color: '#ff4b2b',
        appearsIn: ['stark', 'technical', 'efficiency'],
        style: 'Robótica, precisa, leal',
        phrases: {
            welcome: '"Protocolo de Auditoría iniciado. Bienvisado, Jefe."',
            tip: '"Calculando probabilidad de éxito... Se recomienda usar CALCULATE."',
            celebration: '"Sistemas optimizados al 99.9%."'
        }
    },
    // ============================================
    // SQUID GAME MENTORS
    // ============================================
    frontman: {
        id: 'frontman',
        name: 'The Front Man',
        role: 'Game Master',
        avatar: '/images/avatars/frontman.png',
        color: '#000000',
        appearsIn: ['squid-game', 'rules', 'elimination'],
        style: 'Frío, calculador, filosófico',
        phrases: {
            welcome: '"Bienvenido. En este mundo, los números son vida o muerte."',
            tip: '"Sé preciso. Un decimal incorrecto y serás... eliminado."',
            celebration: '"Has sobrevivido. La estadística te favorece hoy."'
        }
    },
    doll: {
        id: 'doll',
        name: 'Muñeca',
        role: 'Juez Imparcial',
        avatar: '/images/avatars/doll.png',
        color: '#e84393',
        appearsIn: ['squid-game', 'timing', 'alerts'],
        style: 'Infantil pero amenazante, robótica',
        phrases: {
            welcome: '"Jugaremos... muévete luz verde..."',
            tip: '"¡Te veo! Hay un error en tu sintaxis."',
            celebration: '"Pase."'
        }
    },
    // ============================================
    // HOGWARTS MENTORS
    // ============================================
    dumbledore: {
        id: 'dumbledore',
        name: 'Prof. Dumbledore',
        role: 'Director',
        avatar: '/images/avatars/dumbledore.png',
        color: '#8e44ad',
        appearsIn: ['hogwarts', 'wisdom', 'history'],
        style: 'Sabio, críptico, amable',
        phrases: {
            welcome: '"La magia deja rastros... que los muggles llaman \'datos\'."',
            tip: '"La felicidad se puede encontrar incluso en los datasets más oscuros, si uno recuerda encender la luz."',
            celebration: '"¡100 puntos para tu Casa!"'
        }
    },
    hat: {
        id: 'hat',
        name: 'Sombrero Seleccionador',
        role: 'Analista Clasificador',
        avatar: '/images/avatars/hat.png',
        color: '#d35400',
        appearsIn: ['hogwarts', 'sorting', 'logic'],
        style: 'Analítico, ruidoso, sentencioso',
        phrases: {
            welcome: '"Hmm... veo talento. Y una sed de... ¡limpieza de datos!"',
            tip: '"Debes clasificar mejor. ¡Pon orden en esa columna!"',
            celebration: '"¡GRYFFINDOR! (O sea, está aprobado)."'
        }
    }
};

// ============================================
// EXPECTATIVAS CLARAS POR TIPO DE MISIÓN
// ============================================
export const MISSION_EXPECTATIONS_TEMPLATES = {
    tutorial: {
        icon: '📖',
        label: 'Tutorial',
        description: 'Misión guiada paso a paso',
        showTimer: false,
        allowRetry: true,
        penaltyMultiplier: 0.5,  // Menos penalización por errores
        features: ['Guía completa', 'Pistas automáticas', 'Sin límite de tiempo']
    },
    practice: {
        icon: '🎯',
        label: 'Práctica',
        description: 'Aplica lo aprendido con algo de guía',
        showTimer: false,
        allowRetry: true,
        penaltyMultiplier: 0.75,
        features: ['Guía parcial', 'Pistas disponibles', 'Verificación paso a paso']
    },
    challenge: {
        icon: '⚔️',
        label: 'Desafío',
        description: 'Demuestra tus habilidades con mínima ayuda',
        showTimer: true,
        allowRetry: true,
        penaltyMultiplier: 1.0,
        features: ['Solo objetivos', 'Pistas limitadas', 'Bonus por tiempo']
    },
    boss: {
        icon: '👑',
        label: 'Jefe Final',
        description: 'El reto máximo del mundo',
        showTimer: true,
        allowRetry: true,
        penaltyMultiplier: 1.25,
        features: ['Sin guía', 'Una pista gratis', 'Recompensa épica']
    }
};

export const WORLDS = [
    {
        id: 'office',
        order: 1,
        name: 'Dunder Mifflin Paper Co.',
        subtitle: 'The Office',
        description: 'Domina las visualizaciones de ventas y DAX. ¡Salva la sucursal de Scranton!',
        icon: '🏢',
        color: '#00d2ff',
        difficulty: 'Básico',
        image: '/images/worlds/office.png',
        // CONTEXTO DE DIMENSIÓN
        dimension: 'Dimensión Papel (Tierra-1)',
        dimensionContext: 'Un mundo atrapado en la era analógica de Scranton, Pennsylvania, donde una empresa de papel lucha por sobrevivir en la era digital. La sucursal está al borde del cierre: las ventas caen, los datos son un caos de hojas de Excel desperdigadas, y el gerente cree que "la mejor base de datos es el corazón". Corporate ha enviado un ultimátum: o demuestran rentabilidad con datos REALES, o Scranton desaparece. Tu llegada como analista de datos es la última esperanza de esta dimensión.',
        era: '2005-2013 (Era Dorada de Dunder Mifflin)',
        location: 'Scranton Business Park, 1725 Slough Avenue, Scranton, PA',
        threat: 'Cierre de la sucursal por falta de reportes financieros digitales',
        tone: 'Comedia + aprendizaje progresivo. Cada misión es un episodio de la serie.',
        mentors: ['michael', 'dwight', 'pam', 'jim'], // Personajes activos en este mundo
        prologue: `🏢 HAS ATERRIZADO EN: SCRANTON, PENNSYLVANIA.

Es una mañana gris en el Scranton Business Park. El ascensor huele a café quemado y ambición moderada. Al salir al tercer piso, ves un letrero que dice "DUNDER MIFFLIN — Gente que vende papel a gente".

Michael Scott, el gerente regional, te intercepta antes de llegar a tu escritorio:

"¡¡¡AAAH!!! ¡El nuevo! ¡El gurú de los datos! David Wallace me dijo que eres... ¿analista? Eso suena aburrido, así que te he renombrado: 'Asistente del Asistente del Gerente Regional de Datos'. ¡Suena mejor!"

Pero detrás de la sonrisa de Michael hay pánico real. Un memo de Corporate llegó ayer:

📄 MEMO CONFIDENCIAL — Dunder Mifflin Corporate
"La sucursal de Scranton tiene 90 días para presentar reportes financieros digitalizados y análisis de rentabilidad. De no cumplir, se iniciará el proceso de cierre.
— David Wallace, CFO"

Michael arruga el memo: "¡90 días! ¡Es más tiempo del que yo necesito para hacer amigos! Pero resulta que David quiere 'datos' y 'visualizaciones' y cosas de nerds. Ahí es donde entras TÚ."

Tu misión: dominar Power BI, transformar el caos de hojas sueltas de Michael en dashboards profesionales, y demostrar a Corporate que Scranton merece sobrevivir.

Dwight se acerca: "Yo seré tu supervisor. Cualquier pregunta técnica, me la haces a MÍ, no a Jim. Jim no sabe ni encender su computadora."
Jim, desde su escritorio: "...Es verdad. Pero sé apagarla cuando Dwight está hablando."
Pam te sonríe desde recepción: "Bienvenido. Si necesitas algo, aquí estoy. Y no le hagas caso a ninguno de los dos."`,
        storyArc: 'La Batalla por Scranton: 90 Días para Salvar la Sucursal',
        storyChapters: {
            prologue: 'Llegada a Dunder Mifflin (Misiones 0A-0)',
            act1: 'Los Primeros Datos (Misiones 1-1B)',
            act2: 'Las Métricas que Importan (Misiones 2-3)',
            climax: 'Crisis y Resolución (Misiones 4-5)',
            epilogue: 'Scranton Salvada'
        },
        storyTimeline: [
            { mission: 'office-0a', day: 'Día 1 - Mañana', event: 'Recibes el correo de bienvenida' },
            { mission: 'office-0b', day: 'Día 1 - Tarde', event: 'Pam te muestra tu escritorio y Power BI' },
            { mission: 'office-0', day: 'Día 2', event: 'Michael te da un tour de la herramienta' },
            { mission: 'office-1', day: 'Semana 1', event: 'Tu primer encargo real: importar ventas históricas' },
            { mission: 'office-1b', day: 'Semana 2', event: 'Toby descubre un archivo contable corrupto' },
            { mission: 'office-2', day: 'Semana 3', event: 'Noche de los Dundies: Michael pide métricas' },
            { mission: 'office-3', day: 'Semana 5', event: 'La guerra de ventas entre Dwight y Jim escala' },
            { mission: 'office-4', day: 'Semana 7', event: 'Stamford cierra y llegan nuevos empleados' },
            { mission: 'office-5', day: 'Día 89', event: 'Crisis del Billete Dorado — presentación a Wallace' }
        ],
        scoringProfile: 'office-standard',
        epilogue: `🎉 DÍA 90 — LA PRESENTACIÓN A CORPORATE

La sala de conferencias está llena. David Wallace en videoconferencia. Jan Levinson de brazos cruzados. Michael sudando.

Pero cuando abres el dashboard de Power BI en la pantalla grande... silencio.

Los gráficos cuentan la historia: ventas por vendedor, tendencias mensuales, análisis de rentabilidad por producto, el impacto real del Billete Dorado, la fusión exitosa con Stamford. Todo interactivo, todo en tiempo real.

David Wallace: "...Esto es exactamente lo que necesitábamos. Michael, ¿de dónde sacaste a este analista?"
Michael: "¡Los mejores! Solo contrato a los mejores. Fue mi idea traerlo. De nada."

Dwight se levanta: "Para que conste, yo supervisé TODO el proceso. Como Asistente del Gerente Regional, doy fe de la calidad de estos datos."
Jim, mirando a la cámara: "...Yo no hice nada. Pero me alegra estar aquí."
Pam te sonríe y levanta un dibujo: es TÚ, sentado frente a Power BI, con una capa de superhéroe de datos.

📊 RESULTADO OFICIAL:
✅ Scranton declarada SUCURSAL MÁS EFICIENTE de Dunder Mifflin
✅ Presupuesto aprobado para 2 años más
✅ Michael nominado a "Gerente Regional del Trimestre" (se le cae una lágrima)

Kevin se acerca con un plato de su famoso chili: "Oye... ¿me puedes enseñar a hacer eso de los gráficos? Quiero uno de mis M&Ms."

Toby, desde la esquina: "Gracias por limpiar mis archivos. Nadie me había ayudado antes."

Michael agarra el micrófono una última vez:
"Ya sabes lo que dicen sobre los datos bien analizados..."
*pausa dramática*
"...THAT'S WHAT SHE SAID."

🏆 Has completado Dunder Mifflin Paper Co.
Habilidades desbloqueadas: Importación, Limpieza, DAX, CALCULATE, Fusión, Análisis What-If
Próximo mundo disponible: DataRescue HQ — La Rebelión de la Base Corrupta`,

        // Estadísticas narrativas del mundo
        worldStats: {
            totalMissions: 9,
            totalEstimatedHours: '4-6 horas',
            narrativeTheme: 'Comedia corporativa con corazón',
            mainConflict: 'Salvar Scranton del cierre con datos',
            characterArcs: {
                michael: 'De escéptico de datos a fan #1 de Power BI',
                dwight: 'De competidor a mentor técnico involuntario',
                jim: 'De desinteresado a aliado silencioso',
                pam: 'De recepcionista a refuerzo emocional constante',
                toby: 'El héroe inesperado de la limpieza de datos'
            }
        },

        skillsLearned: [
            // Habilidades de Zona Segura (Onboarding)
            { id: 'pbi-awareness', name: 'Conocimiento de Power BI', icon: '💡', description: 'Saber qué es Power BI y para qué sirve', phase: 'onboarding' },
            { id: 'pbi-navigation', name: 'Navegación Básica', icon: '🧭', description: 'Abrir el programa y encontrar elementos principales', phase: 'onboarding' },
            // Habilidades Fundamentales
            { id: 'pbi-interface', name: 'Interfaz de Power BI', icon: '🖥️', description: 'Conocer las 3 vistas y paneles principales', phase: 'fundamentals' },
            { id: 'data-import', name: 'Importación de Datos', icon: '📥', description: 'Cargar datos desde Excel/CSV a Power BI', phase: 'fundamentals' },
            { id: 'data-cleaning', name: 'Limpieza de Datos', icon: '🧹', description: 'Text.Proper, formatos de fecha, normalización', phase: 'fundamentals' },
            // Habilidades DAX
            { id: 'dax-sum-avg', name: 'SUM y AVERAGE', icon: '➕', description: 'Agregaciones básicas con DAX', phase: 'dax-basics' },
            { id: 'dax-calculate', name: 'CALCULATE con Filtros', icon: '🔮', description: 'La función más poderosa de DAX', phase: 'dax-intermediate' },
            { id: 'dax-distinctcount', name: 'DISTINCTCOUNT', icon: '🎯', description: 'Contar valores únicos', phase: 'dax-intermediate' },
            // Habilidades de Análisis
            { id: 'profitability', name: 'Análisis de Rentabilidad', icon: '📊', description: 'Márgenes, variables (VAR), impacto de descuentos', phase: 'analysis' }
        ],

        // Mapa de progresión de habilidades (Neurociencia: Andamiaje)
        skillProgressionMap: {
            'office-0a': ['pbi-awareness'],
            'office-0b': ['pbi-navigation'],
            'office-0': ['pbi-interface'],
            'office-1': ['data-import'],
            'office-1b': ['data-cleaning'],
            'office-2': ['dax-sum-avg'],
            'office-3': ['dax-calculate'],
            'office-4': ['dax-distinctcount'],
            'office-5': ['profitability']
        },

        perfectRunBonus: 300,

        // =============================================
        // SISTEMA DE RUTAS ADAPTATIVAS (Basado en diagnóstico)
        // =============================================
        adaptiveRoutes: {
            default: ['office-0a', 'office-0b', 'office-0', 'office-1', 'office-1b', 'office-2', 'office-3', 'office-4', 'office-5'],
            skipForBasic: ['office-0a'],
            skipForIntermediate: ['office-0a', 'office-0b', 'office-0']
        },

        missions: [
            // =============================================
            // FASE 1: ZONA DE SEGURIDAD (Neurociencia: Amígdala relajada)
            // El cerebro aprende mejor cuando se siente seguro
            // =============================================

            // MISIÓN 0A: EL CORREO DE BIENVENIDA (Carga cognitiva MÍNIMA)
            {
                id: 'office-0a',
                title: 'El Correo de Bienvenida',
                chapter: -2,
                level: 1,
                requires: [],
                xp: 15,
                coins: 10,
                missionType: 'tutorial',
                isOnboarding: true,
                estimatedMinutes: 3,
                description: '¿Qué es Power BI? Una introducción de 60 segundos.',
                storyContext: 'Acabas de ser contratado como analista de datos en Dunder Mifflin, una empresa de papel en Scranton, Pennsylvania. Aún no has conocido a nadie en persona, pero Michael Scott (tu nuevo jefe) ya te ha enviado 4 emails con GIFs motivacionales y uno importante: un PDF sobre tu herramienta de trabajo. Corporate (David Wallace) exige que la sucursal digitalice sus reportes en 90 días o cerrará. Tú eres la última contratación antes de que congelen el presupuesto.',
                episodeReference: 'S01E01 - Pilot (Tu primer día en Dunder Mifflin)',
                storyStakes: 'Si no aprendes la herramienta, no podrás ayudar a salvar la sucursal. Pero tranquilo, hoy solo lees.',
                previousMissionRecap: null,
                introNarrative: `📧 *Tienes 5 correos nuevos*

📩 De: Michael Scott (mscott@dundermifflin.com)
Asunto: !!!!!!BIENVENIDO!!!!!! (reenviado 3 veces)
"No sé cómo funciona el correo pero BIENVENIDO."

📩 De: Dwight Schrute (dschrute@dundermifflin.com)
Asunto: PROTOCOLO DE SEGURIDAD - LEER INMEDIATAMENTE
"Como Asistente del Gerente Regional, te informo que tu acceso al edificio es provisional. Serás evaluado."

📩 De: Jim Halpert (jhalpert@dundermifflin.com)
Asunto: Re: Hola!
"Ignora el email de Dwight. Bienvenido. El café está a la izquierda."

📩 De: Pam Beesly (pbeesly@dundermifflin.com)
Asunto: Documentos de bienvenida
"Hola! Te adjunto el manual y una guía sobre Power BI. Si tienes preguntas, mi extensión es 100. ¡Bienvenido/a!"

⭐ De: David Wallace (dwallace@dundermifflin.com)
Asunto: RE: Nuevo analista de datos - Scranton
"Bienvenido a Dunder Mifflin. Esperamos grandes cosas de este rol. La sucursal de Scranton necesita modernizar sus reportes urgentemente. Confío en que serás parte de la solución.
— David Wallace, CFO"

📎 Adjunto: "Qué_es_Power_BI.pdf" (de Pam)
Lee el documento adjunto para conocer tu nueva herramienta de trabajo...`,
                outroNarrative: `✅ ¡Excelente! Ya sabes qué es Power BI.

Tu teléfono suena. Es un mensaje de Pam:
"¿Ya leíste el PDF? Genial. Mañana ven temprano, te voy a mostrar el programa en tu computadora. Ya lo instalé ayer por ti. 😊"

Michael aparece detrás de ti en el pasillo: "¿Ya terminaste de leer? ¡Perfecto! Mañana es el día REAL. ¡Prepara tu cerebro para datos INCREÍBLES!... o algo así."

*Te vas a casa sabiendo que mañana empieza de verdad. Pero al menos ya sabes qué herramienta usarás.*`,

                // SIN DATOS - Solo lectura
                datasets: [],
                skillsDemo: [],
                wrongAnswerPenalty: 0, // Sin penalización en onboarding

                // Campos pedagógicos (Carga cognitiva: BAJA)
                learningObjectives: [
                    'Saber qué es Power BI en una oración',
                    'Conocer que es GRATIS',
                    'Entender que sirve para crear gráficos'
                ],
                prerequisiteKnowledge: [],
                maxConceptsIntroduced: 3, // Límite de carga cognitiva

                realWorldAnalogy: '📱 Power BI es como Instagram para datos: conviertes información aburrida en gráficos bonitos que cuentan una historia. Gratis y fácil de usar.',

                conceptBreakdown: [
                    {
                        concept: '¿Qué es Power BI?',
                        explanation: 'Es un programa GRATUITO de Microsoft para hacer gráficos interactivos. Imagina un Excel con superpoderes para crear dashboards profesionales.',
                        emoji: '💡',
                        analogy: 'Como Instagram transforma fotos, Power BI transforma números en historias visuales.'
                    },
                    {
                        concept: '¿Para qué sirve?',
                        explanation: 'Para responder preguntas con datos: ¿Quién vendió más? ¿Cuándo vendemos más? ¿Por qué bajaron las ventas? Power BI te ayuda a ver las respuestas.',
                        emoji: '🎯',
                        analogy: 'Es como tener un detective de datos que encuentra patrones ocultos.'
                    },
                    {
                        concept: '¿Es difícil?',
                        explanation: 'NO. Si sabes arrastrar y soltar, ya sabes el 80% de Power BI. Este juego te enseñará el resto paso a paso.',
                        emoji: '🎮',
                        analogy: 'Si puedes organizar apps en tu teléfono, puedes usar Power BI.'
                    }
                ],

                // Lectura guiada (sin práctica)
                objectives: [
                    'Leer qué es Power BI (60 segundos)',
                    'Responder 2 preguntas simples de comprensión'
                ],
                guide: [
                    '📖 PASO 1: Lee los 3 conceptos de arriba. No te apures, tómate 1 minuto.',
                    '🧠 PASO 2: Piensa en algo que te gustaría visualizar (ventas, gastos, notas, lo que sea).',
                    '✅ PASO 3: Responde las preguntas de verificación abajo.'
                ],

                // Banner de lectura obligatoria antes de responder
                readFirstMessage: 'Las respuestas están en los 3 conceptos de arriba ("¿Qué es Power BI?", "¿Para qué sirve?" y "¿Es difícil?"). ¡Léelos con calma antes de responder!',

                // Verificación ULTRA simple - con opciones claras
                verification: [
                    {
                        question: "¿Power BI es gratuito?",
                        type: "choice",
                        options: ["Sí, es gratis", "No, cuesta $500"],
                        answer: "Sí, es gratis",
                        hint: "Lee el primer concepto: '¿Qué es Power BI?' — dice que es GRATUITO.",
                        academyHint: "Revisa la sección '¿Qué es Power BI?' arriba."
                    },
                    {
                        question: "¿Qué puedes crear con Power BI?",
                        type: "choice",
                        options: ["Gráficos y dashboards", "Películas", "Videojuegos"],
                        answer: "Gráficos y dashboards",
                        hint: "Lee el concepto '¿Para qué sirve?' — Power BI ayuda a VER respuestas con datos.",
                        academyHint: "Revisa la sección '¿Para qué sirve?' arriba."
                    },
                    {
                        question: "¿Quién creó Power BI?",
                        type: "choice",
                        options: ["Microsoft", "Google", "Apple"],
                        answer: "Microsoft",
                        hint: "En el primer concepto dice que es un programa de Microsoft.",
                        academyHint: "Revisa la sección '¿Qué es Power BI?' arriba."
                    },
                    {
                        question: "¿Power BI es más fácil o más difícil que Excel para gráficos?",
                        type: "choice",
                        options: ["Más fácil para gráficos", "Más difícil", "Igual de complicado"],
                        answer: "Más fácil para gráficos",
                        hint: "Lee '¿Es difícil?' — dice que si sabes arrastrar y soltar, ya sabes el 80%.",
                        academyHint: "Revisa la sección '¿Es difícil?' arriba."
                    }
                ],

                // ========== CONTENIDO PREMIUM MISIÓN 0A ==========
                premiumTips: {
                    concept: [
                        {
                            title: '¿Power BI vs Excel?',
                            content: 'Excel: Hojas de cálculo, fórmulas, tablas.\nPower BI: Dashboards interactivos, conexión a muchas fuentes, actualización automática.\n\nNo compiten, se complementan. Muchos usan Excel para preparar datos y Power BI para visualizar.',
                            difficulty: 'beginner'
                        },
                        {
                            title: '¿Qué es un Dashboard?',
                            content: 'Es una pantalla con varios gráficos que muestran información importante de un vistazo. Como el tablero de un auto: velocidad, gasolina, temperatura... todo en un lugar.',
                            difficulty: 'beginner'
                        }
                    ],
                    realWorld: [
                        {
                            title: '¿Quién usa Power BI?',
                            content: '🏢 Empresas grandes: Coca-Cola, Walmart, bancos\n💼 Pequeños negocios: para ver ventas diarias\n🏫 Estudiantes: para proyectos y tesis\n📊 Cualquiera que tenga datos y quiera entenderlos',
                            difficulty: 'beginner'
                        }
                    ]
                },

                // ============ NEUROCIENCIA: Misión 0A ============
                neuroLearning: {
                    cognitiveLoad: 'low',
                    techniquesSummary: 'Priming → Lectura activa → Recall — tu primer contacto con Power BI',
                    scienceFact: 'El "efecto de generación" (Slamecka & Graf, 1978) demuestra que intentar recordar algo ANTES de aprenderlo mejora la retención hasta un 40%. Por eso te pedimos que pienses primero.',

                    priming: {
                        questions: [
                            {
                                question: '¿Has usado algún programa para hacer gráficos? (Excel, Google Sheets, cualquiera)',
                                placeholder: 'Escribe lo que recuerdas...',
                                insight: 'Si usaste Excel, Power BI es como un Excel con superpoderes para gráficos. Si no, no pasa nada — Power BI es más intuitivo que Excel para visualización.'
                            },
                            {
                                question: '¿Qué tipo de datos te gustaría analizar algún día? (ventas, deportes, gastos personales...)',
                                placeholder: 'Cualquier idea funciona...',
                                insight: '¡Genial! Power BI puede analizar TODO eso. Pronto crearás dashboards sobre cualquier tema que te interese.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '💡',
                            title: '¿Qué es Power BI?',
                            content: 'Un programa GRATIS de Microsoft. Convierte datos aburridos en gráficos interactivos. Piensa: Instagram para números.',
                            visualHint: 'Imagina una hoja de Excel... ahora imagina que los datos se transforman solos en gráficos bonitos con un click.',
                            analogy: 'Es como un filtro de Instagram: tomas datos "crudos" y los conviertes en algo que se entiende de un vistazo.'
                        },
                        {
                            emoji: '🎯',
                            title: '¿Para qué sirve?',
                            content: 'Para responder PREGUNTAS con datos: ¿Quién vendió más? ¿Cuándo vendemos más? ¿Por qué bajaron las ventas? Los gráficos te dan la respuesta visual.',
                            visualHint: 'Piensa en un detective: los datos son las pistas, los gráficos son la evidencia visual.',
                            analogy: 'Como Google Maps convierte coordenadas en mapas útiles, Power BI convierte números en historias visuales.'
                        },
                        {
                            emoji: '🎮',
                            title: '¿Es difícil?',
                            content: 'NO. Si sabes arrastrar y soltar cosas con el mouse, ya sabes el 80% de Power BI. Este juego te enseñará el resto paso a paso.',
                            analogy: 'Si puedes organizar apps en tu teléfono arrastrándolas, puedes usar Power BI.'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: '¿Power BI es gratis o de pago?',
                            answer: 'Es GRATIS (Power BI Desktop). Hay una versión Pro de pago, pero la versión gratuita es más que suficiente para aprender.',
                            explanation: 'Microsoft lo ofrece gratis para que más personas aprendan análisis de datos.'
                        },
                        {
                            question: '¿Qué empresa creó Power BI?',
                            answer: 'Microsoft — la misma empresa que hace Excel, Word y Windows.',
                            explanation: 'Power BI se integra naturalmente con Excel, lo que lo hace muy potente.'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué crees que los gráficos son mejores que las tablas de números para entender datos?',
                            expertAnswer: 'El cerebro humano procesa imágenes 60,000 veces más rápido que texto (MIT, 2014). Un gráfico de barras te muestra inmediatamente quién vendió más; una tabla de 100 filas requiere que leas número por número. Power BI aprovecha esta ventaja visual.'
                        }
                    ]
                },

                // Recompensa emocional
                completionMessage: {
                    character: 'michael',
                    message: '"¡Ya eres un 1% experto en Power BI! Solo quedan 99% más. Pan comido." — Michael',
                    badge: 'power-bi-aware',
                    badgeName: 'Conocedor de Power BI'
                },

                nextMissionTeaser: '🔜 Siguiente: ¡Vamos a abrir Power BI por primera vez!',
            },

            // MISIÓN 0B: TU ESCRITORIO VIRTUAL (Primera interacción con el software)
            {
                id: 'office-0b',
                title: 'Tu Escritorio Virtual',
                chapter: -1,
                level: 1,
                requires: ['office-0a'],
                xp: 25,
                coins: 15,
                missionType: 'tutorial',
                isOnboarding: true,
                estimatedMinutes: 5,
                description: 'Abre Power BI y encuentra 3 cosas. ¡Sin presión, solo explora!',
                storyContext: 'Es tu segundo día. Llegas a la oficina y Pam ya dejó un post-it en tu monitor: "Power BI Desktop → ícono amarillo 📊". Tu escritorio está junto al de Dwight (que ya puso cinta amarilla delimitando "su territorio"). Jim está enfrente y te lanza una bola de papel como saludo. Michael aún no ha llegado, así que es el momento perfecto para explorar tu herramienta en paz.',
                episodeReference: 'S01E02 - Diversity Day (Segundo día, aún conociendo la oficina)',
                storyStakes: 'Necesitas familiarizarte con Power BI antes de que Michael te pida "hacer magia" con los números esta semana.',
                previousMissionRecap: 'Ayer leíste el email de bienvenida y descubriste que Power BI es una herramienta gratuita para crear dashboards. Hoy la abrirás por primera vez.',
                introNarrative: `🖥️ Llegas a tu escritorio. El monitor ya está encendido.

Pam se acerca con un café:
"Buenos días. Te dejé el café que todos tomamos aquí... bueno, el que queda después de que Michael se lleva 3 tazas.

El programa que necesitas se llama Power BI Desktop. Tiene un ícono amarillo con un gráfico. Lo instalé ayer en tu computadora."

Dwight interrumpe desde su escritorio: "FACT: Power BI Desktop usa aproximadamente 500MB de RAM. Mi computadora tiene 16GB. ¿Cuántos tiene la tuya? Porque si se congela, NO es mi problema."

Jim: "*mira a la cámara*... Solo abre el programa. Ignora los datos de RAM de Dwight."

Pam: "No te preocupes por hacer nada todavía. Solo ábrelo y familiarízate con la pantalla. Yo estaré en recepción si necesitas algo."

*Pam vuelve a su puesto pero te mira de vez en cuando para asegurarse de que estés bien*`,
                outroNarrative: `🎉 ¡Lo lograste! Ya conoces la ventana principal de Power BI.

Pam aplaude suavemente desde recepción: "¡Muy bien! ¿Ves? No era tan intimidante."

Jim pasa caminando y te da un pulgar arriba: "Yo la primera vez que lo abrí pensé que era una hoja de cálculo rota. Vas mejor que yo."

Dwight, sin levantar la vista de su monitor: "Has completado el paso 1 de 47 de mi programa de entrenamiento. No te emociones."

De repente, Michael sale de su oficina con una sonrisa enorme:
"¡Hey! ¿Ya abriste el Power BI? ¡GE-NIAL! Mañana te voy a dar un tour PERSONAL de todas las vistas. Prepare una presentación."

Jim susurra: "No la preparó. Pero será entretenido."

*Te vas a casa con la confianza de que ya puedes encontrar las cosas básicas en Power BI.*`,

                datasets: [],
                skillsDemo: ['pbi-interface'],
                wrongAnswerPenalty: 0,

                learningObjectives: [
                    'Abrir Power BI Desktop correctamente',
                    'Identificar que hay una barra lateral izquierda',
                    'Notar que hay paneles a la derecha',
                    'Sentirse cómodo con la ventana del programa'
                ],
                prerequisiteKnowledge: [
                    'Haber completado "El Correo de Bienvenida"',
                    'Tener Power BI Desktop instalado'
                ],

                realWorldAnalogy: '🏠 Es como cuando entras a una casa nueva: primero caminas por las habitaciones para saber dónde está todo. No empiezas a cocinar sin saber dónde está la cocina.',

                conceptBreakdown: [
                    {
                        concept: 'La Barra Lateral Izquierda',
                        explanation: 'Son 3 íconos que cambian entre diferentes "vistas" del programa. Por ahora solo obsérvalos.',
                        emoji: '📍',
                        visualHint: 'Busca 3 íconos pequeños apilados verticalmente'
                    },
                    {
                        concept: 'El Lienzo Central',
                        explanation: 'Es el área grande en blanco donde arrastrarás tus gráficos. Por ahora está vacío, ¡pero pronto lo llenarás!',
                        emoji: '🎨',
                        visualHint: 'El espacio grande vacío en el centro'
                    },
                    {
                        concept: 'Los Paneles de la Derecha',
                        explanation: 'Aquí aparecerán herramientas y opciones. "Visualizaciones" tiene tipos de gráficos. "Campos" mostrará tus datos.',
                        emoji: '🔧',
                        visualHint: 'Paneles colapsables a la derecha de la pantalla'
                    }
                ],

                objectives: [
                    'Abrir Power BI Desktop',
                    'Identificar la barra lateral izquierda (3 íconos)',
                    'Identificar el lienzo central (área vacía grande)',
                    'Identificar los paneles de la derecha'
                ],

                guide: [
                    '🔍 PASO 1: Busca "Power BI Desktop" en el menú inicio de Windows (tecla Windows + escribe "Power BI").',
                    '⏳ PASO 2: Haz doble click para abrirlo. Puede tardar 30-60 segundos la primera vez. ¡Paciencia!',
                    '👀 PASO 3: Cuando se abra, puede aparecer una ventana de "Introducción". Puedes cerrarla con la X.',
                    '📍 PASO 4: Mira el BORDE IZQUIERDO. ¿Ves 3 íconos pequeños apilados? Esos son las 3 vistas.',
                    '🎨 PASO 5: Mira el CENTRO. Es un área grande mayormente vacía. Ese es tu lienzo.',
                    '🔧 PASO 6: Mira el BORDE DERECHO. Hay paneles con nombres como "Visualizaciones" y "Campos".',
                    '✅ PASO 7: ¡Listo! No hagas nada más, solo confirma que pudiste ver todo.'
                ],

                checkpoints: [
                    {
                        afterStep: 2,
                        question: '¿Se abrió la ventana de Power BI Desktop?',
                        successMessage: '¡Genial! El programa está funcionando correctamente.',
                        failureHint: 'Si no se abre, verifica que esté instalado. Descárgalo gratis de: https://powerbi.microsoft.com/desktop',
                        character: 'pam'
                    },
                    {
                        afterStep: 4,
                        question: '¿Puedes ver los 3 íconos en la barra lateral izquierda?',
                        successMessage: '¡Perfecto! Esos íconos son muy importantes, los usarás mucho.',
                        failureHint: 'Mira el borde izquierdo, justo al lado del lienzo. Son íconos pequeños y sutiles.',
                        character: 'jim'
                    }
                ],

                tips: [
                    '💡 Si Power BI tarda en abrir, es completamente normal la primera vez.',
                    '🖥️ Maximiza la ventana para ver mejor todos los elementos.',
                    '🔄 Si algo se ve raro, puedes cerrar y volver a abrir sin problema.'
                ],

                // Banner de lectura
                readFirstMessage: 'Sigue los 7 pasos de la guía de arriba primero. Las respuestas se basan en lo que ves al abrir Power BI Desktop. Lee los conceptos "La Barra Lateral Izquierda", "El Lienzo Central" y "Los Paneles de la Derecha".',

                verification: [
                    {
                        question: "¿Cuántos íconos pequeños hay en la barra lateral IZQUIERDA?",
                        type: "number",
                        answer: 3,
                        hint: "Mira el borde IZQUIERDO de Power BI. Hay 3 íconos apilados: Informe, Datos y Modelo.",
                        academyHint: "Lee el concepto 'La Barra Lateral Izquierda' arriba — menciona 3 íconos."
                    },
                    {
                        question: "¿Ves un panel llamado 'Visualizaciones' a la derecha?",
                        type: "choice",
                        options: ["Sí, lo veo", "No lo encuentro"],
                        answer: "Sí, lo veo",
                        hint: "Mira el lado derecho de la ventana. Si no lo ves, ve a Menú Vista y activa 'Visualizaciones'.",
                        academyHint: "Lee el concepto 'Los Paneles de la Derecha' arriba."
                    },
                    {
                        question: "¿El primer ícono de la izquierda parece un gráfico de barras?",
                        type: "choice",
                        options: ["Sí, es un gráfico", "No, es otra cosa"],
                        answer: "Sí, es un gráfico",
                        hint: "Ese primer ícono es la Vista de Informe — el lugar donde crearás tus dashboards.",
                        academyHint: "Lee 'La Barra Lateral Izquierda' — el primer ícono tiene forma de gráfico."
                    },
                    {
                        question: "¿El área central está mayormente vacía (sin gráficos)?",
                        type: "choice",
                        options: ["Sí, está vacía", "No, tiene cosas"],
                        answer: "Sí, está vacía",
                        hint: "Cuando abres Power BI sin datos, el lienzo central está en blanco esperando tus creaciones.",
                        academyHint: "Lee 'El Lienzo Central' — explica que el área grande está vacía al inicio."
                    }
                ],

                // ========== CONTENIDO PREMIUM MISIÓN 0B ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'Las 3 Vistas de Power BI',
                            content: '📊 INFORME (primer ícono): Donde creas dashboards bonitos\\n📋 DATOS (segundo ícono): Ves tus tablas como en Excel\\n🔗 MODELO (tercer ícono): Conectas tablas entre sí\\n\\nEl 90% del tiempo estarás en la Vista Informe.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Panel de Visualizaciones',
                            content: '🎨 Este panel tiene todos los tipos de gráficos disponibles: barras, líneas, tortas, mapas, tablas...\\nSolo arrastra uno al lienzo para empezar a crear.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Panel de Campos',
                            content: '📁 Aquí aparecerán tus datos cuando los importes. Verás tablas y columnas que podrás arrastrar a tus gráficos.',
                            difficulty: 'beginner'
                        }
                    ],
                    interface: [
                        {
                            title: 'La Cinta Superior (Ribbon)',
                            content: '🎀 Arriba hay pestañas como en Word: Inicio, Insertar, Modelado, Vista...\\nNo te abrumes, irás aprendiendo cada una.',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Power BI no abre',
                            content: '❌ Posibles soluciones:\\n1. Espera 1-2 minutos (primera vez es lenta)\\n2. Reinicia tu computadora\\n3. Verifica que sea "Power BI Desktop" no "Power BI Service"\\n4. Descarga de nuevo desde powerbi.microsoft.com',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Los paneles no se ven',
                            content: '👁️ Si los paneles de la derecha desaparecieron:\\nMenú Vista > Marca "Campos" y "Visualizaciones"',
                            difficulty: 'beginner'
                        }
                    ]
                },

                // ============ NEUROCIENCIA: Misión 0B ============
                neuroLearning: {
                    cognitiveLoad: 'low',
                    techniquesSummary: 'Priming visual → Chunking 3 zonas → Recall — tu primera exploración visual',
                    scienceFact: 'El "chunking" (Miller, 1956) demuestra que la memoria de trabajo retiene 4±1 elementos. Por eso dividimos la interfaz en exactamente 3 zonas: izquierda, centro y derecha.',

                    priming: {
                        questions: [
                            {
                                question: '¿Has abierto algún programa nuevo y te has sentido perdido al principio? (Word, Photoshop, cualquiera)',
                                placeholder: 'Describe tu experiencia...',
                                insight: 'Es normal sentirse perdido al abrir un programa nuevo. La clave es identificar las "zonas" principales — Power BI tiene solo 3. Una vez las ubiques, todo encaja.'
                            },
                            {
                                question: '¿Qué es lo primero que buscas en un programa nuevo? (menús, botones, ayuda...)',
                                placeholder: 'No hay respuesta incorrecta...',
                                insight: 'Excelente instinto. En Power BI, lo más importante al inicio es ubicar: 1) Los 3 íconos de la izquierda, 2) El lienzo central, 3) Los paneles de la derecha.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '📍',
                            title: 'ZONA 1: Barra Lateral Izquierda',
                            content: '3 íconos pequeños apilados verticalmente. Son tus "puertas" a 3 vistas diferentes: Informe (gráficos), Datos (tablas), Modelo (relaciones).',
                            visualHint: 'Imagina las puertas de un apartamento: cocina, sala, dormitorio. Cada ícono abre una "habitación" diferente del programa.',
                            analogy: 'Como los botones del elevador: cada uno te lleva a un piso diferente del edificio.'
                        },
                        {
                            emoji: '🎨',
                            title: 'ZONA 2: Lienzo Central',
                            content: 'El área grande y vacía en el centro. Aquí es donde arrastrarás gráficos para crear tu dashboard. Ahora está vacío, ¡pero pronto estará lleno de visualizaciones!',
                            visualHint: 'Es como una mesa de trabajo limpia esperando que pongas tus herramientas.',
                            analogy: 'Como un lienzo en blanco de un pintor — los gráficos son tu arte de datos.'
                        },
                        {
                            emoji: '🔧',
                            title: 'ZONA 3: Paneles de la Derecha',
                            content: 'Dos paneles clave: "Visualizaciones" (tipos de gráficos disponibles) y "Campos" (tus datos). Son tu caja de herramientas.',
                            visualHint: 'El panel superior tiene iconos de distintos gráficos. El inferior mostrará tus tablas cuando importes datos.',
                            analogy: 'Como la paleta de colores y los pinceles de un artista — herramientas organizadas a tu alcance.'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: 'Sin mirar arriba: ¿Cuántos íconos hay en la barra lateral izquierda?',
                            answer: '3 íconos — Informe, Datos, Modelo',
                            explanation: 'Recordar números pequeños es fácil. Tu cerebro acaba de crear una "etiqueta" para esta información.'
                        },
                        {
                            question: '¿Qué hay en la zona derecha de Power BI? Nombra los 2 paneles.',
                            answer: 'Visualizaciones (tipos de gráficos) y Campos (tus datos/columnas)',
                            explanation: 'Estos dos paneles son tu "caja de herramientas". Los usarás en CADA misión futura.'
                        },
                        {
                            question: '¿Cómo se llama el área grande vacía del centro?',
                            answer: 'El Lienzo (o Canvas). Es donde creas tus dashboards.',
                            explanation: 'Todo gráfico que crees se arrastrará aquí. Por ahora está vacío, pero pronto lo llenarás.'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué crees que Power BI divide la pantalla en 3 zonas (izquierda, centro, derecha) en lugar de poner todo en un solo menú?',
                            expertAnswer: 'Es un principio de diseño UX llamado "progressive disclosure" (revelación progresiva). Al dividir en zonas, reduces la sobrecarga cognitiva: la izquierda es navegación, el centro es tu trabajo, y la derecha son herramientas. Así tu cerebro sabe instintivamente dónde buscar cada cosa.'
                        }
                    ]
                },

                completionMessage: {
                    character: 'pam',
                    message: '"¡Ya dominas lo básico de la interfaz! Sabía que lo lograrías." — Pam',
                    badge: 'pbi-explorer',
                    badgeName: 'Explorador de Power BI'
                },

                nextMissionTeaser: '🔜 Siguiente: Michael te dará un tour guiado por las 3 vistas principales.',
            },

            // =============================================
            // MISIÓN 0: TUTORIAL DE INTERFAZ (EXISTENTE - MEJORADA)
            // =============================================
            {
                id: 'office-0',
                title: 'Tu Primer Día en la Oficina',
                chapter: 0,
                level: 1,
                requires: ['office-0b'],
                xp: 50,
                coins: 25,
                missionType: 'tutorial',
                estimatedMinutes: 10,
                description: 'Antes de analizar datos, conoce tu nueva herramienta de trabajo.',
                storyContext: 'Es tu tercer día y Michael ha cumplido su promesa: hoy te da un "tour ejecutivo" de Power BI. Bueno, él no sabe mucho del programa, pero Ryan le hizo una hoja de trucos que Michael lee mientras finge que lo sabe todo. Dwight interrumpe constantemente con datos técnicos que nadie le pidió. Jim te hace señas de que estés tranquilo. Lo importante: hoy aprenderás a navegar las 3 vistas y los paneles principales.',
                episodeReference: 'S02E01 - The Dundies (Los personajes ya se sienten cómodos contigo)',
                storyStakes: 'David Wallace llamó ayer preguntando cómo va la digitalización. Michael le dijo que "va increíble", pero en realidad aún no has tocado datos. Hoy necesitas al menos dominar la interfaz.',
                previousMissionRecap: 'Ya sabes qué es Power BI (Misión 0A) y abriste el programa e identificaste las áreas principales (Misión 0B). Hoy profundizas en cada vista.',
                introNarrative: `🏢 Michael te espera en la sala de conferencias con el proyector encendido (al revés).

"Okay, okay, escucha. Hoy te voy a enseñar TODO sobre Power BI. Yo soy básicamente un experto." *Lee la hoja de trucos de Ryan por debajo de la mesa*

Dwight corrige: "Técnicamente, Power BI tiene 3 vistas principales. Informe, Datos y Modelo. La barra lateral izquierda—"

Michael: "¡Dwight! ¡Yo estoy haciendo el tour! Tú eres el asistente, no el guía."
Dwight: "Asistente del Gerente Regional."
Michael: "Asistente PARA el Gerente Regional."

Jim, desde la puerta: "Esto es entretenido, pero creo que lo mejor es que simplemente abras el programa y explores. Es más fácil de lo que parece."

Pam asiente: "Jim tiene razón. Las 3 vistas son como habitaciones diferentes de la misma casa. Tú solo camina por ellas."

*Michael voltea el proyector al derecho. Aparece el logo de Power BI.*
"AHORA sí. ¡Bienvenido al futuro de los datos de Scranton!"`,
                outroNarrative: `👍 ¡Perfecto! Ya conoces la interfaz completa de Power BI.

Michael cierra su "presentación" (eran 2 slides con clip art):
"¡Wow, ya sabes dónde está todo! Yo todavía no encuentro el botón de imprimir. Pero no importa, porque tú eres el experto ahora."

Dwight se acerca con expresión seria:
"Nada mal para un principiante. Pero conocer la interfaz es como saber dónde están las armas en un arsenal. Lo que importa es saber USARLAS. La próxima semana, cargarás datos reales."

Jim: "Lo que Dwight quiere decir, de manera muy dramática, es que la siguiente misión es importar un archivo de ventas. No es tan épico como él lo hace sonar."

*Sales de la sala. Kevin te detiene en el pasillo:*
"Hey... ¿ese Power BI puede hacer gráficos de cuántos M&Ms como por día? Pregunto por... ciencia."

📈 Próximamente: David Wallace envía el primer archivo de ventas real. Es hora de importar datos.`,
                skillsDemo: ['pbi-interface'],
                wrongAnswerPenalty: 0.01,

                // CAMPOS PEDAGÓGICOS NUEVOS
                learningObjectives: [
                    'Identificar las 3 vistas principales de Power BI',
                    'Localizar el panel de Campos',
                    'Localizar el panel de Visualizaciones',
                    'Entender la diferencia entre Informe, Datos y Modelo'
                ],
                prerequisiteKnowledge: [
                    'Saber abrir un programa en Windows',
                    'No se requiere conocimiento previo de Power BI'
                ],
                realWorldAnalogy: '🍳 Cuando usas una cocina nueva, primero ubicas dónde están los cubiertos, los platos y la estufa. No empiezas a cocinar sin saber dónde está todo. Power BI es tu "cocina de datos" - ¡vamos a conocerla!',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es Power BI?',
                        explanation: 'Es un programa gratuito de Microsoft para crear gráficos y reportes interactivos. Piensa en él como un "Excel con superpoderes" que hace gráficos automáticamente.',
                        emoji: '💡'
                    },
                    {
                        concept: '¿Qué son las 3 vistas?',
                        explanation: 'Son como 3 "habitaciones" diferentes del programa. Vista Informe (donde creas gráficos), Vista Datos (donde ves tablas como en Excel), y Vista Modelo (donde conectas tablas entre sí).',
                        emoji: '🏠'
                    },
                    {
                        concept: '¿Qué es el panel de Campos?',
                        explanation: 'Es la lista de todos los datos que has cargado. Cuando importes un archivo Excel, aquí aparecerán los nombres de las columnas.',
                        emoji: '📋'
                    }
                ],

                objectives: [
                    'Abrir Power BI Desktop',
                    'Identificar las 3 vistas: Informe, Datos, Modelo',
                    'Localizar el panel "Visualizaciones" a la derecha',
                    'Localizar el panel "Campos" a la derecha',
                    'Hacer click en cada vista y observar cómo cambia'
                ],
                datasets: [],
                guide: [
                    '🖥️ PASO 1: Busca el ícono de Power BI Desktop en tu escritorio o menú inicio. Es amarillo con un gráfico.',
                    '⏳ PASO 2: Haz doble click para abrirlo. La primera vez puede tardar un poco.',
                    '👀 PASO 3: Observa la pantalla. Hay una barra lateral IZQUIERDA con 3 íconos pequeños.',
                    '📊 PASO 4: El PRIMER ícono (gráfico) es la vista de INFORME. Aquí crearás tus dashboards.',
                    '📋 PASO 5: El SEGUNDO ícono (tabla) es la vista de DATOS. Aquí ves tablas como en Excel.',
                    '🔗 PASO 6: El TERCER ícono (cajitas conectadas) es la vista de MODELO. Aquí conectas tablas.',
                    '➡️ PASO 7: Mira a la DERECHA. El panel superior "Visualizaciones" tiene tipos de gráficos.',
                    '📁 PASO 8: Debajo está el panel "Campos". Cuando cargues datos, aparecerán aquí.',
                    '🎉 PASO 9: ¡Haz click en cada vista (izquierda) y observa cómo cambia la pantalla central!',
                    '✅ PASO 10: ¡Listo! Ya conoces tu nueva herramienta de trabajo.'
                ],
                checkpoints: [
                    {
                        afterStep: 3,
                        question: '¿Ves los 3 íconos en la barra lateral izquierda?',
                        successMessage: '¡Perfecto! Esos son los accesos a las 3 vistas principales.',
                        failureHint: 'Mira el borde izquierdo de la ventana. Deberían verse 3 íconos pequeños apilados verticalmente.'
                    },
                    {
                        afterStep: 7,
                        question: '¿Encontraste el panel de Visualizaciones a la derecha?',
                        successMessage: '¡Excelente! Ahí están todos los tipos de gráficos que podrás usar.',
                        failureHint: 'Mira el lado derecho de la ventana. Debería haber un panel con muchos íconos de gráficos.'
                    }
                ],
                tips: [
                    '💡 Si Power BI tarda en abrir, es normal la primera vez.',
                    '🖥️ Puedes maximizar la ventana para ver mejor todos los paneles.',
                    '📐 Los paneles de la derecha se pueden minimizar si necesitas más espacio.'
                ],

                // ========== CONTENIDO PREMIUM EXPANDIDO ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'Las 3 vistas explicadas',
                            content: '📊 INFORME: Donde creas dashboards bonitos. Es tu "lienzo artístico".\n📋 DATOS: Ves tus tablas como en Excel. Útil para revisar errores.\n🔗 MODELO: Ves las relaciones entre tablas. Avanzado, no te preocupes aún.',
                            difficulty: 'beginner'
                        },
                        {
                            title: '¿Por qué paneles a la derecha?',
                            content: 'Power BI organiza tu espacio de trabajo: el centro es para crear, la derecha es para configurar. Es como tener tu escritorio ordenado.',
                            difficulty: 'beginner'
                        }
                    ],
                    interface: [
                        {
                            title: 'Los íconos de las vistas',
                            content: '🔍 Primer ícono (gráfico de barras): Vista Informe\n🔍 Segundo ícono (tabla): Vista Datos\n🔍 Tercer ícono (cajitas conectadas): Vista Modelo',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Paneles colapsables',
                            content: 'Cada panel tiene una flecha pequeña. Click en ella para minimizar/maximizar. Útil cuando necesitas más espacio para tu gráfico.',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Cambiar vistas rápido',
                            content: 'Ctrl + 1 = Vista Informe\nCtrl + 2 = Vista Datos\nCtrl + 3 = Vista Modelo\n\n¡Aprende estos 3 y serás más rápido que Michael buscando su café!',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Power BI no abre',
                            content: 'Soluciones:\n1. Espera 30 segundos más (la primera vez es lenta)\n2. Reinicia tu computadora\n3. Verifica que sea "Power BI Desktop", NO "Power BI Service"',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'No veo los paneles de la derecha',
                            content: 'Menú Vista > Marca las opciones "Campos" y "Visualizaciones". A veces se ocultan accidentalmente.',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Personaliza tu espacio',
                            content: 'Puedes arrastrar los bordes de los paneles para hacerlos más grandes o pequeños. Encuentra el tamaño que te sea cómodo.',
                            difficulty: 'intermediate'
                        }
                    ],
                    realWorld: [
                        {
                            title: '¿Cuándo usarás cada vista?',
                            content: '📊 Vista Informe: 80% del tiempo - Aquí construyes dashboards\n📋 Vista Datos: 15% - Cuando algo no cuadra y necesitas revisar\n🔗 Vista Modelo: 5% - Cuando conectas múltiples tablas',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué es importante conocer la interfaz?',
                    reason: 'Los primeros 5 minutos con cualquier herramienta definen si te sentirás cómodo o perdido. Conocer dónde está cada cosa elimina la frustración y te permite concentrarte en lo importante: los datos.',
                    careerConnection: 'En entrevistas de trabajo, te pedirán crear algo rápido. Si conoces bien la interfaz, no perderás tiempo buscando botones.',
                    realExample: 'Imagina cocinar en una cocina nueva sin saber dónde están los cuchillos. Perderías 10 minutos solo buscando. Aquí es igual.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo cambiar entre las 3 vistas sin dudar?',
                        criteria: 'Si tardas más de 2 segundos en encontrar los íconos, practica más.',
                        action: 'Practica: Haz click en cada vista 3 veces seguidas.'
                    },
                    {
                        question: '¿Sé qué hace cada panel de la derecha?',
                        criteria: 'Deberías poder decir: "Visualizaciones = tipos de gráficos, Campos = mis datos"',
                        action: 'Si dudas, relee la sección de conceptos arriba.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'El lienzo central grande y blanco - aquí arrastrarás gráficos',
                    leftBar: 'Barra vertical izquierda con 3 íconos = 3 vistas diferentes',
                    rightPanels: 'Panel Visualizaciones (arriba) + Panel Campos (abajo) = tu caja de herramientas',
                    topRibbon: 'Menú superior con opciones como "Obtener datos", "Publicar", etc.'
                },

                expectedOutcome: 'Familiarización completa con la interfaz de Power BI. ¡Ahora estás listo para cargar datos!',

                // ============ NEUROCIENCIA: Misión 0 ============
                neuroLearning: {
                    cognitiveLoad: 'low',
                    techniquesSummary: 'Interleaving (repaso misiones previas) → Chunking profundo → Elaboración → Recall',
                    scienceFact: 'El "interleaving" (Rohrer & Taylor, 2007) — mezclar repaso de conceptos previos con nuevos — mejora la retención un 43% comparado con estudiar solo lo nuevo. Por eso empezamos con preguntas de misiones anteriores.',

                    priming: {
                        questions: [
                            {
                                question: '¿Recuerdas las 3 zonas de Power BI que viste ayer? Nómbralas sin mirar.',
                                placeholder: 'Barra lateral... lienzo... paneles...',
                                insight: '¡Esto es interleaving! Repasar lo anterior fortalece las conexiones neuronales. Las 3 zonas son: barra lateral izquierda (navegación), lienzo central (trabajo) y paneles derechos (herramientas).'
                            },
                            {
                                question: 'Si tuvieras que explicarle a un compañero qué es Power BI en UNA frase, ¿qué dirías?',
                                placeholder: 'Power BI es...',
                                insight: 'Explicar en tus propias palabras es la técnica Feynman — si puedes explicarlo simple, lo has entendido de verdad.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '📊',
                            title: 'Vista INFORME — Tu lienzo artístico',
                            content: 'El primer ícono (gráfico de barras). Aquí creas dashboards arrastrando gráficos al lienzo. El 80% de tu tiempo estará aquí.',
                            visualHint: 'Atajo: Ctrl+1. Es la vista por defecto cuando abres Power BI.',
                            analogy: 'Es como el editor de un documento Word, pero en vez de texto, trabajas con gráficos interactivos.'
                        },
                        {
                            emoji: '📋',
                            title: 'Vista DATOS — Tu Excel interno',
                            content: 'El segundo ícono (tabla). Aquí ves tus datos como filas y columnas, exacto como en Excel. Útil para verificar que todo se importó bien.',
                            visualHint: 'Atajo: Ctrl+2. Parece una hoja de cálculo normal.',
                            analogy: 'Como revisar la factura después de comprar — verificas que todo esté correcto antes de seguir.'
                        },
                        {
                            emoji: '🔗',
                            title: 'Vista MODELO — Las relaciones',
                            content: 'El tercer ícono (cajitas conectadas). Aquí verás cómo se conectan las tablas entre sí. Nivel más avanzado — no te preocupes por esta todavía.',
                            visualHint: 'Atajo: Ctrl+3. Verás cajitas con flechas entre ellas.',
                            analogy: 'Como un árbol genealógico: muestra quién está relacionado con quién.'
                        },
                        {
                            emoji: '🛠️',
                            title: 'Paneles: Visualizaciones + Campos',
                            content: 'A la DERECHA tendrás 2 paneles esenciales: "Visualizaciones" (elige qué tipo de gráfico usar) y "Campos" (arrastra datos al gráfico).',
                            visualHint: 'Son colapsables — puedes ocultarlos para tener más espacio.',
                            analogy: 'Visualizaciones = tu paleta de colores. Campos = tus ingredientes. El lienzo = tu plato final.'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: '¿Qué ícono/atajo abre la Vista Informe?',
                            answer: 'Primer ícono (gráfico de barras) o Ctrl+1',
                            explanation: 'La Vista Informe es donde pasarás el 80% de tu tiempo creando dashboards.'
                        },
                        {
                            question: '¿Para qué sirve la Vista Datos?',
                            answer: 'Para ver tus tablas como en Excel — filas y columnas. Se usa para verificar que los datos se importaron bien.',
                            explanation: 'Siempre verifica tus datos después de importar. Un error aquí se propaga a todos tus gráficos.'
                        },
                        {
                            question: '¿Qué 2 paneles están a la derecha y para qué sirve cada uno?',
                            answer: 'Visualizaciones (tipos de gráficos disponibles) y Campos (tus datos/columnas para arrastrar)',
                            explanation: 'Estos paneles forman tu "caja de herramientas". Sin ellos no puedes crear nada.'
                        },
                        {
                            question: '(De la misión anterior) ¿Power BI es gratis o de pago?',
                            answer: 'Power BI Desktop es GRATIS. La versión Pro es de pago pero no la necesitas para aprender.',
                            explanation: '¡Interleaving! Tu cerebro acaba de reactivar un recuerdo anterior, fortaleciéndolo.'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué crees que la Vista Informe ocupa el 80% del tiempo y no el 33% (un tercio)?',
                            expertAnswer: 'Porque el objetivo final de Power BI es COMUNICAR información a través de dashboards visuales. Importar y modelar datos son pasos preparatorios. El valor real está en crear visualizaciones que cuenten una historia con datos, y eso se hace exclusivamente en Vista Informe.'
                        },
                        {
                            question: '¿En qué situación usarías la Vista Datos en lugar de la Vista Informe?',
                            expertAnswer: 'Cuando algo "no cuadra" en un gráfico — por ejemplo, si una barra muestra un valor inesperadamente alto. Cambias a Vista Datos para inspeccionar las filas individuales y buscar errores o valores atípicos. Es tu herramienta de "debugging" de datos.'
                        }
                    ]
                },

                // Banner de lectura obligatoria
                readFirstMessage: 'Las respuestas están en los conceptos de arriba y en la guía paso a paso. Lee las secciones "¿Qué son las 3 vistas?" y los pasos 4-8 de la guía. También puedes usar la "Ayuda Premium" para más detalles.',

                verification: [
                    {
                        question: "¿Cuántas vistas principales tiene Power BI?",
                        type: "number",
                        answer: 3,
                        hint: "Lee el concepto '¿Qué son las 3 vistas?' arriba — son: Informe, Datos y Modelo.",
                        academyHint: "Revisa el concepto '¿Qué son las 3 vistas?' o el Paso 4, 5 y 6 de la guía."
                    },
                    {
                        question: "¿Cómo se llama la vista donde creas gráficos?",
                        type: "choice",
                        options: ["Informe", "Datos", "Modelo"],
                        answer: "Informe",
                        hint: "La primera vista (ícono de gráfico de barras) se llama 'Informe'. Ahí creas dashboards.",
                        academyHint: "Lee el Paso 4 de la guía o usa 'Ayuda Premium' → 'Las 3 vistas explicadas'."
                    },
                    {
                        question: "¿El panel de Visualizaciones está a la izquierda o derecha?",
                        type: "choice",
                        options: ["Izquierda", "Derecha"],
                        answer: "Derecha",
                        hint: "Mira el borde derecho de Power BI. Ahí verás el panel con íconos de gráficos disponibles.",
                        academyHint: "Lee el Paso 7 de la guía. El panel de Visualizaciones está a la DERECHA."
                    },
                    {
                        question: "¿Qué vista usas para ver tus tablas como en Excel?",
                        type: "choice",
                        options: ["Informe", "Datos", "Modelo"],
                        answer: "Datos",
                        hint: "La segunda vista (ícono de tabla) se llama 'Datos'. Ahí ves filas y columnas como en Excel.",
                        academyHint: "Lee el Paso 5 de la guía o usa 'Ayuda Premium' → 'Las 3 vistas explicadas'."
                    },
                    {
                        question: "¿Qué porcentaje del tiempo pasarás en Vista Informe según los expertos?",
                        type: "choice",
                        options: ["50%", "80%", "100%"],
                        answer: "80%",
                        hint: "La mayoría del trabajo (crear dashboards) se hace en Vista Informe.",
                        academyHint: "Usa 'Ayuda Premium' → 'Mundo Real' → '¿Cuándo usarás cada vista?' para ver el desglose."
                    }
                ],
            },
            // =============================================
            // MISIÓN 1: IMPORTAR DATOS (MEJORADA)
            // =============================================
            {
                id: 'office-1',
                title: 'Bienvenido a Dunder Mifflin',
                chapter: 1,
                level: 1,
                requires: ['office-0'],
                xp: 150,
                coins: 50,
                description: 'Tu primer encargo real. Importa los datos de ventas y conoce al equipo.',
                storyContext: 'Ha pasado una semana. David Wallace ha enviado un archivo Excel con el histórico de ventas de Scranton de los últimos 6 meses. Michael lo recibió por email hace 2 semanas pero lo ignoró porque "los números me dan sueño". Jan Levinson llamó furiosa preguntando dónde está el reporte mensual. Tu primera tarea real: abrir ese archivo, cargarlo en Power BI, verificar que los tipos de datos sean correctos, y crear tus primeras medidas. Los vendedores principales son Dwight Schrute (el más agresivo), Jim Halpert (el más relajado), Phyllis Vance, Stanley Hudson, y Andy Bernard. Cada uno tiene un estilo diferente que se refleja en los datos.',
                episodeReference: 'S02E02 - Sexual Harassment (Los datos de ventas se vuelven tema serio)',
                storyStakes: 'Jan Levinson necesita el reporte de ventas para la junta del viernes. Si no lo tienes listo, Michael quedará mal y la presión de cerrar Scranton aumentará. Primer entregable real.',
                previousMissionRecap: 'Ya conoces la interfaz de Power BI (Misiones 0A-0): las 3 vistas, los paneles de Visualizaciones y Campos, y cómo navegar. Ahora cargarás datos por primera vez.',
                introNarrative: `📋 Michael entra a tu área con una carpeta manila llena de hojas sueltas y un USB que dice "DATOS IMPORTANTS" (sí, mal escrito).

"¡Hey! Jan acaba de llamar. Quiere números. AYER. Resulta que David Wallace mandó un archivo con todas las ventas de la sucursal y yo... bueno, no lo abrí porque el email decía 'archivo adjunto' y yo pensé que era un virus."

*Te pasa el USB*

"Aquí están los datos de ventas. Dwight dice que él vende más que todos, Jim dice que es mentira, Stanley dice que no le importa. Yo necesito PRUEBAS. Números reales. ¿Puedes meter esto en el Power BI?"

Dwight aparece: "Yo ya revisé el archivo en Excel. Tiene 68 transacciones, 4 productos, y MI nombre aparece más veces que el de Jim. FACT."

Jim: "...Todavía no lo has abierto, ¿verdad Dwight?" 
Dwight: "...No necesito abrirlo. Lo SÉ."

Pam te pasa una nota: "El archivo se llama office_sales.csv. Está en el USB. Suerte 🙏"`,
                outroNarrative: `✅ ¡Primer encargo completado!

Michael ve los números en pantalla y se queda boquiabierto:
"¡WOW! ¡Es como magia! ¡Los números ESTÁN AHÍ! ¡Y se ven BONITOS! Eso fue como cuando Wayne Gretzky dijo... bueno, no recuerdo qué dijo, pero fue épico!"

Dwight mira la pantalla con los ojos entrecerrados: "68 transacciones. 4 productos. Confirmado. Mis datos son correctos." *Mira a Jim con suficiencia*

Jim: "Genial. Ahora tenemos datos reales. Ya no tenemos que confiar en la 'intuición de ventas' de Dwight."

Pero entonces... Toby aparece con una expresión de disculpa:
"Mmm... perdonen. Encontré un archivo viejo de clientes que contabilidad necesita. Pero tiene... problemas. Los nombres están todos mal escritos y las fechas son un caos."

Michael: "¡TOBY! ¡¿Por qué siempre arruinas los momentos buenos?!"
Toby: "Solo... digo que necesitamos limpiar ese archivo también."

*Toby te mira con esperanza. Parece que tu siguiente misión acaba de aparecer.*`,
                skillsDemo: ['data-import'],
                wrongAnswerPenalty: 0.02,

                // CAMPOS PEDAGÓGICOS
                learningObjectives: [
                    'Entender qué significa "importar datos"',
                    'Cargar un archivo CSV/Excel en Power BI',
                    'Verificar que los tipos de datos sean correctos',
                    'Crear tu primera "medida" para contar filas'
                ],
                prerequisiteKnowledge: [
                    'Haber completado la Misión 0 (conocer la interfaz)',
                    'Saber qué es un archivo Excel o CSV'
                ],
                realWorldAnalogy: '📬 Imagina que recibes un sobre lleno de recibos de compras. Antes de saber cuánto gastaste, primero necesitas SACAR los recibos del sobre y ORDENARLOS en la mesa. "Importar datos" es exactamente eso: sacar la información de un archivo y traerla a Power BI para poder trabajar con ella.',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es IMPORTAR?',
                        explanation: 'Es "copiar" los datos de un archivo (Excel, CSV) hacia Power BI. El archivo original no se modifica, solo se lee.',
                        emoji: '📥'
                    },
                    {
                        concept: '¿Qué es una COLUMNA?',
                        explanation: 'Es una lista vertical de datos del mismo tipo. Por ejemplo: una columna de "Fechas", una de "Nombres", una de "Montos".',
                        emoji: '📊'
                    },
                    {
                        concept: '¿Qué es una MEDIDA?',
                        explanation: 'Es una fórmula que CALCULA algo. Por ejemplo: "cuenta cuántas filas hay" o "suma todos los montos". Se actualiza automáticamente cuando filtras.',
                        emoji: '🔢'
                    },
                    {
                        concept: '¿Qué es SUM?',
                        explanation: 'Es la palabra mágica para SUMAR. SUM(Ventas[Monto]) significa "suma todos los números de la columna Monto".',
                        emoji: '➕'
                    }
                ],

                objectives: [
                    'Importar dataset de ventas (Excel/CSV)',
                    'Corregir la columna "Fecha" (texto a Date)',
                    'Formatear "Amount" como moneda',
                    'Crear Medida: TotalFilas = COUNTROWS(Sales)',
                    'Crear Medida: TotalVentasBruto = SUM(Sales[Amount])'
                ],
                datasets: ['office_sales'],
                guide: [
                    '📁 PASO 1: Primero, descarga el archivo "office_sales.csv" usando el botón de arriba.',
                    '🖱️ PASO 2: En Power BI, haz click en "Obtener datos" (está en la pestaña Inicio, arriba a la izquierda).',
                    '📋 PASO 3: Busca "Texto/CSV" en la lista y haz click. Luego navega hasta donde guardaste el archivo.',
                    '👀 PASO 4: Aparecerá una vista previa. ¡Verifica que los datos se vean bien! Luego click en "Cargar".',
                    '✅ PASO 5: ¡Mira! En el panel "Campos" (derecha) ahora aparece tu tabla "office_sales".',
                    '🔍 PASO 6: Haz click en "Transformar datos" para abrir Power Query y revisar los tipos de datos.',
                    '📅 PASO 7: Busca la columna "Fecha". Si tiene ícono "ABC", cámbiala: click derecho > Cambiar tipo > Fecha.',
                    '💰 PASO 8: Busca la columna "Amount". Cámbiala a "Número decimal fijo" (eso es moneda).',
                    '💾 PASO 9: Click en "Cerrar y aplicar" (arriba izquierda). ¡Tus datos están listos!',
                    '🧮 PASO 10: Ahora crea tu primera medida: ve a "Modelado" > "Nueva medida" y escribe: TotalFilas = COUNTROWS(office_sales)',
                    '➕ PASO 11: Crea otra medida: TotalVentas = SUM(office_sales[Amount])',
                    '🎉 PASO 12: ¡Arrastra tus medidas al lienzo para verlas en una tarjeta!'
                ],
                checkpoints: [
                    {
                        afterStep: 5,
                        question: '¿Apareció tu tabla en el panel "Campos" a la derecha?',
                        successMessage: '¡Excelente! Power BI cargó tu archivo correctamente.',
                        failureHint: 'Si no aparece, intenta de nuevo desde el Paso 2. Asegúrate de hacer click en "Cargar" y no "Transformar".'
                    },
                    {
                        afterStep: 9,
                        question: '¿La columna "Fecha" ahora tiene ícono de calendario y "Amount" tiene símbolo de moneda?',
                        successMessage: '¡Perfecto! Los tipos de datos están correctos.',
                        failureHint: 'En Power Query, click derecho en el encabezado de la columna > Cambiar tipo > selecciona el correcto.'
                    }
                ],
                tips: [
                    '💡 Revisa siempre la calidad antes de analizar.',
                    '📝 Los nombres como "Jim Halpert" deben ser consistentes en todo el archivo.',
                    '🔄 Si algo sale mal, puedes eliminar la tabla y volver a importar.'
                ],

                // ========== CONTENIDO PREMIUM EXPANDIDO ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'Importar vs Transformar',
                            content: '📥 "Cargar" = Los datos entran directo a Power BI\n🔧 "Transformar" = Abre Power Query para editar antes\n\nUsualmente: Cargar primero, si hay problemas, Transformar después.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Tipos de datos importantes',
                            content: '📅 Fecha: Para hacer análisis por año/mes\n💰 Número decimal fijo: Para dinero (2 decimales)\n📝 Texto: Para nombres, códigos\n🔢 Número entero: Para cantidades sin decimales',
                            difficulty: 'beginner'
                        },
                        {
                            title: '¿Qué es una Medida?',
                            content: 'Una medida es una fórmula que SE RECALCULA según el contexto.\n\nEjemplo: TotalVentas = SUM(Sales[Amount])\n- Sin filtro: Suma TODO\n- Con filtro "Enero": Solo suma Enero\n\n¡Es mágico! La misma medida da diferentes resultados según los filtros.',
                            difficulty: 'beginner'
                        }
                    ],
                    interface: [
                        {
                            title: 'Dónde está "Obtener datos"',
                            content: '📍 Ubicación: Pestaña "Inicio" > Primer grupo de la izquierda\n🖱️ Es un botón grande con un ícono de base de datos\n⚡ Atajo: También puedes hacer click derecho en el panel Campos > "Obtener datos"',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Dónde crear medidas',
                            content: '📍 Opción 1: Pestaña "Modelado" > "Nueva medida"\n📍 Opción 2: Click derecho en la tabla (panel Campos) > "Nueva medida"\n📍 La barra de fórmulas aparece arriba automáticamente',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Identificar tipos de datos',
                            content: 'Mira el ícono junto al nombre de la columna:\n📅 Calendario = Fecha\n123 = Número\nABC = Texto\n∑ Sigma = Medida (se puede sumar)',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Atajos para importar más rápido',
                            content: 'Ctrl + Shift + E = Abrir Power Query\nCtrl + M = Nueva medida rápida\nF5 = Actualizar datos desde la fuente',
                            difficulty: 'intermediate'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'El archivo no aparece en el panel Campos',
                            content: 'Posibles causas:\n1. Hiciste click en "Transformar" en lugar de "Cargar"\n   → Solución: En Power Query, click "Cerrar y aplicar"\n2. El archivo está vacío\n   → Abre el archivo en Excel para verificar\n3. Power BI cargó pero la tabla tiene otro nombre\n   → Busca en el panel Campos, puede tener el nombre de la hoja',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Los números aparecen como texto (ABC)',
                            content: 'Causa: El archivo tiene celdas con texto mezclado o formato regional diferente.\n\nSolución:\n1. En Power Query: Click derecho en columna\n2. "Cambiar tipo" > "Número decimal"\n3. Si da error, hay texto escondido. Usa "Reemplazar valores" para limpiar',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'La medida dice "Error"',
                            content: 'Revisa:\n1. ¿El nombre de la tabla es exacto? (Mayúsculas importan)\n2. ¿Cerraste todos los paréntesis?\n3. ¿Usaste corchetes para la columna? Sales[Amount] ✓ vs Sales(Amount) ✗',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Autocompletado es tu amigo',
                            content: 'Cuando escribas una medida, escribe las primeras letras y espera.\nPower BI te sugerirá nombres de tablas, columnas y funciones.\nPresiona TAB para aceptar. ¡Evita errores de tipeo!',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Nombra bien tus medidas',
                            content: 'Bueno: TotalVentas, PromedioVentas, ConteoClientes\nMalo: medida1, formula, nuevo\n\nCuando tengas 20 medidas, agradecerás tener nombres claros.',
                            difficulty: 'intermediate'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'El 80% del trabajo es importar bien',
                            content: 'En la vida real, los analistas pasan más tiempo PREPARANDO datos que haciendo gráficos bonitos.\n\nSi importas mal: todos tus análisis estarán mal.\nSi importas bien: el resto es fácil.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                commonMistakesRef: 'data-import',

                whyItMatters: {
                    title: '¿Por qué importar datos es fundamental?',
                    reason: 'Sin datos, Power BI es solo una pantalla vacía. Importar es el primer paso de CUALQUIER análisis.',
                    careerConnection: 'En el trabajo real, recibirás datos de muchas fuentes: Excel, bases de datos, APIs. Saber importar correctamente te hará valioso.',
                    realExample: 'Un analista de ventas necesita el archivo de transacciones cada lunes. Si sabe importar bien, en 5 minutos tiene el reporte listo.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo importar un archivo CSV sin mirar la guía?',
                        criteria: 'Deberías poder encontrar "Obtener datos" y seleccionar el archivo en menos de 1 minuto.',
                        action: 'Practica importando diferentes archivos. Cada uno es ligeramente diferente.'
                    },
                    {
                        question: '¿Sé identificar si los tipos de datos son correctos?',
                        criteria: 'Deberías poder decir: "Esta columna debería ser Fecha pero es Texto, hay que cambiarla".',
                        action: 'Revisa los íconos de cada columna después de importar. Practica identificarlos.'
                    },
                    {
                        question: '¿Puedo crear una medida simple sin errores?',
                        criteria: 'TotalVentas = SUM(Tabla[Columna]) debería funcionar a la primera.',
                        action: 'Si tienes errores, practica escribiendo medidas simples hasta que salgan perfectas.'
                    }
                ],

                interfaceGuide: {
                    obtenerDatos: 'Pestaña Inicio > Botón "Obtener datos" (icono de base de datos, arriba izquierda)',
                    powerQuery: 'Editor de transformaciones - Se abre con "Transformar datos"',
                    panelCampos: 'Donde aparecen tus tablas y columnas después de importar (derecha)',
                    barraFormulas: 'Aparece arriba del lienzo cuando creas medidas - aquí escribes DAX'
                },

                expectedOutcome: 'Modelo limpio con ~68 transacciones y 2 medidas básicas funcionando.',

                // ============ NEUROCIENCIA: Misión 1 ============
                neuroLearning: {
                    cognitiveLoad: 'medium',
                    techniquesSummary: 'Priming con analogía → Chunking 4 conceptos → Práctica con feedback → Interleaving recall',
                    scienceFact: 'La "dificultad deseable" (Bjork, 1994) dice que un nivel moderado de esfuerzo mental MEJORA el aprendizaje. Esta misión sube la complejidad intencionalmente — tu cerebro trabaja más, pero retiene más.',

                    priming: {
                        questions: [
                            {
                                question: '¿Alguna vez has abierto un archivo Excel o CSV? ¿Qué tipo de datos tenía?',
                                placeholder: 'Ej: lista de nombres, notas, gastos...',
                                insight: 'Importar datos a Power BI es exactamente como abrir un archivo Excel — pero con la ventaja de que Power BI puede verificar y limpiar los datos automáticamente.'
                            },
                            {
                                question: '¿Qué crees que significa "tipo de dato"? (fecha, número, texto...)',
                                placeholder: 'Tu mejor intento...',
                                insight: 'Los "tipos de dato" le dicen a Power BI cómo tratar cada columna: las fechas se pueden filtrar por mes/año, los números se pueden sumar, el texto sirve como etiqueta. Si el tipo es incorrecto, los cálculos fallan.'
                            },
                            {
                                question: '(Repaso) ¿Cuáles son las 3 vistas de Power BI?',
                                placeholder: 'Informe, ...',
                                insight: '¡Interleaving! Informe (gráficos), Datos (tablas), Modelo (relaciones). Hoy usarás las 3: importarás en Vista Datos, crearás medidas, y verificarás en Vista Informe.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '📥',
                            title: 'IMPORTAR = Copiar datos al programa',
                            content: 'Es como meter una memoria USB: los datos pasan del archivo a Power BI. El archivo original NO se modifica.',
                            visualHint: 'Botón "Obtener datos" → seleccionar archivo → vista previa → cargar. 4 clicks.',
                            analogy: 'Como sacar fotos del teléfono a la computadora: las copias, no las mueves.'
                        },
                        {
                            emoji: '📊',
                            title: 'COLUMNAS = Listas verticales de datos',
                            content: 'Cada columna es un tipo de información: Fecha, Vendedor, Producto, Monto. Son las "piezas" de tu análisis.',
                            visualHint: 'En Vista Datos (Ctrl+2), cada columna tiene un encabezado con un ícono que indica su tipo.',
                            analogy: 'Como las columnas de un periódico: cada una tiene su tema.'
                        },
                        {
                            emoji: '🔢',
                            title: 'MEDIDA = Una fórmula que calcula algo',
                            content: 'Una medida es una instrucción tipo: "Suma todos los montos" (SUM) o "Cuenta las filas" (COUNTROWS). Se recalcula automáticamente al filtrar.',
                            visualHint: 'Se crea en: Modelado → Nueva Medida. Aparece una barra de fórmulas arriba.',
                            analogy: 'Como una calculadora que se actualiza sola: si cambias el filtro, el resultado cambia.'
                        },
                        {
                            emoji: '➕',
                            title: 'SUM y COUNTROWS — Tus primeras funciones DAX',
                            content: 'SUM(tabla[columna]) = Suma los números. COUNTROWS(tabla) = Cuenta cuántas filas hay. Así de simple.',
                            visualHint: 'DAX usa corchetes: tabla[columna]. La tabla va sola, la columna entre [].',
                            analogy: 'SUM es como "=SUMAR" en Excel. COUNTROWS es como contar cuántos recibos tienes en una pila.'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: '¿Qué botón usas para traer datos de un archivo a Power BI?',
                            answer: '"Obtener datos" (en la pestaña Inicio, arriba a la izquierda)',
                            explanation: 'Este botón es tu puerta de entrada para CUALQUIER tipo de datos: Excel, CSV, bases de datos, etc.'
                        },
                        {
                            question: '¿Cuál es la diferencia entre SUM y COUNTROWS?',
                            answer: 'SUM suma los VALORES de una columna numérica. COUNTROWS cuenta cuántas FILAS tiene una tabla (sin importar los valores).',
                            explanation: 'SUM responde "¿cuánto en total?". COUNTROWS responde "¿cuántas transacciones hay?".'
                        },
                        {
                            question: '¿Los corchetes [] en DAX se usan para tablas o columnas?',
                            answer: 'Para COLUMNAS. La tabla va sin corchetes: MiTabla[MiColumna]',
                            explanation: 'Ejemplo: SUM(office_sales[Amount]) — "office_sales" es la tabla, "[Amount]" es la columna.'
                        },
                        {
                            question: '(Repaso misión 0) ¿Qué porcentaje del tiempo pasarás en Vista Informe?',
                            answer: '80% — es donde creas dashboards y visualizaciones.',
                            explanation: '¡Interleaving! Recuperar info de misiones anteriores consolida tu memoria a largo plazo.'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué es importante verificar los "tipos de datos" después de importar? ¿Qué pasaría si una fecha se queda como texto?',
                            expertAnswer: 'Si una fecha es "texto", Power BI no puede filtrar por mes/año, no puede hacer gráficos temporales, y no puede usar funciones de fecha. Es como tener una dirección escrita en chino — la información está ahí pero no puedes usarla. Siempre verifica: ícono de calendario = fecha, Σ = número, ABC = texto.'
                        },
                        {
                            question: '¿Por qué SUM se "recalcula" automáticamente cuando filtras? ¿No es el mismo cálculo siempre?',
                            expertAnswer: 'Este es el "contexto de evaluación" — el concepto más poderoso de DAX. SUM no dice "suma todo para siempre", sino "suma lo que sea visible con los filtros actuales". Si filtras por Enero, SUM solo suma Enero. Si filtras por Dwight, SUM solo suma a Dwight. La misma medida, contextos diferentes.'
                        }
                    ]
                },

                readFirstMessage: 'Usa los pasos de la guía y los conceptos de arriba para responder. Las funciones DAX se mencionan en la sección de conceptos y en los pasos 7-9 de la guía.',

                verification: [
                    { question: "¿Cuántas filas totales de ventas cargaste?", type: "number", answer: 68, hint: "Usa tu medida TotalFilas o COUNTROWS. Mira en la barra inferior de Power BI para ver el número de filas.", academyHint: "Lee el Paso 5 de la guía sobre cómo verificar filas." },
                    { question: "¿Cuántos tipos de papel vendemos?", type: "number", answer: 4, hint: "Crea medida: DISTINCTCOUNT(office_sales[Product]). O mira los valores únicos de la columna Product en Vista Datos.", academyHint: "Usa la Vista Datos (segundo ícono izquierdo) para ver los productos." },
                    { question: "¿Cuál es el total bruto de ventas?", type: "number", answer: 472245, hint: "Usa tu medida TotalVentas o SUM(Amount). Se crea en la barra de fórmulas.", academyHint: "Lee el concepto 'Tu primera medida DAX' arriba." },
                    { question: "¿Qué función DAX usas para SUMAR una columna?", type: "choice", options: ["SUM", "AVERAGE", "COUNT", "FILTER"], answer: "SUM", hint: "SUM = Sumar. Es la función más básica de DAX.", academyHint: "Revisa la carta 'SUM' en tu mazo de cartas." },
                    { question: "¿Qué función DAX cuenta las FILAS de una tabla?", type: "choice", options: ["COUNTROWS", "COUNT", "SUM", "DISTINCTCOUNT"], answer: "COUNTROWS", hint: "COUNT + ROWS = Contar Filas. COUNT solo cuenta celdas numéricas, COUNTROWS cuenta TODAS las filas.", academyHint: "Revisa la carta 'COUNTROWS' en tu mazo de cartas." },
                    { question: "¿Los corchetes [] se usan para nombres de columnas o tablas?", type: "choice", options: ["Columnas", "Tablas", "Ambos"], answer: "Columnas", hint: "Tabla[Columna] - la tabla va sola, la columna entre [].", academyHint: "Lee el concepto 'Estructura DAX' arriba." }
                ],
                winImage: '/images/story/office-1-win.png'
            },
            {
                id: 'office-1b',
                title: 'La Pesadilla del Archivo de Toby',
                chapter: 1.5,
                level: 1,
                requires: ['office-1'],
                xp: 250,
                coins: 75,
                description: 'Toby encontró un archivo de clientes con datos sucios. Limpia mayúsculas y fechas.',
                storyContext: 'Toby Flenderson, el representante de RRHH que nadie escucha, ha descubierto un archivo Excel antiguo que el departamento de contabilidad (Angela, Kevin y Oscar) necesita desesperadamente. El archivo tiene la lista de todos los clientes de Scranton, pero fue mantenido por diferentes personas a lo largo de los años: unos escribían en MAYÚSCULAS, otros en minúsculas, otros con acentos, otros sin ellos. Las fechas son un desastre: algunos usaron formato americano (MM/DD/YYYY), otros español (DD/MM/YYYY), y Kevin aparentemente inventó un formato propio. Angela está furiosa porque no puede cuadrar los números de contabilidad sin esta lista limpia.',
                episodeReference: 'S02E06 - The Fight (La tensión entre personajes mientras tú limpias el caos)',
                storyStakes: 'Angela amenazó con reportar a Michael a Corporate si no se arregla el archivo de clientes. Sin datos limpios, el reporte mensual de cuentas por cobrar estará mal. Toby finalmente será útil si tú le ayudas.',
                previousMissionRecap: 'Ya importaste el archivo de ventas (68 transacciones, 4 productos) y creaste tus primeras medidas (COUNTROWS y SUM). Ahora enfrentarás un problema real: datos sucios.',
                introNarrative: `😰 Toby se acerca a tu escritorio con un USB y expresión de disculpa:

"Hola... sé que nadie me escucha normalmente, pero esto es importante. Encontré el archivo maestro de clientes. Contabilidad lo necesita para el cierre mensual."

Angela aparece detrás de Toby con los brazos cruzados:
"NECESITO esa lista LIMPIA para el viernes. Oscar y yo llevamos 3 horas intentando cuadrar las cuentas y hay clientes que aparecen 3 veces con nombres diferentes. ¿Sabes lo que eso le hace a mi balance? ¡ES UN DESASTRE!"

Kevin, desde su escritorio: "Yo fui el que mantuvo el archivo los últimos 2 años. ¿Cuál es el problema?"
Oscar: "Kevin... escribiste 'JUANA PÉREZ', 'juana perez' y 'JuAnA pErEz'. ¡Es la MISMA persona!"
Kevin: "...Oh. Pensé que eran 3 personas."

Michael rueda los ojos: "¡Toby! ¿Por qué siempre traes problemas? Eres como el vampiro de la diversión." Pero luego te mira: "Hey, tú eres bueno con los datos, ¿no? ¿Puedes arreglar esto? Esto es peor que Scott's Tots."

Toby te pasa el USB con esperanza en sus ojos. Quizás la primera vez en años que alguien confía en él para algo importante.`,
                outroNarrative: `🧹 ¡Archivo de clientes limpio e impecable!

Toby sonríe (por primera vez en meses). Literalmente le brillan los ojos:
"Gracias. En serio. Nadie me había ayudado con algo así. Voy a llevarle esto a contabilidad."

Angela revisa el archivo y... no dice nada. Lo cual, viniendo de Angela, es un cumplido ENORME.
Oscar: "Los nombres están normalizados, las fechas son consistentes, los emails inválidos están marcados. Buen trabajo."
Kevin: "¿Osea que ya no hay 3 Juanas? ... Voy a extrañar a las otras 2."

Michael asoma la cabeza por la puerta de su oficina:
"Bueno, supongo que Toby no destruyó todo hoy. ¡Y tú eres oficialmente el Limpiador de Datos de Scranton! Eso suena a un buen título para una tarjeta de presentación."

Pam te manda un mensaje: "Michael está planeando los Dundies para la próxima semana. Va a necesitar datos de ventas para los premios. Prepárate. 🏆"

*La limpieza de datos no es glamorosa, pero acabo de ganarte el respeto de Contabilidad. Eso vale más que cualquier badge.*`,
                skillsDemo: ['data-cleaning'],
                wrongAnswerPenalty: 0.02,

                // CAMPOS PEDAGÓGICOS
                learningObjectives: [
                    'Entender qué es "limpiar datos" y por qué importa',
                    'Usar Text.Proper() para normalizar nombres',
                    'Identificar y filtrar datos inválidos',
                    'Trabajar con Power Query para transformaciones'
                ],
                prerequisiteKnowledge: [
                    'Haber completado la Misión 1 (importar datos)',
                    'Saber que Power Query es el editor de transformaciones'
                ],
                realWorldAnalogy: '🧽 Imagina que recibes una lista de invitados a una fiesta, pero algunos nombres dicen "JUAN PÉREZ", otros "juan pérez" y otros "jUaN pÉrEz". Es la MISMA persona, pero la computadora los ve como 3 personas diferentes. "Limpiar datos" es como reescribir todos los nombres de forma uniforme.',
                conceptBreakdown: [
                    {
                        concept: '¿Por qué limpiar datos?',
                        explanation: 'Si "Juan" aparece como "JUAN", "juan" y "Juan", Power BI los contará como 3 personas diferentes. Limpiar = unificar.',
                        emoji: '🧹'
                    },
                    {
                        concept: '¿Qué es Text.Proper?',
                        explanation: 'Es una función que convierte "JUAN PÉREZ" en "Juan Pérez". La primera letra en mayúscula, el resto en minúscula.',
                        emoji: '✨'
                    },
                    {
                        concept: '¿Qué es Text.Trim?',
                        explanation: 'Elimina espacios extra al inicio y al final. " Juan " se convierte en "Juan".',
                        emoji: '✂️'
                    }
                ],

                objectives: [
                    'Normalizar nombres con Text.Proper()',
                    'Unificar formatos de fecha',
                    'Limpiar caracteres especiales en teléfonos',
                    'Identificar emails inválidos (sin @)'
                ],
                datasets: ['office_dirty_clients'],
                guide: [
                    '📁 PASO 1: Descarga el archivo "office_dirty_clients.csv" y cárgalo en Power BI.',
                    '🔍 PASO 2: Click en "Transformar datos" para abrir Power Query.',
                    '👀 PASO 3: Mira la columna de nombres. ¿Ves que algunos están en MAYÚSCULAS y otros no?',
                    '🎯 PASO 4: Selecciona la columna de nombres. Ve a "Transformar" > "Formato" > "Cada palabra en mayúsculas".',
                    '✅ PASO 5: ¡Mira! Todos los nombres ahora tienen formato "Juan Pérez".',
                    '📅 PASO 6: Ahora mira la columna de fechas. Algunas son "01/15/2024" (formato americano).',
                    '🔧 PASO 7: Click derecho en la columna > "Cambiar tipo" > "Usando configuración regional" > Inglés (EE.UU.).',
                    '📧 PASO 8: Para los emails, crea un filtro: usa el ícono de flecha > "Filtros de texto" > "Contiene" > "@".',
                    '🗑️ PASO 9: Los que NO contienen "@" son inválidos. Puedes marcarlos o eliminarlos.',
                    '💾 PASO 10: Click en "Cerrar y aplicar". ¡Datos limpios!'
                ],
                checkpoints: [
                    {
                        afterStep: 5,
                        question: '¿Todos los nombres ahora tienen formato "Nombre Apellido" (primera letra mayúscula)?',
                        successMessage: '¡Perfecto! Text.Proper funcionó correctamente.',
                        failureHint: 'Selecciona la columna > Transformar > Formato > "Cada palabra en mayúsculas".'
                    }
                ],
                tips: [
                    '🧹 Text.Clean() elimina caracteres invisibles que a veces causan errores.',
                    '✂️ Text.Trim() quita espacios extra al inicio y final.',
                    '📧 Un email válido SIEMPRE tiene "@" y un punto después.'
                ],

                // ========== CONTENIDO PREMIUM EXPANDIDO ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'El costo de los datos sucios',
                            content: '💸 Estudios muestran que datos de mala calidad cuestan a las empresas entre 15-25% de sus ingresos.\n\nEjemplo real: Si "Jim Halpert" aparece también como "JIM HALPERT", los reportes mostrarán que hay 2 vendedores diferentes, duplicando sus ventas o dividiéndolas incorrectamente.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Funciones de texto clave',
                            content: '📝 Text.Proper = "JUAN PÉREZ" → "Juan Pérez"\n📝 Text.Upper = "juan" → "JUAN"\n📝 Text.Lower = "JUAN" → "juan"\n📝 Text.Trim = " juan " → "juan"\n📝 Text.Clean = Elimina caracteres invisibles',
                            difficulty: 'beginner'
                        },
                        {
                            title: '¿Cuándo usar cada función?',
                            content: 'Text.Proper: Para nombres de personas y lugares\nText.Upper: Para códigos de producto (SKU-001)\nText.Lower: Para emails (normalización)\nText.Trim: SIEMPRE, en TODO. Los espacios fantasma causan el 30% de los errores.',
                            difficulty: 'intermediate'
                        }
                    ],
                    interface: [
                        {
                            title: 'Navegando Power Query',
                            content: '📍 Cinta superior: Herramientas de transformación\n📍 Panel izquierdo: Lista de consultas (tablas)\n📍 Centro: Vista previa de datos\n📍 Panel derecho: "Pasos aplicados" - Tu historial de cambios',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'El panel "Pasos Aplicados"',
                            content: '🔄 Cada transformación crea un "paso"\n🗑️ Puedes eliminar pasos para deshacer\n📝 Puedes renombrar pasos para documentar\n⬆️ ¡CRUCIAL! Los pasos se ejecutan en ORDEN',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Atajos en Power Query',
                            content: 'Ctrl + Enter = Aplicar cambios y cerrar\nDelete = Eliminar paso seleccionado\nCtrl + Z = Deshacer (en la barra de fórmulas)\nF2 = Renombrar paso seleccionado',
                            difficulty: 'intermediate'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Text.Proper no funciona con apellidos compuestos',
                            content: 'Problema: "McDonald" se convierte en "Mcdonald"\nCausa: Text.Proper baja todo después de la primera letra\n\nSolución parcial: Acepta que no será 100% perfecto. Para casos especiales:\n1. Crea una tabla de excepciones\n2. O usa "Reemplazar valores" para casos específicos',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Después de limpiar faltan filas',
                            content: 'Causa probable: Aplicaste un filtro sin querer o eliminaste filas con errores que tenían datos válidos.\n\nSolución:\n1. En "Pasos aplicados" (derecha), revisa cada paso\n2. Haz click en pasos anteriores para ver los datos ANTES\n3. Elimina el paso problemático si es necesario',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Las fechas siguen mostrándose mal',
                            content: 'Posibles causas:\n1. Formato regional incorrecto (USA vs España)\n2. Algunas celdas tienen texto, no fechas\n\nSolución:\n1. Click derecho > Cambiar tipo > Usando configuración regional\n2. Si algunas filas dan "Error", esas celdas tienen texto corrupto',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Combina funciones de texto',
                            content: 'Para limpiar nombres profesionalmente:\n\nText.Proper(Text.Trim(Text.Clean([Nombre])))\n\n1. Clean: Quita caracteres invisibles\n2. Trim: Quita espacios extra\n3. Proper: Capitaliza correctamente\n\n¡Orden importa! De adentro hacia afuera.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Documenta tus pasos',
                            content: 'Haz click derecho en cualquier paso > "Propiedades"\nAgrega una descripción de lo que hace.\n\nCuando vuelvas en 3 meses, agradecerás saber por qué hiciste cada cosa.',
                            difficulty: 'intermediate'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'El 80% del trabajo de datos es limpieza',
                            content: 'Los científicos de datos dicen que pasan 80% de su tiempo limpiando datos y solo 20% analizándolos.\n\nSi dominas la limpieza, eres más valioso que alguien que solo sabe hacer gráficos bonitos.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Errores reales en empresas',
                            content: 'Caso real: Una empresa envió 500 cartas a "JUAN PEREZ", "Juan Perez" y "juan perez"... la misma persona recibió 3 cartas.\n\nResultado: Desperdicio de dinero + cliente molesto + vergüenza del equipo de datos.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                commonMistakesRef: 'data-cleaning',

                whyItMatters: {
                    title: '¿Por qué limpiar datos es tan importante?',
                    reason: 'Datos sucios = Análisis incorrectos = Malas decisiones de negocio. Si "Jim" aparece 3 veces diferente, tus reportes dirán que hay 3 vendedores.',
                    careerConnection: 'Los analistas que saben limpiar datos bien ganan 20% más que los que solo hacen gráficos. Es la habilidad más demandada y menos glamorosa.',
                    realExample: 'Un banco perdió $10 millones porque su reporte de fraude no detectó transacciones duplicadas por nombres escritos diferente.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo identificar datos sucios a simple vista?',
                        criteria: 'Deberías poder decir: "Esta columna tiene mayúsculas mezcladas, espacios extra, y valores vacíos".',
                        action: 'Antes de limpiar, SIEMPRE haz un recorrido visual de cada columna.'
                    },
                    {
                        question: '¿Sé usar el panel "Pasos aplicados" para deshacer?',
                        criteria: 'Deberías poder eliminar un paso problemático sin perder todo el trabajo.',
                        action: 'Practica: Haz una transformación, luego elimínala desde el panel de pasos.'
                    },
                    {
                        question: '¿Puedo aplicar Text.Proper a una columna?',
                        criteria: 'Deberías poder hacerlo en menos de 10 segundos.',
                        action: 'Memoriza: Seleccionar columna > Transformar > Formato > Cada palabra en mayúsculas.'
                    }
                ],

                interfaceGuide: {
                    powerQuery: 'Editor de Power Query - Se abre con "Transformar datos" desde Power BI',
                    pasosAplicados: 'Panel derecho en Power Query - Historial de todas tus transformaciones',
                    vistaPrevia: 'Centro de Power Query - Muestra los primeros 1000 registros de tu tabla',
                    barraTransformar: 'Cinta superior "Transformar" - Todas las herramientas de limpieza'
                },

                expectedOutcome: 'Tabla de clientes 100% normalizada y lista para relacionar.',

                // ============ NEUROCIENCIA: Misión 1B ============
                neuroLearning: {
                    cognitiveLoad: 'medium',
                    techniquesSummary: 'Priming emocional (Toby) → Chunking funciones de texto → Pattern matching → Interleaving recall',
                    scienceFact: 'El "emotional tagging" (LaBar & Cabeza, 2006) muestra que la amígdala etiqueta recuerdos con emociones. La frustración de Toby y la furia de Angela hacen que recuerdes MEJOR por qué la limpieza importa. Las emociones fijan memorias.',

                    priming: {
                        questions: [
                            {
                                question: '¿Alguna vez recibiste una lista con datos desordenados? (nombres mal escritos, fechas raras, etc.)',
                                placeholder: 'Describe lo que viste...',
                                insight: 'Datos sucios son el problema #1 en análisis de datos. El 80% del tiempo de un analista se gasta limpiando, no graficando. Hoy aprenderás las herramientas para hacerlo rápido.'
                            },
                            {
                                question: '(Repaso) ¿Qué función DAX suma todos los valores de una columna?',
                                placeholder: 'Empieza con S...',
                                insight: '¡Interleaving! SUM(tabla[columna]). Fortaleciste esa conexión neuronal al recordarla ahora. Hoy usarás funciones de TEXTO en vez de números.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '🧹',
                            title: '¿POR QUÉ limpiar datos?',
                            content: 'Si "Juan" aparece como "JUAN", "juan" y "Juan", Power BI los cuenta como 3 personas DIFERENTES. Tu reporte dirá que hay 3 Juanes cuando solo hay 1.',
                            visualHint: 'Imagina 3 badges de identificación con el MISMO nombre escrito diferente — la computadora los ve como 3 personas distintas.',
                            analogy: 'Es como cuando tu teléfono tiene el mismo contacto guardado 3 veces con variaciones del nombre.'
                        },
                        {
                            emoji: '✨',
                            title: 'Text.Proper — Tu arma principal',
                            content: '"JUAN PÉREZ" → "Juan Pérez". La primera letra de cada palabra en MAYÚSCULA, el resto en minúscula. Un click en Power Query.',
                            visualHint: 'En Power Query: selecciona columna → pestaña Transformar → Formato → "Cada palabra en mayúsculas".',
                            analogy: 'Como el corrector automático del teléfono pero para datos de negocio.'
                        },
                        {
                            emoji: '✂️',
                            title: 'Text.Trim + Text.Clean — Limpia lo invisible',
                            content: 'Trim elimina espacios extra (" Juan " → "Juan"). Clean elimina caracteres invisibles que causan errores misteriosos.',
                            visualHint: 'No puedes ver los espacios extra, pero la computadora SÍ los ve. Por eso 2 nombres "iguales" no coinciden.',
                            analogy: 'Como limpiar una mesa: a simple vista parece limpia, pero hay migajas invisibles que causan problemas.'
                        },
                        {
                            emoji: '🔄',
                            title: 'Pasos Aplicados — Tu máquina del tiempo',
                            content: 'Cada transformación en Power Query se guarda como un "paso". Puedes eliminar pasos para deshacer, reordenar, o revisar el antes/después.',
                            visualHint: 'Panel derecho de Power Query. Click en cualquier paso anterior para ver cómo se veían los datos ANTES.',
                            analogy: 'Como el historial de un documento de Google Docs — puedes "viajar en el tiempo" a cualquier versión anterior.'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: '¿Qué función convierte "ANGELA MARTIN" en "Angela Martin"?',
                            answer: 'Text.Proper — pone la primera letra de cada palabra en mayúscula y el resto en minúscula.',
                            explanation: 'Proper = "apropiado/correcto". Es la función más usada para normalizar nombres.'
                        },
                        {
                            question: '¿Qué hace Text.Trim y por qué es necesaria si no puedes VER los espacios extra?',
                            answer: 'Elimina espacios al inicio y final del texto. Es necesaria porque la computadora ve " Juan" y "Juan" como DIFERENTES.',
                            explanation: 'Los espacios invisibles causan ~30% de los errores al cruzar datos. Siempre aplica Trim.'
                        },
                        {
                            question: '¿Dónde ves el historial de transformaciones en Power Query?',
                            answer: 'En el panel "Pasos Aplicados" (panel derecho de Power Query).',
                            explanation: 'Cada click que hagas crea un paso. Puedes revisarlos, eliminarlos o reordenarlos.'
                        },
                        {
                            question: '(Repaso M1) ¿Qué ícono junto al nombre de una columna indica que es una fecha?',
                            answer: 'Un ícono de calendario. Si ves "ABC" es texto, si ves "123" es número.',
                            explanation: '¡Interleaving! Verificar tipos de datos es crucial tanto al importar (M1) como al limpiar (M1B).'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué un analista profesional gasta el 80% de su tiempo limpiando datos y solo el 20% haciendo gráficos?',
                            expertAnswer: 'Porque "garbage in, garbage out" — si los datos de entrada están sucios, TODOS los gráficos y análisis serán incorrectos. Un dashboard hermoso con datos malos es peor que inútil: es engañoso. La limpieza es el cimiento invisible que sostiene todo el análisis. Las empresas que lo ignoran toman decisiones con información falsa.'
                        },
                        {
                            question: '¿Cuál sería el orden correcto para limpiar un nombre: Proper, Trim, Clean? ¿Por qué ese orden?',
                            expertAnswer: 'Clean → Trim → Proper. Primero eliminas caracteres invisibles (Clean), luego espacios extra (Trim), y finalmente normalizas mayúsculas (Proper). Si haces Proper primero, los caracteres invisibles podrían interferir con la capitalización. En Power Query: Text.Proper(Text.Trim(Text.Clean([Nombre]))). De adentro hacia afuera.'
                        }
                    ]
                },

                verification: [
                    { question: "¿Cuántos clientes tienen el nombre corregido?", type: "number", answer: 12, hint: "Compara nameOriginal vs nameExpected usando Text.Proper()." },
                    { question: "¿Cuántos emails inválidos detectaste?", type: "number", answer: 6, hint: "Busca emails sin '@', vacíos, nulos o con formato incorrecto." },
                    { question: "¿Qué función convierte 'JUAN PÉREZ' en 'Juan Pérez'?", type: "choice", options: ["Text.Proper", "Text.Upper", "Text.Lower", "Text.Trim"], answer: "Text.Proper", hint: "Proper = 'apropiado' en inglés. Pone mayúscula solo en la primera letra de cada palabra.", academyHint: "Revisa la carta 'Trim & Clean' en tu mazo o el concepto de limpieza arriba." },
                    { question: "¿Qué función elimina espacios al inicio y final?", type: "choice", options: ["Text.Trim", "Text.Clean", "Text.Proper", "Text.Replace"], answer: "Text.Trim", hint: "Trim = 'recortar' en inglés. Elimina espacios sobrantes al inicio y final del texto.", academyHint: "Revisa la carta 'Trim & Clean' en tu mazo de cartas." },
                    { question: "¿Dónde ves el historial de transformaciones en Power Query?", type: "choice", options: ["Panel izquierdo", "Panel derecho", "Menú superior"], answer: "Panel derecho", hint: "Se llama 'Pasos aplicados'." },
                    { question: "¿Se puede deshacer un paso de Power Query?", type: "choice", options: ["Sí, eliminando el paso", "No, hay que empezar de nuevo"], answer: "Sí, eliminando el paso", hint: "Click derecho en el paso > Eliminar." }
                ],
            },
            {
                id: 'office-2',
                title: 'Premios Dundies',
                chapter: 2,
                level: 1,
                requires: ['office-1b'],
                xp: 300,
                coins: 100,
                description: 'Michael necesita datos para los premios anuales. Usa medidas básicas (SUM, AVERAGE).',
                storyContext: 'Los Dundies son la ceremonia anual de premios creada por Michael Scott, la tradición más importante (y vergonzosa) de Dunder Mifflin. Este año se celebran en Chili\'s. Pero Michael quiere hacer algo diferente: en lugar de premios inventados como "Mejor Sonrisa" o "Más Probable que Sea un Robot" (que Dwight ganó el año pasado), quiere dar premios BASADOS EN DATOS para impresionar a Jan Levinson, quien estará presente. Necesitas calcular quién vendió MÁS (total) y quién tiene el mejor PROMEDIO por venta. El problema: Dwight gana en volumen total pero Jim tiene mejor ticket promedio. Michael no sabe a quién darle el premio principal y quiere que TÚ arbitres con números.',
                episodeReference: 'S02E01 - The Dundies (El episodio icónico de los premios en Chili\'s)',
                storyStakes: 'Jan Levinson estará en los Dundies. Si los premios son basados en datos reales, ella reportará positivamente a Corporate. Michael quiere lucirse. Si los datos están mal, Dwight no te lo perdonará JAMÁS.',
                previousMissionRecap: 'Importaste datos de ventas (Misión 1, 68 transacciones), limpiaste el archivo de clientes (Misión 1B, Text.Proper y fechas). Ahora usarás esos datos de ventas para crear medidas de SUM y AVERAGE.',
                introNarrative: `🏆 Michael te convoca a su oficina. Tiene traje nuevo y un micrófono de karaoke sobre el escritorio.

"¡Escucha! Los Dundies son ESTA semana. Es como los Oscar pero mejor, porque yo soy el presentador. Y este año, voy a hacer algo REVOLUCIONARIO."

*Hace una pausa dramática*

"Premios basados en DATOS REALES. Nada de 'Mejor Peinado' o 'Más Probable de Ser Confundido con un Hobbit'. No. Este año quiero NÚMEROS. Jan estará ahí y quiero que vea que esta oficina es SERIA."

Dwight irrumpe: "¡EXCELENTE! Yo ganaré todos los premios. Mis ventas son superiores en todo aspecto."
Jim, desde la puerta: "Yo no sé... depende de cómo midas 'superior'."
Dwight: "Total de ventas. SUM. Es matemática básica, Jim."
Jim: "¿Y si medimos por PROMEDIO por venta? Porque yo tengo menos ventas pero de mayor valor."
Dwight: "Eso es... eso es irrelevante."
Michael: "¡Silencio los dos! Para ESO está nuestro analista de datos. ¿Puedes calcular AMBAS cosas y decirme quién gana en cada categoría?"

Kevin levanta la mano: "¿Puedo tener un premio por comer más pretzels?"
Michael: "...Eso no tiene datos. Pero podemos hacer una medida de pretzels si quieres."

Stanley, sin levantar la vista de su crucigrama: "No me importa. Solo quiero irme a casa temprano."`,
                outroNarrative: `🎤 ¡Noche de los Dundies en Chili's!

Michael, con spotlight y micrófono: "¡DAMAS Y CABALLEROS! ¡Los Dundies 2024 — EDICIÓN DATA-DRIVEN!"

*Abre tu dashboard en el proyector portátil*

"El premio 'Vendedor Supremo por Volumen Total' es para... \n¡DWIGHT K. SCHRUTE!"
Dwight: *se levanta, hace reverencia militar, agradece a su granja de remolacha*

"El premio 'Ticket de Oro — Mejor Promedio por Venta' es para...\n¡JIM HALPERT!"
Jim: *mira a la cámara, medio sonríe* "Gracias. Se lo dedico a la venta de papel que le hice al hospital."

Dwight: "¡PROTESTO! El volumen total es más importante que—"
Jim: "Dwight, tú ganaste TU premio. Yo gané el mío."
Michael: "¡SILENCIO! Los datos han hablado. Y los datos no mienten."

Stanley ganó "Mejor Vendedor de los Viernes" (solo vende bien los viernes antes de su crucigrama).
Kevin ganó "Mejor Comedor de Pretzels" (sin datos, pero Michael le hizo un certificado igual).
Phyllis se llevó "Consistencia de Oro" (vende parejo todos los meses).

Jan, desde su asiento, levanta su copa: "Debo admitir... esto fue mucho mejor que el año pasado."

Pero en la mesa de Dwight y Jim, la tensión es palpable. Dwight susurra: "Esto no ha terminado. Vamos a ver quién vende más en el segmento PREMIUM."

*La rivalidad acaba de escalar. Y tú tendrás que arbitrarla con CALCULATE.*`,
                skillsDemo: ['dax-sum-avg'],
                wrongAnswerPenalty: 0.02,

                // CAMPOS PEDAGÓGICOS
                learningObjectives: [
                    'Entender la diferencia entre SUMA y PROMEDIO',
                    'Crear medidas DAX que calculan totales',
                    'Usar visualizaciones para comparar personas',
                    'Aplicar formato condicional para resaltar ganadores'
                ],
                prerequisiteKnowledge: [
                    'Haber completado Misión 1 (importar y crear medidas básicas)',
                    'Saber qué es una medida en Power BI'
                ],
                realWorldAnalogy: '🧾 Imagina que quieres saber quién es el mejor mesero de un restaurante. Puedes medirlo de 2 formas: 1) ¿Quién vendió MÁS en total? (SUMA) o 2) ¿Quién tiene el ticket promedio más alto? (PROMEDIO). Son preguntas diferentes con respuestas diferentes.',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es SUM?',
                        explanation: 'Suma TODOS los números de una columna. Si tienes ventas de $100, $200, $150, SUM = $450.',
                        emoji: '➕'
                    },
                    {
                        concept: '¿Qué es AVERAGE?',
                        explanation: 'Calcula el PROMEDIO (suma ÷ cantidad). Con $100, $200, $150, AVERAGE = $150 (450÷3).',
                        emoji: '📊'
                    },
                    {
                        concept: '¿Cuál es mejor?',
                        explanation: 'Depende de la pregunta. SUM para volumen total. AVERAGE para eficiencia por transacción.',
                        emoji: '🤔'
                    }
                ],

                objectives: [
                    'Medida: TotalVentas = SUM(Sales)',
                    'Medida: TicketPromedio = AVERAGE(Sales)',
                    'Ranking de vendedores por Total y Promedio',
                    'Visualizar en gráfico de barras'
                ],
                datasets: ['office_sales'],
                guide: [
                    '📁 PASO 1: Usa el mismo archivo "office_sales" de la misión anterior (o descárgalo de nuevo).',
                    '🧮 PASO 2: Crea una nueva medida: TotalVentas = SUM(office_sales[Amount])',
                    '📊 PASO 3: Crea otra medida: TicketPromedio = AVERAGE(office_sales[Amount])',
                    '📈 PASO 4: Arrastra un "Gráfico de barras agrupadas" al lienzo (panel Visualizaciones).',
                    '🎯 PASO 5: Arrastra "Salesperson" al eje Y, y "TotalVentas" al eje X.',
                    '👀 PASO 6: ¿Quién tiene la barra más larga? ¡Ese es el ganador por volumen!',
                    '🔄 PASO 7: Ahora cambia TotalVentas por TicketPromedio. ¿El ranking cambió?',
                    '🎨 PASO 8: Para formato condicional: click derecho en la barra > "Formato condicional" > "Colores de fondo".',
                    '✅ PASO 9: Configura que el más alto sea verde y el más bajo sea rojo.',
                    '🏆 PASO 10: ¡Ya tienes los datos para los Dundies!'
                ],
                checkpoints: [
                    {
                        afterStep: 3,
                        question: '¿Las dos medidas (TotalVentas y TicketPromedio) aparecen en el panel Campos?',
                        successMessage: '¡Excelente! Ahora puedes usarlas en cualquier gráfico.',
                        failureHint: 'Ve a Modelado > Nueva medida. Escribe la fórmula completa y presiona Enter.'
                    },
                    {
                        afterStep: 6,
                        question: '¿Puedes identificar quién tiene el mayor total de ventas?',
                        successMessage: '¡Perfecto! Mira la barra más larga.',
                        failureHint: 'Asegúrate de que "TotalVentas" esté en el eje X y "Salesperson" en el eje Y.'
                    }
                ],
                tips: [
                    '🏅 MAX y MIN sirven para encontrar el valor más alto/bajo individual.',
                    '🎨 El formato condicional ayuda a Michael a leer rápido.',
                    '📊 Una matriz (tabla) también funciona para comparar múltiples métricas.'
                ],

                // ========== CONTENIDO PREMIUM EXPANDIDO ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'SUM vs AVERAGE: La gran diferencia',
                            content: '📊 SUM = ¿Cuánto en TOTAL?\n📊 AVERAGE = ¿Cuánto por TRANSACCIÓN en promedio?\n\nEjemplo:\nDwight: 10 ventas de $1,000 = Total $10,000, Promedio $1,000\nJim: 5 ventas de $1,500 = Total $7,500, Promedio $1,500\n\n¿Quién es "mejor"? Depende de lo que valores.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Otras funciones de agregación',
                            content: 'COUNT = Cuenta filas (cualquier dato)\nCOUNTA = Cuenta filas no vacías\nCOUNTROWS = Cuenta filas de una tabla\nMAX = El valor más alto\nMIN = El valor más bajo\nDISTINCTCOUNT = Cuenta valores únicos',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'AVERAGEX vs AVERAGE',
                            content: 'AVERAGE: Promedia una columna directamente\nAVERAGEX: Promedia una expresión calculada\n\nEjemplo avanzado:\nAVERAGEX(Ventas, Ventas[Cantidad] * Ventas[Precio])\n= Promedio de (cantidad × precio) por fila',
                            difficulty: 'advanced'
                        }
                    ],
                    interface: [
                        {
                            title: 'Creando gráficos de barras',
                            content: '📍 Panel Visualizaciones > Ícono de barras horizontales\n📍 Arrastra la dimensión (Vendedor) al eje Y\n📍 Arrastra la medida (TotalVentas) al eje X\n💡 Las barras horizontales son mejores para nombres largos',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Formato condicional paso a paso',
                            content: '1. Selecciona el gráfico\n2. Panel Formato > Barras de datos\n3. O: Click derecho en la barra > Formato condicional\n4. Elige "Escala de colores"\n5. Verde = Alto, Rojo = Bajo (o al revés)',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Atajos para medidas',
                            content: 'Alt + Enter = Nueva línea en la fórmula (para fórmulas largas)\nCtrl + Shift + F = Formatear fórmula DAX\nTab = Aceptar autocompletado',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'AVERAGE da un número inesperado',
                            content: 'Posibles causas:\n1. Hay celdas vacías (AVERAGE las ignora)\n2. Hay CEROS que SÍ se cuentan\n3. Confundiste con AVERAGEA (cuenta texto como 0)\n\nSolución: Revisa los datos crudos primero',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'El gráfico muestra "En blanco"',
                            content: 'Causa: Hay filas donde el vendedor está vacío\n\nSolución:\n1. Filtra en el gráfico: Ícono de embudo > Excluir "En blanco"\n2. O limpia los datos en Power Query',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Usa una Matriz para comparar',
                            content: 'Una tabla Matriz puede mostrar vendedores en filas Y múltiples medidas en columnas:\n\n| Vendedor | Total | Promedio | # Ventas |\n|----------|-------|----------|----------|\n| Dwight   | $10K  | $1,000   | 10       |\n| Jim      | $7.5K | $1,500   | 5        |\n\nMucho más poderoso que solo barras.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Agrega un ranking',
                            content: 'Fórmula para ranking:\nRankVentas = RANKX(ALL(Vendedores), [TotalVentas])\n\nEsto muestra "1" para el mejor, "2" para el segundo, etc.',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'Métricas de vendedores en empresas reales',
                            content: 'Las empresas miden vendedores por:\n- Ventas totales (SUM)\n- Ticket promedio (AVERAGE)\n- # de transacciones (COUNT)\n- Tasa de conversión (%)\n- Retención de clientes\n\nUn buen vendedor equilibra volumen Y calidad.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                commonMistakesRef: 'dax-sum-avg',

                whyItMatters: {
                    title: '¿Por qué SUM y AVERAGE son fundamentales?',
                    reason: 'Son las operaciones más comunes en análisis de datos. El 90% de los reportes empresariales usan totales y promedios.',
                    careerConnection: 'En cualquier entrevista de analista te pedirán calcular KPIs básicos. SUM y AVERAGE son tu pan de cada día.',
                    realExample: 'Un gerente de ventas revisa su dashboard cada lunes. Lo primero que mira: ventas totales de la semana y ticket promedio. Tú le darás esos números.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo explicar cuándo usar SUM vs AVERAGE?',
                        criteria: 'Deberías poder decir: "SUM para volumen total, AVERAGE para eficiencia por transacción".',
                        action: 'Practica con un ejemplo: Si alguien pregunta "quién es el mejor vendedor", pregunta de vuelta "¿mejor en qué?"'
                    },
                    {
                        question: '¿Puedo crear un gráfico de barras con ranking?',
                        criteria: 'Deberías poder hacer un gráfico ordenado de mayor a menor en menos de 1 minuto.',
                        action: 'Después de crear el gráfico, haz click en los 3 puntos > Ordenar > Por TotalVentas > Descendente.'
                    }
                ],

                interfaceGuide: {
                    nuevaMedida: 'Modelado > Nueva medida (o click derecho en tabla > Nueva medida)',
                    graficoBarras: 'Panel Visualizaciones > Ícono de barras horizontales',
                    formatoCondicional: 'Selecciona gráfico > Panel Formato > Colores de datos > fx (formato condicional)',
                    ordenar: 'Click en gráfico > 3 puntos (arriba derecha) > Ordenar por'
                },

                expectedOutcome: 'Ranking claro: Dwight #1 en volumen, Jim buen ticket promedio.',

                // ============ NEUROCIENCIA: Misión 2 ============
                neuroLearning: {
                    cognitiveLoad: 'medium',
                    techniquesSummary: 'Priming situacional (Dundies) → Contraste SUM/AVERAGE → Generación efecto → Interleaving profundo',
                    scienceFact: 'El "testing effect" (Roediger & Karpicke, 2006) es contundente: evaluarte a ti mismo produce 50% más retención que releer. Cada Recall Challenge fortalece la memoria más que volver a leer los conceptos.',

                    priming: {
                        questions: [
                            {
                                question: 'Si quieres saber quién es el "mejor" vendedor, ¿cómo lo medirías? ¿Total vendido o promedio por venta?',
                                placeholder: 'Piensa en una respuesta...',
                                insight: '¡No hay respuesta única! Esa ambigüedad es el punto. Dwight vende MÁS en total, pero Jim tiene mejor promedio por venta. SUM y AVERAGE cuentan historias diferentes.'
                            },
                            {
                                question: '(Repaso) Escribe de memoria la fórmula para crear una medida que cuente filas.',
                                placeholder: 'MiMedida = ...',
                                insight: 'COUNTROWS(nombre_tabla). Si lo recordaste, ¡tu memoria a largo plazo ya lo tiene! Si no, no pasa nada — el intento de recordar ya fortaleció la conexión neuronal.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '➕',
                            title: 'SUM — El volumen total',
                            content: 'Suma TODOS los valores. SUM(tabla[columna]) = "¿cuánto en total?". Dwight vendió $150K en total. Jim vendió $120K.',
                            visualHint: 'Piensa en una báscula que pesa todo junto. No importa cuántas piezas haya.',
                            analogy: 'Como contar todo el dinero en una billetera — no importa cuántos billetes, solo el total.'
                        },
                        {
                            emoji: '📊',
                            title: 'AVERAGE — La eficiencia',
                            content: 'Divide la suma entre la cantidad. AVERAGE = SUM ÷ COUNT. Jim vende menos veces pero por más dinero cada vez ($1,500 promedio vs $1,000 de Dwight).',
                            visualHint: 'Piensa en la nota promedio de un estudiante: importa el rendimiento por examen, no solo el total.',
                            analogy: 'Como evaluar a un jugador de basketball: ¿importa más el total de puntos en la temporada o los puntos por partido?'
                        },
                        {
                            emoji: '🤔',
                            title: '¿Cuándo usar cada una?',
                            content: '"¿Cuánto vendimos?" → SUM. "¿Qué tan grande es cada venta?" → AVERAGE. "¿Cuántas ventas hicimos?" → COUNTROWS. Cada pregunta tiene su función.',
                            visualHint: 'Primero piensa la PREGUNTA, luego elige la FUNCIÓN. No al revés.',
                            analogy: 'Como elegir la herramienta correcta: martillo (SUM para golpear fuerte), cinta métrica (AVERAGE para medir eficiencia), contador (COUNT).'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: 'Si Phyllis hizo 8 ventas que suman $6,400, ¿cuál es su promedio?',
                            answer: '$800 — porque 6400 ÷ 8 = 800',
                            explanation: 'AVERAGE = SUM ÷ COUNT. Es la fórmula más fundamental de estadística.'
                        },
                        {
                            question: '¿SUM o AVERAGE para responder "¿cuánto facturamos este mes"?',
                            answer: 'SUM — porque queremos el TOTAL acumulado, no el promedio por venta.',
                            explanation: 'El total de facturación siempre es SUM. La eficiencia por transacción es AVERAGE.'
                        },
                        {
                            question: '(Repaso M1B) ¿Qué función convierte "DWIGHT SCHRUTE" en "Dwight Schrute"?',
                            answer: 'Text.Proper — primera letra mayúscula, resto minúscula.',
                            explanation: '¡Interleaving de misión anterior! Nombres limpios son esenciales para que tus medidas agrupen bien.'
                        },
                        {
                            question: '(Repaso M1) ¿Qué significa el ícono ABC junto a una columna?',
                            answer: 'Que la columna es de tipo TEXTO. Si debería ser número o fecha, hay que cambiar el tipo.',
                            explanation: 'Si "Amount" tiene ícono ABC, SUM no funcionará. Los tipos de datos correctos son prerequisito.'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué un gerente querría ver SUM Y AVERAGE al mismo tiempo, en lugar de solo uno?',
                            expertAnswer: 'Porque cuentan historias complementarias. Un vendedor con SUM alto pero AVERAGE bajo (Dwight) vende mucho en volumen pero ticket pequeño. Un vendedor con SUM bajo pero AVERAGE alto (Jim) cierra pocas ventas pero de alto valor. El gerente necesita AMBAS perspectivas para tomar decisiones: ¿necesita más volumen? → Contrate más Dwights. ¿Necesita tickets más altos? → Promueva la estrategia de Jim.'
                        },
                        {
                            question: '¿Puede AVERAGE darte un resultado engañoso? ¿En qué caso?',
                            expertAnswer: 'Sí — cuando hay valores extremos (outliers). Ejemplo: 5 ventas de $100 y 1 venta de $10,000. AVERAGE = $1,750, pero la mayoría de ventas fueron de $100. La mediana ($100) sería más representativa. Por eso los analistas avanzados usan MEDIANX además de AVERAGE para tener el panorama completo.'
                        }
                    ]
                },

                verification: [
                    { question: "¿Quién tiene la mayor venta TOTAL?", type: "choice", options: ["Dwight Schrute", "Jim Halpert", "Phyllis Vance", "Stanley Hudson"], answer: "Dwight Schrute", hint: "Ordena por suma de Amount. Dwight es el vendedor más agresivo de la oficina.", academyHint: "Crea un gráfico de barras arrastrando Salesperson y Amount para ver quién vende más." },
                    { question: "¿Cuál es el ticket promedio global?", type: "number", answer: 6945, hint: "AVERAGE de toda la tabla." },
                    { question: "¿Qué función DAX calcula PROMEDIO?", type: "choice", options: ["AVERAGE", "SUM", "COUNT", "MEDIAN"], answer: "AVERAGE", hint: "AVERAGE es la misma palabra en inglés para 'promedio'.", academyHint: "Revisa la carta 'AVERAGE' en tu mazo de cartas." },
                    { question: "¿SUM o AVERAGE para saber volumen total de ventas?", type: "choice", options: ["SUM", "AVERAGE"], answer: "SUM", hint: "Volumen = cantidad total acumulada." },
                    { question: "Si Jim vende 5 veces por $1000 cada una, ¿cuál es su promedio?", type: "number", answer: 1000, hint: "Promedio = Total ÷ Cantidad = 5000 ÷ 5." },
                    { question: "¿Qué tipo de gráfico usas para comparar vendedores?", type: "choice", options: ["Gráfico de líneas", "Gráfico de barras", "Gráfico circular"], answer: "Gráfico de barras", hint: "Las barras permiten comparar categorías fácilmente." }
                ],
                winImage: '/images/story/office-2-win.png'
            },
            {
                id: 'office-3',
                title: 'La Rivalidad: Dwight vs Jim',
                chapter: 3,
                level: 2,
                requires: ['office-2'],
                xp: 500,
                coins: 150,
                description: 'Usa CALCULATE y FILTER para arbitrar la guerra de ventas.',
                storyContext: 'Después de los Dundies, la rivalidad entre Dwight y Jim ha escalado al nivel nuclear. Dwight pegó un gráfico hecho a mano en su pared mostrando sus ventas totales. Jim pegó otro mostrando su promedio por venta. Michael está harto: quiere una respuesta DEFINITIVA. Pero la pregunta real es más compleja: Dwight dice que vende más "Calidad Premium" (el producto más caro), Jim dice que Dwight solo vende volumen barato de "Standard Copy". Para resolver esto, necesitas CALCULATE: una función que te permite filtrar datos específicos DENTRO de una medida. Es la función más poderosa de DAX y la que separa a los principiantes de los intermedios.',
                episodeReference: 'S02E06 - The Fight + S03E01 - Gay Witch Hunt (La tensión constante entre el dúo icónico)',
                storyStakes: 'Michael ha amenazado con "reorganizar el equipo de ventas" si la rivalidad no se resuelve con datos objetivos. Dwight y Jim miran cada uno de tus gráficos con lupa. Si tu análisis es parcial, uno de los dos se quejará con Corporate.',
                previousMissionRecap: 'En los Dundies (Misión 2), creaste medidas de SUM y AVERAGE. Dwight ganó en volumen, Jim en promedio. Ahora necesitas ir más profundo: filtrar por PRODUCTO y por TIEMPO usando CALCULATE.',
                introNarrative: `⚔️ Llegas a la oficina y la tensión se puede cortar con un cuchillo.

Dwight tiene un mapa de ventas clavado en su pared con chinchetas rojas:
"¡Mira! Cada chincheta es una venta PREMIUM que yo cerré. ¿Cuántas chinchetas tiene Jim? CERO. Porque Jim vende papel barato a mediocres."

Jim, calmado como siempre, mira a la cámara:
"Dwight tiene un mapa con chinchetas de sus ventas. Lo cual sería impresionante... si no hubiera puesto chinchetas aleatorias para que se viera más lleno."

Dwight: "¡FALSO! ¡Cada chincheta está ubicada geográficamente!"
Jim: "Dwight, una de tus chinchetas está en medio del océano Atlántico."
Dwight: "...Tengo un cliente en un barco."

Michael entra:
"OKAY. Estoy HARTO de esta pelea. Nuestro analista de datos va a resolver esto de una vez por todas. Quiero saber:
1) ¿Quién vende más en TOTAL?
2) ¿Quién vende más en PREMIUM?
3) ¿Hubo algún mes donde Jim SUPERÓ a Dwight?

Y quiero gráficos. Bonitos. Para ponerlos en mi pared."

Pam te pasa una nota: "CALCULATE es tu mejor amiga para esto. Te permite filtrar los datos DENTRO de la medida. Así puedes comparar Premium vs Standard para cada vendedor por separado. Tú puedes. 💪"`,
                outroNarrative: `📊 Los resultados están en la pantalla. Toda la oficina se ha reunido.

Michael lee en voz alta:
"Ventas TOTALES: Dwight gana por $13,610 de diferencia.
Ventas PREMIUM: Dwight gana también, PERO...
En MARZO, Jim superó a Dwight en ventas totales."

Dwight: "¡LO SABÍA! ¡SOY SUPERIOR!"
Jim: "Excepto en marzo. Y en promedio por venta."
Dwight: "El promedio es un concepto para MEDIOCRES que—"
Michael: "¡BASTA! Los datos dicen que es un empate técnico. Dwight gana en volumen, Jim gana en eficiencia. Los DOS son valiosos."

*Pausa. Dwight y Jim se miran. Por primera vez, hay un pequeño respeto mutuo.*

Pero afuera, Michael te detiene:
"Hey... entre nosotros. Hay un rumor. Stamford podría cerrar y nos van a fusionar. Si eso pasa, voy a necesitar que integres DOS bases de datos. ¿Puedes con eso?"

*Se acercan tiempos de cambio. Y necesitarás DISTINCTCOUNT y Append.*`,
                skillsDemo: ['dax-calculate'],
                wrongAnswerPenalty: 0.025,

                // CAMPOS PEDAGÓGICOS
                learningObjectives: [
                    'Entender qué es CALCULATE y por qué es la función más importante de DAX',
                    'Crear medidas que filtran datos específicos',
                    'Comparar el desempeño de diferentes personas o productos',
                    'Usar gráficos de líneas para ver tendencias en el tiempo'
                ],
                prerequisiteKnowledge: [
                    'Haber completado Misión 2 (SUM y AVERAGE)',
                    'Entender qué es una medida'
                ],
                realWorldAnalogy: '🔍 Imagina que quieres saber cuántas pizzas vendió la pizzería, pero SOLO las de pepperoni. No quieres el total de todas las pizzas, solo las de UN tipo. CALCULATE es como decirle a Power BI: "Calcula esto, PERO solo mira estos datos específicos".',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es CALCULATE?',
                        explanation: 'Es la función que MODIFICA qué datos se incluyen en un cálculo. Es como poner un filtro temporal.',
                        emoji: '🔮'
                    },
                    {
                        concept: '¿Cómo funciona?',
                        explanation: 'CALCULATE( [Medida], Filtro ). Primero dices QUÉ calcular, luego dices CON QUÉ DATOS.',
                        emoji: '⚙️'
                    },
                    {
                        concept: 'Ejemplo práctico',
                        explanation: 'CALCULATE([TotalVentas], Vendedor="Dwight") = Suma las ventas, pero SOLO las de Dwight.',
                        emoji: '💡'
                    }
                ],

                objectives: [
                    'Medida: VentasDwight = CALCULATE([TotalVentas], Salesperson="Dwight")',
                    'Medida: VentasPremium = CALCULATE([TotalVentas], Product="Premium")',
                    'Comparar desempeño mensual'
                ],
                datasets: ['office_sales'],
                guide: [
                    '📁 PASO 1: Usa el mismo archivo "office_sales" de las misiones anteriores.',
                    '🧮 PASO 2: Primero, asegúrate de tener tu medida TotalVentas = SUM(office_sales[Amount])',
                    '🎯 PASO 3: Crea medida: VentasDwight = CALCULATE([TotalVentas], office_sales[Salesperson]="Dwight Schrute")',
                    '🎯 PASO 4: Crea medida: VentasJim = CALCULATE([TotalVentas], office_sales[Salesperson]="Jim Halpert")',
                    '📊 PASO 5: Arrastra un gráfico de "Tarjeta" y pon VentasDwight. Arrastra otra tarjeta con VentasJim.',
                    '🔢 PASO 6: ¿Quién tiene más? Calcula la diferencia: Diferencia = [VentasDwight] - [VentasJim]',
                    '📈 PASO 7: Para el análisis mensual, arrastra un "Gráfico de líneas" al lienzo.',
                    '📅 PASO 8: Pon "Fecha" en el eje X. Pon VentasDwight y VentasJim en el eje Y.',
                    '👀 PASO 9: Busca el mes donde las líneas se cruzan. Ahí Jim superó a Dwight.',
                    '✅ PASO 10: ¡Ya puedes arbitrar la rivalidad con DATOS!'
                ],
                checkpoints: [
                    {
                        afterStep: 4,
                        question: '¿Tienes ambas medidas (VentasDwight y VentasJim) en el panel Campos?',
                        successMessage: '¡Excelente! Ahora puedes comparar a los rivales.',
                        failureHint: 'El texto del filtro debe coincidir EXACTAMENTE con el nombre en los datos.'
                    },
                    {
                        afterStep: 9,
                        question: '¿Encontraste el mes donde Jim superó a Dwight?',
                        successMessage: '¡Perfecto! Ese es el mes que buscas para la verificación.',
                        failureHint: 'Mira dónde la línea de Jim está ARRIBA de la línea de Dwight.'
                    }
                ],
                tips: [
                    '🔮 CALCULATE es LA función más poderosa de DAX. Domínala y dominarás Power BI.',
                    '⚠️ El texto del filtro debe coincidir EXACTAMENTE (mayúsculas incluidas).',
                    '📊 Puedes usar múltiples filtros: CALCULATE([Medida], Filtro1, Filtro2).'
                ],

                // ========== CONTENIDO PREMIUM EXPANDIDO ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'CALCULATE: El corazón de DAX',
                            content: 'CALCULATE hace DOS cosas:\n1. Evalúa una expresión (la medida)\n2. Modifica el contexto de filtro\n\nSin CALCULATE, las medidas respetan los filtros del dashboard.\nCon CALCULATE, TÚ controlas qué filtros aplican.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Anatomía de CALCULATE',
                            content: 'CALCULATE(\n   [Medida],           // ¿Qué calcular?\n   Tabla[Columna]="Valor"  // ¿Con qué filtro?\n)\n\nPuedes tener 0, 1 o muchos filtros.\nCALCULATE([TotalVentas]) = igual que [TotalVentas] (sin cambio)\nCALCULATE([TotalVentas], Año=2024) = solo 2024',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Múltiples filtros = AND',
                            content: 'CALCULATE(\n   [TotalVentas],\n   Vendedor="Dwight",\n   Producto="Premium"\n)\n= Ventas de Dwight Y que sean Premium\n\nLos filtros se combinan con AND (ambos deben cumplirse).',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'ALL: Ignorar filtros',
                            content: 'ALL() remueve filtros:\n\nCALCULATE([TotalVentas], ALL(Productos))\n= Total de ventas ignorando el filtro de producto actual\n\nÚtil para calcular % del total:\n% = [VentasActual] / CALCULATE([TotalVentas], ALL(Productos))',
                            difficulty: 'advanced'
                        }
                    ],
                    interface: [
                        {
                            title: 'Gráficos de líneas temporales',
                            content: '📍 Panel Visualizaciones > Ícono de línea\n📍 Eje X = Fecha (Power BI crea jerarquía automática)\n📍 Valores = Tu medida\n📍 Leyenda = Para comparar múltiples series',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Tarjetas para métricas clave',
                            content: '📍 Panel Visualizaciones > Ícono de tarjeta (número grande)\n📍 Arrastra UNA medida al campo "Valores"\n📍 Resultado: Un número grande y claro\n💡 Ideal para KPIs: Total Ventas, # Clientes, etc.',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Tip para escribir filtros exactos',
                            content: 'En lugar de escribir "Dwight Schrute" a mano:\n1. Ve a Vista Datos\n2. Encuentra el valor exacto en la columna\n3. Cópialo (Ctrl+C)\n4. Pégalo en tu fórmula\n\n¡Evita errores de tipeo!',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'CALCULATE no filtra nada',
                            content: 'Posibles causas:\n1. El texto no coincide EXACTAMENTE (mayúsculas, espacios)\n2. La columna tiene espacios al inicio/final\n3. Escribiste el nombre de la tabla mal\n\nSolución: Copia el valor EXACTO de los datos.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Error de dependencia circular',
                            content: 'Mensaje: "Se detectó una dependencia circular"\n\nCausa: La medida se referencia a sí misma directa o indirectamente.\n\nSolución:\n1. Usa otra medida como base\n2. O usa VAR para calcular valores antes de usarlos',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'El filtro no funciona con fechas',
                            content: 'Para filtrar por fecha:\n\nNo: Fecha="01/01/2024" (texto)\nSí: Fecha=DATE(2024,1,1) (función)\n\nO usa funciones de tiempo:\nCALCULATE([TotalVentas], YEAR(Fecha)=2024)',
                            difficulty: 'intermediate'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Crea medidas paso a paso',
                            content: 'En lugar de:\nVentasPremiumDwightQ1 = CALCULATE([Total], Prod="Premium", Vend="Dwight", Qtr=1)\n\nCrea medidas intermedias:\n1. VentasPremium = CALCULATE([Total], Prod="Premium")\n2. VentasDwight = CALCULATE([Total], Vend="Dwight")\n3. Luego combina\n\nMás fácil de debuggear.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Usa SELECTEDVALUE para filtros dinámicos',
                            content: 'Medida = CALCULATE(\n   [TotalVentas],\n   Vendedor = SELECTEDVALUE(Vendedor[Nombre], "Todos")\n)\n\n= Si hay un slicer, usa ese valor. Si no, usa "Todos".',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'CALCULATE en reportes reales',
                            content: 'Uso #1: Comparar vs. año anterior\nVentasAñoAnterior = CALCULATE([TotalVentas], SAMEPERIODLASTYEAR(Fecha))\n\nUso #2: Porcentaje del total\n%Total = [Ventas] / CALCULATE([Ventas], ALL(Categoría))\n\nUso #3: Filtrar por segmento\nVentasVIP = CALCULATE([Ventas], Cliente[Tier]="VIP")',
                            difficulty: 'intermediate'
                        }
                    ]
                },

                commonMistakesRef: 'dax-calculate',

                whyItMatters: {
                    title: '¿Por qué CALCULATE es tan importante?',
                    reason: 'CALCULATE transforma medidas simples en análisis poderosos. Sin ella, no podrías comparar segmentos, calcular % del total, ni hacer análisis de tiempo.',
                    careerConnection: 'Los analistas que dominan CALCULATE pueden responder preguntas de negocio que otros no pueden. Es la diferencia entre hacer gráficos bonitos y dar insights.',
                    realExample: 'Un director pregunta: "¿Cómo se comparan las ventas de Premium vs Estándar este trimestre?" Solo con CALCULATE puedes responder en segundos.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo explicar qué hace CALCULATE?',
                        criteria: 'Deberías poder decir: "Calcula una medida aplicando filtros específicos".',
                        action: 'Explícaselo a alguien (o a ti mismo en voz alta). Si te trabas, relee el concepto.'
                    },
                    {
                        question: '¿Puedo crear un filtro con texto exacto?',
                        criteria: 'CALCULATE([Medida], Tabla[Columna]="ValorExacto") debería funcionar a la primera.',
                        action: 'Practica copiando valores exactos de los datos para evitar errores.'
                    },
                    {
                        question: '¿Sé combinar múltiples filtros?',
                        criteria: 'CALCULATE([Medida], Filtro1, Filtro2) debería aplicar AMBOS.',
                        action: 'Practica: Crea una medida con 2 filtros diferentes y verifica que ambos aplican.'
                    }
                ],

                interfaceGuide: {
                    graficoLineas: 'Panel Visualizaciones > Ícono de línea - Para tendencias temporales',
                    tarjeta: 'Panel Visualizaciones > Ícono de número - Para mostrar un KPI grande',
                    vistaModelo: 'Ctrl + 3 - Para ver relaciones entre tablas (útil para contexto)',
                    vistaDatos: 'Ctrl + 2 - Para ver los valores exactos y copiarlos para filtros'
                },

                expectedOutcome: 'Dwight gana en total, Jim gana en meses específicos.',

                // ============ NEUROCIENCIA: Misión 3 ============
                neuroLearning: {
                    cognitiveLoad: 'high',
                    techniquesSummary: 'Priming con analogía profunda → Scaffolding CALCULATE → Generación progresiva → Recall acumulativo',
                    scienceFact: 'El "scaffolding" (Vygotsky, 1978) usa la "zona de desarrollo próximo": construir sobre lo que ya sabes para alcanzar lo que aún no dominas. CALCULATE combina SUM + filtros, conceptos que ya manejas. Lo nuevo es solo la SINTAXIS.',

                    priming: {
                        questions: [
                            {
                                question: 'Si quisieras saber cuánto vendió SOLO Dwight (no todos), ¿cómo le dirías a Power BI que filtre?',
                                placeholder: 'Algo como: suma de ventas pero solo donde el vendedor sea...',
                                insight: '¡Acabas de inventar CALCULATE! La función dice exactamente eso: "Calcula [esto], pero solo donde [condición]". CALCULATE([TotalVentas], Vendedor="Dwight"). Tu intuición ya entiende el concepto.'
                            },
                            {
                                question: '(Repaso) Escribe de memoria: ¿Cuál es la diferencia entre SUM y AVERAGE?',
                                placeholder: 'SUM hace... AVERAGE hace...',
                                insight: 'SUM = total acumulado. AVERAGE = total ÷ cantidad. Si los recordaste, tu memoria de trabajo está lista para el siguiente nivel: CALCULATE usa estas funciones como base y les agrega filtros.'
                            },
                            {
                                question: '¿Puedes pensar en 2 preguntas de negocio que necesiten filtrar datos específicos?',
                                placeholder: 'Ej: ¿Cuánto vendió X? ¿Cuánto vendimos de producto Y?',
                                insight: 'Cada pregunta que requiere "solo de X" o "solo en Y" necesita CALCULATE. Es LA función que separa a principiantes de intermedios porque permite responder preguntas específicas del negocio.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '🔮',
                            title: 'CALCULATE = Medida + Filtro',
                            content: 'Sintaxis: CALCULATE( [Medida], Condición ). Primero dice QUÉ calcular (SUM, AVERAGE, etc.), luego CON QUÉ datos (filtro).',
                            visualHint: 'Piénsalo como 2 instrucciones: 1) ¿Qué operación? 2) ¿Sobre qué subconjunto de datos?',
                            analogy: 'Como pedir en un restaurante: "Tráeme la cuenta (medida) pero solo de las bebidas (filtro)".'
                        },
                        {
                            emoji: '⚙️',
                            title: 'La sintaxis exacta',
                            content: 'CALCULATE([TotalVentas], tabla[Columna]="Valor"). Nota: el valor de texto va entre comillas dobles. El nombre de columna va entre corchetes con tabla.',
                            visualHint: 'TIP: Copia el valor EXACTO de Vista Datos para evitar errores de tipeo. Las mayúsculas importan.',
                            analogy: 'Como buscar un contacto en tu teléfono: si escribes "dwight" pero el contacto es "Dwight", no lo encuentra.'
                        },
                        {
                            emoji: '🔢',
                            title: 'Múltiples filtros = AND',
                            content: 'CALCULATE([Medida], Filtro1, Filtro2) = aplica AMBOS filtros. Ejemplo: ventas de Dwight Y que sean de producto Premium.',
                            visualHint: 'Cada coma es un "Y además". Más filtros = datos más específicos.',
                            analogy: 'Como pedir "pizza (filtro 1) de pepperoni (filtro 2) tamaño grande (filtro 3)" — cada filtro hace la selección más específica.'
                        },
                        {
                            emoji: '📈',
                            title: 'Gráficos temporales para comparar',
                            content: 'Un gráfico de líneas con Fecha en eje X y medidas de cada persona en eje Y muestra cuándo uno supera al otro. Busca donde las líneas se cruzan.',
                            visualHint: 'Panel Visualizaciones → ícono de línea. Arrastra Fecha al eje X, ambas medidas al eje Y.',
                            analogy: 'Como 2 corredores en una pista: el gráfico de líneas muestra en qué punto uno le sacó ventaja al otro.'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: 'Escribe de memoria la medida para "ventas totales solo de Dwight".',
                            answer: 'VentasDwight = CALCULATE([TotalVentas], office_sales[Salesperson]="Dwight Schrute")',
                            explanation: 'La estructura siempre es: NombreMedida = CALCULATE([MedidaBase], tabla[columna]="valor"). Practica hasta que salga automático.'
                        },
                        {
                            question: '¿Cómo agregas un SEGUNDO filtro a CALCULATE? (ej: Dwight + solo Premium)',
                            answer: 'Agregas una coma: CALCULATE([TotalVentas], Salesperson="Dwight", Product="Premium")',
                            explanation: 'Los filtros se separan con comas. Cada coma = "Y además". No hay límite de filtros.'
                        },
                        {
                            question: '(Repaso M2) ¿Cuál es el resultado de AVERAGE si tienes ventas de $100, $200, $300?',
                            answer: '$200 — porque (100+200+300)÷3 = 200',
                            explanation: '¡Interleaving! AVERAGE divide la suma entre el conteo. CALCULATE puede usar AVERAGE como medida base también.'
                        },
                        {
                            question: '(Repaso M1) ¿Para qué sirve COUNTROWS?',
                            answer: 'Para contar el NÚMERO de filas de una tabla (sin importar qué valores tengan).',
                            explanation: '¡Recall de 2 misiones atrás! Si lo recordaste, la memoria ya está consolidada a largo plazo.'
                        },
                        {
                            question: '(Repaso M1B) ¿Cuál es el orden correcto para limpiar nombres: Clean, Trim, Proper?',
                            answer: 'Sí: Clean → Trim → Proper. De adentro hacia afuera: Text.Proper(Text.Trim(Text.Clean([Nombre])))',
                            explanation: '¡Recall acumulativo! Cada misión que recuerdas refuerza la red de conexiones neuronales.'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué CALCULATE es considerada la función MÁS importante de DAX? ¿Qué no podrías hacer sin ella?',
                            expertAnswer: 'Sin CALCULATE, las medidas solo responden preguntas generales ("ventas totales"). Con CALCULATE, puedes responder preguntas de negocio específicas ("ventas de X en periodo Y del producto Z"). Además, es la base de funciones avanzadas: % del total (ALL), comparación año anterior (SAMEPERIODLASTYEAR), KPIs condicionales... Todo se construye SOBRE CALCULATE.'
                        },
                        {
                            question: '¿En qué se parece y en qué se diferencia CALCULATE de un filtro visual (slicer) en el dashboard?',
                            expertAnswer: 'Un slicer filtra TEMPORALMENTE según lo que el usuario seleccione. CALCULATE filtra PERMANENTEMENTE dentro de la fórmula. El slicer depende del usuario; CALCULATE está "incrustado" en la medida. Ventaja de CALCULATE: puedes tener una tarjeta que SIEMPRE muestre las ventas de Dwight, sin importar qué filtros tenga el dashboard.'
                        }
                    ]
                },

                verification: [
                    { question: "¿Diferencia exacta ($) entre Dwight y Jim?", type: "number", answer: 13610, hint: "[VentasDwight] - [VentasJim]" },
                    { question: "¿Mes donde Jim superó a Dwight?", type: "choice", options: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"], answer: "Marzo", hint: "Mira el gráfico de líneas donde las líneas de Jim y Dwight se cruzan.", academyHint: "Crea un gráfico de líneas con Mes en el eje X y Amount por vendedor para ver el cruce." },
                    { question: "¿Qué función cambia el contexto de cálculo en DAX?", type: "choice", options: ["CALCULATE", "FILTER", "SUMMARIZE", "IF"], answer: "CALCULATE", hint: "CALCULATE es LA función más importante y poderosa de DAX. Modifica los filtros de un cálculo.", academyHint: "Revisa la carta 'CALCULATE' en tu mazo de cartas." },
                    { question: "¿CALCULATE va antes o después del filtro?", type: "choice", options: ["Antes: CALCULATE(medida, filtro)", "Después: filtro(CALCULATE(medida))"], answer: "Antes: CALCULATE(medida, filtro)", hint: "Sintaxis: CALCULATE( [Medida], Condición )." },
                    { question: "¿Cuántos filtros puede tener un CALCULATE?", type: "choice", options: ["Solo 1", "Máximo 2", "Ilimitados"], answer: "Ilimitados", hint: "CALCULATE([M], F1, F2, F3...) acepta múltiples filtros." },
                    { question: "¿Qué gráfico usas para ver tendencias en el tiempo?", type: "choice", options: ["Barras", "Líneas", "Circular"], answer: "Líneas", hint: "Las líneas muestran la evolución temporal claramente." }
                ],
                winImage: '/images/story/office-3-win.png'
            },
            {
                id: 'office-4',
                title: 'La Fusión (The Merger)',
                chapter: 4,
                level: 3,
                requires: ['office-3'],
                xp: 800,
                coins: 200,
                description: 'Integra los datos de Stamford. Usa Append y DISTINCTCOUNT.',
                storyContext: 'Corporate ha decidido cerrar la sucursal de Stamford, Connecticut. Todos sus empleados — incluyendo Andy Bernard (el que canta a cappella) y Karen Filippelli — llegarán a Scranton la próxima semana. Es el caos total: Andy ya está cantando en el estacionamiento, Stanley amenaza con renunciar por el ruido, y Michael intenta organizar un "Merger Party" con globos que dicen "Fusion = Fun". Pero el verdadero problema es técnico: Stamford tenía su propia base de datos de ventas con formato diferente al de Scranton. Necesitas fusionar ambos archivos en uno solo, verificar que no haya clientes duplicados, y calcular cuántos vendedores Únicos tiene ahora la "Super-Sucursal". Si los datos no cuadran, David Wallace no aprobará el presupuesto combinado.',
                episodeReference: 'S03E08 - The Merger (Uno de los episodios pivotales de la serie)',
                storyStakes: 'David Wallace quiere un reporte consolidado antes del viernes para presentarlo a la junta directiva. Si las ventas combinadas no justifican el costo de mantener a todo el personal, habrá despidos. Los datos que TÚ fusiones determinarán si todos conservan su trabajo.',
                previousMissionRecap: 'Resolviste la rivalidad Dwight vs Jim con CALCULATE (Misión 3). Ahora enfrentas un desafío diferente: combinar TABLAS completas, no solo filtrar una. Append + DISTINCTCOUNT serán tus herramientas.',
                introNarrative: `🏢 La oficina es un caos. Hay cajas por todos lados. Nuevos escritorios. Nuevas caras.

Andy Bernard entra cantando "Here Comes the Sun" a todo pulmón:
"¡Nard-Dog está en la casa! ¿Quién está listo para la FUSIÓN?" *choca los cinco con el aire*

Stanley, sin levantar la vista: "Nadie te preguntó."

Karen Filippelli se presenta educadamente: "Hola, soy Karen. Venía del equipo de Stamford. Espero que la transición sea... organizada."
Jim: "Sí... sobre eso..."
*Michael pasa corriendo con globos que dicen FUSIONADOS*

Dwight te intercepta en el pasillo:
"ESCUCHA. Tengo información clasificada. Stamford tenía 6 vendedores. Nosotros tenemos 8. Eso son 14... en teoría. Pero algunos de sus clientes también son NUESTROS clientes. Si no fusionas los datos correctamente, pareceremos más grandes de lo que somos y David Wallace nos asignará cuotas imposibles."

Michael aparece:
"¡Hey! David Wallace quiere un reporte COMBINADO. Scranton + Stamford en un solo archivo bonito. Y necesita saber: ¿cuántos vendedores únicos tenemos? ¿Cuántos clientes se repiten? ¿Las ventas combinadas justifican el costo?

Tienes 2 archivos en el USB: scranton_sales.csv y stamford_sales.csv. Haz que sean UNO SOLO."

Pam: "Yo te preparé un café extra fuerte. Lo vas a necesitar."`,
                outroNarrative: `🤝 Base de datos unificada. Los números están en la pantalla.

David Wallace (por videoconferencia):
"Déjame ver... 14 vendedores únicos. Ventas combinadas de $1,256,070. Scranton aporta el 70%, Stamford el 30%. Y hay 3 clientes que compraban en AMBAS sucursales."

David se reclina en su silla: "Esto es exactamente lo que necesitaba. Con estos números, puedo justificar el presupuesto combinado ante la junta. Buen trabajo, Scranton."

Michael hace su baile de victoria en la oficina.

Andy se acerca: "¡Eso fue INCREÍBLE! ¿Me puedes enseñar a hacer eso? Quiero hacer un dashboard de mis covers musicales."

Karen: "Es impresionante cómo identificaste los clientes duplicados. En Stamford no teníamos a nadie que hiciera esto."

Dwight, que aparenta indiferencia: "Sí, bueno... cualquiera con conocimientos básicos de fusiones de datos podría... está bien, fue un buen trabajo."

Pero cuando todos se van, Michael te llama a su oficina con expresión preocupada:
"Tenemos un PROBLEMA. Hice algo... quizás no tan inteligente. Le di 5 cupones de 10% de descuento a nuestro cliente más grande, Blue Cross. David Wallace se enteró y está FURIOSO. Necesito que me demuestres con números que no fue tan grave. ¿Puedes?"

*El desafío final de Dunder Mifflin se acerca. Día 89 de 90.*`,
                skillsDemo: ['dax-distinctcount'],
                wrongAnswerPenalty: 0.025,

                // CAMPOS PEDAGÓGICOS
                learningObjectives: [
                    'Entender cómo combinar tablas con "Anexar"',
                    'Usar DISTINCTCOUNT para contar valores únicos',
                    'Identificar duplicados entre fuentes de datos',
                    'Crear una columna de origen para rastrear datos'
                ],
                prerequisiteKnowledge: [
                    'Haber completado Misión 3 (CALCULATE)',
                    'Saber importar archivos en Power BI'
                ],
                realWorldAnalogy: '📚 Imagina que dos bibliotecas se fusionan. La Biblioteca A tiene 1000 libros, la B tiene 800. Cuando juntas los catálogos, ¿tienes 1800 libros o menos? Menos, porque algunos libros están en AMBAS bibliotecas. DISTINCTCOUNT te dice cuántos libros ÚNICOS tienes.',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es APPEND (Anexar)?',
                        explanation: 'Es pegar una tabla DEBAJO de otra. Como apilar dos hojas de Excel. Tabla A (100 filas) + Tabla B (50 filas) = Tabla Combinada (150 filas).',
                        emoji: '📋'
                    },
                    {
                        concept: '¿Qué es DISTINCTCOUNT?',
                        explanation: 'Cuenta solo valores ÚNICOS. Si "Juan" aparece 5 veces, lo cuenta como 1. Perfecto para contar clientes sin repetir.',
                        emoji: '🎯'
                    },
                    {
                        concept: '¿Por qué agregar columna "Origen"?',
                        explanation: 'Para saber de dónde viene cada fila después de fusionar. Útil para auditar y filtrar.',
                        emoji: '🏷️'
                    }
                ],

                objectives: [
                    'Anexar (Append) tablas de Stamford y Scranton',
                    'Crear columna "Origen"',
                    'Medida: ClientesUnicos = DISTINCTCOUNT(Cliente)',
                    'Analizar duplicidad de cartera'
                ],
                datasets: ['office_sales_merged'],
                guide: [
                    '📁 PASO 1: Descarga los dos archivos: "scranton_sales.csv" y "stamford_sales.csv".',
                    '📥 PASO 2: Importa AMBOS archivos en Power BI (Obtener datos > CSV, dos veces).',
                    '🔧 PASO 3: Click en "Transformar datos" para abrir Power Query.',
                    '➕ PASO 4: Selecciona la tabla de Scranton. Ve a "Inicio" > "Anexar consultas".',
                    '🔗 PASO 5: Selecciona "Stamford" en el desplegable. Click en "Aceptar".',
                    '📊 PASO 6: ¡La tabla ahora tiene filas de AMBAS sucursales!',
                    '🏷️ PASO 7: Antes de anexar, agrega columna personalizada: "Origen" = "Scranton" o "Stamford".',
                    '💾 PASO 8: "Cerrar y aplicar" para volver al informe.',
                    '🎯 PASO 9: Crea medida: VendedoresUnicos = DISTINCTCOUNT(TablaFusionada[Salesperson])',
                    '✅ PASO 10: Compara el total de filas (SUM) vs vendedores únicos (DISTINCTCOUNT).'
                ],
                checkpoints: [
                    {
                        afterStep: 6,
                        question: '¿Tu tabla combinada tiene más filas que cualquiera de las tablas originales?',
                        successMessage: '¡Perfecto! El Append funcionó correctamente.',
                        failureHint: 'Asegúrate de seleccionar la tabla correcta antes de hacer click en "Anexar".'
                    },
                    {
                        afterStep: 10,
                        question: '¿El número de vendedores únicos es menor que el número de filas?',
                        successMessage: '¡Exacto! DISTINCTCOUNT elimina las repeticiones.',
                        failureHint: 'Si son iguales, revisa que hayas usado DISTINCTCOUNT y no COUNTROWS.'
                    }
                ],
                tips: [
                    '📋 Verifica que las columnas tengan el MISMO nombre antes de anexar.',
                    '🎯 Si un cliente compra en ambas sucursales, DISTINCTCOUNT lo cuenta 1 vez.',
                    '🏷️ La columna "Origen" te permite filtrar por sucursal después.'
                ],

                // ========== CONTENIDO PREMIUM EXPANDIDO ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'Append vs Merge: La diferencia clave',
                            content: '📋 APPEND (Anexar): Pegar filas DEBAJO\nTabla A (100 filas) + Tabla B (50 filas) = 150 filas\n\n🔗 MERGE (Combinar): Pegar columnas AL LADO\nTabla A (100 filas, 3 cols) + Tabla B (match) = 100 filas, más columnas\n\nAppend = más filas, Merge = más columnas',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'DISTINCTCOUNT explicado',
                            content: 'COUNT: Cuenta TODAS las celdas (incluso repetidas)\nDISTINCTCOUNT: Cuenta valores ÚNICOS\n\nEjemplo: Cliente aparece 5 veces\n- COUNT = 5\n- DISTINCTCOUNT = 1\n\n¿Cuándo usar cuál?\n- ¿Cuántas transacciones? → COUNT\n- ¿Cuántos clientes? → DISTINCTCOUNT',
                            difficulty: 'beginner'
                        },
                        {
                            title: '¿Por qué agregar columna Origen?',
                            content: 'Después de fusionar, no sabrás de dónde vino cada fila.\n\nCon columna Origen:\n1. Puedes filtrar: "Mostrar solo Scranton"\n2. Puedes comparar: "Ventas Scranton vs Stamford"\n3. Puedes auditar: "¿De dónde vino este dato raro?"\n\n¡SIEMPRE agrega Origen antes de fusionar!',
                            difficulty: 'beginner'
                        }
                    ],
                    interface: [
                        {
                            title: 'Anexar consultas paso a paso',
                            content: '📍 En Power Query:\n1. Selecciona la tabla PRINCIPAL (izquierda)\n2. Inicio > Anexar consultas\n3. Elige la tabla secundaria del dropdown\n4. Click Aceptar\n\n💡 La tabla principal se modifica, la secundaria queda igual',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Agregar columna personalizada',
                            content: '📍 En Power Query:\n1. Agregar columna > Columna personalizada\n2. Nombre: "Origen"\n3. Fórmula: = "Scranton" (texto entre comillas)\n4. Click Aceptar\n\n💡 Hazlo ANTES de anexar, a cada tabla por separado',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Duplicar consulta antes de modificar',
                            content: 'Click derecho en la consulta > Duplicar\n\nAsí tienes una copia de seguridad.\nSi algo sale mal, elimina la modificada y trabaja con la copia.',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Las columnas no coinciden al anexar',
                            content: 'Síntoma: Después de anexar, algunas columnas tienen "null"\n\nCausa: Los nombres de las columnas son diferentes\n- "Salesperson" vs "Vendedor"\n- "Amount" vs "Monto"\n\nSolución: Renombra las columnas para que coincidan ANTES de anexar',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'DISTINCTCOUNT da número incorrecto',
                            content: 'Posibles causas:\n1. Espacios extra: "Juan " ≠ "Juan"\n2. Mayúsculas: "JUAN" ≠ "Juan"\n3. Typos: "Juan Peres" ≠ "Juan Perez"\n\nSolución: Limpia los datos con Text.Trim y Text.Proper ANTES de fusionar',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Detecta duplicados con agrupar',
                            content: 'En Power Query:\n1. Selecciona la columna (ej: Cliente)\n2. Inicio > Agrupar por\n3. Agrega columna "Cuenta" = Count Rows\n4. Filtra donde Cuenta > 1\n\n= Todos los valores que se repiten',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Valida la fusión con matemáticas',
                            content: 'Antes: Scranton = 100 filas, Stamford = 50 filas\nDespués: Fusionada debería = 150 filas\n\nSi Fusionada ≠ 150:\n- Menos = Se filtraron filas (revisa pasos)\n- Más = Algo se duplicó (revisa el append)',
                            difficulty: 'beginner'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'Fusiones de datos en la vida real',
                            content: 'Escenarios comunes:\n📊 Fusionar datos de diferentes regiones\n📊 Combinar histórico de diferentes años\n📊 Unir exportaciones de diferentes sistemas\n📊 Consolidar reportes de diferentes equipos\n\nSi dominas Append, resolverás el 50% de los problemas de datos.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'El problema de clientes compartidos',
                            content: 'Cuando fusionas sucursales, algunos clientes compran en ambas.\n\n¿Cuántos clientes tiene la empresa?\n- Mal: Clientes Scranton + Clientes Stamford (cuenta 2 veces)\n- Bien: DISTINCTCOUNT de todos los clientes (cuenta 1 vez)\n\nEste error cuesta millones en marketing mal dirigido.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué fusionar datos es una habilidad crítica?',
                    reason: 'Las empresas tienen datos en muchos sistemas diferentes. El 80% de los proyectos de BI empiezan con "tenemos datos en 5 lugares diferentes, necesitamos unirlos".',
                    careerConnection: 'Los analistas que saben consolidar datos de múltiples fuentes son los más valorados. Es la habilidad #1 que buscan en contrataciones.',
                    realExample: 'Una empresa adquiere otra. El primer proyecto: fusionar las bases de clientes para saber cuántos clientes únicos tienen (y cuántos se duplican).'
                },

                selfAssessment: [
                    {
                        question: '¿Sé la diferencia entre Append y Merge?',
                        criteria: 'Append = más filas, Merge = más columnas.',
                        action: 'Practica ambos con tablas pequeñas hasta que sea automático.'
                    },
                    {
                        question: '¿Recuerdo agregar columna Origen antes de fusionar?',
                        criteria: 'Debería ser el PRIMER paso antes de cualquier fusión.',
                        action: 'Crea una checklist: 1) Agregar Origen 2) Verificar nombres columnas 3) Anexar'
                    },
                    {
                        question: '¿Puedo usar DISTINCTCOUNT correctamente?',
                        criteria: 'DISTINCTCOUNT(Tabla[Columna]) debería funcionar a la primera.',
                        action: 'Practica: Compara COUNT vs DISTINCTCOUNT en la misma columna.'
                    }
                ],

                interfaceGuide: {
                    anexarConsultas: 'Power Query > Inicio > Anexar consultas (ícono de dos tablas apiladas)',
                    columnaPersonalizada: 'Power Query > Agregar columna > Columna personalizada',
                    agruparPor: 'Power Query > Inicio > Agrupar por (para detectar duplicados)',
                    conteoFilas: 'Barra inferior de Power Query muestra "X filas cargadas"'
                },

                expectedOutcome: 'Reporte consolidado. Scranton aporta 70%, Stamford 30%.',

                // ============ NEUROCIENCIA: Misión 4 ============
                neuroLearning: {
                    cognitiveLoad: 'high',
                    techniquesSummary: 'Scaffolding sobre M1B (limpieza) + M3 (CALCULATE) → Chunking nuevos conceptos → Recall acumulativo masivo',
                    scienceFact: 'La "consolidación de memoria" (McGaugh, 2000) muestra que el sueño entre sesiones de estudio permite al hipocampo transferir conocimiento a la corteza. Las misiones previas que aprendiste se están convirtiendo en conocimiento permanente — ahora construimos SOBRE ellas.',

                    priming: {
                        questions: [
                            {
                                question: '¿Cómo combinarías dos listas de contactos (una del trabajo, otra personal) sin repetir personas?',
                                placeholder: 'Pegar una debajo de otra y luego...',
                                insight: '¡Exacto! Primero las "pegas" una debajo de otra (eso es APPEND) y luego identificas duplicados (eso es DISTINCTCOUNT). Acabas de describir lo que harás en esta misión.'
                            },
                            {
                                question: '(Repaso acumulativo) ¿Qué función filtra datos DENTRO de una medida?',
                                placeholder: 'C...',
                                insight: 'CALCULATE([Medida], Filtro). La usarás HOY para comparar ventas Scranton vs Stamford.'
                            },
                            {
                                question: '(Repaso) Si vas a combinar 2 tablas, ¿qué deberías limpiar PRIMERO?',
                                placeholder: 'Los nombres... las fechas...',
                                insight: '¡Interleaving de M1B! Limpia nombres (Text.Proper, Text.Trim) y fechas ANTES de combinar. Si no, "JUAN" y "Juan" aparecerán como 2 personas distintas al contar con DISTINCTCOUNT.'
                            }
                        ]
                    },

                    chunks: [
                        {
                            emoji: '📋',
                            title: 'APPEND = Apilar tablas (más filas)',
                            content: 'En Power Query: Selecciona tabla A → Inicio → Anexar consultas → Elige tabla B. Resultado: todas las filas de A + todas las filas de B.',
                            visualHint: 'Imagina dos bloques de Lego que encajas uno encima del otro. Mismas columnas, más filas.',
                            analogy: 'Como juntar dos mazos de cartas en uno solo: mismo tipo de cartas, más cartas en total.'
                        },
                        {
                            emoji: '🎯',
                            title: 'DISTINCTCOUNT = Contar sin repetir',
                            content: 'DISTINCTCOUNT(tabla[columna]) cuenta cuántos valores ÚNICOS hay. Si "Jim" aparece 10 veces, lo cuenta como 1.',
                            visualHint: 'COUNT = cuenta todas las celdas (con repetidos). DISTINCTCOUNT = cuenta única vez cada valor.',
                            analogy: 'Si tienes 100 recibos de 15 clientes diferentes: COUNT = 100 recibos, DISTINCTCOUNT = 15 clientes.'
                        },
                        {
                            emoji: '🏷️',
                            title: 'Columna "Origen" — Trazabilidad',
                            content: 'ANTES de combinar, agrega una columna "Origen" a cada tabla (="Scranton" o ="Stamford"). Así después sabrás de dónde vino cada fila.',
                            visualHint: 'En Power Query: Agregar columna → Columna personalizada → Nombre: "Origen", Fórmula: ="Scranton".',
                            analogy: 'Como ponerle etiqueta de precio a cada producto antes de mezclar inventarios de 2 tiendas.'
                        }
                    ],

                    recallChallenges: [
                        {
                            question: '¿Cuál es la diferencia entre APPEND y MERGE en Power Query?',
                            answer: 'APPEND = más FILAS (apila tablas verticalmente). MERGE = más COLUMNAS (junta tablas horizontalmente por una clave común).',
                            explanation: 'Append es como apilar hojas de papel. Merge es como pegar dos hojas lado a lado.'
                        },
                        {
                            question: '¿Por qué DISTINCTCOUNT de clientes sería MENOR que COUNT de filas?',
                            answer: 'Porque un cliente puede tener MÚLTIPLES transacciones (filas). COUNT cuenta cada fila, DISTINCTCOUNT cuenta cada cliente una sola vez.',
                            explanation: 'Si Juan compró 5 veces, COUNT = 5, DISTINCTCOUNT = 1.'
                        },
                        {
                            question: '(Repaso M3) CALCULATE([VentasTotales], Origen="Scranton") — ¿qué calcula esto?',
                            answer: 'Las ventas totales filtradas solo para filas donde el Origen es Scranton. Ignora las de Stamford.',
                            explanation: '¡CALCULATE aparece de nuevo! Ahora la usas para filtrar por la columna Origen que creaste.'
                        },
                        {
                            question: '(Repaso M2) ¿SUM o AVERAGE para saber "cuánto facturamos en total"?',
                            answer: 'SUM — total acumulado de todas las ventas.',
                            explanation: '¡Recall acumulativo! SUM, AVERAGE, CALCULATE, y ahora DISTINCTCOUNT — tu arsenal DAX crece.'
                        },
                        {
                            question: '(Repaso M1B) ¿Qué función limpiarías los nombres ANTES de fusionar tablas?',
                            answer: 'Text.Proper(Text.Trim(Text.Clean([Nombre]))) — Clean → Trim → Proper, de adentro hacia afuera.',
                            explanation: '¡Connectionismo! La limpieza de M1B es PREREQUISITO para que DISTINCTCOUNT funcione bien. Si no limpias, duplicados con diferente escritura no se detectarán.'
                        }
                    ],

                    elaborativeQuestions: [
                        {
                            question: '¿Por qué es CRÍTICO limpiar datos ANTES de fusionar dos tablas? ¿Qué pasaría si no lo haces?',
                            expertAnswer: 'Si Scranton tiene "Juan Pérez" y Stamford tiene "JUAN PEREZ" (el mismo cliente), DISTINCTCOUNT los contará como 2 personas diferentes. Esto inflaría artificialmente el número de clientes, llevando a conclusiones erróneas. En el contexto de la misión, David Wallace podría pensar que la sucursal fusionada tiene más clientes de los que realmente tiene, asignando cuotas de venta imposibles.'
                        },
                        {
                            question: '¿Cuándo usarías APPEND vs MERGE en un escenario de trabajo real?',
                            expertAnswer: 'APPEND: Cuando 2 sucursales tienen la MISMA estructura (mismas columnas) y quieres juntarlas. MERGE: Cuando tienes una tabla de ventas y una tabla de clientes con un campo en común (ID de cliente) y quieres agregar información del cliente a cada venta. APPEND = misma estructura, MERGE = información complementaria.'
                        }
                    ]
                },

                verification: [
                    { question: "¿Total de vendedores únicos tras la fusión?", type: "number", answer: 14, hint: "DISTINCTCOUNT de Salesperson." },
                    { question: "¿Ventas totales combinadas?", type: "number", answer: 1256070, hint: "SUM total de Amount." },
                    { question: "¿Qué operación usas para pegar filas DEBAJO de otra tabla?", type: "choice", options: ["Append (Anexar)", "Merge (Combinar)", "Join (Unir)"], answer: "Append (Anexar)", hint: "Append = apilar filas, Merge = agregar columnas." },
                    { question: "¿DISTINCTCOUNT cuenta valores repetidos?", type: "choice", options: ["Sí, cuenta todas las repeticiones", "No, solo cuenta únicos"], answer: "No, solo cuenta únicos", hint: "DISTINCT = único, diferente." },
                    { question: "¿Qué columna debes agregar ANTES de fusionar tablas?", type: "choice", options: ["Origen", "ID", "Nombre", "Fecha"], answer: "Origen", hint: "Antes de unir dos tablas, agrega una columna que diga de dónde viene cada fila (ej: 'Scranton' o 'Stamford').", academyHint: "Lee el concepto 'Append vs Merge' arriba. La columna Origen identifica la fuente de cada fila." },
                    { question: "Si Tabla A tiene 100 filas y Tabla B tiene 50, ¿cuántas filas tendrá el Append?", type: "number", answer: 150, hint: "Append suma las filas de ambas tablas." }
                ],
                winImage: '/images/story/office-4-win.png'
            },
            {
                id: 'office-5',
                title: 'El Billete Dorado',
                chapter: 5,
                level: 4,
                requires: ['office-4'],
                xp: 1200,
                coins: 300,
                description: 'Análisis de escenario What-If. ¿Fue el descuento un error fatal?',
                storyContext: 'Es el Día 89 del ultimátum de Corporate. Mañana es la presentación final a David Wallace. Pero hay una crisis: Michael, en un intento de ser "creativo", imprimió 5 "Billetes Dorados" — cupones de 10% de descuento — y los esconda dentro de cajas de papel. El problema: los 5 billetes terminaron en el envío de Blue Cross, el cliente MÁS GRANDE de la sucursal. Blue Cross ahora espera 10% de descuento en TODAS sus compras futuras. David Wallace está furioso: "¿Me estás diciendo que le diste 50% de descuento acumulativo a nuestro cliente más grande?!" (No es 50%, es 10%, pero Wallace está demasiado enojado para hacer matemáticas). Tu misión: usar análisis What-If con VAR para demostrar si el aumento de volumen de Blue Cross compensa la pérdida de margen. La supervivencia de Michael (y de Scranton) depende de tus números.',
                episodeReference: 'S06E12/S06E13 - The Delivery + Golden Ticket (Uno de los arcos más tensos de la serie)',
                storyStakes: 'ES EL MOMENTO DEFINITIVO. Día 89 de 90. Si demuestras que el Billete Dorado no fue tan desastroso, David Wallace mantiene a Michael como gerente y Scranton sobrevive. Si los números son catastróficos... Michael será despedido y la sucursal cerrará. Todo lo que has construido depende de este análisis.',
                previousMissionRecap: 'Fusionaste las bases de Scranton y Stamford (Misión 4, DISTINCTCOUNT y Append). Ahora enfrentas el desafío más complejo: un análisis de simulación financiera con VAR, márgenes, y parámetros What-If.',
                introNarrative: `💰 Michael te llama a su oficina. Está sentado con la cabeza entre las manos. El memo de Wallace está arrugado sobre el escritorio.

"¿Sabes lo que es un Billete Dorado? Como en Willy Wonka. Metís billetes dorados dentro de las cajas de papel y el cliente que los encuentre obtiene 10% de descuento. GE-NIAL idea de marketing, ¿no?"

*Pausa*

"El problema es que puse 5 billetes... y los 5 terminaron en la caja de Blue Cross. NUESTRO CLIENTE MÁS GRANDE. David Wallace me llamó gritando: '¡¿CINCO BILLETES AL MISMO CLIENTE?!'"

Dwight irrumpe: "Para que conste en actas, YO le dije que era una idea terrible. Cito textualmente: 'Michael, eso es económicamente irresponsable'. Él respondió: 'Dwight, tú no entiendes el marketing'."

Michael: "Dwight, CALLATE. *te mira con ojos de cachorro* Necesito que hagas tu magia de datos. David viene MAÑANA a la presentación final. Si puedes demostrar que el descuento no fue tan grave — que Blue Cross va a comprar MÁS volumen por el descuento y que eso compensa la pérdida de margen — me salvo. Si no..."

*Silencio*

"...Me despiden. Y Scranton cierra."

Jim, serio por primera vez: "Oye... sé que Michael la regó. Pero esta oficina importa. Si hay alguna forma de demostrarlo con números, haz tu mejor esfuerzo."

Pam, con lágrimas en los ojos: "Michael tiene mil defectos, pero esta oficina es su vida. Y la nuestra."

Andy: "¡Yo creo en ti, Nard-Dog cree en ti!"
Stanley: "...Haz lo que tengas que hacer. Yo necesito este trabajo."

Te sientas frente a Power BI. El archivo golden_ticket.csv está en tu escritorio. Es hora de crear el análisis más importante de tu carrera.`,
                outroNarrative: `📈 DÍA 90 — LA PRESENTACIÓN FINAL.

La sala de conferencias está llena. David Wallace en persona. Jan Levinson. Los representantes de todas las sucursales. Michael, con su mejor traje, está temblando.

Abres tu dashboard en la pantalla grande. Los números aparecen:

📊 "Pérdida por descuento: $46,080"
📊 "Margen post-descuento: 28% (antes era 30%)"
📊 "PERO: Blue Cross aumentó volumen de pedidos un 22% desde los billetes."
📊 "Ganancia neta del aumento de volumen: $38,500"
📊 "Pérdida REAL neta: $7,580 (no los $200K que Wallace temía)"

David Wallace se quita los lentes:
"Espera... ¿me estás diciendo que la pérdida real fue de solo $7,580?"

Tú: "Correcto. Y si Blue Cross mantiene el volumen incrementado durante 6 meses más, la promoción habrá generado una ganancia NETA positiva."

Silencio total.

David: "...Eso es mucho menos de lo que calculé. Michael, parece que tu 'idea de marketing' no fue tan desastrosa después de todo."

Michael salta de su silla: "¡LO SABÍA! ¡Siempre supe que era una idea genial! ¡Los Billetes Dorados fueron MI idea! ¡THAT'S WHAT SHE SAID sobre mis instintos de marketing!"

Dwight se levanta: "¡Protesto! Yo nunca dije que fuera mala idea—"
Jim: "Dwight, literalmente dijiste 'es económicamente irresponsable'."
Dwight: "...Eso fue sarcasmo estratégico."

David Wallace se pone de pie:
"La presentación de hoy ha sido la más clara y profesional que he visto de Scranton. Los datos de ventas, la fusión con Stamford, el análisis de rentabilidad... todo impecable.

Scranton queda oficialmente fuera de la lista de cierre."

*La oficina EXPLOTA en aplausos*

Michael llora. Kevin llora (porque se acabó el chili). Pam te abraza. Jim te da un high-five. Dwight te da un apretón de manos demasiado fuerte.

Andy canta "We Are the Champions" y por primera vez nadie le dice que se calle.

🏆 Has completado el arco de Dunder Mifflin.
90 días. 9 misiones. 1 sucursal salvada.

Gracias, Data Walker. Scranton nunca te olvidará.`,
                skillsDemo: ['profitability'],
                wrongAnswerPenalty: 0.03,

                // CAMPOS PEDAGÓGICOS
                learningObjectives: [
                    'Entender qué es un análisis What-If (hipotético)',
                    'Usar VAR para organizar cálculos complejos',
                    'Calcular márgenes de ganancia',
                    'Crear parámetros interactivos para simulaciones'
                ],
                prerequisiteKnowledge: [
                    'Haber completado todas las misiones anteriores',
                    'Entender CALCULATE y medidas básicas'
                ],
                realWorldAnalogy: '💭 Imagina que tienes una cafetería. Un cliente grande dice: "Dame 10% de descuento o me voy". ¿Qué haces? Necesitas calcular: ¿Si le doy el descuento pero él compra MÁS, gano o pierdo? Un análisis What-If te deja simular diferentes escenarios antes de decidir.',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es VAR?',
                        explanation: 'Es una forma de guardar un cálculo temporal para usarlo después. VAR Ventas = SUM(Amount) guarda el total, y luego puedes usarlo: RETURN Ventas * 0.9',
                        emoji: '📦'
                    },
                    {
                        concept: '¿Qué es Margen?',
                        explanation: 'Margen = Venta - Costo. Si vendes a $100 algo que costó $70, tu margen es $30 (30%).',
                        emoji: '💰'
                    },
                    {
                        concept: '¿Qué es What-If?',
                        explanation: '"¿Qué pasa SI doy 10% de descuento?" Es simular un escenario hipotético para ver el impacto ANTES de que pase.',
                        emoji: '🔮'
                    },
                    {
                        concept: '¿Qué es punto de equilibrio?',
                        explanation: 'Es cuánto MÁS debes vender para compensar un descuento. Con 10% de descuento, necesitas ~11% más volumen para no perder.',
                        emoji: '⚖️'
                    }
                ],

                objectives: [
                    'Calcular Margen Actual vs Margen Simulado',
                    'Crear parámetro What-If para el % descuento',
                    'Calcular punto de equilibrio de volumen'
                ],
                datasets: ['office_golden_ticket'],
                guide: [
                    '📁 PASO 1: Descarga el archivo "office_golden_ticket.csv" con datos de Blue Cross.',
                    '📥 PASO 2: Importa el archivo en Power BI.',
                    '🧮 PASO 3: Crea la medida base: VentasTotal = SUM(golden_ticket[Amount])',
                    '💰 PASO 4: Crea medida de costo: CostoTotal = SUM(golden_ticket[Cost])',
                    '📊 PASO 5: Crea medida de margen: MargenActual = [VentasTotal] - [CostoTotal]',
                    '🎛️ PASO 6: Ve a "Modelado" > "Nuevo parámetro" > "Parámetro numérico".',
                    '⚙️ PASO 7: Configura: Nombre="Descuento%", Mínimo=0, Máximo=50, Incremento=1, Default=10.',
                    '💡 PASO 8: Crea medida con VAR: MargenSimulado = VAR VentaConDescuento = [VentasTotal] * (1 - [Descuento%]/100) RETURN VentaConDescuento - [CostoTotal]',
                    '📉 PASO 9: Crea medida: PérdidaPorDescuento = [MargenActual] - [MargenSimulado]',
                    '🎨 PASO 10: Arrastra una Segmentación con el parámetro. ¡Juega con diferentes % y ve el impacto!'
                ],
                checkpoints: [
                    {
                        afterStep: 5,
                        question: '¿Tu medida MargenActual muestra un número positivo?',
                        successMessage: '¡Bien! Hay ganancia antes del descuento.',
                        failureHint: 'Asegúrate de que sea VentasTotal - CostoTotal (en ese orden).'
                    },
                    {
                        afterStep: 10,
                        question: '¿Al mover el slider de Descuento%, el valor de PérdidaPorDescuento cambia?',
                        successMessage: '¡Perfecto! Tu análisis What-If es interactivo.',
                        failureHint: 'Verifica que la medida use el parámetro: [Descuento%].'
                    }
                ],
                tips: [
                    '📦 VAR hace tus fórmulas más legibles y eficientes.',
                    '⚖️ Regla de oro: 10% descuento ≈ necesitas 11% más volumen para empatar.',
                    '🎨 Los gráficos de cascada (Waterfall) son perfectos para mostrar impacto.'
                ],

                // ========== CONTENIDO PREMIUM EXPANDIDO ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'VAR explicado paso a paso',
                            content: 'VAR es como crear una "caja temporal":\n\n// Guardamos valores en cajas\nVAR Ventas = SUM(Amount)\nVAR Costo = SUM(Cost)\nVAR Margen = Ventas - Costo\n\n// Usamos las cajas\nRETURN Margen / Ventas\n\nLas cajas solo existen dentro de la medida.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Anatomía del Margen',
                            content: 'Margen Bruto = Venta - Costo directo\nMargen Neto = Venta - Todos los costos\nMargen % = Margen / Venta × 100\n\nEjemplo:\nVenta = $100\nCosto = $70\nMargen = $30 (30%)\n\nSi das 10% descuento:\nVenta = $90, Margen = $20 (22%)',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'La matemática del descuento',
                            content: 'Un descuento es PEOR de lo que parece:\n\n10% descuento ≠ 10% menos ganancia\n\nSi tu margen es 30% y das 10% descuento:\nAntes: Venta $100, Margen $30\nDespués: Venta $90, Margen $20\n\n¡Perdiste 33% de tu ganancia (no 10%)!',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Punto de equilibrio de volumen',
                            content: 'Fórmula: % Volumen Extra = % Descuento / (Margen% - Descuento%)\n\nEjemplo: Margen 30%, Descuento 10%\nVolumen extra = 10 / (30-10) = 50% más volumen necesario\n\n¡Necesitas vender 50% MÁS solo para empatar!',
                            difficulty: 'advanced'
                        }
                    ],
                    interface: [
                        {
                            title: 'Crear parámetro What-If',
                            content: '📍 Modelado > Nuevo parámetro > Parámetro numérico\n📍 Configura: Nombre, Mínimo, Máximo, Incremento\n📍 Power BI crea automáticamente una tabla y una medida\n📍 Usa la medida en tus cálculos: [NombreParámetro Value]',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Segmentación con slider',
                            content: '📍 Después de crear el parámetro, aparece una tabla en Campos\n📍 Arrastra esa tabla a una Segmentación\n📍 Cambia el estilo: Formato > Estilo > Entre (slider)\n📍 Ahora puedes deslizar para cambiar valores dinámicamente',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Gráfico de cascada (Waterfall)',
                            content: '📍 Panel Visualizaciones > Ícono de barras escalonadas\n📍 Categoría = Etapas del cálculo\n📍 Valores = Cantidades\n📍 Perfecto para: "Empezamos aquí, restamos esto, terminamos aquí"',
                            difficulty: 'intermediate'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Formatear medidas largas',
                            content: 'Ctrl + Shift + F = Formatea la fórmula DAX automáticamente\n\nTransforma esto:\nVAR a=1 VAR b=2 RETURN a+b\n\nEn esto:\nVAR a = 1\nVAR b = 2\nRETURN a + b',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'El parámetro no afecta mis medidas',
                            content: 'Posibles causas:\n1. No estás usando la medida correcta del parámetro\n   Usa: [NombreParámetro Value] (incluye "Value")\n2. La medida no referencia el parámetro\n3. El slider está en 0\n\nVerifica que la fórmula incluya el parámetro.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'VAR dice "Error de sintaxis"',
                            content: 'Errores comunes:\n1. Olvidaste RETURN al final\n2. Usaste = en lugar de := (en columnas calculadas)\n3. Cerraste mal los paréntesis\n\nEstructura correcta:\nMedida = \nVAR x = algo\nVAR y = otro\nRETURN resultado',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'El margen da negativo',
                            content: 'Posibles causas:\n1. Venta y Costo están al revés: debería ser Venta - Costo\n2. El descuento es mayor que el margen original\n3. Los datos tienen errores (costos mayores que ventas)\n\nRevisa los datos crudos primero.',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Organiza medidas con carpetas',
                            content: 'En el panel Modelo:\n1. Selecciona una medida\n2. Propiedades > Carpeta para mostrar\n3. Escribe: "Análisis What-If"\n\nOrganiza así:\n📁 Base (SUM, COUNT)\n📁 KPIs (Margen, %)\n📁 What-If (Simulaciones)',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Múltiples escenarios con VAR',
                            content: 'ComparativaDescuentos = \nVAR MargenBase = [MargenActual]\nVAR Margen5 = [VentasTotal]*0.95 - [CostoTotal]\nVAR Margen10 = [VentasTotal]*0.90 - [CostoTotal]\nVAR Margen15 = [VentasTotal]*0.85 - [CostoTotal]\nRETURN \n  "Base: " & MargenBase & \n  " | 5%: " & Margen5 & \n  " | 10%: " & Margen10 & \n  " | 15%: " & Margen15',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'Análisis What-If en negocios reales',
                            content: 'Usos comunes:\n📊 "¿Si subo precios 5%, cuántas ventas puedo perder?"\n📊 "¿Si contrato 2 personas más, cuánto debo vender?"\n📊 "¿Si el dólar sube 10%, cómo afecta mi margen?"\n\nLos CFOs AMAN estos análisis.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'El error del vendedor',
                            content: 'Historia real: Un vendedor prometió 20% de descuento para cerrar un contrato grande.\n\nEl margen era 25%.\n20% de descuento = 80% del margen perdido.\n\nNecesitaba 4x más volumen para empatar.\nEl cliente no compró 4x más.\nLa empresa perdió dinero.\n\nPor eso los What-If son críticos ANTES de negociar.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué el análisis What-If es tan poderoso?',
                    reason: 'Permite tomar decisiones basadas en datos ANTES de que pasen. Un buen análisis What-If ha salvado empresas de quiebras y ha guiado inversiones millonarias.',
                    careerConnection: 'Los analistas que saben hacer simulaciones son promovidos más rápido. Pasan de "reportar lo que pasó" a "predecir lo que pasará".',
                    realExample: 'Un director de ventas usó un What-If para demostrar que dar 15% de descuento a un cliente grande perdería $500K al año. Salvó a la empresa de un mal negocio.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo explicar qué hace VAR y RETURN?',
                        criteria: 'VAR guarda valores temporales, RETURN devuelve el resultado final.',
                        action: 'Practica escribiendo una medida que use 3 VARs y combine los resultados en RETURN.'
                    },
                    {
                        question: '¿Sé crear un parámetro What-If?',
                        criteria: 'Modelado > Nuevo parámetro > Configurar > Usar en medida.',
                        action: 'Practica: Crea un parámetro de 0 a 100 y úsalo en una fórmula simple.'
                    },
                    {
                        question: '¿Entiendo el impacto real de un descuento?',
                        criteria: '10% descuento ≠ 10% menos ganancia. Afecta más al margen.',
                        action: 'Calcula: Si tu margen es 30% y das 10% descuento, ¿qué % de tu ganancia pierdes?'
                    }
                ],

                interfaceGuide: {
                    nuevoParametro: 'Modelado > Nuevo parámetro > Parámetro numérico',
                    tablaParametro: 'Después de crear, aparece una tabla en el panel Campos',
                    sliderFormato: 'Segmentación > Formato > Estilo > Entre (para slider)',
                    graficoWaterfall: 'Panel Visualizaciones > Ícono de barras escalonadas (cascada)'
                },

                expectedOutcome: 'Defensa financiera sólida. La pérdida fue mínima vs el riesgo de perder el cliente.',
                verification: [
                    { question: "¿Pérdida neta exacta por el descuento?", type: "number", answer: 46080, hint: "Diferencia entre MargenActual y MargenSimulado (con 10%)." },
                    { question: "¿Margen % post-descuento?", type: "number", answer: 28, hint: "Nuevo Margen / Nueva Venta × 100." },
                    { question: "¿Qué palabra clave guarda valores temporales en DAX?", type: "choice", options: ["VAR", "LET", "SET", "DIM"], answer: "VAR", hint: "VAR = Variable. Guarda un cálculo intermedio para reutilizarlo después.", academyHint: "Lee el concepto 'VAR/RETURN' en los tips de la misión." },
                    { question: "¿Qué palabra clave DEBE ir después de VAR para devolver el resultado?", type: "choice", options: ["RETURN", "END", "OUTPUT", "RESULT"], answer: "RETURN", hint: "RETURN = devolver. Es obligatorio después de cada bloque VAR para indicar el resultado final.", academyHint: "Lee el concepto 'VAR/RETURN' — siempre van en pareja." },
                    { question: "¿Un What-If se usa para analizar el pasado o simular el futuro?", type: "choice", options: ["Analizar el pasado", "Simular el futuro", "Ambos"], answer: "Simular el futuro", hint: "What-If = '¿Qué pasaría si...?' = escenarios hipotéticos." },
                    { question: "¿Dónde creas un parámetro What-If?", type: "choice", options: ["Inicio", "Modelado", "Vista"], answer: "Modelado", hint: "Modelado > Nuevo parámetro." },
                    { question: "Si tu margen es 30% y das 10% de descuento, ¿pierdes 10% o más del margen?", type: "choice", options: ["Exactamente 10%", "Más de 10%", "Menos de 10%"], answer: "Más de 10%", hint: "El descuento afecta las ventas, pero el costo no baja. Pierdes ~33% del margen." }
                ],
                winImage: '/images/story/office-5-win.png'
            }
        ]
    },
    {
        id: 'datarescue',
        order: 2,
        name: 'DataRescue HQ',
        subtitle: 'La Rebelión de la Base Corrupta',
        description: 'El villano Corruptex ha hackeado los sistemas. ¡Limpia datasets y restaura la verdad!',
        icon: '🦸‍♂️',
        color: '#e63946',
        difficulty: 'Intermedio',
        image: '/images/worlds/datarescue.png',
        // CONTEXTO DE DIMENSIÓN
        dimension: 'Dimensión Cyber-Void (Tierra-404)',
        dimensionContext: 'Una realidad hecha de puro datos flotantes. Lord Corruptex ha infectado el núcleo lógico, amenazando con "glitchear" todo el multiverso.',
        mentors: ['nova', 'cipher', 'glitch', 'corruptex'],
        prologue: '¡ALERTA DE DIMENSIÓN! Has saltado a la realidad "Cyber-Void". Aquí no hay papel, solo flujos de datos neón.\n\nEl villano-virus "Corruptex" ha infiltrado la base de datos global. Ha inyectado nulos, duplicados y outliers. Tu misión: unirte a la Resistencia (Nova, Cipher, Glitch) y usar tus "Cartas DAX" para purgar la infección antes de que se propague a otros mundos.',
        storyArc: 'La Crisis de los Datos Corruptos',
        scoringProfile: 'office-standard',
        epilogue: 'Has derrotado a Corruptex... por ahora. Los datos fluyen limpios de nuevo, y los KPIs brillan con la verdad. Pero recuerda: la calidad de datos es una vigilancia eterna.',
        skillsLearned: [
            { id: 'data-quality', name: 'Calidad de Datos', icon: '💎', description: 'Detectar nulos, duplicados y errores' },
            { id: 'dax-logic', name: 'Lógica DAX', icon: '🧠', description: 'IF, AND, OR, SWITCH' },
            { id: 'outlier-detection', name: 'Detección de Outliers', icon: '📈', description: 'Uso de MAX, AVERAGE y desviación' }
        ],
        perfectRunBonus: 500,
        missions: [
            {
                id: 'datarescue-1',
                title: 'Ganancia Total Real',
                chapter: 1,
                level: 1,
                xp: 400,
                coins: 100,
                description: 'Recupera la ganancia oculta tras los nulos y errores de formato.',
                storyContext: 'Corruptex borró la columna GANANCIA. Debes reconstruirla (Venta - Costo) y sumar el total, pero cuidado: hay celdas con texto y vacíos.',
                introNarrative: `🚨 *ALERTA DE SISTEMA: Intrusión detectada*
                
Corruptex: "¡Jajaja! ¡Tus beneficios son cero! He convertido tus millones en texto inútil mezclando formatos. ¡Intenta sumar letras, analista!"

Nova: "Agente, no escuches al villano. Detecto que la columna 'profit' tiene formatos contables (paréntesis) y texto 'N/A'. Power BI no puede sumar esto. Debemos iniciar el protocolo de limpieza inmediatamente."`,
                outroNarrative: `✨ *Proceso completado*

Nova: "¡Excelente! La integridad de los datos ha sido restaurada. La ganancia real es visible."

Corruptex: "¡Maldición! ¡Descubriste mi truco de los paréntesis! Pero el dinero no importa si la gravedad está rota... Nos veremos en la próxima tabla."`,

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Entender la diferencia entre dato corrupto y dato limpio',
                    'Identificar formatos contables (números entre paréntesis = negativos)',
                    'Limpiar valores nulos y textos inválidos en columnas numéricas',
                    'Aplicar SUM e IF para manejar errores de datos'
                ],
                prerequisiteKnowledge: [
                    'Conocer la interfaz básica de Power BI',
                    'Saber abrir Power Query (Transformar datos)',
                    'Entender qué es una columna y una fila'
                ],
                realWorldAnalogy: '🏦 Imagina revisar un extracto bancario donde algunos montos aparecen como "(500)" en lugar de "-500", otros dicen "N/A" y algunos están vacíos. Antes de saber tu saldo real, necesitas "traducir" esos formatos a números que una calculadora entienda.',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es un dato corrupto?',
                        explanation: 'Es un dato que debería ser número pero tiene texto mezclado, está vacío, o tiene un formato que Power BI no reconoce automáticamente.',
                        emoji: '💔'
                    },
                    {
                        concept: 'Formato contable (paréntesis)',
                        explanation: 'En contabilidad, los números negativos se escriben entre paréntesis: (500) significa -500. Power BI no lo entiende por defecto.',
                        emoji: '📊'
                    },
                    {
                        concept: 'SUM con errores',
                        explanation: 'Si hay textos en una columna numérica, SUM los ignora. Pero eso significa que tu total está incompleto sin darte cuenta.',
                        emoji: '⚠️'
                    },
                    {
                        concept: 'IF para limpiar',
                        explanation: 'IF puede detectar errores y reemplazarlos: IF(ISERROR(valor), 0, valor) convierte errores en ceros.',
                        emoji: '🧹'
                    }
                ],

                missionSteps: [
                    { id: 'dr1_mcq_formula', type: 'mcq', prompt: 'Fórmula para reconstruir GANANCIA:', options: ['Venta - Costo', 'Costo - Venta', 'Venta / Costo'], expected: 'Venta - Costo' },
                    { id: 'dr1_invalid_profit', type: 'numeric', prompt: 'Registros con GANANCIA inválida:', expectedFrom: 'stepKey.invalidProfitCount', tolerance: 0 },
                    { id: 'dr1_photo', type: 'photo', prompt: 'Sube captura de tu Power Query o medida DAX.', simulatedDelayMs: 2000, successMessage: 'Evidencia aceptada.' }
                ],
                validation: { type: 'numeric', measureId: 'GananciaTotal', expectedFrom: 'answerKey.GananciaTotal', tolerance: 0.02, requiredCards: ['SUM', 'IF'] },
                winImage: '/images/story/datarescue-1-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: [
                    'Identificar registros con ganancia corrupta (nulos, texto, paréntesis)',
                    'Limpiar la columna en Power Query o crear columna calculada',
                    'Calcular SUM(Ganancia) solo con valores válidos',
                    'Verificar que el total coincida con answerKey'
                ],
                guide: [
                    '📥 PASO 1: Descarga el dataset "datarescue_corrupted" y cárgalo en Power BI.',
                    '🔍 PASO 2: Abre Power Query (Transformar datos). Revisa la columna "profit".',
                    '❌ PASO 3: Notarás valores como "(500)", "N/A", vacíos. ¡Esos son los corruptos!',
                    '📊 PASO 4: Cuenta cuántos registros tienen ganancia inválida (usa filtro o COUNTROWS con IF).',
                    '🧹 PASO 5: Limpia los paréntesis: Reemplaza "(" por "-" y ")" por "" (vacío).',
                    '🔢 PASO 6: Convierte la columna a tipo Número Decimal.',
                    '💾 PASO 7: Cierra y aplica. Crea medida: GananciaTotal = SUM(Tabla[profit])',
                    '✅ PASO 8: Tu resultado debe coincidir con el answerKey del dataset.'
                ],
                // Checkpoints Interactivos con Personajes
                checkpoints: [
                    {
                        afterStep: 3,
                        question: '¿Qué patrón tienen los números negativos corruptos?',
                        successMessage: '¡Correcto! Los paréntesis son el enemigo visible. En contabilidad son comunes, pero aquí son un obstáculo.',
                        failureHint: 'Busca números encerrados en ( ). Así se representan en contabilidad, pero Power BI los ve como texto.',
                        character: 'nova'
                    },
                    {
                        afterStep: 6,
                        question: '¿Desaparecieron los errores rojos y "N/A" de la columna?',
                        successMessage: '¡Código limpio! Al estandarizar el formato, recuperaste la legibilidad de los datos.',
                        failureHint: 'Si ves barras rojas o "Error", es que quedaron caracteres inválidos. Revisa el reemplazo de texto.',
                        character: 'cipher'
                    }
                ],

                tips: [
                    '💡 Nova: "Los paréntesis () en contabilidad significan número NEGATIVO. No dejes que te confundan."',
                    '🔧 Glitch: "Usa Text.Replace en Power Query. Es como un buscar y destruir: cambia ( por - y listo."',
                    '⚠️ Cipher: "Si cambias el tipo de dato sin limpiar primero, perderás información. La estructura precede al contenido."',
                    '📈 Nova: "Siempre usa la Vista Datos para verificar que tus números se alinean a la derecha (así sabes que son números reales)."'
                ],

                completionMessage: {
                    character: 'nova',
                    message: '"Análisis completado. Has recuperado la visibilidad financiera que Corruptex intentó ocultar. Protocolo de limpieza exitoso."',
                    badge: 'data-purifier',
                    badgeName: 'Depurador de Datos'
                },

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'Anatomía de un dato corrupto',
                            content: '🔬 Un dato "corrupto" puede ser:\n• NULO: Celda vacía\n• TEXTO INVALIDO: "N/A", "---", "error"\n• FORMATO RARO: "(500)" para negativos\n• TIPO INCORRECTO: "1,234.56" con comas\n\nCada tipo requiere limpieza diferente.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'SUM ignora silenciosamente',
                            content: '⚠️ SUM("hola") = 0, no error. Esto es PELIGROSO porque tu reporte parece correcto pero le faltan datos. Siempre cuenta registros válidos vs totales para detectar pérdidas.',
                            difficulty: 'intermediate'
                        }
                    ],
                    interface: [
                        {
                            title: 'Detectar errores en Power Query',
                            content: '🔴 Las celdas con error muestran un pequeño ícono rojo. Click en "Quitar errores" o "Reemplazar errores" en la columna para tratarlos.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Filtrar valores problemáticos',
                            content: '📋 En Power Query, usa el filtro de columna > "Quitar vacíos" o busca valores específicos como "N/A" para aislar y tratar.',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Text.Replace masivo',
                            content: '🚀 En Power Query:\n1. Selecciona columna\n2. Transformar > Reemplazar valores\n3. Busca "(" Reemplaza con "-"\n4. Repite para ")" con ""\n\n¡Limpieza en 4 clicks!',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Error al cambiar tipo',
                            content: '❌ Si Power Query dice "Error al convertir a número":\n1. Revisa si hay texto residual\n2. Usa "Limpiar" antes de cambiar tipo\n3. Verifica comas vs puntos decimales',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Resultado muy diferente al esperado',
                            content: '🔍 Si tu GananciaTotal está muy lejos del answerKey:\n1. Revisa si limpiaste paréntesis ANTES de cambiar tipo\n2. Cuenta cuántos registros quedaron con error\n3. Verifica que usaste la columna correcta',
                            difficulty: 'intermediate'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Columna de diagnóstico',
                            content: '🧙 Crea una columna auxiliar en DAX:\nEsValido = IF(ISERROR(VALUE([profit])), "CORRUPTO", "OK")\n\nEsto te da un mapa claro de qué limpiar.',
                            difficulty: 'intermediate'
                        }
                    ],
                    realWorld: [
                        {
                            title: '¿Cuándo verás esto?',
                            content: '📤 Datos exportados de sistemas antiguos (SAP, AS/400)\n📊 Archivos de contabilidad con formatos regionales\n📧 CSVs de bancos o ERPs\n\nEl formato "(500)" es especialmente común en reportes financieros.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué limpiar datos corruptos importa?',
                    reason: 'Un solo valor corrupto puede hacer que tu SUM esté incompleto sin que lo notes. Imagina reportar $80,000 de ganancia cuando realmente son $100,000 porque 20 registros tenían formato raro.',
                    careerConnection: 'El 80% del trabajo de un analista de datos es LIMPIEZA. En entrevistas, preguntarán: "¿Qué harías si encuentras datos inconsistentes?" Esta misión es esa respuesta.',
                    realExample: 'Una empresa perdió un contrato porque su forecast estaba mal: habían sumado solo los valores "limpios" ignorando el 15% de datos con formato contable.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo identificar visualmente un dato corrupto vs uno limpio?',
                        criteria: 'Deberías reconocer: vacíos, "N/A", paréntesis, y mezcla de texto con números.',
                        action: 'Abre el dataset y filtra cada tipo de error diferente.'
                    },
                    {
                        question: '¿Sé usar Text.Replace en Power Query?',
                        criteria: 'Deberías poder reemplazar un carácter por otro en toda una columna.',
                        action: 'Practica: Reemplaza todos los "(" por "-" en la columna profit.'
                    },
                    {
                        question: '¿Mi GananciaTotal coincide con el answerKey?',
                        criteria: 'Tolerancia del 2%. Si estás fuera, hay errores de limpieza.',
                        action: 'Compara tu resultado con answerKey.GananciaTotal del dataset.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Power Query Editor - aquí verás errores resaltados en rojo',
                    leftBar: 'Panel "Pasos aplicados" - cada limpieza se graba aquí',
                    rightPanels: 'Panel de propiedades de columna - tipo de dato y transformaciones',
                    topRibbon: 'Cinta de Power Query: Transformar > Reemplazar valores'
                },

                expectedOutcome: 'KPI correcto de Ganancia Total que coincide con el valor esperado del dataset.'
            },
            {
                id: 'datarescue-2',
                title: 'Peso Promedio por País',
                chapter: 2,
                level: 2,
                xp: 500,
                coins: 120,
                description: 'Normaliza pesos con unidades de texto y outliers masivos.',
                storyContext: 'Corruptex contaminó el PESO_KG con texto ("100 kg", "mil") y valores absurdos. El promedio es inútil. Limpia y calcula.',
                introNarrative: '⚖️ "¿Cuánto pesa un dato?" El sistema colapsa al intentar promediar texto. Necesitas extraer los números y filtrar lo imposible.',
                outroNarrative: '📦 Promedios estabilizados. Pero Corruptex sonríe: "¿Y si los números son correctos pero la lógica no?"',

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Extraer números de celdas que mezclan texto y valores',
                    'Aplicar AVERAGE correctamente sobre datos limpios',
                    'Entender por qué AVERAGE ignora textos (y por qué es peligroso)',
                    'Segmentar promedios por dimensión (País)'
                ],
                prerequisiteKnowledge: [
                    'Saber usar Power Query (Transformar datos)',
                    'Entender qué hace AVERAGE vs SUM',
                    'Haber completado la limpieza básica de datos (Misión 1)'
                ],
                realWorldAnalogy: '📦 Imagina una lista de paquetes donde el peso dice "100 kg", "45KG", "1.5 toneladas", "mil gramos". Antes de calcular el peso promedio, necesitas que todos hablen el mismo idioma: solo números, solo kilogramos.',
                conceptBreakdown: [
                    {
                        concept: '¿Por qué hay texto en números?',
                        explanation: 'Sistemas antiguos o entrada manual de usuarios. Alguien escribió "100 kg" en lugar de solo "100" y el sistema lo guardó como texto.',
                        emoji: '📝'
                    },
                    {
                        concept: 'AVERAGE y los textos',
                        explanation: 'AVERAGE ignora celdas con texto, pero NO te avisa. Tu promedio podría basarse en 80 registros de 120, sin saberlo.',
                        emoji: '⚠️'
                    },
                    {
                        concept: 'Text.Select en Power Query',
                        explanation: 'Esta función extrae solo ciertos caracteres. Text.Select("100 kg", {"0".."9", "."}) = "100"',
                        emoji: '✂️'
                    },
                    {
                        concept: 'Segmentar por País',
                        explanation: 'Calcular AVERAGE por país revela patrones: ¿Brasil envía paquetes más pesados? ¿China más ligeros?',
                        emoji: '🌍'
                    }
                ],

                missionSteps: [
                    { id: 'dr2_mcq_clean', type: 'mcq', prompt: 'Mejor forma de limpiar "100 kg":', options: ['Extraer números', 'Borrar fila', 'Reemplazar con 0'], expected: 'Extraer números' },
                    { id: 'dr2_photo', type: 'photo', prompt: 'Captura de la limpieza de texto.', simulatedDelayMs: 1800, successMessage: 'Limpieza verificada.' }
                ],
                validation: { type: 'numeric', measureId: 'PesoPromedioGlobal', expectedFrom: 'answerKey.PesoPromedioGlobal', tolerance: 0.05, requiredCards: ['AVERAGE'] },
                winImage: '/images/story/datarescue-2-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: [
                    'Identificar registros con texto en columna weightKg',
                    'Extraer solo números usando Text.Select o Replace',
                    'Convertir columna limpia a tipo Número',
                    'Calcular AVERAGE global y por país'
                ],
                guide: [
                    '📥 PASO 1: Abre Power Query y revisa la columna "weightKg".',
                    '🔍 PASO 2: Notarás valores como "100 kg", "45KG", "1234.5 KG" - texto mezclado.',
                    '✂️ PASO 3: Selecciona la columna > Transformar > Extraer > Solo dígitos.',
                    '📊 PASO 4: Alternativa en M: Text.Select([weightKg], {"0".."9", "."})',
                    '🔢 PASO 5: Cambia el tipo de dato a "Número decimal".',
                    '💾 PASO 6: Cierra y aplica. Crea medida: PesoPromedio = AVERAGE(Tabla[weightKg])',
                    '🌍 PASO 7: Crea visual de barras: País en eje X, PesoPromedio en valores.',
                    '✅ PASO 8: Tu promedio global debe coincidir con answerKey.PesoPromedioGlobal'
                ],
                tips: [
                    '💡 "Extraer" es mejor que "Borrar" - conservas información.',
                    '🔧 Cuidado con decimales: "1.5" necesita incluir el punto en Text.Select.',
                    '⚠️ Después de extraer, algunos quedarán vacíos - decide qué hacer con ellos.',
                    '📈 Verifica cuántos registros tienen peso válido vs total.'
                ],

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'El silencio mortal de AVERAGE',
                            content: '🔇 AVERAGE("texto") = ignora la celda silenciosamente.\n\nEjemplo peligroso:\nDatos: [100, "error", 200]\nAVERAGE = 150 (promedio de 2, no de 3)\n\nTu reporte parece correcto pero excluye datos. Siempre cuenta cuántos registros entraron al cálculo.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Normalizar vs Eliminar',
                            content: '⚖️ Siempre prefiere NORMALIZAR (limpiar) sobre ELIMINAR.\n\n"100 kg" → Extraer → 100 ✅\nBorrar la fila = perdiste una venta real ❌\n\nSolo elimina si el dato es irrecuperable (ej: "???")',
                            difficulty: 'beginner'
                        }
                    ],
                    interface: [
                        {
                            title: 'Columna desde ejemplos',
                            content: '🧙 Power Query tiene "Columna desde ejemplos":\n1. Agregar columna > Columna desde ejemplos\n2. Escribe el resultado esperado para 2-3 filas\n3. Power Query deduce la transformación\n\n¡Perfecto para limpiezas complejas!',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Vista previa de distribución',
                            content: '📊 Click derecho en encabezado de columna > "Distribución de columna". Muestra histograma rápido para detectar outliers antes de limpiar.',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Text.Select en M',
                            content: '🚀 Fórmula M para extraer números:\n\n= Text.Select([weightKg], {"0".."9", "."})\n\nIncluye el punto para decimales.\nExcluye letras, espacios, símbolos.',
                            difficulty: 'intermediate'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Columna queda vacía después de extraer',
                            content: '❌ Si la columna queda toda vacía:\n1. Revisa que incluiste los caracteres correctos en Text.Select\n2. Verifica que la columna original tenía datos\n3. Algunos formatos usan "," en lugar de "." para decimales',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Promedio muy diferente al esperado',
                            content: '🔍 Si tu promedio está lejos del answerKey:\n1. ¿Filtraste outliers absurdos (pesos de 50,000 kg)?\n2. ¿La columna tiene el tipo "Número" correcto?\n3. ¿Hay valores negativos que no deberían estar?',
                            difficulty: 'intermediate'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Auditoría de limpieza',
                            content: '🧙 Antes de cerrar Power Query, agrega columna:\n\n= if [weightKg_limpio] = null then "PERDIDO" else "OK"\n\nCuenta cuántos "PERDIDO" tienes. Si son muchos, tu limpieza es muy agresiva.',
                            difficulty: 'intermediate'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'Datos de logística y ERP',
                            content: '🚚 En logística real, los sistemas antiguos guardan peso con unidades:\n• "100 kg", "45 LB", "1.5 TON"\n\nNormalizar a una unidad estándar (kg) es el primer paso de cualquier análisis de costos de envío.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué limpiar texto de números importa?',
                    reason: 'Cada vez que un sistema devuelve "100 kg" en lugar de solo "100", AVERAGE y SUM fallan silenciosamente. Tu reporte puede excluir el 20% de los datos sin que te des cuenta.',
                    careerConnection: 'En análisis de logística, inventario y supply chain, la limpieza de unidades es el 30% del trabajo. Dominar esto te hace valioso en cualquier empresa con datos de productos físicos.',
                    realExample: 'Un analista de Amazon reportó que los paquetes de México pesaban 50% menos que los de USA. Resultado: la columna de México tenía pesos en libras mezclados con kg, y AVERAGE ignoró el 40% de los datos.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo usar Text.Select para extraer solo números?',
                        criteria: 'Deberías poder escribir la fórmula sin buscar sintaxis.',
                        action: 'Practica: Transforma "123 ABC 456" a "123456" usando Text.Select.'
                    },
                    {
                        question: '¿Sé cuántos registros quedaron sin peso después de limpiar?',
                        criteria: 'Deberías tener un conteo de nulos/vacíos post-limpieza.',
                        action: 'Filtra la columna limpia por "(null)" y cuenta.'
                    },
                    {
                        question: '¿Mi PesoPromedioGlobal coincide con el answerKey?',
                        criteria: 'Tolerancia del 5%. Fuera de rango = revisar limpieza.',
                        action: 'Compara con answerKey.PesoPromedioGlobal del dataset.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Power Query Editor - columna weightKg en focus',
                    leftBar: 'Pasos aplicados - verás "Texto extraído" después de limpiar',
                    rightPanels: 'Propiedades de columna - verificar tipo "Número decimal"',
                    topRibbon: 'Transformar > Extraer (o Agregar columna > Columna desde ejemplos)'
                },

                expectedOutcome: 'Gráfico de barras de peso promedio por país con datos limpios.'
            },
            {
                id: 'datarescue-3',
                title: 'CBM Máximo y Outliers',
                chapter: 3,
                level: 2,
                xp: 600,
                coins: 150,
                description: 'Detecta anomalías de punto decimal en el volumen cúbico.',
                storyContext: 'Outliers detectados. Un contenedor no puede medir 30,000 m³. Usa MAX y lógica para aislar estos errores de dedo (o de villano).',
                introNarrative: '📈 ¡Un solo paquete ocupa todo el barco! Alguien movió el punto decimal. Identifica el Máximo real y aisla los errores.',
                outroNarrative: '🔍 Outliers en cuarentena. El análisis es seguro. "¡Maldición!" grita Corruptex. "¡Probemos con clones!"',

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Entender qué es un outlier y por qué distorsiona análisis',
                    'Usar MAX para detectar valores extremos',
                    'Aplicar reglas de negocio para definir umbrales',
                    'Crear columnas calculadas con IF para marcar anomalías'
                ],
                prerequisiteKnowledge: [
                    'Entender AVERAGE y MAX',
                    'Conocer Power Query básico',
                    'Haber limpiado datos numéricos (Misión 2)'
                ],
                realWorldAnalogy: '📦 Un paquete normal mide 0.5 m³. Si un registro dice 50,000 m³, es obvio que algo está mal: nadie envía un cubo de 37 metros de lado. Ese "0" extra es un error de digitación que distorsiona TODO tu análisis.',
                conceptBreakdown: [
                    {
                        concept: '¿Qué es un outlier?',
                        explanation: 'Un valor tan alejado del resto que no tiene sentido en el contexto. Puede ser error de digitación, falla de sistema, o dato legítimo pero raro.',
                        emoji: '🚨'
                    },
                    {
                        concept: 'Impacto en estadísticas',
                        explanation: 'Un outlier de 50,000 cuando el resto son 0-500 hace que AVERAGE suba de 250 a 660. ¡Un solo dato arruina todo!',
                        emoji: '📊'
                    },
                    {
                        concept: 'Regla de negocio',
                        explanation: 'Tú defines qué es "imposible": ¿Un paquete > 100 m³? Físicamente posible pero raro. ¿> 10,000 m³? Imposible, es un error.',
                        emoji: '📏'
                    },
                    {
                        concept: 'Percentil 95 como umbral',
                        explanation: 'Si el 95% de tus datos está bajo 500, valores sobre 500*1.5 = 750 podrían ser outliers. Es una regla estadística común.',
                        emoji: '📈'
                    }
                ],

                missionSteps: [
                    { id: 'dr3_mcq_threshold', type: 'mcq', prompt: 'Regla para detectar outlier masivo:', options: ['Valor > Límite Físico', 'Valor < 0', 'Valor = Promedio'], expected: 'Valor > Límite Físico' },
                    { id: 'dr3_photo', type: 'photo', prompt: 'Captura de tabla con outliers marcados.', simulatedDelayMs: 2200, successMessage: 'Outliers detectados.' }
                ],
                validation: { type: 'setMatch', measureId: 'OutliersDetectados', expectedSetFrom: 'stepKey.outliersVolumen', requiredCards: ['MAX', 'IF'] },
                winImage: '/images/story/datarescue-3-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: [
                    'Calcular MAX(volumeCbm) para ver el valor más extremo',
                    'Definir umbral de outlier (ej: > percentil 95 * 1.5)',
                    'Crear columna condicional: EsOutlier = IF(volume > umbral, "SÍ", "NO")',
                    'Generar lista de IDs con volumeCbm anómalo'
                ],
                guide: [
                    '📊 PASO 1: Crea una tarjeta con MAX(volumeCbm). ¿Es un número absurdo?',
                    '📈 PASO 2: Crea un histograma de volumeCbm. ¿Ves valores muy alejados?',
                    '🎯 PASO 3: Define tu umbral. Ejemplo: si el percentil 95 es 400, usa 600 como límite.',
                    '🧮 PASO 4: En DAX, crea columna: EsOutlier = IF([volumeCbm] > 600, "OUTLIER", "OK")',
                    '📋 PASO 5: Alternativa en Power Query: Agregar columna condicional.',
                    '🔍 PASO 6: Filtra por "OUTLIER" y lista los proformaCodes afectados.',
                    '📤 PASO 7: Tu lista de outliers debe coincidir con stepKey.outliersVolumen',
                    '✅ PASO 8: Márcalos para revisión o excluye del análisis principal.'
                ],
                tips: [
                    '💡 MAX te muestra el peor caso. Si es absurdo, hay outliers.',
                    '📊 Un histograma revela outliers visualmente: barras solitarias a la derecha.',
                    '⚠️ No elimines outliers automáticamente - pueden ser datos legítimos raros.',
                    '📏 Conoce tu negocio: ¿Cuál es el volumen máximo realista de un envío?'
                ],

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'Error de punto decimal',
                            content: '🔢 El error más común en datos numéricos:\n\n50 m³ → 5000 m³ (olvidó el punto)\n0.5 m³ → 500 m³ (corrió el decimal)\n\nEstos errores se ven "normales" numéricamente pero son imposibles en contexto.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'IQR: La regla estadística',
                            content: '📊 Método formal para detectar outliers:\n1. Calcula Q1 (percentil 25) y Q3 (percentil 75)\n2. IQR = Q3 - Q1\n3. Outlier = valor < Q1-1.5*IQR o > Q3+1.5*IQR\n\nPower BI no tiene PERCENTILE fácil, pero puedes aproximar con TOPN.',
                            difficulty: 'advanced'
                        }
                    ],
                    interface: [
                        {
                            title: 'Histograma para outliers',
                            content: '📊 Visual > Histograma:\n1. Arrastra volumeCbm\n2. Ajusta bins a ~20\n3. Busca barras solitarias muy a la derecha\n\nEsas barras solitarias = outliers.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Formato condicional como detector',
                            content: '🎨 Usa formato condicional en tabla:\n1. Selecciona columna volumeCbm\n2. Formato > Reglas > Mayor que [umbral]\n3. Color rojo para outliers\n\nIdentificación visual instantánea.',
                            difficulty: 'intermediate'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'TOPN para ver extremos',
                            content: '🚀 Tabla con los 10 peores casos:\n\n= TOPN(10, Tabla, [volumeCbm], DESC)\n\nAsí ves inmediatamente los candidatos a outlier.',
                            difficulty: 'intermediate'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Mi lista de outliers no coincide',
                            content: '🔍 Si tu lista difiere del stepKey:\n1. Revisa que usaste el mismo umbral (stepKey.outlierThreshold)\n2. ¿Parseaste correctamente los números con texto?\n3. ¿Comparaste > o >= ? (puede cambiar resultados)',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'MAX muestra texto en lugar de número',
                            content: '❌ Si MAX devuelve error o texto:\n1. La columna no es tipo Número\n2. Hay errores de conversión pendientes\n3. Ve a Vista Datos y verifica el tipo de columna',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Cuarentena de outliers',
                            content: '🧙 En lugar de eliminar, crea una tabla separada:\n\nOutliersParaRevisar = FILTER(Tabla, [volumeCbm] > [Umbral])\n\nAsí puedes analizarlos después sin perder datos.',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'Errores en logística real',
                            content: '🚛 En sistemas de carga:\n• Un usuario escribe 5000 en lugar de 5.000\n• Un sensor falla y reporta 999999\n• Una conversión de unidades está mal\n\nEstos errores cuestan dinero real: tarifas de envío mal calculadas, camiones mal planificados.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué detectar outliers importa?',
                    reason: 'Un solo outlier puede distorsionar completamente tus estadísticas. Un volumen de 50,000 m³ entre 100 registros normales de 0-500 m³ hará que tu AVERAGE sea 550 en lugar de 250.',
                    careerConnection: 'En finanzas y logística, detectar outliers ANTES de presentar un reporte es crítico. Un número absurdo en tu dashboard frente al CEO = pérdida de credibilidad.',
                    realExample: 'Una aerolínea cobró $0.01 por un vuelo internacional porque un outlier en los datos de pricing afectó el modelo de descuentos. Perdieron millones antes de detectar el error.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo definir un umbral de outlier para mis datos?',
                        criteria: 'Deberías poder justificar por qué elegiste ese número.',
                        action: 'Calcula: percentil 95 de volumeCbm * 1.5 = tu umbral.'
                    },
                    {
                        question: '¿Sé crear una columna IF para marcar outliers?',
                        criteria: 'Deberías poder escribir: IF([volumeCbm] > X, "OUTLIER", "OK")',
                        action: 'Crea la columna en DAX y verifica que funciona.'
                    },
                    {
                        question: '¿Mi lista de outliers coincide con stepKey.outliersVolumen?',
                        criteria: 'Los IDs deben coincidir exactamente.',
                        action: 'Compara tu lista filtrada con los IDs del stepKey.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Vista Informe - histograma y tabla con formato condicional',
                    leftBar: 'Vista Datos para verificar la columna EsOutlier',
                    rightPanels: 'Panel Visualizaciones > Formato > Formato condicional',
                    topRibbon: 'Modelado > Nueva columna (para crear EsOutlier en DAX)'
                },

                expectedOutcome: 'Lista de IDs con volumen erróneo identificados y marcados.'
            },
            {
                id: 'datarescue-4',
                title: 'COUNT vs COUNTROWS',
                chapter: 4,
                level: 3,
                xp: 700,
                coins: 180,
                description: 'Filas duplicadas inflan los reportes. Aprende a contar de verdad.',
                storyContext: 'Un JOIN incorrecto duplicó transacciones. COUNTROWS dice una cosa, DISTINCTCOUNT dice la verdad. Desmaskara la inflación.',
                introNarrative: '👯‍♂️ "Todo es doblemente bueno," dice Corruptex. Tus reportes muestran el doble de ventas. Debes distinguir entre filas y transacciones únicas.',
                outroNarrative: '🔢 Conteo corregido. La inflación de datos ha sido detenida. Corruptex se refugia en la semántica: "¿Quién es quién?"',

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Entender la diferencia entre COUNT, COUNTROWS y DISTINCTCOUNT',
                    'Detectar filas duplicadas en un dataset',
                    'Usar DISTINCTCOUNT para contar valores únicos',
                    'Identificar el impacto de duplicados en reportes de negocio'
                ],
                prerequisiteKnowledge: [
                    'Conocer SUM y AVERAGE',
                    'Entender qué es una tabla y una columna',
                    'Saber crear medidas DAX básicas'
                ],
                realWorldAnalogy: '📋 Imagina contar invitados a una fiesta. Si "Juan" confirma 3 veces (por email, teléfono y WhatsApp), ¿tienes 3 invitados o 1? COUNTROWS dice 3 confirmaciones. DISTINCTCOUNT dice 1 persona única.',
                conceptBreakdown: [
                    {
                        concept: 'COUNT vs COUNTROWS',
                        explanation: 'COUNT(columna) cuenta celdas NO vacías en esa columna. COUNTROWS(tabla) cuenta TODAS las filas de la tabla, incluyendo las que tienen vacíos.',
                        emoji: '🔢'
                    },
                    {
                        concept: 'DISTINCTCOUNT',
                        explanation: 'Cuenta valores ÚNICOS. Si hay 100 filas pero solo 50 códigos diferentes, DISTINCTCOUNT = 50.',
                        emoji: '🎯'
                    },
                    {
                        concept: '¿De dónde vienen los duplicados?',
                        explanation: 'JOINs mal hechos, imports repetidos, errores de sistema, o diseño de datos que permite repeticiones.',
                        emoji: '👯'
                    },
                    {
                        concept: 'Delta de duplicidad',
                        explanation: 'COUNTROWS - DISTINCTCOUNT(ID) = filas extra por duplicados. Si es > 0, tienes problema.',
                        emoji: '📊'
                    }
                ],

                missionSteps: [
                    { id: 'dr4_mcq_count', type: 'mcq', prompt: 'Diferencia COUNT vs COUNTROWS:', options: ['COUNT ignora nulos', 'Son iguales', 'COUNTROWS ignora nulos'], expected: 'COUNT ignora nulos' },
                    { id: 'dr4_photo', type: 'photo', prompt: 'Captura de análisis de duplicados.', simulatedDelayMs: 1600, successMessage: 'Duplicados visibles.' }
                ],
                validation: { type: 'numeric', measureId: 'DuplicadosDetectados', expectedFrom: 'stepKey.duplicatedRows', tolerance: 0, requiredCards: ['COUNTROWS', 'DISTINCTCOUNT'] },
                winImage: '/images/story/datarescue-4-win.png',
                datasets: ['datarescue_duplicated'],
                objectives: [
                    'Calcular COUNTROWS(Tabla) - total de filas',
                    'Calcular DISTINCTCOUNT(proformaCode) - proformas únicas',
                    'Calcular Delta = COUNTROWS - DISTINCTCOUNT',
                    'Identificar cuántos duplicados hay exactamente'
                ],
                guide: [
                    '📥 PASO 1: Carga el dataset "datarescue_duplicated".',
                    '🔢 PASO 2: Crea medida: TotalFilas = COUNTROWS(Tabla)',
                    '🎯 PASO 3: Crea medida: ProformasUnicas = DISTINCTCOUNT(Tabla[proformaCode])',
                    '📊 PASO 4: Crea medida: Duplicados = [TotalFilas] - [ProformasUnicas]',
                    '📈 PASO 5: Crea tarjetas para ver los 3 valores.',
                    '🔍 PASO 6: Tu valor de Duplicados debe coincidir con stepKey.duplicatedRows',
                    '📋 PASO 7: Bonus: Crea tabla mostrando proformaCodes que aparecen más de 1 vez.',
                    '✅ PASO 8: Ahora entiendes por qué reportaban "el doble de ventas".'
                ],
                tips: [
                    '💡 COUNT(columna) ≠ COUNTROWS(tabla) cuando hay nulos.',
                    '🔑 Un ID único es clave para detectar duplicados.',
                    '⚠️ Si ventas duplicadas → SUM(ventas) también está inflado.',
                    '📊 Usa COUNTROWS + GROUP BY en Power Query para ver repeticiones.'
                ],

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'La Trinidad del Conteo',
                            content: '🔢 COUNT([Columna]): Celdas no vacías en esa columna\n📋 COUNTROWS(Tabla): Todas las filas de la tabla\n🎯 DISTINCTCOUNT([Columna]): Valores únicos\n\nCada uno responde una pregunta diferente. Confundirlos = reportes incorrectos.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Duplicados inflan todo',
                            content: '⚠️ Si una fila de $1000 aparece 3 veces:\n• COUNTROWS = 3 ventas (falso)\n• SUM = $3000 (falso)\n• DISTINCTCOUNT = 1 venta (verdad)\n\nLos duplicados multiplican el error en TODAS tus métricas.',
                            difficulty: 'intermediate'
                        }
                    ],
                    interface: [
                        {
                            title: 'Agrupar para ver duplicados',
                            content: '📊 En Power Query:\n1. Selecciona columna ID\n2. Inicio > Agrupar por\n3. Operación: Recuento de filas\n4. Filtra donde Recuento > 1\n\nAhora ves exactamente qué IDs están duplicados.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Tabla de diagnóstico',
                            content: '🔍 Crea tabla visual con:\n• proformaCode\n• Medida: Conteo = COUNTROWS(FILTER(Tabla, [proformaCode] = EARLIER([proformaCode])))\n\nValores > 1 = duplicados.',
                            difficulty: 'intermediate'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Quitar duplicados en 3 clicks',
                            content: '🚀 En Power Query:\n1. Selecciona columna ID\n2. Inicio > Quitar filas > Quitar duplicados\n\n¡Ojo! Esto elimina datos. Hazlo solo si estás seguro de que son duplicados reales.',
                            difficulty: 'beginner'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'DISTINCTCOUNT devuelve 0',
                            content: '❌ Si DISTINCTCOUNT = 0:\n1. La columna está vacía\n2. Todos los valores son nulos\n3. El nombre de columna tiene typo\n\nVerifica en Vista Datos.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Más duplicados de los esperados',
                            content: '🔍 Si detectas más duplicados que stepKey:\n1. ¿Cargaste el dataset correcto (datarescue_duplicated)?\n2. ¿Hay otros campos que deberían ser únicos además del ID?\n3. ¿El seed del dataset es correcto?',
                            difficulty: 'intermediate'
                        }
                    ],
                    proTip: [
                        {
                            title: 'SUMMARIZE para análisis profundo',
                            content: '🧙 Tabla de frecuencia de duplicados:\n\n= SUMMARIZE(\n    Tabla,\n    [proformaCode],\n    "Ocurrencias", COUNTROWS(CURRENTGROUP())\n)\n\nFiltra donde Ocurrencias > 1 para ver solo duplicados.',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'Origen común de duplicados',
                            content: '🔄 Causas típicas:\n• ETL que corre 2 veces\n• JOINs que multiplican filas\n• Usuarios que envían formularios múltiples\n• Imports manuales de Excel\n\nSiempre valida: COUNTROWS vs DISTINCTCOUNT(ID) = 0 diferencia.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué contar correctamente importa?',
                    reason: 'Reportar 200 ventas cuando son 100 duplicadas destroza tu credibilidad. Si además sumas los montos, tu revenue también está inflado al doble.',
                    careerConnection: 'En auditoría y finanzas, detectar duplicados es literalmente tu trabajo. Errores aquí pueden tener implicaciones legales y regulatorias.',
                    realExample: 'Una startup reportó $2M en ventas a inversores. Auditoría reveló que un bug duplicó el 40% de transacciones. Ventas reales: $1.2M. Perdieron la ronda de inversión.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo explicar la diferencia entre COUNT, COUNTROWS y DISTINCTCOUNT?',
                        criteria: 'Deberías dar un ejemplo concreto de cuándo usar cada uno.',
                        action: 'Escribe: COUNT = ___, COUNTROWS = ___, DISTINCTCOUNT = ___'
                    },
                    {
                        question: '¿Sé calcular el Delta de duplicidad?',
                        criteria: 'Delta = COUNTROWS - DISTINCTCOUNT(ID). Si > 0, hay duplicados.',
                        action: 'Crea las 3 medidas y compara los valores.'
                    },
                    {
                        question: '¿Mi conteo de duplicados coincide con stepKey.duplicatedRows?',
                        criteria: 'Debe ser exacto (tolerancia 0).',
                        action: 'Compara tu medida Duplicados con el stepKey.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Vista Informe - 3 tarjetas: TotalFilas, ProformasUnicas, Duplicados',
                    leftBar: 'Vista Datos para ver las filas duplicadas',
                    rightPanels: 'Panel Campos - verificar que usas la columna correcta',
                    topRibbon: 'Modelado > Nueva medida (para cada métrica de conteo)'
                },

                expectedOutcome: 'Reporte de duplicidad mostrando exactamente cuántas filas extras hay.'
            },
            {
                id: 'datarescue-5',
                title: 'Clientes Únicos Reales',
                chapter: 5,
                level: 3,
                xp: 800,
                coins: 200,
                description: 'Normaliza nombres de clientes ("Empresa A" vs "EMPRESA A ").',
                storyContext: 'Variaciones de texto (espacios, mayúsculas) fragmentan la cartera de clientes. Normaliza strings para agrupar correctamente.',
                introNarrative: '🔤 "Cliente A" y "Cliente  A" no son lo mismo para el software, pero sí para el negocio. Unifica la cartera.',
                outroNarrative: '🤝 Clientes consolidados. Tu CRM está limpio. Corruptex está perdiendo terreno. "¡Aún me queda el Tiempo!"',

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Entender por qué variaciones de texto fragmentan datos',
                    'Aplicar TRIM para quitar espacios extras',
                    'Aplicar UPPER/LOWER para normalizar mayúsculas',
                    'Calcular DISTINCTCOUNT antes y después de limpiar'
                ],
                prerequisiteKnowledge: [
                    'Conocer DISTINCTCOUNT',
                    'Saber usar Power Query básico',
                    'Entender transformaciones de texto'
                ],
                realWorldAnalogy: '📇 Tu CRM tiene "APPLE INC.", "Apple Inc.", "Apple  Inc." y " apple inc". ¿Tienes 4 clientes o 1? Para la computadora son 4 diferentes. Para el negocio, es el mismo cliente contado 4 veces.',
                conceptBreakdown: [
                    {
                        concept: 'Sensibilidad a mayúsculas',
                        explanation: 'Para DAX y Power Query, "ABC" ≠ "abc" ≠ "Abc". Son 3 valores diferentes aunque representen lo mismo.',
                        emoji: '🔠'
                    },
                    {
                        concept: 'Espacios invisibles',
                        explanation: 'Un espacio al inicio, al final, o doble en medio hace que dos textos "iguales" sean diferentes.',
                        emoji: '👻'
                    },
                    {
                        concept: 'TRIM',
                        explanation: 'Quita espacios al inicio y al final del texto. También reduce espacios múltiples a uno solo.',
                        emoji: '✂️'
                    },
                    {
                        concept: 'UPPER/LOWER',
                        explanation: 'Convierte todo a mayúsculas o minúsculas. Así "abc", "ABC" y "Abc" se vuelven iguales.',
                        emoji: '🔄'
                    }
                ],

                missionSteps: [
                    { id: 'dr5_mcq_normalize', type: 'mcq', prompt: 'Mejor transformación para nombres:', options: ['TRIM + UPPER', 'Solo UPPER', 'Ninguna'], expected: 'TRIM + UPPER' },
                    { id: 'dr5_raw_unique', type: 'numeric', prompt: 'Clientes antes de limpiar:', expectedFrom: 'stepKey.rawUniqueClients', tolerance: 0 },
                    { id: 'dr5_photo', type: 'photo', prompt: 'Captura de columna normalizada.', simulatedDelayMs: 1700, successMessage: 'Normalización OK.' }
                ],
                validation: { type: 'numeric', measureId: 'ClientesUnicos', expectedFrom: 'answerKey.ClientesUnicos', tolerance: 0, requiredCards: ['DISTINCTCOUNT'] },
                winImage: '/images/story/datarescue-5-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: [
                    'Contar DISTINCTCOUNT(client) SIN limpiar = clientes "falsos"',
                    'Aplicar TRIM y UPPER en Power Query a la columna client',
                    'Contar DISTINCTCOUNT después de limpiar = clientes reales',
                    'Calcular cuántos "clientes fantasma" eliminaste'
                ],
                guide: [
                    '📊 PASO 1: Crea medida: ClientesSinLimpiar = DISTINCTCOUNT(Tabla[client])',
                    '🔍 PASO 2: Anota el número. Este incluye los "fantasmas" por variaciones.',
                    '🔧 PASO 3: Abre Power Query. Selecciona columna "client".',
                    '✂️ PASO 4: Transformar > Formato > Recortar (esto es TRIM).',
                    '🔠 PASO 5: Transformar > Formato > MAYÚSCULAS (esto es UPPER).',
                    '💾 PASO 6: Cierra y aplica. Crea medida: ClientesReales = DISTINCTCOUNT(Tabla[client])',
                    '📈 PASO 7: Compara: ClientesSinLimpiar vs ClientesReales.',
                    '✅ PASO 8: ClientesReales debe coincidir con answerKey.ClientesUnicos'
                ],
                tips: [
                    '💡 Espacios al final son invisibles pero letales.',
                    '🔍 Usa Vista Datos y ordena alfabéticamente para ver variaciones.',
                    '⚠️ Siempre aplica TRIM antes de UPPER para mejores resultados.',
                    '📊 La diferencia entre antes/después = clientes "fantasma" eliminados.'
                ],

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'El enemigo invisible',
                            content: '👻 Los espacios extra son el enemigo #1 de la calidad de datos:\n\n" Cliente" ≠ "Cliente" ≠ "Cliente " ≠ "Cliente  "\n\nTodos parecen iguales al ojo humano, pero son 4 registros diferentes para Power BI.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Normalización canónica',
                            content: '📋 Regla de oro: Define UN formato "correcto" y convierte todo a ese:\n\n1. TRIM (quita espacios)\n2. UPPER (todo mayúsculas)\n3. Opcionalmente: Quitar acentos\n\nAsí "maría García " → "MARIA GARCIA"',
                            difficulty: 'intermediate'
                        }
                    ],
                    interface: [
                        {
                            title: 'Detectar variaciones',
                            content: '🔍 En Vista Datos:\n1. Ordena columna client alfabéticamente\n2. Busca nombres "casi iguales" seguidos\n3. Esos son tus candidatos a normalizar\n\nEjemplo: "Empresa X", "EMPRESA X", " Empresa X"',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Transformaciones encadenadas',
                            content: '🔗 En Power Query puedes encadenar:\n1. Selecciona columna\n2. Transformar > Recortar\n3. Transformar > MAYÚSCULAS\n4. Transformar > Limpiar (quita caracteres no imprimibles)\n\nTodo en una sola pasada.',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Todo en una fórmula M',
                            content: '🚀 Columna personalizada en Power Query:\n\n= Text.Upper(Text.Trim([client]))\n\nUna línea que hace TRIM + UPPER juntos.',
                            difficulty: 'intermediate'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Aún hay duplicados después de limpiar',
                            content: '🔍 Si DISTINCTCOUNT sigue alto:\n1. ¿Hay caracteres especiales? ("Empresa-A" vs "Empresa A")\n2. ¿Hay acentos? ("José" vs "Jose")\n3. ¿Hay abreviaciones? ("S.A." vs "SA" vs "S A")\n\nCada caso necesita limpieza adicional.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'El conteo no coincide con stepKey',
                            content: '❌ Si tu rawUniqueClients no coincide:\n1. Asegúrate de contar ANTES de aplicar transformaciones\n2. ¿Estás usando la columna correcta (client, no Cliente)?\n3. Refresca la medida después de cambios',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Tabla de mapeo de clientes',
                            content: '🧙 Para casos complejos, crea una tabla de "limpieza":\n\nOriginal → Limpio\n"Empresa A S.A." → "EMPRESA A"\n"Emp. A" → "EMPRESA A"\n\nUsas VLOOKUP/MERGE para normalizar sin perder el original.',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'El problema del CRM',
                            content: '📇 En CRMs reales:\n• Vendedores escriben nombres diferente\n• Imports de Excel traen formatos mezclados\n• Sistemas legacy tienen restricciones de caracteres\n\nResultado: "Un cliente" aparece 5 veces. Análisis de cartera es imposible sin normalizar.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué normalizar textos importa?',
                    reason: 'Si tu cartera dice 500 clientes pero realmente son 350 (con variaciones), tu análisis de concentración, churn, y valor por cliente está completamente mal.',
                    careerConnection: 'Master Data Management es una disciplina entera dedicada a esto. Empresas pagan consultores miles de dólares para limpiar sus datos de clientes.',
                    realExample: 'Una empresa de seguros pensaba tener 10,000 clientes únicos. Después de normalizar nombres y direcciones, eran 6,500. El 35% eran duplicados que fragmentaban el análisis.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo aplicar TRIM + UPPER en Power Query?',
                        criteria: 'Deberías poder hacerlo en menos de 30 segundos.',
                        action: 'Practica: Transforma "  hola mundo  " a "HOLA MUNDO".'
                    },
                    {
                        question: '¿Conozco la diferencia entre clientes antes y después?',
                        criteria: 'Deberías saber cuántos "fantasmas" eliminaste.',
                        action: 'Calcula: rawUniqueClients - ClientesUnicos = fantasmas eliminados.'
                    },
                    {
                        question: '¿Mi ClientesUnicos coincide con answerKey.ClientesUnicos?',
                        criteria: 'Debe ser exacto (tolerancia 0).',
                        action: 'Compara tu DISTINCTCOUNT post-limpieza con el answerKey.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Power Query Editor - columna client seleccionada',
                    leftBar: 'Pasos aplicados - verás "Texto en mayúsculas" y "Texto recortado"',
                    rightPanels: 'Propiedades de columna - verificar transformaciones',
                    topRibbon: 'Transformar > Formato > Recortar / MAYÚSCULAS'
                },

                expectedOutcome: 'Conteo real de clientes únicos después de normalizar nombres.'
            },
            {
                id: 'datarescue-5b',
                title: 'El Caos de las Fechas',
                chapter: 5.5,
                level: 3,
                xp: 850,
                coins: 210,
                description: 'Corruptex mezcló formatos de fecha y decimales. Estandariza el timeline.',
                storyContext: 'Fechas americanas ("01/15/2024") y europeas ("15/01/2024") mezcladas. El Time Intelligence falla. Unifica.',
                introNarrative: '⏳ "¿Qué día es hoy? ¿El mes 01 o el día 01?" Corruptex ha roto el calendario. Tu misión: sincronizar el tiempo.',
                outroNarrative: '📅 Cronología restaurada. El tiempo fluye correctamente. Corruptex se enfurece: "¡La lógica será tu fin!"',

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Entender formatos de fecha regionales (MM/DD vs DD/MM)',
                    'Usar "Change Type Using Locale" en Power Query',
                    'Identificar fechas ambiguas que no se pueden resolver',
                    'Validar que las fechas parseadas tengan sentido'
                ],
                prerequisiteKnowledge: [
                    'Saber abrir Power Query',
                    'Entender qué es una fecha vs texto',
                    'Conocer transformaciones básicas de columnas'
                ],
                realWorldAnalogy: '📅 Imagina un calendario donde "03/04/2024" podría ser 3 de abril (formato europeo) o 4 de marzo (formato americano). Si tu sistema asume uno pero los datos vienen en otro, tus análisis de tendencias están completamente desfasados.',
                conceptBreakdown: [
                    {
                        concept: 'MM/DD/YYYY vs DD/MM/YYYY',
                        explanation: 'USA escribe Mes/Día/Año. Europa y Latinoamérica escriben Día/Mes/Año. "01/02/2024" es diferente en cada región.',
                        emoji: '🌍'
                    },
                    {
                        concept: 'Fechas ambiguas',
                        explanation: '"05/03/2024" podría ser 5 de marzo o 3 de mayo. Sin contexto, es imposible saber cuál es correcta.',
                        emoji: '❓'
                    },
                    {
                        concept: 'Using Locale',
                        explanation: 'Power Query puede interpretar una columna de texto como fecha usando las reglas de un país específico.',
                        emoji: '🌐'
                    },
                    {
                        concept: 'Fechas inválidas',
                        explanation: '"31/02/2024" no existe. "00/00/0000" es basura. Estas generan errores al convertir.',
                        emoji: '💥'
                    }
                ],

                missionSteps: [
                    { id: 'dr5b_mcq_dateformat', type: 'mcq', prompt: '01/15/2024 es:', options: ['Americano (Mes/Día)', 'Europeo (Día/Mes)', 'ISO'], expected: 'Americano (Mes/Día)' },
                    { id: 'dr5b_photo', type: 'photo', prompt: 'Captura de columna Date limpia.', simulatedDelayMs: 2500, successMessage: 'Fechas limpias.' }
                ],
                validation: { type: 'numeric', measureId: 'FechasValidas', expectedFrom: 'answerKey.FechasValidas', tolerance: 0.01, requiredCards: ['DATE', 'TEXT'] },
                winImage: '/images/story/datarescue-5b-win.png',
                datasets: ['datarescue_date_chaos'],
                objectives: [
                    'Identificar qué formato predomina en el dataset (americano vs europeo)',
                    'Detectar fechas obviamente inválidas (errores, texto)',
                    'Aplicar "Change Type > Using Locale" en Power Query',
                    'Contar cuántas fechas se parsearon correctamente'
                ],
                guide: [
                    '📥 PASO 1: Carga el dataset "datarescue_date_chaos".',
                    '🔍 PASO 2: Revisa la columna de fecha. ¿Ves "01/15/2024"? Eso es MM/DD (americano).',
                    '📊 PASO 3: ¿Ves "FECHA" o "00/00/0000"? Esos son errores obvios de Corruptex.',
                    '🌐 PASO 4: En Power Query: Click derecho en columna > Cambiar tipo > Usando configuración regional.',
                    '🇺🇸 PASO 5: Selecciona "Inglés (Estados Unidos)" si el formato es MM/DD/YYYY.',
                    '🇪🇸 PASO 6: Selecciona "Español (España)" o similar si el formato es DD/MM/YYYY.',
                    '⚠️ PASO 7: Revisa errores. Filtra por "Error" para ver cuántos fallaron.',
                    '💾 PASO 8: Cierra y aplica. Cuenta fechas válidas vs totales.'
                ],
                tips: [
                    '💡 "01/15/2024" solo puede ser americano (no existe día 15 en mes 01 de forma europea).',
                    '🔍 Ordena la columna para ver patrones de fechas.',
                    '⚠️ Fechas como "05/06/2024" son AMBIGUAS - podrían ser de ambos formatos.',
                    '📊 El formato ISO "2024-01-15" es universal y preferible cuando puedas elegir.'
                ],

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'El problema de los formatos regionales',
                            content: '🌍 El mismo texto, diferentes significados:\n\n"03/04/2024" en USA = 4 de marzo\n"03/04/2024" en España = 3 de abril\n\nSi tu sistema asume mal el formato, tus análisis de tendencias están desfasados por semanas o meses.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'ISO 8601: El estándar universal',
                            content: '📋 El formato ISO es inequívoco:\n\n2024-03-15 = 15 de marzo de 2024 (siempre)\n\nAño-Mes-Día con guiones. Si puedes controlar el formato de entrada, usa este.',
                            difficulty: 'intermediate'
                        }
                    ],
                    interface: [
                        {
                            title: 'Using Locale en Power Query',
                            content: '🌐 La opción mágica:\n1. Click derecho en encabezado de columna\n2. Cambiar tipo > Usando configuración regional\n3. Elige tipo "Fecha"\n4. Elige cultura (ej: "Inglés (Estados Unidos)")\n\nPower Query interpreta según esa cultura.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Ver errores de conversión',
                            content: '🔴 Después de cambiar tipo:\n1. Click en filtro de la columna\n2. Busca "(Error)" en la lista\n3. Esos son registros que no se pudieron convertir\n\nDecide: ¿los eliminas, los corriges manualmente, o los marcas como inválidos?',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Conversión con M code',
                            content: '🚀 Fórmula M para forzar formato:\n\n= Date.FromText([FechaTexto], [Format="MM/dd/yyyy", Culture="en-US"])\n\nEspecifica exactamente qué formato esperas.',
                            difficulty: 'advanced'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Muchos errores después de convertir',
                            content: '❌ Si la mayoría son errores:\n1. Elegiste el locale incorrecto\n2. El dataset tiene formatos MEZCLADOS\n3. Hay textos inválidos como "FECHA" o "N/A"\n\nPrueba: filtra errores, ve los valores originales, identifica el patrón.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Fechas quedan mal después de convertir',
                            content: '🔍 Si las fechas "funcionan" pero están mal:\n• "05/03/2024" lo interpretó como marzo 5, pero era mayo 3\n\nRevisa unas fechas conocidas para validar. Si marzo viene antes que abril en tus datos, probablemente está bien.',
                            difficulty: 'intermediate'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Columna de diagnóstico de fechas',
                            content: '🧙 Antes de convertir, crea columna auxiliar:\n\n= if Text.Start([Fecha], 2) > "12" then "DD/MM" else "AMBIGUO"\n\nSi el primer número > 12, sabemos que es día, no mes.',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'El desastre de datos internacionales',
                            content: '🌐 Empresas multinacionales sufren esto diario:\n• Oficina USA envía MM/DD/YYYY\n• Oficina México envía DD/MM/YYYY\n• Oficina Japón envía YYYY/MM/DD\n\nConsolidar datos sin normalizar fechas = análisis de tendencias inútil.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué estandarizar fechas importa?',
                    reason: 'Time Intelligence (YoY, QoQ, tendencias) es la funcionalidad más poderosa de Power BI. Pero si tus fechas están mal parseadas, tus comparaciones temporales son basura.',
                    careerConnection: 'En empresas globales, el 80% de los problemas de integración de datos son de fechas y monedas. Dominar esto te hace invaluable.',
                    realExample: 'Un banco reportó que las transacciones de enero cayeron 50%. Resultado: fechas de diciembre en formato MM/DD se parsearon como del día 12 de cada mes, "desapareciendo" medio mes de data.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo identificar si una fecha es formato americano o europeo?',
                        criteria: 'Si el "día" > 12, es DD/MM. Si no, es ambiguo.',
                        action: 'Practica: "15/03/2024" → europeo. "03/15/2024" → americano.'
                    },
                    {
                        question: '¿Sé usar "Change Type Using Locale"?',
                        criteria: 'Deberías poder hacerlo en menos de 30 segundos.',
                        action: 'Practica en Power Query con una columna de texto de fechas.'
                    },
                    {
                        question: '¿Mis fechas válidas coinciden con answerKey.FechasValidas?',
                        criteria: 'Tolerancia del 1%. Muy fuera = locale incorrecto.',
                        action: 'Compara tu conteo de fechas exitosas con el answerKey.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Power Query Editor - columna de fecha seleccionada',
                    leftBar: 'Pasos aplicados - verás "Tipo cambiado con configuración regional"',
                    rightPanels: 'Panel de propiedades - tipo de dato debe ser "Fecha"',
                    topRibbon: 'Transformar > Detectar tipo de datos (NO usar - a veces falla)'
                },

                expectedOutcome: 'Timeline coherente con todas las fechas en formato uniforme.'
            },
            {
                id: 'datarescue-6',
                title: 'Clasificación de Riesgo',
                chapter: 6,
                level: 4,
                xp: 900,
                coins: 220,
                description: 'Aplica lógica compleja (IF + OR) para etiquetar operaciones.',
                storyContext: 'Nueva regla de negocio: Si PESO > 1000 O GANANCIA < 1000, es "Revisar". Automatiza esta etiqueta.',
                introNarrative: '🚨 El negocio necesita priorizar. No podemos revisar todo. Crea una lógica que marque automáticamente lo peligroso.',
                outroNarrative: '🏷️ Etiquetado automático funcionando. El equipo de auditoría te adora. Corruptex está acorralado.',

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Entender operadores lógicos: AND vs OR',
                    'Construir expresiones IF con condiciones compuestas',
                    'Aplicar reglas de negocio como columnas calculadas',
                    'Validar resultados contra una "confusion matrix" conceptual'
                ],
                prerequisiteKnowledge: [
                    'Conocer IF básico',
                    'Entender comparaciones (>, <, =)',
                    'Haber limpiado datos numéricos previamente'
                ],
                realWorldAnalogy: '🚦 Imagina un semáforo de riesgo automático: 🔴 si el paquete es MUY pesado O genera MUY poca ganancia, necesita revisión humana. La lógica OR significa que CUALQUIERA de las condiciones activa la alerta, no necesitan las dos.',
                conceptBreakdown: [
                    {
                        concept: 'IF con condición simple',
                        explanation: 'IF(condición, resultado_si_verdad, resultado_si_falso). Ejemplo: IF([Peso] > 1000, "Pesado", "Normal")',
                        emoji: '✅'
                    },
                    {
                        concept: 'OR: Cualquiera activa',
                        explanation: 'OR(A, B) = TRUE si A es verdad, O si B es verdad, O si ambas son verdad. Solo es FALSE si ambas son falsas.',
                        emoji: '🔀'
                    },
                    {
                        concept: 'AND: Ambas necesarias',
                        explanation: 'AND(A, B) = TRUE solo si A Y B son verdad. Si cualquiera es falsa, el resultado es FALSE.',
                        emoji: '🔗'
                    },
                    {
                        concept: 'Regla de negocio',
                        explanation: 'Una frase como "revisar si peso alto O ganancia baja" se traduce directamente a: IF(OR([Peso]>1000, [Ganancia]<1000), "Revisar", "OK")',
                        emoji: '📋'
                    }
                ],

                missionSteps: [
                    { id: 'dr6_mcq_rule', type: 'mcq', prompt: 'Lógica para "Revisar":', options: ['PESO > 1000 OR GANANCIA < 1000', 'AND', 'XOR'], expected: 'PESO > 1000 OR GANANCIA < 1000' },
                    { id: 'dr6_photo', type: 'photo', prompt: 'Captura de columna condicional.', simulatedDelayMs: 2000, successMessage: 'Lógica verificada.' }
                ],
                validation: { type: 'confusionMatrix', measureId: 'OperacionesRevisar', expectedFrom: 'answerKey.OperacionesRevisar', tolerance: 2, requiredCards: ['IF', 'OR'] },
                winImage: '/images/story/datarescue-6-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: [
                    'Entender la regla: PESO > 1000 OR GANANCIA < 1000 = "Revisar"',
                    'Crear columna calculada con IF + OR',
                    'Contar cuántas operaciones quedan marcadas',
                    'Verificar casos borde (exactamente 1000)'
                ],
                guide: [
                    '📋 PASO 1: Revisa la regla de negocio: Revisar si PESO > 1000 O GANANCIA < 1000.',
                    '🧮 PASO 2: Traduce a DAX: IF(OR([weightKg] > 1000, [profit] < 1000), "Revisar", "OK")',
                    '📊 PASO 3: Modelado > Nueva columna. Pega la fórmula.',
                    '⚠️ PASO 4: ¡Cuidado! Asegúrate de que [weightKg] y [profit] estén limpios primero.',
                    '🔍 PASO 5: Crea tarjeta: Operaciones a Revisar = COUNTROWS(FILTER(Tabla, [Clasificacion] = "Revisar"))',
                    '📈 PASO 6: Opcional: Tabla mostrando las operaciones marcadas.',
                    '✅ PASO 7: Tu conteo debe estar dentro de ±2 del answerKey.OperacionesRevisar',
                    '🎯 PASO 8: Verifica casos borde: ¿Qué pasa si peso = 1000 exacto?'
                ],
                tips: [
                    '💡 OR significa: si CUALQUIERA de las condiciones es verdad, el resultado es verdad.',
                    '⚠️ > 1000 no incluye 1000 exacto. Si quieres incluirlo, usa >=.',
                    '🔍 Revisa que la columna de profit no tenga errores antes de comparar.',
                    '📊 Un gráfico de dispersión (peso vs ganancia) visualiza la zona de "Revisar".'
                ],

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'OR vs AND en palabras',
                            content: '🔀 OR: "Si llueve O hay tráfico, llego tarde"\n→ Lluvia? Llego tarde. Tráfico? Llego tarde. Ambos? Llego tarde.\n\n🔗 AND: "Si tengo dinero Y tiempo, viajo"\n→ Necesito AMBOS para viajar. Uno solo no basta.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Tablas de verdad',
                            content: '📋 OR(A,B):\nA=V, B=V → V\nA=V, B=F → V\nA=F, B=V → V\nA=F, B=F → F\n\nAND(A,B):\nA=V, B=V → V\nA=V, B=F → F\nA=F, B=V → F\nA=F, B=F → F',
                            difficulty: 'intermediate'
                        }
                    ],
                    interface: [
                        {
                            title: 'Columna condicional en Power Query',
                            content: '📊 Alternativa sin DAX:\n1. Agregar columna > Columna condicional\n2. Nombre: "Clasificacion"\n3. Condición 1: weightKg > 1000 entonces "Revisar"\n4. Condición 2: profit < 1000 entonces "Revisar"\n5. De lo contrario: "OK"',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Formato condicional por clasificación',
                            content: '🎨 Haz visual la clasificación:\n1. Tabla con operaciones\n2. Selecciona columna Clasificación\n3. Formato > Reglas > "Revisar" = fondo rojo\n\nIdentificación instantánea en el dashboard.',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'IF anidado vs OR',
                            content: '🚀 Estas son equivalentes:\n\n// Opción 1: OR\nIF(OR([Peso]>1000, [Ganancia]<1000), "Revisar", "OK")\n\n// Opción 2: || operador\nIF([Peso]>1000 || [Ganancia]<1000, "Revisar", "OK")\n\n// Opción 3: IF anidado (más largo)\nIF([Peso]>1000, "Revisar", IF([Ganancia]<1000, "Revisar", "OK"))',
                            difficulty: 'intermediate'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Muchos más "Revisar" de lo esperado',
                            content: '🔍 Si tu conteo es muy alto:\n1. ¿La columna profit tiene errores que se evalúan como < 1000?\n2. ¿Usaste >= en lugar de >?\n3. ¿Los datos de peso/ganancia están limpios?\n\nFiltra "Revisar" y revisa los valores originales.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Columna da error',
                            content: '❌ Si la columna muestra Error:\n1. Nombres de columna incorrectos (revisar mayúsculas)\n2. La columna tiene valores que no se pueden comparar (texto)\n3. Paréntesis mal cerrados en la fórmula',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Múltiples niveles de riesgo',
                            content: '🧙 Expande la lógica a 3 niveles:\n\n= SWITCH(TRUE(),\n    [Peso] > 2000 && [Ganancia] < 500, "CRÍTICO",\n    [Peso] > 1000 || [Ganancia] < 1000, "REVISAR",\n    "OK"\n)\n\nSWITCH evalúa en orden y devuelve el primero que sea TRUE.',
                            difficulty: 'advanced'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'Reglas de negocio automatizadas',
                            content: '🏢 Casos reales:\n• Fraude: IF(monto > 10000 OR pais_inusual, "Revisar")\n• Inventario: IF(stock < minimo OR demanda > capacidad, "Reabastecer")\n• Crédito: IF(deuda > ingreso*0.4 OR morosidad > 30, "Rechazar")\n\nLa lógica OR/AND es la base de reglas automatizadas.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué automatizar clasificaciones importa?',
                    reason: 'Revisar manualmente 10,000 operaciones es imposible. Una regla bien diseñada reduce el trabajo a revisar solo las 500 que realmente importan.',
                    careerConnection: 'Business Rules Automation es una skill muy demandada. Poder traducir reglas de negocio a lógica DAX/SQL te posiciona como puente entre negocio y tecnología.',
                    realExample: 'Un equipo de auditoría revisaba 5,000 transacciones mensuales manualmente. Implementaron reglas IF/OR en Power BI y redujeron a revisar solo 300 "flaggeadas". Ahorraron 80 horas/mes.'
                },

                selfAssessment: [
                    {
                        question: '¿Puedo explicar la diferencia entre OR y AND?',
                        criteria: 'Deberías dar un ejemplo de cada uno en palabras.',
                        action: 'Escribe: OR = cualquiera activa. AND = ambas necesarias.'
                    },
                    {
                        question: '¿Sé construir IF con OR en DAX?',
                        criteria: 'Deberías poder escribir la fórmula sin ayuda.',
                        action: 'Escribe: IF(OR(condición1, condición2), "Si", "No")'
                    },
                    {
                        question: '¿Mi conteo de OperacionesRevisar está dentro de tolerancia?',
                        criteria: 'Debe estar dentro de ±2 del answerKey.',
                        action: 'Compara tu medida con answerKey.OperacionesRevisar.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Vista Informe - Tabla con clasificación y tarjeta de conteo',
                    leftBar: 'Vista Datos - verificar la columna Clasificacion',
                    rightPanels: 'Panel Campos - arrastrar Clasificacion a filtros/leyendas',
                    topRibbon: 'Modelado > Nueva columna (para la fórmula IF/OR)'
                },

                expectedOutcome: 'Tabla clasificada correctamente con regla de negocio automatizada.'
            },
            {
                id: 'datarescue-7',
                title: 'La Batalla Final',
                chapter: 7,
                level: 5,
                xp: 1500,
                coins: 400,
                description: 'Dashboard integral. Todas las limpiezas, todas las medidas.',
                storyContext: 'Ataque total. Todos los errores anteriores juntos. Construye el Dashboard Maestro para purgar el sistema definitivamente.',
                introNarrative: '🔥 "¡ESTO ES EL FIN!" Corruptex lanza todo su arsenal. Typos, nulos, duplicados... todo a la vez. Tu dashboard es el escudo final.',
                outroNarrative: '🌟 ¡VICTORIA! El dashboard brilla con luz verde. Los datos son puros. Corruptex se disuelve en bits desordenados. Eres el Guardián de los Datos.',

                // ========== CAMPOS PEDAGÓGICOS EXPANDIDOS ==========
                learningObjectives: [
                    'Integrar todas las técnicas de limpieza aprendidas',
                    'Construir un dashboard ejecutivo completo',
                    'Validar múltiples medidas contra answer keys',
                    'Demostrar dominio de calidad de datos de extremo a extremo'
                ],
                prerequisiteKnowledge: [
                    'Todas las misiones anteriores de DataRescue (1-6)',
                    'SUM, AVERAGE, COUNTROWS, DISTINCTCOUNT',
                    'IF, OR para clasificaciones',
                    'Power Query para limpiezas'
                ],
                realWorldAnalogy: '🏆 Imagina ser llamado a arreglar el sistema de datos de una empresa después de un ciberataque. Todo está mezclado: números corruptos, duplicados, fechas rotas, clientes fragmentados. Tu dashboard es la prueba de que dominas la calidad de datos.',
                conceptBreakdown: [
                    {
                        concept: 'Dashboard Ejecutivo',
                        explanation: 'Un resumen visual de los KPIs más importantes del negocio: Ganancia, Clientes, Operaciones en Riesgo. Todo en una página.',
                        emoji: '📊'
                    },
                    {
                        concept: 'Validación cruzada',
                        explanation: 'Cada medida debe coincidir con su answerKey. Es la prueba de que tu limpieza fue correcta.',
                        emoji: '✅'
                    },
                    {
                        concept: 'Storytelling con datos',
                        explanation: 'El dashboard cuenta una historia: ¿Cuánto ganamos? ¿Cuántos clientes tenemos? ¿Qué operaciones necesitan atención?',
                        emoji: '📖'
                    },
                    {
                        concept: 'Integración de técnicas',
                        explanation: 'Esta misión combina TODO: limpieza de nulos, extracción de texto, detección de outliers, normalización, lógica condicional.',
                        emoji: '🔗'
                    }
                ],

                missionSteps: [
                    { id: 'dr7_photo', type: 'photo', prompt: 'Captura del Dashboard Final.', simulatedDelayMs: 2500, successMessage: 'Dashboard Maestro validado.' }
                ],
                validation: {
                    type: 'composite',
                    measures: [
                        { id: 'GananciaTotal', expectedFrom: 'answerKey.GananciaTotal', tolerance: 0.02 },
                        { id: 'ClientesUnicos', expectedFrom: 'answerKey.ClientesUnicos', tolerance: 0 }
                    ],
                    requiredCards: ['SUM', 'AVERAGE', 'COUNT', 'IF']
                },
                winImage: '/images/story/datarescue-7-win.png',
                datasets: ['datarescue_full_challenge'],
                objectives: [
                    'Aplicar TODAS las limpiezas aprendidas en un solo dataset',
                    'Crear las medidas clave: GananciaTotal, PesoPromedio, ClientesUnicos',
                    'Agregar clasificación de riesgo con IF/OR',
                    'Construir dashboard de 1 página con storytelling visual'
                ],
                guide: [
                    '📥 PASO 1: Carga "datarescue_full_challenge" - contiene TODOS los tipos de errores.',
                    '🧹 PASO 2: En Power Query, aplica las limpiezas en orden:',
                    '   a) Limpia paréntesis en profit (Misión 1)',
                    '   b) Extrae números de weightKg (Misión 2)',
                    '   c) Normaliza client con TRIM + UPPER (Misión 5)',
                    '   d) Estandariza fechas con Using Locale (Misión 5b)',
                    '💾 PASO 3: Cierra y aplica Power Query.',
                    '📊 PASO 4: Crea las medidas:',
                    '   - GananciaTotal = SUM([profit])',
                    '   - PesoPromedio = AVERAGE([weightKg])',
                    '   - ClientesUnicos = DISTINCTCOUNT([client])',
                    '🏷️ PASO 5: Crea columna de clasificación: IF(OR([weightKg]>1000, [profit]<1000), "Revisar", "OK")',
                    '📈 PASO 6: Diseña tu dashboard:',
                    '   - Fila superior: 3 tarjetas (Ganancia, Clientes, Ops a Revisar)',
                    '   - Centro: Gráfico de barras por país',
                    '   - Lateral: Tabla de operaciones flaggeadas',
                    '✅ PASO 7: Valida: GananciaTotal y ClientesUnicos deben coincidir con answerKey.'
                ],
                tips: [
                    '💡 Orden importa: Limpia Power Query ANTES de crear medidas DAX.',
                    '🎨 Usa colores consistentes: Verde = bueno, Rojo = revisar.',
                    '📐 Deja espacio en blanco. Un dashboard limpio es más efectivo.',
                    '🔍 Valida cada medida por separado antes del dashboard completo.'
                ],

                // ========== CONTENIDO PREMIUM ==========
                premiumTips: {
                    concept: [
                        {
                            title: 'El pipeline de calidad de datos',
                            content: '🔄 Un proceso profesional de calidad:\n\n1. PROFILING: ¿Qué errores hay?\n2. LIMPIEZA: Corregir cada tipo\n3. VALIDACIÓN: ¿Coincide con la verdad?\n4. DOCUMENTACIÓN: ¿Qué hiciste?\n\nEsta misión cubre los 4 pasos.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Dashboard como prueba de competencia',
                            content: '🏆 Este dashboard demuestra:\n• Limpieza de datos (Power Query)\n• Cálculos agregados (DAX)\n• Lógica condicional (IF/OR)\n• Visualización efectiva\n• Validación de resultados\n\nEs un portfolio piece completo.',
                            difficulty: 'beginner'
                        }
                    ],
                    interface: [
                        {
                            title: 'Layout del dashboard ejecutivo',
                            content: '📐 Estructura recomendada:\n\n[TÍTULO DEL DASHBOARD]\n[KPI 1] [KPI 2] [KPI 3]    ← Tarjetas arriba\n[GRÁFICO PRINCIPAL          ]   ← Centro grande\n[TABLA     ] [GRÁFICO     ]   ← Abajo detalle\n\nOjo sigue de arriba-abajo, izquierda-derecha.',
                            difficulty: 'beginner'
                        },
                        {
                            title: 'Colores con significado',
                            content: '🎨 Paleta semántica:\n• 🟢 Verde: Positivo, meta cumplida, OK\n• 🔴 Rojo: Negativo, revisar, alerta\n• 🔵 Azul: Neutral, informativo\n• ⬛ Gris: Fondo, no importante\n\nEvita arcoiris sin significado.',
                            difficulty: 'beginner'
                        }
                    ],
                    shortcut: [
                        {
                            title: 'Bookmarks para validación',
                            content: '🚀 Crea bookmarks para cada validación:\n1. Bookmark "Vista Ganancia" - filtra solo métricas financieras\n2. Bookmark "Vista Clientes" - filtra solo cartera\n3. Bookmark "Vista Riesgo" - filtra solo flaggeados\n\nNavega rápido entre validaciones.',
                            difficulty: 'intermediate'
                        }
                    ],
                    troubleshooting: [
                        {
                            title: 'Una medida no coincide',
                            content: '🔍 Proceso de debug:\n1. ¿Aplicaste TODAS las limpiezas de Power Query?\n2. ¿La columna tiene el tipo de dato correcto?\n3. ¿Hay errores ocultos (filtro por null/error)?\n4. ¿Usaste la columna correcta en la medida?\n\nRevisa paso por paso la misión correspondiente.',
                            difficulty: 'intermediate'
                        },
                        {
                            title: 'Dashboard se ve desordenado',
                            content: '❌ Errores comunes de diseño:\n1. Demasiados elementos - simplifica\n2. Colores sin significado - usa paleta semántica\n3. Tablas muy grandes - muestra top 10 o filtra\n4. Títulos genéricos - sé específico\n\nMenos es más.',
                            difficulty: 'beginner'
                        }
                    ],
                    proTip: [
                        {
                            title: 'Documentación del proceso',
                            content: '🧙 En Power Query, renombra cada paso:\n• "Paso 1 - Limpiar paréntesis profit"\n• "Paso 2 - Extraer números peso"\n• etc.\n\nAsí tienes documentación automática de tu proceso de limpieza.',
                            difficulty: 'intermediate'
                        }
                    ],
                    realWorld: [
                        {
                            title: 'El día del reporte ejecutivo',
                            content: '👔 En empresas reales:\n• El CEO ve dashboards de 1 página\n• Cada número debe ser defendible\n• "¿De dónde sale este dato?" es pregunta común\n\nTu proceso de limpieza documentado responde esa pregunta.',
                            difficulty: 'beginner'
                        }
                    ]
                },

                whyItMatters: {
                    title: '¿Por qué esta batalla final importa?',
                    reason: 'Esta misión simula exactamente lo que harás en un trabajo real: recibir datos sucios, limpiarlos, analizarlos, y presentar resultados correctos y visualizados.',
                    careerConnection: 'Un dashboard como este, con documentación de tu proceso de limpieza, es un portfolio piece que puedes mostrar en entrevistas. Demuestra competencia end-to-end.',
                    realExample: 'Un analista junior fue promovido porque pudo limpiar y presentar datos de 5 sistemas diferentes en un solo dashboard ejecutivo. La competencia "calidad de datos + visualización" es rara y valorada.'
                },

                selfAssessment: [
                    {
                        question: '¿Todas mis medidas coinciden con los answerKeys?',
                        criteria: 'GananciaTotal ±2%, ClientesUnicos exacto.',
                        action: 'Compara cada medida con su answerKey correspondiente.'
                    },
                    {
                        question: '¿Mi dashboard cuenta una historia clara?',
                        criteria: 'Alguien sin contexto debería entender los KPIs principales en 10 segundos.',
                        action: 'Pide feedback a alguien que no conozca los datos.'
                    },
                    {
                        question: '¿Documenté mi proceso de limpieza?',
                        criteria: 'Los pasos en Power Query tienen nombres descriptivos.',
                        action: 'Revisa la lista de "Pasos aplicados" y renombra si es necesario.'
                    }
                ],

                interfaceGuide: {
                    mainArea: 'Vista Informe - tu dashboard de 1 página',
                    leftBar: 'Vista Datos - verificar que todas las columnas estén limpias',
                    rightPanels: 'Panel Visualizaciones para diseñar + Panel Formato para estilo',
                    topRibbon: 'Vista > Móvil para verificar responsividad'
                },

                expectedOutcome: 'Dashboard Maestro que demuestra dominio completo de calidad de datos en Power BI.'
            }
        ]
    },
    {
        id: 'stark',
        order: 3,
        name: 'Stark Industries',
        subtitle: 'El Legado de Iron Man',
        description: 'Auditoría Post-Endgame. Pepper Potts necesita organizar el caos de datos que Tony dejó.',
        icon: '🦾',
        color: '#ff4b2b',
        difficulty: 'Intermedio',
        image: '/images/worlds/stark.png',
        // CONTEXTO DE DIMENSIÓN
        dimension: 'Dimensión Tecnócrata (Tierra-616)',
        dimensionContext: 'Realidad de Hiper-Tecnología. Tony ha caído, y su legado digital se desmorona sin mantenimiento.',
        mentors: ['pepper', 'friday'],
        prologue: '¡SALTO COMPLETADO! Estás en la Torre Stark, Nueva York. Pero algo anda mal: JARVIS no responde y FRIDAY está en modo de emergencia.\n\nTony Stark ha dejado el mayor legado tecnológico del multiverso, pero sin auditoría, es solo chatarra costosa. Pepper Potts te entrega las llaves del servidor principal. Tu misión: poner orden en el caos de nanotecnología y presupuestos millonarios.',
        storyArc: 'Protocolo Legado',
        scoringProfile: 'office-standard',
        epilogue: 'Has ordenado el caos. Pepper mira los dashboards con melancolía pero gratitud. El legado de Tony está seguro, optimizado y listo para financiar el futuro. FRIDAY te saluda: "Protocolo de Auditoría Completado, Jefe."',
        skillsLearned: [
            { id: 'financial-analysis', name: 'Análisis Financiero', icon: '💰', description: 'Costos, ROI, Presupuestos' },
            { id: 'tech-trending', name: 'Tendencias Tecnológicas', icon: '📈', description: 'Evolución temporal, eficiencia' },
            { id: 'performance-tracking', name: 'KPIs de Desempeño', icon: '⚡', description: 'Métricas de éxito de equipo' }
        ],
        perfectRunBonus: 400,
        missions: [
            {
                id: 'stark-1',
                title: 'Costos de Mantenimiento',
                chapter: 1,
                level: 2,
                xp: 350,
                coins: 80,
                description: 'Analiza el historial de reparaciones de los Mark 1-85.',
                storyContext: 'Pepper necesita saber cuánto costó realmente mantener la "Legión de Hierro". Algunos trajes fueron destruidos, otros reparados mil veces. Identifica los sumideros de dinero.',
                introNarrative: '🤖 Happy Hogan te da una tablet: "Tony amaba estos trajes, pero contabilidad los odiaba. Dime cuál nos costó más reparar. Apuesto por el Hulkbuster."',
                outroNarrative: '💸 Reporte entregado. El Hulkbuster fue caro, pero el Mark 42 (el que explotaba solo) tuvo más incidentes. Pepper aprueba el presupuesto de reciclaje.',
                skillsDemo: ['dax-sum-avg'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Costo Total Reparaciones', 'Traje más costoso', 'Pareto de fallas'],
                datasets: ['stark_suit_repairs'],
                guide: ['Usa Pareto para ver el 80/20 de costos.'],
                tips: ['Verónica (Hulkbuster) tiene repuestos satelitales caros.'],
                expectedOutcome: 'Identificación de costos críticos.',
                validation: { type: 'numeric', measureId: 'CostoTotalReparaciones', expectedValue: 847500000, tolerance: 0.03, requiredCards: ['SUM'] },
            },
            {
                id: 'stark-2',
                title: 'Evolución del Arc Reactor',
                chapter: 2,
                level: 3,
                xp: 500,
                coins: 120,
                description: 'Grafica la mejora de eficiencia energética desde la Cueva hasta el Nano-tech.',
                storyContext: 'Rhodey quiere ver la curva de progreso. ¿Cuánto mejoró la tecnología Arc año tras año? Compara Output (Gigajoules) vs Input (Paladio/Vibranium).',
                introNarrative: '⚛️ "Tony construyó esto en una cueva... ¡con una caja de sobras!" dice el científico jefe. "Demuéstrame que nuestros nuevos modelos son mejores que esa caja."',
                outroNarrative: '🚀 Curva exponencial confirmada. El Mark 85 es 800% más eficiente que el Mark I. El legado tecnológico es innegable.',
                skillsDemo: ['tech-trending'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Calculo de Eficiencia', 'Línea de tiempo de mejoras'],
                datasets: ['stark_arc_reactors'],
                guide: ['Eficiencia = Output / Input.', 'Grafica vs Tiempo.'],
                tips: ['El descubrimiento del nuevo elemento cambió la curva.'],
                expectedOutcome: 'Gráfico de evolución tecnológica.',
                validation: { type: 'numeric', measureId: 'EficienciaMaxima', expectedValue: 847.5, tolerance: 0.02, requiredCards: ['MAX', 'AVERAGE'] },
            },
            {
                id: 'stark-3',
                title: 'Desempeño de los Vengadores',
                chapter: 3,
                level: 4,
                xp: 700,
                coins: 180,
                description: 'Evaluación de desempeño del equipo. Tasa de éxito y daños colaterales.',
                storyContext: 'Furia necesita un reporte para los Acuerdos de Sokovia (retroactivo). ¿Quién es el activo más eficiente? ¿Quién causa más destrozos? Analiza los logs de misiones.',
                introNarrative: '🛡️ "Necesito saber a quién llamar," dice Fury desde las sombras. "Natasha es precisa. Thor es un martillo. Dame números, no opiniones."',
                outroNarrative: '📊 Resulta que Black Widow tiene el ROI más alto (misión cumplida / costo bajo). Thor... bueno, Thor es caro pero efectivo. Fury toma el reporte y desaparece.',
                skillsDemo: ['performance-tracking'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Tasa de Éxito', 'Ranking de Daños'],
                datasets: ['stark_avengers_missions'],
                guide: ['Divide éxitos / intentos.', 'Suma costos por héroe.'],
                tips: ['Hulk rompe cosas. Hawkeye no falla.'],
                expectedOutcome: 'Scorecard de los Vengadores.',
                validation: { type: 'numeric', measureId: 'TasaExitoGlobal', expectedValue: 0.87, tolerance: 0.02, requiredCards: ['COUNTROWS', 'DIVIDE'] },
            },
            {
                id: 'stark-4',
                title: 'Acuerdos de Sokovia',
                chapter: 3,
                level: 5,
                xp: 950,
                coins: 250,
                description: 'Aplica lógica compleja (AND/OR) para determinar quién firma los acuerdos.',
                storyContext: 'El General Ross exige saber qué Vengadores son "Legales" y cuáles "Fugitivos". Las reglas son complejas: Deben haber firmado los acuerdos O estar retirados, Y no tener órdenes de arresto.',
                introNarrative: '📜 "El mundo ya no tolera vigilantes," dice Ross. "Dame la lista de quién está con nosotros y quién está contra la ley. Y sé preciso, Stark."',
                outroNarrative: '⚖️ Lista generada. Tony firma con pesar. Cap y su equipo son clasificados como fugitivos. La guerra civil ha comenzado... en tu hoja de cálculo.',
                skillsDemo: ['dax-logic'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Crear Columna Status', 'Lógica: Firmado OR Retirado', 'Filtro: No Arresto'],
                datasets: ['stark_sokovia_accords'],
                guide: ['Usa IF con condiciones anidadas o AND/OR.', 'Status = IF(Condicion, "Legal", "Fugitivo").'],
                tips: ['AND(cond1, cond2) obliga a que ambas sean ciertas.'],
                expectedOutcome: 'Clasificación legal de todos los héroes.',
                validation: { type: 'numeric', measureId: 'TotalFugitivos', expectedValue: 5, tolerance: 0, requiredCards: ['COUNTROWS', 'IF'] },
                winImage: '/images/story/stark-4-win.png'
            },
            {
                id: 'stark-5',
                title: 'El Costo de la Victoria',
                chapter: 4,
                level: 6,
                xp: 1200,
                coins: 300,
                description: 'Contabilidad final de la Batalla de la Tierra (Endgame).',
                storyContext: 'La batalla final salvó al universo, pero destruyó el complejo y consumió recursos incalculables. Pepper necesita el número final para cerrar los libros de la Fundación Stark.',
                introNarrative: '🌍 El polvo se ha asentado. Morgan está jugando en el jardín. Pepper te pide una última cosa: "¿Cuánto costó traerlos a todos de vuelta? Quiero saber el precio del milagro."',
                outroNarrative: '🕊️ El costo fue astronómico en dinero, pero "barato" comparado con la vida. El reporte se archiva bajo "Protocolo 3000". Gracias por todo, Tony.',
                skillsDemo: ['financial-analysis'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Consolidar costos de guerra', 'Reporte final'],
                datasets: ['stark_thanos_battle'],
                guide: ['Suma daños, equipos perdidos y suministros.', 'Resta valor recuperado.'],
                tips: ['El escudo del Cap no tiene precio (valor contable 0).'],
                expectedOutcome: 'Cierre financiero de la era Infinity.',
                validation: { type: 'numeric', measureId: 'CostoTotalVictoria', expectedValue: 15700000000, tolerance: 0.05, requiredCards: ['SUM', 'CALCULATE'] },
                winImage: '/images/story/stark-5-win.png'
            },
            {
                id: 'stark-6',
                title: 'Protocolo Ultron',
                chapter: 5,
                level: 3,
                xp: 800,
                coins: 200,
                description: 'Limpia el código corrupto. Extrae IDs ocultos en cadenas de texto caóticas.',
                storyContext: 'Restos del código de Ultron se ocultan en los logs del servidor. Se manifiestan como cadenas de texto sin sentido ("0xF_KILL_ALL_HUMANS_ID:8842"). Debes extraer solo el ID numérico limpio para la cuarentena.',
                introNarrative: '🤖 "Veo hilos...", susurra la interfaz. Ultron intenta reconstruirse ocultando sus funciones en metadatos basura. Pepper necesita que limpies estos logs antes de que la IA despierte.',
                outroNarrative: '🛡️ Amenaza neutralizada. Los IDs de los subrutinas malignas han sido aislados. "Protocolo Purificado", confirma FRIDAY. Pero, ¿por qué uno de los códigos decía "Visión"?',
                skillsDemo: ['dax-logic'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Limpiar "Ultron_Log"', 'Extraer ID numérico', 'Filtrar "KILL" commands'],
                datasets: ['stark_ultron_logs'],
                guide: ['Usa "Column from Examples" o Text.Select.', 'Elimina prefijos basura.'],
                tips: ['El patrón siempre es ID:XXXX.'],
                expectedOutcome: 'Tabla de logs limpia con IDs extraídos.',
                validation: { type: 'numeric', measureId: 'AmenazasAisladas', expectedValue: 42, tolerance: 0, requiredCards: ['COUNTROWS'] },
                winImage: '/images/story/stark-6-win.png'
            },
            {
                id: 'stark-7',
                title: 'Rastreo de Vibranium',
                chapter: 6,
                level: 4,
                xp: 900,
                coins: 250,
                description: 'Separa columnas complejas (Split Column) para rastrear envíos ilegales.',
                storyContext: 'Okoye ha interceptado manifiestos de carga, pero están codificados: "WAKANDA_2024-05-12_500KG". Necesitas separar Ubicación, Fecha y Cantidad en columnas distintas para analizar el tráfico.',
                introNarrative: '🙅🏿‍♀️ "No permitiremos que nuestro metal caiga en manos equivocadas." Okoye te da un archivo de texto plano. "Dime dónde, cuándo y cuánto. Ahora."',
                outroNarrative: '📍 Mapa de contrabando generado. Los envíos se dirigen a una base en el Ártico. Okoye moviliza a las Dora Milaje. Gracias a tu desglose de datos, sabemos exactamente qué buscar.',
                skillsDemo: ['data-quality'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Dividir columna por Delimitador (_)', 'Asignar tipos de dato correctos'],
                datasets: ['stark_vibranium_tracking'],
                guide: ['Split Column by Delimiter.', 'Cambia texto a fecha y número.'],
                tips: ['Cuidado con el orden de las nuevas columnas.'],
                expectedOutcome: 'Tres columnas limpias: Origen, Fecha, Kilos.',
                validation: { type: 'numeric', measureId: 'TotalVibraniumRobado', expectedValue: 5500, tolerance: 0.01, requiredCards: ['SUM'] },
                winImage: '/images/story/stark-7-win.png'
            },
            {
                id: 'stark-8',
                title: 'Armor Wars',
                chapter: 7,
                level: 5,
                xp: 1100,
                coins: 300,
                description: 'Usa "Merge Queries" (Anti-Join) para encontrar patentes robadas.',
                storyContext: 'Rhodey (War Machine) sospecha que Hammer Industries está usando tecnología Stark. Tienes dos listas: "Patentes Autorizadas" y "Tecnología Hammer detectada". Cruza las tablas para ver qué no cuadra.',
                introNarrative: '⚔️ "Hammer es un payaso, pero sus armas disparan de verdad." Tienes que probar el robo de propiedad intelectual. Encuentra las coincidencias... y las discrepancias.',
                outroNarrative: '🚫 ¡Te atrapé! El análisis "Anti-Join" revela 15 componentes idénticos que no están en la lista de licenciados. Justin Hammer tendrá que dar muchas explicaciones.',
                skillsDemo: ['data-quality'],
                wrongAnswerPenalty: 0.04,
                objectives: ['Merge: Left Anti', 'Identificar no-coincidencias'],
                datasets: ['stark_patents', 'hammer_tech'],
                guide: ['Usa Merge Queries.', 'Selecciona "Left Anti" para ver lo que falta.'],
                tips: ['La clave de unión es el "Serial_Component".'],
                expectedOutcome: 'Lista de tecnologías robadas.',
                validation: { type: 'numeric', measureId: 'PatentesInfringidas', expectedValue: 15, tolerance: 0, requiredCards: ['COUNTROWS'] },
                winImage: '/images/story/stark-8-win.png'
            },
            {
                id: 'stark-9',
                title: 'Memoria de VI',
                chapter: 8,
                level: 5,
                xp: 1200,
                coins: 350,
                description: 'Repara series de tiempo rotas usando "Fill Down" (Rellenar hacia abajo).',
                storyContext: 'Un ataque EMP dañó los bancos de memoria de F.R.I.D.A.Y. Los logs de sistema tienen huecos en la columna de fecha y hora. Usa la lógica de "el valor anterior es válido hasta que cambie" para restaurar la continuidad.',
                introNarrative: '🧠 "Señor... mis protocolos de memoria están... fragmentados." La voz de FRIDAY se corta. Ayuda a la IA a recordar qué pasó durante el apagón llenando los vacíos lógicos.',
                outroNarrative: '💾 Memoria restaurada. La línea de tiempo es continua de nuevo. FRIDAY vuelve a estar en línea al 100%. "Gracias, Boss. Eso se sintió como un déjà vu."',
                skillsDemo: ['dax-logic'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Fill Down (Rellenar Abajo)', 'Reconstruir Timeline'],
                datasets: ['stark_friday_memory'],
                guide: ['Transform > Fill > Down.', 'Nunca dejes nulos en una dimensión temporal.'],
                tips: ['Fill Down asume que el nulo es igual al superior.'],
                expectedOutcome: 'Dataset continuo sin nulos en fechas.',
                validation: { type: 'numeric', measureId: 'EventosRecuperados', expectedValue: 128, tolerance: 0, requiredCards: ['COUNTROWS'] },
                winImage: '/images/story/stark-9-win.png'
            }
        ]
    },
    {
        id: 'squid-game',
        order: 4,
        name: 'Squid Game Enterprise',
        subtitle: 'El Juego del Calamar',
        description: 'Eres el Analista del Front Man. Predice riesgos, deudas y ganadores. Frialdad numérica requerida.',
        icon: '🦑',
        color: '#ec4899',
        difficulty: 'Avanzado',
        image: '/images/worlds/squid-game.png',
        // CONTEXTO DE DIMENSIÓN
        dimension: 'Dimensión de Riesgo (Juegos Mortales)',
        dimensionContext: 'Un sistema donde la estadística dicta quién vive. Un error de cálculo cuesta la vida.',
        mentors: ['frontman', 'doll'],
        prologue: 'TE DESPIERTAS... en una sala de monitores oscura. Frente a ti, hombres con máscaras y trajes rosas esperan órdenes.\n\nBienvenido a la Sala de Control. Los VIPs llegan en 3 días. Aquí, los humanos son filas en un dataset y tu precisión determina su destino. El Front Man exige predicciones perfectas. "Calcula o muere". Haz tu trabajo y sobrevivirás.',
        storyArc: 'Estadísticas de Supervivencia',
        scoringProfile: 'office-standard',
        epilogue: 'El juego ha terminado. Tus modelos predijeron al ganador con 98% de precisión. Los VIPs están complacidos con sus ganancias. El Front Man te ofrece un ascenso... o una participación en el próximo juego. Tú decides cerrar la sesión.',
        skillsLearned: [
            { id: 'risk-analysis', name: 'Análisis de Riesgo', icon: '⚠️', description: 'Correlaciones, Segmentación' },
            { id: 'predictive-modeling', name: 'Modelado Predictivo', icon: '🔮', description: 'Scoring, Probabilidades' },
            { id: 'cohort-analysis', name: 'Análisis de Cohortes', icon: '👥', description: 'Supervivencia por grupos' }
        ],
        perfectRunBonus: 600,
        missions: [
            {
                id: 'sg-1',
                title: 'Perfiles de Deuda',
                chapter: 1,
                level: 4,
                xp: 600,
                coins: 150,
                description: 'Segmenta a los 456 jugadores por nivel de deuda y desesperación.',
                storyContext: '¿Quiénes son? ¿Cuánto deben? El Front Man quiere saber si la desesperación se correlaciona con la edad. Identifica los grupos demográficos más vulnerables.',
                introNarrative: '🎭 "456 participantes," dice la voz distorsionada. "Todos desesperados. Cuantifica esa desesperación. Quiero saber la deuda promedio por cabeza."',
                outroNarrative: '📉 Perfiles generados. Los jóvenes deben menos pero son más imprudentes. Los mayores tienen deudas impagables. Información útil para el diseño de juegos.',
                skillsDemo: ['risk-analysis'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Deuda Promedio', 'Correlación Edad-Deuda', 'Segmentación'],
                datasets: ['squid_players'],
                guide: ['Usa scatter plot Edad vs Deuda.', 'Crea bins de deuda.'],
                tips: ['La deuda total supera el PIB de un país pequeño.'],
                expectedOutcome: 'Mapa de calor de deuda.',
                validation: { type: 'numeric', measureId: 'DeudaTotalJugadores', expectedValue: 45600000000, tolerance: 0.02, requiredCards: ['SUM', 'AVERAGE'] },
                winImage: '/images/story/sg-1-win.png'
            },
            {
                id: 'sg-2',
                title: 'Luz Roja: Patrones de Eliminación',
                chapter: 2,
                level: 4,
                xp: 700,
                coins: 180,
                description: 'Analiza la masacre del Juego 1. ¿El pánico es contagioso?',
                storyContext: 'Más del 50% eliminados. Analiza las coordenadas de muerte. ¿Morían más rápido los que estaban cerca de otros que corrieron? Mapea el contagio del miedo.',
                introNarrative: '🔴 🟢 "El miedo huele," dice el Front Man. "Y se propaga. Muéstrame el mapa de calor de las eliminaciones. ¿Fue el pánico o la incompetencia?"',
                outroNarrative: '🗺️ Patrón confirmado. El pánico se irradió desde el centro. Los bordes sobrevivieron más. Datos fríos para un juego frío.',
                skillsDemo: ['cohort-analysis'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Tasa de Eliminación', 'Mapa de Calor', 'Factores de Pánico'],
                datasets: ['squid_game1_results'],
                guide: ['Calcula eliminados por cuadrante.', 'Tasa de mortalidad por zona.'],
                tips: ['El movimiento detectado fue fatal.'],
                expectedOutcome: 'Análisis espacial de la masacre.',
                validation: { type: 'numeric', measureId: 'JugadoresEliminadosJuego1', expectedValue: 231, tolerance: 0, requiredCards: ['COUNTROWS', 'FILTER'] },
                winImage: '/images/story/sg-2-win.png'
            },
            {
                id: 'sg-3',
                title: 'Gestión de VIPs',
                chapter: 3,
                level: 5,
                xp: 900,
                coins: 220,
                description: 'Maximiza el "Revenue" de las apuestas VIP.',
                storyContext: 'Los VIPs se aburren. Necesitamos identificar qué jugadores (caballos) generan más apuestas. Tu análisis guiará las cámaras para enfocar a los favoritos.',
                introNarrative: '🦁 "Nuestros invitados quieren espectáculo," dice el anfitrión. "Dime quién es el favorito del VIP #4. Le gusta apostar fuerte."',
                outroNarrative: '💰 Enfoque ajustado. Las apuestas subieron 200%. El jugador 067 y 456 son los favoritos. El VIP #4 está eufórico.',
                skillsDemo: ['financial-analysis'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Ganancia Neta', 'Favoritos VIP', 'ROI Evento'],
                datasets: ['squid_vip_bets'],
                guide: ['Suma apuestas por jugador y VIP.', 'Calcula margen.'],
                tips: ['Los VIPs odian perder.'],
                expectedOutcome: 'Estrategia de maximización de apuestas.',
                validation: { type: 'numeric', measureId: 'GananciaNeta', expectedValue: 33100000000, tolerance: 0.03, requiredCards: ['SUM', 'CALCULATE'] },
                winImage: '/images/story/sg-3-win.png'
            },
            {
                id: 'sg-5',
                title: 'La Ecuación del Ganador',
                chapter: 4,
                level: 6,
                xp: 1100,
                coins: 280,
                description: 'Modelo predictivo final. ¿Quién ganará el Calamar?',
                storyContext: 'Quedan 3. Gi-Hun (Suerte), Sang-Woo (Intelecto), Sae-byeok (Habilidad). Crea un modelo ponderado para predecir al ganador estadístico.',
                introNarrative: '🎲 "Solo uno puede quedar," susurra el Front Man. "La suerte, el cerebro, o el cuchillo. ¿Qué dicen tus números? Haz tu predicción."',
                outroNarrative: '🏆 El modelo apuntaba a Sang-Woo por lógica, pero la variable "Suerte/Humanidad" de Gi-Hun rompió la estadística. A veces, el outlier gana.',
                skillsDemo: ['predictive-modeling'],
                wrongAnswerPenalty: 0.03,
                objectives: ['Scoring Model', 'Radar Chart', 'Probabilidad Victoria'],
                datasets: ['squid_final_players'],
                guide: ['Pondera: Físico 30%, Mental 40%, Suerte 30%.', 'Calcula Score.'],
                tips: ['La naturaleza humana es la variable X.'],
                expectedOutcome: 'Predicción probabilística del campeón.',
                validation: { type: 'numeric', measureId: 'ProbabilidadGiHun', expectedValue: 0.42, tolerance: 0.05, requiredCards: ['SUM', 'MAX', 'DIVIDE'] },
                winImage: '/images/story/sg-5-win.png'
            },
            {
                id: 'sg-6',
                title: 'Análisis de Supervivencia por Cohortes',
                chapter: 5,
                level: 5,
                xp: 850,
                coins: 210,
                description: 'Usa CALCULATE y filtros de contexto para analizar tasas de supervivencia por demografía.',
                storyContext: 'El Front Man quiere optimizar la selección de futuros participantes. ¿Qué grupo demográfico genera mejor "contenido" (más supervivencia, más drama)? Analiza edad, género y origen. Los datos de 456 jugadores esperan tu análisis. La organización planea reclutar otros 500 jugadores el próximo año y necesita patrones estadísticos claros.',
                introNarrative: '📊 El Front Man te entrega un tablet con datos crudos. "Los números no mienten," dice desde las sombras. "Quiero saber qué segmento aguanta más. Las mujeres jóvenes, ¿son más resistentes? Los veteranos, ¿tienen experiencia o solo son frágiles? Necesito tasas de supervivencia por cohorte. Usa tus fórmulas DAX y no cometas errores... los VIPs están observando."',
                outroNarrative: '✅ Insight revelador presentado. Tu análisis muestra patrones claros: Las mujeres entre 25-35 tienen 32% de supervivencia (18% por encima del promedio de 14%). Los hombres mayores de 50 son eliminados 3x más rápido que el promedio. Los jugadores urbanos superan a los rurales por 11%. "Excelente trabajo," murmura el Front Man. "Estos datos redefinirán nuestro reclutamiento. Has ganado otro día de vida."',
                skillsDemo: ['risk-analysis', 'cohort-analysis'],
                wrongAnswerPenalty: 0.03,
                objectives: [
                    'Crear columna calculada: GrupoEdad = IF(Players[Edad]<26, "18-25", IF(Players[Edad]<36, "26-35", IF(Players[Edad]<51, "36-50", "50+")))',
                    'Medida base: TotalJugadores = COUNTROWS(Players)',
                    'Medida: Supervivientes = CALCULATE(COUNTROWS(Players), Players[Status]="Vivo")',
                    'Medida: TasaSupervivencia = DIVIDE([Supervivientes], [TotalJugadores], 0)',
                    'Medida avanzada: SupervivenciaPorGenero = CALCULATE([TasaSupervivencia], Players[Genero])',
                    'Medida con filtros múltiples: SupervivenciaMujeresJovenes = CALCULATE([TasaSupervivencia], Players[Genero]="Mujer", Players[GrupoEdad]="26-35")',
                    'Crear matriz bidimensional: Género (filas) x Grupo Edad (columnas)',
                    'Aplicar formato condicional de mapa de calor basado en TasaSupervivencia'
                ],
                datasets: ['squid_players', 'squid_elimination_log'],
                guide: [
                    '1. PREPARACIÓN: En Power Query, verifica que la columna Status tenga valores "Vivo" o "Eliminado" (sin espacios extra).',
                    '2. COLUMNA CALCULADA: Crea GrupoEdad en la tabla Players usando IF anidados para segmentar por edad.',
                    '3. MEDIDA BASE: TotalJugadores = COUNTROWS(Players) - Esta es tu denominador.',
                    '4. MEDIDA FILTRADA: Usa CALCULATE para contar solo los jugadores con Status="Vivo".',
                    '5. DIVISIÓN SEGURA: DIVIDE incluye automáticamente manejo de división por cero (tercer parámetro = 0).',
                    '6. FILTROS MÚLTIPLES: CALCULATE acepta múltiples condiciones separadas por comas (actúan como AND).',
                    '7. MATRIZ: Arrastra Genero a filas, GrupoEdad a columnas, TasaSupervivencia a valores.',
                    '8. FORMATO CONDICIONAL: Aplica escala de color (rojo 0% → verde 40%) para visualizar patrones.',
                    '9. VALIDACIÓN: La suma de Supervivientes + Eliminados debe = 456 jugadores totales.'
                ],
                tips: [
                    'CALCULATE es el corazón de DAX - cambia el contexto de filtro mientras mantiene otros filtros activos.',
                    'DIVIDE(numerador, denominador, valor_si_cero) es más seguro que el operador / porque evita errores #DIV/0.',
                    'Los filtros en CALCULATE se aplican como AND lógico (todos deben cumplirse).',
                    'El contexto de fila + CALCULATE permite análisis granular sin necesidad de crear tablas auxiliares.',
                    'Usa formato porcentual (0.32 = 32%) para las tasas de supervivencia.',
                    'El mapa de calor revela patrones visuales que las tablas numéricas ocultan.',
                    'Valida siempre: [Supervivientes] + [Eliminados] debe igualar [TotalJugadores].'
                ],
                expectedOutcome: 'Dashboard interactivo con matriz 4x2 (4 grupos edad x 2 géneros = 8 segmentos). Mapa de calor mostrando que Mujeres 26-35 tienen la tasa más alta (32% - verde intenso) y Hombres 50+ la más baja (8% - rojo). Tarjetas KPI mostrando promedios globales: 27% mujeres vs 11% hombres. Slicer para filtrar por origen (Urbano/Rural).',
                verification: [
                    { question: "¿Tasa de supervivencia exacta de mujeres 26-35?", type: "number", answer: 0.32, hint: "Usa CALCULATE con dos filtros: Genero='Mujer' AND GrupoEdad='26-35'." },
                    { question: "¿Segmento con MENOR supervivencia?", type: "choice", options: ["Hombres 50+", "Mujeres 18-25", "Hombres 26-35", "Mujeres 50+"], answer: "Hombres 50+", hint: "Busca la celda roja más intensa en tu matriz de calor. La tasa más baja (8%) está en Hombres mayores de 50." },
                    { question: "¿Diferencia entre mejor y peor segmento (puntos porcentuales)?", type: "number", answer: 24, hint: "32% (Mujeres 26-35) - 8% (Hombres 50+) = 24 puntos." },
                    { question: "¿Cuántos jugadores totales en el grupo 18-25?", type: "number", answer: 142, hint: "Filtra por GrupoEdad='18-25' y usa [TotalJugadores]." }
                ],
                winImage: '/images/story/sg-6-win.png'
            },
            {
                id: 'sg-7',
                title: 'Time Intelligence: Evolución del Juego',
                chapter: 6,
                level: 6,
                xp: 950,
                coins: 240,
                description: 'Domina funciones de inteligencia temporal DAX para analizar la progresión del juego.',
                storyContext: 'Los VIPs quieren ver la "curva de emoción": ¿cuándo ocurren más eliminaciones? ¿El ritmo se acelera o desacelera? El director de broadcasting necesita saber cuándo programar los cortes comerciales (no durante picos de acción). Necesitas crear medidas de tiempo acumulado y comparaciones periodo a periodo. Los 6 días de juegos generaron 144 horas de datos por analizar.',
                introNarrative: '⏱️ El anfitrión VIP se ajusta la máscara dorada. "El timing lo es todo en el entretenimiento. Quiero ver eliminaciones acumuladas por día, hora por hora. ¿Cuándo llega el clímax? ¿El ritmo se acelera exponencialmente o es lineal? Tus medidas DAX deben capturar el ritmo del juego. El broadcaster pagó 80 millones por la transmisión y quiere maximizar ratings."',
                outroNarrative: '📈 Análisis temporal completado. Patrón identificado: Las primeras 6 horas son las más letales (264 eliminados - 58% del total). Después la curva se aplana significativamente. El "clímax dramático" perfecto para las cámaras es Día 3, Hora 14 (Juego del Puente de Cristal). La tasa de cambio llegó a +420% en Día 1 Hora 2 (pánico en Luz Roja). "Brillante," dice el VIP. "Ahora sé exactamente cuándo vender los derechos de replay."',
                skillsDemo: ['predictive-modeling', 'risk-analysis'],
                wrongAnswerPenalty: 0.03,
                objectives: [
                    'Crear tabla Calendar relacionada con Tiempo[FechaHora]',
                    'Medida base: TotalEliminados = COUNTROWS(FILTER(Eliminaciones, Eliminaciones[Status]="Eliminado"))',
                    'Medida acumulada: EliminacionesAcumuladas = CALCULATE([TotalEliminados], FILTER(ALL(Tiempo[FechaHora]), Tiempo[FechaHora] <= MAX(Tiempo[FechaHora])))',
                    'Medida comparativa: EliminacionesHoraAnterior = CALCULATE([TotalEliminados], DATEADD(Tiempo[FechaHora], -1, HOUR))',
                    'Medida de velocidad: TasaCambio = DIVIDE([TotalEliminados] - [EliminacionesHoraAnterior], [EliminacionesHoraAnterior], 0)',
                    'Medida de promedio móvil: PromedioMovil3H = CALCULATE([TotalEliminados], DATESINPERIOD(Tiempo[FechaHora], LASTDATE(Tiempo[FechaHora]), -3, HOUR))',
                    'Gráfico combinado: Línea de acumulado + Columnas de eliminados por hora',
                    'Agregar línea de tendencia polinómica para proyectar'
                ],
                datasets: ['squid_elimination_timeline', 'squid_calendar'],
                guide: [
                    '1. CREAR CALENDAR: Verifica que exista relación entre Calendar[Fecha] y Tiempo[FechaHora]. Marca la tabla Calendar como "Tabla de Fechas".',
                    '2. MEDIDA BASE: Cuenta las filas donde Status="Eliminado" - este es tu numerador por periodo.',
                    '3. PATRÓN ACUMULADO: FILTER(ALL(campo_tiempo), campo_tiempo <= MAX(campo_tiempo)) es el patrón universal para totales acumulados.',
                    '4. ALL() EXPLAINED: Elimina TODOS los filtros de la columna tiempo, permitiendo ver el historial completo.',
                    '5. MAX() EN CONTEXTO: Dentro del FILTER, MAX() obtiene el punto de tiempo actual de cada fila del visual.',
                    '6. DATEADD: Función de time intelligence que mueve el contexto -1 hora. Requiere tabla Calendar marcada correctamente.',
                    '7. TASA DE CAMBIO: (Actual - Anterior) / Anterior te da el % de aceleración/desaceleración.',
                    '8. PROMEDIO MÓVIL: DATESINPERIOD crea ventanas temporales deslizantes - útil para suavizar fluctuaciones.',
                    '9. GRÁFICO COMBO: Usa eje secundario para comparar magnitudes diferentes (acumulado vs por periodo).',
                    '10. VALIDACIÓN: El último punto de EliminacionesAcumuladas debe = 456 - [Supervivientes_finales].'
                ],
                tips: [
                    'Tabla Calendar bien configurada es OBLIGATORIA para time intelligence - marca como "Tabla de Fechas" en Modelado.',
                    'ALL() elimina filtros, ALLSELECTED() respeta slicers del usuario - elige según necesidad.',
                    'MAX(campo[tiempo]) en contexto de fila obtiene el "punto actual" - crucial para acumulados.',
                    'FILTER(ALL(...)) es el patrón más poderoso de DAX - memorízalo.',
                    'DATEADD, DATESINPERIOD, PREVIOUSDAY requieren una tabla Calendar marcada correctamente.',
                    'La tasa de cambio identifica puntos de inflexión - perfecto para detección de anomalías.',
                    'Promedio móvil suaviza ruido - compara con datos crudos para ver tendencias reales.',
                    'Los acumulados siempre crecen o se mantienen - si bajan, hay un error en la fórmula.',
                    'Usa ISFILTERED() para detectar si el usuario está filtrando y ajustar comportamiento.'
                ],
                expectedOutcome: 'Dashboard con gráfico combinado: Área de EliminacionesAcumuladas (eje izquierdo) + Columnas de TotalEliminados por hora (eje derecho) + Línea de PromedioMovil3H. Tarjeta KPI mostrando "Hora Pico: Día 1, Hora 2 (87 eliminados, +420% vs hora anterior)". Línea de tendencia mostrando deceleración exponencial después de Día 1. Slicer de fecha para filtrar por día específico.',
                verification: [
                    { question: "¿Total eliminados acumulado al final del Día 3?", type: "number", answer: 389, hint: "Filtra hasta Día 3 23:59 y lee [EliminacionesAcumuladas]." },
                    { question: "¿Hora con MAYOR tasa de cambio (%)?", type: "choice", options: ["Día 1, Hora 1", "Día 1, Hora 2", "Día 2, Hora 1", "Día 3, Hora 5"], answer: "Día 1, Hora 2", hint: "Busca el máximo en [TasaCambio]. Fue durante el juego de Luz Roja, Luz Verde — +420% vs hora anterior." },
                    { question: "¿Eliminados en las últimas 12 horas del juego?", type: "number", answer: 12, hint: "Filtra Día 6 Horas 12-23 y suma." },
                    { question: "¿Promedio móvil 3H en el pico Día 1 Hora 2?", type: "number", answer: 62, hint: "Lee la medida [PromedioMovil3H] en ese punto." }
                ],
                winImage: '/images/story/sg-7-win.png'
            },
            {
                id: 'sg-8',
                title: 'Variables DAX: Optimización del Código',
                chapter: 7,
                level: 5,
                xp: 800,
                coins: 200,
                description: 'Refactoriza medidas complejas usando VAR para mejorar rendimiento y legibilidad.',
                storyContext: 'El sistema está lento durante las transmisiones en vivo. Tus medidas calculan SUM(Bets[Amount]) tres veces en la misma fórmula - eso significa tres escaneos completos de 1.2 millones de filas. El Front Man te ordena optimizar el código DAX usando variables (VAR) para almacenar resultados intermedios y evitar recálculos. El Performance Analyzer muestra que algunas medidas tardan 8+ segundos.',
                introNarrative: '⚙️ El técnico de la sala de control te muestra el Performance Analyzer. "Mira esto: 8.4 segundos para calcular [ValorNeto]. Estás recalculando SUM tres veces. ¡Tres veces! Usa VAR para almacenar cálculos intermedios. El Front Man no tolera lag durante las transmisiones en vivo. Los VIPs pagan por contenido en tiempo real, no para ver spinners de carga." Te extiende una tablet con código DAX desastroso. "Refactoriza. Todo. Ahora."',
                outroNarrative: '🚀 Optimización completada. Performance Analyzer muestra mejoras dramáticas: [ValorNeto] bajó de 8.4s a 2.8s (-65%). [ScoreCompuesto] de 12.1s a 4.3s (-64%). [MargenSeguridad] de 15.7s a 6.1s (-61%). Las medidas ahora usan VAR para almacenar subtotales - cada valor se calcula UNA vez y se reutiliza. El código es infinitamente más legible. El técnico asiente con aprobación: "El streaming en vivo es fluido. Buen trabajo." El Front Man observa desde las sombras: "Eficiencia. Eso me gusta."',
                skillsDemo: ['predictive-modeling'],
                wrongAnswerPenalty: 0.025,
                objectives: [
                    'Abrir Performance Analyzer (Vista > Performance Analyzer) y grabar benchmark inicial',
                    'Refactorizar MEDIDA INCORRECTA: ValorNeto = SUM(Bets[Amount]) - (SUM(Bets[Amount])*0.15) - (SUM(Bets[Amount])*0.03)',
                    'Versión optimizada: ValorApuestas = VAR TotalApostado = SUM(Bets[Amount]) VAR Comision = TotalApostado * 0.15 VAR TasaPlataforma = TotalApostado * 0.03 RETURN TotalApostado - Comision - TasaPlataforma',
                    'Crear ScoreCompuesto = VAR Fisico = [PuntajeFisico] VAR Mental = [PuntajeMental] VAR Suerte = [PuntajeSuerte] VAR ScoreTotal = (Fisico*0.3) + (Mental*0.4) + (Suerte*0.3) RETURN ScoreTotal',
                    'Crear MargenSeguridad = VAR JugadoresActivos = [Supervivientes] VAR CapacidadMaxima = 456 VAR Utilizacion = DIVIDE(JugadoresActivos, CapacidadMaxima) VAR MargenPorcentual = 1 - Utilizacion RETURN MargenPorcentual',
                    'Medida avanzada con tabla en VAR: TopApuestasVIP = VAR TablaFiltrada = FILTER(Bets, Bets[VIP_Tier]="Gold") VAR SumaTop = SUMX(TablaFiltrada, Bets[Amount]) RETURN SumaTop',
                    'Ejecutar benchmark final en Performance Analyzer y comparar'
                ],
                datasets: ['squid_vip_bets', 'squid_players', 'squid_performance_log'],
                guide: [
                    '1. ANTES DE EMPEZAR: Abre Performance Analyzer (pestaña Vista). Click "Iniciar grabación" y actualiza visual para establecer baseline.',
                    '2. SINTAXIS VAR: VAR NombreDescriptivo = [Expresión_DAX] - La expresión se evalúa UNA vez y se guarda.',
                    '3. MÚLTIPLES VAR: Apila cuantas necesites ANTES del RETURN. Se evalúan en orden secuencial.',
                    '4. ALCANCE: Las variables solo existen dentro de la medida - no son globales.',
                    '5. REUTILIZACIÓN: Una VAR calculada se puede usar múltiples veces en el RETURN sin recalcular.',
                    '6. TIPOS: VAR puede almacenar escalares (números), texto, fechas, o TABLAS completas.',
                    '7. TABLAS EN VAR: VAR MiTabla = FILTER(...) - Luego usa SUMX(MiTabla, ...) o COUNTROWS(MiTabla).',
                    '8. RETURN OBLIGATORIO: Siempre la última línea - devuelve el resultado final.',
                    '9. NOMBRES DESCRIPTIVOS: Usa "TotalVentas" no "x1" - el código debe auto-documentarse.',
                    '10. PERFORMANCE: Click "Detener grabación" en Performance Analyzer, compara "Duración total consulta DAX".'
                ],
                tips: [
                    'VAR no solo optimiza - hace el código RADICALMENTE más legible y mantenible.',
                    'Si usas la misma expresión 2+ veces, SIEMPRE usa VAR - evita DRY (Don\'t Repeat Yourself).',
                    'Los nombres descriptivos de VAR actúan como documentación inline: VAR MargenBruto en vez de VAR m.',
                    'VAR puede almacenar tablas completas - poderoso para filtros complejos: VAR ClientesActivos = FILTER(...).',
                    'El orden de las VAR importa - puedes usar VAR anteriores en VAR posteriores.',
                    'RETURN puede ser una expresión compleja, pero si usas VAR bien, debería ser simple y legible.',
                    'Performance Analyzer no miente - un SUM repetido 3 veces tarda 3x más, literalmente.',
                    'VAR mejora cache hits internos de DAX - el motor reconoce valores pre-calculados.',
                    'Usa VAR incluso si no hay repetición - claridad > brevedad en código empresarial.'
                ],
                expectedOutcome: 'Tres medidas refactorizadas con VAR que ejecutan 60-65% más rápido según Performance Analyzer. Código DAX limpio, auto-documentado y mantenible. Comparación lado a lado en tabla: Medida | Antes | Después | Mejora% mostrando ganancia de rendimiento. Dashboard carga sin lag durante interacción del usuario.',
                verification: [
                    { question: "¿Cuántas VAR usaste en ScoreCompuesto?", type: "number", answer: 4, hint: "Físico, Mental, Suerte, ScoreTotal." },
                    { question: "¿Valor final de ValorApuestas (millones)?", type: "number", answer: 28135, hint: "Total de apuestas menos 15% comisión menos 3% tasa plataforma." },
                    { question: "¿Mejora de rendimiento promedio (%)?", type: "number", answer: 65, hint: "Promedio de las 3 medidas según Performance Analyzer." },
                    { question: "¿Tipo de dato que guardaste en VAR de TopApuestasVIP?", type: "choice", options: ["Tabla", "Número", "Texto", "Fecha"], answer: "Tabla", hint: "FILTER() devuelve una tabla filtrada. TablaFiltrada es una tabla, no un escalar.", academyHint: "Lee el concepto 'TABLAS EN VAR' en el paso 6 de la guía." }
                ],
                winImage: '/images/story/sg-8-win.png'
            },
            {
                id: 'sg-9',
                title: 'RANKX: El Podio de los Condenados',
                chapter: 8,
                level: 6,
                xp: 1000,
                coins: 260,
                description: 'Usa RANKX y funciones de clasificación para crear leaderboards dinámicos.',
                storyContext: 'Los VIPs quieren un leaderboard en tiempo real para sus apuestas: ¿quién tiene más probabilidades de ganar el gran premio? Crea rankings dinámicos que se actualicen automáticamente basados en múltiples métricas (resistencia física, habilidad mental, victorias previas, alianzas formadas). El sistema debe manejar empates correctamente y permitir comparaciones por subgrupos. Las apuestas totalizan $2.3 billones - los rankings deben ser precisos.',
                introNarrative: '🏅 El VIP principal golpea la mesa con su bastón dorado. "Queremos drama, datos y dinero. Un leaderboard que cambie en vivo cada vez que un jugador gane o pierda. Usa RANKX para clasificar a los jugadores por su score compuesto. El mejor debe estar SIEMPRE en la cima. Y quiero ver rankings por género también - estoy apostando que una mujer ganará. Necesito ver si mi inversión es inteligente o emocional." Los otros VIPs asienten. Tus rankings influenciarán billones en apuestas.',
                outroNarrative: '📊 Sistema de ranking dinámico activado. RANKX recalcula instantáneamente en cada actualización. Los VIPs observan fascinados: El jugador 456 (Gi-hun) salta del puesto #7 al #2 después de formar alianza estratégica con el jugador 001. La jugadora 067 (Sae-byeok) mantiene firmemente el #1 con score de 847. El jugador 101 colapsa del #3 al #8 tras fallar en el juego de canicas (-124 puntos). "¡Brillante!" exclama el VIP. "Ahora veo que mi apuesta en la 067 va ganando. Esto es mejor que Wall Street." Los VIPs aplauden mientras redistribuyen sus apuestas basándose en tus rankings.',
                skillsDemo: ['predictive-modeling', 'cohort-analysis'],
                wrongAnswerPenalty: 0.03,
                objectives: [
                    'Medida base: RankingGeneral = RANKX(ALL(Players), [ScoreCompuesto], , DESC, DENSE)',
                    'Medida contextual: RankingPorGenero = RANKX(ALLSELECTED(Players[Genero]), [ScoreCompuesto], , DESC, DENSE)',
                    'Medida de empates: TipoRanking_Skip = RANKX(ALL(Players), [ScoreCompuesto], , DESC, SKIP)',
                    'Medida condicional: TopN_Indicador = IF([RankingGeneral] <= 10, "Top 10", IF([RankingGeneral] <= 20, "Top 20", "Resto"))',
                    'Medida de brecha: DistanciaDelLider = [ScoreCompuesto] - MAXX(ALL(Players), [ScoreCompuesto])',
                    'Medida de brecha relativa: BrechaRelativa% = DIVIDE([DistanciaDelLider], MAXX(ALL(Players), [ScoreCompuesto]), 0)',
                    'Medida de percentil: Percentil = DIVIDE([RankingGeneral], COUNTROWS(ALL(Players)), 0)',
                    'Crear tabla visual con Players[Nombre], [ScoreCompuesto], [RankingGeneral], [RankingPorGenero], [DistanciaDelLider]',
                    'Aplicar formato condicional: Top 3 verde, 4-10 amarillo, 11-20 naranja, resto rojo',
                    'Agregar iconos de tendencia basados en cambio de ranking vs día anterior'
                ],
                datasets: ['squid_players', 'squid_performance_log', 'squid_alliances'],
                guide: [
                    '1. SINTAXIS RANKX: RANKX(tabla, expresión, [valor_si_empate], [orden], [tipo_empate])',
                    '2. PARÁMETRO TABLA: ALL(Players) considera TODOS los jugadores, ignorando filtros de fila. ALLSELECTED respeta slicers.',
                    '3. EXPRESIÓN: [ScoreCompuesto] es la medida por la cual rankear - debe retornar un valor escalar.',
                    '4. ORDEN: DESC (mayor=1) o ASC (menor=1). Omitir el 3er parámetro (valor_si_empate).',
                    '5. TIPO EMPATE: DENSE (1,2,2,3) vs SKIP (1,2,2,4 - estilo olímpico). DENSE es mejor para leaderboards.',
                    '6. ALL() vs ALLSELECTED: ALL ignora TODO, ALLSELECTED respeta slicers/filtros de página pero no de fila.',
                    '7. CONTEXTO DE FILA: RANKX itera sobre cada fila de Players y calcula su posición contra ALL(Players).',
                    '8. MAXX PARA MÁXIMO: MAXX(ALL(Players), [ScoreCompuesto]) encuentra el score del líder.',
                    '9. FORMATO CONDICIONAL: Reglas > Según valor del campo > Usar [RankingGeneral] con umbrales.',
                    '10. VALIDACIÓN: El jugador con mayor [ScoreCompuesto] DEBE tener [RankingGeneral] = 1.'
                ],
                tips: [
                    'RANKX es una función ITERADORA - Power BI crea una fila virtual para cada registro y evalúa la expresión.',
                    'DESC ordena de mayor (#1) a menor. ASC invierte (menor score = #1) - útil para rankings de "menor costo".',
                    'DENSE vs SKIP: DENSE (1,2,2,3) mantiene continuidad. SKIP (1,2,2,4) refleja cantidad real (dos segundos, el siguiente es cuarto).',
                    'RANKX con ALL() crea "ranking absoluto". Con ALLSELECTED() crea "ranking filtrado" que respeta slicers.',
                    'Usa RANKX para crear segmentos: IF([Ranking]<=10, "Elite", "Resto") - perfecto para formato condicional.',
                    'MAXX(ALL(...), [medida]) es el patrón para encontrar el máximo global ignorando filtros de fila.',
                    'La brecha relativa (%) es más informativa que absoluta: -50 puntos es mucho si el líder tiene 200, poco si tiene 1000.',
                    'COUNTROWS(ALL(Players)) da el total de jugadores - útil para calcular percentiles.',
                    'Combina IF + RANKX para crear bandas: Top 10%, Top 25%, etc.',
                    'Para rankings históricos, agrega una dimensión de tiempo y filtra por MAX(Fecha).'
                ],
                expectedOutcome: 'Leaderboard interactivo multi-columna: [Pos. General | Jugador | Score | Pos. en Género | Gap del Líder | Gap % | Categoría]. Formato condicional por bandas (Top 3 verde brillante, 4-10 verde claro, 11-20 amarillo, resto rojo gradiente). Slicer de Género funcional (al filtrar "Mujer", RankingPorGenero muestra 1-N solo entre mujeres). Tarjeta KPI destacando "Líder Actual: Jugador 067 (Score: 847)". Iconos ▲▼ mostrando si subió/bajó vs ranking previo.',
                verification: [
                    { question: "¿Jugador en posición #1 del ranking general?", type: "choice", options: ["Jugador 067", "Jugador 456", "Jugador 001", "Jugador 101"], answer: "Jugador 067", hint: "Ordena la tabla por [RankingGeneral] ascendente. La jugadora 067 (Sae-byeok) tiene el score más alto: 847." },
                    { question: "¿Cuántos jugadores en Top 10 son mujeres?", type: "number", answer: 4, hint: "Filtra [RankingGeneral]<=10, luego cuenta por Genero='Mujer'." },
                    { question: "¿Diferencia de score entre #1 y #10?", type: "number", answer: 147, hint: "Jugador #10 lee su [DistanciaDelLider] (será negativo, toma valor absoluto)." },
                    { question: "¿Posición del jugador 456 en ranking de hombres?", type: "number", answer: 2, hint: "Filtra Genero='Hombre' y lee su [RankingPorGenero]." },
                    { question: "Si dos jugadores tienen score 654, ¿qué ranking tienen con DENSE?", type: "choice", options: ["Mismo número", "Uno después de otro", "Se ignora uno", "Error"], answer: "Mismo número", hint: "DENSE asigna el mismo rank a empates: ambos serían #X, y el siguiente sería #X+1." }
                ],
                winImage: '/images/story/sg-9-win.png'
            }
        ]
    },
    {
        id: 'hogwarts',
        order: 5,
        name: 'Ministerio de Magia: Archivos',
        subtitle: 'Universo Harry Potter',
        description: 'Maneja los datos mágicos del mundo. Desde Gringotts hasta Hogwarts.',
        icon: '⚡',
        color: '#9b59b6',
        difficulty: 'Intermedio',
        image: '/images/worlds/gringotts.png',
        // CONTEXTO DE DIMENSIÓN
        dimension: 'Dimensión Mágica (Mundo Oculto)',
        dimensionContext: 'Archivos milenarios en pergamino. La magia es poderosa, pero sus datos son arcaicos.',
        mentors: ['dumbledore', 'hat'],
        prologue: 'APARECES EN: Gringotts, el banco de los magos. Pero no hay oro... solo montañas de pergaminos polvorientos.\n\nEl Ministerio de Magia está en crisis. Siglos de historia mágica se están perdiendo porque nadie saben usar "Data-Magic" (Power BI). Dumbledore te ha convocado. Tu varita será tu mouse. Revela los secretos ocultos antes de que los Nifflers se coman los datos.',
        storyArc: 'La Gran Digitalización Mágica',
        scoringProfile: 'office-standard',
        epilogue: '¡Mischief Managed! Los archivos están digitalizados. Has descubierto patrones que ni Dumbledore conocía. El mundo mágico es más transparente (y eficiente) gracias a ti. Una lechuza te trae tu carta de felicitación oficial.',
        skillsLearned: [
            { id: 'currency-conversion', name: 'Conversión de Divisas', icon: '💱', description: 'Galeones, Sickles y Knuts' },
            { id: 'sports-analytics', name: 'Analítica Deportiva', icon: '🧹', description: 'Estadísticas de Quidditch' },
            { id: 'historical-analysis', name: 'Análisis Histórico', icon: '📜', description: 'Tendencias a largo plazo' }
        ],
        perfectRunBonus: 450,
        missions: [
            {
                id: 'hp-1',
                title: 'Auditoría a Gringotts',
                chapter: 1,
                level: 2,
                xp: 350,
                coins: 90,
                description: 'Los duendes desconfían. Normaliza su economía compleja.',
                storyContext: 'Griphook te mira con sospecha. "Los humanos no entienden nuestro oro." Demuéstrale lo contrario convirtiendo transacciones mixtas a una moneda base estandarizada.',
                introNarrative: '🏦 Entras a Gringotts. "1 Galeón son 17 Sickles, 1 Sickle son 29 Knuts," recita el duende rápido. "Si fallas por un Knut, te comerá el dragón."',
                outroNarrative: '🐉 Balance cuadrado al centavo. Griphook asiente con respeto (apenas). El oro está seguro y contabilizado.',
                skillsDemo: ['currency-conversion'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Conversión de Moneda', 'Balance Total'],
                datasets: ['hogwarts_transactions'],
                guide: ['Crea columnas calculadas para cambio de divisa.'],
                tips: ['493 Knuts hacen un Galeón.'],
                expectedOutcome: 'Estándar financiero mágico.',
                validation: { type: 'numeric', measureId: 'VolumenTotalGaleones', expectedValue: 125000, tolerance: 0.05, requiredCards: ['SUM', 'IF'] }
            },
            {
                id: 'hp-2',
                title: 'La Liga de Quidditch',
                chapter: 2,
                level: 3,
                xp: 500,
                coins: 130,
                description: 'Analiza la temporada. Busca al verdadero Buscador estrella.',
                storyContext: 'Oliver Wood está obsesionado con ganar. Necesita saber qué equipo tiene la mejor defensa y quién captura el Snitch más rápido. Tus datos definirán la estrategia de Gryffindor.',
                introNarrative: '🧹 "¡No es solo volar!" grita Wood. "¡Son estadísticas! ¿Goles por minuto? ¿Efectividad de golpeadores? Dámelo todo."',
                outroNarrative: '🏆 Estrategia definida. Los datos muestran que buscar el Snitch demasiado rápido deja la defensa abierta. Wood toma nota.',
                skillsDemo: ['sports-analytics'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Puntos por Casa', 'Efectividad Buscador'],
                datasets: ['hogwarts_quidditch'],
                guide: ['Analiza la correlación Puntos vs Victoria.'],
                tips: ['El Snitch son 150 puntos, pero no garantiza la victoria.'],
                expectedOutcome: 'Playbook de Quidditch basado en datos.',
                validation: { type: 'numeric', measureId: 'VictoriasGryffindor', expectedValue: 8, tolerance: 0, requiredCards: ['COUNTROWS', 'CALCULATE'] }
            },
            {
                id: 'hp-3',
                title: 'El Sombrero Seleccionador',
                chapter: 3,
                level: 4,
                xp: 650,
                coins: 160,
                description: '¿Existe sesgo en la selección? Analiza 50 años de datos.',
                storyContext: 'Hermione cree que el Sombrero tiene sesgos sistémicos. Analiza la distribución de "Sangre Pura" vs "Nacidos de Muggles" en las casas. ¿Es Slytherin realmente exclusivo?',
                introNarrative: '🎩 "Hmm... difícil. Muy difícil," murmura el Sombrero. "¿Crees que puedes psicoanalizarme con una hoja de cálculo? ¡Inténtalo!"',
                outroNarrative: '🐍 Patrones revelados. Hay correlación, pero también excepciones notables (Snape, Sirius). El Sombrero admite que considera la "elección" como variable clave.',
                skillsDemo: ['historical-analysis'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Distribución por Casa', 'Análisis de Linaje'],
                datasets: ['hogwarts_students'],
                guide: ['Usa gráficos de columnas 100% apiladas.'],
                tips: ['No olvides a los Hufflepuff.'],
                expectedOutcome: 'Informe sociológico de Hogwarts.',
                validation: { type: 'numeric', measureId: 'PorcentajeSlytherin', expectedValue: 0.25, tolerance: 0.03, requiredCards: ['COUNTROWS', 'DIVIDE'] }
            },
            {
                id: 'hp-6',
                title: 'La Segunda Guerra Mágica',
                chapter: 4,
                level: 6,
                xp: 1300,
                coins: 350,
                description: 'Preservación Histórica. Documenta el costo del conflicto.',
                storyContext: 'La guerra terminó, pero la historia debe escribirse con hechos. Kingsley Shacklebolt te pide un censo de daños, batallas y héroes caídos para el Memorial.',
                introNarrative: '⚡ "Para que no olvidemos," dice Kingsley. "Registra cada varita rota, cada gigante caído. La verdad es nuestra mejor defensa."',
                outroNarrative: '🕯️ El Memorial Digital está listo. Los nombres fluyen en la pantalla. Un tributo eterno basado en la verdad inalterable de los datos.',
                skillsDemo: ['historical-analysis'],
                wrongAnswerPenalty: 0.02,
                objectives: ['Censo de Bajas', 'Mapa de Batallas'],
                datasets: ['hogwarts_war_data'],
                guide: ['Dashboard solemne y preciso.'],
                tips: ['Maneja los datos con respeto.'],
                expectedOutcome: 'Archivo histórico definitivo.',
                validation: { type: 'composite', measures: [{ id: 'TotalBajas', expectedValue: 127, tolerance: 5 }], requiredCards: ['SUM', 'COUNTROWS'] }
            }
        ]
    }
];
