export const WEEKLY_CHALLENGES = [
    {
        week: 1,
        title: "Fundamentos de Power BI",
        description: "Demuestra que conoces la interfaz y los conceptos básicos de Power BI Desktop.",
        xpReward: 500,
        questions: [
            {
                id: 'w1q1',
                question: "¿Cuál es la vista donde se definen las relaciones entre tablas?",
                options: [
                    "Vista de Informe",
                    "Vista de Tabla",
                    "Vista de Modelo",
                    "Editor de Power Query"
                ],
                correctAnswer: 2 // Vista de Modelo
            },
            {
                id: 'w1q2',
                question: "¿Qué herramienta se usa para transformar y limpiar datos antes de cargarlos?",
                options: [
                    "DAX Studio",
                    "Power Query Editor",
                    "Visualizations Pane",
                    "Data Modeling View"
                ],
                correctAnswer: 1 // Power Query Editor
            },
            {
                id: 'w1q3',
                question: "¿Qué extensión tienen los archivos de plantilla de Power BI?",
                options: [
                    ".pbix",
                    ".pbit",
                    ".xlsx",
                    ".pbids"
                ],
                correctAnswer: 1 // .pbit
            },
            {
                id: 'w1q4',
                question: "Para compartir un informe de forma segura en la web pública, ¿qué opción NO se recomienda para datos sensibles?",
                options: [
                    "Compartir en un Workspace",
                    "App de Power BI",
                    "Publicar en la Web (Publish to Web)",
                    "Suscripción por correo"
                ],
                correctAnswer: 2 // Publish to Web
            }
        ]
    },
    {
        week: 2,
        title: "Transformación de Datos",
        description: "Adéntrate en Power Query y la limpieza de datos. ¡Sube el nivel!",
        xpReward: 800,
        questions: [
            {
                id: 'w2q1',
                question: "En Power Query, ¿qué opción usarías para convertir filas en columnas?",
                options: [
                    "Transponer",
                    "Anular dinamización (Unpivot)",
                    "Columna dinámica (Pivot Column)",
                    "Agrupar por (Group By)"
                ],
                correctAnswer: 2 // Pivot Column
            },
            {
                id: 'w2q2',
                question: "¿Cuál es el lenguaje que utiliza Power Query por detrás?",
                options: [
                    "SQL",
                    "Python",
                    "M",
                    "DAX"
                ],
                correctAnswer: 2 // M
            },
            {
                id: 'w2q3',
                question: "¿Qué ocurre si cambias el tipo de dato de una columna en medio de los pasos aplicados?",
                options: [
                    "Se crea un nuevo paso de 'Tipo cambiado'",
                    "Se borran los pasos anteriores",
                    "Power BI da error y cierra",
                    "No se puede hacer"
                ],
                correctAnswer: 0 // Nuevo paso
            },
            {
                id: 'w2q4',
                question: "Para combinar dos tablas una debajo de la otra (mismas columnas), usas:",
                options: [
                    "Combinar Consultas (Merge)",
                    "Anexar Consultas (Append)",
                    "Relacionar Tablas",
                    "Join"
                ],
                correctAnswer: 1 // Append
            }
        ]
    },
    {
        week: 3,
        title: "Modelado y DAX Básico",
        description: "Es hora de crear medidas y entender el contexto de fila y filtro.",
        xpReward: 1200,
        questions: [
            {
                id: 'w3q1',
                question: "¿Qué función DAX ignora los filtros externos aplicados a una columna o tabla?",
                options: [
                    "FILTER",
                    "RELATED",
                    "ALL",
                    "CALCULATE"
                ],
                correctAnswer: 2 // ALL
            },
            {
                id: 'w3q2',
                question: "En un esquema de estrella, ¿cómo se llaman las tablas que contienen números y métricas?",
                options: [
                    "Tablas de Dimensiones",
                    "Tablas de Hechos",
                    "Tablas Puente",
                    "Tablas de Búsqueda"
                ],
                correctAnswer: 1 // Tablas de Hechos
            },
            {
                id: 'w3q3',
                question: "¿Cuál es la diferencia principal entre una Columna Calculada y una Medida?",
                options: [
                    "La Medida se calcula fila por fila almacenada en RAM",
                    "La Columna Calculada se calcula en tiempo de consulta",
                    "La Medida usa CPU en tiempo de consulta, la Columna ocupa disco/RAM al refrescar",
                    "No hay diferencia"
                ],
                correctAnswer: 2 // Medida CPU/Consulta vs Columna Disco/Refresh
            },
            {
                id: 'w3q4',
                question: "¿Qué función se considera la navaja suiza de DAX para modificar el contexto de filtro?",
                options: [
                    "SUMX",
                    "CALCULATE",
                    "AVERAGE",
                    "LOOKUPVALUE"
                ],
                correctAnswer: 1 // CALCULATE
            }
        ]
    },
    {
        week: 4,
        title: "DAX Avanzado y Visualización",
        description: "Demuestra tu maestría con casos complejos y buenas prácticas visuales.",
        xpReward: 2000,
        questions: [
            {
                id: 'w4q1',
                question: "¿Qué función iteradora usarías para multiplicar Precio * Cantidad fila a fila y luego sumar?",
                options: [
                    "SUM",
                    "SUMX",
                    "CALCULATE",
                    "COUNTROWS"
                ],
                correctAnswer: 1 // SUMX
            },
            {
                id: 'w4q2',
                question: "¿Para qué sirve la función USERELATIONSHIP?",
                options: [
                    "Para crear una relación física nueva",
                    "Para activar una relación inactiva durante un cálculo",
                    "Para ver quién usa el reporte",
                    "Para unir dos tablas many-to-many"
                ],
                correctAnswer: 1 // Activar relacion inactiva
            },
            {
                id: 'w4q3',
                question: "¿Qué tipo de gráfico es mejor para ver la contribución de partes a un todo a lo largo del tiempo?",
                options: [
                    "Gráfico de dispersión",
                    "Gráfico de columnas 100% apiladas",
                    "Gráfico de medidor",
                    "Tarjeta"
                ],
                correctAnswer: 1 // Columnas 100% apiladas
            },
            {
                id: 'w4q4',
                question: "¿Qué es 'Row Context Transition' (Transición de contexto de fila)?",
                options: [
                    "Cambiar de fila en Power Query",
                    "Cuando el contexto de fila se convierte en contexto de filtro (ej: en CALCULATE)",
                    "Mover filas entre tablas",
                    "Animación de filas"
                ],
                correctAnswer: 1 // Context transition
            }
        ]
    }
];
