'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

//////////////////////////////////////////////////////////////////////

//this code is previously done
const openModal = function (e) {
  //preventing the default behaviour of jumping to the top when the button is clicked while we have scrolled down a little bit
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//querySelectorAll returns a nodelist, and forEach method can be used on a nodeList
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////features//////////////////////////////////////////

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // smooth scroll happens when we pass in an object instead of a single argument
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    //behavior key with 'smooth' value makes the scroll smooth
    behavior: 'smooth', //note the spelling of behavior
  });
});

////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Page Navigation///////////////////////////////////////

//we implement a smooth scrolling behavior to the navigation, so that when we click one on these links, then it automatically scrolls smoothly to the corresponding section

////////////////////////without event delegation///////////////////////

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   //returns a nodeList on which we can attach an forEach method to attach eventHandler on each element

//   //el is each element

//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //we use preventDefault() to prevent moving to the part of the page that is in the href of the elements (anchor)

//     //************************************************ */
//     ///////////implementing smooth scrolling/////////////

//     //the anchor is useful in the HTML code, it is a common practice to give the id of the element in the anchor to which we want to navigate, then use this method to get the id and select the element using the id in the anchor

//     const id = this.getAttribute('href'); //we want the anchor, that is in the HTML code
//     //"this" points to the current element

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

//     //we use document.querySelector(id) to get the element with the id that we get from the anchor, and then use scrollIntoView
//   });
// });

// //this works just fine, but is not really efficient, as we are adding the same event handler function once to each element, if we had more elements this would be really bad method as we create a copy every time

///////////////////////using event delegation///////////////////////////

//we use the fact that events bubble up, we do that in two steps

//step 1: putting the event listener on a common parent of all the elements we are interested in

