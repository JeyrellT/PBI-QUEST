import { faker } from '@faker-js/faker';
import { makeCompanyEmail, isValidEmail } from '../utils/emailUtils.js';

// =====================================================
// DATARESCUE: Utilidades determinísticas (seeded)
// =====================================================
const seededChance = (rate = 0) => faker.number.float({ min: 0, max: 1, fractionDigits: 6 }) <= rate;

// ============================================
// DATARESCUE: Catálogos para generación de datos
// ============================================
const DATARESCUE_CATALOGS = {
    clients: [
        'ALUMIMUNDO S.A.', 'FERRETERÍA CENTRAL', 'IMPORTADORA DEL SUR', 'LOGISTICS PRIME',
        'COMERCIAL PACÍFICO', 'DISTRIBUIDORA NORTE', 'EXPORTADORA ANDINA', 'GLOBAL TRADE CO',
        'MEGA IMPORTACIONES', 'CARGO EXPRESS', 'TRANSPORTES UNIDOS', 'MARITIMA INTERNACIONAL',
        'AERO LOGISTICS', 'QUICK CARGO'
    ],
    countries: ['Brazil', 'Chile', 'Argentina', 'Peru', 'Colombia', 'Mexico', 'USA', 'China', 'Germany', 'Spain'],
    carriers: ['MAERSK', 'MSC', 'COSCO', 'HAPAG-LLOYD', 'EVERGREEN', 'CMA CGM', 'LATAM CARGO', 'AVIANCA CARGO'],
    agents: ['AGENTE ALPHA', 'BROKER BETA', 'CARGO CONNECT', 'DELTA LOGISTICS', 'EXPRESS AGENT', 'FAST FORWARD', 'GLOBAL AGENT', 'HUB LOGISTICS'],
    modes: ['Aéreo', 'Marítimo'],
    incoterms: ['FOB', 'CIF', 'EXW'],
    movementTypes: ['Importación', 'Exportación']
};

// ============================================
// EMAILS: Generador y validador (sanitiza apóstrofes y caracteres problemáticos)
// ============================================
const generateClientsWithEmails = (domain = 'company.com') => {
    return DATARESCUE_CATALOGS.clients.map(name => {
        const email = makeCompanyEmail(name, domain);
        return {
            nameOriginal: name,
            email,
            valid: isValidEmail(email)
        };
    });
};


// Corrupciones del villano Corruptex
const CORRUPTIONS = {
    // Typos y variaciones de texto
    applyTypos: (value, rate = 0.1) => {
        if (!seededChance(rate)) return value;
        const typos = [
            v => v + '!', v => v + '?', v => v + '...', v => v + '*',
            v => v.replace(/í/g, 'i'), v => v.replace(/é/g, 'e'),
            v => v.toLowerCase(), v => v.toUpperCase(),
            v => v + ' ', v => '  ' + v, v => v.replace(' ', '  '),
            v => v.slice(0, -1) + v.slice(-1).repeat(2), // Duplicar última letra
        ];
        return faker.helpers.arrayElement(typos)(value);
    },
    
    // Nulos estratégicos
    applyNulls: (value, rate = 0.05) => {
        if (!seededChance(rate)) return value;
        return faker.helpers.arrayElement([null, '', undefined, 'N/A', '-']);
    },
    
    // Formato contable (paréntesis para negativos)
    applyAccountingFormat: (value, rate = 0.08) => {
        if (!seededChance(rate) || typeof value !== 'number') return value;
        return `(${Math.abs(value).toFixed(2)})`;
    },
    
    // Unidades embebidas
    applyUnitsInNumbers: (value, field, rate = 0.1) => {
        if (!seededChance(rate) || typeof value !== 'number') return value;
        const units = {
            weight: ['kg', ' kg', 'KG', ' KG', 'Kg'],
            volume: ['cbm', ' cbm', 'CBM', ' CBM', 'm3'],
            currency: ['₡', '$', ' colones', '??']
        };
        const unit = faker.helpers.arrayElement(units[field] || ['']);
        return `${value}${unit}`;
    },
    
    // Outliers por desplazamiento decimal
    applyOutliers: (value, rate = 0.02) => {
        if (!seededChance(rate) || typeof value !== 'number') return value;
        const multipliers = [100, 1000, 0.01, 0.001];
        return value * faker.helpers.arrayElement(multipliers);
    },
    
    // Fechas inválidas
    applyInvalidDates: (dateStr, rate = 0.03) => {
        if (!seededChance(rate)) return dateStr;
        const invalidDates = ['78/45/5276', '00/00/0000', 'FECHA', '2024-99-99', 'invalid'];
        return faker.helpers.arrayElement(invalidDates);
    },
    
    // Variaciones de país
    applyCountryVariations: (country, rate = 0.15) => {
        if (!seededChance(rate)) return country;
        const variations = {
            'Brazil': ['Brzl', 'BRAZIL', 'brasil', 'Brasíl', 'BR'],
            'Chile': ['CHILE', 'chile', 'Chle', 'CL'],
            'Argentina': ['ARGENTINA', 'argentina', 'Arg', 'AR'],
            'Peru': ['PERU', 'peru', 'Perú', 'PE'],
            'Colombia': ['COLOMBIA', 'colombia', 'Col', 'CO'],
            'Mexico': ['MEXICO', 'mexico', 'México', 'MX'],
            'USA': ['USA', 'usa', 'United States', 'US', 'Estados Unidos'],
            'China': ['CHINA', 'china', 'CN', 'CHN'],
            'Germany': ['GERMANY', 'germany', 'Alemania', 'DE'],
            'Spain': ['SPAIN', 'spain', 'España', 'ES']
        };
        return faker.helpers.arrayElement(variations[country] || [country]);
    }
};

// =====================================================
// DATARESCUE: Fijos (datasets determinísticos)
// =====================================================
const DATARESCUE_FIXED_SPECS = {
    datarescue_corrupted: { rows: 120, difficulty: 'medium', seed: 20240103 },
    datarescue_full_challenge: { rows: 200, difficulty: 'hard', seed: 20240103 },
    datarescue_duplicated: { rows: 120, duplicateRate: 0.12, difficulty: 'medium', seed: 20240103 }
};

const safeParseNumber = (v) => {
    if (v === null || v === undefined) return null;
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v !== 'string') return null;
    const cleaned = v
        .replace(/[₡$,]/g, '')
        .replace(/\s+/g, '')
        .replace(/\?\?/g, '')
        .replace(/kg|KG|Kg|cbm|CBM|m3/gi, '');
    const n = Number(cleaned.replace(/[()]/g, ''));
    if (!Number.isFinite(n)) return null;
    // Si venía con paréntesis, interpretamos como negativo contable
    if (v.includes('(') && v.includes(')')) return -Math.abs(n);
    return n;
};

const normalizeTextLoose = (v) => (v ?? '')
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();

