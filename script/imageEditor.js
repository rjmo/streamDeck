const Cropper = require('cropperjs')
const { ipcRenderer } = require('electron')
const fs = require('fs');

function crop(image) {

}



ipcRenderer.on('ping', (event, path) => {
    document.getElementById('divr').innerHTML = `You selected:`
    let image = document.getElementById('btnImage')
    image.src = path[0];

    const cropper = new Cropper(image, {
        aspectRatio: 1,
        preview: '.img-preview',
        viewMode: 3,

    });
    cropImage.addEventListener('click', (event) => {
        canvas = cropper.getCroppedCanvas({
            width: 900,
            height: 900,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });
        canvas.toBlob(function(blob){
            url = URL.createObjectURL(blob)
            var reader = new FileReader()
            reader.readAsArrayBuffer(blob)
            reader.onloadend = function() {
                const view1 = new DataView(reader.result);
                fs.writeFile(path[1], view1, function (err) {
                    if (err) throw err;
                    console.log('It\'s saved!');
                    console.log(path[1]);
                });
            }
        })

    })

})
ipcRenderer.on('ping', (event, message) => {
    console.log(message)
})

const cropImage = document.getElementById('cropImage')