//step 2: when the event happens on the element, the event is generated at the element, and then bubbles up, we then catch that event in the common parent element and handle it there as we now know where the event originated, using "event.target"

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); //to prevent the default behaviour due to the href

  console.log(e.currentTarget); //always the "nav__links" on which the event listener is attached, where the event is caught after bubbling up from the target element

  console.log(e.target); //when we click happens on one of the links we get the target as the links elements, when we get the click in between the spaces or anywhere else in the parent element, we get the target as the parent element (which is not relevant at all so we remove those clicks on event listeners using the matching strategy)

  //////////////////////Matching Strategy/////////////////////////////

  if (e.target.classList.contains('nav__link')) {
    //if the target element is one of the links
    console.log('LINK');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//works beautifully, we only added one event handler function to the parent element, that makes it efficient

//******************************************************** */
//there is another more important usage of event delegation, it is used to add event listeners to the elements which are not yet on the page, on runtime (by the time the page loads), as it is not possible to add event handlers to elements that do not exist, for eg.- buttons that are added dynamically using the application
//******************************************************** */

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////TABBED COMPONENT/////////////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

//event handler on each tab (slow)
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

//we use event delegation (optimised)
tabsContainer.addEventListener('click', function (e) {
  //event hamdler attached to the common parent element

  //we use closest to go up the DOM tree to the button if in case the span is clicked, if the button is clicked, closest keeps it there itseft
  const clicked = e.target.closest('.operations__tab');
  //when we click the button, we get the button, when we click the number we still get the button

  // console.log(clicked); //returns null if we click on the container, as contains cannot find any parent element with the class "operations__tab"

  /////////GUARD CLAUSE/////////
  if (!clicked) return; //when we have null "false value", we go back without executing the rest of the code

  // /////////////////my matching strategy//////////////////////
  // if (!clicked.classList.contains('operations__tab-container')) {
  //   console.log(clicked);
  //}

  //adding or removing "operations__tab--active", make the tab button go selected (up) or unselected (down)

  /////////// removing the active state from all the tabs first//////////
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  ///////////////making the tab that was clicked active////////////////
  clicked.classList.add('operations__tab--active');

  /////////removing the active state from all the contents tabs/////////
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  ///////////////////activating the content area////////////////////////

  //we have the unique number in the attribute "data-tab", so to get the number we use "clicked.dataset.tab"

  //".operations__content--${clicked.dataset.tab}" helps in selecting the content tab corresponding to the clicked tab button

  //adding of removing the class "operations__content--active"  from the content tab makes it visible or invisible
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////PASSING ARGUMENTS TO EVENT HANDLERS//////////////////////////////

//we want to fade all other links (includes the logo) apart from the link that we are howering over in the nav
// [mouse over the logo does not do anything]

//////////////////////Menu fade animation////////////////////////////

//".nav" is the parent container

const nav = document.querySelector('.nav');

//'mouseover' event is similar to 'mouseenter' event with a dfference that 'mouseenter' does not bubble, while 'mouseover' does bubble

//opposite of "mouseenter" is "mouseleave"

//opposite of "mouseover" is "mouseout"

////function for changing the opacity of the links and the logo///////
const handleHover = function (e) {
  console.log(this); //gives a different value of this everytime the mouse os over and mouse is out

  ///////////"this" keyword//////////////

  //by default "this" keyword is usually equal to "currentTarget", but the "currentTarget" is unaltered here, the "this" keyword when set manually, it becomes whatever we have set it to

  console.log(e.currentTarget); //the nav element

  if (e.target.classList.contains('nav__link')) {
    //if our mouse is over one of the links
    const link = e.target;
    //we move up to the parent element nav and then select all the links and logo
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    ////////////////alternative//////////////
    // console.log(e.currentTarget);
    // const siblings = e.currentTarget.querySelectorAll('.nav__link');
    // const logo = e.currentTarget.querySelector('img');

    ///////////////////changing the opacity////////////////////

    siblings.forEach(el => {
      if (el !== link)
        //checking if the link that we have our mouse over is not the link we are changing the opacity for
        el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/////////////////////////////////////////////////////////////////////

// //to make the links that we do not have our mouseover fade (along with the logo) [mouse over the logo does not do anything]
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// //to revert what we did in the "mouseover" event handler
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//*************************************************************** */
//any handler function (call back) can only ever have one real argument, in this case, one real parameter i.e the event (e), if we want to pass additional values into the handler function, then we need to use the "this" keyword, if we want to pass multiple values, we can then pass values in an array or an object
//************************************************************** */

//passing "argument" into the handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////problem we face//////////////////

//we have to pass the "e" and the value of opacity to the handleHover, for that we cannot do,

// nav.addEventListener('mouseover', handleHover(e,0.5));

//as e will not be defined and also addEventListener expects a function , if we pass arguments with it, we are calling the function in the addEventListener, and that will become some other value, and as the handleHover is not returning anything, this wont work this way

//solution to it is to still have a callback function and call the handleHover function inside the callback function, with the arguments

// nav.addEventListener('mouseover', function (e) {
//   //we are calling the function manually
//   handleHover(e, 0.5); //this will only be executed as soon as JS executes the callback function value
// });

//we can actually do even better, by removing the anonymous function and using the bind function

//look for bind method in the (10)functions section

//bind method creates a copy of the function that it is called on and sets the "this" keywork in that function call to whatever value we pass into bind

// nav.addEventListener('mouseover', handleHover.bind(0.5));

// handleHover.bind(0.5)//this is going to work as this is also going to be a function as we know that the bind returns a new function

// nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////IMPLEMENTING STICKY NAVIGATION///////////////////////////////

// //the navigation bar gets attached to the top of the page after we scroll down to a certain point

// //////////////////////////////sticky navigation////////////////////////////

// //////////////////////////using the scroll event/////////////////////////////

// //scroll event will be fired off each time that we scroll on the page (makes it inefficient, and so it should be avoided)

// //it is inefficient on especially on mobile phones

// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);//we get the top value of the section 1

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY); //gives us the scroll position

//   //we add the sticky class to the nav as soon as we reach the first section (section 1)

//   //we cannot hard-code the value (where section 1 starts) using the scrollY, as it depends on the viewport
//   //so we need to calculate the position where section 1 starts dynamically

//   //"initialCoords.top" is the distance of the section 1 from the top

//   if (window.scrollY > initialCoords.top) {
//     //when the scroll position is greater than the distance of section 1 from the top
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

///////////////////////////////////////////////////////////////////////////////////

///////////////////A BETTER WAY: THE INTERSECTION OBSERVER API/////////////////////

//it is an efficient way

//this API allows our code to observe changes, to the way that a certain target element intersects another element or the way it intersects the viewport

///////////////////how the intersection observer API works/////////////////

//the callback function will be called each time our target element is intersecting the root element at the threshold ( that we have defined)

//in the example, the call back function is called whenever "section1" is intersecting the "viewport" (null) at 10%, (nomatter we are scrolling up or down)

//this is more efficeint as the callback function is called only when we are interested

const obsCallback = function (entries, observer) {
  //this function gets called with two arguments
  //entries: an array of the threshold entries (can be one value or many values)
  //observer: observer object, the object of options

  //we use forEach to make this a more generalised code in case there are multiple threshold values
  entries.forEach(entry => {
    // console.log(observer); // IntersectionObserver, the object of options
    // console.log(entry);
    //example 1: we get an IntersectionObserverEntry where we find the intersectionRatio: 0.12365905195474625 (10 % threshold we defined) and also isIntersecting: true, when "section1" intersects the viewport and comes on the screen and isIntersecting: false when "section1" intersects the viewport again and goes out of the screen
    //we get two IntersectionObserverEntry, once when the target intersects 0% (just the top edge) the viewport, and at 20%
  });
};

//object of options
const obsOptions = {
  root: null, //"root" is the element that the target is intersecting
  //using "null", we can now see the target element intersecting the entire viewport

  //***************** */
  //example 1:
  // threshold: 0.1, //"threshold" is the %age of intersection, at which the oserver callback will be called (%age of the target element)

  //threshold as 0 means that the callback function will be called when our target element moves completely out of the viewport, and also as soon as it enters the viewport

  //threshold as 1 means that the callback function will be called each time when all (100%) of the target element moves in the viewport and also when all (100%) of the target element moves out of the viewport
  // (in case of section1 it is impossible as the section in itself is bigger than the viewport)

  //******************* */
  //example 2
  //we can have multiple thresholds (by putting the values in an array)
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions); //we pass a callback function as the first argmuent and an object of options as the secind argument

observer.observe(section1); //we use observe method to set the target
//section1 is the target element

//////////////////////////////////////////////////////////////////////////////////

//////////////using the Intersection Observer API to make the nav sticky//////////

//we want the navigation to be sticky when the header moves completely out of view

const headerNav = document.querySelector('.header');

//***************************************************************** */
//adding a small detail, we want to have the nav bar visible just before section1 comes (not when "isIntersecting" becomes false but just a little before), the length before section1 by which it becomes visible is same as the height of the nav bar

////////we get the height of the nav bar dynamically to make the site more responsive//////

// as in different devices, the height if the nav bar can be different and to maintain the feature there as well, we need to do this
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  //just getting the first value of entries
  const [entry] = entries; //destructuring to get the first element
  //same as writing entries [0]
  // console.log(entry);
  if (!entry.isIntersecting) {
    //when it is not intersecting, we want to add the "sticky" class
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //************************************************************ */
  //adding a small detail, we want to have the nav bar visible just before section1 comes (not when "isIntersecting" becomes false but just a little before), the length before section1 by which it becomes visible is same as the height of the nav bar, we do that using the property "rootMargin",  "rootMargin" adds margin to the target element, and that re-adjusts the threshold as now it is calculated including the newly added margin

  /////////////we here hard code the value 90 px it/////////////////
  // rootMargin: '-90px', //this "rootmargin" is a box of 90 pixels, that will be applied outside the box of target element, and now, we calculate the threshold according to the new value

  /////we get the value dynamically for more responsiveness of the site/////
  rootMargin: `-${navHeight}px`,
  //*********************************************************** */
});

headerObserver.observe(headerNav);

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////REVEALING ELEMENTS ON SCROLL////////////////////////////////////////

////////////revealing sections on scrolling//////////////

//we do this using the IntersectionObserverAPI

//selecting all the sections
const allSectionsToObserve = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry); //IntersectionObserverEntry -> target -> classname, id

  //Guard clause
  if (!entry.isIntersecting) return; //if not intersecting, then we do not remove the hidden class

  entry.target.classList.remove('section--hidden');

  //we need to optimise this code as the observer keeps observing the sections, we can unobserve these sections
  observer.unobserve(entry.target);
  //we unobserve each section when we scroll through it for the first time after the page has loaded, so that the observer can stop observing each section again and again, when we scroll the page, which can lead to performance issues as it will then call this function repeatedly

  //doing this, the effect happens only the first time, after the page has been loaded, as we remove the observer from the sections, the effect no more takes place
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

//observing all the sections using the same observer
allSectionsToObserve.forEach(function (section) {
  sectionObserver.observe(section);
  //we add the hidden class in the JS as some people disable JS in their browser and for them, if it is already added in the HTML, it would be always hidden

  //*************************************************** */
  //To make sections visible and invisible, toggle comment
  // section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////LAZY LOADING IMAGES////////////////////////////////////////////

//Performance is one of the most important things while building any website, and images have by far the biggest impact on page loading, it is important for images to be optimised on any page, for that we use a strategy called "lazy loading images"

//when we scroll to that part of the page where there are images, the images start loading, there is already a placeholder image in its place (which loads with the page) that is actually a realy low resolution version of the same image, low res image is in the sre and the real image is in the "data-set" atttribute, we also add a blur filter on the low-res image using class "lazy-img" in the CSS, as without it the low res image which is already loaded really looks pixelated

//we implement this using the IntersectionObserver API

const imgTargets = document.querySelectorAll('img[data-src]'); // img[data-src] select all the image elements that have the attribute "data-src"

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry); // appears a little bit before as the sections are a little bit shifted (due to the hidden class)

  //Guard clause
  if (!entry.isIntersecting) return;

  //replacing the placeholder (low-res image+ blurry filter) with the original image

  //Replacing src with data-src

  //"target" is the element in "IntersectionObserverEntry" that is currently being intersected
  entry.target.src = entry.target.dataset.src;

  //replacing of the "src" attribute actually happens behind the scenes, JS finds the new image that it should load and displays, this happens behind the scenes, and once it is finished loading the image completely it will emit the "load" event, we can listen to the "load" event using an eventListener

  //////////////The problem:////////////////////
  // //removing the blurry filter
  // entry.target.classList.remove('lazy-img');

  //we can simulate "slow 3G" in the network tab to see the problem
  // we see that the images seem to load really slow, it takes some while, and as we have already removed the blurry filter, we can see the old placeholder image (low-res image), that was already there, while the new image is still loading, we can see the pixelated image as we have already removed the blur filter before the new image is loaded

  //what we want to do is to remove the blur filter only when the new image is completely loaded

  ///////////The solution:////////////////////

  //as we know that after the image has beed completely loaded, JS fires a "load" event, we can listen to that "load" event and remove the blur only after that event is fired

  entry.target.addEventListener('load', function () {
    // console.log('load event');

    //removing the blurry filter
    entry.target.classList.remove('lazy-img');
  });

  //stop observing the images
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px', //we want to make these images load a little bit earlier, ideally we dont want our users to know we are loading them
});

//adding observe method to all the target images
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////SLIDER////////////////////////////////////////////////

///////////////////////////////Slider Component: Part1/////////////////////////////////////

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;

//we can read the length property of a nodeList, just like an array
const maxSlides = slides.length; //we get the number of slides

// //*************************************************************** */
// ///////toggle comments to change b/w test size and real size////////

// //making the scale of the whole slider div small
// slider.style.transform = 'scale(0.2)';

// //to make the overflow visible
// slider.style.overflow = 'visible';

// //***************************** */
// //doing the above two, we can see all the images (test slides)

// ////////////////////////////////////////////////////////////////////

// // initial placing of the slides
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// //0%, 100%, 200%, 300%

//*************************************************** */
/////////////from Slider Component: part2///////////////

//we want to show which slide we are in using the dot
const activateDot = function (slide) {
  //removing "dots__dot--active" form all the dots
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  //adding to only the dot we are intersted in
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// //****    *****    *****   *****   *****   ***** */
// //does not work here are dots are still not formed
// //we call it in the beginning, i.e. on slide 0
// activateDot(0);

//we have to call the above function in all the necessary places
//*************************************************** */

/////function to move to a slide using slide number/////
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

//this is called when the page is loaded, so the page is loaded with the first slide in view
goToSlide(0);

/////function to move to the next slide/////
const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  // //below code is refactored into a function
  // slides.forEach(
  //   (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  // );

  goToSlide(curSlide);
  //////////////////////
  activateDot(curSlide);
};

/////function to move to the previous slide/////
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  //////////////////////
  activateDot(curSlide);
};

/////////////Right Slide Button functionality/////////////
btnRight.addEventListener('click', nextSlide);

//////////////Left Slide Button functionality/////////////
btnLeft.addEventListener('click', prevSlide);

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////Slider Component: Part2/////////////////////////////////////

//making it possible to navigate the slider using the arrow keys
document.addEventListener('keydown', function (e) {
  // console.log(e);

  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide(); //short-circuiting also works
});

//working on the dots those are below

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  //we loop over the slides and add dots for each slide there is
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
//calling the function so to create the dots
createDots();

//*************************************************** */
//we have  this function declared in the Slider Component: Part1

// //we want to show which slide we are in using the dot
// const activateDot = function (slide) {
//   //removing "dots__dot--active" form all the dots
//   document
//     .querySelectorAll('.dots__dot')
//     .forEach(dot => dot.classList.remove('dots__dot--active'));

//   //adding to only the dot we are intersted in
//   document
//     .querySelector(`.dots__dot[data-slide="${slide}"]`)
//     .classList.add('dots__dot--active');
// };

//we call it in the beginning, i.e. on slide 0
activateDot(0);

//*************************************************** */
////////////////////////////////////////////////////////

//we use event delegation, i.e. not attaching an event handler to each dot, but to the common parent, i.e. the dotContainer
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // console.log('DOT');
    const { slide } = e.target.dataset; //destructuring used
    goToSlide(slide);
    //////////////////
    activateDot(slide);
  }
});

