import { app, BrowserWindow } from "electron";
import * as path from "path";

class Appilication {

  createWindow() {
    const win = new BrowserWindow({
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      width: 800,
    });

    win.loadFile(path.join(__dirname, '../index.html'));
    return win;
  }

  run() {
    app.whenReady().then(() => {
      const win = this.createWindow();
      win.webContents.openDevTools();

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      })
    })

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }
}

(function main() {
  const mainApp = new Appilication;
  mainApp.run();
})();