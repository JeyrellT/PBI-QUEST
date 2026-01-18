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
    id: 'advanced-tips',
    title: 'Tips Avanzados',
    icon: '🚀',
    description: 'Buenas prácticas pro (junior → senior).',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
  },
  {
    id: 'videos',
    title: 'Videos',
    icon: '🎬',
    description: 'Tutoriales en video de YouTube.',
    gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)'
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
    relatedLessons: ['pbi-interface', 'first-report', 'video-pbi-estrategia', 'get-data'],
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

### Diferencias con Excel

| Característica | Excel | Power BI |
|----------------|-------|----------|
| **Límite de filas** | ~1 millón | Millones sin problema |
| **Actualización** | Manual (copiar/pegar) | Automática con un click |
| **Interactividad** | Limitada | Filtrado cruzado dinámico |
| **Colaboración** | Enviar archivo | Publicar dashboard en web |

### 🎮 Tip para el Juego

En DataRescue HQ y otros mundos, trabajarás principalmente con **Power BI Desktop**. Asegúrate de tenerlo instalado antes de comenzar las misiones.

**Descarga gratuita:** https://powerbi.microsoft.com/es-es/desktop/

📺 **Aprende más:** Mira el video "La Propuesta de Valor de Power BI frente a Excel" en la sección de Videos.
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
    relatedLessons: ['pbi-intro', 'first-report', 'get-data', 'power-query-basics'],
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

### Atajos de Teclado Esenciales

| Atajo | Acción |
|-------|--------|
| Ctrl + Enter | Ejecutar medida DAX |
| Ctrl + S | Guardar archivo |
| F5 | Actualizar datos |
| Ctrl + Z | Deshacer |
| Delete | Eliminar elemento seleccionado |

### 🎮 Tip para el Juego

En las misiones de **Dunder Mifflin**, usarás principalmente la **Vista de Reporte** para crear gráficos. En **DataRescue HQ**, pasarás mucho tiempo en **Power Query** (Transformar datos) limpiando corrupción.

📚 **Siguiente paso:** Aprende a crear tu primer reporte en la lección "Tu Primer Reporte en 5 Pasos".
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
    relatedLessons: ['pbi-intro', 'pbi-interface', 'get-data', 'dax-intro', 'chart-types', 'video-etl-conectores'],
    content: `
### El Flujo Completo

**Paso 1: Obtener Datos**
- Inicio → Obtener datos → Excel (o CSV)
- Selecciona tu archivo y las tablas
- Power BI soporta más de 100 conectores diferentes

**Paso 2: Revisar en Power Query**
- Click en "Transformar datos" para abrir Power Query
- Verifica que los tipos de datos sean correctos
- Elimina columnas innecesarias para optimizar
- Cierra y aplica cuando termines

**Paso 3: Crear una Medida**
- En la pestaña Modelado → Nueva medida
- Escribe: TotalVentas = SUM(Ventas[Monto])
- Presiona Enter o Ctrl+Enter para confirmar

**Paso 4: Agregar Visualización**
- Arrastra la medida al lienzo
- Selecciona el tipo de gráfico en el panel de Visualizaciones
- Usa una Tarjeta (Card) para mostrar un solo número

**Paso 5: Guardar**
- Ctrl + S → Guarda como .pbix
- Nombra el archivo de forma descriptiva (ej: "Ventas-Enero-2024.pbix")

### 🎮 Tip para el Juego

Este flujo exacto es lo que harás en la **Misión 1 de Dunder Mifflin**. La medida COUNTROWS(Tabla) te dará el total de filas para verificar que importaste todo correctamente.

📺 **Video recomendado:** "Dominando la Ingesta y Transformación de Datos" explica este proceso en detalle.
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
    relatedLessons: ['power-query-basics', 'first-report', 'video-etl-conectores', 'pbi-intro'],
    content: `
### Fuentes Más Comunes

Power BI puede conectarse a **más de 100 fuentes** diferentes. Las más usadas:

- **Excel** (.xlsx): El más común en empresas
- **CSV/Texto**: Archivos delimitados por comas o tabuladores
- **SQL Server**: Bases de datos empresariales
- **Web**: APIs y páginas web
- **Carpeta**: Múltiples archivos a la vez
- **SharePoint**: Archivos en la nube de Microsoft
- **Azure**: Servicios en la nube

### Importar vs DirectQuery

| Método | Cuándo Usarlo | Ventajas | Desventajas |
|--------|--------------|----------|-------------|
| **Importar** | Archivos pequeños/medianos | Muy rápido | Datos pueden estar desactualizados |
| **DirectQuery** | Datos masivos en tiempo real | Siempre actualizado | Más lento, depende de conexión |

### El Concepto del "Puente Vivo"

Power BI no solo copia los datos - crea un **puente** con la fuente:
- Si el archivo Excel origen cambia, solo necesitas "Actualizar" (F5)
- No tienes que reconstruir el reporte cada vez
- Garantiza la **integridad de los datos**

### 🎮 Tip para el Juego

Para las misiones de **DataRescue HQ**, siempre usarás **Importar**. Los datasets del juego son CSV que descargas y cargas en Power BI.

**Atajo:** Arrastra un archivo CSV directamente a Power BI Desktop para importarlo.

