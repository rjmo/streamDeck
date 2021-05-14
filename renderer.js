
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { app, dialog, BrowserWindow } = require('electron')
const net = require('net')
const { PythonShell } = require('python-shell')
const path = require('path')
const fs = require("fs")
const { ipcRenderer } = require('electron')



const selectDirBtn = document.getElementById('select-directory')

// btne.addEventListener('click', (event) => {
//   ipcRenderer.send('imageEditor')
  
// })


selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog')
  
})

// ipcRenderer.on('selected-directory', (event, path) => {
//   // document.getElementById('selected-file').innerHTML = `You selected: ${path}`
//   // document.getElementById('btnImage').src = path
//   console.log(path[0]+ ' arquivo salvo')
// })




// click event to trigger upload function
// In html:  <input type="button" class="upload-image" value="Upload Image">

// btt.addEventListener('click', () => {
//   uploadImageFile()
//   console.log('btt')
// });
