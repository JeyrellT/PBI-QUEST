import { SCORING_PROFILES } from '../data/worlds';

/**
 * Calcula el XP final de una misión con penalizaciones
 * @param {number} baseXP - XP base de la misión
 * @param {string} profileId - ID del perfil de scoring del mundo
 * @param {object} stats - { hints, attempts, wrongAnswers }
 * @returns {object} { finalXP, multiplier, isPerfect, breakdown }
 */
export const calculateMissionScore = (baseXP, profileId, stats) => {
    const profile = SCORING_PROFILES[profileId] || SCORING_PROFILES['office-standard'];

    const { hints = 0, attempts = 0, wrongAnswers = 0 } = stats;

    // Calcular penalizaciones
    const hintPenalty = hints * profile.hintPenalty;
    const attemptPenalty = Math.max(0, (attempts - 1) * profile.attemptPenalty);
    const wrongPenalty = wrongAnswers * profile.wrongAnswerPenalty;

    // Calcular multiplicador base
    let multiplier = 1 - hintPenalty - attemptPenalty - wrongPenalty;

    // Aplicar bonus por perfecto (sin errores, sin hints, primer intento)
    const isPerfect = hints === 0 && attempts <= 1 && wrongAnswers === 0;
    if (isPerfect) {
        multiplier = profile.perfectBonus;
    }

    // Aplicar límite mínimo
    multiplier = Math.max(profile.minMultiplier, multiplier);

    const finalXP = Math.round(baseXP * multiplier);

    return {
        finalXP,
        multiplier,
        isPerfect,
        breakdown: {
            base: baseXP,
            hintPenalty: Math.round(baseXP * hintPenalty),
            attemptPenalty: Math.round(baseXP * attemptPenalty),
            wrongPenalty: Math.round(baseXP * wrongPenalty),
            perfectBonus: isPerfect ? Math.round(baseXP * (profile.perfectBonus - 1)) : 0
        }
    };
};

export default calculateMissionScore;
