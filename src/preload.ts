import { contextBridge, ipcRenderer } from "electron/renderer";
import * as path from 'path';
import { __rootDir } from "./constants";
class Preloader {

  exposeContext() {
    contextBridge.exposeInMainWorld('electron', {
      startDrag: (filename: string) => {
        ipcRenderer.send('ondragstart', path.join(__rootDir, filename), __rootDir, filename);
      }
    })
  }

  run() {

    window.addEventListener("DOMContentLoaded", () => {
      const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector);
        if (element) {
          element.innerText = text;
        }
      };

      for (const type of ["chrome", "node", "electron"]) {
        replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
      }
    });

    this.exposeContext();
  }

}

const preloader = new Preloader();
preloader.run();