import { app, BrowserWindow, ipcMain, Menu, MenuItem } from "electron";
import { IpcMainEvent } from "electron/main";
import * as path from "path";
import * as fs from "fs"; class Appilication {

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
      // win.webContents.openDevTools();

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      })

      const menu = Menu.getApplicationMenu();
      menu.items.forEach((menuItem: MenuItem, index: number) => {
        if (menuItem.label === 'Help') {
          let item = new MenuItem({
            label: 'Open Devlop Tools',
            click: () => {
              win.webContents.openDevTools();
            },
          });
          menuItem.submenu.append(item);
        }
      })
    })

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    fs.promises.writeFile('test.txt', 'test a b c');

    ipcMain.on('ondragstart', (event: IpcMainEvent, filepath: string, str1, str2) => {
      event.sender.startDrag({
        file: filepath,
        icon: __dirname + '/../icon.ico',
      })
    })
  }
}

(function main() {
  const mainApp = new Appilication;
  mainApp.run();
})();