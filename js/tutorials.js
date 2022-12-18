
// förstorar den klickade bilden
function enlargePicture(element){
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    document.getElementById("caption01").innerText = element.alt
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function formatText(preElement){

    const removeInvisibleCharacters = (code) => {
        let lines = code.split('\n');
        let cleanLines = lines.map(line => line.replace(/[\u0000-\u001F\u007F-\u009F\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g, ''));
        return cleanLines.join('\n');
    }
      
    // Extraherar HTML koden
    const innerText = preElement.innerText;
    // "Tvättar" koden från osynliga karaktärer
    let cleanedCode = removeInvisibleCharacters(innerText);
    // Returnerar den tvättade koden
    return cleanedCode;
}

function copyCodeBlock(element){

    let idParts = element.id.split("Btn");
    let spanText = document.getElementById("copySpan" + idParts[1]);
    let targetBlock = document.getElementById("codeBlock" + idParts[1]);
    let clipBoard = document.getElementById("svgUnchecked" + idParts[1]);
    let checkMark = document.getElementById("svgChecked" + idParts[1]);

    if (navigator.clipboard) {
        navigator.clipboard.writeText(formatText(targetBlock)).then(() => {
            checkMark.classList.remove("svgHidden");
            clipBoard.classList.add("svgHidden");
            spanText.innerText = "Kopierat!"
            delay(2000).then(() => {
                spanText.innerText = "Kopiera kod"
                checkMark.classList.add("svgHidden");
                clipBoard.classList.remove("svgHidden");
            });
        }, function(err) {
            console.error("Failed to copy text: ", err);
        });
    } else {
        if (confirm("Your device does not support the clipboard API. Do you want to learn more?")) {
            // user clicked "OK"
            window.open("https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API");
        } 
    }
}