//********************************************************** */
//Jonas then creates an init() function where he wraps all of the function calls that are to be made when the page loads, another function slider(), which wraps all the querySelector we use in the Slider Component, so we do not pollute the global namespace.

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////THEORY////////////////////////////////////////////////

//******************************* */
//How the DOM really work in notes
//******************************* */

/////////////////////////////Selecting, Creating and Deleting Elements///////////////////

console.log(document);

//selecting the entire document of any webpage
console.log(document.documentElement);
//just document is not enough for selecting the entire document as document is not the real DOM element, for eg.- if we want to apply CSS style to the entire page, we always need to select document element

////////////////////////selecting the head/////////////////////////

console.log(document.head);

/////////////////////////selecting the body////////////////////////

console.log(document.body);

//returns the first element that matches the selector
const header = document.querySelector('.header'); //result is a DOM object

//selecting multiple elements
const allSections = document.querySelectorAll('.section');

console.log(allSections); //returns a NodeList that contains all the elements that have the '.section' class

//selectors are available not only on the document but also on all the elements (due to inheritance)

document.getElementById('section--1'); //returns the element that has id 'section--1'

const allButtons = document.getElementsByTagName('button');

console.log(allButtons); //returns a HTML collection of all the elements that has the tag name 'button'

//HTML collection is different from a NodeList, as an HTMLCollection is a so called live collection, if the DOM changes then this collection is also immediately updated automatically.
//here if we add or delete a button and print the allButtons again, we can see the change

