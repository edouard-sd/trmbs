#!/usr/bin/env python3
"""
=============================================================
  Script d'extraction de trombinoscopes PDF → JSON + images
=============================================================
Usage:
    pip install PyMuPDF Pillow
    python extract_pdf.py

Ce script parcourt tous les fichiers PDF du dossier parent,
extrait les images et le texte, et génère :
  - Un dossier public/photos/<POLE>/ avec les photos
  - Un fichier public/data/people.json avec les données structurées

⚠️ Le script est semi-automatique : il extrait tout ce qu'il peut,
mais tu devras vérifier et corriger le JSON résultant manuellement
car les PDFs peuvent avoir des formats très variés.
"""

import fitz  # PyMuPDF
import json
import os
import re
import sys
from pathlib import Path

# ── Configuration ─────────────────────────────────────────
# Dossier racine du projet (parent de tools/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = PROJECT_ROOT
PHOTOS_OUTPUT = PROJECT_ROOT / "public" / "photos"
JSON_OUTPUT = PROJECT_ROOT / "public" / "data" / "people.json"

# Mapping fichier PDF → identifiant du pôle
PDF_POLE_MAP = {
    "0. TROMBIS ACTUALISÉS .pdf": "ACTUALISES",
    "1. TROMBI-PRK.pdf": "PRK",
    "3. TROMBI-RNK.pdf": "RNK",
    "6. TROMBI-KMK.pdf": "KMK",
    "9. TRMOBIS-KSK et TMK.pdf": "KSK-TMK",
    "ATTRIBUTS-LISTES.pdf": "ATTRIBUTS",
    "AttributsCDP.pdf": "CDP",
    "Chronologie BDE.pdf": "BDE",
}

# Taille minimale d'image (en pixels) pour filtrer les logos/icônes
MIN_IMAGE_SIZE = 50  # largeur ET hauteur minimum


def extract_images_from_page(page, pole_id, page_num, photo_dir):
    """Extrait toutes les images d'une page PDF et les sauvegarde."""
    images = []
    image_list = page.get_images(full=True)
    
    for img_index, img_info in enumerate(image_list):
        xref = img_info[0]
        try:
            base_image = page.parent.extract_image(xref)
            if not base_image:
                continue
            
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            width = base_image.get("width", 0)
            height = base_image.get("height", 0)
            
            # Filtrer les petites images (logos, icônes, etc.)
            if width < MIN_IMAGE_SIZE or height < MIN_IMAGE_SIZE:
                continue
            
            # Générer un nom de fichier unique
            filename = f"{pole_id.lower()}-p{page_num:02d}-{img_index:02d}.{image_ext}"
            filepath = photo_dir / filename
            
            with open(filepath, "wb") as f:
                f.write(image_bytes)
            
            # Chemin relatif pour le JSON (depuis public/)
            relative_path = f"photos/{pole_id}/{filename}"
            images.append({
                "filepath": filepath,
                "relative_path": relative_path,
                "width": width,
                "height": height,
                "y_position": 0,  # sera mis à jour si possible
            })
            
        except Exception as e:
            print(f"  ⚠️ Erreur extraction image {img_index} page {page_num}: {e}")
    
    return images


def extract_text_blocks(page):
    """Extrait les blocs de texte d'une page avec leurs positions."""
    blocks = page.get_text("blocks")
    text_blocks = []
    
    for block in blocks:
        if block[6] == 0:  # Type texte (pas image)
            text = block[4].strip()
            if text:
                text_blocks.append({
                    "text": text,
                    "x0": block[0],
                    "y0": block[1],
                    "x1": block[2],
                    "y1": block[3],
                })
    
    return text_blocks


def parse_person_info(text):
    """
    Tente de parser un bloc de texte pour en extraire nom, prénom, rôle.
    Adapte cette fonction selon le format de tes PDFs !
    """
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    
    if not lines:
        return None
    
    person = {
        "firstName": "",
        "lastName": "",
        "role": "",
        "rawText": text,
    }
    
    if len(lines) >= 1:
        # Première ligne : souvent le nom complet
        name_parts = lines[0].split()
        if len(name_parts) >= 2:
            person["firstName"] = name_parts[0]
            person["lastName"] = " ".join(name_parts[1:])
        elif len(name_parts) == 1:
            person["lastName"] = name_parts[0]
    
    if len(lines) >= 2:
        # Deuxième ligne : souvent le rôle
        person["role"] = lines[1]
    
    return person


