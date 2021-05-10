
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const net = require('net')
const { PythonShell } = require('python-shell')
const path = require('path')
const { app, BrowserWindow, globalShortcut } = require('electron')
const fs = require("fs")


//para o modo desenvolvedor
var pathPython = "";
try {
    if (!fs.existsSync(path.join(process.resourcesPath, 'app', 'hello.py'))) {
      console.log("File exists.")
      pathPython = "hello.py"
    } else {
        pathPython = path.join(process.resourcesPath, 'app', 'hello.py');
    }
  } catch(err) {
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
      PythonShell.run(pathPython, {args:data}, function (err, results){
        if (err) throw err;
        console.log('results: %j', results);

    })
  });

  clientNet.on('end', function () {
    console.log('disconnected from server');
  });

});

function sendToPython() {
    PythonShell.run(pathPython, {args:'Key.cmd'}, function (err, results){
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
  
//   btn.dispatchEvent(new Event('click'));
  