console.log(document.getElementsByClassName('btn')); //also returns a HTMLCollection of buttons (a live collection of buttons)

/////////////////////////Creating and Inserting HTML elements///////////////////

//.insertAdjacentHTML (used in Bankist app to show the transactions)

//other methods
const message = document.createElement('div'); //in the arguments of the createElement method we pass in the tag name, createElement creates a DOM element and stores it into the message variable, that element is not yet anywhere in the DOM, all this is a DOM object that we can use to do something on it (cannot be found on the webpage).

//if we want it on the page, we have to manually insert it into the DOM of the page

//////////////////////we can add classes///////////////////////////

message.classList.add('cookie-message');

//////////////////////////inserts text/////////////////////////////

// message.textContent = 'We use cookies for improved functionality and analytics';

////////////////////////inserts HTML//////////////////////////////

message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button';

/////////////////adding message to the header//////////////////////

header.prepend(message); //prepending adds it as the first child of the header element

//to add it as the last child we use append
header.append(message);

//while we use both of the code (for append and prepend), we see that the element is only inserted once, as the message is now a live element living in the DOM, and so it cannot be added to multiple places at the same time

//what happened here is that we first prepended and then appended the element, the second time when we used append, we actually moved the element from the first child to the last child of the header element, we did not really insert it again as we had already inserted it in the first time when we used prepend.

