_attack = (typeOfAttack, duration) => {
  const electron = require('electron');
  const {  app, BrowserWindow } = require('electron')
  function createWindow () {
    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
    var dimensions = mainScreen.size;
    console.log(dimensions)
    let win = new BrowserWindow({
      width: dimensions.width,
      height: dimensions.height,
      fullscreen: true,
      frame: false,
      titleBarStyle: "hidden",
      skipTaskbar:true,
      simpleFullscreen: true,
      alwaysOnTop: true,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.setAlwaysOnTop(true, "screen-saver", 1);
    win.setIgnoreMouseEvents(true);
    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/${typeOfAttack}/${typeOfAttack}.html`)
    duration = duration ? duration : 10000
    setTimeout(() => {
      win.close()}
    , duration)
  }
  app.whenReady().then(createWindow)
}

module.exports.setIOListeners = (socket) => {
  
      socket.on('attack', function(data){
        console.log(data);
        console.log("ree");

    });
  console.log("set io listeners")
  socket.on('attack', (data => {
    console.log('got attack from server, should now show overlay')
    _attack(data);
  }))
}