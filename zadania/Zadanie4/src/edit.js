const { ipcRenderer } = require('electron');

ipcRenderer.on('edit-task', (event, task) => {
    document.getElementById('task_name').value = task.name;
    document.getElementById('task_status').value = task.status;
});

document.getElementById('save_task').onclick = () => {
    const newTask = {
        name: document.getElementById('task_name').value,
        status: document.getElementById('task_status').value
    };
    ipcRenderer.send('task-edited', newTask);
    window.close();
};