//so we can use append and prepend to move the element, this is because the DOM elements are unique and can always only exist at one place at a time

//***************************************************** */

// //if we want to add multiple copies of the same element

// //make copy of the first element

// header.append(message.cloneNode(true));

// //cloneNode creates a clone of the message and appends it, even if there is a message already inserted in the DOM, cloneNode creates a clone

/////////////////////////before and after///////////////////////////

//  header.before(message);

//  header.after(message);

// //before and after adds the element as siblings, before and after the header element

///////////////////////////deleting the element///////////////////////

////////////////////////////modern way/////////////////////////////

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); //removes the message element from the DOM, when we click the button
  });

/////////////////////////oldschool way////////////////////////////

// // remove method very recent, earlier we could only remove child node elements by selecting the parent node element

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.parentElement.removeChild(message);
// //this way of moving up and down the DOM tree is called DOM traversal
//   });

////////////////////////////////////////////////////////////////////////////////

////////////////////Styles, Attributes and Classes//////////////////////////////

/////////////////////inline styles////////////////////////

//styles set directly in the DOM

message.style.backgroundColor = '#37383d';

message.style.width = '120%';

////////////////////////// reading styles////////////////////////////

console.log(message.style.height); //we get nothing

console.log(message.style.backgroundColor); //rgb(55, 56, 61)

//we get the values of only those properties which we have set through style property(manually), as we have not set height (manually) through style property, we do not get anything, it comes under computed style property

//therefore the attempt to get the value of style using the inline style only works when we have set the style property ourselves manually

//////////////////////we want the computed style/////////////////////

// console.log(getComputedStyle(message)); //we get a huge object that contains all of the properties and all of the values

console.log(getComputedStyle(message).height); //gives computed style

/////////////////setting the computed style property////////////////////////////

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//we use parseFloat as "getComputedStyle(message).height" returns a  string (49.5333px), adding a number to a string makes it a string while we want to make assing message.style.height to a number

console.log(getComputedStyle(message).height);

////////////////////////CSS CUSTOM PROPERTIES (CSS VARIABLES)////////////////////

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // document.documentElement is the root in JS

// // with custom properties we hae to use the setProperty(), then we pass in the name of the property  as the first argument and then the value as the second argument

// // using the custom properties we can change the style of our page by setting one property

// // WE CAN USE SETPROPERTY TO SET JUST ANY OTHER CSS PROPERTY for eg.-height, color

// // but we cannot set custom property we cannot use that inline method

////////////////////////////////ATTRIBUTES///////////////////////////////////

//in HTML we have many attributes, like class, id, src, alt, etc, in JS we can ofcourse access and change these different attributes

const logo = document.querySelector('.nav__logo');

///////////////////////////accessing properties (reading)///////////////////////

console.log(logo.alt);

console.log(logo.src); //http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png    gives the absolute url, while in the HTML we can have the relative url

//if we want to get what is in the HTML (here: relative url)
console.log(logo.getAttribute('src')); //img/logo.png

//the same thing goes with links as well
const link = document.querySelector('.twitter-link');

console.log(link.href); //the absolute url

console.log(link.getAttribute('href')); //url in the HTML

//this works because on images they are supposed to have the alt and the src attributes in them, and if we specify them in HTML, then JS will automatically create these properties on the object, but if we add some other property that is not standard, then JS will not automatically create the property on the object

console.log(logo.className); //gives the class of the element

//non-standard
console.log(logo.designer); //undefined
//designer is not a standerd property that is expected on images

//way of reading non-standard attribute 'designer'
console.log(logo.getAttribute('designer')); //Abir

////////////////////////////setting the values to the attributes/////////////////////////

// logo.alt = 'Beautiful minimalist logo';

// console.log(logo.alt);

// logo.setAttribute('company', 'Bankist');

// console.log(logo.company);

//*************************************************** */
/////////////////////data attributes////////////////////

// //special attributes that starts with the word data

//  console.log(logo.dataset.versionNumber); //3.0 note:versionNumber is in camel case (data-version-number)

// //these special attributes are always stored in the dataset object

// //we use data attributes quite a lot when we work with the UI, especailly when we need to store data in the UI, in the HTML code

///////////////////////////////////CLASSES//////////////////////////////////////////////

// //add class
// logo.classList.add('z', 'x', 'y'); //we can also add multiple classes by passsing multiple classNames

// //remove class
// logo.classList.remove('z', 'x', 'y'); //we can also remove multiple classes by passsing multiple classNames

