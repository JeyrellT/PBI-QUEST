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
        prologue: 'David Wallace ha enviado un ultimátum: Scranton debe demostrar su valor o será absorbida. Michael Scott te ha nombrado "Asistente del Asistente del Gerente Regional" (de datos). Tu misión: usar Power BI para probar que sois la mejor sucursal.',
        storyArc: 'La Batalla por Scranton',
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
                objectives: [
                    'Importar dataset de ventas (Excel/CSV)',
                    'Revisar tipos de datos (Fecha, Moneda, Texto)',
                    'Crear Medida: TotalFilas = COUNTROWS(Sales)',
                    'Verificar que todas las filas se cargaron correctamente'
                ],
                datasets: ['office_sales'],
                guide: [
                    '1. Abre Power BI Desktop.',
                    '2. Usa "Obtener Datos" para importar el archivo de ventas.',
                    '3. Abre el "Editor de Power Query" (Transformar datos).',
                    '4. Verifica que la columna "Fecha" tenga formato de fecha y "Monto" formato de moneda.',
                    '5. Crea una medida COUNTROWS para verificar el total de registros.'
                ],
                tips: [
                    'Siempre revisa la calidad de los datos antes de empezar.',
                    'Si ves nombres mal escritos (ej. "Jim Halpert" vs "Jim H."), unifícalos en Power Query.',
                    'Guarda tu archivo como "DM_Reporting.pbix".'
                ],
                expectedOutcome: 'Un modelo de datos limpio con 500 filas de ventas verificadas.',
                verification: [
                    {
                        question: "¿Cuántas filas totales de ventas cargaste en el modelo?",
                        type: "number",
                        answer: 500,
                        hint: "Usa la tarjeta con la medida COUNTROWS para ver el número exacto."
                    },
                    {
                        question: "Busca en la columna 'Producto': ¿Cuántos tipos de papel diferentes vendemos?",
                        type: "number",
                        answer: 12,
                        hint: "Ve a la vista de Datos y revisa los valores únicos en la columna Producto, o usa DISTINCTCOUNT."
                    }
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
                description: 'Toby encontró un archivo de clientes con datos sucios. Limpia mayúsculas, fechas y separadores.',
                storyContext: 'Toby descubrió un archivo Excel antiguo de clientes que nunca fue limpiado. Los nombres están en MAYÚSCULAS, minúsculas, o MeZcLaDoS. Las fechas aparecen como "01/15/2024", "15-Ene-2024", "2024.01.15". Los teléfonos tienen puntos, comas y guiones. Michael dice: "Esto es peor que Scott\'s Tots".',
                objectives: [
                    'Detectar inconsistencias: mayúsculas, fechas, separadores',
                    'Normalizar nombres: Aplicar PROPER() o Text.Proper()',
                    'Unificar fechas: Convertir todos los formatos a Date',
                    'Limpiar teléfonos: Remover puntos, comas, espacios',
                    'Crear columna: DatosLimpios = SI todo correcto'
                ],
                datasets: ['office_dirty_clients'],
                guide: [
                    '1. Importa el archivo de clientes "sucios" en Power Query.',
                    '2. Revisa la columna CLIENTE: usa Text.Proper() para capitalizar correctamente.',
                    '3. Para FECHA_REGISTRO: usa Date.From() con locale apropiado.',
                    '4. Para TELEFONO: usa Text.Remove([TELEFONO], {".", ",", " ", "-"}).',
                    '5. Verifica la calidad final: todas las fechas deben ser tipo Date, nombres capitalizados.'                ],
                tips: [
                    'Text.Proper("JIM HALPERT") = "Jim Halpert" - ¡Perfecto para nombres!',
                    'Las fechas en formato americano (MM/DD/YYYY) son diferentes al europeo (DD/MM/YYYY).',
                    'Usa Cambiar Tipo > Usando Configuración Regional para fechas ambiguas.',
                    'Un teléfono limpio solo debe tener números: "5551234567"'
                ],
                expectedOutcome: 'Tabla de clientes con 100% de datos normalizados y consistentes.',
                verification: [
                    {
                        question: "Después de limpiar, ¿cuántos clientes tienen el nombre correctamente capitalizado (Nombre Apellido)?",
                        type: "number",
                        answer: 45,
                        hint: "Usa Text.Proper() en Power Query y verifica que no queden nombres en MAYÚSCULAS."
                    },
                    {
                        question: "¿Cuántas fechas estaban en formato diferente al estándar (DD/MM/YYYY)?",
                        type: "number",
                        answer: 28,
                        hint: "Revisa las fechas que tenían guiones, puntos o formato americano."
                    }
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
                storyContext: 'Es la noche de los Dundies en Chili\'s. Michael quiere un premio basado en datos reales este año (además del de "Zapatillas más Blancas"). Necesita saber quién vendió más en total y quién tuvo el mejor promedio por venta.',
                objectives: [
                    'Crear Medida: TotalVentas = SUM(Sales[Amount])',
                    'Crear Medida: TicketPromedio = AVERAGE(Sales[Amount])',
                    'Identificar al vendedor con mayor total de ventas',
                    'Visualizar los ganadores en gráficos de barras'
                ],
                datasets: ['office_sales'],
                guide: [
                    '1. En la vista de "Reporte", ve a la pestaña "Modelado" > "Nueva Medida".',
                    '2. Escribe: TotalVentas = SUM(Sales[Amount]).',
                    '3. Crea otra medida: TicketPromedio = AVERAGE(Sales[Amount]).',
                    '4. Usa gráficos de barras para mostrar quién lidera cada métrica.',
                    '5. ¡Descubre quién merece el Dundie al "Vendedor del Año"!'
                ],
                tips: [
                    'Las Medidas son mejores que las columnas calculadas para agregaciones.',
                    'Da formato de moneda ($) a tus medidas inmediatamente.',
                    'Usa etiquetas de datos para que Michael pueda leer los números fácilmente.'
                ],
                expectedOutcome: 'Total de ventas de ~$847,500 y ticket promedio de ~$1,695.',
                verification: [
                    {
                        question: "¿Quién es el vendedor con mayor monto TOTAL de ventas?",
                        type: "text",
                        answer: "Dwight Schrute",
                        hint: "Debería ser obvio en tu gráfico de barras. ¡Es el asistente del gerente regional!"
                    },
                    {
                        question: "¿Cuál es el valor exacto del Ticket Promedio (sin decimales)?",
                        type: "number",
                        answer: 1695,
                        hint: "Revisa tu tarjeta de KPI para la medida TicketPromedio."
                    }
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
                description: 'La guerra de bromas escala a los datos. Usa CALCULATE y FILTER.',
                storyContext: 'Dwight afirma que sus ventas de papel "Premium" son superiores. Jim dice que Dwight solo vende porque roba clientes. Debes arbitrar esta disputa usando DAX para filtrar ventas específicas.',
                objectives: [
                    'Medida: VentasDwight = CALCULATE([TotalVentas], Salesperson="Dwight Schrute")',
                    'Medida: VentasJim = CALCULATE([TotalVentas], Salesperson="Jim Halpert")',
                    'Calcular la diferencia: DiferenciaDJ = [VentasDwight] - [VentasJim]',
                    'Comparar el rendimiento de ambos en un gráfico de líneas'
                ],
                datasets: ['office_sales'],
                guide: [
                    '1. Usa la función CALCULATE para aislar las ventas de un vendedor específico.',
                    '2. Sintaxis: CALCULATE( [Medida Base], Columna = "Valor" ).',
                    '3. Crea medidas separadas para Jim y Dwight.',
                    '4. Colócalas en un gráfico de líneas comparativo (Eje X = Mes).',
                    '5. Calcula quién vende más y por cuánto.'
                ],
                tips: [
                    'CALCULATE es la función más poderosa de DAX. ¡Entiéndela bien!',
                    'Usa colores distintivos: Mostaza para Dwight, Azul para Jim.',
                    'Analiza la tendencia: ¿Quién es más consistente?'
                ],
                expectedOutcome: 'Dwight lidera por aproximadamente $15,000 sobre Jim.',
                verification: [
                    {
                        question: "¿Cuál es la diferencia exacta en dólares entre las ventas de Dwight y Jim?",
                        type: "number",
                        answer: 15400,
                        hint: "Usa la medida [DiferenciaDJ]. Dwight debería ser el ganador."
                    },
                    {
                        question: "¿En qué mes Jim superó a Dwight en ventas?",
                        type: "text",
                        answer: "Febrero",
                        hint: "Mira el gráfico de líneas. Hay un pico donde la línea azul (Jim) cruza a la mostaza."
                    }
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
                description: 'Stamford se une a Scranton. Analiza el rendimiento comparativo y retención.',
                storyContext: '¡Pánico! La sucursal de Stamford cierra y sus empleados vienen a Scranton. Andy Bernard viene con fuerza. Debes integrar los datos y contar cuántos vendedores únicos hay ahora.',
                objectives: [
                    'Unir (Append) tablas de ventas de Scranton y Stamford',
                    'Medida: VendedoresUnicos = DISTINCTCOUNT(Sales[Salesperson])',
                    'Calcular ventas totales combinadas',
                    'Analizar contribución por sucursal de origen'
                ],
                datasets: ['office_sales_merged'],
                guide: [
                    '1. En Power Query, usa "Anexar consultas" (Append) para unir las ventas.',
                    '2. Asegúrate de tener una columna "Sucursal" para distinguirlas.',
                    '3. Usa DISTINCTCOUNT para contar vendedores únicos.',
                    '4. Compara el rendimiento por sucursal de origen.'
                ],
                tips: [
                    'DISTINCTCOUNT cuenta valores únicos, ignorando duplicados.',
                    'Verifica que las relaciones en la vista de "Modelo" sean correctas.',
                    '¿La fusión aumentó las ventas totales o hubo canibalización?'
                ],
                expectedOutcome: '9 vendedores únicos después de la fusión, ventas combinadas de ~$1.2M.',
                verification: [
                    {
                        question: "Después de fusionar las tablas, ¿cuántos vendedores únicos (DISTINCTCOUNT) hay en total?",
                        type: "number",
                        answer: 14,
                        hint: "Deberían ser los de Scranton más Karen, Andy y los de Stamford."
                    },
                    {
                        question: "¿Cuál es la venta total combinada de la 'Nueva Super-Sucursal'?",
                        type: "number",
                        answer: 1250000,
                        hint: "La suma total de la columna Amount en tu tabla unida."
                    }
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
                description: 'La idea de Michael sale mal (¿o no?). Análisis de Rentabilidad Avanzado.',
                storyContext: 'Michael puso 5 billetes dorados (10% descuento permanente) en cajas de papel. Todos fueron al cliente más grande, Blue Cross. Calcula el impacto real en el margen.',
                objectives: [
                    'Calcular MargenOriginal = SUM(Sales[Amount]) - SUM(Sales[Cost])',
                    'Calcular MargenConDescuento = MargenOriginal * 0.90',
                    'Medida: ImpactoDescuento = MargenOriginal - MargenConDescuento',
                    'Determinar si el volumen extra compensa la pérdida'
                ],
                datasets: ['office_golden_ticket'],
                guide: [
                    '1. Calcula el margen original de Blue Cross.',
                    '2. Aplica el 10% de descuento al precio de venta.',
                    '3. Recalcula el margen con el descuento.',
                    '4. Compara escenarios: ¿A qué volumen el descuento se paga solo?'
                ],
                tips: [
                    'Usa variables (VAR) para hacer el código DAX más limpio.',
                    'El punto de equilibrio es cuando el volumen extra supera el 11% adicional.',
                    'Conclusión: ¿Fue una idea genial o un desastre financiero?'
                ],
                expectedOutcome: 'Impacto del descuento de ~$25,000, requiere 12% más volumen para compensar.',
                verification: [
                    {
                        question: "¿Cuánto dinero perdimos EXACTAMENTE por el descuento del 10% en Blue Cross?",
                        type: "number",
                        answer: 24500,
                        hint: "Es la diferencia entre el Margen Original y el Margen con Descuento."
                    },
                    {
                        question: "¿Cuál es el margen de beneficio (%) actual con el descuento aplicado?",
                        type: "number",
                        answer: 35,
                        hint: "Divide el MargenConDescuento entre la Venta Total descontada."
                    }
                ],
                winImage: '/images/story/office-5-win.png'
            },
        ]
    },
    {
        id: 'stark',
        order: 3,
        name: 'Stark Industries',
        subtitle: 'Marvel / Iron Man',
        description: 'Análisis avanzado de costos y presupuestos de proyectos de alta tecnología.',
        icon: '🦸',
        color: '#ff4b2b',
        difficulty: 'Intermedio',
        image: '/images/worlds/stark.png',
        prologue: 'Tony Stark está gastando demasiado en reparaciones de trajes después de la última batalla. Pepper Potts te ha contratado para optimizar el presupuesto de I+D y reducir los daños colaterales. Jarvis te proporcionará los datos.',
        storyArc: 'Protocolo de Optimización',
        missions: [
            {
                id: 'stark-1',
                title: 'El Costo de Ser Héroe',
                chapter: 1,
                level: 2,
                xp: 350,
                coins: 80,
                description: 'Tony Stark gasta millones. Analiza los costos de reparación vs prevención.',
                storyContext: 'El Mark 85 es increíble, pero cada vez que Tony sale a volar, el presupuesto de Stark Industries tiembla. Debemos identificar qué componentes fallan más seguido y cuánto cuestan las reparaciones.',
                objectives: [
                    'Importar datos de costos de trajes y reparaciones',
                    'Crear Medida: CostoTotal = SUM(Repairs[Cost])',
                    'Crear Medida: CostoPromedio = AVERAGE(Repairs[Cost])',
                    'Visualizar en gráfico de Pareto (80/20)',
                    'Identificar el traje más costoso de mantener'
                ],
                datasets: ['stark_suit_repairs'],
                guide: [
                    '1. Carga los datos de costos de trajes y daños.',
                    '2. Usa un "Gráfico de rectángulos" (Treemap) para ver qué trajes son los más costosos.',
                    '3. Para el Pareto: Usa un gráfico combinado de líneas y columnas. Columnas = Costo, Línea = % Acumulado.',
                    '4. Identifica qué incidentes causan el 80% de los gastos.',
                    '5. Crea KPI Cards para mostrar totales.'
                ],
                tips: [
                    'Un gráfico de Pareto ayuda a priorizar problemas (Regla 80/20).',
                    'Usa etiquetas de datos para mostrar los montos exactos en millones.',
                    'Agrega un filtro de tiempo para ver la evolución de los costos.'
                ],
                expectedOutcome: 'Un análisis de costos detallado que identifique los trajes más caros de mantener.',
                validation: {
                    type: 'numeric',
                    measureId: 'CostoTotalReparaciones',
                    expectedValue: 847500000,
                    tolerance: 0.03,
                    requiredCards: ['SUM', 'AVERAGE']
                }
            },
            {
                id: 'stark-2',
                title: 'Proyecto Arc Reactor 2.0',
                chapter: 2,
                level: 3,
                xp: 500,
                coins: 120,
                description: 'Analiza la eficiencia energética de los diferentes reactores Arc.',
                storyContext: 'Tony quiere comparar la eficiencia de todos los Arc Reactors que ha construido. Desde el Mark I en la cueva hasta el nano-reactor del Mark 85. ¿Cuál produce más energía por unidad de paladio consumido?',
                objectives: [
                    'Calcular eficiencia: Energia / PaladioUsado por reactor',
                    'Comparar versiones: Mark I vs Mark III vs Mark 50 vs Mark 85',
                    'Crear línea temporal de mejoras tecnológicas',
                    'Medida: EficienciaMax = MAX(Reactors[Efficiency])',
                    'Proyectar costos de siguiente generación'
                ],
                datasets: ['stark_arc_reactors'],
                guide: [
                    '1. Importa los datos de reactores Arc.',
                    '2. Crea columna calculada: Eficiencia = [Energia_GW] / [Paladio_Gramos].',
                    '3. Ordena por versión de Mark en eje X, Eficiencia en eje Y.',
                    '4. Usa gráfico de líneas para mostrar la evolución.',
                    '5. Calcula el incremento porcentual entre versiones.'
                ],
                tips: [
                    'La eficiencia debería mostrar una curva exponencial de mejora.',
                    'El Mark 85 es ~500% más eficiente que el Mark I.',
                    'Usa formato condicional para destacar el mejor reactor.'
                ],
                expectedOutcome: 'Dashboard mostrando evolución tecnológica con Mark 85 como el más eficiente.',
                validation: {
                    type: 'numeric',
                    measureId: 'EficienciaMaxima',
                    expectedValue: 847.5,
                    tolerance: 0.02,
                    requiredCards: ['MAX', 'AVERAGE']
                }
            },
            {
                id: 'stark-3',
                title: 'Los Vengadores: Análisis de Misiones',
                chapter: 3,
                level: 4,
                xp: 700,
                coins: 180,
                description: 'Compara el rendimiento de cada Vengador en las misiones.',
                storyContext: 'Nick Fury quiere datos sobre la efectividad de cada Vengador. ¿Quién completa más misiones? ¿Quién causa más daños colaterales? ¿Quién tiene mejor ratio de éxito? Tony necesita estos insights para la próxima reunión.',
                objectives: [
                    'Contar misiones por Vengador: COUNTROWS filtrado',
                    'Calcular tasa de éxito: Exitosas / Total * 100',
                    'Analizar daños colaterales por héroe',
                    'Usar CALCULATE para aislar métricas por héroe',
                    'Crear ranking de efectividad'
                ],
                datasets: ['stark_avengers_missions'],
                guide: [
                    '1. Carga el dataset de misiones de Vengadores.',
                    '2. Medida: MisionesTotales = COUNTROWS(Missions).',
                    '3. Medida: MisionesExitosas = CALCULATE(COUNTROWS(Missions), Status="Success").',
                    '4. Medida: TasaExito = DIVIDE([MisionesExitosas], [MisionesTotales], 0).',
                    '5. Crea gráfico de barras agrupadas por héroe.'
                ],
                tips: [
                    'Usa DIVIDE en lugar de / para evitar errores de división por cero.',
                    'Thor tiene el mayor poder pero también los mayores daños colaterales.',
                    'Natasha tiene la mejor tasa de éxito en misiones de infiltración.'
                ],
                expectedOutcome: 'Dashboard comparativo de Vengadores con métricas de efectividad.',
                validation: {
                    type: 'numeric',
                    measureId: 'TasaExitoGlobal',
                    expectedValue: 0.87,
                    tolerance: 0.02,
                    requiredCards: ['COUNTROWS', 'CALCULATE', 'FILTER']
                }
            },
            {
                id: 'stark-4',
                title: 'Presupuesto I+D: Proyectos Secretos',
                chapter: 4,
                level: 5,
                xp: 900,
                coins: 220,
                description: 'Gestiona el presupuesto de los proyectos secretos de Stark Industries.',
                storyContext: 'Pepper descubrió que Tony tiene 12 proyectos secretos consumiendo presupuesto. Proyecto Ultron (cancelado), Proyecto EDITH, Proyecto nanotech... Necesitas un análisis de ROI y estado de cada proyecto.',
                objectives: [
                    'Calcular presupuesto consumido vs asignado por proyecto',
                    'Medir: DesviacionPresupuesto = (Real - Planeado) / Planeado',
                    'Clasificar proyectos: IF(desviación > 0.2, "Sobre Presupuesto", "OK")',
                    'Proyección de cierre: usar tendencias',
                    'Dashboard de seguimiento de proyectos'
                ],
                datasets: ['stark_rd_projects'],
                guide: [
                    '1. Importa datos de proyectos de I+D.',
                    '2. Calcula desviación: ([Gastado] - [Presupuesto]) / [Presupuesto].',
                    '3. Crea columna de clasificación con IF.',
                    '4. Usa gráfico de cascada (Waterfall) para ver flujo de presupuesto.',
                    '5. Agrega slicer por estado del proyecto (Activo, Pausado, Cancelado).'
                ],
                tips: [
                    'Los proyectos cancelados (como Ultron) aún consumieron presupuesto.',
                    'EDITH está 15% sobre presupuesto pero es prioritario.',
                    'Usa formato condicional: rojo > 20% desviación, amarillo > 10%.'
                ],
                expectedOutcome: 'Dashboard de control de proyectos con alertas de desviación presupuestaria.',
                validation: {
                    type: 'numeric',
                    measureId: 'ProyectosSobrePresupuesto',
                    expectedValue: 4,
                    tolerance: 0,
                    requiredCards: ['IF', 'CALCULATE', 'SUM']
                }
            },
            {
                id: 'stark-5',
                title: 'La Batalla de Thanos: Análisis Post-Mortem',
                chapter: 5,
                level: 6,
                xp: 1200,
                coins: 300,
                description: 'Analiza los recursos utilizados en la batalla contra Thanos.',
                storyContext: 'La batalla contra Thanos consumió recursos de toda la Tierra. Tony necesita un análisis completo: cuántos trajes se destruyeron, cuánta energía se usó, daños totales, y el costo de la victoria. Este reporte irá a la ONU.',
                objectives: [
                    'Consolidar datos de múltiples fuentes (3 tablas)',
                    'Calcular pérdidas totales en USD',
                    'Análisis temporal: antes, durante y después del Snap',
                    'Medida compuesta: CostoVictoria = Daños + Reparaciones + Reconstrucción',
                    'Dashboard ejecutivo para presentación ONU'
                ],
                datasets: ['stark_thanos_battle', 'stark_damages', 'stark_reconstruction'],
                guide: [
                    '1. Relaciona las 3 tablas por EventID.',
                    '2. Crea medidas para cada categoría de costo.',
                    '3. Usa Time Intelligence para comparar períodos.',
                    '4. Construye dashboard con 4 KPIs, 2 gráficos, 1 mapa.',
                    '5. Añade slicers: Región, Tipo de Daño, Fase de Batalla.'
                ],
                tips: [
                    'El Snap causó 50% de pérdidas inmediatas en productividad global.',
                    'La reconstrucción post-Endgame costó más que la batalla misma.',
                    'Usa tema oscuro con acentos rojos para dramatismo.'
                ],
                expectedOutcome: 'Dashboard ejecutivo mostrando el verdadero costo de salvar el universo.',
                validation: {
                    type: 'composite',
                    measures: [
                        { id: 'CostoTotalVictoria', expectedValue: 15700000000, tolerance: 0.05 },
                        { id: 'TrajestDestruidos', expectedValue: 12, tolerance: 0 },
                        { id: 'EnergiaConsumidaTW', expectedValue: 847.5, tolerance: 0.02 }
                    ],
                    requiredCards: ['SUM', 'CALCULATE', 'COUNTROWS', 'IF']
                }
            }
        ]
    },
    {
        id: 'squid-game',
        order: 4,
        name: 'Squid Game Enterprise',
        subtitle: 'Squid Game',
        description: 'Análisis de riesgo y probabilidad. ¿Quién sobrevivirá?',
        icon: '🎰',
        color: '#ec4899',
        difficulty: 'Avanzado',
        image: '/images/worlds/squid-game.png',
        prologue: 'Bienvenido, Analista. Los VIPs están llegando y necesitan datos precisos para sus apuestas. Tu trabajo es analizar el perfil de los jugadores y predecir quién tiene más probabilidades de llegar al juego final.',
        storyArc: 'El Juego de los Datos',
        missions: [
            {
                id: 'sg-1',
                title: 'Análisis de Riesgo',
                chapter: 1,
                level: 4,
                xp: 600,
                coins: 150,
                description: 'Evalúa a los jugadores. ¿Qué factores influyen en su probabilidad de supervivencia?',
                storyContext: 'El Líder quiere saber si la deuda masiva motiva a los jugadores o los hace cometer errores. Analiza la correlación entre desesperación financiera y rendimiento.',
                objectives: [
                    'Crear perfil demográfico de los 456 jugadores',
                    'Medida: DeudaPromedio = AVERAGE(Players[Debt])',
                    'Medida: DeudaTotal = SUM(Players[Debt])',
                    'Análisis de correlación: Deuda vs Edad',
                    'Calcular tasa de supervivencia por grupo de edad'
                ],
                datasets: ['squid_players'],
                guide: [
                    '1. Importa los perfiles de jugadores.',
                    '2. Usa un "Gráfico de anillos" para ver la distribución de género y edad.',
                    '3. Crea un gráfico de dispersión: Eje X = Edad, Eje Y = Deuda.',
                    '4. Calcula el % de supervivencia: (Vivos / Total Inicial) * 100.',
                    '5. Agrupa las edades en rangos (18-25, 26-35, etc.).'
                ],
                tips: [
                    'La segmentación es clave. Los rangos de edad revelan patrones.',
                    'Busca correlaciones: ¿Los más jóvenes tienen más deuda?',
                    'Usa colores oscuros y dramáticos para este tema.'
                ],
                expectedOutcome: 'Un informe de inteligencia sobre los jugadores, destacando los grupos de mayor riesgo.',
                validation: {
                    type: 'numeric',
                    measureId: 'DeudaTotalJugadores',
                    expectedValue: 45600000000,
                    tolerance: 0.02,
                    requiredCards: ['SUM', 'AVERAGE']
                }
            },
            {
                id: 'sg-2',
                title: 'Luz Roja, Luz Verde: Análisis de Eliminación',
                chapter: 2,
                level: 4,
                xp: 700,
                coins: 180,
                description: 'Analiza los patrones de eliminación en el primer juego.',
                storyContext: 'El juego "Luz Roja, Luz Verde" eliminó a más de la mitad de los jugadores. ¿Hubo patrones? ¿Los eliminados tenían características comunes? ¿La posición inicial afectó la supervivencia?',
                objectives: [
                    'Calcular: Eliminados = COUNTROWS(FILTER(Players, Status="Eliminated"))',
                    'Analizar eliminación por posición inicial en la fila',
                    'Tiempo promedio de eliminación por grupo',
                    'Crear columna: VelocidadReaccion = IF(Time < 3, "Rápido", "Lento")',
                    'Visualizar supervivencia en gráfico de embudo'
                ],
                datasets: ['squid_game1_results'],
                guide: [
                    '1. Carga los resultados del Juego 1.',
                    '2. Cuenta eliminados vs supervivientes con COUNTROWS.',
                    '3. Agrupa por posición inicial (Fila 1-10, Columna 1-20).',
                    '4. Usa gráfico de embudo para mostrar la reducción de jugadores.',
                    '5. Identifica la "zona de muerte" (posiciones más peligrosas).'
                ],
                tips: [
                    'Las primeras filas tenían ventaja: menos distancia a recorrer.',
                    'Los jugadores en las orillas fueron detectados más fácilmente.',
                    'El 50.7% fue eliminado en este juego (231 de 456).'
                ],
                expectedOutcome: 'Dashboard mostrando análisis de eliminación con patrones espaciales y temporales.',
                validation: {
                    type: 'numeric',
                    measureId: 'JugadoresEliminadosJuego1',
                    expectedValue: 231,
                    tolerance: 0,
                    requiredCards: ['COUNTROWS', 'FILTER', 'IF']
                }
            },
            {
                id: 'sg-3',
                title: 'El Negocio de los VIPs',
                chapter: 3,
                level: 5,
                xp: 900,
                coins: 220,
                description: 'Los VIPs quieren apostar. Analiza sus patrones para maximizar las ganancias.',
                storyContext: 'Los VIPs pagan millones por estar aquí. Si sus apuestas no son emocionantes, el negocio sufre. Debes mostrarles datos que los inciten a apostar más fuerte.',
                objectives: [
                    'Analizar historial de apuestas por VIP (1-7)',
                    'Medida: ApuestaPromedio = AVERAGE(Bets[Amount])',
                    'Identificar al VIP "Ballena" (mayor apostador)',
                    'Calcular ganancia neta: TotalApuestas - CostosEvento',
                    'Proyección de ingresos por juego restante'
                ],
                datasets: ['squid_vip_bets'],
                guide: [
                    '1. Carga los datos de apuestas.',
                    '2. Usa un gráfico de barras apiladas para ver cuánto apuesta cada VIP en cada juego.',
                    '3. Calcula la ganancia neta: Apuestas Totales - Costos del Evento.',
                    '4. Identifica al VIP "Ballena" (el que más gasta).',
                    '5. Usa gráfico de cascada (Waterfall) para ver flujo de dinero.'
                ],
                tips: [
                    'VIP #4 es el mayor apostador pero el más impredecible.',
                    'Los juegos de azar (canicas) generan más apuestas que los físicos.',
                    'Presenta los datos de forma elegante y exclusiva.'
                ],
                expectedOutcome: 'Dashboard financiero para la gerencia mostrando rentabilidad del evento.',
                validation: {
                    type: 'numeric',
                    measureId: 'GananciaNeta',
                    expectedValue: 33100000000,
                    tolerance: 0.03,
                    requiredCards: ['SUM', 'AVERAGE', 'CALCULATE']
                }
            },
            {
                id: 'sg-4',
                title: 'Supervivencia por Género y Edad',
                chapter: 4,
                level: 5,
                xp: 850,
                coins: 200,
                description: 'Analiza si el género o la edad predicen la supervivencia.',
                storyContext: 'Después de 4 juegos, quedan 40 jugadores. ¿Hay sesgo? ¿Los hombres sobreviven más que las mujeres? ¿Los jóvenes más que los mayores? Los datos revelarán la verdad.',
                objectives: [
                    'Calcular supervivencia por género: COUNTROWS con FILTER',
                    'Crear grupos de edad: IF en cascada (18-30, 31-45, 46-60, 60+)',
                    'Tasa de supervivencia = Vivos / TotalInicial por grupo',
                    'Visualizar con gráfico de barras agrupadas',
                    'Test de significancia visual (comparar vs promedio)'
                ],
                datasets: ['squid_players', 'squid_survival_tracking'],
                guide: [
                    '1. Relaciona las tablas por PlayerID.',
                    '2. Crea grupos de edad con columna calculada IF anidado.',
                    '3. Calcula supervivientes por grupo: CALCULATE + FILTER.',
                    '4. Divide por total inicial de cada grupo.',
                    '5. Añade línea de referencia con supervivencia promedio (8.7%).'
                ],
                tips: [
                    'La supervivencia promedio es 40/456 = 8.7%.',
                    'Las mujeres tienen tasa ligeramente mayor (9.2%).',
                    'El grupo 31-45 tiene la mejor tasa: experiencia + condición física.'
                ],
                expectedOutcome: 'Dashboard de análisis demográfico de supervivencia con insights estadísticos.',
                validation: {
                    type: 'numeric',
                    measureId: 'SupervivientesFinales',
                    expectedValue: 40,
                    tolerance: 0,
                    requiredCards: ['COUNTROWS', 'FILTER', 'CALCULATE', 'IF']
                }
            },
            {
                id: 'sg-5',
                title: 'Predicción del Ganador: Machine Learning Visual',
                chapter: 5,
                level: 6,
                xp: 1100,
                coins: 280,
                description: 'Usa análisis predictivo para identificar al probable ganador.',
                storyContext: 'Solo quedan 3 jugadores. El Front Man quiere saber quién ganará antes del juego final. Usa todos los datos históricos para predecir probabilidades de victoria.',
                objectives: [
                    'Crear score compuesto: Physical + Mental + Luck',
                    'Normalizar métricas a escala 0-100',
                    'Ponderación: Physical 40%, Mental 40%, Luck 20%',
                    'Visualizar con gráfico de radar por jugador',
                    'Calcular probabilidad de victoria = Score / SumaScores'
                ],
                datasets: ['squid_final_players', 'squid_performance_history'],
                guide: [
                    '1. Carga datos de los 3 finalistas con su historial.',
                    '2. Normaliza cada métrica: (Valor - Min) / (Max - Min) * 100.',
                    '3. Calcula score: Physical*0.4 + Mental*0.4 + Luck*0.2.',
                    '4. Probabilidad = Score individual / Suma de todos los scores.',
                    '5. Usa gráfico de radar para comparar perfiles.'
                ],
                tips: [
                    'Gi-Hun tiene alto "Luck" pero bajo "Physical".',
                    'Sang-Woo tiene el mayor "Mental" pero bajo "Luck".',
                    'La predicción no siempre acierta: el factor humano importa.'
                ],
                expectedOutcome: 'Dashboard predictivo mostrando probabilidades de victoria de cada finalista.',
                validation: {
                    type: 'numeric',
                    measureId: 'ProbabilidadGiHun',
                    expectedValue: 0.42,
                    tolerance: 0.05,
                    requiredCards: ['SUM', 'AVERAGE', 'MAX', 'MIN', 'IF']
                }
            },
            {
                id: 'sg-6',
                title: 'El Juego Final: Dashboard Ejecutivo',
                chapter: 6,
                level: 7,
                xp: 1500,
                coins: 400,
                description: 'Construye el dashboard definitivo de los Squid Games.',
                storyContext: 'El Front Man necesita un reporte completo para los inversionistas del próximo año. Toda la operación debe ser documentada: jugadores, juegos, VIPs, finanzas, y análisis de supervivencia.',
                objectives: [
                    'Dashboard de 4 páginas: Overview, Players, Games, Finance',
                    'KPIs: Jugadores Iniciales, Supervivientes, Premio Final, ROI',
                    'Análisis de cada juego con tasa de eliminación',
                    'Flujo financiero completo: entradas VIP, premios, costos',
                    'Recomendaciones para el próximo evento'
                ],
                datasets: ['squid_full_dataset'],
                guide: [
                    '1. Crea modelo de datos con todas las tablas relacionadas.',
                    '2. Página 1: Overview con KPIs principales.',
                    '3. Página 2: Análisis demográfico de jugadores.',
                    '4. Página 3: Detalle por juego con métricas de eliminación.',
                    '5. Página 4: Dashboard financiero con ROI y proyecciones.'
                ],
                tips: [
                    'Usa navegación entre páginas con botones.',
                    'El ROI del evento fue de 340% para los organizadores.',
                    'Tema sugerido: fondo negro, acentos rosa y dorado.'
                ],
                expectedOutcome: 'Documento ejecutivo completo que justifique la inversión en el próximo evento.',
                validation: {
                    type: 'composite',
                    measures: [
                        { id: 'JugadoresIniciales', expectedValue: 456, tolerance: 0 },
                        { id: 'PremioFinal', expectedValue: 45600000000, tolerance: 0 },
                        { id: 'ROI', expectedValue: 3.4, tolerance: 0.1 },
                        { id: 'TasaSupervivenciaGlobal', expectedValue: 0.0022, tolerance: 0.001 }
                    ],
                    requiredCards: ['SUM', 'AVERAGE', 'COUNTROWS', 'CALCULATE', 'IF', 'FILTER']
                }
            }
        ]
    },
    {
        id: 'datarescue',
        order: 2,
        name: 'DataRescue HQ',
        subtitle: 'La Rebelión de la Base Corrupta',
        description: 'El villano ha corrompido el dataset. Detecta anomalías, limpia datos y reconstruye los KPIs reales.',
        icon: '🦸‍♂️',
        color: '#e63946',
        difficulty: 'Intermedio',
        image: '/images/worlds/datarescue.png',
        prologue: '¡Alerta en el Centro de Comando! El villano "Corruptex" ha infiltrado la base de datos de la corporación logística internacional. Ha inyectado typos, nulos estratégicos, outliers y formatos inválidos. Los dashboards muestran mentiras. La Ganancia Total reportada es falsa. Tu misión como Analista de Datos Heroico: detectar las anomalías, limpiar los registros y reconstruir la verdad. Solo tú puedes salvar el KPI.',
        storyArc: 'La Crisis de los Datos Corruptos',
        missions: [
            {
                id: 'datarescue-1',
                title: 'Ganancia Total Real',
                chapter: 1,
                level: 1,
                xp: 400,
                coins: 100,
                description: 'Corruptex borró valores de GANANCIA en filas clave. Recupéralos y calcula el total real.',
                storyContext: 'El villano eliminó o distorsionó la columna GANANCIA en las transacciones más importantes. Algunos valores aparecen como "(10879.2)" (formato contable), otros están en blanco. El dashboard actual muestra una pérdida falsa. Debes recuperar la ganancia real usando la fórmula: GANANCIA = PRECIO_VENTA - PRECIO_COSTO.',
                objectives: [
                    'Detectar filas con GANANCIA inválida (nulos, texto, formato contable)',
                    'Recuperar GANANCIA usando: GANANCIA = PRECIO_VENTA - PRECIO_COSTO',
                    'Crear Medida: Ganancia Total = SUM(GANANCIA_corregida)',
                    'Crear Medida: Rentabilidad = Ganancia Total / SUM(PRECIO_COSTO)',
                    'Visualizar con KPI Card + Línea temporal por FECHA_VENTA'
                ],
                datasets: ['datarescue_corrupted'],
                guide: [
                    '1. Importa el dataset corrupto en Power BI.',
                    '2. En Power Query, crea columna: GANANCIA_LIMPIA = if [GANANCIA] is null then [PRECIO_VENTA] - [PRECIO_COSTO] else [GANANCIA].',
                    '3. Para formatos "(10879.2)", usa Text.Replace para remover paréntesis y multiplicar por -1 si es necesario.',
                    '4. Crea las medidas DAX para Ganancia Total y Rentabilidad.',
                    '5. Valida tu resultado contra la respuesta esperada.'
                ],
                tips: [
                    'El formato (número) entre paréntesis indica valores negativos en contabilidad.',
                    'Usa la función TRY...OTHERWISE en Power Query para manejar errores de conversión.',
                    'La rentabilidad debería ser aproximadamente 20% si los datos están limpios.'
                ],
                expectedOutcome: 'Un KPI Card mostrando la Ganancia Total real (~₡375,710) y Rentabilidad (~20%).',
                missionSteps: [
                    {
                        id: 'dr1_mcq_formula',
                        type: 'mcq',
                        prompt: 'Primera pista: ¿cuál es la fórmula correcta para reconstruir GANANCIA?',
                        options: [
                            'GANANCIA = PRECIO_COSTO - PRECIO_VENTA',
                            'GANANCIA = PRECIO_VENTA - PRECIO_COSTO',
                            'GANANCIA = PRECIO_VENTA / PRECIO_COSTO'
                        ],
                        expected: 'GANANCIA = PRECIO_VENTA - PRECIO_COSTO'
                    },
                    {
                        id: 'dr1_invalid_profit',
                        type: 'numeric',
                        prompt: 'En el CSV corrupto, ¿cuántos registros traen GANANCIA inválida (nulo/texto/no-numérico)?',
                        expectedFrom: 'stepKey.invalidProfitCount',
                        tolerance: 0
                    },
                    {
                        id: 'dr1_photo',
                        type: 'photo',
                        prompt: 'Sube una captura de tu Power Query (paso donde corriges GANANCIA) o tu medida en Power BI.',
                        simulatedDelayMs: 2000,
                        successMessage: 'Revisión automática: la evidencia luce consistente.'
                    }
                ],
                validation: {
                    type: 'numeric',
                    measureId: 'GananciaTotal',
                    expectedFrom: 'answerKey.GananciaTotal',
                    tolerance: 0.02,
                    requiredCards: ['SUM', 'IF']
                },
                winImage: '/images/story/datarescue-1-win.png'
            },
            {
                id: 'datarescue-2',
                title: 'Peso Promedio por País',
                chapter: 2,
                level: 2,
                xp: 500,
                coins: 120,
                description: 'PESO_KG tiene unidades embebidas y valores fuera de rango. Normaliza y calcula promedios.',
                storyContext: 'Corruptex inyectó texto en la columna PESO_KG: "1111.6 kg", "10.0??", espacios y comas. Algunos valores son claramente outliers (pesos de 50,000+ kg para un paquete). El promedio actual está completamente distorsionado.',
                objectives: [
                    'Normalizar PESO_KG: remover "kg", comas, espacios, símbolos',
                    'Definir rango válido: 0 < peso < 10,000',
                    'Calcular: PesoProm = AVERAGE(PESO_KG válido) por PAIS_ORIGEN',
                    'Visualizar con gráfico de barras por país + KPI global'
                ],
                datasets: ['datarescue_corrupted'],
                guide: [
                    '1. En Power Query: PESO_LIMPIO = Text.Remove([PESO_KG], {"k","g"," ",",","?"}).',
                    '2. Convierte a número: Number.FromText([PESO_LIMPIO]).',
                    '3. Filtra outliers: solo donde PESO_LIMPIO > 0 AND PESO_LIMPIO < 10000.',
                    '4. Crea medida DAX: Peso Promedio = AVERAGE(tabla[PESO_LIMPIO]).',
                    '5. Agrupa por PAIS_ORIGEN en un gráfico de barras.'
                ],
                tips: [
                    'Usa Text.Select para quedarte solo con números y puntos decimales.',
                    'Los outliers distorsionan AVERAGE más que MEDIAN.',
                    'Considera usar MEDIAN como alternativa robusta.'
                ],
                expectedOutcome: 'Gráfico de barras mostrando peso promedio realista por país (entre 100-2000 kg).',
                missionSteps: [
                    {
                        id: 'dr2_mcq_clean',
                        type: 'mcq',
                        prompt: '¿Qué enfoque es más seguro para limpiar PESO_KG con texto (ej: "1111.6 kg", "10.0??")?',
                        options: [
                            'Reemplazar todo por 0 para evitar errores',
                            'Extraer solo números/punto decimal y luego convertir a número',
                            'Eliminar la columna PESO_KG y seguir sin ella'
                        ],
                        expected: 'Extraer solo números/punto decimal y luego convertir a número'
                    },
                    {
                        id: 'dr2_weight_junk',
                        type: 'numeric',
                        prompt: 'En el CSV corrupto, ¿cuántas filas de PESO_KG traen letras/símbolos raros?',
                        expectedFrom: 'stepKey.weightHasJunkCount',
                        tolerance: 0
                    },
                    {
                        id: 'dr2_photo',
                        type: 'photo',
                        prompt: 'Sube una captura donde se vea tu transformación de PESO_KG limpio (Power Query o DAX).',
                        simulatedDelayMs: 1800,
                        successMessage: 'Revisión automática: limpieza de peso detectada.'
                    }
                ],
                validation: {
                    type: 'numeric',
                    measureId: 'PesoPromedioGlobal',
                    expectedFrom: 'answerKey.PesoPromedioGlobal',
                    tolerance: 0.05,
                    requiredCards: ['AVERAGE']
                },
                winImage: '/images/story/datarescue-2-win.png'
            },
            {
                id: 'datarescue-3',
                title: 'CBM Máximo y Outliers',
                chapter: 3,
                level: 2,
                xp: 600,
                coins: 150,
                description: 'Detecta outliers en VOLUMEN_CBM causados por desplazamiento decimal.',
                storyContext: 'Corruptex movió el punto decimal en algunos volúmenes: 299.73 se convirtió en 29973. Estos outliers hacen que el MAX sea absurdo y distorsionan análisis de capacidad. Debes identificarlos y aislarlos.',
                objectives: [
                    'Normalizar VOLUMEN_CBM a número',
                    'Calcular por MODALIDAD: MaxCBM = MAX(VOLUMEN_CBM)',
                    'Detectar outliers: CBM > percentil 95 * 1.5',
                    'Crear tabla de outliers con CODIGO_PROFORMA',
                    'Serie temporal MAX/AVG/MIN por FECHA_PROFORMA'
                ],
                datasets: ['datarescue_corrupted'],
                guide: [
                    '1. Limpia VOLUMEN_CBM similar a PESO_KG.',
                    '2. Calcula estadísticos: P95 = PERCENTILE.INC(tabla[CBM_LIMPIO], 0.95).',
                    '3. Marca outliers: Outlier = IF(CBM > P95 * 1.5, "Sí", "No").',
                    '4. Crea medidas MAX, AVG, MIN para el dashboard.',
                    '5. Lista los CODIGO_PROFORMA de outliers en una tabla.'
                ],
                tips: [
                    'Los outliers legítimos existen - no los elimines sin investigar.',
                    'Un CBM de 30000 para una carga marítima es imposible (un contenedor es ~33 CBM).',
                    'Usa formato condicional para resaltar outliers en rojo.'
                ],
                expectedOutcome: 'Dashboard con MAX realista (~500 CBM), tabla de 3-5 outliers identificados.',
                missionSteps: [
                    {
                        id: 'dr3_mcq_threshold',
                        type: 'mcq',
                        prompt: '¿Cuál es una regla simple y defensible para marcar outliers de CBM aquí?',
                        options: [
                            'CBM > P95 * 1.5',
                            'CBM > 1',
                            'CBM < 0'
                        ],
                        expected: 'CBM > P95 * 1.5'
                    },
                    {
                        id: 'dr3_photo',
                        type: 'photo',
                        prompt: 'Sube una captura de tu tabla/listado donde se vean los outliers marcados.',
                        simulatedDelayMs: 2200,
                        successMessage: 'Revisión automática: outliers identificados.'
                    }
                ],
                validation: {
                    type: 'setMatch',
                    measureId: 'OutliersDetectados',
                    expectedSetFrom: 'stepKey.outliersVolumen',
                    requiredCards: ['MAX', 'IF']
                },
                winImage: '/images/story/datarescue-3-win.png'
            },
            {
                id: 'datarescue-4',
                title: 'COUNT vs COUNTROWS',
                chapter: 4,
                level: 3,
                xp: 700,
                coins: 180,
                description: 'Corruptex duplicó filas. Entiende la diferencia entre COUNT y COUNTROWS.',
                storyContext: 'El villano ejecutó un JOIN incorrecto que duplicó algunas transacciones. Los KPIs están inflados. Debes entender cuándo usar COUNT (celdas no nulas), COUNTROWS (filas), y DISTINCTCOUNT (valores únicos).',
                objectives: [
                    'Identificar filas duplicadas por CODIGO_PROFORMA',
                    'Demostrar: COUNT(columna) ≠ COUNTROWS(tabla) cuando hay nulos',
                    'Calcular: CotizacionesBrazil = COUNTROWS(FILTER(tabla, país="Brazil"))',
                    'Calcular: TotalCotizaciones = COUNTROWS(tabla)',
                    'Explicar el impacto de duplicados en métricas'
                ],
                datasets: ['datarescue_duplicated'],
                guide: [
                    '1. Agrupa por CODIGO_PROFORMA y cuenta ocurrencias.',
                    '2. Filtra donde COUNT > 1 para encontrar duplicados.',
                    '3. Compara: COUNT([GANANCIA]) vs COUNTROWS(tabla) - ¿Por qué difieren?',
                    '4. Usa DISTINCTCOUNT([CODIGO_PROFORMA]) para el conteo real.',
                    '5. Calcula el % de inflación: (COUNTROWS - DISTINCTCOUNT) / DISTINCTCOUNT.'
                ],
                tips: [
                    'COUNT ignora nulos, COUNTROWS no.',
                    'Un duplicado puede inflar SUM también, no solo COUNT.',
                    'DISTINCTCOUNT es tu mejor amigo contra duplicados.'
                ],
                expectedOutcome: 'Reporte mostrando 15 duplicados, inflación de 8%, y conteos corregidos.',
                missionSteps: [
                    {
                        id: 'dr4_mcq_count',
                        type: 'mcq',
                        prompt: 'Concepto clave: ¿qué diferencia principal hay entre COUNT y COUNTROWS?',
                        options: [
                            'COUNTROWS ignora nulos, COUNT no',
                            'COUNT ignora nulos, COUNTROWS cuenta filas siempre',
                            'Son idénticas en todos los casos'
                        ],
                        expected: 'COUNT ignora nulos, COUNTROWS cuenta filas siempre'
                    },
                    {
                        id: 'dr4_photo',
                        type: 'photo',
                        prompt: 'Sube una captura donde se vea tu conteo de duplicados por CODIGO_PROFORMA.',
                        simulatedDelayMs: 1600,
                        successMessage: 'Revisión automática: duplicados evidenciados.'
                    }
                ],
                validation: {
                    type: 'numeric',
                    measureId: 'DuplicadosDetectados',
                    expectedFrom: 'stepKey.duplicatedRows',
                    tolerance: 0,
                    requiredCards: ['COUNTROWS', 'DISTINCTCOUNT']
                },
                winImage: '/images/story/datarescue-4-win.png'
            },
            {
                id: 'datarescue-5',
                title: 'Clientes Únicos Reales',
                chapter: 5,
                level: 3,
                xp: 800,
                coins: 200,
                description: 'Typos en CLIENTE crearon duplicados semánticos. Normaliza y cuenta.',
                storyContext: 'ALUMIMUNDO S.A. aparece como "ALUMIMUNDOO S.A.", "Alumimundo SA", "ALUMIMUNDO  S.A." (doble espacio). Lo que deberían ser 14 clientes únicos se convirtieron en 86. Las métricas por cliente están fragmentadas.',
                objectives: [
                    'Normalizar CLIENTE: trim, uppercase, remover acentos, colapsar espacios',
                    'Calcular: ClientesUnicos = DISTINCTCOUNT(CLIENTE_normalizado)',
                    'Calcular: PaisesUnicos = DISTINCTCOUNT(PAIS_ORIGEN_normalizado)',
                    'Visualizar: Cards + tabla por INCOTERM'
                ],
                datasets: ['datarescue_corrupted'],
                guide: [
                    '1. CLIENTE_LIMPIO = Text.Upper(Text.Trim([CLIENTE])).',
                    '2. Reemplaza dobles espacios: Text.Replace([CLIENTE_LIMPIO], "  ", " ").',
                    '3. Quita puntos y caracteres especiales.',
                    '4. Repite para PAIS_ORIGEN (ej: "Brazil" vs "BRAZIL" vs "Brzl").',
                    '5. Usa DISTINCTCOUNT en las columnas limpias.'
                ],
                tips: [
                    'La función Text.Clean remueve caracteres no imprimibles.',
                    'Crea una tabla de dimensión de clientes limpios para futuras relaciones.',
                    'El número real de clientes debería ser ~14.'
                ],
                expectedOutcome: 'KPI Cards: 14 Clientes Únicos, 10 Países Únicos.',
                missionSteps: [
                    {
                        id: 'dr5_mcq_normalize',
                        type: 'mcq',
                        prompt: '¿Qué transformación ayuda más a colapsar typos/variaciones de CLIENTE?',
                        options: [
                            'UPPER + TRIM + colapsar espacios',
                            'Convertir a número',
                            'Ordenar la tabla por fecha'
                        ],
                        expected: 'UPPER + TRIM + colapsar espacios'
                    },
                    {
                        id: 'dr5_raw_unique',
                        type: 'numeric',
                        prompt: 'Antes de limpiar, ¿cuántos clientes distintos ves (sin normalizar)?',
                        expectedFrom: 'stepKey.rawUniqueClients',
                        tolerance: 0
                    },
                    {
                        id: 'dr5_photo',
                        type: 'photo',
                        prompt: 'Sube una captura de tu columna CLIENTE_LIMPIO o tabla de dimensión de clientes.',
                        simulatedDelayMs: 1700,
                        successMessage: 'Revisión automática: normalización aplicada.'
                    }
                ],
                validation: {
                    type: 'numeric',
                    measureId: 'ClientesUnicos',
                    expectedFrom: 'answerKey.ClientesUnicos',
                    tolerance: 0,
                    requiredCards: ['DISTINCTCOUNT']
                },
                winImage: '/images/story/datarescue-5-win.png'
            },
            {
                id: 'datarescue-5b',
                title: 'El Caos de las Fechas',
                chapter: 5.5,
                level: 3,
                xp: 850,
                coins: 210,
                description: 'Corruptex mezcló formatos de fecha, mayúsculas y separadores decimales. Descubre los patrones y limpia.',
                storyContext: 'El villano inyectó caos temporal: FECHA_PROFORMA aparece como "2024-01-15", "15/01/2024", "Jan 15, 2024", "15.Enero.2024" y hasta "01-15-24". Los montos usan comas como decimales en unas filas (1.234,56) y puntos en otras (1,234.56). Los países están en MAYÚSCULAS, minúsculas, y con acentos inconsistentes. El timeline del dashboard está completamente roto.',
                objectives: [
                    'Detectar patrones de fechas: contar cuántos formatos distintos existen',
                    'Unificar FECHA_PROFORMA a formato Date estándar',
                    'Normalizar separadores decimales: punto como decimal, sin separador de miles',
                    'Estandarizar PAIS: mayúsculas, sin acentos, trim',
                    'Crear línea temporal correcta por FECHA_PROFORMA normalizada'
                ],
                datasets: ['datarescue_date_chaos'],
                guide: [
                    '1. Identifica los formatos de fecha presentes (usa Text.Contains para detectar "/", "-", ".", nombres de mes).',
                    '2. Crea columnas auxiliares para detectar el patrón de cada fila.',
                    '3. Usa Date.From() con try...otherwise para manejar errores de conversión.',
                    '4. Para decimales: Text.Replace([MONTO], ",", "TEMP") > Text.Replace(..., ".", ",") > Text.Replace(..., "TEMP", ".").',
                    '5. Para países: Text.Upper(Text.Trim(Text.Remove([PAIS], {"á","é","í","ó","ú","Á","É","Í","Ó","Ú"}))).',
                    '6. Reemplaza acentos por vocales sin acento manualmente o usa función personalizada.'
                ],
                tips: [
                    'El formato "01-15-24" es americano: Mes-Día-Año (corto).',
                    'El formato "15/01/2024" es europeo/latino: Día/Mes/Año.',
                    'Usa Columna de Ejemplo en Power Query para que detecte el patrón automáticamente.',
                    'La función Date.FromText con Culture específica puede ayudar: Date.FromText("01/15/2024", [Culture="en-US"]).',
                    'Para montos europeos (1.234,56): el punto es miles, la coma es decimal.'
                ],
                expectedOutcome: 'Timeline funcional con todas las fechas unificadas, montos correctos, y países normalizados.',
                missionSteps: [
                    {
                        id: 'dr5b_mcq_dateformat',
                        type: 'mcq',
                        prompt: 'Si ves "01/15/2024" en tus datos, ¿qué formato de fecha es?',
                        options: [
                            'Formato europeo (Día/Mes/Año)',
                            'Formato americano (Mes/Día/Año)',
                            'Formato ISO (Año/Mes/Día)'
                        ],
                        expected: 'Formato americano (Mes/Día/Año)'
                    },
                    {
                        id: 'dr5b_formats_count',
                        type: 'numeric',
                        prompt: '¿Cuántos formatos DISTINTOS de fecha encuentras en la columna FECHA_PROFORMA?',
                        expectedFrom: 'stepKey.distinctDateFormats',
                        tolerance: 0
                    },
                    {
                        id: 'dr5b_mcq_decimal',
                        type: 'mcq',
                        prompt: 'El valor "1.234,56" en formato europeo equivale a:',
                        options: [
                            '1234.56 (mil doscientos treinta y cuatro con 56 centavos)',
                            '1.23456 (uno punto veintitrés...)',
                            '123456 (ciento veintitrés mil...)'
                        ],
                        expected: '1234.56 (mil doscientos treinta y cuatro con 56 centavos)'
                    },
                    {
                        id: 'dr5b_photo',
                        type: 'photo',
                        prompt: 'Sube una captura mostrando tu columna FECHA_PROFORMA limpia (tipo Date) junto con MONTO normalizado.',
                        simulatedDelayMs: 2500,
                        successMessage: 'Revisión automática: fechas y montos normalizados detectados.'
                    }
                ],
                validation: {
                    type: 'numeric',
                    measureId: 'FechasValidas',
                    expectedFrom: 'answerKey.FechasValidas',
                    tolerance: 0.01,
                    requiredCards: ['DATE', 'TEXT']
                },
                winImage: '/images/story/datarescue-5b-win.png'
            },
            {
                id: 'datarescue-6',
                title: 'Clasificación de Riesgo',
                chapter: 6,
                level: 4,
                xp: 900,
                coins: 220,
                description: 'Usa lógica IF/OR para clasificar operaciones de alto riesgo.',
                storyContext: 'El departamento legal necesita identificar operaciones de riesgo. Regla: Revisar si (PESO > 1000 kg) O (GANANCIA < ₡1000). Debes crear una clasificación automática.',
                objectives: [
                    'Convertir PESO y GANANCIA a números robustos',
                    'Crear columna: Riesgo = IF(OR(peso>1000, ganancia<1000), "Revisar", "OK")',
                    'Contar operaciones por clasificación',
                    'Sumar ganancia por clasificación',
                    'Tabla detalle con operaciones a revisar'
                ],
                datasets: ['datarescue_corrupted'],
                guide: [
                    '1. Asegura que PESO_LIMPIO y GANANCIA_LIMPIA son números.',
                    '2. En DAX: Clasificacion = IF(OR([PESO]>1000, [GANANCIA]<1000), "Revisar", "OK").',
                    '3. O en Power Query: if [PESO] > 1000 or [GANANCIA] < 1000 then "Revisar" else "OK".',
                    '4. Agrupa para ver cuántas operaciones están en cada categoría.',
                    '5. Calcula la ganancia en riesgo vs ganancia segura.'
                ],
                tips: [
                    'OR devuelve TRUE si al menos una condición es verdadera.',
                    'AND devuelve TRUE solo si TODAS las condiciones son verdaderas.',
                    'Usa formato condicional: rojo para "Revisar", verde para "OK".'
                ],
                expectedOutcome: 'Dashboard con ~35% operaciones en "Revisar", mostrando ₡50,000 en ganancia en riesgo.',
                missionSteps: [
                    {
                        id: 'dr6_mcq_rule',
                        type: 'mcq',
                        prompt: 'Regla de negocio: ¿cuándo una operación debe quedar en "Revisar"?',
                        options: [
                            'Si PESO > 1000 OR GANANCIA < 1000',
                            'Solo si PESO > 1000 AND GANANCIA < 1000',
                            'Solo si GANANCIA > 1000'
                        ],
                        expected: 'Si PESO > 1000 OR GANANCIA < 1000'
                    },
                    {
                        id: 'dr6_photo',
                        type: 'photo',
                        prompt: 'Sube una captura de tu clasificación (tabla con Riesgo = Revisar/OK).',
                        simulatedDelayMs: 2000,
                        successMessage: 'Revisión automática: clasificación aplicada.'
                    }
                ],
                validation: {
                    type: 'confusionMatrix',
                    measureId: 'OperacionesRevisar',
                    expectedFrom: 'answerKey.OperacionesRevisar',
                    tolerance: 2,
                    requiredCards: ['IF', 'OR']
                },
                winImage: '/images/story/datarescue-6-win.png'
            },
            {
                id: 'datarescue-7',
                title: 'La Batalla Final: Dashboard Completo',
                chapter: 7,
                level: 5,
                xp: 1500,
                coins: 400,
                description: 'Construye el dashboard definitivo que derrote a Corruptex.',
                storyContext: '¡Momento de la verdad! Corruptex lanza su ataque final con TODAS las corrupciones simultáneas: typos, nulos, outliers, duplicados, formatos inválidos, y fechas imposibles. Debes construir un dashboard completo que muestre la verdad absoluta.',
                objectives: [
                    'Aplicar TODAS las limpiezas aprendidas',
                    'Construir dashboard con: 4 KPI Cards, 2 gráficos de barras, 1 línea temporal, 1 tabla detalle',
                    'KPIs: Ganancia Total, Rentabilidad, Clientes Únicos, Operaciones en Riesgo',
                    'Slicers: MODALIDAD, PAIS_ORIGEN, INCOTERM, rango de fechas',
                    'Validar todos los números contra el answer key'
                ],
                datasets: ['datarescue_full_challenge'],
                guide: [
                    '1. Aplica todas las transformaciones de Power Query en orden.',
                    '2. Crea las medidas maestras.',
                    '3. Diseña el layout del dashboard (usa cuadrícula).',
                    '4. Añade slicers para interactividad.',
                    '5. Valida cada KPI individualmente antes de la validación final.'
                ],
                tips: [
                    'Guarda versiones incrementales de tu archivo .pbix.',
                    'Documenta cada transformación con comentarios.',
                    'Un buen dashboard cuenta una historia con los datos limpios.'
                ],
                expectedOutcome: 'Dashboard ejecutivo completo que demuestra la verdad rescatada del caos de Corruptex.',
                missionSteps: [
                    {
                        id: 'dr7_photo',
                        type: 'photo',
                        prompt: 'Sube una captura de tu dashboard final (overview con KPIs y filtros).',
                        simulatedDelayMs: 2500,
                        successMessage: 'Revisión automática: dashboard final verificado.'
                    }
                ],
                validation: {
                    type: 'composite',
                    measures: [
                        { id: 'GananciaTotal', expectedFrom: 'answerKey.GananciaTotal', tolerance: 0.02 },
                        { id: 'Rentabilidad', expectedFrom: 'answerKey.Rentabilidad', tolerance: 0.01 },
                        { id: 'ClientesUnicos', expectedFrom: 'answerKey.ClientesUnicos', tolerance: 0 },
                        { id: 'OperacionesRevisar', expectedFrom: 'answerKey.OperacionesRevisar', tolerance: 2 }
                    ],
                    requiredCards: ['SUM', 'AVERAGE', 'MAX', 'MIN', 'COUNT', 'COUNTROWS', 'DISTINCTCOUNT', 'IF', 'AND', 'OR']
                },
                winImage: '/images/story/datarescue-7-win.png'
            }
        ]
    },
    {
        id: 'hogwarts',
        order: 5,
        name: 'Gringotts Analytics',
        subtitle: 'Harry Potter Universe',
        description: 'Análisis financiero mágico, estadísticas de Quidditch y clasificación de casas.',
        icon: '🧙',
        color: '#9b59b6',
        difficulty: 'Intermedio',
        image: '/images/worlds/gringotts.png',
        prologue: 'El Ministerio de Magia ha contratado a un analista muggle (tú) para modernizar Gringotts. Los duendes tienen datos en pergaminos desde hace 500 años, pero nunca han usado visualizaciones. Tu misión: usar Power BI para transformar la banca mágica.',
        storyArc: 'La Transformación Digital de Gringotts',
        missions: [
            {
                id: 'hp-1',
                title: 'Las Bóvedas de Gringotts',
                chapter: 1,
                level: 2,
                xp: 350,
                coins: 90,
                description: 'Importa y limpia los datos de transacciones de Gringotts.',
                storyContext: 'Griphook te ha dado acceso a los registros de transacciones. Hay depósitos, retiros e intercambios de moneda. Pero los duendes usan Galeones, Sickles y Knuts. Debes normalizar todo a Galeones para el análisis.',
                objectives: [
                    'Importar datos de transacciones del banco',
                    'Crear columna calculada: ValorEnGaleones (1 Galeón = 17 Sickles = 493 Knuts)',
                    'Medida: TotalTransacciones = COUNTROWS(Transactions)',
                    'Medida: VolumenTotal = SUM(ValorEnGaleones)',
                    'Visualizar transacciones por tipo'
                ],
                datasets: ['hogwarts_transactions'],
                guide: [
                    '1. Importa los datos de transacciones de Gringotts.',
                    '2. Crea columna: IF([Currency]="Galleon", [Amount], IF([Currency]="Sickle", [Amount]/17, [Amount]/493)).',
                    '3. Suma todas las transacciones normalizadas.',
                    '4. Crea gráfico de donut por tipo de transacción.',
                    '5. Añade slicer por familia de magos.'
                ],
                tips: [
                    'La familia Black tiene la bóveda más antigua.',
                    'Los Malfoy son los principales depositantes.',
                    'Recuerda: 1 Galeón = 17 Sickles = 493 Knuts.'
                ],
                expectedOutcome: 'Dashboard básico con volumen total de ~125,000 Galeones.',
                validation: {
                    type: 'numeric',
                    measureId: 'VolumenTotalGaleones',
                    expectedValue: 125000,
                    tolerance: 0.05,
                    requiredCards: ['SUM', 'COUNTROWS', 'IF']
                }
            },
            {
                id: 'hp-2',
                title: 'La Copa de Quidditch',
                chapter: 2,
                level: 3,
                xp: 500,
                coins: 130,
                description: 'Analiza las estadísticas de la temporada de Quidditch de Hogwarts.',
                storyContext: 'Madame Hooch quiere un análisis completo de la temporada de Quidditch. ¿Qué casa tiene el mejor buscador? ¿Cuántos puntos promedio por partido? ¿Cuál es la racha de victorias más larga?',
                objectives: [
                    'Medida: PuntosTotales = SUM(Matches[Points])',
                    'Medida: PromedioPartido = AVERAGE(Matches[Points])',
                    'Análisis por casa: Gryffindor, Slytherin, Ravenclaw, Hufflepuff',
                    'Calcular: VictoriasPorCasa = CALCULATE(COUNTROWS(...), Status="Win")',
                    'Ranking de buscadores por capturas de Snitch'
                ],
                datasets: ['hogwarts_quidditch'],
                guide: [
                    '1. Carga datos de partidos de Quidditch.',
                    '2. Crea medidas de puntos por casa usando CALCULATE.',
                    '3. El Snitch vale 150 puntos - analiza su impacto.',
                    '4. Crea gráfico de barras comparativo por casa.',
                    '5. Identifica al mejor buscador de la temporada.'
                ],
                tips: [
                    'Harry Potter capturó el Snitch en el 95% de sus partidos.',
                    'Slytherin tiene más goles pero menos capturas de Snitch.',
                    'Usa colores temáticos: Rojo, Verde, Azul, Amarillo.'
                ],
                expectedOutcome: 'Dashboard de Quidditch mostrando a Gryffindor como campeón.',
                validation: {
                    type: 'numeric',
                    measureId: 'VictoriasGryffindor',
                    expectedValue: 8,
                    tolerance: 0,
                    requiredCards: ['CALCULATE', 'COUNTROWS', 'SUM']
                }
            },
            {
                id: 'hp-3',
                title: 'El Sombrero Seleccionador Analytics',
                chapter: 3,
                level: 4,
                xp: 650,
                coins: 160,
                description: 'Analiza patrones históricos de clasificación del Sombrero Seleccionador.',
                storyContext: 'Dumbledore quiere entender los patrones de selección. ¿Hay sesgo hacia ciertas casas? ¿Los estudiantes de familias mágicas van a casas específicas? ¿Cómo predecir la casa de un nuevo estudiante?',
                objectives: [
                    'Distribución de estudiantes por casa (últimos 50 años)',
                    'Análisis por tipo de sangre: Pureblood, Half-blood, Muggle-born',
                    'Calcular: PorcentajeCasa = [ConteoEnCasa] / [TotalEstudiantes]',
                    'Correlación entre familia de origen y casa asignada',
                    'Predicción basada en características'
                ],
                datasets: ['hogwarts_students'],
                guide: [
                    '1. Importa el registro histórico de estudiantes.',
                    '2. Agrupa por casa y cuenta estudiantes.',
                    '3. Segmenta por "Blood Status" (tipo de linaje).',
                    '4. Crea tabla de contingencia Casa vs Blood Status.',
                    '5. Busca patrones: ¿Slytherin tiene más Purebloods?'
                ],
                tips: [
                    'Slytherin históricamente favorece Purebloods (aunque no exclusivamente).',
                    'Gryffindor tiene la distribución más equilibrada.',
                    'Los Muggle-born raramente van a Slytherin.'
                ],
                expectedOutcome: 'Análisis estadístico demostrando patrones (no absolutos) de selección.',
                validation: {
                    type: 'numeric',
                    measureId: 'PorcentajeSlytherin',
                    expectedValue: 0.25,
                    tolerance: 0.03,
                    requiredCards: ['COUNTROWS', 'CALCULATE', 'FILTER']
                }
            },
            {
                id: 'hp-4',
                title: 'Defensa Contra las Artes Oscuras',
                chapter: 4,
                level: 5,
                xp: 800,
                coins: 200,
                description: 'Analiza el historial de la maldición en la posición de profesor.',
                storyContext: 'Desde que Voldemort maldijo el puesto, ningún profesor de DCAO dura más de un año. ¿Es estadísticamente significativo? Analiza las causas de salida y duración de cada profesor.',
                objectives: [
                    'Listar profesores y su causa de terminación',
                    'Calcular: DuracionPromedio = AVERAGE(Tenure[Months])',
                    'Clasificar causas: Muerte, Despido, Renuncia, Amnesia, Prisión',
                    'Análisis de supervivencia con tiempo hasta el evento',
                    'Visualización de timeline de profesores'
                ],
                datasets: ['hogwarts_dcao_professors'],
                guide: [
                    '1. Lista los profesores desde 1956 (cuando Voldemort solicitó el puesto).',
                    '2. Calcula meses de duración de cada uno.',
                    '3. Categoriza las causas de terminación.',
                    '4. Crea gráfico de Gantt/timeline.',
                    '5. Compara con duración promedio de otras materias.'
                ],
                tips: [
                    'Quirrell: 1 año (muerte). Lockhart: 1 año (amnesia). Lupin: 1 año (renuncia).',
                    'Moody (falso): 1 año (prisión). Umbridge: 1 año (centauros).',
                    'La duración promedio en otras materias es 15+ años.'
                ],
                expectedOutcome: 'Evidencia estadística de la maldición: 100% tasa de rotación anual.',
                validation: {
                    type: 'numeric',
                    measureId: 'DuracionPromedioMeses',
                    expectedValue: 10,
                    tolerance: 1,
                    requiredCards: ['AVERAGE', 'COUNTROWS']
                }
            },
            {
                id: 'hp-5',
                title: 'O.W.L.s y N.E.W.T.s Analytics',
                chapter: 5,
                level: 5,
                xp: 900,
                coins: 230,
                description: 'Analiza los resultados de exámenes para identificar tendencias académicas.',
                storyContext: 'El Ministerio quiere entender el rendimiento académico de Hogwarts. ¿Qué materias tienen mayor tasa de aprobación? ¿Hay diferencias significativas entre casas? ¿Los TIMOS predicen los ÉXTASIS?',
                objectives: [
                    'Calcular: TasaAprobacion = Aprobados / TotalPresentados',
                    'Comparar rendimiento por casa en cada materia',
                    'Correlación entre notas O.W.L. y N.E.W.T.',
                    'Identificar "materias difíciles" (alta reprobación)',
                    'Top 10 estudiantes por promedio general'
                ],
                datasets: ['hogwarts_exams'],
                guide: [
                    '1. Importa resultados de O.W.L.s y N.E.W.T.s.',
                    '2. Notas: O, E, A (aprobado), P, D, T (reprobado).',
                    '3. Crea medida de tasa de aprobación por materia.',
                    '4. Usa scatter plot para correlación TIMO-ÉXTASIS.',
                    '5. Identifica a Hermione como #1 (obviamente).'
                ],
                tips: [
                    'Pociones tiene la mayor varianza de notas.',
                    'Historia de la Magia tiene la menor tasa de O (Outstanding).',
                    'Hermione tiene 10 O.W.L.s, siendo la mejor de su generación.'
                ],
                expectedOutcome: 'Dashboard académico completo con ranking de estudiantes y materias.',
                validation: {
                    type: 'numeric',
                    measureId: 'TasaAprobacionGlobal',
                    expectedValue: 0.78,
                    tolerance: 0.03,
                    requiredCards: ['COUNTROWS', 'CALCULATE', 'FILTER', 'AVERAGE']
                }
            },
            {
                id: 'hp-6',
                title: 'La Segunda Guerra Mágica: Dashboard Ejecutivo',
                chapter: 6,
                level: 6,
                xp: 1300,
                coins: 350,
                description: 'Construye el análisis definitivo del conflicto contra Voldemort.',
                storyContext: 'El Ministerio necesita documentar la Segunda Guerra Mágica para la posteridad. Bajas, batallas clave, recursos utilizados, y el costo total del conflicto. Este reporte se guardará en los archivos del Ministerio.',
                objectives: [
                    'Consolidar datos de múltiples fuentes (3+ tablas)',
                    'Timeline de eventos clave (1995-1998)',
                    'Análisis de bajas por bando: Orden vs Mortífagos',
                    'Costo económico de la guerra en Galeones',
                    'Dashboard ejecutivo de 3 páginas para el Ministro'
                ],
                datasets: ['hogwarts_war_data', 'hogwarts_casualties', 'hogwarts_battles'],
                guide: [
                    '1. Relaciona tablas por EventID y PersonID.',
                    '2. Crea timeline desde el regreso de Voldemort.',
                    '3. Cuenta bajas confirmadas por cada bando.',
                    '4. Estima costos: destrucción + reconstrucción.',
                    '5. Página 1: Overview, Página 2: Batallas, Página 3: Memorial.'
                ],
                tips: [
                    'La Batalla de Hogwarts fue el evento más costoso.',
                    'La Orden tuvo 50+ bajas confirmadas.',
                    'Usa tema oscuro con acentos dorados para solemnidad.'
                ],
                expectedOutcome: 'Documento histórico completo de la Segunda Guerra Mágica.',
                validation: {
                    type: 'composite',
                    measures: [
                        { id: 'TotalBajas', expectedValue: 127, tolerance: 5 },
                        { id: 'BatallasRegistradas', expectedValue: 12, tolerance: 0 },
                        { id: 'CostoTotalGaleones', expectedValue: 15000000, tolerance: 0.1 }
                    ],
                    requiredCards: ['SUM', 'COUNTROWS', 'CALCULATE', 'FILTER', 'IF']
                }
            }
        ]
    }
];
