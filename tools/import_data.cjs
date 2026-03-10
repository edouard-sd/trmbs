/**
 * Script to import real data from Trombis-dossier
 * Reads photos, extracts names/roles from filenames, copies photos, generates people.json
 */
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, '../../Trombis-dossier');
const PHOTOS_DIR = path.resolve(__dirname, '../public/photos');
const OUTPUT_JSON = path.resolve(__dirname, '../public/data/people.json');

// Ensure output dirs exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Parse filename like "Prénom_Nom_Role_RoleTransverse.png"
function parseFilename(filename) {
  const name = path.parse(filename).name; // remove extension
  const parts = name.split('_');
  
  if (parts.length < 2) {
    return { firstName: parts[0] || 'Unknown', lastName: '', role: '', roleTransverse: '' };
  }
  
  // Apply camelCase spacing to names (e.g. Nom1Nom2 -> Nom1 Nom2)
  const splitCamelCase = (str) => str ? str.replace(/([a-z])([A-Z])/g, '$1 $2') : '';

  const firstName = splitCamelCase(parts[0]);
  const lastName = splitCamelCase(parts[1]);
  const role = parts.length > 2 ? parts[2] : '';
  const roleTransverse = parts.length > 3 ? parts.slice(3).join(' ') : '';
  
  return { firstName, lastName, role, roleTransverse };
}

// Format role for display
function formatRole(role, roleTransverse) {
  const parts = [role, roleTransverse].filter(Boolean);
  if (parts.length === 0) return 'Membre';
  
  let display = parts.join(' / ');
  
  // Map common role codes
  const mappings = [
    [/^Président$/i, 'Président'],
    [/^President$/i, 'Président'],
    [/^VP$/i, 'Vice-Président(e)'],
    [/^Head$/i, 'Responsable'],
    [/^Resp\./, ''],
    [/HeadSecretary/i, 'Resp. Secrétariat'],
    [/HeadTreasury/i, 'Resp. Trésorerie'],
    [/HeadTRAVEL/i, 'Resp. Travel'],
    [/HeadTravel/i, 'Resp. Travel'],
    [/HeadComm/i, 'Resp. Communication'],
    [/HeadAnim/i, 'Resp. Animation'],
    [/HeadEvent/i, 'Resp. Événements'],
    [/HEADCampus/i, 'Resp. Campus'],
    [/HeadIS/i, 'Resp. IS'],
    [/HeadLOGI/i, 'Resp. Logistique'],
    [/HeadSecurity/i, 'Resp. Sécurité'],
    [/headsecurity/i, 'Resp. Sécurité'],
    [/HeadROO/i, 'Resp. ROO'],
    [/HeadCVEC/i, 'Resp. CVEC'],
    [/Headinterasso/i, 'Resp. Inter-Asso'],
    [/HeadAmbass/i, 'Resp. Ambassadeurs'],
    [/HeadCareer/i, 'Resp. Career'],
    [/HeadOfAccommodation/i, 'Resp. Hébergement'],
    [/Hebergement non/i, 'Head accomodation'],
    [/Respect of Others/i, 'ROO'],
    [/Carrer/i, 'Career'],
    [/Ambassadeursador/i, 'Ambassadeurs'],
  ];
  
  for (const [pattern, replacement] of mappings) {
    display = display.replace(pattern, replacement);
  }
  
  // Clean up "X" standalone (means cross-functional/transverse)
  display = display.replace(/\bX\b/, '').replace(/^\s*\/\s*/, '').replace(/\s*\/\s*$/, '').trim();
  
  // If still has raw codes, just clean up camelCase
  display = display.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  return display || 'Membre';
}

