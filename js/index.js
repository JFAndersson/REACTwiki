
const gifUrls = ["media/Thumbnails/video1preview.gif"];
const gifElement = document.getElementById("indexBackgroundGif");
const gifCover = document.getElementById("gifCover");

let playlistInitiated = false;

let awaitMilliSeconds = 4000;
let max = gifUrls.length;
let randomUrlKey = 0; 

function changeBackgroundGif(){
    gifElement.src = gifUrls[randomUrlKey];
}

function initiateGifPlaylist(){
    gifElement.classList.add("showElement");
    gifCover.classList.add("transparentCover");
}

var intervalId = window.setInterval(function(){

    //sparar ett värde mellan 0 och längden av arrayen minus ett, dvs 0 - 3 om det finns 4 sparade URLs.
    randomUrlKey = Math.floor(Math.random() * max);

    if (!playlistInitiated){
        initiateGifPlaylist();
        playlistInitiated = true;
    }
    changeBackgroundGif();

}, 5000);

//clearInterval(intervalId);