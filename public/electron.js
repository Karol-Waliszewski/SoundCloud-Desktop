const electron = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const app = electron.app;
require("electron-reload");

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../index.html")}`
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.on("new-window", function(event, url) {
    event.preventDefault();
    electron.shell.openExternal(url);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
