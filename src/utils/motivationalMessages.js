/**
 * Mensajes motivacionales categorizados por contexto
 */
const MOTIVATIONAL_MESSAGES = {
    // Mensajes de bienvenida (al iniciar sesión)
    welcome: [
        { text: "¡Hora de convertir datos en insights! 📊", author: "Power BI Quest" },
        { text: "Cada día es una oportunidad para aprender algo nuevo.", author: "Tu mentor" },
        { text: "Los datos son el nuevo petróleo. ¡A refinar! ⛽", author: "Analista Senior" },
        { text: "Un dashboard bien hecho vale más que mil palabras.", author: "Data Wisdom" },
        { text: "¡Bienvenido de vuelta, Analista! Tu misión te espera.", author: "Power BI Quest" },
    ],
    
    // Después de completar una misión
    missionComplete: [
        { text: "¡Excelente trabajo! Los datos nunca mienten cuando los tratas bien. 🎯", author: "Michael Scott (datos edition)" },
        { text: "Otra misión completada. Estás en camino a ser un Data Wizard. 🧙‍♂️", author: "Power BI Quest" },
        { text: "El conocimiento que acabas de ganar es más valioso que cualquier tesoro.", author: "Data Master" },
    ],
    
    // Al subir de nivel
    levelUp: [
        { text: "¡Nuevo nivel desbloqueado! Tu poder analítico crece. 📈", author: "Power BI Quest" },
        { text: "Con gran poder de datos viene gran responsabilidad de insights.", author: "Uncle DAX" },
    ],
    
    // Tips de Power BI
    powerBiTips: [
        { text: "💡 Tip: Usa CALCULATE para cambiar el contexto de filtro de tus medidas.", author: "DAX Master" },
        { text: "💡 Tip: Las relaciones entre tablas son la base de un buen modelo de datos.", author: "Data Architect" },
        { text: "💡 Tip: Siempre nombra tus medidas de forma descriptiva para facilitar su uso.", author: "Best Practices" },
        { text: "💡 Tip: Usa formato condicional para resaltar datos importantes en tus visuales.", author: "Visual Expert" },
    ],
    
    // Motivación general
    general: [
        { text: "Los mejores analistas no nacen, se hacen con práctica.", author: "Data Wisdom" },
        { text: "Cada error es una oportunidad de aprendizaje disfrazada.", author: "Growth Mindset" },
        { text: "El conocimiento es la llave que abre todas las puertas.", author: "Wisdom" },
    ]
};

/**
 * Obtener un mensaje aleatorio de una categoría
 */
export const getRandomMessage = (category, userData = {}) => {
    const messages = MOTIVATIONAL_MESSAGES[category] || MOTIVATIONAL_MESSAGES.welcome;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Reemplazar placeholders con datos del usuario
    let text = randomMessage.text;
    if (userData.streak) {
        text = text.replace('{streak}', userData.streak);
    }
    if (userData.name) {
        text = text.replace('{name}', userData.name);
    }
    if (userData.level) {
        text = text.replace('{level}', userData.level);
    }
    
    return { ...randomMessage, text };
};

export { MOTIVATIONAL_MESSAGES };
