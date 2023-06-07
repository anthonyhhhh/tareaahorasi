let IdCounter = 0;

const input = document.querySelector('input[type="text"]');


userInput.addEventListener('submit', (event)=>{
    event.preventDefault();
    addTask();

});

let addTask = ()=>{
    IdCounter++;

    let newValue = input.value;
    
    list.innerHTML += `
    <div class="taskcontainer" id="${IdCounter}">
    <label>
      <input type="checkbox">
      ${newValue}
    </label>
    <img src="delete.png" class="borrarBtn">
  </div> 
  `
  input.value = ''
  updateStats()
  localStorage.setItem('listadetareas', list.innerHTML);
}
 
list.addEventListener('click', (event)=>{
if(event.srcElement.nodeName == 'INPUT'){
    updateStats()
    localStorage.setItem('listadetareas', list.innerHTML);
} else if(event.srcElement.nodeName == 'IMG')
deleteTask(event.srcElement.parentNode.id)
localStorage.setItem('listadetareas', list.innerHTML);

})

let updateStats = ()=>{
    let element = list.querySelectorAll('div');
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked')
    stats.innerHTML = `<p>tareitas pendientes: ${element.length} tareitas completadas: ${checkbox.length}</p>`
}

let deleteTask = (id)=>{
    let taskToDelete = document.getElementById(id)
    list.removeChild(taskToDelete)
    updateStats()
}

(()=>{
    const localList = localStorage.getItem('listadetareas');
    list.innerHTML = localList
})()

