/**
 * Obtiene la ruta correcta para assets en public/
 * Funciona tanto en desarrollo como en producción (GitHub Pages)
 */
export const getAssetPath = (path) => {
  // import.meta.env.BASE_URL incluye el trailing slash
  const base = import.meta.env.BASE_URL || '/';
  
  // Remover el slash inicial del path si existe
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${base}${cleanPath}`;
};

/**
 * Obtiene la ruta para imágenes de mundos
 */
export const getWorldImage = (imagePath) => getAssetPath(imagePath);

/**
 * Obtiene la ruta para imágenes de cartas
 */
export const getCardImage = (imagePath) => getAssetPath(imagePath);

/**
 * Obtiene la ruta para imágenes de historia
 */
export const getStoryImage = (imagePath) => getAssetPath(imagePath);
