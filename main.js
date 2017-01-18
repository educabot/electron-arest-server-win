const electron = require("electron"),
      app = electron.app,
      BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1040,
    height: 800
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  //mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function () {
    mainWindow = null;
  })
}

app.on("ready", createWindow);
app.on("browser-window-created",function(e,window) {
  window.setMenu(null);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