def process_pdf(pdf_path, pole_id):
    """Traite un fichier PDF complet et retourne les données extraites."""
    print(f"\n📄 Traitement de : {pdf_path.name}")
    print(f"   Pôle : {pole_id}")
    
    # Créer le dossier de sortie pour les photos
    photo_dir = PHOTOS_OUTPUT / pole_id
    photo_dir.mkdir(parents=True, exist_ok=True)
    
    people = []
    
    try:
        doc = fitz.open(str(pdf_path))
        total_pages = len(doc)
        print(f"   Pages : {total_pages}")
        
        for page_num in range(total_pages):
            page = doc[page_num]
            print(f"   → Page {page_num + 1}/{total_pages}")
            
            # Extraire images
            images = extract_images_from_page(page, pole_id, page_num + 1, photo_dir)
            print(f"     Photos trouvées : {len(images)}")
            
            # Extraire texte
            text_blocks = extract_text_blocks(page)
            print(f"     Blocs texte : {len(text_blocks)}")
            
            # Associer images et texte
            # Stratégie simple : pour chaque image, chercher le texte le plus proche en dessous
            for img in images:
                person_data = {
                    "id": f"{pole_id.lower()}-{len(people) + 1:03d}",
                    "firstName": "",
                    "lastName": "",
                    "role": "",
                    "photo": img["relative_path"],
                    "rawTexts": [],
                }
                
                # Collecter les textes proches de l'image
                for tb in text_blocks:
                    person_info = parse_person_info(tb["text"])
                    if person_info:
                        person_data["rawTexts"].append(tb["text"])
                        if not person_data["firstName"] and person_info["firstName"]:
                            person_data["firstName"] = person_info["firstName"]
                            person_data["lastName"] = person_info["lastName"]
                        if not person_data["role"] and person_info["role"]:
                            person_data["role"] = person_info["role"]
                
                people.append(person_data)
            
            # S'il y a du texte mais pas d'images, créer quand même des entrées
            if not images and text_blocks:
                for tb in text_blocks:
                    person_info = parse_person_info(tb["text"])
                    if person_info and (person_info["firstName"] or person_info["lastName"]):
                        people.append({
                            "id": f"{pole_id.lower()}-{len(people) + 1:03d}",
                            "firstName": person_info["firstName"],
                            "lastName": person_info["lastName"],
                            "role": person_info["role"],
                            "photo": "",
                            "rawTexts": [tb["text"]],
                        })
        
        doc.close()
        print(f"   ✅ Total personnes extraites : {len(people)}")
        
    except Exception as e:
        print(f"   ❌ Erreur : {e}")
    
    return people


def main():
    """Point d'entrée principal."""
    print("=" * 60)
    print("  🔍 Extraction des trombinoscopes PDF")
    print("=" * 60)
    
    # Créer les dossiers de sortie
    PHOTOS_OUTPUT.mkdir(parents=True, exist_ok=True)
    JSON_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    
    all_data = {"poles": []}
    
    # Lister les PDFs disponibles
    pdf_files = list(PDF_DIR.glob("*.pdf"))
    print(f"\n📁 PDFs trouvés : {len(pdf_files)}")
    
    for pdf_file in sorted(pdf_files):
        # Déterminer le pôle
        pole_id = PDF_POLE_MAP.get(pdf_file.name, pdf_file.stem.upper())
        
        people = process_pdf(pdf_file, pole_id)
        
        if people:
            all_data["poles"].append({
                "id": pole_id,
                "name": f"Pôle {pole_id}",
                "people": people,
            })
    
    # Sauvegarder le JSON
    with open(JSON_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'=' * 60}")
    print(f"  ✅ Extraction terminée !")
    print(f"  📁 Photos : {PHOTOS_OUTPUT}")
    print(f"  📄 JSON : {JSON_OUTPUT}")
    print(f"{'=' * 60}")
    
    # Résumé
    total_people = sum(len(p["people"]) for p in all_data["poles"])
    print(f"\n📊 Résumé :")
    print(f"   Pôles : {len(all_data['poles'])}")
    print(f"   Personnes : {total_people}")
    
    print("\n⚠️  IMPORTANT : Vérifie le fichier people.json !")
    print("   - Corrige les noms/prénoms mal extraits")
    print("   - Associe manuellement les photos aux bonnes personnes si besoin")
    print("   - Supprime le champ 'rawTexts' une fois les corrections faites")


if __name__ == "__main__":
    main()
