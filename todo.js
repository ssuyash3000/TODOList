console.log("Hello");
const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');//TO GET VALUE FROM INPUT BOX
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');
function handleInputKeyPress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        if(!text){
            showNotification("text can not be empty");
            return;
        }
        const task = {
            text : text, 
            id : Date.now().toString(),
            done : false,
        }
        e.target.value = "";
        addTask(task);
    }
}

addTaskInput.addEventListener('keyup', handleInputKeyPress);

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task Added');
        return;
    }
    showNotification("add task failed");
}
function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML = 
      `<li>
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked': ''} class="custom-checkbox">

        <label for="${task.id}">${task.text}</label>
        
        <img src="bin.svg" class="delete" data-id="${task.id}" />
        </li> `
        ;
        taskList.append(li);
}
function renderList () {
    taskList.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
    return;

}

function markTaskAsComplete (taskId) {
    const task = tasks.filter(function(task){
        return task.id === taskId;
    });
    if(tasks.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        return;
    }else{
        showNotification("Marking as complete fail");
    }
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function (task){
        return task.id !== taskId
    })
    tasks.length = 0;
    for (i in newTasks){
        tasks.push(newTasks[i]);
    }
    renderList();
    showNotification("Tasks Deleted");
    return;
}



function showNotification(text) {
    alert(text);
}

function handleClickListner(e){
    const target = e.target;
    const taskId = target.dataset.id;
    if( target.className === 'custom-checkbox'){
        const taskId = target.dataset.id;
        markTaskAsComplete(taskId);
    }else if(target.className ==='delete'){
        deleteTask(taskId);
    }
}

document.addEventListener('click', handleClickListner);