export const academyCategories = [
  {
    id: 'basics',
    title: 'Fundamentos',
    icon: '📊',
    description: 'Primeros pasos esenciales.',
    gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)'
  },
  {
    id: 'data',
    title: 'Datos',
    icon: '🔌',
    description: 'Conexión y limpieza de datos.',
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
  },
  {
    id: 'modeling',
    title: 'DAX',
    icon: '🧮',
    description: 'Fórmulas y cálculos poderosos.',
    gradient: 'linear-gradient(135deg, #be93c5 0%, #7bc6cc 100%)'
  },
  {
    id: 'viz',
    title: 'Visualización',
    icon: '🎨',
    description: 'Gráficos y dashboards.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'tips',
    title: 'Tips del Juego',
    icon: '🎮',
    description: 'Atajos para completar misiones.',
    gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
  }
];

export const academyLessons = [
  // =========================================================================
  // FUNDAMENTOS
  // =========================================================================
  {
    id: 'pbi-intro',
    categoryId: 'basics',
    title: '¿Qué es Power BI?',
    duration: '5 min',
    level: 'Principiante',
    description: 'La herramienta que te convertirá en héroe de datos.',
    content: `
### ¿Por qué Power BI?

Power BI es la herramienta #1 de Business Intelligence. Con ella puedes:

- **Conectar** a Excel, bases de datos, APIs, y más de 100 fuentes.
- **Transformar** datos sucios en información limpia.
- **Visualizar** con gráficos interactivos profesionales.
- **Compartir** dashboards con tu equipo o el mundo.

### Los 3 Componentes

1. **Power BI Desktop** (gratis): Donde creas tus reportes.
2. **Power BI Service** (web): Donde los publicas y compartes.
3. **Power BI Mobile**: Para ver tus datos en cualquier lugar.

### 🎮 Tip para el Juego

En DataRescue HQ y otros mundos, trabajarás principalmente con **Power BI Desktop**. Asegúrate de tenerlo instalado antes de comenzar las misiones.

**Descarga gratuita:** https://powerbi.microsoft.com/es-es/desktop/
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/fundamentals/power-bi-overview',
    gameRelevance: ['office', 'datarescue', 'stark'],
    imageId: 'pbi-ecosystem'
  },
  {
    id: 'pbi-interface',
    categoryId: 'basics',
    title: 'Conoce la Interfaz',
    duration: '8 min',
    level: 'Principiante',
    description: 'Domina las 3 vistas esenciales de Power BI Desktop.',
    content: `
### Las 3 Vistas de Power BI Desktop

En la barra lateral izquierda encontrarás:

1. **📊 Vista de Reporte**: Donde creas visualizaciones y dashboards.
2. **📋 Vista de Datos**: Para inspeccionar tus tablas (como Excel).
3. **🔗 Vista de Modelo**: Donde ves las relaciones entre tablas.

### Paneles Importantes

- **Panel de Campos** (derecha): Lista todas tus tablas y columnas.
- **Panel de Visualizaciones** (derecha): Tipos de gráficos disponibles.
- **Panel de Filtros** (derecha): Controla qué datos se muestran.
- **Barra de Fórmulas** (arriba): Para escribir medidas DAX.

### 🎮 Tip para el Juego

En las misiones de **Dunder Mifflin**, usarás principalmente la **Vista de Reporte** para crear gráficos. En **DataRescue HQ**, pasarás mucho tiempo en **Power Query** (Transformar datos) limpiando corrupción.

**Atajo útil:** Presiona Ctrl + Enter para ejecutar una medida DAX después de escribirla.
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/fundamentals/desktop-getting-started',
    gameRelevance: ['office', 'datarescue'],
    imageId: 'interface-views'
  },
  {
    id: 'first-report',
    categoryId: 'basics',
    title: 'Tu Primer Reporte en 5 Pasos',
    duration: '10 min',
    level: 'Principiante',
    description: 'De cero a dashboard en minutos.',
    content: `
### El Flujo Completo

**Paso 1: Obtener Datos**
- Inicio → Obtener datos → Excel (o CSV)
- Selecciona tu archivo y las tablas

**Paso 2: Revisar en Power Query**
- Click en "Transformar datos" para abrir Power Query
- Verifica que los tipos de datos sean correctos
- Cierra y aplica

**Paso 3: Crear una Medida**
- En la pestaña Modelado → Nueva medida
- Escribe: TotalVentas = SUM(Ventas[Monto])

**Paso 4: Agregar Visualización**
- Arrastra la medida al lienzo
- Selecciona el tipo de gráfico en el panel

**Paso 5: Guardar**
- Ctrl + S → Guarda como .pbix

### 🎮 Tip para el Juego

Este flujo exacto es lo que harás en la **Misión 1 de Dunder Mifflin**. La medida COUNTROWS(Tabla) te dará el total de filas para verificar que importaste todo correctamente.
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/fundamentals/desktop-getting-started',
    gameRelevance: ['office'],
    imageId: 'drag-drop'
  },

  // =========================================================================
  // DATOS
  // =========================================================================
  {
    id: 'get-data',
    categoryId: 'data',
    title: 'Conectar a Fuentes de Datos',
    duration: '8 min',
    level: 'Principiante',
    description: 'Excel, CSV, bases de datos y más.',
    content: `
### Fuentes Más Comunes

Power BI puede conectarse a **cientos** de fuentes. Las más usadas:

- **Excel** (.xlsx): El más común en empresas
- **CSV/Texto**: Archivos delimitados por comas
- **SQL Server**: Bases de datos empresariales
- **Web**: APIs y páginas web
- **Carpeta**: Múltiples archivos a la vez

### Importar vs DirectQuery

| Método | Cuándo Usarlo |
|--------|--------------|
| **Importar** | Archivos pequeños/medianos. Más rápido. |
| **DirectQuery** | Datos masivos en tiempo real. Más lento. |

### 🎮 Tip para el Juego

Para las misiones de **DataRescue HQ**, siempre usarás **Importar**. Los datasets del juego son CSV que descargas y cargas en Power BI.

**Atajo:** Arrastra un archivo CSV directamente a Power BI Desktop para importarlo.
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/connect-data/desktop-data-sources',
    gameRelevance: ['datarescue', 'office', 'stark'],
    imageId: 'data-sources'
  },
  {
    id: 'power-query-basics',
    categoryId: 'data',
    title: 'Power Query: Limpieza de Datos',
    duration: '15 min',
    level: 'Intermedio',
    description: 'El arma secreta contra datos corruptos.',
    content: `
### ¿Qué es Power Query?

Es el **motor de transformación** de Power BI. Aquí limpias, filtras y preparas tus datos ANTES de analizarlos.

### Cómo Abrirlo

- Inicio → Transformar datos
- O al importar: "Transformar datos" en lugar de "Cargar"

### Transformaciones Más Útiles

| Acción | Cómo |
|--------|------|
| Usar primera fila como encabezado | Inicio → Usar primera fila como encabezado |
| Cambiar tipo de dato | Click derecho en columna → Tipo |
| Quitar columnas | Click derecho → Quitar |
| Reemplazar valores | Click derecho → Reemplazar valores |
| Dividir columna | Click derecho → Dividir columna |
| Quitar filas vacías | Inicio → Quitar filas → Quitar en blanco |

### 🎮 Tip para DataRescue HQ

En las misiones de DataRescue, el villano **Corruptex** ha inyectado:
- **Nulos**: Usa "Reemplazar valores" para llenarlos
- **Texto en números**: Usa "Tipo" → Número decimal
- **Formatos raros** como "(1234)": Usa "Reemplazar valores" para quitar paréntesis

**Súper Tip:** El panel "Pasos aplicados" (derecha) te muestra todo lo que has hecho. ¡Puedes deshacer cualquier paso!
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-query/power-query-what-is-power-query',
    gameRelevance: ['datarescue'],
    imageId: 'power-query-refinery'
  },
  {
    id: 'column-from-examples',
    categoryId: 'data',
    title: 'Columna de Ejemplos (Magia)',
    duration: '5 min',
    level: 'Intermedio',
    description: 'Deja que Power BI adivine qué quieres hacer.',
    content: `
### La Función Más Mágica de Power Query

¿Tienes una columna como "Juan Pérez" y quieres solo el nombre?

1. Selecciona la columna
2. **Agregar columna → Columna a partir de ejemplos**
3. En la primera fila, escribe "Juan"
4. Power BI **adivina** el patrón y lo aplica a todas las filas

### Funciona Para

- Extraer partes de texto
- Combinar columnas
- Formatear fechas
- ¡Casi cualquier transformación!

### 🎮 Tip para el Juego

En DataRescue Misión 2, la columna PESO_KG tiene valores como "1111.6 kg" (con texto). Usa **Columna a partir de ejemplos**:
1. En la primera fila con "1111.6 kg", escribe "1111.6"
2. Power Query creará una columna numérica automáticamente
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-query/column-from-example',
    gameRelevance: ['datarescue'],
    imageId: 'magic-column'
  },
  {
    id: 'handle-errors',
    categoryId: 'data',
    title: 'Manejar Errores y Nulos',
    duration: '10 min',
    level: 'Intermedio',
    description: 'Cuando los datos no cooperan.',
    content: `
### Tipos de Problemas

1. **Valores nulos (null)**: Celdas vacías
2. **Errores de conversión**: Intentar convertir "abc" a número
3. **Valores inválidos**: Fechas imposibles como 30/02/2024

### Soluciones en Power Query

**Para nulos:**
Click derecho → Reemplazar valores
Valor a buscar: null
Reemplazar por: 0 (o lo que corresponda)

**Para errores:**
Click derecho → Reemplazar errores
Reemplazar por: null (o valor por defecto)

**Con código M (avanzado):**
= try [Columna] otherwise 0

### 🎮 Tip para DataRescue

En la Misión 1, la columna GANANCIA tiene nulos. La fórmula de recuperación es:

GANANCIA = PRECIO_VENTA - PRECIO_COSTO

Crea una columna personalizada en Power Query:
= if [GANANCIA] = null then [PRECIO_VENTA] - [PRECIO_COSTO] else [GANANCIA]
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-query/dealing-with-errors',
    gameRelevance: ['datarescue']
  },

  // =========================================================================
  // DAX
  // =========================================================================
  {
    id: 'dax-intro',
    categoryId: 'modeling',
    title: 'DAX: El Lenguaje de Power BI',
    duration: '10 min',
    level: 'Intermedio',
    description: 'Las fórmulas que dan vida a tus datos.',
    content: `
### ¿Qué es DAX?

DAX (Data Analysis Expressions) es el lenguaje de fórmulas de Power BI. Si conoces Excel, ya tienes ventaja.

### Medidas vs Columnas Calculadas

| Tipo | Cuándo Usar | Ejemplo |
|------|------------|---------|
| **Medida** | Cálculos que cambian con filtros | Total de ventas |
| **Columna** | Valor fijo por fila | Categoría de precio |

### Tu Primera Medida

TotalVentas = SUM(Ventas[Monto])

**Cómo crearla:**
1. Click en la tabla en el panel de Campos
2. Modelado → Nueva medida
3. Escribe la fórmula
4. Presiona Enter

### 🎮 Tip para el Juego

En **Dunder Mifflin**, las medidas más usadas son:
- SUM(Tabla[Columna]) - Sumar valores
- AVERAGE(Tabla[Columna]) - Promedio
- COUNTROWS(Tabla) - Contar filas
- DISTINCTCOUNT(Tabla[Columna]) - Contar valores únicos
    `,
    officialLink: 'https://learn.microsoft.com/es-es/dax/dax-overview',
    gameRelevance: ['office', 'stark', 'datarescue'],
    imageId: 'dax-intro'
  },
  {
    id: 'sum-average-count',
    categoryId: 'modeling',
    title: 'SUM, AVERAGE, COUNT',
    duration: '8 min',
    level: 'Principiante',
    description: 'Las 3 funciones que usarás el 80% del tiempo.',
    content: `
### Las Funciones Básicas

**SUM** - Suma todos los valores
TotalVentas = SUM(Sales[Amount])

**AVERAGE** - Calcula el promedio
TicketPromedio = AVERAGE(Sales[Amount])

**COUNT** - Cuenta celdas con números
TransaccionesConMonto = COUNT(Sales[Amount])

**COUNTROWS** - Cuenta filas de una tabla
TotalTransacciones = COUNTROWS(Sales)

**DISTINCTCOUNT** - Cuenta valores únicos
ClientesUnicos = DISTINCTCOUNT(Sales[ClienteID])

### 🎮 Respuestas del Juego

**Dunder Mifflin Misión 1:**
Total filas = COUNTROWS(Sales) → Debería dar 500

**Dunder Mifflin Misión 2:**
TicketPromedio = AVERAGE(Sales[Amount]) → Aproximadamente $1,695

**DataRescue Misión 5:**
ClientesUnicos = DISTINCTCOUNT(Tabla[CLIENTE_LIMPIO]) → Varía según dataset
    `,
    officialLink: 'https://learn.microsoft.com/es-es/dax/sum-function-dax',
    gameRelevance: ['office', 'datarescue'],
    imageId: 'sum-agg'
  },
  {
    id: 'calculate-filter',
    categoryId: 'modeling',
    title: 'CALCULATE: El Rey del DAX',
    duration: '15 min',
    level: 'Intermedio',
    description: 'La función más poderosa que debes dominar.',
    content: `
### ¿Qué hace CALCULATE?

CALCULATE evalúa una expresión en un **contexto de filtro modificado**.

En español: "Calcula esto, PERO solo para estos datos filtrados".

### Sintaxis

CALCULATE(
    <expresión>,
    <filtro1>,
    <filtro2>...
)

### Ejemplos Prácticos

**Ventas de un vendedor específico:**
VentasDwight = CALCULATE(
    SUM(Sales[Amount]),
    Sales[Salesperson] = "Dwight Schrute"
)

**Ventas del año actual:**
VentasEsteAño = CALCULATE(
    SUM(Sales[Amount]),
    YEAR(Sales[Fecha]) = YEAR(TODAY())
)

### 🎮 Tip para Dunder Mifflin Misión 3

La misión te pide comparar ventas de Dwight vs Jim:

VentasDwight = CALCULATE([TotalVentas], Sales[Salesperson] = "Dwight Schrute")
VentasJim = CALCULATE([TotalVentas], Sales[Salesperson] = "Jim Halpert")
DiferenciaDJ = [VentasDwight] - [VentasJim]

La diferencia debería ser aproximadamente $15,400 a favor de Dwight.
    `,
    officialLink: 'https://learn.microsoft.com/es-es/dax/calculate-function-dax',
    gameRelevance: ['office', 'stark'],
    imageId: 'calculate'
  },
  {
    id: 'if-switch',
    categoryId: 'modeling',
    title: 'IF, AND, OR, SWITCH',
    duration: '10 min',
    level: 'Intermedio',
    description: 'Lógica condicional para clasificar datos.',
    content: `
### IF - Condición Simple

Clasificacion = IF(
    [Ventas] > 10000,
    "Alto",
    "Bajo"
)

### IF Anidado (múltiples niveles)

Categoria = IF(
    [Ventas] > 50000, "Oro",
    IF([Ventas] > 20000, "Plata", "Bronce")
)

### AND / OR - Múltiples condiciones

// Ambas deben ser verdaderas
Revisar = IF(
    AND([Peso] > 1000, [Ganancia] < 1000),
    "Revisar",
    "OK"
)

// Al menos una debe ser verdadera
Alerta = IF(
    OR([Peso] > 1000, [Ganancia] < 1000),
    "Alerta",
    "Normal"
)

### 🎮 Tip para DataRescue Misión 6

La regla de clasificación es: Revisar si (PESO > 1000) O (GANANCIA < 1000)

OperacionesRevisar = CALCULATE(
    COUNTROWS(Tabla),
    OR(Tabla[PESO_LIMPIO] > 1000, Tabla[GANANCIA_LIMPIA] < 1000)
)
    `,
    officialLink: 'https://learn.microsoft.com/es-es/dax/if-function-dax',
    gameRelevance: ['datarescue', 'squid-game']
  },
  {
    id: 'divide-safe',
    categoryId: 'modeling',
    title: 'DIVIDE: División Segura',
    duration: '5 min',
    level: 'Principiante',
    description: 'Evita errores de división por cero.',
    content: `
### El Problema

Si divides por cero, obtienes un error:
Margen = [Ganancia] / [Ventas]  // ¡ERROR si Ventas = 0!

### La Solución: DIVIDE

Margen = DIVIDE([Ganancia], [Ventas], 0)

El tercer parámetro es el valor a retornar si hay división por cero.

### Ejemplos Prácticos

**Porcentaje:**
PorcentajeGanancia = DIVIDE([Ganancia], [Costo], 0) * 100

**Ratio:**
ConversionRate = DIVIDE([Ventas], [Visitas], 0)

### 🎮 Tip para el Juego

En DataRescue, la **Rentabilidad** se calcula como:
Rentabilidad = DIVIDE([GananciaTotal], SUM(Tabla[PRECIO_COSTO]), 0)

Debería dar aproximadamente 0.20 (20%).
    `,
    officialLink: 'https://learn.microsoft.com/es-es/dax/divide-function-dax',
    gameRelevance: ['datarescue', 'office']
  },

  // =========================================================================
  // VISUALIZACIÓN
  // =========================================================================
  {
    id: 'chart-types',
    categoryId: 'viz',
    title: 'Eligiendo el Gráfico Correcto',
    duration: '8 min',
    level: 'Principiante',
    description: 'Cada historia necesita su visualización.',
    content: `
### Guía Rápida de Gráficos

| Quiero mostrar... | Usa... |
|-------------------|--------|
| Un número importante (KPI) | **Tarjeta** |
| Comparar categorías | **Barras** |
| Tendencia en el tiempo | **Líneas** |
| Parte de un todo | **Donut/Pie** |
| Distribución | **Histograma** |
| Ubicaciones | **Mapa** |
| Ranking | **Barras ordenadas** |
| Múltiples métricas | **Tabla/Matriz** |

### Reglas de Oro

1. **Menos es más**: No satures con gráficos
2. **Un gráfico = una historia**: No mezcles conceptos
3. **Títulos claros**: "Ventas por Región" no "Gráfico 1"
4. **Colores con propósito**: Resalta lo importante

### 🎮 Tip para las Misiones

- **Tarjetas (Card)**: Úsalas para mostrar tus medidas finales (la respuesta que verificará el juego)
- **Barras**: Para comparar vendedores en Dunder Mifflin
- **Líneas**: Para ver tendencias mensuales
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a',
    gameRelevance: ['office', 'stark', 'datarescue'],
    imageId: 'chart-gallery'
  },
  {
    id: 'card-kpi',
    categoryId: 'viz',
    title: 'Tarjetas y KPIs',
    duration: '5 min',
    level: 'Principiante',
    description: 'Resalta tus números más importantes.',
    content: `
### La Tarjeta (Card)

Es el visual más simple pero crucial. Muestra **un solo número**.

**Cómo crearla:**
1. Click en el ícono de Tarjeta en Visualizaciones
2. Arrastra tu medida al campo "Campos"
3. ¡Listo!

### Formato de Tarjeta

- **Categoría de datos** → Unidades (miles, millones)
- **Etiqueta de categoría** → Muestra u oculta el nombre
- **Título** → Personaliza el encabezado

### KPI Visual

Para mostrar un número **con comparación**:
1. Usa el visual "KPI"
2. Campo Indicador: Tu medida actual
3. Campo Objetivo: La meta
4. Eje de tendencia (opcional): Para mostrar evolución

### 🎮 Tip para Validar Misiones

El juego te pide valores específicos. Usa una **Tarjeta** para mostrar tu respuesta:

1. Crea tu medida (ej: GananciaTotal = SUM(Tabla[GANANCIA_LIMPIA]))
2. Agrega una Tarjeta al reporte
3. Arrastra la medida a la tarjeta
4. Verifica que el número coincida con lo esperado
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-card',
    gameRelevance: ['office', 'datarescue', 'stark'],
    imageId: 'kpi-card'
  },
  {
    id: 'filters-slicers',
    categoryId: 'viz',
    title: 'Filtros y Segmentadores',
    duration: '8 min',
    level: 'Principiante',
    description: 'Deja que el usuario explore los datos.',
    content: `
### Tipos de Filtros

1. **Filtros de Visual**: Afectan solo un gráfico
2. **Filtros de Página**: Afectan toda la página
3. **Filtros de Reporte**: Afectan todas las páginas

### Segmentador (Slicer)

Es un **filtro visual** que el usuario puede manipular.

**Cómo crearlo:**
1. Selecciona el ícono de Segmentador
2. Arrastra un campo (ej: Categoría, Fecha, Región)
3. El usuario puede hacer click para filtrar

### Estilos de Segmentador

- **Lista**: Múltiples opciones clickeables
- **Dropdown**: Menú desplegable (ahorra espacio)
- **Entre**: Para rangos de fechas o números
- **Menor/Mayor que**: Para valores mínimos/máximos

### 🎮 Tip Práctico

En Dunder Mifflin Misión 3, usa un segmentador de **Mes** para ver en qué mes Jim superó a Dwight.

**Respuesta:** Febrero 🎯
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-slicers',
    gameRelevance: ['office', 'stark'],
    imageId: 'slicers'
  },

  // =========================================================================
  // TIPS DEL JUEGO
  // =========================================================================
  {
    id: 'game-workflow',
    categoryId: 'tips',
    title: 'Flujo de Trabajo del Juego',
    duration: '5 min',
    level: 'Principiante',
    description: 'Cómo completar misiones eficientemente.',
    content: `
### El Proceso para Cada Misión

1. **Lee los objetivos** antes de descargar el dataset
2. **Descarga el CSV** desde el botón de descarga
3. **Abre Power BI Desktop**
4. **Importa el CSV** (Inicio → Obtener datos → Texto/CSV)
5. **Limpia en Power Query** si es necesario
6. **Crea las medidas DAX** que te piden
7. **Agrega visualizaciones** para verificar resultados
8. **Valida tu respuesta** en el juego

### Atajos de Teclado Útiles

| Atajo | Acción |
|-------|--------|
| Ctrl + S | Guardar |
| Ctrl + Z | Deshacer |
| Ctrl + Enter | Confirmar medida DAX |
| F5 | Actualizar datos |
| Ctrl + C → Ctrl + V | Copiar visualización |

### 🎮 Tip Pro

Guarda tu archivo .pbix con el nombre de la misión (ej: "DataRescue-Mision1.pbix"). Así puedes volver a consultarlo después.
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/fundamentals/desktop-getting-started',
    gameRelevance: ['datarescue', 'office', 'stark', 'squid-game', 'hogwarts']
  },
  {
    id: 'datarescue-survival',
    categoryId: 'tips',
    title: 'Guía de Supervivencia DataRescue',
    duration: '10 min',
    level: 'Intermedio',
    description: 'Cómo vencer a Corruptex.',
    content: `
### Los Ataques de Corruptex

El villano usa estas tácticas de corrupción:

| Ataque | Ejemplo | Solución |
|--------|---------|----------|
| **Nulos** | Celdas vacías | Reemplazar con cálculo |
| **Texto en números** | "1234.5 kg" | Extraer solo el número |
| **Formato contable** | "(1234)" = negativo | Reemplazar paréntesis |
| **Duplicados** | Filas repetidas | DISTINCTCOUNT |
| **Typos** | "ALUMIMUNDOO" | Normalizar texto |
| **Outliers** | Peso de 50,000 kg | Filtrar con umbral |

### Fórmulas de Rescate

**Misión 1 - Ganancia:**
GANANCIA_LIMPIA = if [GANANCIA] = null then [PRECIO_VENTA] - [PRECIO_COSTO] else [GANANCIA]

**Misión 2 - Peso (quitar "kg"):**
Usar: Columna a partir de ejemplos
O: Text.BeforeDelimiter([PESO_KG], " ")

**Misión 5 - Normalizar cliente:**
CLIENTE_LIMPIO = Text.Upper(Text.Trim(Text.Clean([CLIENTE])))

### Tip Final

Si un valor no se convierte a número, probablemente tiene **espacios invisibles** o **caracteres especiales**. Usa Text.Clean() primero.
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-query/best-practices',
    gameRelevance: ['datarescue']
  },
  {
    id: 'common-mistakes',
    categoryId: 'tips',
    title: 'Errores Comunes (y cómo evitarlos)',
    duration: '8 min',
    level: 'Principiante',
    description: 'No caigas en estas trampas.',
    content: `
### Error 1: Olvidar "Cerrar y aplicar"

Después de transformar en Power Query, **debes hacer click en "Cerrar y aplicar"** o los cambios no se guardan.

### Error 2: Tipo de dato incorrecto

Si una columna de números aparece como "ABC", cambia el tipo:
- En Power Query: Click derecho → Tipo → Número decimal

### Error 3: Usar columna en lugar de medida

❌ Incorrecto: Arrastrar Sales[Amount] directamente
✅ Correcto: Crear medida TotalVentas = SUM(Sales[Amount])

### Error 4: Dividir por cero

❌ Ratio = [A] / [B]
✅ Ratio = DIVIDE([A], [B], 0)

### Error 5: No verificar la respuesta

Siempre usa una **Tarjeta (Card)** para ver el valor exacto de tu medida antes de validar en el juego.

### Error 6: Confundir COUNT vs COUNTROWS

- COUNT(Tabla[Columna]) = cuenta celdas NO vacías de esa columna
- COUNTROWS(Tabla) = cuenta TODAS las filas de la tabla
    `,
    officialLink: 'https://learn.microsoft.com/es-es/power-bi/guidance/star-schema',
    gameRelevance: ['office', 'datarescue', 'stark']
  },
  {
    id: 'formula-cheatsheet',
    categoryId: 'tips',
    title: 'Cheatsheet de Fórmulas DAX',
    duration: '5 min',
    level: 'Todos',
    description: 'Copia y pega para las misiones.',
    content: `
### Agregaciones Básicas

TotalVentas = SUM(Tabla[Columna])
Promedio = AVERAGE(Tabla[Columna])
Maximo = MAX(Tabla[Columna])
Minimo = MIN(Tabla[Columna])
Conteo = COUNTROWS(Tabla)
Unicos = DISTINCTCOUNT(Tabla[Columna])

### Filtrado con CALCULATE

VentasFiltradas = CALCULATE(
    SUM(Tabla[Ventas]),
    Tabla[Region] = "Norte"
)

### Condicionales

Clasificacion = IF([Valor] > 100, "Alto", "Bajo")

ConOR = IF(OR([A] > 10, [B] < 5), "Sí", "No")

ConAND = IF(AND([A] > 10, [B] > 5), "Sí", "No")

### División Segura

Ratio = DIVIDE([Numerador], [Denominador], 0)
Porcentaje = DIVIDE([Parte], [Total], 0) * 100

### Power Query (M)

// Reemplazar nulos
= if [Columna] = null then 0 else [Columna]

// Limpiar texto
= Text.Upper(Text.Trim([Columna]))

// Extraer número de texto
= Number.From(Text.BeforeDelimiter([Columna], " "))
    `,
    officialLink: 'https://learn.microsoft.com/es-es/dax/dax-function-reference',
    gameRelevance: ['office', 'datarescue', 'stark', 'squid-game', 'hogwarts']
  },
  {
    id: 'quick-wins',
    categoryId: 'tips',
    title: 'Victorias Rápidas',
    duration: '3 min',
    level: 'Principiante',
    description: 'Gana XP fácil con estos tips.',
    content: `
### Misiones Fáciles para Empezar

1. **Dunder Mifflin Cap. 1**: Solo importar y contar filas
2. **Dunder Mifflin Cap. 2**: SUM y AVERAGE básicos
3. **DataRescue Cap. 1**: Recuperar GANANCIA con fórmula simple

### Ganar XP Extra

- **Racha diaria**: Juega al menos 1 misión por día
- **Logros**: Revisa la sección de logros para objetivos ocultos
- **Repetir misiones**: Puedes repetir para practicar

### Desbloquear Mundos

- Los mundos se desbloquean con **monedas**
- Las primeras 2 misiones de Office dan 150 monedas
- El costo de desbloqueo es 100 monedas

### Nivel y XP

- Cada 400 XP subes de nivel
- Los niveles desbloquean misiones más avanzadas
- Office 1 + 2 = 450 XP → ¡Ya eres nivel 2!

### Orden Recomendado

1. **Dunder Mifflin** (Office) - Fundamentos
2. **DataRescue HQ** - Limpieza de datos
3. **Stark Industries** - Análisis avanzado
4. **Squid Game** - Estadísticas y probabilidad
5. **Gringotts** - Maestría total
    `,
    officialLink: 'https://learn.microsoft.com/es-es/training/paths/get-started-power-bi/',
    gameRelevance: ['office', 'datarescue', 'stark', 'squid-game', 'hogwarts']
  }
];
