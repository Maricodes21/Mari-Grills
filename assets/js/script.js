'use strict'

/** Preload, loading ends after the document is loaded */
/**This line selects an HTML element with a data-preaload attribute and assigns it to a variable named preloader*/
const preloader = document.querySelector("[data-preaload]");

//This line adds an event listener to the window object, which listens for the "load" event.
//The "load" event is fired when the entire page, including all assets, has finished loading.

window.addEventListener("load", function(){
    // Adds a class named "loaded" to the preloader element. This is used to hide the preloader.
    preloader.classList.add("loaded");
    // This line adds the same "loaded" class to the body element of the HTML document. 
    //This is used to trigger JavaScript functionality once the page has finished loading.
    document.body.classList.add("loaded")
});


//adding an event listener on  multiple events 

const addEventOnElements = function(elements, eventType, callback){
    for (let i = 0, len = elements.length; i<len; i++) {
        elements[i].addEventListener(eventType,callback);
    }
}

//NavBar

//Creating a variable for the navbar
const navbar = document.querySelector("[data-navbar]");
//Creating a variable for the navbar menu
const navtogglers = document.querySelectorAll("[data-nav-toggler]");
//Creating a variable for the navbar overlay
const overlay = document.querySelector("[data-overlay]");

//Creating a variable and function that toggles the navbar as active which means the navbar will be visible
//when this variable is triggerd 
const toggleNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

//Creating a click event that toggles the navbar 
addEventOnElements(navtogglers,"click",toggleNavbar);



//Header

//selecting the header element of the webpage
const header = document.querySelector("[data-header]");

//This variable stores the previous scroll position of the window. It is initialized to 0.
let lastScrollPos = 0;

//This function is used to hide the header when the user scrolls down the page.
const hideHeader = function () {

    // determines if the user has scrolled down
    const isScrollBottom = lastScrollPos<window.scrollY;

    //If isScrollBottom is true, I add the "hide" class to the header to call the hideHeader to 
    //hide the header while the user scrolls down.

    if(isScrollBottom){
        header.classList.add("hide");
        hideHeader();
    } else{
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY; 
}

window.addEventListener("scroll", function (){
    if (this.window.scrollY >= 50 ){
       header.classList.add("active"); 
       hideHeader();
    } else{
        header.classList.remove("active");
    }
})

//Hero slider 
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function (){
    if(currentSlidePos >= heroSliderItems.length -1) {
      currentSlidePos = 0;  
    }else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click",slideNext);

const slidePrev =function(){
    if (currentSlidePos <= 0 ){
        currentSlidePos = heroSliderItems.length -1;
    } else {
        currentSlidePos--;
    }
    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

//Auto Slide

let autoSlideInterval;

const autoSlide = function(){
    autoSlideInterval = setInterval(function () {
        slideNext();
    },7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide)


//Parralax effect

const parralaxItems = document.querySelectorAll("[data-parralax-item]");


let x, y;

window.addEventListener("mousemove", function(event) {
    x = (event.clientX / window.innerWidth * 10) -5;
    y = (event.clientY / this.window.innerHeight * 10) - 5;

    x = x-(x * 2);
    y = y -(y * 2);

  for ( let i = 0, len = parralaxItems.length; i< len; i++) {
    x = x * Number(parralaxItems[i].dataset.parralaxSpeed);
    y = y * Number(parralaxItems[i].dataset.parralaxSpeed);
    parralaxItems[i].style.transform = 'translate3d(${x}px, ${y}px, 0px)'
  }  

});


