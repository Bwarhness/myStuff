_attack = (typeOfAttack) => {
  const electron = require('electron');
  const {  app, BrowserWindow } = require('electron')
  function createWindow () {
    // Create the browser window.
    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
    var dimensions = mainScreen.size;
    let win = new BrowserWindow({
      width: dimensions.width,
      height: dimensions.height,
      fullscreen: true,
      frame: false,
      skipTaskbar:true,
      simpleFullscreen: true,
      alwaysOnTop: true,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.setAlwaysOnTop(true, "floating", 1);
    win.setIgnoreMouseEvents(true);
    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/${typeOfAttack}/${typeOfAttack}.html`)
  }
  app.whenReady().then(createWindow)
}

module.exports.setIOListeners = (socket) => {
  socket.on('attack', (data => {
    console.log('got attack from server, should now show overlay')
    _attack(data);
  }))
}