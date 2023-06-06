const nameInput = document.querySelector('#name-input');
const formBtn = document.querySelector('#form-btn')
const form = document.querySelector('#form')

const NAME_REGEX = /^([A-Za-z- -1,2,3,4,5,6,7,8,9]){1,50}$/


let nameValidation = false;


const validateInput = (input, regexValidation) =>{
    const infoText = input.parentElement.children[1];
    formBtn.disabled = nameValidation? false : true;

    if (input.value === '') {
        input.classList.remove('correct')
        input.classList.remove('wrong')
        infoText.classList.remove('show')
    }
    else if (regexValidation) {
        input.classList.add('correct')
        input.classList.remove('wrong')
        infoText.classList.remove('show')
    }else{
        input.classList.remove('correct')
        input.classList.add('wrong')
        infoText.classList.add('show')
    }
};

nameInput.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(nameInput.value);
    validateInput(nameInput, nameValidation)
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="deleteicon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
<input type = "text" value = "${nameInput.value}" readonly>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editicon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
        `;
    list.append(li);
    nameInput.value='';

    validateInput(nameInput);
    nameValidation=false;
    formBtn.disabled = true;
    localStorage.setItem('listaContactos', list.innerHTML);

});

list.addEventListener('click', e => {
    if (e.target.closest('.deleteicon')) {
    e.target.closest('.deleteicon').parentElement.remove();
    localStorage.setItem('listaContactos', list.innerHTML);
    }
    
if (e.target.closest('.editicon')) {
    const editicon = e.target.closest('.editicon');
    const editInput = editicon.parentElement.children[1];
    if (editicon.classList.contains('editando')) {
        editicon.classList.remove('editando');
        editInput.setAttribute('value',editInput.value)
        editInput.setAttribute('readonly','true')
        editInput.classList.add('editing')
        editicon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editicon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        `;
        localStorage.setItem('listaContactos', list.innerHTML);
    } 
    
    else {
        editicon.classList.add('editando')
        editInput.removeAttribute('readonly');
        editicon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editicon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
        `;
        }
}

});

(()=>{
    const localList = localStorage.getItem('listaContactos');
    list.innerHTML = localList
})()