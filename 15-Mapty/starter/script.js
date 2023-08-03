'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//**********************************************************************
///////////////////////Geolocation API//////////////////////////////////

// //Geolocation API is another browser API, a modern one.

// //getCurrentPosition() takes as an input, two callback functions, the first calback function is called on success, i.e. when the browser successfully gets the user's  current location, and the second callback is the error callback which is called when there happens an error while getting the co-ordinates

// //the success callback function is called with a "position" parameter

// //we check for "navigator.geolocation" as we want to make sure we do not get any error in old browsers
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (pos) {
//       //   console.log(pos); //GeolocationPosition
//       const { latitude } = pos.coords; //destructuring used
//       const { longitude } = pos.coords; //destructuring used

//       //   console.log(latitude, longitude);
//       //creating a google map link
//       console.log(`https://www.google.com/maps/@${latitude},${longitude},16z`);
//     },
//     //second callback function, it is called when there is an error while getting the location of the user
//     function () {
//       alert('could not get your position');
//     }
//   );
// }

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
/////////////////Display a Map Using Leaflet Library////////////////////

// //Leaflet is an open-source JS library for mobile friendly interactive maps. We can use Leaflet to display maps.

// //We can download leafet to our computer or we can use the hosted version of leaflet (a version of this library that is hosted by someone else), on CDNs (Content Delivery Network).

// //We can also include it using a JS package manager (npm install leaflet)

// //We include the Hosted version and copy-paste it before our own script

// //After including the leaflet library to our project, we need to use the functions defined in the leaflet library

// //go to overview page for it

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (pos) {
//       const { latitude } = pos.coords; //destructuring used
//       const { longitude } = pos.coords; //destructuring used

//       const coords = [latitude, longitude];

//       //copied code for putting a marker and a map

//       //whatever we pass in the string in the "map('x')" function must be the id name ('x') of the element in our HTML where the map gets displayed

//       //L is the main function  that leaflet gives us as the entry point (kind of like namespace), map(), tileLayer(), setView() are some of the methods we can call on "L"

//       //L variable is a global variable inside of the script of leaflet
//       //L variable can be accessed from all the other scripts

//       //setView() takes two parameters, the first one is an array that contains latitude and longitude, and the second one is the zoom level

//       const map = L.map('map').setView(coords, 13);

//       //the map is made up of tiles

//       //openstreetmap is an opensource map that everyone can use for free
//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       //adding a marker
//       //marker also takes an array as a parameter
//       L.marker(coords)
//         .addTo(map)
//         .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//         .openPopup();
//     },
//     function () {
//       alert('could not get your position');
//     }
//   );
// }

// // console.log(firstName); //this variable is a global variable in the "other.js" script and can be accessed by other scripts that appear after the "other.js" in the HTML, but "other.js" does not have accesss to anything in "script.js" as it appears before in the HTML

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
/////////////////////Displaying a Map Marker////////////////////////////

// //We want to display a marker wherever the user clicks

// //we want to add the event handler to the map, if we attach an "addEventListener" to the map we will have no way of knowing the co-ordinates where the user clicked on the map, so we have to use something similar that is available in the leaflet library

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (pos) {
//       const { latitude } = pos.coords;
//       const { longitude } = pos.coords;

//       const coords = [latitude, longitude];

//       //we store the result of creating the map into a variable, so that we can later add ("on()") method, (a type of event listener), on the map object
//       const map = L.map('map').setView(coords, 13);

//       //map object is an object that was generated by the leaflet
//       // console.log(map);

//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       //by default we do not have a marker on our current position

//       // L.marker(coords)
//       //   .addTo(map)
//       //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//       //   .openPopup();

//       // on() is not coming from JS but a method from the leaflet library.
//       //on() method is very similar to the "addEventListener" method, takes an event (here it is "click", i.e. whenever we click on the map) as the first parameter and a callback function as the second parameter
//       //the callback function takes a parameter called "mapEvent", leaflet calls the callback function with a "mapEvent" event (just like in JS we get an access to an "event")
//       map.on('click', function (mapEvent) {
//         // console.log(mapEvent); //latlng gives the coordinates of the point where we clicked

//         const { lat, lng } = mapEvent.latlng;

//         //marker wherever we click on the map
//         L.marker([lat, lng])
//           .addTo(map)
//           //here instead of specifying a string we can also create a brand new popup objects which will then contain a couple of options
//           .bindPopup(
//             L.popup(
//               //look for Popup options in leaflet docs (Popup)
//               {
//                 maxWidth: 250,
//                 minWidth: 100,
//                 //default behaviour of popup is to close auto
//                 autoClose: false,
//                 //default behaviour is to close popup  on clicking again
//                 closeOnClick: false,
//                 //for styling, we give a className
//                 className: 'running-popup',
//               }
//             )
//           )
//           //string that is shown in the popup, returns "this" that makes it chainable
//           .setPopupContent('Workout')
//           .openPopup();
//       });
//     },
//     function () {
//       alert('could not get your position');
//     }
//   );
// }

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
//////////////////////Rendering Workout Input Form//////////////////////

// //We want to render the workout input form whenever the user clicks on the map, this form is rendered so that a new workout can be added, and on that form we add an event listener as it is only after we submit the form that we render the marker in the map at the clicked position and also render workout in the list.

// //map and mapEvent are made as global variable as they are used in the form event handler and these variables were previously inside of the geolocation event handler
// let map, mapEvent;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (pos) {
//       const { latitude } = pos.coords;
//       const { longitude } = pos.coords;

//       const coords = [latitude, longitude];

//       map = L.map('map').setView(coords, 13);

//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       //handling clicks on map
//       map.on('click', function (mapE) {
//         //mapEvent is a global variable that is used in the form event listener, so we copy the "mapE" that is passed to the callback function (which is the map event) to mapEvent
//         mapEvent = mapE;

//         //we remove the "hidden" class from the form as we want to show the form on click on the map
//         form.classList.remove('hidden');

//         //we move the cursor to the input distance
//         inputDistance.focus();
//       });
//     },
//     function () {
//       alert('could not get your position');
//     }
//   );
// }

// //eventListener on form, this is triggered when the form is submitted (using the enter key with cursor in any of its fields)
// form.addEventListener('submit', function (e) {
//   //we prevent the default behaviour of reloading the page when a form is submitted
//   e.preventDefault();

//   //clearing input fields
//   inputDistance.value =
//     inputDuration.value =
//     inputCadence.value =
//     inputElevation.value =
//       '';

//   //display marker
//   const { lat, lng } = mapEvent.latlng;
//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup',
//       })
//     )
//     .setPopupContent('Workout')
//     .openPopup();
// });

// //inputType has an eventListener which is triggered when the type is changed
// inputType.addEventListener('change', function () {
//   //we toggle the "form__row--hidden" from both inputElevation and inputCadence. so when  we change the type, visibility of these two fields are toggled
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
// });

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
/////////////////////////Project Architecture////////////////////////////

// //***************************************************** */
// //In notes
// //***************************************************** */

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
///////////////////Refactoring for Project Architectre//////////////////

// //map and mapEvents are defined as properties of the object of App
// // let map, mapEvent;

// class App {
//   //private fields
//   #map;
//   #mapEvent;

//   //"constructor" is called the moment an object is created of class "App" using the "new" keyword

//   ////////////////////constructor/////////////////////////

//   //doesn't have any parameters, if needed it can be added
//   constructor() {
//     //triggering the geolocation API
//     this._getPosition();

//     //event listeners are put inside the constructor as we want these event listeners to be set right at the beginning, inside of the constructors, these are set as soon as the object of "App" is made

//     //calls the _newWorkout method, that clears the input fields and puts the marker on the map
//     form.addEventListener('submit', this._newWorkout.bind(this)); //we use bind here as well, as it is the eventListener calling the function and so, it is called as a regular function and in a regular function, the "this" keyword is undefined, we pass the "this" keyword here that is pointing to the object calling the constructor(), as the "this" of the function

//     inputType.addEventListener('change', this._toggleElevationField);
//   }

//   ////////////////////////////////////////////////////////

//   ///////////////////////methods//////////////////////////

//   _getPosition() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         //this is the first callback function, this is called with the "position" parameter

//         //the _loadMap method is called by the function getCurrentPosition, so this is treated as a regular function call and not as a method call by some object and so the "this" keyword is undefined (in a regular function call the "this" keyword is set to undefined)
//         //*****************
//         // this._loadMap,
//         //*****************

//         //so we use the .bind(this) to manually bind the "this" keyword
//         //"this" in this function "_getPosition" points to the object calling the method
//         this._loadMap.bind(this),

//         //second callback function of getCurrentPosition, called on error getting the location
//         function () {
//           alert('could not get your position');
//         }
//       );
//     }
//   }

//   _loadMap(pos) {
//     const { latitude } = pos.coords;
//     const { longitude } = pos.coords;
//     const coords = [latitude, longitude];
//     this.#map = L.map('map').setView(coords, 13); //*****(before using .bind())*****
//     // TypeError: Cannot set properties of undefined (setting '#map'), this is because the "this" keyword here is undefined, reasons given at line:295

//     // console.log(this); //undefined *****(before using .bind())*****

//     L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);
//     //we use .bind() here as well
//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     //called with mapEvent
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   }

//   _newWorkout(e) {
//     //to prevent the default behaviour of reloading when we submit a form
//     e.preventDefault();

//     inputDistance.value =
//       inputDuration.value =
//       inputCadence.value =
//       inputElevation.value =
//         '';
//     const { lat, lng } = this.#mapEvent.latlng;
//     L.marker([lat, lng])
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup',
//         })
//       )
//       .setPopupContent('Workout')
//       .openPopup();
//   }
// }

// //creating an actual object, of class "App"

// //this doesn't need any arguments
// const app = new App();

// //this is moved into the constructor() (which also is executed as soon as the app (object) is created)
// //this piece of code gets executed right at the point the script loads
// // app._getPosition();

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
////////////////Managing Workout Data: creating Classes//////////////////

// //////////////////////WORKOUT CLASS///////////////////////

// class Workout {
//   //public fields (latest JS, not even a part of the official JS yet)
//   date = new Date();
//   //id s should be given using a library, inorder to create good and unique id s (here we are not doing that but using date)
//   id = (Date.now() + ' ').slice(-10); //taking the last 10 of the string we created from Date.now() (gives the current timestamp)

//   constructor(coords, distance, duration) {
//     //to make it work with ES6
//     // this.date=...
//     // this.id=...
//     //////////////////////////
//     this.coords = coords; // [lat,lng]
//     this.distance = distance; //in km
//     this.duration = duration; //in min
//   }
// }
// //////////////////////////////////////////////////////////

// /////////////////////CHILD CLASSES////////////////////////

// class Running extends Workout {
//   constructor(coords, distance, duration, cadence) {
//     super(coords, distance, duration);
//     this.cadence = cadence;

//     //we call the "calcPace()" in the constructor
//     this.calcPace();
//   }

//   calcPace() {
//     //in mins/Km
//     this.pace = this.duration / this.distance;
//     return this.pace;
//   }
// }

// class Cycling extends Workout {
//   constructor(coords, distance, duration, elevationGain) {
//     super(coords, distance, duration);
//     this.elevationGain = elevationGain;

//     //we call the "calcSpeed()" in the constructor
//     this.calcSpeed();
//   }
//   calcSpeed() {
//     //in Km/h
//     this.speed = this.distance / this.duration;
//     return this.speed;
//   }
// }

// //////////////////////////////////////////////////////////

// const run1 = new Running([39, -12], 5.2, 24, 178);

// const cycling1 = new Cycling([39, -12], 27, 95, 523);

// console.log(run1, cycling1);

// ///////////////////////APP CLASS//////////////////////////

// //////////////APPLICATION ARCHITECTURE///////////
// class App {
//   #map;
//   #mapEvent;

//   ////////////////////constructor/////////////////////////

//   constructor() {
//     this._getPosition();

//     form.addEventListener('submit', this._newWorkout.bind(this));

//     inputType.addEventListener('change', this._toggleElevationField);
//   }

//   ////////////////////////////////////////////////////////

//   ///////////////////////methods//////////////////////////

//   _getPosition() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         this._loadMap.bind(this),
//         function () {
//           alert('could not get your position');
//         }
//       );
//     }
//   }

//   _loadMap(pos) {
//     const { latitude } = pos.coords;
//     const { longitude } = pos.coords;
//     const coords = [latitude, longitude];
//     this.#map = L.map('map').setView(coords, 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);
//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();

//     inputDistance.value =
//       inputDuration.value =
//       inputCadence.value =
//       inputElevation.value =
//         '';
//     const { lat, lng } = this.#mapEvent.latlng;
//     L.marker([lat, lng])
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup',
//         })
//       )
//       .setPopupContent('Workout')
//       .openPopup();
//   }
// }

// const app = new App();

// //////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
/////////////////////////Creating a new Workout///////////////////////////

// //////////////////////WORKOUT CLASS///////////////////////

// class Workout {
//   date = new Date();
//   id = (Date.now() + ' ').slice(-10);

//   constructor(coords, distance, duration) {
//     this.coords = coords; // [lat,lng]
//     this.distance = distance; //in km
//     this.duration = duration; //in min
//   }
// }

// //////////////////////////////////////////////////////////

// /////////////////////CHILD CLASSES////////////////////////

// class Running extends Workout {
//   type = 'running';
//   constructor(coords, distance, duration, cadence) {
//     super(coords, distance, duration);
//     this.cadence = cadence;

//     this.calcPace();
//   }

//   calcPace() {
//     //in mins/Km
//     this.pace = this.duration / this.distance;
//     return this.pace;
//   }
// }

// class Cycling extends Workout {
//   type = 'cycling';
//   constructor(coords, distance, duration, elevationGain) {
//     super(coords, distance, duration);
//     this.elevationGain = elevationGain;

//     this.calcSpeed();
//   }

//   calcSpeed() {
//     //in Km/h
//     this.speed = this.distance / this.duration;
//     return this.speed;
//   }
// }

// //////////////////////////////////////////////////////////

// ///////////////////////APP CLASS//////////////////////////

// //////////////APPLICATION ARCHITECTURE///////////
// class App {
//   #map;
//   #mapEvent;
//   #workouts = [];

//   ////////////////////constructor/////////////////////////

//   constructor() {
//     this._getPosition();

//     form.addEventListener('submit', this._newWorkout.bind(this));

//     inputType.addEventListener('change', this._toggleElevationField);
//   }

//   ////////////////////////////////////////////////////////

//   ///////////////////////methods//////////////////////////

//   _getPosition() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         this._loadMap.bind(this),
//         function () {
//           alert('could not get your position');
//         }
//       );
//     }
//   }

//   _loadMap(pos) {
//     const { latitude } = pos.coords;
//     const { longitude } = pos.coords;
//     const coords = [latitude, longitude];
//     this.#map = L.map('map').setView(coords, 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);
//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();

//     const { lat, lng } = this.#mapEvent.latlng;

//     let workout;

//     /////////helper functions to validate the inputs///////////

//     /////////helper function to check if input is a number//////////
//     const validInputs = (
//       ...inputs //this arrow function takes arbitrary number of inputs
//     ) => inputs.every(inp => Number.isFinite(inp));
//     //every loops over the array of inputs, and checks for each input, and returns true only if "every" element follows the condition

//     ///////helper function to check if input is a positive number////
//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//     ///////////////////////////////////////////////////////////

//     /////////////////Get data from form////////////////////
//     const type = inputType.value; //is a "select" element but we still get the value using the "value" property
//     const distance = +inputDistance.value; //comes as a string, we convert it into a number
//     const duration = +inputDuration.value; //comes as a string, we convert it into a number
//     ///////////////////////////////////////////////////////

//     //////////If workout running, create running object////////////
//     if (type === 'running') {
//       const cadence = +inputCadence.value;

//       //////////////Check if data is valid//////////////////
//       //using guard clause (checking for the opposite of what we are looking for and of that is true we return)
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(cadence)
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       ) {
//         return alert('Inputs have to be positive number');
//       }
//       //creating a running object
//       workout = new Running([lat, lng], distance, duration, cadence);
//     }
//     //////////////////////////////////////////////////////////

//     //////////////if workout cycling, create cycling object//////////
//     if (type === 'cycling') {
//       const elevation = +inputElevation.value;

//       /////////////////Check if data is valid//////////////////
//       //using guard clause (checking for the opposite of what we are looking for and of that is true we return)
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(elevation)
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       ) {
//         return alert('Inputs have to be positive number');
//       }
//       //creating a cycling object
//       workout = new Cycling([lat, lng], distance, duration, elevation);
//     }
//     /////////////////////////////////////////////////////////////

//     ////////////////Add new object to workout array//////////////////
//     this.#workouts.push(workout);
//     console.log(workout);
//     /////////////////////////////////////////////////////////////////

//     ////////////////Render workout on map as marker//////////////////

//     //there is no problem with "this" keyword here as we are calling this function ourselves and also as this function is called by "this" keyword as well
//     this._renderWorkoutMarker(workout);
//     /////////////////////////////////////////////////////////////////

//     ////////////////////////Render workout on list///////////////////

//     /////////////////////////////////////////////////////////////////

//     /////////////////Hide form + clear input fields///////////////////
//     inputDistance.value =
//       inputDuration.value =
//       inputCadence.value =
//       inputElevation.value =
//         '';
//     ////////////////////////////////////////////////////////////////
//   }

//   _renderWorkoutMarker(workout) {
//     L.marker(workout.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${workout.type}-popup`,
//         })
//       )
//       .setPopupContent(`${workout.distance}`) //takes string
//       .openPopup();
//   }

//   ////////////////////////////////////////////////////////
// }

// const app = new App();

// //////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
///////////////////////////Rendering Workouts///////////////////////////

// //////////////////////WORKOUT CLASS///////////////////////

// class Workout {
//   date = new Date();
//   id = (Date.now() + ' ').slice(-10);

//   constructor(coords, distance, duration) {
//     this.coords = coords; // [lat,lng]
//     this.distance = distance; //in km
//     this.duration = duration; //in min
//     // this._setDescription(); //this code should not be here but in the child classes as they contain the "type" we need for calculation
//   }

//   //////////////////////methods///////////////////////

//   _setDescription() {
//     // prettier-ignore
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//     this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//       months[this.date.getMonth()] //getMonth() returns the current month in an integer in range [0,11], we find it in the array "months" using it as the index
//     }
//      ${this.date.getDate()}`; //getDate() returns the current date
//   }
//   //(prettier-ignore) tells prettier to ignore the next line

//   ////////////////////////////////////////////////////
// }

// //////////////////////////////////////////////////////////

// /////////////////////CHILD CLASSES////////////////////////

// class Running extends Workout {
//   type = 'running';
//   constructor(coords, distance, duration, cadence) {
//     super(coords, distance, duration);
//     this.cadence = cadence;

//     this.calcPace();

//     this._setDescription(); //this will work fine as through the scope chain the constructor method will get access to all the methods in their parent class
//   }

//   //////////////////////methods///////////////////////

//   calcPace() {
//     //in mins/Km
//     this.pace = this.duration / this.distance;
//     return this.pace;
//   }

//   /////////////////////////////////////////////////////
// }

// class Cycling extends Workout {
//   type = 'cycling';
//   constructor(coords, distance, duration, elevationGain) {
//     super(coords, distance, duration);
//     this.elevationGain = elevationGain;

//     this.calcSpeed();

//     this._setDescription(); //this will work fine as through the scope chain the constructor method will get access to all the methods in their parent class
//   }

//   //////////////////////methods///////////////////////

//   calcSpeed() {
//     //in Km/h
//     this.speed = this.distance / this.duration;
//     return this.speed;
//   }

//   /////////////////////////////////////////////////////
// }

// //////////////////////////////////////////////////////////

// ///////////////////////APP CLASS//////////////////////////

// //////////////APPLICATION ARCHITECTURE///////////
// class App {
//   #map;
//   #mapEvent;
//   #workouts = [];

//   ////////////////////constructor/////////////////////////

//   constructor() {
//     this._getPosition();

//     form.addEventListener('submit', this._newWorkout.bind(this));

//     inputType.addEventListener('change', this._toggleElevationField);
//   }

//   ////////////////////////////////////////////////////////

//   ///////////////////////methods//////////////////////////

//   _getPosition() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         this._loadMap.bind(this),
//         function () {
//           alert('could not get your position');
//         }
//       );
//     }
//   }

//   _loadMap(pos) {
//     const { latitude } = pos.coords;
//     const { longitude } = pos.coords;
//     const coords = [latitude, longitude];
//     this.#map = L.map('map').setView(coords, 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);
//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   //////////////////////method to hide form/////////////////////////////
//   _hideForm() {
//     inputDistance.value =
//       inputDuration.value =
//       inputCadence.value =
//       inputElevation.value =
//         '';
//     // we dont want the animation while hiding the form
//     form.style.display = 'none'; // so we first make the display of the form to 'none'
//     form.classList.add('hidden'); // then we add the hidden class (this code line is not enough alone )
//     // then after one second we make the display value to 'block' (this is because the animation takes 1 sec, even when the display is made 'none', the animation takes place while adding the hide class, we make it 'block' only after one sec)
//     setTimeout(() => (form.style.display = 'grid'), 1000);
//   }
//   //////////////////////////////////////////////////////////////////////

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();

//     const { lat, lng } = this.#mapEvent.latlng;

//     let workout;

//     /////////helper functions to validate the inputs///////////

//     /////////helper function to check if input is a number//////////
//     const validInputs = (...inputs) =>
//       inputs.every(inp => Number.isFinite(inp));

//     ///////helper function to check if input is a positive number////////
//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//     ///////////////////////////////////////////////////////////

//     /////////////////Get data from form////////////////////
//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     ///////////////////////////////////////////////////////

//     //////////If workout running, create running object////////////
//     if (type === 'running') {
//       const cadence = +inputCadence.value;

//       //////////////Check if data is valid//////////////////
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(cadence)
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       ) {
//         return alert('Inputs have to be positive number');
//       }
//       //creating a running object
//       workout = new Running([lat, lng], distance, duration, cadence);
//     }
//     //////////////////////////////////////////////////////////

//     //////////////if workout cycling, create cycling object//////////
//     if (type === 'cycling') {
//       const elevation = +inputElevation.value;

//       /////////////////Check if data is valid//////////////////
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(elevation)
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       ) {
//         return alert('Inputs have to be positive number');
//       }
//       //creating a cycling object
//       workout = new Cycling([lat, lng], distance, duration, elevation);
//     }
//     /////////////////////////////////////////////////////////////

//     ////////////////Add new object to workout array//////////////////
//     this.#workouts.push(workout);
//     console.log(workout);
//     /////////////////////////////////////////////////////////////////

//     ////////////////Render workout on map as marker//////////////////

//     //there is no problem with "this" keyword here as we are calling this function ourselves and also as this function is called by "this" keyword as well
//     this._renderWorkoutMarker(workout);
//     /////////////////////////////////////////////////////////////////

//     ////////////////////////Render workout on list///////////////////
//     this._renderWorkout(workout);
//     /////////////////////////////////////////////////////////////////

//     /////////////////Hide form + clear input fields///////////////////
//     this._hideForm();
//     ////////////////////////////////////////////////////////////////
//   }

//   _renderWorkoutMarker(workout) {
//     L.marker(workout.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${workout.type}-popup`, //responsible for the color change
//         })
//       )
//       .setPopupContent(
//         `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
//       ) //takes string
//       .openPopup();
//   }

//   //rendering new workouts in the sidebar of the user interface
//   _renderWorkout(workout) {
//     let html = `
//   <li class="workout workout--${workout.type}" data-id="${workout.id}">
//   <h2 class="workout__title">${workout.description}</h2>
//   <div class="workout__details">
//     <span class="workout__icon">${
//       workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
//     }</span>
//     <span class="workout__value">${workout.distance}</span>
//     <span class="workout__unit">km</span>
//   </div>
//   <div class="workout__details">
//     <span class="workout__icon">⏱</span>
//     <span class="workout__value">${workout.duration}</span>
//     <span class="workout__unit">min</span>
//   </div>
//   `;

//     if (workout.type === 'running') {
//       html += `<div class="workout__details">
//       <span class="workout__icon">⚡️</span>
//       <span class="workout__value">${workout.pace.toFixed(1)}</span>
//       <span class="workout__unit">min/km</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">🦶🏼</span>
//       <span class="workout__value">${workout.cadence}</span>
//       <span class="workout__unit">spm</span>
//     </div>
//   </li>`;
//     }

//     if (workout.type === 'cycling') {
//       html += `<div class="workout__details">
//       <span class="workout__icon">⚡️</span>
//       <span class="workout__value">${workout.speed.toFixed(1)}</span>
//       <span class="workout__unit">km/h</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">⛰</span>
//       <span class="workout__value">${workout.elevationGain}</span>
//       <span class="workout__unit">m</span>
//     </div>
//   </li>`;
//     }

//     //inserting html in DOM
//     form.insertAdjacentHTML('afterend', html); //'afterend' will add the new element as the sibling element at the end of the form
//   }
//   //////////////////////////////////////////////////////
// }

// const app = new App();

// //////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
//////////////////////Move to Marker on Click///////////////////////////

// //We move the map to the position of the workout that was clicked in the sidebar

// //In the initial stage of our application, we have a blank page, and no workouts on which we could click, in this situation as we dont have the element on which we want to attach the eventListener as it hasn't been created yet, so we use event delegation here, so we add the eventHandler to the parent element (element with class 'workouts') here, containerWorkouts

// //////////////////////WORKOUT CLASS///////////////////////

// class Workout {
//   date = new Date();
//   id = (Date.now() + ' ').slice(-10);
//   //new property
//   clicks = 0;
//   //////////////

//   constructor(coords, distance, duration) {
//     this.coords = coords; // [lat,lng]
//     this.distance = distance; //in km
//     this.duration = duration; //in min
//     // this._setDescription();
//   }

//   //////////////////////methods///////////////////////

//   _setDescription() {
//     // prettier-ignore
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//     this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//       months[this.date.getMonth()]
//     }
//      ${this.date.getDate()}`;
//   }

//   //new method
//   click() {
//     this.clicks++;
//   }
//   ////////////

//   ////////////////////////////////////////////////////
// }

// //////////////////////////////////////////////////////////

// /////////////////////CHILD CLASSES////////////////////////

// class Running extends Workout {
//   type = 'running';
//   constructor(coords, distance, duration, cadence) {
//     super(coords, distance, duration);
//     this.cadence = cadence;

//     this.calcPace();

//     this._setDescription();
//   }

//   //////////////////////methods///////////////////////

//   calcPace() {
//     //in mins/Km
//     this.pace = this.duration / this.distance;
//     return this.pace;
//   }

//   /////////////////////////////////////////////////////
// }

// class Cycling extends Workout {
//   type = 'cycling';
//   constructor(coords, distance, duration, elevationGain) {
//     super(coords, distance, duration);
//     this.elevationGain = elevationGain;

//     this.calcSpeed();

//     this._setDescription();
//   }

//   //////////////////////methods///////////////////////

//   calcSpeed() {
//     //in Km/h
//     this.speed = this.distance / this.duration;
//     return this.speed;
//   }

//   /////////////////////////////////////////////////////
// }

// //////////////////////////////////////////////////////////

// ///////////////////////APP CLASS//////////////////////////

// //////////////APPLICATION ARCHITECTURE///////////
// class App {
//   #map;
//   #mapZoomLevel = 13; //we use this private field to store the zoom level
//   #mapEvent;
//   #workouts = [];

//   ////////////////////constructor/////////////////////////

//   constructor() {
//     this._getPosition();

//     form.addEventListener('submit', this._newWorkout.bind(this));

//     inputType.addEventListener('change', this._toggleElevationField);

//     ////////adding eventHandler to the parent element 'workouts'////////
//     containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
//     ////////////////////////////////////////////////////////////////////
//   }

//   ////////////////////////////////////////////////////////

//   ///////////////////////methods//////////////////////////

//   _getPosition() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         this._loadMap.bind(this),
//         function () {
//           alert('could not get your position');
//         }
//       );
//     }
//   }

//   _loadMap(pos) {
//     const { latitude } = pos.coords;
//     const { longitude } = pos.coords;
//     const coords = [latitude, longitude];
//     this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

//     L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);
//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(mapE) {
//     this.#mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _hideForm() {
//     inputDistance.value =
//       inputDuration.value =
//       inputCadence.value =
//       inputElevation.value =
//         '';
//     form.style.display = 'none';
//     form.classList.add('hidden');
//     setTimeout(() => (form.style.display = 'grid'), 1000);
//   }

//   _toggleElevationField() {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   }

//   _newWorkout(e) {
//     e.preventDefault();

//     const { lat, lng } = this.#mapEvent.latlng;

//     let workout;

//     /////////helper functions to validate the inputs///////////

//     /////////helper function to check if input is a number//////////
//     const validInputs = (...inputs) =>
//       inputs.every(inp => Number.isFinite(inp));

//     ///////helper function to check if input is a positive number////////
//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//     ///////////////////////////////////////////////////////////

//     /////////////////Get data from form////////////////////
//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     ///////////////////////////////////////////////////////

//     //////////If workout running, create running object////////////
//     if (type === 'running') {
//       const cadence = +inputCadence.value;

//       //////////////Check if data is valid//////////////////
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(cadence)
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       ) {
//         return alert('Inputs have to be positive number');
//       }
//       //creating a running object
//       workout = new Running([lat, lng], distance, duration, cadence);
//     }
//     //////////////////////////////////////////////////////////

//     //////////////if workout cycling, create cycling object//////////
//     if (type === 'cycling') {
//       const elevation = +inputElevation.value;

//       /////////////////Check if data is valid//////////////////
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(elevation)
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       ) {
//         return alert('Inputs have to be positive number');
//       }
//       //creating a cycling object
//       workout = new Cycling([lat, lng], distance, duration, elevation);
//     }
//     /////////////////////////////////////////////////////////////

//     ////////////////Add new object to workout array//////////////////
//     this.#workouts.push(workout);
//     console.log(workout);
//     /////////////////////////////////////////////////////////////////

//     ////////////////Render workout on map as marker//////////////////

//     //there is no problem with "this" keyword here as we are calling this function ourselves and also as this function is called by "this" keyword as well
//     this._renderWorkoutMarker(workout);
//     /////////////////////////////////////////////////////////////////

//     ////////////////////////Render workout on list///////////////////
//     this._renderWorkout(workout);
//     /////////////////////////////////////////////////////////////////

//     /////////////////Hide form + clear input fields///////////////////
//     this._hideForm();
//     ////////////////////////////////////////////////////////////////
//   }

//   _renderWorkoutMarker(workout) {
//     L.marker(workout.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${workout.type}-popup`, //responsible for the color change
//         })
//       )
//       .setPopupContent(
//         `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
//       ) //takes string
//       .openPopup();
//   }

//   //rendering new workouts in the sidebar of the user interface
//   _renderWorkout(workout) {
//     let html = `
//   <li class="workout workout--${workout.type}" data-id="${workout.id}">
//   <h2 class="workout__title">${workout.description}</h2>
//   <div class="workout__details">
//     <span class="workout__icon">${
//       workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
//     }</span>
//     <span class="workout__value">${workout.distance}</span>
//     <span class="workout__unit">km</span>
//   </div>
//   <div class="workout__details">
//     <span class="workout__icon">⏱</span>
//     <span class="workout__value">${workout.duration}</span>
//     <span class="workout__unit">min</span>
//   </div>
//   `;

//     if (workout.type === 'running') {
//       html += `<div class="workout__details">
//       <span class="workout__icon">⚡️</span>
//       <span class="workout__value">${workout.pace.toFixed(1)}</span>
//       <span class="workout__unit">min/km</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">🦶🏼</span>
//       <span class="workout__value">${workout.cadence}</span>
//       <span class="workout__unit">spm</span>
//     </div>
//   </li>`;
//     }

//     if (workout.type === 'cycling') {
//       html += `<div class="workout__details">
//       <span class="workout__icon">⚡️</span>
//       <span class="workout__value">${workout.speed.toFixed(1)}</span>
//       <span class="workout__unit">km/h</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">⛰</span>
//       <span class="workout__value">${workout.elevationGain}</span>
//       <span class="workout__unit">m</span>
//     </div>
//   </li>`;
//     }

//     //inserting html in DOM
//     form.insertAdjacentHTML('afterend', html);
//   }

//   /////////////////method to move the marker on click///////////////////
//   _moveToPopup(e) {
//     const workoutEl = e.target.closest('.workout'); //whereever we click in the workout tile, it moves up to the <li> with the class "workout" (the closest method takes care of it)
//     // console.log(workoutEl); //we get the entire element we clicked on (the whole <li> element)

//     //we use the "id" to find the workout in the workouts array

//     //guard clause, when clicked anywhere else, we get "null"
//     if (!workoutEl) {
//       return;
//     }

//     const workout = this.#workouts.find(
//       work => work.id === workoutEl.dataset.id
//     );

//     console.log(workout); //we get the same workout object from the workouts array

//     //we can now take the coordinates from the "workout" object we selected and move the map,
//     //in leaflet we have the "setView" method (available on all map) that does the same thing
//     //READ THE DOCUMENTATION ON THIS METHOD ON LEAFLET
//     this.#map.setView(workout.coords, this.#mapZoomLevel, {
//       animate: true,
//       pan: { duration: 1 },
//     }); //the first argument is the coordinates (here in an array), and the second argument is the zoom level, and the third argument is an objects of options

//     //using the public interface
//     workout.click();
//   }

//   //////////////////////////////////////////////////////
// }

// const app = new App();

// //////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
///////////////////////Working with LocalStorage////////////////////////

//we will use the localStorage API to store the data

//local storage is a place in our browser where we can store data that will stay there even after we close the page (data is linked to the url, on which we are using the application)

//whenever there is a new workout, we will take the entire workouts array and store it in local storage

//and then whenever the page loads, we will restore all the workouts from the local storage and render them on the map and also on the list

//and so when we reload the page, it will then appear as if all the workouts we had previously are still in the same page

//////////////////////WORKOUT CLASS///////////////////////

class Workout {
  date = new Date();
  id = (Date.now() + ' ').slice(-10);
  //new property
  clicks = 0;
  //////////////

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
    // this._setDescription();
  }

  //////////////////////methods///////////////////////

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    }
     ${this.date.getDate()}`;
  }

  //new method
  click() {
    this.clicks++;
  }
  ////////////

  ////////////////////////////////////////////////////
}

//////////////////////////////////////////////////////////

/////////////////////CHILD CLASSES////////////////////////

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace();

    this._setDescription();
  }

  //////////////////////methods///////////////////////

  calcPace() {
    //in mins/Km
    this.pace = this.duration / this.distance;
    return this.pace;
  }

  /////////////////////////////////////////////////////
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();

    this._setDescription();
  }

  //////////////////////methods///////////////////////

  calcSpeed() {
    //in Km/h
    this.speed = this.distance / this.duration;
    return this.speed;
  }

  /////////////////////////////////////////////////////
}

//////////////////////////////////////////////////////////

///////////////////////APP CLASS//////////////////////////

//////////////APPLICATION ARCHITECTURE///////////
class App {
  #map;
  #mapZoomLevel = 13; //we use this private field to store the zoom level
  #mapEvent;
  #workouts = [];

  ////////////////////constructor/////////////////////////

  constructor() {
    this._getPosition();

    /////////getting data from local storage///////////
    this._getLocalStorage(); //this method here gets executed right in the beginning
    ///////////////////////////////////////////////////

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  ////////////////////////////////////////////////////////

  ///////////////////////methods//////////////////////////

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('could not get your position');
        }
      );
    }
  }

  _loadMap(pos) {
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));

    //******************************************
    //at this point the map is already available

    this.#workouts.forEach(work => {
      //to add the marker back on the map
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;

    let workout;

    /////////helper functions to validate the inputs///////////

    /////////helper function to check if input is a number//////////
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    ///////helper function to check if input is a positive number////////
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    ///////////////////////////////////////////////////////////

    /////////////////Get data from form////////////////////
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    ///////////////////////////////////////////////////////

    //////////If workout running, create running object////////////
    if (type === 'running') {
      const cadence = +inputCadence.value;

      //////////////Check if data is valid//////////////////
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Inputs have to be positive number');
      }
      //creating a running object
      workout = new Running([lat, lng], distance, duration, cadence);
    }
    //////////////////////////////////////////////////////////

    //////////////if workout cycling, create cycling object//////////
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      /////////////////Check if data is valid//////////////////
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(elevation)
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Inputs have to be positive number');
      }
      //creating a cycling object
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    /////////////////////////////////////////////////////////////

    ////////////////Add new object to workout array//////////////////
    this.#workouts.push(workout);
    console.log(workout);
    /////////////////////////////////////////////////////////////////

    ////////////////Render workout on map as marker//////////////////

    //there is no problem with "this" keyword here as we are calling this function ourselves and also as this function is called by "this" keyword as well
    this._renderWorkoutMarker(workout);
    /////////////////////////////////////////////////////////////////

    ////////////////////////Render workout on list///////////////////
    this._renderWorkout(workout);
    /////////////////////////////////////////////////////////////////

    /////////////////Hide form + clear input fields///////////////////
    this._hideForm();
    ////////////////////////////////////////////////////////////////

    /////////////////Set local storage to all workouts/////////////////
    this._setLocalStorage();
    ///////////////////////////////////////////////////////////////////
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, //responsible for the color change
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      ) //takes string
      .openPopup();
  }

  //rendering new workouts in the sidebar of the user interface
  _renderWorkout(workout) {
    let html = `
  <li class="workout workout--${workout.type}" data-id="${workout.id}">
  <h2 class="workout__title">${workout.description}</h2>
  <div class="workout__details">
    <span class="workout__icon">${
      workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
    }</span>
    <span class="workout__value">${workout.distance}</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">${workout.duration}</span>
    <span class="workout__unit">min</span>
  </div>
  `;

    if (workout.type === 'running') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    }

    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;
    }

    //inserting html in DOM
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) {
      return;
    }

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    //using the public interface
    // workout.click(); //*****we have to disable this as the objects recovered from local storage does not inherit this method anymore*****
  }

  ////////////method for setting data in the local storage//////////////

  _setLocalStorage() {
    //localStorage is an API that the browser provides us

    //we store data in localStorage in form of key:value pair where both are strings

    //"setItem()" is a method that takes two arguments, both strings, the first one is a string that becomes the 'key', and the second one is a string that becomes the 'value'

    //with this we are setting all the workouts to the local storage

    //local storage is a simple API so it is adviced to use for small amounts of data [local storage is blocking], so we shouldn't use local storage for storing large amounts of data, as it will surely slow down the application
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); //JSON.stringify converts objects to strings

    //find this stored in the 'local storge' in the applications tab [left bar]-> storage-> local storage [inside it]
  }

  /////////////method for getting data from the local storage///////////

  _getLocalStorage() {
    //"getItem()" is a method that takes a single argument, that is the 'key'

    //using the 'key' we can get the 'value' corresponding to it from the localStorage
    const data = JSON.parse(localStorage.getItem('workouts')); //JSON.parse converts string to objects (array of objects)

    console.log(data); //gives an array of objects

    //guard clause to check if there is some data
    if (!data) {
      return;
    }

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);

      //to add the marker back on the map
      // this._renderWorkoutMarker(work); //*****error:Cannot read properties of undefined*****
      //we get this error as this method "_getLocalStorage" is executed right at the beginning, as soon as the page loaded, however at this point the map has not yet been loaded, so we are trying to add the marker to the map which has not defined yet

      //SOLUTION:we add the markers to the map only after the map has been loaded, so we put that logic in the method "_loadMap".
    });

    //******************************************
    ////////////we have a problem...////////////
    // we get an error when we click on the workout to move the map on the workout (which works fine), but the "clicks" property does not increase as it should (click() method is inherited from the workout class, it increases the "clicks")
    //error:-
    //workout.click is not a function
    //reason:
    //when we converted the objects to string and then back to objects again, we lost the prototype chain, so these objects we recovered from the local storage are now just regular objects, and are no longer objects ceated by the "Running" or the "Cycling" class, so they will not be able to inherit any of their methods, that they did before
    //OBJECTS RECOVERED FROM LOCAL STORAGE WILL NOT INHERIT ALL THE METHODS THAT THEY DID BEFORE
    //To fix it by looping over the "data" and restoring the objects by creating a new object using the class, based on the data coming from the local storage (a bit of work)
    ////////////////////////////////////////////
    //******************************************
  }

  //we can call this in the console using "app.reset()"
  reset() {
    //we can remove items (data) from localStorage using the "removeItem()" method, and this method takes an argument that is the 'key', it is based on the key that we delete data from the localStorage
    localStorage.removeItem('workouts');

    //we can then reload the page programatically and then the application will look completely empty
    location.reload(); //location is a big object that contains a lot of methods and properties in the browser, 'reload()' is one of them, which reloads the page
  }

  //////////////////////////////////////////////////////
}

const app = new App();

//////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//**********************************************************************

//**********************************************************************
///////////////////////Final Considerations/////////////////////////////

//1. ability to edit a workout, delete a workout, delete all workouts, from the UI

//2. we could add the abitily to sort workout by a certain fields

//3. Re-build Running and Cycling objects coming from local storage

//4. more realistic error and confirmation messages

//5. Ability to position the map to show all workouts [very hard]

//6. Ability to draw lines and shapes instead of just points [v. hard]

//7. Geocode location from coordinates

//8. Display weather data for workout time and place

////////////////////////////////////////////////////////////////////////
//**********************************************************************
