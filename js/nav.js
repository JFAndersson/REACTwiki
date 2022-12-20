let burgerClicked = false;
let scrolledPassedStart = false;
let firstBurgerClick = false;
let navFixed = false;
let navCompressed = false;
let navLoad = false;

let scrollOffset = 0;
let scrollYOnCompress = 0;

let navContainer = document.getElementById("navContainer");
let navlinksContainer = document.getElementsByClassName("navlinksContainer");
let contentsContainer = document.getElementById("contentsContainer");
let menuOverlay = document.getElementById("menuOverlay");
let menuList = document.getElementById("menuList");

let links = document.getElementsByClassName("nav-link");
let brandLogo = document.getElementById("brandLogo");
let brandText = document.getElementById("brandText");
let line1 = document.getElementById("line1");
let line2 = document.getElementById("line2");
let line3 = document.getElementById("line3");
let burgerLines = [line1, line2, line3];


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

//visar eller gömmer hamburgermenyn
function toggleMenu(x){

    burgerClicked = !burgerClicked;

    x.classList.toggle("burgerActive");

    let navItems = document.getElementsByClassName("navItem");

    //gör så att användaren inte kan skrolla i hamburgermenyn
    document.body.classList.toggle("scrollToggle");
    
    //detta kodblock körs endast en gång så att hamburgermenyns länkar inte dupliceras för varje upprepande tryckning
    if (!firstBurgerClick){

        for (let i = 0; i < navItems.length; i++){

            let li = document.createElement("li");
            let a = document.createElement("a");

            a.setAttribute("href", navItems[i].children[0].getAttribute("href"));
            a.innerHTML = navItems[i].children[0].innerHTML;

            //provar nedan att applicera länkens klass på det nya objektet.
            //funkar inte detta har länken flera klasser som följaktligen lagras i en lista-
            //och delas upp och appliceras separat
            let classes = navItems[i].children[0].className;
            try{
                a.classList.add(classes);
            }
            catch{
                let splitClassesString = navItems[i].children[0].className.split(" ");
                a.classList.add(splitClassesString[0], splitClassesString[1]);
            }

            li.appendChild(a);
            menuList.appendChild(li);
        }
        
        firstBurgerClick = true;
    }


    //OM NAVBAREN AKTIVERAS
    if (burgerClicked){
        
        //om navbaren är är "fixed" längst upp på skärmen
        if (navFixed){
            //navbaren görs fullkomligt genomskinlig
            navContainer.classList.remove("background");
            navContainer.classList.add("positionFixed");
            //om navbaren för närvarandet är krympt till följd av nerskrollning återställs dess vanliga höjd
            if (navCompressed){
                if (navContainer.classList.contains("backgroundCompressed")) navContainer.classList.remove("backgroundCompressed");
                if (navContainer.classList.contains("backgroundHidden")) navContainer.classList.remove("backgroundHidden");
                navCompressed = false;
            }                
        }

        for (let i = 0; i < links.length; i++){
            links[i].classList.add("darkLinks");
            links[i].classList.add("blackUnderline");
        }
        burgerLines.forEach(line => {
            line.classList.add("darkLine");
        });
        brandText.classList.add("darkText");

        menuOverlay.classList.add("toggleVisibility");
        brandLogo.src = "./media/react_icon_transparent.png";
    }
    else{

        if (navFixed){
            navLoad = true;
            navContainer.classList.add("background");
            delay(200).then(() => {
                navContainer.classList.remove("positionFixed");
                navLoad = false;
            });
        } 

        if (!scrolledPassedStart){
            for (let i = 0; i < links.length; i++){
                links[i].classList.remove("darkLinks");
                links[i].classList.remove("blackUnderline");
            }
            burgerLines.forEach(line => {
                line.classList.remove("darkLine");
            });
            brandText.classList.remove("darkText");
        }

        menuOverlay.classList.add("fadeOutBurger");
        delay(100).then(() => {
            menuOverlay.classList.remove("fadeOutBurger");
            brandLogo.src = "./media/react_icon.png";
            menuOverlay.classList.remove("toggleVisibility");
        });
    }
}