📺 **Video relacionado:** "Dominando la Ingesta y Transformación de Datos (ETL)" explica todos los conectores.
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
    relatedLessons: ['get-data', 'column-from-examples', 'handle-errors', 'datarescue-survival', 'video-etl-conectores'],
    content: `
### ¿Qué es Power Query?

Es el **motor de transformación** de Power BI. Aquí limpias, filtras y preparas tus datos ANTES de analizarlos. Funciona como una "aduana" que decide qué datos entran y en qué formato.

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
| Filtrar valores | Click en flecha del encabezado → Filtros |
| Mayúsculas/Minúsculas | Transformar → Formato → MAYÚSCULAS |

### Pasos Aplicados: Tu Historial de Cambios

El panel **"Pasos aplicados"** (derecha) te muestra todo lo que has hecho:
- Puedes hacer click en cualquier paso para volver atrás
- Puedes eliminar un paso con la X
- El orden de los pasos importa
- Es como un historial de "deshacer" permanente

### 🎮 Tip para DataRescue HQ

En las misiones de DataRescue, el villano **Corruptex** ha inyectado:
- **Nulos**: Usa "Reemplazar valores" para llenarlos
- **Texto en números**: Usa "Tipo" → Número decimal
- **Formatos raros** como "(1234)": Usa "Reemplazar valores" para quitar paréntesis

📚 **Aprende más:** Ve las lecciones "Columna desde Ejemplos" y "Manejo de Errores" para técnicas avanzadas.
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
    relatedLessons: ['power-query-basics', 'handle-errors', 'datarescue-survival'],
    content: `
### La Función Más Mágica de Power Query

¿Tienes una columna como "Juan Pérez" y quieres solo el nombre?

1. Selecciona la columna
2. **Agregar columna → Columna a partir de ejemplos**
3. En la primera fila, escribe "Juan"
4. Power BI **adivina** el patrón y lo aplica a todas las filas

### Funciona Para

- **Extraer partes de texto:** "Juan Pérez" → "Juan"
- **Combinar columnas:** "Juan" + "Pérez" → "Juan Pérez"
- **Formatear fechas:** "2024-01-15" → "15 de Enero, 2024"
- **Quitar caracteres:** "1234.5 kg" → "1234.5"
- **Extraer dominios:** "usuario@empresa.com" → "empresa.com"

### Cómo Usarlo Efectivamente

1. Proporciona 2-3 ejemplos para mayor precisión
2. Revisa la fórmula M generada (aparece arriba)
3. Verifica algunas filas antes de aplicar
4. Si el patrón no es correcto, corrige un ejemplo más

### 🎮 Tip para el Juego

En DataRescue Misión 2, la columna PESO_KG tiene valores como "1111.6 kg" (con texto). Usa **Columna a partir de ejemplos**:
1. En la primera fila con "1111.6 kg", escribe "1111.6"
2. Power Query creará una columna numérica automáticamente
3. No olvides cambiar el tipo a **Número decimal** después

📚 **Prerequisito:** Conoce primero los "Fundamentos de Power Query" antes de usar esta técnica avanzada.
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
    relatedLessons: ['power-query-basics', 'column-from-examples', 'datarescue-survival', 'common-mistakes'],
    content: `
### Tipos de Problemas

1. **Valores nulos (null)**: Celdas vacías - el dato simplemente no existe
2. **Errores de conversión**: Intentar convertir "abc" a número
3. **Valores inválidos**: Fechas imposibles como 30/02/2024
4. **Espacios invisibles**: Caracteres que no ves pero causan errores
5. **Formatos mixtos**: Una columna con números y texto mezclados

### Soluciones en Power Query

**Para nulos:**
Click derecho → Reemplazar valores
Valor a buscar: null
Reemplazar por: 0 (o lo que corresponda)

**Para errores:**
Click derecho → Reemplazar errores
Reemplazar por: null (o valor por defecto)

**Para espacios invisibles:**
Transformar → Formato → Recortar (Trim)
O usa: Text.Clean([Columna]) para quitar caracteres especiales

**Con código M (avanzado):**
= try [Columna] otherwise 0

### Orden de Operaciones

1. Primero limpia espacios con Text.Trim y Text.Clean
2. Luego reemplaza valores específicos
3. Después cambia el tipo de dato
4. Finalmente crea columnas calculadas

### 🎮 Tip para DataRescue

En la Misión 1, la columna GANANCIA tiene nulos. La fórmula de recuperación es:

GANANCIA = PRECIO_VENTA - PRECIO_COSTO

Crea una columna personalizada en Power Query:
= if [GANANCIA] = null then [PRECIO_VENTA] - [PRECIO_COSTO] else [GANANCIA]

📚 **Ver también:** "Guía de Supervivencia DataRescue" tiene todas las fórmulas para cada tipo de corrupción.
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
    relatedLessons: ['sum-average-count', 'calculate-filter', 'formula-cheatsheet', 'card-kpi'],
    content: `
### ¿Qué es DAX?

DAX (Data Analysis Expressions) es el lenguaje de fórmulas de Power BI. Si conoces Excel, ya tienes ventaja - muchas funciones son similares.

### Medidas vs Columnas Calculadas

| Tipo | Cuándo Usar | Ejemplo | Se calcula... |
|------|------------|---------|---------------|
| **Medida** | Cálculos que cambian con filtros | Total de ventas | Al visualizar |
| **Columna** | Valor fijo por fila | Categoría de precio | Al cargar datos |

**Regla de oro:** Si el valor debe cambiar cuando el usuario filtra, usa una **medida**. Si es un dato fijo por fila, usa **columna calculada**.

### Tu Primera Medida

TotalVentas = SUM(Ventas[Monto])

**Cómo crearla:**
1. Click en la tabla en el panel de Campos
2. Modelado → Nueva medida
3. Escribe la fórmula
4. Presiona Enter (o Ctrl+Enter)

### Sintaxis Básica

Tabla[Columna] ← Siempre necesitas especificar la tabla y columna

- ✅ Correcto: SUM(Sales[Amount])
- ❌ Incorrecto: SUM(Amount)

### 🎮 Tip para el Juego

En **Dunder Mifflin**, las medidas más usadas son:
- SUM(Tabla[Columna]) - Sumar valores
- AVERAGE(Tabla[Columna]) - Promedio
- COUNTROWS(Tabla) - Contar filas
- DISTINCTCOUNT(Tabla[Columna]) - Contar valores únicos

📚 **Siguiente paso:** Aprende las funciones básicas en "SUM, AVERAGE, COUNT" y luego domina "CALCULATE: El Rey del DAX".
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
    relatedLessons: ['dax-intro', 'calculate-filter', 'divide-safe', 'card-kpi', 'common-mistakes'],
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