// //toggle class
// logo.classList.toggle('c');

// //check if it contains
// logo.classList.contains('c');

//******************************************** */

// //DONT USE
// logo.className = 'abir';

// //this will overwrite all the existing classess and allows us to only add one class on any element

////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////IMPLEMENTING SMOOTH SCROLL///////////////////////////////////

// const btnScrollTo = document.querySelector('.btn--scroll-to');

// const section1 = document.querySelector('#section--1');

///////////////////////oldschool way///////////////////////////

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect()); //the button that we have clicked

//   console.log('current scroll (x/y)', window.pageXOffset, pageYOffset);

//   //viewport is the portion of the browser where we can view our page, we can cahnge the size of the viewport, eg- by changing the size of the browser window

//   //we get the coordinates of the x and y viewport from the left and the top of the page respectively, its 0,0 when there is no scroll

//   //pageXOffset: gives the coordinates of the left edge of the viewport from the left edge of the page, 0 when we have not scrolled horizontally

//   //pageYOffset: gives the coordinates of the top edge of the viewport from the top edge of the page, 0 when we have not scrolled vertically

//   console.log(
//     'viewport height / viewport width',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   //document.documentElement.clientHeight: gives the height of the viewport

//   // document.documentElement.clientWidth: gives the width of the viewport

//   //****************************************** */
//   //making the scroll happen

//   // window.scrollTo(
//   //   s1coords.left + window.pageYOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   //we add window.pageXOffset and  window.pageYOffset to s1coords.left and  s1coords.top recpectively as s1coords.left and s1coords.top will be different at different scroll positions, so we will only scroll that amount of the window (value equals to s1coords.left and s1coords.top, which is the relative distance from the viewport) which will not be right, we want to scroll the amount of the window from the top of the page to the top of section 1, (same for left in other cases where the box is somewhere in the middle), so we add window.pageYOffset that is the distance from the top edge of the viewport to the top of the page (and also do this with window.pageXOffset to prevent such cases happening in the x axis), to make sure we are scrolling the window all the way to section 1 even if we have scrolled some amount of the page

//   //making the scroll smooth

//   //smooth scroll happens when we pass in an object instead of a single argument
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     //behavior key with 'smooth' value makes the scroll smooth
//     behavior: 'smooth', //note the spelling of behavior
//   });
//  });

// // getBoundingClientRect(); gives us a DOM rectangle, and has properties:-
// // bottom (distance from the top of the viewport to the bottom of the DOM rectangle (bottom edge of the DOM rectangle)),
// // height (height of the DOM rectangle),
// //  left (same as x),
// // right (distance from the left edge of the viewport to the right edge of the DOM rectangle),
// // top (same as y),
// // width (width of the DOM rectangle),
// // x (distance from the left edge of the viewport to the left edge of DOM rectangle),
// // y (dstance from the top edge of the viewport to the top edge of DOM rectangle)

// // The width and height properties of the DOMRect object returned by the method include the padding and border-width, not only the content width/height. In the standard box model, this would be equal to the width or height property of the element + padding + border-width. But if box-sizing: border-box is set for the element this would be directly equal to its width or height.

// // getBoundingClientRect(); is relative to the visible view port

////////////////////////////////////////////////////////////////////////////////////

//////////////////////////modern way////////////////////////////////////////////////

// // only works in modern browser
// section1.scrollIntoView({ behavior: 'smooth' });

/////////////////////////////////////////////////////////////////////////////////////

//////////////////////TYPES OF EVENTS AND EVENT HANDLERS/////////////////////////////

//event is a signal that is generated by the DOM node

//we can listen to events using event listeners

//an event always happens even if we are not listening to them

const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   ///happens when the mouse enters a certain element, like the hover event in css
//   // alert('mouse is on the heading');
// });

//look for other events
//https://developer.mozilla.org/en-US/docs/Web/Events

///////////////////onevent property directly on the element///////////////////////

//////////////////////////////oldschool way///////////////////////////////////////

// h1.onmouseenter = function (e) {
//   alert('mouse is on the heading');
// };

/////////////////////why addEventListener is better//////////////////////////////

//1. allows us to add multiple event listeners to the same event

//all the eventlisteners work on the same event
// h1.addEventListener('mouseenter', functionA );
// h1.addEventListener('mouseenter', functionB );
// h1.addEventListener('mouseenter', functionC );

//functionC overwrites functionA and functionB
// h1.onmouseenter = functionA;
// h1.onmouseenter = functionB;
// h1.onmouseenter = functionC;

//2. we can remove an event handler if we do not need it anymore

//for this we have to take out the callback function out of the event listener

const alertH1 = function (e) {
  alert('mouse is on the heading');

  //to remove the event listener
  h1.removeEventListener('mouseenter', alertH1); //putting the code here removes the event listener after it has been fired once, it does not work the second time, this is beacuse when the event happens, this function is called, when it reaches this line the event listener is removed, this is a nice way to make one time event listeners
};

//event handler on h1
h1.addEventListener('mouseenter', alertH1);

//////////////if we want to remove the event listener after a certain amount of time//////////
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); //removes the event listener after three seconds

