import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

let mainWindow;
const contentFile = path.join(app.getPath('userData'), 'content.html');


ipcMain.handle('getContent', () => {
    if (fs.existsSync(contentFile)) {
    const result = fs.readFileSync(contentFile);
    return result.toString();
    }
    return '';
   });
   
   ipcMain.handle('setContent', ({}, content: string) => {
    fs.writeFileSync(contentFile, content);
   });

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js'), // Adjust if needed
    },
  });

  // Load the Angular app's index.html
  const indexPath = path.join(__dirname, 'browser', 'index.html'); // Updated path
  mainWindow.loadFile(indexPath);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