### Diferencia Importante: COUNT vs COUNTROWS

| Función | Qué cuenta | Ignora nulos |
|---------|------------|--------------|
| COUNT(Tabla[Columna]) | Celdas con números en esa columna | Sí |
| COUNTROWS(Tabla) | TODAS las filas de la tabla | No |

**Ejemplo:** Si tienes 100 filas pero 5 tienen el monto vacío:
- COUNTROWS(Sales) = 100
- COUNT(Sales[Amount]) = 95

### MIN y MAX

Minimo = MIN(Sales[Amount])
Maximo = MAX(Sales[Amount])

### 🎮 Respuestas del Juego

**Dunder Mifflin Misión 1:**
Total filas = COUNTROWS(Sales) → Debería dar 500

**Dunder Mifflin Misión 2:**
TicketPromedio = AVERAGE(Sales[Amount]) → Aproximadamente $1,695

**DataRescue Misión 5:**
ClientesUnicos = DISTINCTCOUNT(Tabla[CLIENTE_LIMPIO]) → Varía según dataset

📚 **Para filtrar estos cálculos:** Aprende CALCULATE para calcular solo para ciertos vendedores o fechas.
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
    relatedLessons: ['dax-intro', 'sum-average-count', 'if-switch', 'filters-slicers'],
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

**Múltiples filtros (AND implícito):**
VentasDwightEnero = CALCULATE(
    SUM(Sales[Amount]),
    Sales[Salesperson] = "Dwight Schrute",
    MONTH(Sales[Fecha]) = 1
)

### CALCULATE vs Filtros Visuales

| Método | Cuándo usar |
|--------|-------------|
| **Filtro visual** | El usuario elige qué ver |
| **CALCULATE** | Siempre quieres ese filtro específico |

**Ejemplo:** Un gráfico con filtro de mes permite al usuario elegir. Una medida con CALCULATE siempre mostrará Dwight sin importar los filtros.

### 🎮 Tip para Dunder Mifflin Misión 3

La misión te pide comparar ventas de Dwight vs Jim:

VentasDwight = CALCULATE([TotalVentas], Sales[Salesperson] = "Dwight Schrute")
VentasJim = CALCULATE([TotalVentas], Sales[Salesperson] = "Jim Halpert")
DiferenciaDJ = [VentasDwight] - [VentasJim]

La diferencia debería ser aproximadamente $15,400 a favor de Dwight.

📚 **Prerequisito:** Asegúrate de entender SUM/AVERAGE/COUNT antes de aprender CALCULATE.
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
    relatedLessons: ['dax-intro', 'calculate-filter', 'divide-safe'],
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

### SWITCH - Alternativa Más Limpia

En lugar de muchos IF anidados, usa SWITCH:

