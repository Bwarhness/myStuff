module.exports.startOverlay = socket => {
  const electron = require("electron");
  const { app, BrowserWindow } = require("electron");
  function createWindow() {
    // Create the browser window.
    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
    var dimensions = mainScreen.size;
    let win = new BrowserWindow({
      width: dimensions.width,
      height: dimensions.height,
      fullscreen: true,
      frame: false,
      skipTaskbar: true,
      resizable: false,
      alwaysOnTop: true,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      }
    });
    win.setAlwaysOnTop(true, "floating", 1);
    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/overlay.html`);
  }
  const { ipcMain } = require("electron");
  ipcMain.on("attack", (event, arg) => {
    console.log("got command from html, and now sending attack to server"); // prints "ping"
    socket.emit("attack", arg);
  });
  ipcMain.on("getMenu", (event, arg) => {
    console.log("got command from html, and now sending attack to server"); // 
    event.reply('getMenuAttacks', ['pølse', 'sheep-farm', 'burn', 'doom-mode', 'flash-bang', 'anders'])
  });
  app.whenReady().then(createWindow);
};
