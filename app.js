const { app, BrowserWindow } = require("electron");

let appWindow;

function createWindow() {
  appWindow = new BrowserWindow({
    width: 100,
    height: 100,
  });

  appWindow.loadFile("dist/drag-and-drop-todo-app/index.html");

  appWindow.on("closed", function () {
    appWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
});