Categoria = SWITCH(
    TRUE(),
    [Ventas] > 50000, "Oro",
    [Ventas] > 20000, "Plata",
    [Ventas] > 5000, "Bronce",
    "Sin categoría"
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

### Comparación IF vs SWITCH

| Escenario | Usar |
|-----------|------|
| 1-2 condiciones simples | IF |
| Múltiples rangos o categorías | SWITCH |
| Valores exactos a comparar | SWITCH |

### 🎮 Tip para DataRescue Misión 6

La regla de clasificación es: Revisar si (PESO > 1000) O (GANANCIA < 1000)

OperacionesRevisar = CALCULATE(
    COUNTROWS(Tabla),
    OR(Tabla[PESO_LIMPIO] > 1000, Tabla[GANANCIA_LIMPIA] < 1000)
)

📚 **Ver también:** Combina IF con CALCULATE para filtros condicionales poderosos.
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
    relatedLessons: ['sum-average-count', 'common-mistakes', 'dax-intro'],
    content: `
### El Problema

Si divides por cero, obtienes un error:
Margen = [Ganancia] / [Ventas]  // ¡ERROR si Ventas = 0!

### La Solución: DIVIDE

Margen = DIVIDE([Ganancia], [Ventas], 0)

El tercer parámetro es el valor a retornar si hay división por cero.

### ¿Por qué es importante?

En datos reales, siempre hay casos donde el denominador es cero:
- Productos sin ventas
- Clientes nuevos sin historial
- Meses sin transacciones

Si no usas DIVIDE, tu reporte mostrará errores feos.

### Ejemplos Prácticos

**Porcentaje:**
PorcentajeGanancia = DIVIDE([Ganancia], [Costo], 0) * 100

**Ratio:**
ConversionRate = DIVIDE([Ventas], [Visitas], 0)

**Crecimiento porcentual:**
Crecimiento = DIVIDE([VentasActual] - [VentasAnterior], [VentasAnterior], 0) * 100

### 🎮 Tip para el Juego

En DataRescue, la **Rentabilidad** se calcula como:
Rentabilidad = DIVIDE([GananciaTotal], SUM(Tabla[PRECIO_COSTO]), 0)

Debería dar aproximadamente 0.20 (20%).

📚 **Error común:** Ver "Errores Comunes" para más sobre división por cero.
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
    relatedLessons: ['card-kpi', 'filters-slicers', 'first-report'],
    content: `
### Guía Rápida de Gráficos

| Quiero mostrar... | Usa... | Ejemplo |
|-------------------|--------|---------|
| Un número importante (KPI) | **Tarjeta** | Total de ventas |
| Comparar categorías | **Barras** | Ventas por vendedor |
| Tendencia en el tiempo | **Líneas** | Ventas mensuales |
| Parte de un todo | **Donut/Pie** | % por región |
| Distribución | **Histograma** | Rango de precios |
| Ubicaciones | **Mapa** | Ventas por ciudad |
| Ranking | **Barras ordenadas** | Top 10 productos |
| Múltiples métricas | **Tabla/Matriz** | Detalle por cliente |
| Progreso hacia meta | **Medidor (Gauge)** | % de objetivo |
| Valor vs objetivo | **KPI Visual** | Meta mensual |

### Reglas de Oro

1. **Menos es más**: Máximo 5-6 visuales por página
2. **Un gráfico = una historia**: No mezcles conceptos diferentes
3. **Títulos claros**: "Ventas por Región Q1 2024" no "Gráfico 1"
4. **Colores con propósito**: Usa color para resaltar, no decorar
5. **Jerarquía visual**: Lo más importante arriba y a la izquierda

### Errores a Evitar

❌ Gráficos de pie con más de 5 categorías
❌ Efectos 3D (distorsionan la percepción)
❌ Colores aleatorios sin significado
❌ Ejes truncados que exageran diferencias

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
    relatedLessons: ['chart-types', 'dax-intro', 'sum-average-count', 'first-report'],
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
- **Color de fondo** → Hazla destacar en el dashboard
- **Tamaño de fuente** → Ajusta para legibilidad

### Multi-Row Card (Tarjeta Multi-fila)

Para mostrar **varios KPIs** en un solo visual:
1. Usa "Multi-row Card" del panel de visualizaciones
2. Arrastra múltiples medidas
3. Cada medida aparece en su propia fila

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

📚 **Prerequisito:** Asegúrate de saber crear medidas DAX antes de usar tarjetas.
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
    relatedLessons: ['chart-types', 'calculate-filter', 'pbi-interface'],
    content: `
### Tipos de Filtros

| Tipo | Alcance | Dónde configurar |
|------|---------|------------------|
| **Filtros de Visual** | Solo un gráfico | Panel de Filtros → Filtros en este visual |
| **Filtros de Página** | Toda la página | Panel de Filtros → Filtros en esta página |
| **Filtros de Reporte** | Todas las páginas | Panel de Filtros → Filtros en todas las páginas |

### Segmentador (Slicer)

Es un **filtro visual** que el usuario puede manipular.

**Cómo crearlo:**
1. Selecciona el ícono de Segmentador
2. Arrastra un campo (ej: Categoría, Fecha, Región)
3. El usuario puede hacer click para filtrar

### Estilos de Segmentador

| Estilo | Mejor para | Cómo activar |
|--------|------------|--------------|
| **Lista** | Pocas opciones | Por defecto |
| **Dropdown** | Muchas opciones | Formato → Configuración del segmentador |
| **Entre** | Rangos de fechas | Automático con fechas |
| **Menor/Mayor que** | Filtros numéricos | Formato → Configuración |

### Sincronizar Segmentadores

Si tienes el mismo segmentador en varias páginas:
1. Vista → Sincronizar segmentadores
2. Selecciona en qué páginas aplica
3. El usuario filtra una vez, afecta todas las páginas

### 🎮 Tip Práctico

En Dunder Mifflin Misión 3, usa un segmentador de **Mes** para ver en qué mes Jim superó a Dwight.

**Respuesta:** Febrero 🎯

📚 **Ver también:** CALCULATE hace lo mismo que un filtro pero en código DAX.
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
    relatedLessons: ['first-report', 'get-data', 'power-query-basics', 'quick-wins'],
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
| Delete | Eliminar elemento |
| Ctrl + A | Seleccionar todo |

### Organización Recomendada

Crea una carpeta para cada mundo:
- 📁 DunderMifflin/
  - Mision1.pbix
  - Mision2.pbix
  - datasets/
- 📁 DataRescue/
  - ...

### 🎮 Tip Pro

Guarda tu archivo .pbix con el nombre de la misión (ej: "DataRescue-Mision1.pbix"). Así puedes volver a consultarlo después.

📚 **Para empezar rápido:** Ve "Victorias Rápidas" para saber qué misiones completar primero.
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
    relatedLessons: ['power-query-basics', 'handle-errors', 'column-from-examples', 'formula-cheatsheet'],
    content: `
### Los Ataques de Corruptex

El villano usa estas tácticas de corrupción:

| Ataque | Ejemplo | Solución | Lección relacionada |
|--------|---------|----------|---------------------|
| **Nulos** | Celdas vacías | Reemplazar con cálculo | Manejar Errores y Nulos |
| **Texto en números** | "1234.5 kg" | Extraer solo el número | Columna de Ejemplos |
| **Formato contable** | "(1234)" = negativo | Reemplazar paréntesis | Power Query Básico |
| **Duplicados** | Filas repetidas | DISTINCTCOUNT | SUM, AVERAGE, COUNT |
| **Typos** | "ALUMIMUNDOO" | Normalizar texto | Power Query Básico |
| **Outliers** | Peso de 50,000 kg | Filtrar con umbral | Power Query Básico |

### Fórmulas de Rescate

**Misión 1 - Ganancia:**
GANANCIA_LIMPIA = if [GANANCIA] = null then [PRECIO_VENTA] - [PRECIO_COSTO] else [GANANCIA]

**Misión 2 - Peso (quitar "kg"):**
Usar: Columna a partir de ejemplos
O: Text.BeforeDelimiter([PESO_KG], " ")

**Misión 3 - Convertir formato contable:**
= if Text.StartsWith([VALOR], "(") then -Number.From(Text.BetweenDelimiters([VALOR], "(", ")")) else Number.From([VALOR])

**Misión 5 - Normalizar cliente:**
CLIENTE_LIMPIO = Text.Upper(Text.Trim(Text.Clean([CLIENTE])))

### Orden de Limpieza Recomendado

1. Text.Clean() - Quita caracteres invisibles
2. Text.Trim() - Quita espacios al inicio/final
3. Reemplazar valores específicos
4. Cambiar tipo de dato
5. Crear columnas calculadas

### Tip Final

Si un valor no se convierte a número, probablemente tiene **espacios invisibles** o **caracteres especiales**. Usa Text.Clean() primero.

📚 **Recursos:** Ve el "Cheatsheet de Fórmulas DAX" para copiar y pegar fórmulas.
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
    relatedLessons: ['power-query-basics', 'dax-intro', 'divide-safe', 'sum-average-count', 'card-kpi'],
    content: `
### Error 1: Olvidar "Cerrar y aplicar"

Después de transformar en Power Query, **debes hacer click en "Cerrar y aplicar"** o los cambios no se guardan.

✅ **Solución:** Siempre verifica que el botón diga "Cerrar y aplicar" antes de salir de Power Query.

### Error 2: Tipo de dato incorrecto

Si una columna de números aparece como "ABC", cambia el tipo:
- En Power Query: Click derecho → Tipo → Número decimal

✅ **Solución:** Revisa los íconos en los encabezados de columna (123 = número, ABC = texto).

### Error 3: Usar columna en lugar de medida

❌ Incorrecto: Arrastrar Sales[Amount] directamente
✅ Correcto: Crear medida TotalVentas = SUM(Sales[Amount])

**¿Por qué?** Las columnas suman por defecto, pero una medida te da control total.

### Error 4: Dividir por cero

❌ Ratio = [A] / [B]
✅ Ratio = DIVIDE([A], [B], 0)

📚 **Aprende más:** Ve la lección "DIVIDE: División Segura".

### Error 5: No verificar la respuesta

Siempre usa una **Tarjeta (Card)** para ver el valor exacto de tu medida antes de validar en el juego.

📚 **Aprende más:** Ve la lección "Tarjetas y KPIs".

### Error 6: Confundir COUNT vs COUNTROWS

- COUNT(Tabla[Columna]) = cuenta celdas NO vacías de esa columna
- COUNTROWS(Tabla) = cuenta TODAS las filas de la tabla

📚 **Aprende más:** Ve la lección "SUM, AVERAGE, COUNT".

### Error 7: No entender el contexto de filtro

Las medidas se recalculan según los filtros aplicados. Si ves un número diferente al esperado, verifica qué filtros están activos.
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
    relatedLessons: ['dax-intro', 'sum-average-count', 'calculate-filter', 'if-switch', 'divide-safe', 'datarescue-survival'],
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

// Múltiples filtros (AND implícito)
VentasFiltradas = CALCULATE(
    SUM(Tabla[Ventas]),
    Tabla[Region] = "Norte",
    Tabla[Año] = 2024
)

### Condicionales

Clasificacion = IF([Valor] > 100, "Alto", "Bajo")

ConOR = IF(OR([A] > 10, [B] < 5), "Sí", "No")

ConAND = IF(AND([A] > 10, [B] > 5), "Sí", "No")

// SWITCH para múltiples opciones
Categoria = SWITCH(
    TRUE(),
    [Valor] > 1000, "Premium",
    [Valor] > 500, "Standard",
    "Básico"
)

### División Segura

Ratio = DIVIDE([Numerador], [Denominador], 0)
Porcentaje = DIVIDE([Parte], [Total], 0) * 100
Crecimiento = DIVIDE([Actual] - [Anterior], [Anterior], 0) * 100

### Power Query (M)

// Reemplazar nulos
= if [Columna] = null then 0 else [Columna]

// Limpiar texto completamente
= Text.Upper(Text.Trim(Text.Clean([Columna])))

// Extraer número de texto
= Number.From(Text.BeforeDelimiter([Columna], " "))

// Convertir formato contable (1234) a -1234
= if Text.StartsWith([Valor], "(") then 
    -Number.From(Text.BetweenDelimiters([Valor], "(", ")")) 
  else 
    Number.From([Valor])

📚 **Para entender cada fórmula:** Revisa las lecciones correspondientes en la sección de DAX.
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
    relatedLessons: ['game-workflow', 'first-report', 'sum-average-count', 'pbi-intro'],
    content: `
### Misiones Fáciles para Empezar

| Misión | Dificultad | Habilidades | XP |
|--------|------------|-------------|-----|
| Dunder Mifflin 1 | ⭐ | Importar, COUNTROWS | 150 |
| Dunder Mifflin 2 | ⭐ | SUM, AVERAGE | 200 |
| DataRescue 1 | ⭐⭐ | Power Query básico | 200 |

### Ganar XP Extra

- **Racha diaria**: Juega al menos 1 misión por día
- **Logros**: Revisa la sección de logros para objetivos ocultos
- **Repetir misiones**: Puedes repetir para practicar (aunque no da XP extra)
- **Sin errores**: Completar una misión sin respuestas incorrectas da bonus

### Desbloquear Mundos

- Los mundos se desbloquean con **monedas**
- Las primeras 2 misiones de Office dan 150 monedas
- El costo de desbloqueo es 100 monedas

### Nivel y XP

| Nivel | XP Necesario | Total Acumulado |
|-------|--------------|-----------------|
| 1 → 2 | 400 XP | 400 XP |
| 2 → 3 | 400 XP | 800 XP |
| 3 → 4 | 400 XP | 1200 XP |

**Tip:** Office 1 + 2 = 350 XP → ¡Casi nivel 2!

### Orden Recomendado de Mundos

1. **Dunder Mifflin** (Office) - Fundamentos de Power BI
2. **DataRescue HQ** - Limpieza de datos con Power Query
3. **Stark Industries** - Análisis avanzado y CALCULATE
4. **Squid Game** - Estadísticas y probabilidad
5. **Gringotts** - Maestría total

📚 **Antes de empezar:** Revisa "Flujo de Trabajo del Juego" para entender el proceso.
    `,
    officialLink: 'https://learn.microsoft.com/es-es/training/paths/get-started-power-bi/',
    gameRelevance: ['office', 'datarescue', 'stark', 'squid-game', 'hogwarts']
  },

  // =========================================================================
  // TIPS AVANZADOS - Videos Curados
  // =========================================================================
  {
    id: 'adv-star-schema-powerbi-loves',
    categoryId: 'advanced-tips',
    title: 'Modelado en Power BI - Esquema en Estrella',
    duration: 'Video',
    level: 'Avanzado',
    description: 'Modelado senior: por qué el esquema estrella mejora rendimiento, claridad y mantenibilidad.',
    isVideo: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=SHc2ByE4V3I',
    youtubeId: 'SHc2ByE4V3I',
    content: `
### 🎬 Tip Avanzado: Esquema estrella (de verdad)

**Junior:** conecta tablas “como venga”, trae todo, y luego “arregla” con DAX.

**Senior:** diseña el modelo primero. Un **esquema estrella** reduce ambigüedad, mejora el performance y hace que las medidas sean predecibles.

---

### Checklist rápido

- 1 **tabla de hechos** (ventas, eventos) + **dimensiones** (fecha, producto, cliente)
- Dimensiones con **clave única** (sin duplicados)
- Relaciones **1 → * (single direction)** cuando sea posible
- Dimensiones “anchas” (atributos) y hechos “largas” (muchas filas)

---

### Señales de alarma (anti-senior)

- Many-to-many por “resolver rápido”
- Columnas calculadas para resolver lo que era de modelado
- Filtros bidireccionales “porque sí”

📌 Si este video te hace rearmar el modelo, vas por buen camino.
    `,
    officialLink: 'https://www.youtube.com/watch?v=SHc2ByE4V3I',
    gameRelevance: ['stark', 'office']
  },
  {
    id: 'adv-performance-analyzer-review',
    categoryId: 'advanced-tips',
    title: 'Mejora tu reporte con el Analizador de Rendimiento',
    duration: 'Video',
    level: 'Avanzado',
    description: 'Diagnóstico pro: usa Performance Analyzer para encontrar cuellos de botella en visuals y DAX.',
    isVideo: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=QCPZL5sLkBA',
    youtubeId: 'QCPZL5sLkBA',
    content: `
### 🎬 Tip Avanzado: Performance Analyzer (trabaja con evidencia)

**Junior:** “se siente lento”.

**Senior:** mide y separa el problema en 3 causas: **visual**, **DAX query**, **render**.

---

### Qué sacar de este video

- Cómo capturar tiempos por visual
- Cómo identificar visuals “caros” (muchos puntos, demasiados campos)
- Cómo priorizar: arreglar **modelo** primero, luego **DAX**, luego **visual**

---

### Regla práctica

Si un reporte está lento, normalmente no es “un DAX mágico”:
- Modelo con cardinalidad alta + relaciones ambiguas
- Medidas sobre columnas mal tipadas
- Visuals con demasiadas categorías

🎯 Objetivo: pasar de “optimizar a ciegas” a “optimizar con datos”.
    `,
    officialLink: 'https://www.youtube.com/watch?v=QCPZL5sLkBA',
    gameRelevance: ['stark']
  },
  {
    id: 'adv-best-practice-analyzer-tabular-editor',
    categoryId: 'advanced-tips',
    title: 'Best Practice Analyzer en Tabular Editor',
    duration: 'Video',
    level: 'Avanzado',
    description: 'Higiene senior: reglas de BPA para nombres, medidas, relaciones y performance (Tabular Editor).',
    isVideo: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=FnN-piOoMl4',
    youtubeId: 'FnN-piOoMl4',
    content: `
### 🎬 Tip Avanzado: Best Practice Analyzer (BPA)

**Junior:** arregla “cuando duele”.

**Senior:** aplica reglas y estándares desde el día 1.

---

### Qué te da el BPA

- Detección de problemas típicos (nombres, carpetas de display, medidas sin formato)
- Alertas de modelado (relaciones riesgosas, columnas innecesarias)
- Señales de performance (cardinalidad y columnas que no deberían estar)

---

### Estándares que separan junior vs senior

- Convenciones de nombres consistentes (Dim/Fact, prefijos, carpetas)
- Medidas con formato + descripción
- Modelo “delgado”: solo columnas necesarias, el resto se queda en PQ o en el origen

✅ Úsalo como checklist antes de publicar.
    `,
    officialLink: 'https://www.youtube.com/watch?v=FnN-piOoMl4',
    gameRelevance: ['stark', 'hogwarts']
  },
  {
    id: 'adv-relationships-multiple-facts',
    categoryId: 'advanced-tips',
    title: 'Dos Tablas de Hechos y Modelado Estrella',
    duration: 'Video',
    level: 'Avanzado',
    description: 'Modelado con múltiples hechos: evitar relaciones ambiguas y elegir patrones (role-playing dims, bridges).',
    isVideo: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=76UmPVJZn0I',
    youtubeId: '76UmPVJZn0I',
    content: `
### 🎬 Tip Avanzado: Múltiples tablas de hechos (sin caos)

Cuando hay más de un hecho (Ventas, Devoluciones, Inventario), los modelos se vuelven frágiles si conectas “todo con todo”.

---

### Junior vs Senior

**Junior:** activa relaciones bidireccionales y many-to-many para “que funcione”.

**Senior:** elige un patrón explícito:
- Dimensiones compartidas bien diseñadas
- Dimensiones de rol (role-playing: FechaPedido vs FechaEntrega)
- Tablas puente cuando el negocio lo requiere (y sabiendo el costo)

---

### Resultado buscado

- Medidas consistentes
- Filtros que fluyen como esperas
- Menos sorpresas en totales

📌 Si te cuesta explicar “por dónde viaja el filtro”, es una señal para re-diseñar.
    `,
    officialLink: 'https://www.youtube.com/watch?v=76UmPVJZn0I',
    gameRelevance: ['stark']
  },
  {
    id: 'adv-modeling-full-course',
    categoryId: 'advanced-tips',
    title: 'Modelamiento de Datos - Secretos del Modelo Estrella',
    duration: 'Video',
    level: 'Avanzado',
    description: 'Curso completo de modelado: fundamentos + criterios pro para escalar datasets reales.',
    isVideo: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=0XJhzPsvhjc',
    youtubeId: '0XJhzPsvhjc',
    content: `
### 🎬 Ruta Avanzada: Modelado de datos “de producción”

Este video es ideal si quieres pasar de “hacer reportes” a **construir modelos que escalan**.

---

### Qué practicar mientras lo ves

- Identificar hechos vs dimensiones
- Controlar cardinalidad y tipos de datos
- Diseñar relaciones simples y evitar ambigüedad
- Separar ETL (Power Query) vs Semántica (modelo) vs Métricas (medidas)

---

### Mentalidad senior

- El modelo es un **producto**: debe ser entendible por otro analista
- Menos columnas, más medidas
- Nombres y estructura que permiten mantenimiento

🎯 Si mejoras el modelo, mejoras todo lo demás: DAX, performance y UX.
    `,
    officialLink: 'https://www.youtube.com/watch?v=0XJhzPsvhjc',
    gameRelevance: ['stark', 'hogwarts']
  },
  {
    id: 'adv-descriptive-statistics',
    categoryId: 'advanced-tips',
    title: 'Estadística Descriptiva: Min, Max, Desviación Estándar, Promedio',
    duration: 'Video',
    level: 'Avanzado',
    description: 'Análisis avanzado: estadística descriptiva en Power BI para detectar outliers y variabilidad.',
    isVideo: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=tfR-AkVAXas',
    youtubeId: 'tfR-AkVAXas',
    content: `
### 🎬 Tip Avanzado: Estadística Descriptiva en Power BI

**Canal:** Ec. Ricardo Contreras, MBA

Este video muestra cómo implementar medidas estadísticas descriptivas directamente en Power BI usando DAX, esencial para detectar outliers y entender la distribución de tus datos.

---

**Junior:** muestra promedios.

**Senior:** explica dispersión, sesgo y outliers. Un promedio sin contexto puede mentir.

---

### Qué construir en tu reporte

- Media vs Mediana (robustez)
- Desviación estándar (variabilidad)
- Z-score (detección rápida de outliers)

---

### Aplicación práctica

- Ventas: detectar tiendas “anómalas”
- Calidad: alertas por desviación
- Operaciones: tiempos fuera de rango

🎮 Perfecto para el mundo Squid Game: probabilidad y análisis.
    `,
    officialLink: 'https://www.youtube.com/watch?v=tfR-AkVAXas',
    gameRelevance: ['squid-game', 'stark']
  },

  // =========================================================================
  // VIDEOS - Tutoriales de YouTube
  // =========================================================================
  {
    id: 'video-pbi-estrategia',
    categoryId: 'videos',
    title: 'La Propuesta de Valor de Power BI frente a Excel',
    duration: '10 min',
    level: 'Principiante',
    description: 'Una introducción conceptual que explica por qué migrar de hojas de cálculo dispersas a Power BI.',
    isVideo: true,
    youtubeUrl: 'https://youtu.be/4vAYUjvYwus',
    youtubeId: '4vAYUjvYwus',
    relatedLessons: ['pbi-intro', 'video-etl-conectores', 'get-data', 'first-report'],
    content: `
### 🎬 Power BI como Motor de Estrategia de Negocios

Este video funciona como el **"Pitch de venta"** o la justificación estratégica para implementar Business Intelligence.

---

### El Problema: La Fragmentación de Datos

El video inicia identificando un dolor común en las empresas: la **"parálisis por análisis"** causada por tener la información dispersa.

Se mencionan silos de datos típicos:
- 📁 Archivos locales de Excel
- 🗄️ Bases de datos SQL
- ☁️ La nube
- 📂 Carpetas compartidas

> **El argumento central:** cuando los datos están desordenados, es imposible ver el panorama completo ("Big Picture") necesario para tomar decisiones rápidas.

---

### La Solución: Flujo de 3 Pasos

El narrador resume el funcionamiento de Power BI en un ciclo de vida de datos simplificado:

1. **🔌 Conectar:** Unificar las fuentes sin importar su origen.
2. **🧹 Limpiar y Organizar:** Preparar los datos automáticamente para que sean fiables (fase de ETL).
3. **📊 Visualizar:** Crear el reporte gráfico.

---

### Diferenciación Técnica: Excel vs. Power BI

Se aborda la duda frecuente: *"¿Por qué no seguir usando Excel?"*

| Característica | Excel | Power BI |
|----------------|-------|----------|
| **Volumen** | Se traba con muchas filas | Maneja millones de filas |
| **Interactividad** | Estático | Filtrado cruzado dinámico |
| **Actualización** | Copiar y pegar manual | Botón "Actualizar" automático |

**Demostración clave:** Al hacer clic en una barra del gráfico (ej. "Mouse inalámbrico"), toda la tabla de detalles y los demás KPIs se recalculan instantáneamente.

---

### 💡 Conclusión del Video

El objetivo final no es estético ("gráficos bonitos"), sino **operativo**: liberar tiempo de procesamiento manual para dedicarlo al análisis estratégico.

---

### 🎮 Relevancia para el Juego

Este video te prepara conceptualmente para entender **por qué** estamos usando Power BI en las misiones de Dunder Mifflin y otros mundos. La automatización que aprenderás aquí es exactamente lo que Michael Scott necesita para salvar Scranton.
    `,
    officialLink: 'https://youtu.be/4vAYUjvYwus',
    gameRelevance: ['office', 'datarescue', 'stark']
  },
  {
    id: 'video-etl-conectores',
    categoryId: 'videos',
    title: 'Dominando la Ingesta y Transformación de Datos (ETL)',
    duration: '12 min',
    level: 'Principiante',
    description: 'Tutorial técnico centrado en "Get Data", conectores disponibles, y cómo modelar y limpiar información.',
    isVideo: true,
    youtubeUrl: 'https://youtu.be/gpApeeNAYcY',
    youtubeId: 'gpApeeNAYcY',
    relatedLessons: ['video-pbi-estrategia', 'get-data', 'power-query-basics', 'first-report', 'pbi-interface'],
    content: `
### 🎬 La Puerta de Entrada: "Obtener Datos" y Transformación

Este video entra en el detalle técnico del **"cómo"** se logra la automatización prometida en el primer video.

---

### El Fin del "Copiar y Pegar"

Se presenta la función **Obtener Datos (Get Data)** como la herramienta que elimina la tarea manual de mover datos entre archivos.

---

### Versatilidad de Conectores

Power BI puede conectarse a **más de 100 fuentes**:

- 📄 **Archivos planos:** Excel, PDF, CSV
- 🗄️ **Bases de datos:** SQL Server, Oracle, SAP
- ☁️ **Servicios en la Nube:** Google Analytics, Salesforce, Azure
- 🌐 **Web:** Conexión directa a URLs

---

### El Concepto del "Puente Vivo"

Un punto crucial: Power BI **no copia los datos estáticamente**, sino que crea un puente directo con la fuente.

> Si el archivo Excel origen se modifica (ej. alguien corrige una venta), Power BI solo necesita **"Actualizar"** para reflejar el cambio.

Esto garantiza la **integridad de los datos** sin reconstruir el reporte.

---

### La "Aduana" de Power Query

Se introduce **Power Query** como una "aduana":

- Antes de que los datos entren al modelo, pasan por este filtro
- Decides qué columnas entran
- Limpias errores
- Optimizas la carga

**Beneficio:** Ahorro de memoria y tiempo de procesamiento.

---

### Operaciones Prácticas en Data View

El video demuestra:

1. **Carga de Excel:** Navegación, selección de hoja (customer_dim), y carga
2. **Formato de Datos:** Cambiar tipo de columna de fecha de formato largo a "Short Date"
3. **Creación de Columnas:** Menú para agregar "Nuevas Columnas" o "Nuevas Medidas" con DAX

---

### 🔗 Síntesis: Complemento con Video 1

| Video 1 | Video 2 |
|---------|----------|
| Vende la idea y beneficio | Explica la ejecución técnica |
| Estrategia, Interactividad | Conectores, Power Query |
| El "por qué" | El "cómo" |

Juntos, narran la transición del **"Operador de Datos"** (que gasta su día en Excel limpiando celdas) al **"Analista de Datos"** (que construye flujos automatizados para tomar decisiones).

---

### 🎮 Relevancia para el Juego

Este video es **esencial** para las misiones:
- **Office 1 & 1b:** Importar y limpiar datos de ventas
- **DataRescue 1-3:** Conectar fuentes corruptas y usar Power Query
- **La Fusión (Office 4):** Anexar tablas de diferentes sucursales
    `,
    officialLink: 'https://youtu.be/gpApeeNAYcY',
    gameRelevance: ['office', 'datarescue']
  },
  {
    id: 'video-dashboard-design-historia-datos',
    categoryId: 'videos',
    title: 'Diseño de Dashboards en Power BI: ¡Que tus datos cuenten una historia! 📊',
    duration: 'Video',
    level: 'Intermedio',
    description: 'Buenas prácticas de visualización: regla de 5 segundos, carga cognitiva y uso estratégico del color.',
    isVideo: true,
    youtubeUrl: 'https://youtu.be/WA4jZrGYayc',
    youtubeId: 'WA4jZrGYayc',
    relatedLessons: ['chart-types', 'card-kpi', 'filters-slicers', 'quick-wins'],
    content: `
### 🎬 Buenas Prácticas de Visualización (Regla de 5 segundos)

Este video se enfoca en **cómo comunicar con claridad** y evitar dashboards confusos. No se trata de “hacerlo bonito”, sino de **hacerlo entendible** rápido.

---

### Lo esencial que vas a aplicar

- **Regla de los 5 segundos:** ¿Se entiende el objetivo del dashboard casi de inmediato?
- **Carga cognitiva:** Menos ruido visual = más decisiones rápidas.
- **Uso del color:** Resalta lo importante, evita el arcoíris.
- **Tooltips inteligentes:** Detalle sin contaminar la vista principal.

---

### Errores comunes que se corrigen

- Saturación de gráficos y KPIs
- Paletas sin jerarquía visual
- Pie charts usados donde no aplican

---

### 🎮 Relevancia para el Juego

Ideal para mejorar tus reportes en:
- **Dunder Mifflin:** KPIs claros para operaciones
- **Stark Industries:** dashboards ejecutivos
- **Gringotts:** visuales limpios para auditoría
    `,
    officialLink: 'https://youtu.be/WA4jZrGYayc',
    gameRelevance: ['office', 'stark', 'hogwarts']
  },
  {
    id: 'video-dax-motor-powerbi',
    categoryId: 'videos',
    title: 'DAX: el motor de Power BI (Medidas vs Columnas)',
    duration: 'Video',
    level: 'Intermedio',
    description: 'Qué es DAX, cómo funciona el contexto y por qué las medidas son clave para reportes rápidos.',
    isVideo: true,
    youtubeUrl: 'https://youtu.be/uIIdFFY8c2k',
    youtubeId: 'uIIdFFY8c2k',
    relatedLessons: ['dax-intro', 'calculate-filter', 'sum-average-count', 'divide-safe'],
    content: `
### 🎬 DAX: el motor de Power BI

Si Power BI fuera un carro deportivo, **DAX es el motor**. Este video explica el **contexto** como la diferencia clave frente a Excel y cuándo usar **Medidas** vs **Columnas Calculadas**.

---

### Lo que vas a entender

- **DAX vs Excel:** cálculo por celdas vs cálculo por tablas
- **Motor de cálculo:** cómo se evalúan filtros y contexto
- **Medidas vs Columnas:** performance, memoria y escalabilidad
- **Inteligencia de Tiempo:** comparar periodos con facilidad

---

### 🎮 Relevancia para el Juego

Fundamental para:
- **Stark Industries:** medidas avanzadas y CALCULATE
- **Squid Game:** análisis estadístico con contexto
- **Gringotts:** modelos optimizados y reportes rápidos
    `,
    officialLink: 'https://youtu.be/uIIdFFY8c2k',
    gameRelevance: ['stark', 'squid-game', 'hogwarts']
  }
];
