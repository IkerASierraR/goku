import { contextBridge, ipcRenderer, shell } from 'electron'

contextBridge.exposeInMainWorld('uptDesktop', {
  openExternal: (url) => {
    if (typeof url === 'string' && url.startsWith('http')) {
      shell.openExternal(url)
    }
  },
  setWindowMode: (mode) => {
    if (mode === 'authenticated' || mode === 'login') {
      ipcRenderer.invoke('upt:set-window-mode', mode)
    }
  }
})
