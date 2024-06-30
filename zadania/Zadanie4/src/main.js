const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('src/index.html');
    return mainWindow;
}

function createEditWindow(task) {
    const editWindow = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    editWindow.loadFile('src/edit.html');
    editWindow.webContents.on('did-finish-load', () => {
        editWindow.webContents.send('edit-task', task);
    });

    return editWindow;
}

app.whenReady().then(() => {
    const mainWindow = createMainWindow();

    ipcMain.on('edit-task', (event, task) => {
        const editWindow = createEditWindow(task);
        ipcMain.once('task-edited', (event, newTask) => {
            mainWindow.webContents.send('task-edited', newTask);
        });
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
