// noteForm.js (ES module)
export default function NoteForm(rootSelector, onSubmit){
  const root = document.querySelector(rootSelector);
  if(!root) throw new Error('NoteForm root not found: ' + rootSelector);

  const form = root.querySelector('#note-form');
  const titleInput = root.querySelector('#note-title');
  const descInput = root.querySelector('#note-desc');
  const submitBtn = root.querySelector('#submit-btn');
  const cancelBtn = root.querySelector('#cancel-btn');
  const formTitle = root.querySelector('#form-title');
  const formError = root.querySelector('#form-error');

  let currentId = null;

  function setValues({title, description, id=null}){
    titleInput.value = title || '';
    descInput.value = description || '';
    currentId = id || null;
    if(currentId){
      submitBtn.textContent = 'Mettre à jour';
      cancelBtn.style.display = 'inline-block';
      formTitle.textContent = 'Modifier la note';
      form.classList.add('form-editing');
    }else{
      submitBtn.textContent = 'Créer';
      cancelBtn.style.display = 'none';
      formTitle.textContent = 'Créer une note';
      form.classList.remove('form-editing');
    }
  }

  function validate(){
    if(titleInput.value.trim() === ''){
      formError.style.display = 'block';
      formError.textContent = 'Le titre ne peut pas être vide.';
      return false;
    }
    formError.style.display = 'none';
    return true;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!validate()) return;
    const payload = { title: titleInput.value.trim(), description: descInput.value.trim() };
    onSubmit(payload, currentId);
  });

  cancelBtn.addEventListener('click', function(){
    setValues({ title: '', description: '', id: null });
  });

  return { setValues };
}