// Determine gender (M/F) from first name
function getGender(firstName, lastName = '') {
  const f = firstName.trim().toLowerCase();
  const full = `${firstName} ${lastName}`.trim().toLowerCase();
  
  // Specific exceptions from user
  if (full.includes('andrea zimbaldi')) return 'H';
  if (f === 'alvise') return 'H';
  if (full.includes('mathial keshavarz')) return 'H';
  if (f === 'matisse') return 'H';
  if (f === 'meyad') return 'H';
  if (f === 'sacha') return 'H';
  if (f === 'jinshen') return 'H';
  if (f === 'shuhan') return 'H';
  if (f === 'siyu') return 'H';
  
  // Explicit lists from user and common cases
  const females = new Set([
    'angèle', 'augustine', 'alice', 'alicia', 'alissa', 'amandine', 'anais', 'angelina', 'anna', 
    'anne-estelle', 'anne-gaëlle', 'armony', 'bianca', 'camille', 'capucine', 'carla', 'ceylin', 
    'charline', 'eleana', 'elise', 'elsa', 'eugenie', 'félicité', 'garance', 'haruna', 'heidi', 
    'héloïse', 'iroise', 'jeanne', 'johanne', 'juliette', 'louise', 'mathilde', 'margot', 'maria', 
    'marie', 'maryam', 'mayalen', 'mélodie', 'morgane', 'raphaëlle', 'salomé', 'sara lou', 'sarah', 
    'sofia', 'sophia', 'soraya', 'sveva', 'valentine', 'yiliana', 'zeynep', 'zheniya', 'andrea'
  ]);
  
  if (females.has(f)) return 'F';
  
  // Common female endings
  if (f.endsWith('ette') || f.endsWith('elle') || f.endsWith('ine') || f.endsWith('ie')) return 'F';
  
  // Default to Male 
  return 'H';
}

function main() {
  const result = { lists: [] };
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('❌ Dossier source non trouvé:', SOURCE_DIR);
    process.exit(1);
  }
  
  // Read all list folders
  const lists = fs.readdirSync(SOURCE_DIR).filter(f => {
    return fs.statSync(path.join(SOURCE_DIR, f)).isDirectory();
  });
  
  let totalCopied = 0;
  
  for (const listName of lists) {
    const listDir = path.join(SOURCE_DIR, listName);
    const poles = fs.readdirSync(listDir).filter(f => {
      return fs.statSync(path.join(listDir, f)).isDirectory();
    });
    
    const listData = {
      id: listName,
      name: `Liste ${listName}`,
      poles: []
    };
    
    for (const poleName of poles) {
      const poleDir = path.join(listDir, poleName);
      const photos = fs.readdirSync(poleDir).filter(f => {
        return /\.(png|jpg|jpeg)$/i.test(f);
      });
      
      if (photos.length === 0) continue;
      
      const poleData = {
        id: `${listName}_${poleName}`,
        name: poleName,
        people: []
      };
      
      for (const photo of photos) {
        const { firstName, lastName, role, roleTransverse } = parseFilename(photo);
        const formattedRole = formatRole(role, roleTransverse);
        
        // Copy photo
        const destDir = path.join(PHOTOS_DIR, listName, poleName);
        ensureDir(destDir);
        const destPath = path.join(destDir, photo);
        fs.copyFileSync(path.join(poleDir, photo), destPath);
        totalCopied++;
        
        // Photo path relative to public/
        const photoPath = `photos/${listName}/${poleName}/${photo}`;
        
        poleData.people.push({
          firstName,
          lastName,
          role: formatRole(role, ''), 
          roleTransverse: roleTransverse ? formatRole('', roleTransverse) : '',
          roleDisplay: formattedRole,
          gender: getGender(firstName, lastName),
          photo: photoPath,
          list: listName,
          pole: poleName
        });
      }
      
      // Sort: responsables first
      poleData.people.sort((a, b) => {
        const aIsHead = a.role.includes('Resp.') || a.role.includes('Président') || a.role.includes('Vice');
        const bIsHead = b.role.includes('Resp.') || b.role.includes('Président') || b.role.includes('Vice');
        if (aIsHead && !bIsHead) return -1;
        if (!aIsHead && bIsHead) return 1;
        return a.lastName.localeCompare(b.lastName);
      });
      
      listData.poles.push(poleData);
    }
    
    listData.poles.sort((a, b) => a.name.localeCompare(b.name));
    
    if (listData.poles.length > 0) {
      result.lists.push(listData);
    }
  }
  
  // Write JSON
  ensureDir(path.dirname(OUTPUT_JSON));
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2), 'utf-8');
  
  console.log('');
  console.log('=== IMPORT TERMINE ===');
  console.log(`   ${totalCopied} photos copiees`);
  console.log(`   ${result.lists.length} listes`);
  result.lists.forEach(l => {
    const total = l.poles.reduce((s, p) => s + p.people.length, 0);
    console.log(`   - ${l.name}: ${l.poles.length} poles, ${total} personnes`);
  });
  console.log(`   JSON: ${OUTPUT_JSON}`);
}

main();
