const { ipcRenderer } = require("electron");

var menu = new Vue({
    el: "#menu",
    data: {
      items: [],
      mana: 0,
      shield: 0,
    },
    methods: {
        doStuff: function(attack){
            ipcRenderer.send("attack", attack);
        }
    },
    created: function (){
        ipcRenderer.on('getMenuAttacks', (event, arg) => {
            this.items = arg;
          }),
          ipcRenderer.on('getMana', (event, arg) => {
            this.mana = arg;
          }),
          ipcRenderer.on('getShield', (event, arg) => {
            this.shield = arg;
          }),
        ipcRenderer.send("getMenu");
    }
  });