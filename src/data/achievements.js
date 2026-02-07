export const ACHIEVEMENTS = [
    {
        id: 'viz-wizard',
        title: 'Viz Wizard',
        description: 'Crea 50 visualizaciones diferentes',
        icon: '📊',
        condition: (user) => user.stats?.visualizations >= 50,
        xp: 500,
        rarity: 'rare',
        image: '/images/achievements/viz-wizard.png'
    },
    {
        id: 'dax-master',
        title: 'DAX Master',
        description: 'Usa 20 funciones DAX únicas',
        icon: '🔢',
        condition: (user) => user.stats?.daxFunctions >= 20,
        xp: 800,
        rarity: 'legendary',
        image: '/images/achievements/dax-master.png'
    },
    {
        id: 'level-10',
        title: 'Padawan Graduado',
        description: 'Alcanza el nivel 10',
        icon: '🎓',
        condition: (user) => user.level >= 10,
        xp: 1000,
        rarity: 'epic',
        image: '/images/achievements/level-10.png'
    },
    {
        id: 'richie-rich',
        title: 'Richie Rich',
        description: 'Acumula 1000 monedas',
        icon: '💰',
        condition: (user) => user.coins >= 1000,
        xp: 300,
        rarity: 'common',
        image: '/images/achievements/richie-rich.png'
    },
    {
        id: 'world-traveler',
        title: 'Viajero de Mundos',
        description: 'Desbloquea 3 mundos diferentes',
        icon: '🌍',
        condition: (user) => user.unlockedWorlds.length >= 3,
        xp: 400,
        rarity: 'rare',
        image: '/images/achievements/world-traveler.png'
    },
    {
        id: 'mission-master',
        title: 'Maestro de Misiones',
        description: 'Completa 10 misiones',
        icon: '🎯',
        condition: (user) => user.completedMissions.length >= 10,
        xp: 600,
        rarity: 'epic',
        image: '/images/achievements/mission-master.png'
    },
    // ============================================
    // DATARESCUE: Achievements específicos
    // ============================================
    {
        id: 'data-detective',
        title: 'Detective de Datos',
        description: 'Detecta 10 anomalías en datasets corruptos',
        icon: '🔍',
        condition: (user) => user.stats?.anomaliesDetected >= 10,
        xp: 400,
        rarity: 'rare',
        image: '/images/achievements/data-detective.png'
    },
    {
        id: 'kpi-rescuer',
        title: 'Rescatador de KPIs',
        description: 'Reconstruye 5 KPIs correctamente en DataRescue',
        icon: '📈',
        condition: (user) => user.stats?.kpisRescued >= 5,
        xp: 600,
        rarity: 'epic',
        image: '/images/achievements/mission-master.png'
    },
    {
        id: 'corruptex-slayer',
        title: 'Cazador de Corruptex',
        description: 'Completa todas las misiones de DataRescue',
        icon: '🦸‍♂️',
        condition: (user) => {
            const datarescueMissions = ['datarescue-1', 'datarescue-2', 'datarescue-3', 'datarescue-4', 'datarescue-5', 'datarescue-6', 'datarescue-7'];
            return datarescueMissions.every(m => user.completedMissions.includes(m));
        },
        xp: 2000,
        rarity: 'legendary',
        image: '/images/achievements/corruptex-slayer.png'
    },
    {
        id: 'outlier-hunter',
        title: 'Cazador de Outliers',
        description: 'Identifica correctamente 20 outliers',
        icon: '🎯',
        condition: (user) => user.stats?.outliersFound >= 20,
        xp: 500,
        rarity: 'rare',
        image: '/images/achievements/data-detective.png'
    },
    {
        id: 'data-cleaner',
        title: 'Limpiador de Datos',
        description: 'Normaliza 100 registros con typos o errores',
        icon: '🧹',
        condition: (user) => user.stats?.recordsCleaned >= 100,
        xp: 450,
        rarity: 'rare',
        image: '/images/achievements/data-detective.png'
    },
    {
        id: 'perfect-validation',
        title: 'Validación Perfecta',
        description: 'Completa una misión de DataRescue con 100% de precisión',
        icon: '✅',
        condition: (user) => user.stats?.perfectValidations >= 1,
        xp: 800,
        rarity: 'epic',
        image: '/images/achievements/mission-master.png'
    },
    {
        id: 'hero-analyst',
        title: 'Analista Heroico',
        description: 'Desbloquea todas las cartas de habilidad',
        icon: '🃏',
        condition: (user) => user.unlockedCards?.length >= 10,
        xp: 1500,
        rarity: 'legendary',
        image: '/images/achievements/corruptex-slayer.png'
    },
    // ============================================
    // DUNDER MIFFLIN: Achievements específicos
    // ============================================
    {
        id: 'dunder-mifflin-master',
        title: 'Héroe de Scranton',
        description: 'Completa todas las misiones de Dunder Mifflin Paper Co.',
        icon: '🏢',
        condition: (user) => {
            const officeMissions = ['office-1', 'office-1b', 'office-2', 'office-3', 'office-4', 'office-5'];
            return officeMissions.every(m => user.completedMissions.includes(m));
        },
        xp: 1500,
        rarity: 'legendary'
    },
    {
        id: 'dunder-mifflin-perfect',
        title: 'That\'s What She Said',
        description: 'Completa Dunder Mifflin con Perfect Run (sin errores ni pistas)',
        icon: '🏆',
        condition: (user) => {
            const progress = user.worldProgress?.office;
            if (!progress?.completedAt) return false;
            return progress.totalWrongAnswers === 0;
        },
        xp: 2500,
        rarity: 'legendary'
    },
    {
        id: 'dax-rookie',
        title: 'DAX Rookie',
        description: 'Usa SUM, AVERAGE y CALCULATE en tus primeras misiones',
        icon: '📊',
        condition: (user) => {
            const skills = user.worldSkills?.office || [];
            return skills.includes('dax-sum-avg') && skills.includes('dax-calculate');
        },
        xp: 400,
        rarity: 'rare',
        image: '/images/achievements/dax-master.png'
    }
];
