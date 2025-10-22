// noteCard.js (ES module)
export default function NoteCard(note, { onSelect, onDelete }){
  const col = document.createElement('div');
  col.className = 'note-col';

  const card = document.createElement('div');
  card.className = 'note';

  const body = document.createElement('div');
  body.className = 'card-body';

  const del = document.createElement('button');
  del.className = 'delete-btn';
  del.innerHTML = '&times;';
  del.title = 'Supprimer';
  del.addEventListener('click', (e)=>{
    e.stopPropagation();
  // start removal animation then call onDelete after animation completes
  card.classList.add('removing');
  let called = false;
  function finish(){ if(called) return; called = true; onDelete(note.id); }
  // wait for animation end on the card
  const onEnd = (ev)=>{ if(ev.target === card){ card.removeEventListener('animationend', onEnd); finish(); } };
  card.addEventListener('animationend', onEnd);
  // fallback in case animationend doesn't fire
  setTimeout(()=>{ if(!called) finish(); }, 520);
  });

  const h5 = document.createElement('h5');
  h5.className = 'note-title';
  h5.textContent = note.title;

  const p = document.createElement('p');
  p.className = 'note-desc text-muted';
  p.textContent = note.description || '';

  body.appendChild(del);
  body.appendChild(h5);
  body.appendChild(p);

  card.appendChild(body);
  card.addEventListener('click', ()=> onSelect(note));

  col.appendChild(card);

  return { el: col, setEditing(isEditing){
    if(isEditing) card.classList.add('editing'); else card.classList.remove('editing');
  }, setNew(isNew){
    if(isNew) card.classList.add('note-new'); else card.classList.remove('note-new');
    // also ensure the column wrapper doesn't collapse the animation
    if(isNew) col.classList.add('note-col-new'); else col.classList.remove('note-col-new');
  } };
}
