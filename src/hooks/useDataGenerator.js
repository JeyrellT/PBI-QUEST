import { faker } from '@faker-js/faker';

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
    // OFFICE: Generador de ventas Dunder Mifflin
    // ============================================
    const generateOfficeSalesData = (rows = 500, seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        const salespeople = [
            'Dwight Schrute', 'Jim Halpert', 'Phyllis Vance', 'Stanley Hudson', 
            'Andy Bernard', 'Michael Scott', 'Ryan Howard'
        ];
        const products = [
            'Premium Paper', 'Cardstock', 'Recycled Paper', 'Printer Paper', 
            'Colored Paper', 'Legal Pads', 'Envelopes', 'Labels'
        ];
        const customers = [
            'Blue Cross', 'Dunmore High School', 'Alfredo\'s Pizza Cafe', 
            'Poor Richard\'s', 'Lackawanna County', 'Michael Scott Paper Co',
            'Bob Vance Refrigeration', 'Cooper Tires', 'Apex Technology'
        ];
        const branches = ['Scranton', 'Stamford'];
        
        for (let i = 0; i < rows; i++) {
            const quantity = faker.number.int({ min: 10, max: 500 });
            const unitPrice = faker.number.float({ min: 15, max: 85, fractionDigits: 2 });
            const cost = unitPrice * faker.number.float({ min: 0.55, max: 0.75, fractionDigits: 2 });
            
            data.push({
                saleId: `DM-${String(i + 1).padStart(5, '0')}`,
                date: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
                salesperson: faker.helpers.arrayElement(salespeople),
                product: faker.helpers.arrayElement(products),
                customer: faker.helpers.arrayElement(customers),
                branch: faker.helpers.arrayElement(branches),
                quantity: quantity,
                unitPrice: unitPrice,
                amount: Math.round(quantity * unitPrice * 100) / 100,
                cost: Math.round(quantity * cost * 100) / 100,
                region: faker.helpers.arrayElement(['Northeast', 'Mid-Atlantic'])
            });
        }
        return data;
    };

    // ============================================
    // OFFICE: Generar datos fusionados (Scranton + Stamford)
    // ============================================
    const generateOfficeMergedData = (seed = null) => {
        const scranton = generateOfficeSalesData(350, seed).map(r => ({ ...r, branch: 'Scranton' }));
        const stamford = generateOfficeSalesData(200, seed ? seed + 1 : null).map(r => ({ ...r, branch: 'Stamford' }));
        
        // Cambiar algunos vendedores de Stamford
        const stamfordSellers = ['Karen Filippelli', 'Andy Bernard', 'Josh Porter', 'Martin Nash'];
        stamford.forEach(row => {
            row.salesperson = faker.helpers.arrayElement(stamfordSellers);
        });
        
        return [...scranton, ...stamford];
    };

    // ============================================
    // OFFICE: Datos de Golden Ticket (Blue Cross)
    // ============================================
    const generateOfficeGoldenTicketData = (seed = null) => {
        if (seed) faker.seed(seed);
        const data = [];
        
        // Todas las ventas de Blue Cross
        for (let i = 0; i < 100; i++) {
            const quantity = faker.number.int({ min: 100, max: 2000 });
            const unitPrice = faker.number.float({ min: 20, max: 60, fractionDigits: 2 });
            const cost = unitPrice * 0.65;
            const hasGoldenTicket = i < 5; // Los primeros 5 tienen billete dorado
            
            data.push({
                saleId: `BC-${String(i + 1).padStart(4, '0')}`,
                date: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
                customer: 'Blue Cross',
                product: faker.helpers.arrayElement(['Premium Paper', 'Cardstock', 'Printer Paper']),
                quantity: quantity,
                unitPrice: unitPrice,
                amount: Math.round(quantity * unitPrice * 100) / 100,
                cost: Math.round(quantity * cost * 100) / 100,
                goldenTicket: hasGoldenTicket,
                discountApplied: hasGoldenTicket ? 0.10 : 0
            });
        }
        return data;
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
