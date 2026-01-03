import { useState } from 'react';

/**
 * Hook para verificar si mostrar onboarding
 */
export const useOnboarding = () => {
    // Initialize state from localStorage synchronously to avoid effect setState
    const [showOnboarding, setShowOnboarding] = useState(() => {
        const completed = localStorage.getItem('powerbi-quest-onboarding-complete');
        return !completed;
    });
    const [isLoaded] = useState(true);

    const completeOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem('powerbi-quest-onboarding-complete', 'true');
    };

    const resetOnboarding = () => {
        localStorage.removeItem('powerbi-quest-onboarding-complete');
        setShowOnboarding(true);
    };

    return { showOnboarding, completeOnboarding, resetOnboarding, isLoaded };
};