/////////////////////handling events using HTML attributes///////////////////////

//we add the event as an attribute in the HTML itself
//this should not be used
{
  /* <h1 onmouseenter="alert ('mouse is on the heading')"></h1> */
}

///////////////////////////////////////////////////////////////////////////////////

///////////////////////EVENT PROPAGATION:BUBBLING AND CAPTURING////////////////////

//************************************************************** */
/////////////////////theory in notes///////////////////////////

////////////////////////understanding event propagation///////////////////////////////

//////////////assigning random color to different nav elements//////////////////////////

// //generating a random number between 0 and 255
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// //color format: rgb(0-255,0-255,0-255)
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// //random color generator

// //there are three elements with the class nav__link, as we are using querySelector, we are only selecting the first element with this class that is the element with "features"
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK');
//   this.style.backgroundColor = randomColor(); //this keyword always points to the element to which the eventt handler is attached

//   console.log('LINK', e.target, e.currentTarget); //target is the element where the click first happenend, if we click on the "nav__link", the target for all three event handlers will be "nav__link", the "e" here that each of them recieves is the exact same event in this case

//   //currentTarget is the element where the event handler is attached, it is the same as the "this" keyword

//   //this is not a good idea to do
//   //********************************************************* */
//   //////////////////to stop event propagation///////////////////

//   // e.stopPropagation(); //only the color of "nav_link" changes, event stops propagating to the parent elements

//   //********************************************************* */
// });
// //WHEN WE CLICK ON THIS, THE COLORS OF "nav__links" AND "nav" ALSO CHANGES,  THE EVENT IS GENERATED IN THE DOCUMENT ROOT AND MOVES DOWN TO THE TARGET ELEMENT, THROUGH THE PARENT ELEMENTS IT HAS "nav__links" AND "nav", THIS PROCESS IS CALLED CAPTURING PHASE, THEN THE EVENT REACHES THE TARGET ELEMENT, THIS EVENT HANDLER IS FIRED, THEN THE EVENT MOVES BACK UP TO THE DOCUMENT ROOT, MOVING THROUGH EACH OF ITS PARENT ELEMENT, IN THE PROCESS OF BUBBLING, IN THIS PROCESS THE EVENT LISTENER ATTACHED TO THE PARENT ELEMENTS ARE FIRED,(addEventListener BY DEFAULT ONLY LISTENS FOR EVENTS IN THE BUBBLING PHASE AND NOT IN THE CAPTURING PHASE {this is because the capturing phase is usually irrelevant}), ALL OF THIS HAPPENS AFTER THE CAPTURING PHASE, IN THE TARGET PHASE AND BUBBLING PHASE, WHEN THE EVENT MOVES THROUGH THE PARENT ELEMENTS IT IS AS IF THE EVENT IS HAPPENING IN THE PARENT ELEMENTS AS WELL

// //the element with nav__links is the parent of the nav__link elements
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('LINK');
//   this.style.backgroundColor = randomColor(); //this keyword always points to the element to which the eventt handler is attached

//   console.log('CONTAINER', e.target, e.currentTarget); //target is the element where the click first happenend, if we click on the "nav__links", the target for the two event handlers will be "nav__links", the "e" recieves by this and "nav" is the exact same in this case

//   //currentTarget is the element where the event handler is attached, it is the same as the "this" keyword
// });
// //WHEN WE CLICK ON THIS, THE COLOR OF "nav" ALSO CHANGES, THIS IS DUE TO THE SAME REASON OF EVENT PROPAGATION (BUBBLING OF EVENT)

// // //the element with nav class is the parent of nav__links
// // document.querySelector('.nav').addEventListener('click', function (e) {
// //   console.log('LINK');
// //   this.style.backgroundColor = randomColor(); //this keyword always points to the element to which the eventt handler is attached

// //   console.log('NAV', e.target, e.currentTarget); //target is the element where the click first happenend, if we click on the "nav", the target for this event handler will be "nav"

// //   //currentTarget is the element where the event handler is attached, it is the same as the "this" keyword
// // });
// // //WHEN WE CLICK ON THIS, AS THIS HAS NO PARENT ELEMENT WHERE THE EVENT HANDLER IS ATTACHED, ONLY THE COLOR OF THIS ELEMENT CHANGES

// ///////////////IF WE WANT TO CATCH EVENTS IN THE CAPTURING PHASE/////////////

// ///////////////////////if we want to catch events in the capturing phase, we add a third parameter (we pass true or false {false is by default})//////////////////////

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     console.log('LINK');
//     this.style.backgroundColor = randomColor();

//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true //the third parameter (use capture parameter) is set to true, the event handler will no longer listen to bubbling events but to capturing events
// );

// // the first element through which the event passes is the navigation, when we now click on "Features", NAV will be the first appearing as it is now listening to the event as it travels down first (in the Capturing Phase), then comes the LINK and CONTAINER that listen for events when it travels up (in the Bubbling phase)

// //listening to capturing and bubbling both exists due to historical reasons, when different browsers implemented different versions of JS

///////////////////////////////////////////////////////////////////////////////////////

////////////////////EVENT DELEGATION: Implementing Page Navigation/////////////////////

