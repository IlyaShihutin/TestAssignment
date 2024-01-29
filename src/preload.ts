// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { TodoItem } from "./types/todo.interface";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data?: TodoItem[]) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel: string, func: (...args: TodoItem[]) => void) => {
    ipcRenderer.on(channel, (event: any, ...args: TodoItem[]) => func(...args));
  },
  removeListener: (channel: string, func: (...args: TodoItem[]) => void) => {
    ipcRenderer.removeListener(channel, (event: any, ...args: TodoItem[]) => func(...args));
  }
});