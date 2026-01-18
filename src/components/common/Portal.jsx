import { createPortal } from 'react-dom';

/**
 * Componente Portal para renderizar modales fuera del flujo del DOM
 * Esto evita problemas con position:fixed cuando hay transforms en contenedores padres
 */
const Portal = ({ children }) => {
    // Renderiza los hijos directamente en el body del documento
    return createPortal(children, document.body);
};

export default Portal;
