
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

//Ifall användaren hovrar över grid elementet
function onItemHover(element){
    let image = element.querySelector("div img")
    image.classList.add("fade");
}
//Ifall användarens mus lämnar grid elementet
function onItemNotHover(element){
    let image = element.querySelector("div img")
    image.classList.remove("fade");
}

function redirectClick(element){
    let dummy = element.closest("div");
    let target = dummy.previousElementSibling;
    let targetInnerSpan = target.querySelector("span");
    let targetText = targetInnerSpan.innerText;
    decideVideo(targetText);
}
function decideVideo(number){
    let target = document.getElementById("video" + number);
    playVideo(target);
}
// förstorar den klickade videobilden
function playVideo(element){

    let iframe = document.getElementById("video");

    const str = element.alt;
    let [caption, videoSrc] = str.split("§");

    iframe.src = videoSrc;

    document.getElementById("caption01").innerText = caption;
    document.getElementById("modal01").style.display = "block";
}