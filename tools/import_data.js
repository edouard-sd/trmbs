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
  
  // First part = prénom, second = nom
  // Remaining parts = roles
  const firstName = parts[0].replace(/-/g, '-'); // keep hyphens in compound names
  const lastName = parts[1].replace(/-/g, '-');
  const role = parts.length > 2 ? parts[2] : '';
  const roleTransverse = parts.length > 3 ? parts[3] : '';
  
  return { firstName, lastName, role, roleTransverse };
}

// Format role for display
function formatRole(role, roleTransverse) {
  const roles = [];
  if (role) roles.push(role);
  if (roleTransverse) roles.push(roleTransverse);
  
  return roles.join(' / ')
    .replace(/Head([A-Z])/g, 'Head $1')  // "HeadLOGI" -> "Head LOGI"
    .replace(/head([A-Z])/g, 'Head $1')
    .replace(/HEAD/g, 'Head')
    .replace(/^Head$/, 'Responsable')
    .replace(/Head /, 'Resp. ')
    .replace(/HeadOf/, 'Resp. ')
    .replace('Président', 'Président')
    .replace('President', 'Président')
    .replace('VP', 'Vice-Président(e)')
    .replace('RSE', 'RSE')
    .replace('ROO', 'ROO')
    .replace('Career', 'Career')
    .replace('Membres', 'Membres')
    .replace('Headinterasso', 'Resp. Inter-Asso')
    .replace('HeadROO', 'Resp. ROO')
    .replace('HEADCampus', 'Resp. Campus')
    .replace('HeadSecretary', 'Resp. Secrétariat')
    .replace('HeadTreasury', 'Resp. Trésorerie')
    .replace('HeadTRAVEL', 'Resp. Travel')
    .replace('HeadComm', 'Resp. Communication')
    .replace('HeadAnim', 'Resp. Animation')
    .replace('HeadIS', 'Resp. IS')
    .replace('HeadEvent', 'Resp. Événements')
    .replace('HeadTravel', 'Resp. Travel')
    .replace('HeadCVEC', 'Resp. CVEC')
    .replace('HeadLOGI', 'Resp. Logistique')
    .replace('HeadSecurity', 'Resp. Sécurité')
    .replace('HeadCareer', 'Resp. Career')
    .replace('HeadAmbass', 'Resp. Ambassadeurs')
    .replace('headsecurity', 'Resp. Sécurité');
}

function main() {
  const result = { lists: [] };
  
  // Read all list folders (KSK, PRK, RNK, TMK)
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
        
        // Copy photo to public/photos/LIST/POLE/
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
          role: formattedRole || 'Membre',
          photo: photoPath
        });
      }
      
      // Sort people: responsables first, then alphabetically
      poleData.people.sort((a, b) => {
        const aIsHead = a.role.includes('Resp.') || a.role.includes('Président');
        const bIsHead = b.role.includes('Resp.') || b.role.includes('Président');
        if (aIsHead && !bIsHead) return -1;
        if (!aIsHead && bIsHead) return 1;
        return a.lastName.localeCompare(b.lastName);
      });
      
      listData.poles.push(poleData);
    }
    
    // Sort poles alphabetically
    listData.poles.sort((a, b) => a.name.localeCompare(b.name));
    
    if (listData.poles.length > 0) {
      result.lists.push(listData);
    }
  }
  
  // Write JSON
  ensureDir(path.dirname(OUTPUT_JSON));
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2), 'utf-8');
  
  console.log(`✅ Import terminé !`);
  console.log(`   ${totalCopied} photos copiées`);
  console.log(`   ${result.lists.length} listes`);
  result.lists.forEach(l => {
    console.log(`   - ${l.name}: ${l.poles.length} pôles, ${l.poles.reduce((s, p) => s + p.people.length, 0)} personnes`);
  });
  console.log(`   JSON sauvé: ${OUTPUT_JSON}`);
}

main();
