// ./public/electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

//require('@electron/remote/main').initialize()

let win;
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        minHeight: 600,
        maxHeight: 800,
        minWidth: 600,
        maxWidth: 1000,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    win.on("closed", () => (win = null));

    win.on('page-title-updated', function (e) {
        e.preventDefault()
    });

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.whenReady().then(createWindow);

app.on("ready", createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});