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
        prologue: 'David Wallace ha enviado un ultimátum: Scranton debe demostrar su viabilidad financiera o será absorbida por Stamford. Michael Scott te ha nombrado "Asistente del Asistente del Gerente Regional (de Datos)". Tu misión: usar Power BI para transformar el caos de Michael en reportes que salven la sucursal.',
        storyArc: 'La Batalla por Scranton',
        scoringProfile: 'office-standard',
        epilogue: `🎉 ¡INCREÍBLE! Lo lograste.

Michael está llorando de orgullo (y un poco porque pensó que lo despedirían). Gracias a tus análisis en Power BI, David Wallace ha declarado oficialmente a Scranton como la MEJOR SUCURSAL de Dunder Mifflin.

Dwight te ha otorgado el título honorario de "Asistente del Asistente del Gerente Regional de Datos" (AAGRdD). Jim te ha dado un high-five silencioso. Pam te ha hecho un dibujo.

— "That's what she said... sobre los datos." - Michael Scott`,

        skillsLearned: [
            { id: 'data-import', name: 'Importación de Datos', icon: '📥', description: 'Cargar datos desde Excel/CSV a Power BI' },
            { id: 'data-cleaning', name: 'Limpieza de Datos', icon: '🧹', description: 'Text.Proper, formatos de fecha, normalización' },
            { id: 'dax-sum-avg', name: 'SUM y AVERAGE', icon: '➕', description: 'Agregaciones básicas con DAX' },
            { id: 'dax-calculate', name: 'CALCULATE con Filtros', icon: '🔮', description: 'La función más poderosa de DAX' },
            { id: 'dax-distinctcount', name: 'DISTINCTCOUNT', icon: '🎯', description: 'Contar valores únicos' },
            { id: 'profitability', name: 'Análisis de Rentabilidad', icon: '📊', description: 'Márgenes, variables (VAR), impacto de descuentos' }
        ],
        perfectRunBonus: 300,
        missions: [
            {
                id: 'office-1',
                title: 'Bienvenido a Dunder Mifflin',
                chapter: 1,
                level: 1,
                xp: 150,
                coins: 50,
                description: 'Tu primer día. Importa los datos de ventas y conoce al equipo.',
                storyContext: 'Michael insiste en que "las personas compran papel a personas", pero Jan Levinson quiere ver números. Tu primera tarea es cargar el histórico de ventas y asegurarte de que los datos estén limpios.',
                introNarrative: '📋 Michael te recibe con un abrazo incómodo: "¡Bienvenido a la familia Dunder Mifflin! Tu escritorio está junto al de Dwight... perdón por eso. Ahora, David Wallace quiere ver NÚMEROS. ¿Puedes hacer magia con esos datos?"',
                outroNarrative: '✅ ¡Excelente trabajo! Michael está impresionado: "¡Eso fue como cuando Wayne Gretzky dijo... bueno, no recuerdo qué dijo, pero fue épico!"\n\nPero hay un problema... Toby acaba de encontrar un archivo de pesadilla.',
                skillsDemo: ['data-import'],
                wrongAnswerPenalty: 0.02,
                objectives: [
                    'Importar dataset de ventas (Excel/CSV)',
                    'Corregir la columna "Fecha" (texto a Date)',
                    'Formatear "Amount" como moneda',
                    'Crear Medida: TotalFilas = COUNTROWS(Sales)',
                    'Crear Medida: TotalVentasBruto = SUM(Sales[Amount])'
                ],
                datasets: ['office_sales'],
                guide: [
                    '1. Abre Power BI > Obtener Datos > Excel.',
                    '2. Verifica tipos de dato en Power Query (Fecha, Moneda).',
                    '3. Crea medidas básicas para validar la carga.'
                ],
                tips: [
                    'Revisa siempre la calidad antes de analizar.',
                    'Nombres como "Jim Halpert" deben ser consistentes.'
                ],
                expectedOutcome: 'Modelo limpio con ~500 transacciones y medidas base.',
                verification: [
                    { question: "¿Cuántas filas totales de ventas cargaste?", type: "number", answer: 500, hint: "Usa COUNTROWS." },
                    { question: "¿Cuántos tipos de papel vendemos?", type: "number", answer: 12, hint: "DISTINCTCOUNT de Producto." },
                    { question: "¿Cuál es el total bruto de ventas?", type: "number", answer: 847500, hint: "SUM(Amount)." }
                ],
                winImage: '/images/story/office-1-win.png'
            },
            {
                id: 'office-1b',
                title: 'La Pesadilla del Archivo de Toby',
                chapter: 1.5,
                level: 1,
                xp: 250,
                coins: 75,
                description: 'Toby encontró un archivo de clientes con datos sucios. Limpia mayúsculas y fechas.',
                storyContext: 'Toby descubrió un archivo Excel antiguo de clientes que nunca fue limpiado. Los nombres están en "MAYÚSCULAS", "minúsculas", o "MeZcLaDoS". Las fechas son un caos ("01/15/2024" vs "15-Ene-2024"). Michael dice: "Esto es peor que Scott\'s Tots".',
                introNarrative: '😰 Toby murmura: "Sé que nadie me escucha, pero este archivo es vital para contabilidad." Michael rueda los ojos: "¡Toby es la alegría del vampiro de la diversión!" Pero tú sabes que tiene razón; sin esto, no hay reporte.',
                outroNarrative: '🧹 ¡Impecable! Toby sonríe (por primera vez en meses). Michael admite: "Bueno, supongo que Toby no destruyó todo hoy." Prepara los reportes, ¡se acercan los Dundies!',
                skillsDemo: ['data-cleaning'],
                wrongAnswerPenalty: 0.02,
                objectives: [
                    'Normalizar nombres con Text.Proper()',
                    'Unificar formatos de fecha',
                    'Limpiar caracteres especiales en teléfonos',
                    'Identificar emails inválidos (sin @)'
                ],
                datasets: ['office_dirty_clients'],
                guide: [
                    '1. Usa Text.Proper para nombres propios.',
                    '2. Usa "Usando configuración regional" para fechas americanas.',
                    '3. Filtra emails inválidos.'
                ],
                tips: [
                    'Text.Clean() elimina caracteres invisibles.',
                    'Text.Trim() quita espacios extra.'
                ],
                expectedOutcome: 'Tabla de clientes 100% normalizada y lista para relacionar.',
                verification: [
                    { question: "¿Cuántos clientes tienen el nombre corregido?", type: "number", answer: 45, hint: "Verifica Text.Proper." },
                    { question: "¿Cuántos emails inválidos detectaste?", type: "number", answer: 3, hint: "Busca los que no tienen '@'." }
                ],
                winImage: '/images/story/office-1b-win.png'
            },
            {
                id: 'office-2',
                title: 'Premios Dundies',
                chapter: 2,
                level: 1,
                xp: 300,
                coins: 100,
                description: 'Michael necesita datos para los premios. Usa medidas básicas (SUM, AVERAGE).',
                storyContext: 'Es la noche de los Dundies en Chili\'s. Este año, Michael quiere dar premios "basados en datos" (para impresionar a Jan). Necesita: "Mejor Vendedor" (Total) y "Venta más Promedio" (Avg).',
                introNarrative: '🏆 "¡Bienvenidos a los Dundies!" Michael ajusta el micrófono. "Quiero datos picantes. ¿Quién es el rey de las ventas? ¿Quién es el más... promedio? ¡Sorpréndeme!"',
                outroNarrative: '🎤 ¡Éxito rotundo! Dwight ganó "Vendedor Supremo", Jim "Promedio de Oro". Stanley ganó "Mejor Comedor de Pretzels" (sin datos). Pero Dwight y Jim ahora discuten sobre quién es REALMENTE mejor...',
                skillsDemo: ['dax-sum-avg'],
                wrongAnswerPenalty: 0.02,
                objectives: [
                    'Medida: TotalVentas = SUM(Sales)',
                    'Medida: TicketPromedio = AVERAGE(Sales)',
                    'Ranking de vendedores por Total y Promedio',
                    'Visualizar en gráfico de barras'
                ],
                datasets: ['office_sales'],
                guide: [
                    '1. Crea medidas SUM y AVERAGE.',
                    '2. Usa matriz para comparar vendedores.',
                    '3. Aplica formato condicional.'
                ],
                tips: [
                    'MAX y MIN sirven para premios extremos.',
                    'El formato condicional ayuda a Michael a leer rápido.'
                ],
                expectedOutcome: 'Ranking claro: Dwight #1 en volumen, Jim buen ticket promedio.',
                verification: [
                    { question: "¿Quién tiene la mayor venta TOTAL?", type: "text", answer: "Dwight Schrute", hint: "Ordena por suma de Amount." },
                    { question: "¿Cuál es el ticket promedio global?", type: "number", answer: 1695, hint: "Toda la tabla." }
                ],
                winImage: '/images/story/office-2-win.png'
            },
            {
                id: 'office-3',
                title: 'La Rivalidad: Dwight vs Jim',
                chapter: 3,
                level: 2,
                xp: 500,
                coins: 150,
                description: 'Usa CALCULATE y FILTER para arbitrar la guerra de ventas.',
                storyContext: 'Dwight dice que vende más "Calidad Premium". Jim dice que Dwight solo vende volumen barato. Usa CALCULATE para filtrar ventas "Premium" y ver quién gana en ese segmento.',
                introNarrative: '⚔️ "¡Falso!" grita Dwight. "Mis clientes son de élite." Jim mira a la cámara: "Dwight vende papel para envolver pescado." Tu trabajo: filtrar los datos y ver quién miente.',
                outroNarrative: '📊 Resulta que Dwight vende más volumen, pero Jim tiene mejor margen en productos Premium durante Q1. Es un empate técnico. Michael sugiere un duelo de sumo para desempatar.',
                skillsDemo: ['dax-calculate'],
                wrongAnswerPenalty: 0.025,
                objectives: [
                    'Medida: VentasDwight = CALCULATE([TotalVentas], Salesperson="Dwight")',
                    'Medida: VentasPremium = CALCULATE([TotalVentas], Product="Premium")',
                    'Comparar desempeño mensual'
                ],
                datasets: ['office_sales'],
                guide: [
                    '1. CALCULATE es tu filtro mágico.',
                    '2. Crea medidas separadas para cada rival.',
                    '3. Grafica línea de tiempo mensual.'
                ],
                tips: [
                    'CALCULATE modifica el contexto de filtro.',
                    'Compara manzanas con manzanas (mismo periodo).'
                ],
                expectedOutcome: 'Dwight gana en total, Jim gana en meses específicos.',
                verification: [
                    { question: "¿Diferencia exacta ($) entre Dwight y Jim?", type: "number", answer: 15400, hint: "[VentasDwight] - [VentasJim]" },
                    { question: "¿Mes donde Jim superó a Dwight?", type: "text", answer: "Febrero", hint: "Mira el gráfico de líneas." }
                ],
                winImage: '/images/story/office-3-win.png'
            },
            {
                id: 'office-4',
                title: 'La Fusión (The Merger)',
                chapter: 4,
                level: 3,
                xp: 800,
                coins: 200,
                description: 'Integra los datos de Stamford. Usa Append y DISTINCTCOUNT.',
                storyContext: 'Stamford cierra. Andy Bernard y Karen llegan a Scranton. Debes fusionar las bases de datos de ventas y re-calcular métricas globales. ¿Hubo canibalización de clientes?',
                introNarrative: '🏢 Caos. Andy canta a cappella. Stanley está furioso por el ruido. Tienes dos archivos Excel: "Scranton_Sales" y "Stamford_Sales". Haz que sean uno solo.',
                outroNarrative: '🤝 Base de datos unificada. La "Super-Sucursal" ahora factura 30% más. Andy se atribuye el mérito, pero sabemos que fuiste tú y Power Query.',
                skillsDemo: ['dax-distinctcount'],
                wrongAnswerPenalty: 0.025,
                objectives: [
                    'Anexar (Append) tablas de Stamford y Scranton',
                    'Crear columna "Origen"',
                    'Medida: ClientesUnicos = DISTINCTCOUNT(Cliente)',
                    'Analizar duplicidad de cartera'
                ],
                datasets: ['office_sales_merged'],
                guide: [
                    '1. Importa ambos archivos.',
                    '2. Usa "Anexar Consultas" para unirlos verticalmente.',
                    '3. DISTINCTCOUNT cuenta sin repetir.'
                ],
                tips: [
                    'Verifica que las columnas tengan el mismo nombre antes de anexar.',
                    'Si un cliente compra en ambas, DISTINCTCOUNT lo cuenta como 1 (correcto).'
                ],
                expectedOutcome: 'Reporte consolidado. Scranton aporta 70%, Stamford 30%.',
                verification: [
                    { question: "¿Total de vendedores únicos tras la fusión?", type: "number", answer: 14, hint: "DISTINCTCOUNT de Salesperson." },
                    { question: "¿Ventas totales combinadas?", type: "number", answer: 1250000, hint: "SUM total." }
                ],
                winImage: '/images/story/office-4-win.png'
            },
            {
                id: 'office-5',
                title: 'El Billete Dorado',
                chapter: 5,
                level: 4,
                xp: 1200,
                coins: 300,
                description: 'Análisis de escenario What-If. ¿Fue el descuento un error fatal?',
                storyContext: 'Michael dio 5 cupones de 10% descuento al cliente más grande (Blue Cross). David Wallace está furioso. Calcula si el aumento de volumen compensa la pérdida de margen.',
                introNarrative: '💰 "¡¿CINCO BILLETES AL MISMO CLIENTE?!" David grita por el teléfono. Michael te mira con pánico. "Demuéstrale que fue una estrategia de marketing genial... por favor."',
                outroNarrative: '📈 ¡Salvados por los números! Tu análisis muestra que el volumen extra casi cubrió el descuento. David se calma. Scranton sobrevive un día más.\n\nHas completado el arco de Dunder Mifflin.',
                skillsDemo: ['profitability'],
                wrongAnswerPenalty: 0.03,
                objectives: [
                    'Calcular Margen Actual vs Margen Simulado',
                    'Crear parámetro What-If para el % descuento',
                    'Calcular punto de equilibrio de volumen'
                ],
                datasets: ['office_golden_ticket'],
                guide: [
                    '1. Crea medidas con VAR para estructurar el cálculo.',
                    '2. Usa Parámetro de Hipótesis para variar el %.',
                    '3. Visualiza el impacto en cascada.'
                ],
                tips: [
                    'Margen = Venta - Costo.',
                    '10% descuento requiere ~11% más volumen para compensar.'
                ],
                expectedOutcome: 'Defensa financiera sólida. La pérdida fue mínima vs el riesgo de perder el cliente.',
                verification: [
                    { question: "¿Pérdida neta exacta por el descuento?", type: "number", answer: 24500, hint: "Diferencia de márgenes." },
                    { question: "¿Margen % post-descuento?", type: "number", answer: 35, hint: "Nuevo Margen / Nueva Venta." }
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
        prologue: '¡Alerta Roja! El villano "Corruptex" ha infiltrado la base de datos global. Ha inyectado nulos, duplicados y outliers. Los Dashboards mienten. Tu misión: usar las "Cartas DAX" (Héroes) para combatir las anomalías y restaurar los KPIs.',
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
                introNarrative: '👾 "¡Tus beneficios son cero!" ríe Corruptex. El dashboard muestra pérdidas, pero sabemos que es falso. Usa SUM y limpieza básica para revelar el dinero real.',
                outroNarrative: '💰 ¡Ganancia restaurada! Pero Corruptex no se detiene: "El dinero no importa si la gravedad está rota..."',
                missionSteps: [
                    { id: 'dr1_mcq_formula', type: 'mcq', prompt: 'Fórmula para reconstruir GANANCIA:', options: ['Venta - Costo', 'Costo - Venta', 'Venta / Costo'], expected: 'Venta - Costo' },
                    { id: 'dr1_invalid_profit', type: 'numeric', prompt: 'Registros con GANANCIA inválida:', expectedFrom: 'stepKey.invalidProfitCount', tolerance: 0 },
                    { id: 'dr1_photo', type: 'photo', prompt: 'Sube captura de tu Power Query o medida DAX.', simulatedDelayMs: 2000, successMessage: 'Evidencia aceptada.' }
                ],
                validation: { type: 'numeric', measureId: 'GananciaTotal', expectedFrom: 'answerKey.GananciaTotal', tolerance: 0.02, requiredCards: ['SUM', 'IF'] },
                winImage: '/images/story/datarescue-1-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: ['Limpiar columna Ganancia', 'Calcular SUM(Ganancia)'],
                guide: ['1. Crea columna condicional.', '2. Suma el resultado.'],
                tips: ['Los paréntesis indican negativo.'],
                expectedOutcome: 'KPI correcto de Ganancia Total.'
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
                missionSteps: [
                    { id: 'dr2_mcq_clean', type: 'mcq', prompt: 'Mejor forma de limpiar "100 kg":', options: ['Extraer números', 'Borrar fila', 'Reemplazar con 0'], expected: 'Extraer números' },
                    { id: 'dr2_photo', type: 'photo', prompt: 'Captura de la limpieza de texto.', simulatedDelayMs: 1800, successMessage: 'Limpieza verificada.' }
                ],
                validation: { type: 'numeric', measureId: 'PesoPromedioGlobal', expectedFrom: 'answerKey.PesoPromedioGlobal', tolerance: 0.05, requiredCards: ['AVERAGE'] },
                winImage: '/images/story/datarescue-2-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: ['Normalizar Peso', 'Calcular Average'],
                guide: ['Text.Select para dejar solo números.', 'Convertir a decimal.'],
                tips: ['Cuidado con los puntos y comas.'],
                expectedOutcome: 'Gráfico de barras de peso promedio por país.'
            },
            {
                id: 'datarescue-3',
                title: 'CBM Máximo y Outliers',
                chapter: 3,
                level: 2,
                xp: 600,
                coins: 150,
                description: 'Detecta anomalías de punto decimal en el volumen cúbico.',
                storyContext: 'Outliers detectados. Un contenedor no puede medir 30,000 m3. Usa MAX y lógica para aislar estos errores de dedo (o de villano).',
                introNarrative: '📈 ¡Un solo paquete ocupa todo el barco! Alguien movió el punto decimal. Identifica el Máximo real y aisla los errores.',
                outroNarrative: '🔍 Outliers en cuarentena. El análisis es seguro. "¡Maldición!" grita Corruptex. "¡Probemos con clones!"',
                missionSteps: [
                    { id: 'dr3_mcq_threshold', type: 'mcq', prompt: 'Regla para detectar outlier masivo:', options: ['Valor > Límite Físico', 'Valor < 0', 'Valor = Promedio'], expected: 'Valor > Límite Físico' },
                    { id: 'dr3_photo', type: 'photo', prompt: 'Captura de tabla con outliers marcados.', simulatedDelayMs: 2200, successMessage: 'Outliers detectados.' }
                ],
                validation: { type: 'setMatch', measureId: 'OutliersDetectados', expectedSetFrom: 'stepKey.outliersVolumen', requiredCards: ['MAX', 'IF'] },
                winImage: '/images/story/datarescue-3-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: ['Detectar Max', 'Filtrar Outliers'],
                guide: ['Usa MAX para ver el techo.', 'Compara con estándares.'],
                tips: ['El contexto del negocio define qué es un outlier.'],
                expectedOutcome: 'Lista de IDs con volumen erróneo.'
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
                missionSteps: [
                    { id: 'dr4_mcq_count', type: 'mcq', prompt: 'Diferencia COUNT vs COUNTROWS:', options: ['COUNT ignora nulos', 'Son iguales', 'COUNTROWS ignora nulos'], expected: 'COUNT ignora nulos' },
                    { id: 'dr4_photo', type: 'photo', prompt: 'Captura de análisis de duplicados.', simulatedDelayMs: 1600, successMessage: 'Duplicados visibles.' }
                ],
                validation: { type: 'numeric', measureId: 'DuplicadosDetectados', expectedFrom: 'stepKey.duplicatedRows', tolerance: 0, requiredCards: ['COUNTROWS', 'DISTINCTCOUNT'] },
                winImage: '/images/story/datarescue-4-win.png',
                datasets: ['datarescue_duplicated'],
                objectives: ['Contar filas totales', 'Contar únicos', 'Ver delta'],
                guide: ['COUNTROWS cuenta todo.', 'DISTINCTCOUNT filtra repetidos.'],
                tips: ['Un ID único es clave.'],
                expectedOutcome: 'Reporte de duplicidad.'
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
                missionSteps: [
                    { id: 'dr5_mcq_normalize', type: 'mcq', prompt: 'Mejor transformación para nombres:', options: ['TRIM + UPPER', 'Solo UPPER', 'Ninguna'], expected: 'TRIM + UPPER' },
                    { id: 'dr5_raw_unique', type: 'numeric', prompt: 'Clientes antes de limpiar:', expectedFrom: 'stepKey.rawUniqueClients', tolerance: 0 },
                    { id: 'dr5_photo', type: 'photo', prompt: 'Captura de columna normalizada.', simulatedDelayMs: 1700, successMessage: 'Normalización OK.' }
                ],
                validation: { type: 'numeric', measureId: 'ClientesUnicos', expectedFrom: 'answerKey.ClientesUnicos', tolerance: 0, requiredCards: ['DISTINCTCOUNT'] },
                winImage: '/images/story/datarescue-5-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: ['Trim y Upper', 'Contar únicos reales'],
                guide: ['Usa transformaciones de texto en PQ.'],
                tips: ['Espacios al final son invisibles pero letales.'],
                expectedOutcome: 'Conteo real de clientes.'
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
                missionSteps: [
                    { id: 'dr5b_mcq_dateformat', type: 'mcq', prompt: '01/15/2024 es:', options: ['Americano (Mes/Día)', 'Europeo (Día/Mes)', 'ISO'], expected: 'Americano (Mes/Día)' },
                    { id: 'dr5b_photo', type: 'photo', prompt: 'Captura de columna Date limpia.', simulatedDelayMs: 2500, successMessage: 'Fechas limpias.' }
                ],
                validation: { type: 'numeric', measureId: 'FechasValidas', expectedFrom: 'answerKey.FechasValidas', tolerance: 0.01, requiredCards: ['DATE', 'TEXT'] },
                winImage: '/images/story/datarescue-5b-win.png',
                datasets: ['datarescue_date_chaos'],
                objectives: ['Unificar formatos Date', 'Unificar separadores numéricos'],
                guide: ['Usa "Using Locale" en PQ.'],
                tips: ['1.000 (mil) vs 1,000 (mil).'],
                expectedOutcome: 'Timeline coherente.'
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
                missionSteps: [
                    { id: 'dr6_mcq_rule', type: 'mcq', prompt: 'Lógica para "Revisar":', options: ['PESO > 1000 OR GANANCIA < 1000', 'AND', 'XOR'], expected: 'PESO > 1000 OR GANANCIA < 1000' },
                    { id: 'dr6_photo', type: 'photo', prompt: 'Captura de columna condicional.', simulatedDelayMs: 2000, successMessage: 'Lógica verificada.' }
                ],
                validation: { type: 'confusionMatrix', measureId: 'OperacionesRevisar', expectedFrom: 'answerKey.OperacionesRevisar', tolerance: 2, requiredCards: ['IF', 'OR'] },
                winImage: '/images/story/datarescue-6-win.png',
                datasets: ['datarescue_corrupted'],
                objectives: ['Crear columna condicional', 'Validar lógica'],
                guide: ['Usa columna condicional en PQ o IF en DAX.'],
                tips: ['Verifica casos borde (ej: exactamente 1000).'],
                expectedOutcome: 'Tabla clasificada correctamente.'
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
                objectives: ['Integrar todo', 'Dashboard Ejecutivo'],
                guide: ['Aplica todo lo aprendido.', 'Storytelling visual.'],
                tips: ['Revisa la consistencia entre páginas.'],
                expectedOutcome: 'Dashboard Final.'
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
        prologue: 'Tony se ha ido. El mundo está a salvo, pero Stark Industries es un caos administrativo. Pepper Potts te ha entregado las llaves de los servidores privados de Tony. Hay terabytes de esquemas de trajes, registros de batallas y proyectos secretos sin auditar. Tu misión: poner orden en el legado.',
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
                validation: { type: 'numeric', measureId: 'CostoTotalReparaciones', expectedValue: 847500000, tolerance: 0.03, requiredCards: ['SUM'] }
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
                validation: { type: 'numeric', measureId: 'EficienciaMaxima', expectedValue: 847.5, tolerance: 0.02, requiredCards: ['MAX', 'AVERAGE'] }
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
                validation: { type: 'numeric', measureId: 'TasaExitoGlobal', expectedValue: 0.87, tolerance: 0.02, requiredCards: ['COUNTROWS', 'DIVIDE'] }
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
                validation: { type: 'numeric', measureId: 'CostoTotalVictoria', expectedValue: 15700000000, tolerance: 0.05, requiredCards: ['SUM', 'CALCULATE'] }
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
        prologue: 'Bienvenido a la Sala de Control. Los VIPs llegan en 3 días. El Front Man necesita perfiles de riesgo, proyecciones de eliminación y probabilidades de apuestas. Aquí, los humanos son filas en un dataset. Haz tu trabajo y sobrevivirás.',
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
                validation: { type: 'numeric', measureId: 'DeudaTotalJugadores', expectedValue: 45600000000, tolerance: 0.02, requiredCards: ['SUM', 'AVERAGE'] }
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
                validation: { type: 'numeric', measureId: 'JugadoresEliminadosJuego1', expectedValue: 231, tolerance: 0, requiredCards: ['COUNTROWS', 'FILTER'] }
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
                validation: { type: 'numeric', measureId: 'GananciaNeta', expectedValue: 33100000000, tolerance: 0.03, requiredCards: ['SUM', 'CALCULATE'] }
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
                validation: { type: 'numeric', measureId: 'ProbabilidadGiHun', expectedValue: 0.42, tolerance: 0.05, requiredCards: ['SUM', 'MAX', 'DIVIDE'] }
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
        prologue: 'El Ministro de Magia necesita modernizar sus archivos. Siglos de pergaminos se están pudriendo. Desde la economía goblin hasta las estadísticas de Quidditch, tu varita será Power BI. Revela los secretos ocultos en los datos mágicos.',
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
