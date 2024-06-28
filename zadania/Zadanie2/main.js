const { app, BrowserWindow, ipcMain } = require('electron');
const crypto = require('crypto');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile('index.html');

    setInterval(() => {
        mainWindow.webContents.send('keep-alive', 'Sygnał Keep alive');
    }, 10000);
}

ipcMain.on('hash-data', (event, data) => {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    event.reply('hash-data-response', hash);
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
