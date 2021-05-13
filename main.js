// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, ipcMain, dialog, ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs');





function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  });


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

}

function modalImage(data) {
  const child = new BrowserWindow({
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
  }
  });
  child.loadFile('./windows/imageEditor/image-editor.html')
  child.once('ready-to-show', () => {
    child.webContents.send('ping', data)
    child.show()
  })
}

// ipcMain.on('imageEditor', function () {
//   modalImage();
// })


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



ipcMain.on('open-file-dialog-sheet', function (event) {
  const window = BrowserWindow.fromWebContents(event.sender)
  dialog.showOpenDialog(window, {
    properties: ['openFile', 'openDirectory'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      { name: 'Custom File Type', extensions: ['as'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
    .then(result => {
       const data = []
      // get first element in array which is path to file selected
      const filePath = result.filePaths[0];

      // get file name
      const fileName = path.basename(filePath);

      // path to app data + fileName = "C:\Users\John\AppData\Roaming\app_name\picture.png"
      imgFolderPath = path.join(app.getPath('userData'), fileName);

      // fs.copyFile(filePath, imgFolderPath, (err) => {
      //   if (err) throw err;
      //   console.log(fileName + ' uploaded.');
      // });
       data.push(filePath, imgFolderPath);
      // event.sender.send('selected-directory', filePath);

      // edit image modal
      modalImage(data);
      console.log(filePath)
    })
    .catch(err => {
      console.log(err)
    })
    window.webContents.openDevTools()
});

