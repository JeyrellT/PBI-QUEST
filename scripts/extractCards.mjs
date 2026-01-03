/**
 * Script para extraer las páginas del PDF de cartas como imágenes PNG
 * Usando pdf-to-img (la forma más simple y sin dependencias externas)
 * Ejecutar con: node scripts/extractCards.mjs
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { pdf } from 'pdf-to-img';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const PDF_PATH = path.join(__dirname, '../Cartas/Cartas Juego.docx (1).pdf');
const OUTPUT_DIR = path.join(__dirname, '../public/images/cards');

// Mapeo de páginas a nombres de archivo
const PAGE_NAMES = {
    1: 'portada',
    2: 'datacorruptor',
    3: 'sumator',
    4: 'promediador',
    5: 'contador',
    6: 'filator',
    7: 'unica',
    8: 'maximo',
    9: 'minimo',
    10: 'decisor',
    11: 'conjuntor',
    12: 'alternador',
    13: 'comodin'
};

async function extractCards() {
    console.log('🎴 Iniciando extracción de cartas del PDF...\n');
    
    // Verificar que el PDF existe
    if (!fs.existsSync(PDF_PATH)) {
        console.error('❌ Error: No se encontró el archivo PDF en:', PDF_PATH);
        process.exit(1);
    }
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    try {
        console.log('📄 Convirtiendo PDF a imágenes...\n');
        
        let pageNum = 0;
        const document = await pdf(PDF_PATH, { scale: 2.0 });
        
        for await (const image of document) {
            pageNum++;
            const pageName = PAGE_NAMES[pageNum];
            
            if (!pageName) {
                console.log(`  ⏭️  Página ${pageNum}: ignorada (página en blanco o sin asignar)`);
                continue;
            }
            
            const outputPath = path.join(OUTPUT_DIR, `${pageName}.png`);
            fs.writeFileSync(outputPath, image);
            
            const sizeKB = Math.round(image.length / 1024);
            console.log(`  ✅ Página ${pageNum}: ${pageName}.png (${sizeKB} KB)`);
        }
        
        console.log('\n🎉 ¡Extracción completada exitosamente!');
        console.log(`📁 Las imágenes están en: ${OUTPUT_DIR}`);
        
        // Listar archivos generados
        console.log('\n📋 Archivos generados:');
        const finalFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
        finalFiles.forEach(f => {
            const stats = fs.statSync(path.join(OUTPUT_DIR, f));
            console.log(`  - ${f} (${Math.round(stats.size / 1024)} KB)`);
        });
        
    } catch (error) {
        console.error('❌ Error durante la extracción:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

extractCards();
