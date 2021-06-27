let pipWindow;

togglePipButton.addEventListener('click', async function (event) {
    console.log('Toggling Picture-in-Picture...');
    togglePipButton.disabled = true;
    try {
        if (video !== document.pictureInPictureElement) {
            await video.requestPictureInPicture();
        } else {
            await document.exitPictureInPicture();
        }
    } catch(error) {
        console.log(`> Argh! ${error}`);
    } finally {
        togglePipButton.disabled = false;
    }
});

video.addEventListener('enterpictureinpicture', function (event) {
    console.log('> Video entered Picture-in-Picture');
    
    pipWindow = event.pictureInPictureWindow;
    console.log(`> Window size is ${pipWindow.width}x${pipWindow.height}`);
    
    pipWindow.addEventListener('resize', onPipWindowResize);
});

video.addEventListener('leavepictureinpicture', function (event) {
    console.log(`> Video left Picture-in-Picture`);
    
    pipWindow.removeEventListener('resize', onPipWindowResize);
});

function onPipWindowResize (event) {
    console.log(`> Window size changed to ${pipWindow.width}x${pipWindow.height}`);
}

if ('pictureInPictureEnabled' in document) {
    setPipButton();
    video.addEventListener('loadedmetadata', setPipButton);
    
    video.addEventListener('emptied', setPipButton);
} else {
    togglePipButton.hidden = true;
}

function setPipButton () {
    togglePipButton.disabled = (video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture;
}