// ändrar navbarens innehåll
window.onscroll = () => {

    let burgerContainer = document.getElementsByClassName("burgerContainer");

    if (navContainer.classList.contains("zeroTransition")){
        navContainer.classList.remove("zeroTransition");
    }

    if (document.getElementsByClassName("nav-link")[1].classList.contains("clickedLink")){
        if (window.scrollY > contentsContainer.scrollHeight){
            document.getElementById("returnBtnContainer").classList.add("containerVisible");
            scrolledPassedStart = true;
        }
        else{
            document.getElementById("returnBtnContainer").classList.remove("containerVisible");
            scrolledPassedStart = false;
        }
    }
    else{

        if (window.scrollY > window.screen.height){
            scrolledPassedStart = true;
        }
        else{
            scrolledPassedStart = false;
        }
    }

    if (scrolledPassedStart){
        
        brandLogo.src = "./media/react_icon_transparent.png";

        if (!navFixed){

            navContainer.classList.add("background");

            for (let i = 0; i < burgerContainer.length; i++){
                burgerContainer[i].classList.add("positionFixed");
            }
            for (let i = 0; i < navlinksContainer.length; i++){
                navlinksContainer[i].classList.add("positionFixed");
            }

            for (let i = 0; i < links.length; i++){
                links[i].classList.add("darkLinks");
                links[i].classList.add("blackUnderline");
            }
            burgerLines.forEach(line => {
                line.classList.add("darkLine");
            });
            brandText.classList.add("darkText");

            navFixed = true;
        }
    }
    else{

        brandLogo.src = "./media/react_icon.png";

        if (navFixed){

            navContainer.classList.add("fadeOut");
            delay(200).then(() => {
                navContainer.classList.add("zeroTransition");
                navContainer.classList.remove("background");
                navContainer.classList.remove("fadeOut");
            });
            
            for (let i = 0; i < burgerContainer.length; i++){
                burgerContainer[i].classList.remove("positionFixed");
            }
            for (let i = 0; i < navlinksContainer.length; i++){
                navlinksContainer[i].classList.remove("positionFixed");
            }

            for (let i = 0; i < links.length; i++){
                links[i].classList.remove("darkLinks");
                links[i].classList.remove("blackUnderline");
            }
            burgerLines.forEach(line => {
                line.classList.remove("darkLine");
            });
            brandText.classList.remove("darkText");

            navFixed = false;
        }
    }
    
    //om användaren har skrollat uppåt...
    if (window.scrollY < scrollOffset && navFixed && !navLoad){

        //förhindrar navbaren från att förminskas när sidan uppdateras, exempelvis då användaren klickar bort hamburgermenyn
        navLoad = true;
        delay(200).then(() => {
            navLoad = false;
        });

        //tar bort alla "förminskningsklasser" och ger navbaren sin maximala höjd
        if (navContainer.classList.contains("backgroundHidden")){
            navContainer.classList.remove("backgroundHidden");
        }
        
        //fade:ar in navbarens logotyp
        if (brandLogo.classList.contains("logoGone")) brandLogo.classList.remove("logoGone");
        navCompressed = false;
    }
    //om användaren har skrollat neråt...
    else{
        //om navbaren befinner sig i tutorials.html kan den inte minimeras ovanför innehållsförteckningen
        if (document.getElementsByClassName("nav-link")[1].classList.contains("clicked")){
            if (window.scrollY > contentsContainer.scrollHeight && window.scrollY > scrollOffset && navFixed && !navLoad){
                scrollYOnCompress =  window.scrollY;
                navCompressed = true;
                navContainer.classList.add("backgroundHidden");
                //fade:ar ut navbarens logotyp så att det inte ser dåligt ut när navbaren förminskas
                brandLogo.classList.add("logoGone");
            }
        }
        //om navbaren inte befinner sig i tutorials.html kan den minimeras då användaren har skrollat 300px efter startsidan
        else {
            if (window.scrollY > (window.screen.height + 300) && window.scrollY > scrollOffset && navFixed && !navLoad){
                scrollYOnCompress =  window.scrollY;
                navCompressed = true;
                navContainer.classList.add("backgroundHidden");
                //fade:ar ut navbarens logotyp så att det inte ser dåligt ut när navbaren förminskas
                brandLogo.classList.add("logoGone");
            }
        }
    }

    //ger offset-variabeln sidans nya skrollvärde efter alla parametrar har granskats
    scrollOffset = window.scrollY;
}   

// gömmer hamburgermenyn ifall rutan är fler än 700px i bredd
window.addEventListener("resize", () => {

    if (window.innerWidth > 800 && burgerClicked || window.innerHeight < 550 && burgerClicked){

        const burgerBtn = document.getElementsByClassName("burgerContainer");

        for (let i = 0; i < burgerBtn.length; i++){
            burgerBtn[i].click();
        }
    }
});