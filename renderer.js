
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { app, dialog } = require('electron')
const net = require('net')
const { PythonShell } = require('python-shell')
const path = require('path')
const fs = require("fs")
const { ipcRenderer } = require('electron')

//para o modo desenvolvedor
var pathPython = "";
try {
  if (!fs.existsSync(path.join(process.resourcesPath, 'app', 'shorcuts.py'))) {
    pathPython = "shorcuts.py"
  } else {
    pathPython = path.join(process.resourcesPath, 'app', 'shorcuts.py');
  }
} catch (err) {
  console.error(err)
}
//


const serverNet = net.createServer();
serverNet.listen({
  host: '10.0.0.164',
  port: 8081
});
serverNet.on('connection', (clientNet) => {
  console.log('Client connected');
  clientNet.write('Welcome to the server electron \r\n');
  clientNet.setEncoding('utf8');

  clientNet.on('data', data => {
    console.log(data)
    PythonShell.run(pathPython, { args: data }, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
    })
  });

  clientNet.on('end', function () {
    console.log('disconnected from server');
  });
});

function sendToPython() {
  PythonShell.run(pathPython, { args: 'Key.cmd' }, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);

  })
}

btn.addEventListener('click', () => {
  sendToPython();
  console.log('send to python')

});
btnTwo.addEventListener('click', () => {
  sendToPython();
  console.log('send two')

});

const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog-sheet')
})
ipcRenderer.on('selected-directory', (event, path) => {
  document.getElementById('selected-file').innerHTML = `You selected: ${path}`
  console.log(path)
})


//   btn.dispatchEvent(new Event('click'));
// function uploadImageFile() {

//   // opens a window to choose file
//   dialog.showOpenDialog({properties: ['openFile']}).then(result => {

//       // checks if window was closed
//       if (result.canceled) {
//           console.log("No file selected!")
//       } else {

//           // get first element in array which is path to file selected
//           const filePath = result.filePaths[0];

//           // get file name
//           const fileName = path.basename(filePath);

//           // path to app data + fileName = "C:\Users\John\AppData\Roaming\app_name\picture.png"
//           imgFolderPath = path.join(app.getPath('userData'), fileName);

//           // copy file from original location to app data folder
//           fs.copyFile(filePath, imgFolderPath, (err) => {
//               if (err) throw err;
//               console.log(fileName + ' uploaded.');
//           });
//       }
//   });
// }

// click event to trigger upload function
// In html:  <input type="button" class="upload-image" value="Upload Image">

// btt.addEventListener('click', () => {
//   uploadImageFile()
//   console.log('btt')
// });
