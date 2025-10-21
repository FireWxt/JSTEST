# TP — Gestionnaire de notes simple
 
Technos : HTML, CSS, JavaScript (vanilla). Bootstrap autorisé.  
Objectifs : manipuler le DOM, gérer événements, créer/éditer/supprimer des éléments, persister via localStorage, structurer du code modulaire.

## Rendu attendu
Une page avec :
- Formulaire (Titre, Description, bouton EditCreate) à gauche.
- Zone d’affichage des notes sous forme de cartes à droite.
- Fonctionnalités : créer une note, éditer en cliquant sur une note (préremplir le formulaire), mettre à jour via le bouton, supprimer via le bouton X.
- Validation minimale : empêcher création si le titre est vide.
- Bonus : persistance via localStorage, indication visuelle du mode édition.

## Installation rapide (flux local simple)
1. Cloner le repo / copier les fichiers fournis.
2. Ouvrir `public/index.html` dans le navigateur (ou servir avec Vite/serve si vous préférez).
3. Modifier / exécuter `src/main.js` si nécessaire.

## Structure proposée
- css/
  - style.css 
- js/
  - app.js
- README.md (ce fichier)

## Consignes de réalisation (pas à pas pour les étudiants)
1. Créer la mise en page : grille 2 colonnes (formulaire gauche, liste droite).
2. Implémenter `NoteForm` :
   - Gérer la soumission (preventDefault).
   - Exposer `setValues({ title, description, id|null })`.
   - Appeler un callback `onSubmit({ title, description })`.
3. Implémenter `NoteCard` :
   - Générer un élément DOM pour une note.
   - Déclencher `onSelect(note)` au clic sur la carte.
   - Déclencher `onDelete(id)` au clic sur le bouton X (stopPropagation).
4. Implémenter `NotesList` :
   - Fonctions : add(note), update(note), remove(id), renderAll(notes).
5. Implémenter `storage/storage.js` :
   - `saveNotes(notes)` et `loadNotes()` via localStorage.
6. Implémenter `main.js` :
   - Maintenir `notes[]` et `editingId`.
   - Gérer création, édition, suppression, sauvegarde, et initialisation depuis storage.
   - Valider `title.trim() !== ''`.
7. UX : indiquer visuellement le mode édition (ex. couleur bouton ou bordure) et afficher messages d’erreur simples.

## Critères d’évaluation
- Fonctionnalité : créer, éditer, supprimer, validation du titre.
- Qualité du code : séparation composants / stockage / logique, fonctions pures pour manipulations.
- UX : retours visibles (erreurs, mode édition), persistance (bonus).