//we use the power of event bubbling to implement event delegation

//we implement a smooth scrolling behavior to the navigation, so that when we click one on these links, then it automatically scrolls smoothly to the corresponding section

//*************************************************************** */
//we do this in the page navigation section in the top part of the code
//**************************************************************** */

///////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////DOM TRAVERSING////////////////////////////////////////////////

// const hOne = document.querySelector('h1');

// ////////////////going downwards in the DOM, selecting child elements////////////

// //using querySelector / querySelectorAll

// console.log(hOne.querySelectorAll('.highlight')); //returns a nodeList of all the child elements of the h1 element, with the class 'highlight',

// //******************************************************* */
// // this works no matter how deep these child elements would be inside of the h1 element
// //****************************************************** */

// ///////////to get the direct children////////////

// console.log(hOne.childNodes); //"childNodes" returns all the child nodes of the h1 element (as nodes can be anything, we get texts, comments, etc)

// console.log(hOne.children); //"children" returns a HTMLCollection, which has the children element of the h1 element

// /////////////////////////////////////////////////

// //////////first and last element child///////////

// hOne.firstElementChild.style.color = 'white'; //first child element of h1

// hOne.lastElementChild.style.color = 'orangered'; //last child element of h1

// /////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////

// /////////////////////going downwards in the DOM, selecting the parent elements///////////

// console.log(hOne.parentNode); //returns the parent nodes

// console.log(hOne.parentElement); //returns the parent elements

// //////////////////if we need a perent element which is not an immediate parent////////////////

// //"closest" returns the parent element of the h1 element of all the elements with class "header"

// hOne.closest('.header').style.background = 'var(--gradient-secondary)'; //the "closest" method recieves a query string, just like querySelector and querySelectorAll

// //if the selector (here ".header") actually matches the element on which we are calling the closest method, then that same element is returned

// console.log(hOne.closest('h1')); //the same h1 element

// //can look at closest as opposite of the querySelector, both recieve a query string, where the querySelector finds a child element no matther how deep it is, closest finds the parent element no matter how high up it is

// /////////////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////going sideways in the DOM, selecting the sibling elements//////////////

// //for some reasons we can only access the direct/immediate siblings in JS, (only the previous and the next element)

// console.log(hOne.previousElementSibling); //immediate previous element sibling

// console.log(hOne.nextElementSibling); //immediate next element sibling

// ////////////////////////////with nodes siblings/////////////////////////////////////

// console.log(hOne.previousSibling); //previous sibling node

// console.log(hOne.nextSibling); //next sibling node

// ////////////////////////////////////////////////////////////////////////////////////

// //if we need all the siblings and not just the previous and the next one, then we can use the trick of moving up the parent element and then read all the child elements from there

// console.log(hOne.parentElement.children); //all the siblings of the h1 element

// //even if children returns a HTMLCollection we can still spread it into an array (as an HTMLCollection is still an iterable)

// [...hOne.parentElement.children].forEach(function (el) {
//   //comparisions between elements works fine (el !== h1)
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////Lifecycle DOM Events////////////////////////////////

//lifecycle- starts right from the moment the page is first accessed, untill the user leaves it.

///////////////////DOMContentLoaded//////////////////

//DOMContentLoaded, is fired by the document as soon as the HTML is completely parsed, which means that the HTML has been downloaded and converted into a DOM tree, all scripts are also downloaded and executed

//also, this event does not wait for the images and all the other external resources to load (just HTML and JS needs to be loaded)

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree build', e);

  //inside the function, we can have code we want to be executed only after the DOM is available (finished executing), we want all our JS code only after the DOM is ready, but we do not need to wrap our entire code inside of this function as we have the script tag at the very end of the HTML file, and that it will be read only after all of the HTML is already parsed anyway.
});

//we can see in the network tab, the "DOMContentLoaded" time

// "document.ready" in jQuery is equivalent to "DOMContentLoaded" in JS

/////////////////////////////////////////////////////

///////////////////LOAD Event////////////////////////

//the "load" event is fired by the window, as soon as not only the HTML is parsed but also all the images and external resources like CSS files are also loaded

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//we can see in the network tab, the "Load" time
//we can also see the amount of data that was downloaded

/////////////////////////////////////////////////////

///////////////"beforeunload" Event//////////////////

//the "beforeunload" event is also fired by the window, this event is created immediately before a user is about to leave a page (for example- when the user clicks the X button on the tab)

window.addEventListener('beforeunload', function (e) {
  //in some browsers we need to preventDefault, chrome does not require that though
  e.preventDefault();

  console.log(e);

  //in order to display the leaving confirmation we need to set the "returnValue" on the event to an empty string ("") [this is due to historical reasons]
  // e.returnValue = ''; //this pops a tab with message "Changes you made may not be saved.", a long time ago, the message inside of it could be changed but people abused it, so we can now only see the generic message since then

  // e.returnValue = 'custom message'; //we always get the same pop up, message inside of the string does not show up
});

/////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////

//////////////////////Efficient Loading: defer and async///////////////////////////////

//*********************************************** */
//First half IN NOTES
//*********************************************** */
