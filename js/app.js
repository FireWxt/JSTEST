
import NoteForm from './noteForm.js';
import NotesList from './notesList.js';
import { loadNotes, saveNotes } from './storage/storage.js';

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,8);

const notesRootSelector = '#notes-list';

const notes = loadNotes() || [];
let editingId = null;

const noteForm = NoteForm('body', handleSubmit);
const notesList = NotesList(notesRootSelector, { onSelect: handleSelect, onDelete: handleDelete });

function persist(){
  saveNotes(notes);
}

function handleSubmit(payload, id){
  if(id){
    const i = notes.findIndex(n=>n.id===id);
    if(i!==-1){
      notes[i].title = payload.title;
      notes[i].description = payload.description;
      persist();
      editingId = null;
      noteForm.setValues({ title: '', description: '', id: null });
      render();
    }
  }else{
    const note = { id: uid(), title: payload.title, description: payload.description };
    notes.push(note);
    persist();
    noteForm.setValues({ title: '', description: '', id: null });
    render();
  }
}

function handleSelect(note){
  editingId = note.id;
  noteForm.setValues({ title: note.title, description: note.description, id: note.id });
  render();
}

function handleDelete(id){
  const idx = notes.findIndex(n=>n.id===id);
  if(idx!==-1) notes.splice(idx,1);
  if(editingId === id){ editingId = null; noteForm.setValues({ title: '', description: '', id: null }); }
  persist();
  render();
}

function render(){
  notesList.renderAll(notes, editingId);
}

// initial render
render();

// export for tests/debug
export { notes, render };
