const { ipcRenderer } = require('electron');

const tasks = [];
const mockData = [
    { name: 'AAA', status: 'pending' },
    { name: 'BBB', status: 'pending' },
    { name: 'CCC', status: 'pending' }
];

const task_list = document.querySelector('#task_list');

const addTaskToList = (task) => {
    const task_item = document.createElement('li');
    task_item.className = 'list-group-item task_item';
    
    const task_text = document.createElement('span');
    task_text.className = 'task_text';
    task_text.innerText = task.name;
    
    const task_status = document.createElement('span');
    task_status.className = 'task_status';
    task_status.innerText = `Status: ${task.status}`;
    
    const done_button = document.createElement('button');
    done_button.className = 'btn btn-success btn-sm';
    if (task.status === 'done') {
        done_button.style.display = 'none';
    }
    else {
        done_button.innerText = 'Done';
    }
    done_button.onclick = () => toggleTaskStatus(task, task_text, task_status, done_button);

    const edit_button = document.createElement('button');
    edit_button.className = 'btn btn-warning btn-sm';
    edit_button.innerText = 'Edit';
    edit_button.onclick = () => editTask(task, task_text, task_status, done_button);

    const remove_button = document.createElement('button');
    remove_button.className = 'btn btn-danger btn-sm';
    remove_button.innerText = 'x';
    remove_button.onclick = () => removeTask(task, task_item);

    const task_controls = document.createElement('div');
    task_controls.className = 'task_controls';
    task_controls.appendChild(done_button);
    task_controls.appendChild(edit_button);
    task_controls.appendChild(remove_button);
    
    task_item.appendChild(task_text);
    task_item.appendChild(task_status);
    task_item.appendChild(task_controls);
    
    task_list.append(task_item);
    tasks.push(task);
};

const toggleTaskStatus = (task, task_text, task_status, done_button) => {
    task.status = 'done';
    task_status.innerText = `Status: ${task.status}`;
    done_button.style.display = 'none';
};

const editTask = (task, task_text, task_status, done_button) => {
    ipcRenderer.send('edit-task', task);
    ipcRenderer.once('task-edited', (event, newTask) => {
        task.name = newTask.name;
        task.status = newTask.status;
        task_text.innerText = task.name;
        task_status.innerText = `Status: ${task.status}`;
        if (task.status === 'done') {
            done_button.style.display = 'none';
        }
        else {
            done_button.style.display = 'inline';
            done_button.innerText = 'Done';
        }
    });
};

const removeTask = (task, task_item) => {
    task_list.removeChild(task_item);
    const index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
    }
};

mockData.forEach(addTaskToList);

document.querySelector('#add_task').onclick = () => {
    const taskName = document.querySelector('#task_content').value.trim();
    if (taskName === '') {
        return;
    }
    const task = {
        name: taskName,
        status: 'pending'
    };
    addTaskToList(task);
    document.querySelector('#task_content').value = '';
};