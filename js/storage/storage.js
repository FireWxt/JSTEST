// storage/storage.js (ES module)
const KEY = 'notes_app_notes_v1';

export function saveNotes(notes){
  try{
    localStorage.setItem(KEY, JSON.stringify(notes));
  }catch(e){
    console.error('storage.saveNotes error', e);
  }
}

export function loadNotes(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('storage.loadNotes error', e);
    return [];
  }
}
