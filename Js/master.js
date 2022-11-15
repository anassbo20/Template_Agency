// check the option color in the local storage
let mainColor = localStorage.getItem("option-color");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color",mainColor);

    // check active class
    document.querySelectorAll(".colors-list li").forEach(element => {
        // remove class active from all li
        element.classList.remove("active");

        // add active class to the li who has the data-color = option-color
        if(element.dataset.color === mainColor){
            element.classList.add("active");
        }
    });
}

// randomize background variable
let randomBack = true;
// variable to control the intervale
let backgInterval;

// check for background option in the local storage
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === "true") {
        randomBack = true;
    }else {
        randomBack = false;
    }
    
    document.querySelectorAll(".random-backgrounds .active").forEach( elem => {
        elem.classList.remove("active");
    });

    if (randomBack === true) {
        document.querySelector(".yes").classList.add("active");
    } else {
        document.querySelector(".no").classList.add("active");
    }
}

// select Landing Page Element
let LandElm = document.querySelector(".landing-page");

// Get Rondom number and change backg image
function randomizeBackg() {

    if(randomBack){
        backgInterval = setInterval( () => {
            
            let rondomNumber = Math.floor(Math.random() * 4);   
            
            LandElm.style.backgroundImage = `url(images/land${rondomNumber}.jpg)`;
        }, 10000);
    }
}

//edit gear and toggle settings
document.querySelector(".toggle-settings .fa-gear").onclick =  function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
}

//switch colors
let arrColors = document.querySelectorAll(".colors-list li");

// Loop  on All list Items
arrColors.forEach((li) => {

    // click on every list Items
    li.addEventListener("click",(e) => {

        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);

        handleActive(e);
        
        localStorage.setItem("option-color",e.target.dataset.color);
    })
});

//switch random background options
let randomBackElm = document.querySelectorAll(".random-backgrounds span");

// Loop  on All list of spans
randomBackElm.forEach((span) => {

    // click on every span
    span.addEventListener("click",(e) => {

        handleActive(e);

        if (e.target.dataset.background === "yes") {
            randomBack = true;
            randomizeBackg();
            localStorage.setItem("background_option",true);
        }else {
            randomBack = false;
            clearInterval(backgInterval);
            localStorage.setItem("background_option",false);
        }
    });
});

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        
        // select all skills progress
        let skillsprogress = document.querySelectorAll(".skill-box .skill-progress span");
        
        skillsprogress.forEach(elm => {
            elm.style.width = elm.dataset.progress;
        });
    }
}

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", e => {

        // create overlay element
        let overlay = document.createElement("div");

        // add class to overlay element
        overlay.className = 'popup-overlay';

        // Append overlay to the body
        document.body.appendChild(overlay);

        // Create popup box
        let popup = document.createElement("div");

        // add class to popup
        popup.className = 'popup-box';

        if (img.alt !== null) {

            // create heading image
            let imageHeading = document.createElement("h3");

            // create text for heading
            let imageText = document.createTextNode(img.alt);

            // append text to heading
            imageHeading.appendChild(imageText);

            // append heading to popup box
            popup.appendChild(imageHeading);
        }

        // create the image
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src;
        
        // append the image to popup box
        popup.appendChild(popupImage);

        // append popup box to the body
        document.body.appendChild(popup);

        // create close button
        let closeButt = document.createElement("span");

        // create text for btn
        let textBtn = document.createTextNode("X");

        // append text for btn
        closeButt.appendChild(textBtn);

        // add class to btn
        closeButt.className = 'close-btn';

        // append btn to popup
        popup.appendChild(closeButt);
    });
});

// close popup
document.addEventListener("click", e => {

    if (e.target.className === 'close-btn') {
        // remove the current popup
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollTo(element) {
    
    element.forEach(ele => {
    
        ele.addEventListener("click",e => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            });
        });
    });
}

scrollTo(allBullets);
scrollTo(allLinks);

function handleActive(ev) {

    // remove class active from all items
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // add active class to the target
    ev.target.classList.add("active");
}

// switch bullets options
let bulletsOption = document.querySelectorAll(".bullets-option span");
// select nav bullets element
let navB = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem('bullet-option');

if (bulletsLocalItem !== null) {

    document.querySelectorAll('.bullets-option span').forEach(s => {
  
        if (s.getAttribute('data-display') == bulletsLocalItem) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });

    if (bulletsLocalItem == 'yes') {
        navB.style.display = 'block';
    } else {
        navB.style.display = 'none';
    }

}

bulletsOption.forEach(span => {

    span.addEventListener("click",e => {

        handleActive(e);

        if (e.target.dataset.display == 'yes') {
            navB.style.display = 'block';
            localStorage.setItem('bullet-option','yes');
        } else {
            navB.style.display = 'none';
            localStorage.setItem('bullet-option','no');
        }

    });
});

document.querySelector('.reset-options').onclick = function () {

    // clear the local storage
    localStorage.clear();
    // localStorage.removeItem("background_option");
    // localStorage.removeItem("option-color");
    // localStorage.removeItem("bullet-option");
    // reload window
    window.location.reload();
    
}