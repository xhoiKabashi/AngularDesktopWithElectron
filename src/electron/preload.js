// Expose APIs to the renderer process securely
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  // Example function
  sayHello: () => 'Hello from preload.js!',
});