export const useDataGenerator = () => {
    // ============================================
    // DATARESCUE: Generador de datos limpios (truth)
    // ============================================
    const generateDataRescueTruth = (rows = 120, seed = null) => {
        if (seed) faker.seed(seed);
        
        const data = [];
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-12-31');
        
        for (let i = 0; i < rows; i++) {
            const proformaDate = faker.date.between({ from: startDate, to: endDate });
            const saleDate = faker.date.between({ from: proformaDate, to: endDate });
            const costPrice = faker.number.float({ min: 500, max: 15000, fractionDigits: 2 });
            const profitMargin = faker.number.float({ min: 0.10, max: 0.35, fractionDigits: 2 });
            const profit = costPrice * profitMargin;
            const salePrice = costPrice + profit;
            
            data.push({
                proformaCode: `PRO-2024-${String(i + 1).padStart(4, '0')}`,
                proformaDate: proformaDate.toISOString().split('T')[0],
                offerValidUntil: faker.date.soon({ days: 30, refDate: proformaDate }).toISOString().split('T')[0],
                saleDate: saleDate.toISOString().split('T')[0],
                saleCode: `VTA-2024-${String(i + 1).padStart(4, '0')}`,
                client: faker.helpers.arrayElement(DATARESCUE_CATALOGS.clients),
                originCity: faker.location.city(),
                originCountry: faker.helpers.arrayElement(DATARESCUE_CATALOGS.countries),
                destinationCountry: faker.helpers.arrayElement(DATARESCUE_CATALOGS.countries),
                agent: faker.helpers.arrayElement(DATARESCUE_CATALOGS.agents),
                carrier: faker.helpers.arrayElement(DATARESCUE_CATALOGS.carriers),
                movementType: faker.helpers.arrayElement(DATARESCUE_CATALOGS.movementTypes),
                mode: faker.helpers.arrayElement(DATARESCUE_CATALOGS.modes),
                incoterm: faker.helpers.arrayElement(DATARESCUE_CATALOGS.incoterms),
                teus: faker.number.int({ min: 1, max: 10 }),
                weightKg: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
                volumeCbm: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
                costPrice: costPrice,
                salePrice: salePrice,
                profit: profit
            });
        }
        return data;
    };
    
    // ============================================
    // DATARESCUE: Aplicar corrupciones (villano Corruptex)
    // ============================================
    const corruptDataRescueData = (truthData, corruptionLevel = 'medium') => {
        const rates = {
            easy: { typo: 0.05, nulls: 0.02, accounting: 0.03, units: 0.05, outliers: 0.01, dates: 0.02, countries: 0.08 },
            medium: { typo: 0.10, nulls: 0.05, accounting: 0.08, units: 0.10, outliers: 0.02, dates: 0.03, countries: 0.15 },
            hard: { typo: 0.15, nulls: 0.08, accounting: 0.12, units: 0.15, outliers: 0.04, dates: 0.05, countries: 0.20 }
        };
        const r = rates[corruptionLevel] || rates.medium;
        
        return truthData.map(row => ({
            ...row,
            // Corrupciones de texto
            client: CORRUPTIONS.applyTypos(row.client, r.typo),
            mode: CORRUPTIONS.applyTypos(row.mode, r.typo),
            originCountry: CORRUPTIONS.applyCountryVariations(row.originCountry, r.countries),
            destinationCountry: CORRUPTIONS.applyCountryVariations(row.destinationCountry, r.countries),
            carrier: CORRUPTIONS.applyTypos(row.carrier, r.typo),
            
            // Corrupciones de números
            profit: CORRUPTIONS.applyNulls(
                CORRUPTIONS.applyAccountingFormat(row.profit, r.accounting),
                r.nulls
            ),
            weightKg: CORRUPTIONS.applyUnitsInNumbers(
                CORRUPTIONS.applyOutliers(row.weightKg, r.outliers),
                'weight',
                r.units
            ),
            volumeCbm: CORRUPTIONS.applyUnitsInNumbers(
                CORRUPTIONS.applyOutliers(row.volumeCbm, r.outliers),
                'volume',
                r.units
            ),
            costPrice: CORRUPTIONS.applyUnitsInNumbers(row.costPrice, 'currency', r.units * 0.5),
            salePrice: CORRUPTIONS.applyUnitsInNumbers(row.salePrice, 'currency', r.units * 0.5),
            
            // Corrupciones de fechas
            proformaDate: CORRUPTIONS.applyInvalidDates(row.proformaDate, r.dates),
            saleDate: CORRUPTIONS.applyInvalidDates(row.saleDate, r.dates)
        }));
    };
    
    // ============================================
    // DATARESCUE: Generar datos con duplicados
    // ============================================
    const generateDataRescueDuplicated = (rows = 120, duplicateRate = 0.1, seed = null) => {
        const truth = generateDataRescueTruth(rows, seed);
        const corrupted = corruptDataRescueData(truth);
        
        // Añadir duplicados
        const numDuplicates = Math.floor(rows * duplicateRate);
        const duplicates = [];
        for (let i = 0; i < numDuplicates; i++) {
            const original = faker.helpers.arrayElement(corrupted);
            duplicates.push({ ...original }); // Copia exacta
        }
        
        return [...corrupted, ...duplicates];
    };
    
    // ============================================
    // DATARESCUE: Calcular Answer Key
    // ============================================
    const calculateDataRescueAnswerKey = (truthData) => {
        const totalProfit = truthData.reduce((sum, row) => sum + row.profit, 0);
        const totalCost = truthData.reduce((sum, row) => sum + row.costPrice, 0);
        const profitability = totalProfit / totalCost;
        
        const validWeights = truthData.filter(r => r.weightKg > 0 && r.weightKg < 10000);
        const avgWeight = validWeights.reduce((sum, r) => sum + r.weightKg, 0) / validWeights.length;
        
        const uniqueClients = new Set(truthData.map(r => r.client)).size;
        const uniqueCountries = new Set(truthData.map(r => r.originCountry)).size;
        
        // Clasificación de riesgo: peso > 1000 OR ganancia < 1000
        const riskOperations = truthData.filter(r => r.weightKg > 1000 || r.profit < 1000).length;
        
        // Outliers de volumen (> percentil 95 * 1.5)
        const volumes = truthData.map(r => r.volumeCbm).sort((a, b) => a - b);
        const p95 = volumes[Math.floor(volumes.length * 0.95)];
        const outlierThreshold = p95 * 1.5;
        const outliers = truthData.filter(r => r.volumeCbm > outlierThreshold).map(r => r.proformaCode);
        
        return {
            GananciaTotal: Math.round(totalProfit * 100) / 100,
            Rentabilidad: Math.round(profitability * 100) / 100,
            PesoPromedioGlobal: Math.round(avgWeight * 100) / 100,
            ClientesUnicos: uniqueClients,
            PaisesUnicos: uniqueCountries,
            OperacionesRevisar: riskOperations,
            OutliersVolumen: outliers,
            TotalRegistros: truthData.length
        };
    };

    // ============================================
    // DATARESCUE: Calcular Step Key (pre/post, intermedios)
    // ============================================
    const calculateDataRescueStepKey = (truthRows, playRows) => {
        const invalidProfitCount = playRows.filter(r => safeParseNumber(r.profit) === null).length;
        const accountingProfitCount = playRows.filter(r => typeof r.profit === 'string' && r.profit.includes('(') && r.profit.includes(')')).length;
        const weightHasJunkCount = playRows.filter(r => typeof r.weightKg === 'string' && /[a-zA-Z?₡$]/.test(r.weightKg)).length;
        const volumeHasJunkCount = playRows.filter(r => typeof r.volumeCbm === 'string' && /[a-zA-Z?₡$]/.test(r.volumeCbm)).length;

        // Outliers de volumen en el dataset corrupto (después de parse numérico, antes de limpiar outliers)
        const volumes = playRows
            .map(r => safeParseNumber(r.volumeCbm))
            .filter(v => v !== null)
            .sort((a, b) => a - b);
        const p95 = volumes.length ? volumes[Math.floor(volumes.length * 0.95)] : 0;
        const outlierThreshold = p95 * 1.5;
        const outliersVolumen = playRows
            .filter(r => {
                const v = safeParseNumber(r.volumeCbm);
                return v !== null && v > outlierThreshold;
            })
            .map(r => r.proformaCode)
            .slice(0, 10);

        // Clientes únicos sin limpiar vs normalizado
        const rawUniqueClients = new Set(playRows.map(r => (r.client ?? '').toString().trim())).size;
        const normalizedUniqueClients = new Set(playRows.map(r => normalizeTextLoose(r.client))).size;

        // Riesgo "naive" aplicando regla sobre valores parseados del corrupto (antes de correcciones de lógica)
        const rawRiskCount = playRows.filter(r => {
            const w = safeParseNumber(r.weightKg);
            const p = safeParseNumber(r.profit);
            return (w !== null && w > 1000) || (p !== null && p < 1000);
        }).length;

        return {
            invalidProfitCount,
            accountingProfitCount,
            weightHasJunkCount,
            volumeHasJunkCount,
            outliersVolumen,
            outlierThreshold: Math.round(outlierThreshold * 100) / 100,
            rawUniqueClients,
            normalizedUniqueClients,
            rawRiskCount,
            totalRows: playRows.length
        };
    };
    
    // ============================================
    // DATARESCUE: Generador completo (bundle)
    // ============================================
    const generateDataRescueBundle = (rows = 120, difficulty = 'medium', seed = null) => {
        const truthData = generateDataRescueTruth(rows, seed);
        const corruptedData = corruptDataRescueData(truthData, difficulty);
        const answerKey = calculateDataRescueAnswerKey(truthData);
        const stepKey = calculateDataRescueStepKey(truthData, corruptedData);
        
        return {
            seed: seed || Date.now(),
            difficulty,
            truthRows: truthData,
            playRows: corruptedData,
            answerKey,
            stepKey
        };
    };

    // ============================================
    // DATARESCUE: Bundle determinístico para duplicados
    // ============================================
    const generateDataRescueDuplicatedBundle = (rows = 120, duplicateRate = 0.12, difficulty = 'medium', seed = null) => {
        const truth = generateDataRescueTruth(rows, seed);
        const corrupted = corruptDataRescueData(truth, difficulty);

        // Añadir duplicados determinísticos (usa faker ya seed-eado)
        const numDuplicates = Math.floor(rows * duplicateRate);
        const duplicates = [];
        for (let i = 0; i < numDuplicates; i++) {
            const original = faker.helpers.arrayElement(corrupted);
            duplicates.push({ ...original });
        }

        const playRows = [...corrupted, ...duplicates];
        const answerKey = calculateDataRescueAnswerKey(truth);
        const stepKey = {
            duplicatesInserted: numDuplicates,
            totalRows: playRows.length,
            distinctProformas: new Set(playRows.map(r => r.proformaCode)).size,
            // Conteo de filas duplicadas por proforma
            duplicatedRows: (() => {
                const counts = new Map();
                for (const r of playRows) counts.set(r.proformaCode, (counts.get(r.proformaCode) || 0) + 1);
                let extra = 0;
                for (const c of counts.values()) if (c > 1) extra += (c - 1);
                return extra;
            })()
        };

        return {
            seed: seed || Date.now(),
            difficulty,
            truthRows: truth,
            playRows,
            answerKey,
            stepKey
        };
    };

    // ============================================
    // DATARESCUE: API simple para datasets fijos
    // ============================================
    const getDataRescueFixedSpec = (datasetName) => DATARESCUE_FIXED_SPECS[datasetName] || null;

    const generateDataRescueFixedDataset = (datasetName) => {
        const spec = getDataRescueFixedSpec(datasetName);
        if (!spec) return null;
        if (datasetName === 'datarescue_duplicated') {
            return generateDataRescueDuplicatedBundle(spec.rows, spec.duplicateRate, spec.difficulty, spec.seed);
        }
        return generateDataRescueBundle(spec.rows, spec.difficulty, spec.seed);
    };
    const generateTreasuryData = (rows = 100) => {
        const data = [];
        const houses = ['Lannister', 'Stark', 'Targaryen', 'Baratheon', 'Tyrell', 'Martell'];
        const regions = ['Westeros', 'Essos', 'The North', 'The Reach', 'Dorne'];
        const types = ['Income', 'Expense'];
        const categories = ['Military', 'Luxury', 'Infrastructure', 'Taxes', 'Debt Payment'];

        for (let i = 0; i < rows; i++) {
            data.push({
                transaction_id: faker.string.uuid(),
                date: faker.date.between({ from: '2020-01-01', to: '2023-12-31' }).toISOString().split('T')[0],
                type: faker.helpers.arrayElement(types),
                category: faker.helpers.arrayElement(categories),
                amount: faker.number.int({ min: 100, max: 50000 }),
                house: faker.helpers.arrayElement(houses),
                region: faker.helpers.arrayElement(regions)
            });
        }
        return data;
    };

    const generateSalesData = (rows = 100) => {
        const data = [];
        const sellers = ['Dwight Schrute', 'Jim Halpert', 'Phyllis Vance', 'Stanley Hudson', 'Andy Bernard'];
        const products = ['Dunder Mifflin Premium', 'Sabre Printer', 'Cardstock', 'Recycled Paper'];

        for (let i = 0; i < rows; i++) {
            data.push({
                sale_id: faker.string.uuid(),
                date: faker.date.recent({ days: 365 }).toISOString().split('T')[0],
                seller: faker.helpers.arrayElement(sellers),
                product: faker.helpers.arrayElement(products),
                quantity: faker.number.int({ min: 1, max: 100 }),
                unit_price: faker.number.float({ min: 5, max: 50, fractionDigits: 2 }),
                customer: faker.company.name()
            });
        }
        return data;
    };

    const generateChemicalInventory = (rows = 100) => {
        const data = [];
        const chemicals = ['Methylamine', 'Phenylacetic Acid', 'Caustic Soda', 'Muriatic Acid', 'Hydrogen Chloride'];
        const locations = ['Laundry Superlab', 'Vamonos Pest Storage', 'Madrigal Warehouse A', 'Madrigal Warehouse B'];

        for (let i = 0; i < rows; i++) {
            data.push({
                batch_id: faker.string.alphanumeric(8).toUpperCase(),
                chemical: faker.helpers.arrayElement(chemicals),
                quantity_liters: faker.number.int({ min: 50, max: 1000 }),
                purity_percent: faker.number.float({ min: 90, max: 99.9, fractionDigits: 1 }),
                location: faker.helpers.arrayElement(locations),
                last_inspected: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
                status: faker.helpers.arrayElement(['In Stock', 'In Transit', 'Processing', 'Depleted'])
            });
        }
        return data;
    };

    const generatePlayerProfiles = (rows = 456) => {
        const data = [];
        for (let i = 1; i <= rows; i++) {
            data.push({
                player_number: i.toString().padStart(3, '0'),
                age: faker.number.int({ min: 18, max: 80 }),
                gender: faker.person.sex(),
                debt_amount: faker.number.int({ min: 10000000, max: 500000000 }), // Won
                occupation: faker.person.jobTitle(),
                status: faker.helpers.arrayElement(['Eliminated', 'Active', 'Winner']),
                games_survived: faker.number.int({ min: 0, max: 6 })
            });
        }
        return data;
    };

    const generateWizardTransactions = (rows = 100) => {
        const data = [];
        const currencies = ['Galleon', 'Sickle', 'Knut'];
        const types = ['Deposit', 'Withdrawal', 'Transfer', 'Currency Exchange'];

        for (let i = 0; i < rows; i++) {
            data.push({
                transaction_id: faker.string.uuid(),
                date: faker.date.recent({ days: 365 }).toISOString().split('T')[0],
                vault_id: faker.number.int({ min: 100, max: 999 }),
                family_name: faker.person.lastName(),
                amount: faker.number.int({ min: 10, max: 5000 }),
                currency: faker.helpers.arrayElement(currencies),
                transaction_type: faker.helpers.arrayElement(types),
                goblin_teller: faker.person.firstName()
            });
        }
        return data;
    };

    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = '';

        for (let index in objArray[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (line !== '') line += ','

                line += JSON.stringify(array[i][index]);
            }
            str += line + '\r\n';
        }
        return str;
    };

    const downloadCSV = (data, filename) => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ============================================
    // OFFICE: Generador de ventas Dunder Mifflin - DETERMINÍSTICO
    // Misiones 1, 2, 3: Datos fijos para respuestas consistentes
    // ============================================
    const generateOfficeSalesData = () => {
        // DATOS 100% FIJOS - Respuestas siempre iguales
        // 4 productos, 4 vendedores, datos diseñados para respuestas específicas
        
        const fixedSales = [
            // ========== DWIGHT SCHRUTE - Total: $188,340 (TOP SELLER) ==========
            // Enero: $28,000
            { date: '2024-01-05', salesperson: 'Dwight Schrute', product: 'Premium Paper', quantity: 200, unitPrice: 45.00 },
            { date: '2024-01-12', salesperson: 'Dwight Schrute', product: 'Cardstock', quantity: 150, unitPrice: 52.00 },
            { date: '2024-01-20', salesperson: 'Dwight Schrute', product: 'Recycled Paper', quantity: 180, unitPrice: 35.00 },
            // Febrero: $22,000
            { date: '2024-02-08', salesperson: 'Dwight Schrute', product: 'Printer Paper', quantity: 250, unitPrice: 28.00 },
            { date: '2024-02-15', salesperson: 'Dwight Schrute', product: 'Premium Paper', quantity: 160, unitPrice: 48.00 },
            { date: '2024-02-25', salesperson: 'Dwight Schrute', product: 'Cardstock', quantity: 100, unitPrice: 55.00 },
            // Marzo: $25,000 (Jim gana este mes con $32,000)
            { date: '2024-03-05', salesperson: 'Dwight Schrute', product: 'Premium Paper', quantity: 180, unitPrice: 46.00 },
            { date: '2024-03-18', salesperson: 'Dwight Schrute', product: 'Recycled Paper', quantity: 220, unitPrice: 32.00 },
            { date: '2024-03-28', salesperson: 'Dwight Schrute', product: 'Printer Paper', quantity: 200, unitPrice: 25.00 },
            // Abril: $32,000
            { date: '2024-04-10', salesperson: 'Dwight Schrute', product: 'Premium Paper', quantity: 280, unitPrice: 50.00 },
            { date: '2024-04-22', salesperson: 'Dwight Schrute', product: 'Cardstock', quantity: 200, unitPrice: 54.00 },
            { date: '2024-04-30', salesperson: 'Dwight Schrute', product: 'Recycled Paper', quantity: 250, unitPrice: 30.00 },
            // Mayo: $30,000
            { date: '2024-05-08', salesperson: 'Dwight Schrute', product: 'Premium Paper', quantity: 220, unitPrice: 47.00 },
            { date: '2024-05-15', salesperson: 'Dwight Schrute', product: 'Printer Paper', quantity: 300, unitPrice: 26.00 },
            { date: '2024-05-25', salesperson: 'Dwight Schrute', product: 'Cardstock', quantity: 180, unitPrice: 53.00 },
            // Junio: $28,000
            { date: '2024-06-05', salesperson: 'Dwight Schrute', product: 'Premium Paper', quantity: 200, unitPrice: 48.00 },
            { date: '2024-06-18', salesperson: 'Dwight Schrute', product: 'Recycled Paper', quantity: 240, unitPrice: 33.00 },
            { date: '2024-06-28', salesperson: 'Dwight Schrute', product: 'Printer Paper', quantity: 220, unitPrice: 27.00 },
            // Julio-Dic adicionales
            { date: '2024-07-10', salesperson: 'Dwight Schrute', product: 'Premium Paper', quantity: 190, unitPrice: 46.00 },
            { date: '2024-08-15', salesperson: 'Dwight Schrute', product: 'Cardstock', quantity: 160, unitPrice: 51.00 },
            
            // ========== JIM HALPERT - Total: $172,940 ==========
            // Enero: $24,000
            { date: '2024-01-08', salesperson: 'Jim Halpert', product: 'Premium Paper', quantity: 180, unitPrice: 44.00 },
            { date: '2024-01-18', salesperson: 'Jim Halpert', product: 'Cardstock', quantity: 140, unitPrice: 50.00 },
            { date: '2024-01-25', salesperson: 'Jim Halpert', product: 'Recycled Paper', quantity: 160, unitPrice: 34.00 },
            // Febrero: $20,000
            { date: '2024-02-05', salesperson: 'Jim Halpert', product: 'Printer Paper', quantity: 220, unitPrice: 27.00 },
            { date: '2024-02-12', salesperson: 'Jim Halpert', product: 'Premium Paper', quantity: 150, unitPrice: 47.00 },
            { date: '2024-02-22', salesperson: 'Jim Halpert', product: 'Cardstock', quantity: 90, unitPrice: 53.00 },
            // Marzo: $32,000 (JIM WINS THIS MONTH!)
            { date: '2024-03-02', salesperson: 'Jim Halpert', product: 'Premium Paper', quantity: 250, unitPrice: 48.00 },
            { date: '2024-03-12', salesperson: 'Jim Halpert', product: 'Cardstock', quantity: 200, unitPrice: 55.00 },
            { date: '2024-03-22', salesperson: 'Jim Halpert', product: 'Recycled Paper', quantity: 280, unitPrice: 35.00 },
            // Abril: $26,000
            { date: '2024-04-08', salesperson: 'Jim Halpert', product: 'Premium Paper', quantity: 200, unitPrice: 46.00 },
            { date: '2024-04-18', salesperson: 'Jim Halpert', product: 'Printer Paper', quantity: 280, unitPrice: 28.00 },
            { date: '2024-04-28', salesperson: 'Jim Halpert', product: 'Cardstock', quantity: 150, unitPrice: 52.00 },
            // Mayo: $24,000
            { date: '2024-05-05', salesperson: 'Jim Halpert', product: 'Premium Paper', quantity: 180, unitPrice: 45.00 },
            { date: '2024-05-12', salesperson: 'Jim Halpert', product: 'Recycled Paper', quantity: 200, unitPrice: 33.00 },
            { date: '2024-05-22', salesperson: 'Jim Halpert', product: 'Printer Paper', quantity: 250, unitPrice: 26.00 },
            // Junio: $22,000
            { date: '2024-06-08', salesperson: 'Jim Halpert', product: 'Premium Paper', quantity: 170, unitPrice: 47.00 },
            { date: '2024-06-15', salesperson: 'Jim Halpert', product: 'Cardstock', quantity: 130, unitPrice: 54.00 },
            { date: '2024-06-25', salesperson: 'Jim Halpert', product: 'Recycled Paper', quantity: 180, unitPrice: 32.00 },
            // Julio-Dic adicionales
            { date: '2024-07-15', salesperson: 'Jim Halpert', product: 'Premium Paper', quantity: 160, unitPrice: 45.00 },
            { date: '2024-08-20', salesperson: 'Jim Halpert', product: 'Printer Paper', quantity: 200, unitPrice: 27.00 },
            
            // ========== PHYLLIS VANCE - Total: $124,500 ==========
            { date: '2024-01-10', salesperson: 'Phyllis Vance', product: 'Premium Paper', quantity: 150, unitPrice: 43.00 },
            { date: '2024-01-22', salesperson: 'Phyllis Vance', product: 'Cardstock', quantity: 120, unitPrice: 51.00 },
            { date: '2024-02-10', salesperson: 'Phyllis Vance', product: 'Recycled Paper', quantity: 170, unitPrice: 33.00 },
            { date: '2024-02-20', salesperson: 'Phyllis Vance', product: 'Printer Paper', quantity: 200, unitPrice: 26.00 },
            { date: '2024-03-08', salesperson: 'Phyllis Vance', product: 'Premium Paper', quantity: 160, unitPrice: 45.00 },
            { date: '2024-03-25', salesperson: 'Phyllis Vance', product: 'Cardstock', quantity: 140, unitPrice: 52.00 },
            { date: '2024-04-12', salesperson: 'Phyllis Vance', product: 'Recycled Paper', quantity: 180, unitPrice: 31.00 },
            { date: '2024-04-25', salesperson: 'Phyllis Vance', product: 'Premium Paper', quantity: 170, unitPrice: 44.00 },
            { date: '2024-05-10', salesperson: 'Phyllis Vance', product: 'Printer Paper', quantity: 220, unitPrice: 25.00 },
            { date: '2024-05-28', salesperson: 'Phyllis Vance', product: 'Cardstock', quantity: 130, unitPrice: 50.00 },
            { date: '2024-06-10', salesperson: 'Phyllis Vance', product: 'Premium Paper', quantity: 145, unitPrice: 46.00 },
            { date: '2024-06-22', salesperson: 'Phyllis Vance', product: 'Recycled Paper', quantity: 160, unitPrice: 32.00 },
            { date: '2024-07-08', salesperson: 'Phyllis Vance', product: 'Printer Paper', quantity: 190, unitPrice: 27.00 },
            { date: '2024-08-12', salesperson: 'Phyllis Vance', product: 'Cardstock', quantity: 110, unitPrice: 53.00 },
            
            // ========== STANLEY HUDSON - Total: $108,220 ==========
            { date: '2024-01-15', salesperson: 'Stanley Hudson', product: 'Premium Paper', quantity: 130, unitPrice: 42.00 },
            { date: '2024-01-28', salesperson: 'Stanley Hudson', product: 'Cardstock', quantity: 100, unitPrice: 50.00 },
            { date: '2024-02-14', salesperson: 'Stanley Hudson', product: 'Recycled Paper', quantity: 150, unitPrice: 32.00 },
            { date: '2024-02-28', salesperson: 'Stanley Hudson', product: 'Printer Paper', quantity: 180, unitPrice: 25.00 },
            { date: '2024-03-12', salesperson: 'Stanley Hudson', product: 'Premium Paper', quantity: 140, unitPrice: 44.00 },
            { date: '2024-03-28', salesperson: 'Stanley Hudson', product: 'Cardstock', quantity: 115, unitPrice: 51.00 },
            { date: '2024-04-15', salesperson: 'Stanley Hudson', product: 'Recycled Paper', quantity: 160, unitPrice: 30.00 },
            { date: '2024-04-28', salesperson: 'Stanley Hudson', product: 'Premium Paper', quantity: 150, unitPrice: 43.00 },
            { date: '2024-05-14', salesperson: 'Stanley Hudson', product: 'Printer Paper', quantity: 200, unitPrice: 24.00 },
            { date: '2024-05-30', salesperson: 'Stanley Hudson', product: 'Cardstock', quantity: 105, unitPrice: 49.00 },
            { date: '2024-06-12', salesperson: 'Stanley Hudson', product: 'Premium Paper', quantity: 125, unitPrice: 45.00 },
            { date: '2024-06-28', salesperson: 'Stanley Hudson', product: 'Recycled Paper', quantity: 140, unitPrice: 31.00 },
            { date: '2024-07-12', salesperson: 'Stanley Hudson', product: 'Printer Paper', quantity: 170, unitPrice: 26.00 },
            { date: '2024-08-08', salesperson: 'Stanley Hudson', product: 'Cardstock', quantity: 95, unitPrice: 52.00 },
        ];
        
        // Generar filas con IDs y cálculos
        const data = fixedSales.map((sale, i) => {
            const amount = Math.round(sale.quantity * sale.unitPrice * 100) / 100;
            const cost = Math.round(amount * 0.65 * 100) / 100;
            return {
                saleId: `DM-${String(i + 1).padStart(5, '0')}`,
                date: sale.date,
                salesperson: sale.salesperson,
                product: sale.product,
                customer: 'Various',
                branch: 'Scranton',
                quantity: sale.quantity,
                unitPrice: sale.unitPrice,
                amount: amount,
                cost: cost
            };
        });
        
        // Calcular Answer Key
        const totalAmount = Math.round(data.reduce((sum, r) => sum + r.amount, 0) * 100) / 100;
        const uniqueProducts = new Set(data.map(r => r.product)).size;
        const avgTicket = Math.round(totalAmount / data.length);
        
        // Ventas por vendedor
        const salesBySeller = {};
        data.forEach(r => {
            salesBySeller[r.salesperson] = (salesBySeller[r.salesperson] || 0) + r.amount;
        });
        
        // Ventas por vendedor y mes
        const salesBySellerMonth = {};
        data.forEach(r => {
            const month = r.date.substring(5, 7);
            const key = `${r.salesperson}-${month}`;
            salesBySellerMonth[key] = (salesBySellerMonth[key] || 0) + r.amount;
        });
        
        // Top seller
        const topSeller = Object.entries(salesBySeller).sort((a, b) => b[1] - a[1])[0][0];
        
        // Diferencia Dwight - Jim
        const dwightTotal = Math.round(salesBySeller['Dwight Schrute'] || 0);
        const jimTotal = Math.round(salesBySeller['Jim Halpert'] || 0);
        const diffDwightJim = dwightTotal - jimTotal;
        
        // Mes donde Jim supera a Dwight
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let jimWinsMonth = null;
        for (let m = 1; m <= 12; m++) {
            const monthStr = String(m).padStart(2, '0');
            const dw = salesBySellerMonth[`Dwight Schrute-${monthStr}`] || 0;
            const jm = salesBySellerMonth[`Jim Halpert-${monthStr}`] || 0;
            if (jm > dw) {
                jimWinsMonth = monthNames[m - 1];
                break;
            }
        }
        
        return {
            data,
            answerKey: {
                // Misión 1
                totalRows: data.length,
                uniqueProducts: uniqueProducts,
                totalAmount: totalAmount,
                // Misión 2
                topSeller: topSeller,
                avgTicket: avgTicket,
                // Misión 3
                dwightTotal: dwightTotal,
                jimTotal: jimTotal,
                diffDwightJim: diffDwightJim,
                jimWinsMonth: jimWinsMonth
            }
        };
    };

    // ============================================
    // OFFICE: Generar datos fusionados (Scranton + Stamford) - DETERMINÍSTICO
    // Misión 4: La Fusión - 14 vendedores únicos, $1,250,000 total
    // ============================================
    const generateOfficeMergedData = () => {
        // Vendedores ÚNICOS (sin duplicados entre sucursales)
        const scrantonSellers = [
            'Dwight Schrute', 'Jim Halpert', 'Phyllis Vance', 'Stanley Hudson',
            'Andy Bernard', 'Michael Scott', 'Ryan Howard'
        ]; // 7 vendedores
        
        const stamfordSellers = [
            'Karen Filippelli', 'Josh Porter', 'Martin Nash', 'Tony Gardner',
            'Hannah Smoterich-Barr', 'Ben Nugent', 'Alex Miller'
        ]; // 7 vendedores diferentes
        
        // Total: 14 vendedores únicos
        
        const data = [];
        let saleId = 1;
        
        // Scranton: $875,000 (70%)
        const scrantonTargets = [
            { seller: 'Dwight Schrute', amount: 145000 },
            { seller: 'Jim Halpert', amount: 138000 },
            { seller: 'Phyllis Vance', amount: 125000 },
            { seller: 'Stanley Hudson', amount: 118000 },
            { seller: 'Andy Bernard', amount: 112000 },
            { seller: 'Michael Scott', amount: 130000 },
            { seller: 'Ryan Howard', amount: 107000 },
        ]; // Total: 875,000
        
        // Stamford: $375,000 (30%)
        const stamfordTargets = [
            { seller: 'Karen Filippelli', amount: 62000 },
            { seller: 'Josh Porter', amount: 58000 },
            { seller: 'Martin Nash', amount: 52000 },
            { seller: 'Tony Gardner', amount: 48000 },
            { seller: 'Hannah Smoterich-Barr', amount: 55000 },
            { seller: 'Ben Nugent', amount: 50000 },
            { seller: 'Alex Miller', amount: 50000 },
        ]; // Total: 375,000
        
        const products = ['Premium Paper', 'Cardstock', 'Recycled Paper', 'Printer Paper'];
        
        // Generar ventas Scranton
        scrantonTargets.forEach(target => {
            const numSales = 50;
            const avgAmount = target.amount / numSales;
            for (let i = 0; i < numSales; i++) {
                const variance = 1 + Math.sin(i * 0.5) * 0.15;
                const amount = Math.round(avgAmount * variance * 100) / 100;
                data.push({
                    saleId: `DM-${String(saleId++).padStart(5, '0')}`,
                    date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
                    salesperson: target.seller,
                    product: products[i % 4],
                    customer: 'Various',
                    branch: 'Scranton',
                    quantity: Math.round(amount / 45),
                    unitPrice: 45.00,
                    amount: amount,
                    cost: Math.round(amount * 0.65 * 100) / 100
                });
            }
        });
        
        // Generar ventas Stamford
        stamfordTargets.forEach(target => {
            const numSales = 30;
            const avgAmount = target.amount / numSales;
            for (let i = 0; i < numSales; i++) {
                const variance = 1 + Math.sin(i * 0.5) * 0.15;
                const amount = Math.round(avgAmount * variance * 100) / 100;
                data.push({
                    saleId: `ST-${String(saleId++).padStart(5, '0')}`,
                    date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
                    salesperson: target.seller,
                    product: products[i % 4],
                    customer: 'Various',
                    branch: 'Stamford',
                    quantity: Math.round(amount / 45),
                    unitPrice: 45.00,
                    amount: amount,
                    cost: Math.round(amount * 0.65 * 100) / 100
                });
            }
        });
        
        const totalAmount = Math.round(data.reduce((sum, r) => sum + r.amount, 0));
        const uniqueSellers = new Set(data.map(r => r.salesperson)).size;
        
        return {
            data,
            answerKey: {
                totalRows: data.length,
                uniqueSellers: uniqueSellers, // 14
                totalAmount: totalAmount, // ~1,250,000
                scrantonPercent: 70,
                stamfordPercent: 30
            }
        };
    };

    // ============================================
    // OFFICE: Datos de Golden Ticket (Blue Cross) - DETERMINÍSTICO
    // Misión 5: Pérdida por descuento y margen
    // ============================================
    const generateOfficeGoldenTicketData = () => {
        const data = [];
        
        // 95 ventas regulares (sin billete dorado)
        const regularBase = [
            { quantity: 500, unitPrice: 45.00 },
            { quantity: 650, unitPrice: 42.00 },
            { quantity: 580, unitPrice: 48.00 },
            { quantity: 720, unitPrice: 40.00 },
            { quantity: 550, unitPrice: 46.00 },
            { quantity: 680, unitPrice: 44.00 },
            { quantity: 620, unitPrice: 43.00 },
            { quantity: 700, unitPrice: 41.00 },
            { quantity: 560, unitPrice: 47.00 },
            { quantity: 640, unitPrice: 45.00 },
        ];
        
        for (let i = 0; i < 95; i++) {
            const template = regularBase[i % 10];
            const variance = 1 + Math.sin(i * 0.3) * 0.08;
            const quantity = Math.round(template.quantity * variance);
            const unitPrice = Math.round(template.unitPrice * variance * 100) / 100;
            const amount = Math.round(quantity * unitPrice * 100) / 100;
            const cost = Math.round(amount * 0.65 * 100) / 100;
            
            data.push({
                saleId: `BC-${String(i + 1).padStart(4, '0')}`,
                date: `2024-${String(Math.floor(i / 8) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
                customer: 'Blue Cross',
                product: ['Premium Paper', 'Cardstock', 'Printer Paper'][i % 3],
                quantity: quantity,
                unitPrice: unitPrice,
                amount: amount,
                cost: cost,
                goldenTicket: false,
                discountApplied: 0,
                originalAmount: amount
            });
        }
        
        // 5 ventas con Golden Ticket (10% descuento) - GRANDES
        const goldenSales = [
            { quantity: 2000, unitPrice: 45.00 },
            { quantity: 2200, unitPrice: 42.00 },
            { quantity: 1800, unitPrice: 48.00 },
            { quantity: 2500, unitPrice: 40.00 },
            { quantity: 2000, unitPrice: 46.00 },
        ];
        
        goldenSales.forEach((sale, i) => {
            const originalAmount = sale.quantity * sale.unitPrice;
            const discountedAmount = Math.round(originalAmount * 0.90 * 100) / 100;
            const cost = Math.round(originalAmount * 0.65 * 100) / 100;
            
            data.push({
                saleId: `BC-${String(96 + i).padStart(4, '0')}`,
                date: `2024-${String(i + 1).padStart(2, '0')}-15`,
                customer: 'Blue Cross',
                product: 'Premium Paper',
                quantity: sale.quantity,
                unitPrice: sale.unitPrice,
                amount: discountedAmount,
                cost: cost,
                goldenTicket: true,
                discountApplied: 0.10,
                originalAmount: originalAmount
            });
        });
        
        // Calcular métricas
        const goldenRows = data.filter(r => r.goldenTicket);
        
        const totalOriginalGolden = goldenRows.reduce((s, r) => s + r.originalAmount, 0);
        const totalDiscountedGolden = goldenRows.reduce((s, r) => s + r.amount, 0);
        const totalCostGolden = goldenRows.reduce((s, r) => s + r.cost, 0);
        
        // Pérdida neta = ingresos que se dejaron de recibir
        const lossFromDiscount = Math.round(totalOriginalGolden - totalDiscountedGolden);
        
        // Margen % post-descuento = (Venta - Costo) / Venta * 100
        const marginWithDiscount = Math.round((totalDiscountedGolden - totalCostGolden) / totalDiscountedGolden * 100);
        
        return {
            data,
            answerKey: {
                totalRows: data.length,
                goldenTicketCount: goldenRows.length,
                lossFromDiscount: lossFromDiscount,
                marginWithDiscount: marginWithDiscount,
                totalOriginalGolden: Math.round(totalOriginalGolden),
                totalDiscountedGolden: Math.round(totalDiscountedGolden),
                totalCostGolden: Math.round(totalCostGolden)
            }
        };
    };

    // ============================================
    // OFFICE: Generador de clientes sucios (Misión 1b - Toby)
    // Datos DETERMINÍSTICOS para respuestas consistentes
    // ============================================
    const generateOfficeDirtyClients = () => {
        // DATOS FIJOS - NO ALEATORIOS - para que las respuestas siempre sean iguales
        const data = [
            // 12 clientes con nombres que NECESITAN corrección (mayúsculas, minúsculas, mezcla)
            { clientId: 'CLI-001', nameOriginal: 'JOHN SMITH', nameExpected: 'John Smith', email: 'john.smith@dundermifflin.com', phone: '(570) 555-0101', dateJoined: '01/15/2023' },
            { clientId: 'CLI-002', nameOriginal: 'mary johnson', nameExpected: 'Mary Johnson', email: 'mary.j@bluecross.org', phone: '570-555-0102', dateJoined: '2023-02-20' },
            { clientId: 'CLI-003', nameOriginal: 'rOBERT wILLIAMS', nameExpected: 'Robert Williams', email: 'rwilliams@acme.com', phone: '570.555.0103', dateJoined: '03-15-2023' },
            { clientId: 'CLI-004', nameOriginal: 'PATRICIA BROWN', nameExpected: 'Patricia Brown', email: 'pbrown@lackacount', phone: '(570)555-0104', dateJoined: '15/04/2023' },
            { clientId: 'CLI-005', nameOriginal: 'jennifer davis', nameExpected: 'Jennifer Davis', email: 'jdavis', phone: '570 555 0105', dateJoined: '2023/05/10' },
            { clientId: 'CLI-006', nameOriginal: 'mICHAEL mILLER', nameExpected: 'Michael Miller', email: null, phone: '570-555-0106', dateJoined: '06-20-2023' },
            { clientId: 'CLI-007', nameOriginal: 'LINDA WILSON', nameExpected: 'Linda Wilson', email: 'lwilson@hospital.org', phone: '(570) 555-0107', dateJoined: '2023-07-15' },
            { clientId: 'CLI-008', nameOriginal: 'david moore', nameExpected: 'David Moore', email: 'dmoore@school.edu', phone: '570-555-0108', dateJoined: '08/01/2023' },
            { clientId: 'CLI-009', nameOriginal: 'sUSAN tAYLOR', nameExpected: 'Susan Taylor', email: 'staylor.invalid', phone: '570.555.0109', dateJoined: '2023-09-10' },
            { clientId: 'CLI-010', nameOriginal: 'JAMES ANDERSON', nameExpected: 'James Anderson', email: 'janderson@poorrichards.com', phone: '(570)555-0110', dateJoined: '10-15-2023' },
            { clientId: 'CLI-011', nameOriginal: 'karen thomas', nameExpected: 'Karen Thomas', email: 'kthomas@bobvance.com', phone: '570 555 0111', dateJoined: '2023/11/20' },
            { clientId: 'CLI-012', nameOriginal: 'cHRIS jACKSON', nameExpected: 'Chris Jackson', email: 'cjackson@apex.tech', phone: '570-555-0112', dateJoined: '12-01-2023' },
            
            // 8 clientes con nombres CORRECTOS (ya en formato Title Case)
            { clientId: 'CLI-013', nameOriginal: 'Emily White', nameExpected: 'Emily White', email: 'ewhite@dundermifflin.com', phone: '570-555-0113', dateJoined: '2023-01-25' },
            { clientId: 'CLI-014', nameOriginal: 'Daniel Harris', nameExpected: 'Daniel Harris', email: 'dharris@bluecross.org', phone: '570-555-0114', dateJoined: '2023-02-28' },
            { clientId: 'CLI-015', nameOriginal: 'Sarah Martin', nameExpected: 'Sarah Martin', email: '', phone: '570-555-0115', dateJoined: '2023-03-30' },
            { clientId: 'CLI-016', nameOriginal: 'Christopher Garcia', nameExpected: 'Christopher Garcia', email: 'cgarcia@lackacount.gov', phone: '570-555-0116', dateJoined: '2023-04-15' },
            { clientId: 'CLI-017', nameOriginal: 'Amanda Martinez', nameExpected: 'Amanda Martinez', email: 'amartinez@acme.com', phone: '570-555-0117', dateJoined: '2023-05-20' },
            { clientId: 'CLI-018', nameOriginal: 'Matthew Robinson', nameExpected: 'Matthew Robinson', email: 'mrobinson@hospital.org', phone: '570-555-0118', dateJoined: '2023-06-25' },
            { clientId: 'CLI-019', nameOriginal: 'Jessica Clark', nameExpected: 'Jessica Clark', email: '@invalid.com', phone: '570-555-0119', dateJoined: '2023-07-30' },
            { clientId: 'CLI-020', nameOriginal: 'Andrew Lewis', nameExpected: 'Andrew Lewis', email: 'alewis@school.edu', phone: '570-555-0120', dateJoined: '2023-08-15' }
        ];
        
        // Calcular respuestas correctas
        const answerKey = {
            // Pregunta 1: ¿Cuántos clientes tienen el nombre corregido?
            // Cuenta filas donde nameOriginal !== nameExpected
            correctedNames: data.filter(c => c.nameOriginal !== c.nameExpected).length, // = 12
            
            // Pregunta 2: ¿Cuántos emails inválidos detectaste?
            // Emails inválidos: null, vacío, sin @, @ al inicio, sin dominio válido
            invalidEmails: data.filter(c => {
                if (!c.email || c.email.trim() === '') return true;
                if (!c.email.includes('@')) return true;
                if (c.email.startsWith('@')) return true;
                if (c.email.indexOf('@') === c.email.length - 1) return true;
                // Sin punto después de @
                const afterAt = c.email.split('@')[1];
                if (!afterAt || !afterAt.includes('.')) return true;
                return false;
            }).length // = 6 (CLI-004, CLI-005, CLI-006, CLI-009, CLI-015, CLI-019)
        };
        
        return {
            data,
            answerKey,
            // Metadata para debug
            meta: {
                totalClients: data.length,
                correctedNamesDetail: data.filter(c => c.nameOriginal !== c.nameExpected).map(c => c.clientId),
                invalidEmailsDetail: data.filter(c => {
                    if (!c.email || c.email.trim() === '') return true;
                    if (!c.email.includes('@')) return true;
                    if (c.email.startsWith('@')) return true;
                    if (c.email.indexOf('@') === c.email.length - 1) return true;
                    const afterAt = c.email.split('@')[1];
                    if (!afterAt || !afterAt.includes('.')) return true;
                    return false;
                }).map(c => ({ id: c.clientId, email: c.email }))
            }
        };
    };

    // ============================================
    // STARK: Generador de reparaciones de trajes
    // ============================================
    const generateStarkSuitRepairs = (rows = 150, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const suits = [
            { name: 'Mark I', generation: 1 },
            { name: 'Mark III', generation: 1 },
            { name: 'Mark V', generation: 2 },
            { name: 'Mark VII', generation: 2 },
            { name: 'Mark XLII', generation: 3 },
            { name: 'Mark XLV (Ultron)', generation: 3 },
            { name: 'Mark XLVI (Civil War)', generation: 4 },
            { name: 'Mark L (Infinity War)', generation: 4 },
            { name: 'Mark LXXXV (Endgame)', generation: 5 },
            { name: 'Iron Spider', generation: 4 },
            { name: 'War Machine', generation: 3 },
            { name: 'Rescue (Pepper)', generation: 5 }
        ];
        const components = [
            'Repulsor', 'Arc Reactor', 'Flight Stabilizer', 'Helmet HUD', 
            'Armor Plating', 'Neural Interface', 'Weapons System', 'Nano-tech Unit'
        ];
        const damageTypes = ['Battle Damage', 'System Failure', 'Wear & Tear', 'EMP Damage', 'Structural Stress'];
        
        for (let i = 0; i < rows; i++) {
            const suit = faker.helpers.arrayElement(suits);
            const baseCost = suit.generation * 2000000; // Mayor generación = más costoso
            
            data.push({
                repairId: `STK-RPR-${String(i + 1).padStart(4, '0')}`,
                date: faker.date.between({ from: '2020-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
                suitName: suit.name,
                suitGeneration: suit.generation,
                component: faker.helpers.arrayElement(components),
                damageType: faker.helpers.arrayElement(damageTypes),
                repairCost: Math.round(baseCost * faker.number.float({ min: 0.1, max: 2.5, fractionDigits: 2 })),
                laborHours: faker.number.int({ min: 4, max: 200 }),
                severity: faker.helpers.arrayElement(['Minor', 'Moderate', 'Major', 'Critical']),
                technician: faker.helpers.arrayElement(['Tony Stark', 'F.R.I.D.A.Y.', 'Happy Hogan', 'Peter Parker'])
            });
        }
        return data;
    };

    // ============================================
    // STARK: Datos de Arc Reactors
    // ============================================
    const generateStarkArcReactors = (seed = null) => {
        if (seed) faker.seed(seed);
        return [
            { version: 'Mark I (Cave)', year: 2008, energyGW: 3.2, paladiumGrams: 25, efficiency: 0.128, status: 'Retired' },
            { version: 'Mark II', year: 2009, energyGW: 8.5, paladiumGrams: 18, efficiency: 0.472, status: 'Retired' },
            { version: 'Mark III (Vibranium)', year: 2010, energyGW: 15.0, paladiumGrams: 12, efficiency: 1.25, status: 'Retired' },
            { version: 'Mark IV (Synth Element)', year: 2010, energyGW: 42.0, paladiumGrams: 0, efficiency: 42.0, status: 'Active' },
            { version: 'Mark V (Nano-Core)', year: 2018, energyGW: 185.0, paladiumGrams: 0, efficiency: 185.0, status: 'Active' },
            { version: 'Mark VI (Bleeding Edge)', year: 2023, energyGW: 847.5, paladiumGrams: 0, efficiency: 847.5, status: 'Prototype' }
        ];
    };

    // ============================================
    // STARK: Misiones de Vengadores
    // ============================================
    const generateStarkAvengersMissions = (rows = 200, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const heroes = [
            'Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 
            'Hawkeye', 'Spider-Man', 'War Machine', 'Vision', 'Scarlet Witch'
        ];
        const missionTypes = ['Combat', 'Rescue', 'Infiltration', 'Defense', 'Recon'];
        const locations = ['New York', 'Sokovia', 'Wakanda', 'Tokyo', 'London', 'Space'];
        
        for (let i = 0; i < rows; i++) {
            const success = Math.random() > 0.13; // 87% tasa de éxito
            data.push({
                missionId: `AVN-${String(i + 1).padStart(4, '0')}`,
                date: faker.date.between({ from: '2012-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
                hero: faker.helpers.arrayElement(heroes),
                missionType: faker.helpers.arrayElement(missionTypes),
                location: faker.helpers.arrayElement(locations),
                duration: faker.number.int({ min: 1, max: 72 }),
                collateralDamage: faker.number.int({ min: 0, max: 500000000 }),
                civiliansRescued: success ? faker.number.int({ min: 0, max: 5000 }) : 0,
                status: success ? 'Success' : 'Failed',
                threat: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Extinction'])
            });
        }
        return data;
    };

    // ============================================
    // STARK: Proyectos I+D
    // ============================================
    const generateStarkRDProjects = (seed = null) => {
        if (seed) faker.seed(seed);
        return [
            { projectId: 'PRJ-001', name: 'Project Ultron', budget: 2500000000, spent: 4200000000, status: 'Cancelled', deviationPct: 0.68 },
            { projectId: 'PRJ-002', name: 'EDITH Glasses', budget: 850000000, spent: 978000000, status: 'Active', deviationPct: 0.15 },
            { projectId: 'PRJ-003', name: 'Nano-tech Suit', budget: 1200000000, spent: 1150000000, status: 'Completed', deviationPct: -0.04 },
            { projectId: 'PRJ-004', name: 'Rescue Armor', budget: 500000000, spent: 620000000, status: 'Completed', deviationPct: 0.24 },
            { projectId: 'PRJ-005', name: 'Arc Reactor VI', budget: 3000000000, spent: 2800000000, status: 'Active', deviationPct: -0.07 },
            { projectId: 'PRJ-006', name: 'Time GPS', budget: 100000000, spent: 450000000, status: 'Completed', deviationPct: 3.5 },
            { projectId: 'PRJ-007', name: 'Infinity Gauntlet', budget: 0, spent: 8500000000, status: 'Completed', deviationPct: null },
            { projectId: 'PRJ-008', name: 'Spider Drone Fleet', budget: 200000000, spent: 350000000, status: 'Active', deviationPct: 0.75 },
            { projectId: 'PRJ-009', name: 'Hulkbuster III', budget: 800000000, spent: 750000000, status: 'Active', deviationPct: -0.06 },
            { projectId: 'PRJ-010', name: 'Stealth Suit', budget: 150000000, spent: 142000000, status: 'Completed', deviationPct: -0.05 },
            { projectId: 'PRJ-011', name: 'SHIELD Helicarrier', budget: 5000000000, spent: 4800000000, status: 'Paused', deviationPct: -0.04 },
            { projectId: 'PRJ-012', name: 'Iron Legion', budget: 600000000, spent: 920000000, status: 'Cancelled', deviationPct: 0.53 }
        ];
    };

    // ============================================
    // SQUID GAME: Jugadores expandido
    // ============================================
    const generateSquidPlayers = (count = 456, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const occupations = [
            'Office Worker', 'Factory Worker', 'Business Owner (Bankrupt)', 'Gambler',
            'Former Doctor', 'Migrant Worker', 'Gang Member', 'Elderly Retiree',
            'Student', 'Unemployed', 'Taxi Driver', 'Stock Trader (Failed)'
        ];
        
        for (let i = 1; i <= count; i++) {
            const age = faker.number.int({ min: 18, max: 75 });
            const gender = faker.person.sex();
            const gamesSurvived = faker.number.int({ min: 0, max: 6 });
            let status = 'Eliminated';
            if (gamesSurvived === 6) status = 'Winner';
            else if (gamesSurvived > 0 && Math.random() > 0.9) status = 'Active';
            
            data.push({
                playerNumber: String(i).padStart(3, '0'),
                name: faker.person.fullName({ sex: gender }),
                age: age,
                gender: gender,
                debtAmount: faker.number.int({ min: 100000000, max: 10000000000 }), // Won
                occupation: faker.helpers.arrayElement(occupations),
                status: status,
                gamesSurvived: gamesSurvived,
                physicalScore: faker.number.int({ min: 20, max: 100 }),
                mentalScore: faker.number.int({ min: 20, max: 100 }),
                luckScore: faker.number.int({ min: 1, max: 100 }),
                eliminated_in_game: status === 'Eliminated' ? faker.number.int({ min: 1, max: 6 }) : null
            });
        }
        
        // Asegurar un ganador (Player 456)
        data[455].status = 'Winner';
        data[455].gamesSurvived = 6;
        data[455].eliminated_in_game = null;
        
        return data;
    };

    // ============================================
    // SQUID GAME: Resultados del Juego 1 (Luz Roja, Luz Verde)
    // ============================================
    const generateSquidGame1Results = (seed = null) => {
        if (seed) faker.seed(seed);
        const players = generateSquidPlayers(456, seed);
        
        return players.map((player, index) => {
            const row = faker.number.int({ min: 1, max: 10 });
            const column = faker.number.int({ min: 1, max: 20 });
            const reactionTime = faker.number.float({ min: 0.5, max: 8, fractionDigits: 2 });
            
            // Supervivencia basada en posición y tiempo de reacción
            const eliminated = player.gamesSurvived === 0 || 
                              (player.eliminated_in_game === 1);
            
            return {
                playerNumber: player.playerNumber,
                name: player.name,
                startRow: row,
                startColumn: column,
                reactionTime: reactionTime,
                distanceCovered: eliminated ? faker.number.int({ min: 5, max: 85 }) : 100,
                timeToFinish: eliminated ? null : faker.number.float({ min: 180, max: 298, fractionDigits: 1 }),
                status: eliminated ? 'Eliminated' : 'Survived',
                eliminationTime: eliminated ? faker.number.float({ min: 10, max: 295, fractionDigits: 1 }) : null
            };
        });
    };

    // ============================================
    // SQUID GAME: Apuestas de VIPs
    // ============================================
    const generateSquidVIPBets = (seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const games = [
            'Red Light Green Light', 'Honeycomb', 'Tug of War', 
            'Marbles', 'Glass Bridge', 'Squid Game'
        ];
        
        for (let vip = 1; vip <= 7; vip++) {
            for (const game of games) {
                data.push({
                    vipId: `VIP-${vip}`,
                    game: game,
                    betAmount: faker.number.int({ min: 1000000000, max: 50000000000 }),
                    playerBetOn: String(faker.number.int({ min: 1, max: 456 })).padStart(3, '0'),
                    outcome: faker.helpers.arrayElement(['Won', 'Lost']),
                    payout: faker.number.int({ min: 0, max: 100000000000 })
                });
            }
        }
        return data;
    };

    // ============================================
    // SQUID GAME: Dataset completo
    // ============================================
    const generateSquidFullDataset = (seed = null) => {
        return {
            players: generateSquidPlayers(456, seed),
            game1Results: generateSquidGame1Results(seed),
            vipBets: generateSquidVIPBets(seed),
            eventCosts: {
                totalPrize: 45600000000,
                operationalCost: 8500000000,
                facilityMaintenance: 2100000000,
                staffPayroll: 1500000000,
                vipHospitality: 3200000000
            },
            statistics: {
                initialPlayers: 456,
                finalSurvivors: 1,
                survivalRate: 0.00219,
                averageDebt: 2850000000,
                totalDebtRecovered: 0,
                roi: 3.4
            }
        };
    };

    // ============================================
    // HOGWARTS: Transacciones de Gringotts
    // ============================================
    const generateHogwartsTransactions = (rows = 200, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const families = [
            'Potter', 'Black', 'Malfoy', 'Weasley', 'Longbottom', 
            'Lestrange', 'Diggory', 'Lovegood', 'Bones', 'Abbott'
        ];
        const currencies = ['Galleon', 'Sickle', 'Knut'];
        const transactionTypes = ['Deposit', 'Withdrawal', 'Transfer', 'Currency Exchange', 'Vault Fee'];
        const goblins = ['Griphook', 'Bogrod', 'Ragnok', 'Gornuk', 'Blordak'];
        
        for (let i = 0; i < rows; i++) {
            const currency = faker.helpers.arrayElement(currencies);
            let amount;
            if (currency === 'Galleon') amount = faker.number.int({ min: 10, max: 5000 });
            else if (currency === 'Sickle') amount = faker.number.int({ min: 50, max: 10000 });
            else amount = faker.number.int({ min: 500, max: 50000 });
            
            data.push({
                transactionId: `GR-${String(i + 1).padStart(5, '0')}`,
                date: faker.date.between({ from: '2020-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
                vaultNumber: faker.number.int({ min: 100, max: 999 }),
                familyName: faker.helpers.arrayElement(families),
                amount: amount,
                currency: currency,
                transactionType: faker.helpers.arrayElement(transactionTypes),
                goblinTeller: faker.helpers.arrayElement(goblins),
                securityLevel: faker.helpers.arrayElement(['Standard', 'High', 'Maximum'])
            });
        }
        return data;
    };

    // ============================================
    // HOGWARTS: Partidos de Quidditch
    // ============================================
    const generateHogwartsQuidditch = (seasons = 5, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
        const seekers = {
            'Gryffindor': ['Harry Potter', 'Ginny Weasley'],
            'Slytherin': ['Draco Malfoy', 'Terence Higgs'],
            'Ravenclaw': ['Cho Chang', 'Roger Davies'],
            'Hufflepuff': ['Cedric Diggory', 'Zacharias Smith']
        };
        
        let matchId = 1;
        for (let year = 0; year < seasons; year++) {
            // Cada casa juega contra las otras 3
            for (let i = 0; i < houses.length; i++) {
                for (let j = i + 1; j < houses.length; j++) {
                    const home = houses[i];
                    const away = houses[j];
                    const homeGoals = faker.number.int({ min: 3, max: 20 }) * 10;
                    const awayGoals = faker.number.int({ min: 3, max: 20 }) * 10;
                    const snitchCaughtBy = Math.random() > 0.5 ? home : away;
                    const homeTotal = homeGoals + (snitchCaughtBy === home ? 150 : 0);
                    const awayTotal = awayGoals + (snitchCaughtBy === away ? 150 : 0);
                    
                    data.push({
                        matchId: `QM-${String(matchId++).padStart(3, '0')}`,
                        season: 2020 + year,
                        homeTeam: home,
                        awayTeam: away,
                        homeGoals: homeGoals,
                        awayGoals: awayGoals,
                        snitchCaughtBy: snitchCaughtBy,
                        seeker: faker.helpers.arrayElement(seekers[snitchCaughtBy]),
                        homeTotal: homeTotal,
                        awayTotal: awayTotal,
                        winner: homeTotal > awayTotal ? home : away,
                        duration: faker.number.int({ min: 30, max: 480 }),
                        weather: faker.helpers.arrayElement(['Clear', 'Rainy', 'Windy', 'Stormy', 'Snowy'])
                    });
                }
            }
        }
        return data;
    };

    // ============================================
    // HOGWARTS: Estudiantes por casa
    // ============================================
    const generateHogwartsStudents = (rows = 400, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
        const bloodStatus = ['Pure-blood', 'Half-blood', 'Muggle-born'];
        const years = [1, 2, 3, 4, 5, 6, 7];
        
        // Distribución ligeramente sesgada para Slytherin con Pure-bloods
        for (let i = 0; i < rows; i++) {
            let house = faker.helpers.arrayElement(houses);
            let blood = faker.helpers.arrayElement(bloodStatus);
            
            // Simular sesgo histórico de Slytherin
            if (house === 'Slytherin' && blood === 'Muggle-born' && Math.random() > 0.1) {
                blood = 'Half-blood';
            }
            
            data.push({
                studentId: `STU-${String(i + 1).padStart(4, '0')}`,
                name: faker.person.fullName(),
                house: house,
                year: faker.helpers.arrayElement(years),
                bloodStatus: blood,
                wand: `${faker.helpers.arrayElement(['Holly', 'Oak', 'Vine', 'Yew', 'Elder', 'Willow'])} with ${faker.helpers.arrayElement(['Phoenix Feather', 'Dragon Heartstring', 'Unicorn Hair'])}`,
                patronus: faker.helpers.arrayElement(['Stag', 'Doe', 'Otter', 'Jack Russell', 'Phoenix', 'Wolf', 'Cat', 'Hare', null]),
                owlCount: faker.number.int({ min: 0, max: 12 }),
                prefect: Math.random() > 0.9,
                quidditch: Math.random() > 0.85
            });
        }
        return data;
    };

    // ============================================
    // HOGWARTS: Profesores de DCAO
    // ============================================
    const generateHogwartsDCAOProfessors = () => {
        return [
            { name: 'Galatea Merrythought', startYear: 1895, endYear: 1945, tenureMonths: 600, terminationReason: 'Retirement', preCurse: true },
            { name: 'Unknown Professor', startYear: 1945, endYear: 1956, tenureMonths: 132, terminationReason: 'Unknown', preCurse: true },
            { name: 'Quirinus Quirrell', startYear: 1991, endYear: 1992, tenureMonths: 10, terminationReason: 'Death', preCurse: false },
            { name: 'Gilderoy Lockhart', startYear: 1992, endYear: 1993, tenureMonths: 10, terminationReason: 'Memory Loss', preCurse: false },
            { name: 'Remus Lupin', startYear: 1993, endYear: 1994, tenureMonths: 10, terminationReason: 'Resignation (Werewolf exposed)', preCurse: false },
            { name: 'Barty Crouch Jr (as Moody)', startYear: 1994, endYear: 1995, tenureMonths: 10, terminationReason: 'Imprisonment', preCurse: false },
            { name: 'Dolores Umbridge', startYear: 1995, endYear: 1996, tenureMonths: 10, terminationReason: 'Centaur Attack', preCurse: false },
            { name: 'Severus Snape', startYear: 1996, endYear: 1997, tenureMonths: 10, terminationReason: 'Promoted to Headmaster', preCurse: false },
            { name: 'Amycus Carrow', startYear: 1997, endYear: 1998, tenureMonths: 10, terminationReason: 'Arrested (Death Eater)', preCurse: false }
        ];
    };

    // ============================================
    // HOGWARTS: Resultados de exámenes
    // ============================================
    const generateHogwartsExams = (rows = 500, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const subjects = [
            'Transfiguration', 'Charms', 'Potions', 'History of Magic', 
            'DADA', 'Herbology', 'Astronomy', 'Care of Magical Creatures',
            'Divination', 'Arithmancy', 'Ancient Runes', 'Muggle Studies'
        ];
        const grades = ['O', 'E', 'A', 'P', 'D', 'T']; // Outstanding to Troll
        const gradeWeights = [0.15, 0.25, 0.30, 0.15, 0.10, 0.05]; // Distribución realista
        
        const students = generateHogwartsStudents(100, seed);
        
        for (const student of students) {
            if (student.year >= 5) { // Solo años 5+ toman O.W.L.s
                const numSubjects = faker.number.int({ min: 5, max: 10 });
                const selectedSubjects = faker.helpers.arrayElements(subjects, numSubjects);
                
                for (const subject of selectedSubjects) {
                    // Asignar nota basada en pesos
                    const rand = Math.random();
                    let cumulative = 0;
                    let grade = 'A';
                    for (let i = 0; i < grades.length; i++) {
                        cumulative += gradeWeights[i];
                        if (rand <= cumulative) {
                            grade = grades[i];
                            break;
                        }
                    }
                    
                    data.push({
                        examId: `OWL-${String(data.length + 1).padStart(5, '0')}`,
                        studentId: student.studentId,
                        studentName: student.name,
                        house: student.house,
                        year: student.year,
                        subject: subject,
                        examType: 'O.W.L.',
                        grade: grade,
                        passed: ['O', 'E', 'A'].includes(grade),
                        examYear: 2024
                    });
                }
            }
        }
        return data;
    };

    return {
        generateTreasuryData,
        generateSalesData,
        generateChemicalInventory,
        generatePlayerProfiles,
        generateWizardTransactions,
        // DataRescue generators
        generateDataRescueTruth,
        generateDataRescueBundle,
        generateDataRescueDuplicated,
        generateDataRescueDuplicatedBundle,
        corruptDataRescueData,
        calculateDataRescueAnswerKey,
        calculateDataRescueStepKey,
        getDataRescueFixedSpec,
        generateDataRescueFixedDataset,
        // Office generators
        generateOfficeSalesData,
        generateOfficeMergedData,
        generateOfficeGoldenTicketData,
        generateOfficeDirtyClients,
        // Utility: generar emails desde nombres de clientes (sanitiza apostrofes)
        generateClientsWithEmails,
        // Stark generators
        generateStarkSuitRepairs,
        generateStarkArcReactors,
        generateStarkAvengersMissions,
        generateStarkRDProjects,
        // Squid Game generators
        generateSquidPlayers,
        generateSquidGame1Results,
        generateSquidVIPBets,
        generateSquidFullDataset,
        // Hogwarts generators
        generateHogwartsTransactions,
        generateHogwartsQuidditch,
        generateHogwartsStudents,
        generateHogwartsDCAOProfessors,
        generateHogwartsExams,
        downloadCSV
    };
};
