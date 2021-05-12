
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