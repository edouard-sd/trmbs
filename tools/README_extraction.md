# 🔍 Guide d'extraction des PDFs

## Prérequis

1. **Python 3.8+** installé ([télécharger ici](https://www.python.org/downloads/))
2. Installer les dépendances :

```bash
pip install PyMuPDF Pillow
```

## Utilisation

```bash
cd tools
python extract_pdf.py
```

Le script va :
- Parcourir **tous les PDFs** dans le dossier `trmbs/`
- Extraire les **photos** dans `public/photos/<POLE>/`
- Extraire les **noms et rôles** du texte
- Générer `public/data/people.json`

## ⚠️ Vérification manuelle

Le script est **semi-automatique**. Après l'exécution :

1. Ouvre `public/data/people.json`
2. Vérifie que chaque personne a le bon `firstName`, `lastName`, `role`
3. Vérifie que chaque `photo` pointe vers la bonne image
4. Supprime le champ `rawTexts` une fois satisfait
5. Ajoute les personnes manquantes si nécessaire

## Structure JSON attendue

```json
{
  "poles": [
    {
      "id": "PRK",
      "name": "Pôle PRK",
      "people": [
        {
          "id": "prk-001",
          "firstName": "Lucas",
          "lastName": "Dupont",
          "role": "Président",
          "photo": "photos/PRK/prk-001.jpg"
        }
      ]
    }
  ]
}
```
