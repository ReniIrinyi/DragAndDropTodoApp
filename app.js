const { app, BrowserWindow } = require("electron");

let appWindow;

function createWindow() {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
