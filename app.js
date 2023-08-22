const { app, BrowserWindow } = require("electron");
const path = require("path");

let appWindow;

function createWindow() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  appWindow.loadFile("dist/drag-and-drop-todo-app/index.html");

  appWindow.on("closed", function () {
    appWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
});
