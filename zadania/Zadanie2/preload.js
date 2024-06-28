const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'api', {
        send: (channel, data) => {
            let validChannels = ['hash-data'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ['hash-data-response', 'keep-alive'];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
