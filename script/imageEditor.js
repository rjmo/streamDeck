const Cropper = require('cropperjs')
const { ipcRenderer } = require('electron')


// const image = document.getElementById('image');
// const cropper = new Cropper(image, {
//   aspectRatio: 16 / 9,
//   crop(event) {
//     console.log(event.detail.x);
//     console.log(event.detail.y);
//     console.log(event.detail.width);
//     console.log(event.detail.height);
//     console.log(event.detail.rotate);
//     console.log(event.detail.scaleX);
//     console.log(event.detail.scaleY);
//   },
// });

ipcRenderer.on('ping', (event, path) => {
    document.getElementById('divr').innerHTML = `You selected:`
    document.getElementById('btnImage').src = path

})
ipcRenderer.on('ping', (event, message) => {
    console.log(message) // Prints 'whoooooooh!'
  })
