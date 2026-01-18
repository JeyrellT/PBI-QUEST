/**
 * Utilidades para generar y validar emails a partir de nombres de empresas.
 */

/**
 * Sanitiza un nombre de compañía para usarlo como parte local de un email.
 * Reglas aplicadas (según especificación del usuario):
 * - Elimina sufijos: Inc, LLC, Group, Sons (case-insensitive)
 * - Elimina comas, guiones, espacios, ampersand (&) y apóstrofes (')
 * - Convierte a minúsculas
 * - Elimina caracteres no permitidos en la parte local (dejando solo a-z0-9._%+-)
 *
 * @param {string} name
 * @returns {string} sanitized local part
 */
export function sanitizeCompanyForEmail(name) {
  if (!name || typeof name !== 'string') return '';
  // Quitar sufijos comunes
  let s = name.replace(/\b(?:inc|llc|group|sons)\b/gi, '');
  // Normalizar acentos (NFD) y quitar diacríticos
  s = s.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  // Eliminar caracteres problemáticos y signos de puntuación (coma, ampersand, guión)
  s = s.replace(/[,&-]/g, '');
  // Eliminar apóstrofes explícitamente
  s = s.replace(/'/g, '');
  // Eliminar espacios y normalizar múltiples espacios
  s = s.replace(/\s+/g, '');
  // Pasar a minúsculas
  s = s.toLowerCase();
  // Mantener solo caracteres válidos para la parte local de un email
  s = s.replace(/[^a-z0-9._%+-]/g, '');
  // Colapsar multiples puntos y quitar punto inicial/final
  s = s.replace(/\.+/g, '.').replace(/^\.+|\.+$/g, '');
  return s;
}

/**
 * Construye un email a partir del nombre de la compañía y un dominio (por defecto company.com)
 * @param {string} name
 * @param {string} domain
 * @returns {string}
 */
export function makeCompanyEmail(name, domain = 'company.com') {
  const local = sanitizeCompanyForEmail(name);
  return `${local}@${domain}`;
}

/**
 * Valida un email con el patrón estándar proporcionado por el usuario.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}
