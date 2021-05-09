
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const net = require('net')
const { app, BrowserWindow, globalShortcut } = require('electron')
const { PythonShell } = require('python-shell')



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
  });

  clientNet.on('end', function () {
    console.log('disconnected from server');
  });

});

function sendToPython() {
    
}
  
  btn.addEventListener('click', () => {
    sendToPython();
    console.log('send to python')

  });
  
  btn.dispatchEvent(new Event('click'));
  