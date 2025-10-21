// notesList.js (ES module)
import NoteCard from './noteCard.js';

export default function NotesList(rootSelector, { onSelect, onDelete }){
  const root = document.querySelector(rootSelector);
  if(!root) throw new Error('NotesList root not found: ' + rootSelector);

  function renderAll(notes, editingId=null){
    root.innerHTML = '';
    if(!notes || notes.length === 0){
      root.innerHTML = '<div class="col-12"><p class="text-muted">Aucune note. Créez-en une !</p></div>';
      return;
    }

    // create a shallow copy and sort by title (case-insensitive, locale-aware)
    const sorted = notes.slice().sort((a, b) => {
      const ta = (a && a.title) ? a.title : '';
      const tb = (b && b.title) ? b.title : '';
      return ta.localeCompare(tb, undefined, { sensitivity: 'base' });
    });

    sorted.forEach(note => {
      const card = NoteCard(note, { onSelect, onDelete });
      card.setEditing(editingId === note.id);
      root.appendChild(card.el);
    });
  }

  function add(note){
    // no-op here, main manages the array and calls renderAll
  }

  function update(note){
    // no-op here, main manages the array and calls renderAll
  }

  function remove(id){
    // no-op here, main manages the array and calls renderAll
  }

  return { renderAll, add, update, remove };
}
