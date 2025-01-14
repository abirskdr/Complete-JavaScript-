'use strict';

//************  Topic Covered In This Module ************//
// !TOPIC 1: APIS
//    !1.1: Making API calls using XMLHTTPRequest()
//    !1.2: THE CALLBACK HELL
//  !TOPIC 2: PROMISES AND FETCH API
//    !2.1: CONSUMING PROMISES
//    !2.2: Chaining Promises
//    !2.3: HANDLING REJECTED PROMISES
//    !2.4: Throwing Errors Manually
//    !2.5:making the DRY version of the above code
//  !TOPIC 3: THE EVENT LOOP: IN PRACTICE
//  !TOPIC 4: BUILDING A SIMPLE PROMISE
//    !4.1: Consuming the promise we built
//    !4.2: Promisifying "setTimeout"
//    !4.3: creating a fulfilled or rejected promise immediately
//  !TOPIC 5: ASYNC, AWAIT
//    !5.1: ERROR HANDLING IN ASYNC, AWAIT
//    !5.2: Returning values from ASYNC functions
//  !TOPIC 6: RUNNING PROMISES IN PARALLEL
//      !6.0.a: Promise.all
//    !6.1: COMBINATOR FUNCTIONS
//      !6.1.a: Promise.race
//      !6.1.b: Promise.allSettled (ES 2020)
//      !6.1.c: Promise.any (ES 2021)
//*******************************************************/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//************************************************* */
/////////////////////in the notes/////////////////////
//************************************************* */

/////////////////////////////////////////////////////////////////////////////////

//* TOPIC 1: APIS /////////////////////////////

////////////////////rendering countries/////////////////////
const renderCountry = function (data, className = '') {
  //we want to add a class when it is a neighbouring country
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages.values}</p>
    <p class="country__row"><span>💰</span>${data.currencies}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1; //?this code is inside the "finally()" method, as we want this to happen always (when the promise is fulfilled and even when it is rejected)
};

///////////////////rendering errors/////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg); //same as insertAdjacentHTML but inserts texts

  countriesContainer.style.opacity = 1; //?this code is inside the "finally()" method, as we want this to happen always (when the promise is fulfilled and even when it is rejected)
};

/////////////////////////////////////////////////////////////////////////////////

////////////////////DATA ABOUT A COUNTRY USING AN API////////////////////

//*1.1: Making API calls using XMLHTTPRequest()

// //?In JS there are actually multiple ways of doing AJAX calls

// //?we start with the most old-school one, that is "XMLHttpRequest()"
// //?we do this to know, how AJAX calls used to be handled with events and callback function

// //putting the whole code inside of a function to get data for any country

// const getCountryData = function (country) {
//   //

//   const request = new XMLHttpRequest(); //!we create a new object request (every time, for every country)
//!  An XMLHttpRequest object can only handle a single request at a time. Once you initiate a request with a specific XMLHttpRequest object, it’s "locked" to that transaction until the response is complete. Attempting to reuse it for another request before the current transaction completes can cause unexpected behavior or errors.

//   //OPENING THE REQUEST

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //!on that object, we call "open" and pass in the type of request (here 'GET') as the first argument and a string containing the url to which the AJAX call is to be made

//   //on github we have the repository "public-apis", where we get a list of a ton of free APIs

//   //we use the "REST Countries" API, this API needs no "Auth" / authentication, HTTPS as "YES" , CORS (Cross Origin Resource Sharing) as "yes" (without CORS we cannot access a third-party API from our own code)

//   //click on the "REST Countries", we will get to the documentation page, we need to look for the API Endpoint, "endpoint" is another name for the url that we need, we see the "ALL" that gives us a list of all the countries from the API, we can make an AJAX call to that url, but instead, we want to search the API by country name so we use , "NAME" : "https://restcountries.com/v3.1/name/{name}" ... in place of the {name} we can write the name of the country we need to look for like "https://restcountries.com/v3.1/name/peru"

//   //SENDING THE REQUEST

//   request.send(); //!this will now send off the request to the url, now, in order to get the results we couldn't simply do "const result=request.send()" as the result is simply not there yet, this AJAX call that we just send off here is being done in the background, while the rest of the code is running (this is the asynchronous on-blocking behaviour)

//   //!REGISTER A CALLBACK ON THE "request" OBJECT FOR THE "load" EVENT

//   //!when we send off the request, it is fetched in the background, and once that is done it will emit the "load" event, then this callback function will be called

//    console.log(this.responseText); //?undefined (shows that "responseText" property is only set once the data arrives)

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText); //response is in the property "responseText", this property is only set once the data arrives

//     //?we get a JSON format
//     //?we convert the response into an actual JS object
//     const [data] = JSON.parse(this.responseText); //destructuring as well
//     console.log(data);

//     //making the tile with the data from the API
//     const html = `<article class="country">
//   <img class="country__img" src="${data.flags.svg}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages.values}</p>
//     <p class="country__row"><span>💰</span>${data.currencies}</p>
//   </div>
// </article>`;

//     //inserting the HTML

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1; //making the html visible
//   });
// };

// //we might see the tiles in different order when we load it a number of times, as for each function call we have an AJAX call, all these AJAX calls will run in parallel and the AJAX call that receives the data first is shown first, this shows the non-blocking behavior

// getCountryData('portugal');
// getCountryData('usa');

// //if we want to make the requests / receive the data in a specific order we have to chain the requests (making the second request, only after the first request has finished)

/////////////////////////////////////////////////////////////////////////

//************************************************* */
/////////////////how the web works in notes///////////
//************************************************* */

//*1.2: THE CALLBACK HELL/////////////////////////////

// //?previously we made AJAX calls to fetch data, there were multiple AJAX calls made which ran parallelly, and we could not control which one finished first, now we want to create a sequence of AJAX calls so that the second one finishes only after the first one has finished

// //?here we take the country's data and look for the bordering countries in the "borders" property, what we want to do now is after the first AJAX call is completed, we will get the border and also render the neighbouring country, beside the original country, in this case the second AJAX call depends on the first call, without the first call we would not know what to fetch in the second AJAX call, what we need to do is a sequence of AJAX call

// ////////////////////main function///////////////////////////
// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country
//     renderCountry(data);

//     //getting the neighbour country
//     const [neighbour] = data.borders; // destructuring to get the first border country in case there are many, same as " neighbour = data.borders[0]"

//     //if we do not have a neighbour
//     if (!neighbour) return;

//     // console.log(neighbour);//we get a code, we need to search by the code, we use this "https://restcountries.com/v3.1/alpha/{code}"

//     /////////////we call to render the next country//////////////
//     const request2 = new XMLHttpRequest();

//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);

//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);

//       //Render country
//       renderCountry(data, 'neighbour'); //now spain will be visible only after portugal is rendered, we also pass "neighbour" that is to be added as a class to the html
//     });
//   });
// };

// getCountryAndNeighbour('portugal');

// //?in the above example, we have nested callback functions, in which the second callback function which is inside the first callback, in which one AJAX call depends on another, that is why the second callback function runs only after the first callback function has finished

// //?what if we want to make more requests in sequence (print neighbours of neighbours and so on), in that case we will end up with callbacks inside of callbacks inside of callbacks, (that would create a lot of nested callbacks) for such a structure and behaviour we have a special name "Callback Hell",
//!"Callback Hell" is when we have a lot of nested callbacks, in order to execute asynchronous tasks in sequence (this happens for all asynchronous tasks and not just AJAX calls)

// // //for example:
// // setTimeout(() => {
// //   console.log('1 second passed');
// //   setTimeout(() => {
// //     console.log('2 seconds passed');
// //     setTimeout(() => {
// //       console.log('3 seconds passed');
// //       setTimeout(() => {
// //         console.log('4 seconds passed');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// // ************************************************************* */
// //! the problem with "Callback Hell" is that it makes our code look very messy and hard to maintain and difficult to understand
// // ************************************************************* */

//******************************************************** */
// //! since ES6 we can escape "Callback Hell" using promises
//******************************************************** */

/////////////////////////////////////////////////////////////////////////

//*TOPIC 2: PROMISES AND FETCH API/////////////////////////////

//! /////////////////////old way//////////////////////

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

//! ////////////////////new way///////////////////////

// //?modern way of making AJAX calls is by using the Fetch API

// //a simple "GET" request
// const request = fetch('https://restcountries.com/v3.1/name/portugal');

// //as soon as we started the request, we stored the result of that in the request variable

// console.log(request); //?immediately returns a Promise

// // Promise {<pending>}
// // [[Prototype]]: Promise
// // [[PromiseState]]: "fulfilled"
// // [[PromiseResult]]: Response

// //*********************************************** */
// /////////////about promise in notes///////////////
// //*********************************************** */

//*2.1: CONSUMING PROMISES////////////////////////////

// //?we try to do the same we did before with XMLHTTPRequest(), now with "Promises"

// //"fetch(`https://restcountries.com/v3.1/name/${country}`)"
// //!   this will then immediately return a promise, as soon as we start request, in the beginning, the promise is still pending, the asynchronous task of getting the data is still running in the background, at a certain point the promise will be settled, either in a fulfilled or a rejected state (here we assume that the promise will be fulfilled)

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       // console.log(response);
//       ////////////////output//////////////////
//       //Response {type: 'cors', url: 'https://restcountries.com/v3.1/name/india', redirected: false, status: 200, ok: true, …}
//       //
//       // body: ReadableStream    *****the data that we want***
//       //                         (cannot yet look at the data yet, in order to take a look at the data in the body, we need to call the "json()" method)*****
//       //                         json() method is available on all the response objects coming from the fetch method,
//       //
//       // bodyUsed: false
//       // headers: Headers {}
//       // ok: true
//       // redirected: false
//       // status: 200
//       // statusText: "OK"
//       // type: "cors"
//       // url: "https://restcountries.com/v3.1/name/india"
//       // [[Prototype]]: Response
//       //
//       ////////////////////////////////////////
//       // console.log(response.json()); //the json() method is also an asynchronous method, it will also return a new promise, so we have to handle that promise as well, the way we do that is by returning that promise and call then where it is recieved

//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data); //we get the data from the API
//       renderCountry(data[0]);
//     });
//   //!on all promises we can call the "then" method, and into the then method, we pass a callback function that we want to be executed when the promise is fulfilled (when the result is available)
//   //!the callback function will receive one argument, once it is called by JS, and that one argument is the resulting value of the fulfilled promise (here)
// };

// //////////////////////simplifying the above code///////////////////////

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

// ///////////////////////////////////////////////////////////////////////

// //!promises do not get rid of callbacks but of callback hell

// getCountryData('india');

/////////////////////////////////////////////////////////////////////////////////

//*2.2: Chaining Promises////////////////////////////////

// //we now want to render the neighbouring country of the country we are currently rendering

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       console.log(neighbour);
//       if (!neighbour) return;

//       //////////neighbour country////////////
//! we return the promise from here so that we do not have to handle the promise inside of another callback function, causing callback hell
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//       //?we return the promise we get from this fetch, this becomes the fulfilled value for the then method we then chain

// !      ///////////////////beginner mistake/////////////////////////
//       //   fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//       //     .then(response => response.json())
//       //     .then(data => {
//       //       console.log(data);
//       //       renderCountry(data[0], 'neighbour');

//       //!doing this also works, but this way we are back to "Callback Hell", that is we have callback functions inside of the callback functions (that is exactly what we are trying to avoid), we should always return the promise and handle it outside by simply continuing the chain
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     });
//   //************************************************************** */
//   //!the .then() always returns a promise, no matter if we actually return anything or not, however, if we do actually return a value, that will become the fulfillment value of the returned promise
//   //**************************************************************** */
// };

// //in the above code, even if we wanted the neighbour of the neighbour.... up to 10 neighbours, we can do that all without the "Callback Hell".

// //!here instead of the "Callback Hell" what we have is a "flat chain of promises"

// getCountryData('india');

/////////////////////////////////////////////////////////////////////////////////

//*2.3: HANDLING REJECTED PROMISES////////////////////////////

// //a promise in which an error happens is a rejected promise

// //!the only way in which a "fetch" promise is rejected is when the user looses his/her internet connection (we take this as the first error) [even when there is a status code of 404, the fetch promise still gets fulfilled]

// //?to simulate loosing the internet connection, we can go to the network tab and then change the speed to "offline"

// //?when we then reload the page, everything just disappears, and that is not what we want, we want to simulate that the page was first still loaded and then as the user does the request without the internet, then we want to see the error happening

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//!    //////////error handling using the second callback function////////////
//     // .then(
//     //   response => response.json(),
//     //   err => alert(err) //the second callback function gets the error thrown as an argument
//     //!second callback function that will be called when the promise is rejected
//     // )
//     //!we are displaying the error in the alert window "TypeError: Failed to fetch" and the "Uncaught error" in the console is gone, as we did actually catch the error in the second callback function, so handling the error is also called "catching the error", this is the reason why the  "Uncaught error" that we saw in the console is gone, with this we are handling the error that might occur
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       console.log(neighbour);
//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//!     //////////error handling using the second callback function////////////
//     // .then(
//     //   response => response.json(),
//     //  err => alert(err) //handling the error for the second fetch function
//     // )
//      !if we are handling the error (rejected promise) here itself, it will not propagate down to the catch, so if the error is handled in the .then() with the second callback function, it does not propagate down to the catch anymore.
//      !we call the .then() on all the promises, and .then() returns a promise as well, irrespective of whether we are returning something or not, if we are returning a value, the promised that is returned is resolved with that value.
//      !whenever an error happens or we throw an Error from a .then(), the promise returned by it is rejected, and so it can be handled in the next .then()'s second callback function, if not present, it propagates down to the catch,
//      !if two .then() are chained together to a .catch() and both .then() have the second callback function for handling rejected promises, if the promise from the first .then() is rejected, it is handled in the next .then(), but it does not propagate down to the .catch()
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Something went wrong ${err.message}. Try again`);
//     }) //!this "catch()" method will catch any error that occurs at any place in this chain, errors basically propagate down the chain until they are caught, only when they are not caught, we get the "Uncaught error" message
//     //!"catch()" itself also returns promise (that is why the "finally()" works)
//     //! we use .catch() to handle errors in one single place
//     //
//     //!if we are using the catch we do not have to look for errors ourselves, at every fetch returned promise
//     //
//     //!another method that is also available on promises
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     }); //! the callback function that is inside the "finally()" method will be called no matter what happens with the promise (i.e. it is called no matter the promise is fulfilled or rejected, the callback function will be called always)
//   //?we use this method when we want to do something that we want to happen always no matter the promise is fulfilled or rejected (like hiding the loading spinner, that we see when we load a data) (applications shows a spinner when an asynchronous operation starts, and hide it when the asynchronous operation is complete, this happens no matter the operation was successful or not)
// };

// //?only call this function whenever user clicks on button

// //?we make this so that we can have the page loaded first and then when we switch the network to offline, (and as we are offline we cannot connect to the API servers), and then when we click the button we still have the screen loaded from before, we just cannot load the data we are expecting from the API as we are offline, we et the error in the console and have the opportunity to show the error in the page as well

// btn.addEventListener('click', function () {
//   getCountryData('india');
// });

// //now when we click on the button with the network as "offline" we get the errors:

// //"net::ERR_INTERNET_DISCONNECTED"

// //?"Uncaught (in promise) TypeError: Failed to fetch" , as we have failed to fetch, this time the promise that was returned from the fetch function was actually rejected

// //?the error that is generated here is a real JS object, we can create errors in JS with a constructor ("Error()"), any error in JS that was created like this contains the "message" property (as "err.message" used here)

// //we handle that rejection

// //!2 ways of handling that rejection

// //!1) to pass a second callback function into the "then()" method, the first callback function will always be going to be called for the fulfilled promise (for a successful one), but we also have a second callback function that will be called when the promise will be rejected (the only argument that the second callback function receives is the error thrown --abir)

//? //then(response => response.json(),err => alert(err)) //second callback function that will be called when the promise is rejected

// //!2) as we have to add the second callback function in the "then()" method for every fetch(), it can be annoying, so there is a method to handle error globally at one central place no matter where they occur in the chain by adding the "catch()" method at the end of the chain, and the callback function in the "catch()" method will be same as second callback function that we add in the "then()" method

//*simulating another type of error//////////////////////

// //?if we try to search for a country that does not exist

// // getCountryData('fdsvfgvdf'); // error we get: "TypeError: Cannot read properties of undefined (reading 'flags')"

// //in the console, we can see the stack trace of the error, we can see where it is coming from,it is coming from "getCountryData"

// //?when we search for a country that does not exist, our API cannot find any country with that name,but it shows this weird error. The true error is not that "Cannot read properties of undefined (reading 'flags')", but that our API cannot find any country (reflected with the status code 404), but even when the status code is 404, the fetch promise still gets fulfilled, there is no rejection, so our catch handler cannot pick up this error, it picks up other error

//////////////////////////////////////////////////////////////////////////////////

//*2.4: Throwing Errors Manually///////////////////////////////////

// //?we want the fetch promise should be treated as it is rejected, (as we get 404 error and the promise is still fulfilled and some other error is shown)

// //as the promise is not rejected right away, we will have to do it manually

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       /////////response///////////
//       //Response {type: 'cors', url: 'https://restcountries.com/v3.1/name/fdsvfgvdf', redirected: false, status: 404, ok: false, …}
//       //
//       //*****the "ok" property is set to "false", as the "status" is 404, if the "status" was 200 the "ok" would have been "true" *****
//       //
//       // body: ReadableStream
//       // bodyUsed: true
//       // headers: Headers {}
//       // ok: false
//       // redirected: false
//       // status: 404
//       // statusText: "Not Found"
//       // type: "cors"
//       // url: "https://restcountries.com/v3.1/name/fdsvfgvdf"
//       // [[Prototype]]: Response
//       /////////////////////////////

//       //we can use the fact that the "ok" property is "false" for status code 404, for rejecting the promise ourselves
//       if (!response.ok) {
//         //!we create a new error using the Error() constructor function
//         //!the "throw" keyword will immediately terminate the current function just like return does
//         throw new Error(`Country not found (${response.status})`); //! throwing an error in any of the then methods means that the promise will immediately be rejected
//         //!so the promise in this case returned by the then handler will be a rejected promise
//         //!this rejected promise will propagate all the way down to the catch handler, and then we there render the error

//         //?if we did not have this code block that throws error, we would have the error " Cannot read properties of undefined (reading 'flags'). Try again" as the fulfilled promise that would have been returned from here would go down, and somewhere we are trying to read the "flag" from the data that we received and the data that we received does not contain the "flag" property
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];

//       //********************************************** */
//       //////when the neighbour is a random string that is not a code of any country////////
//       //? const neighbour = 'ssfdsvd'; //this gives the error, Cannot read properties of undefined (reading 'flags'), but the promise is fulfilled, the status code is "400 (Bad Request)", we want the promise to be rejected in here as well, and the error to be handled here as well

//       console.log(neighbour);
//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       //!handling the error here as well///////
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`); //now this gives the right type of error "Country not found (400)"
//       }
//       return response.json();
//      ///////////////////////////////////////////////
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Something went wrong ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // getCountryData('portugal');

// //?we handle the errors as it is not a good practice to leave the rejected promises, and also as this is the only way to show the errors messages on the screen for the user

// //?now what if the country we search the getCountryData() with exists but the neighbour does not exist, (this is not a possibility in this case but for similar cases we want to make sure we have taken care of that as well, so we set the neighbour to some string that is not the code for any country)

//*2.5:making the DRY version of the above code//////////////////

// //////////helper function/////////

//this getJSON function returns a promise
const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    return response.json();
  });
};

// //////////////DRY code///////////////////

// const getCountryData = function (country) {
//   ////////////country 1//////////////////
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       // console.log(data);
//       renderCountry(data[0]);

//       // console.log(data[0].neighbour);

//       //?if there is no property with the name "neighbours" in the data (if the country has no borders), we create a property (empty array) with the  name "neighbours" as it will later help us in error detection
//       if (!data[0].borders) {
//         data[0].borders = []; //?here
//       }
//       //////////////////country 2//////////////////

//       const neighbour = data[0].borders[0];

//       // console.log(neighbour); //this is now undefined in the case of countries which have no neighbours

//       // if (!neighbour) return; //this still gives the error "Cannot read properties of undefined (reading '0')", for countries which have no neighbour, whereas we want to give the error that the country has no neighbour

//       if (!neighbour) throw new Error('No neighbour found');

//       //when the neighbour is a random string that is not a code of any country
//       // const neighbour = 'ssfdsvd';

//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Neighbour not found'
//       );
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(err.message);
//       renderError(`Something went wrong ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('india');
// });

//handling another error when there is no neighbour of the country
// getCountryData('Australia');

//////////////////////////////////////////////////////////////////////////////////

//**************************************************************** */
//////////////look at the notes for event loop explanation///////////
//**************************************************************** */

//*TOPIC 3: THE EVENT LOOP: IN PRACTICE////////////////////////////////

//* example 1

// console.log('Test start');

// setTimeout(() => console.log('0 sec timer'), 0); // the timer gets over at 0 seconds, i.e. immediately, so the callback function is sent to the callback queue immediately (i.e. after 0 seconds)

// //building a promise that resolves immediately
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // "Promise.resolve('x')  lets us create a promise that is immediately resolved, one that has immediate success value, and "x" is the success value,(the value that we pass in the "resolve()")

// console.log('Test end');

//! ///////////////////console///////////////////////

//! // Test start
//! // Test end
//! // Resolved promise 1
//! // 0 sec timer

//! // 1) Test start *****top level code comes first (code outside of any callback)

//! // 2) Test end *****top level code comes first (code outside of any callback)

//! //the timer and the promise will finish at the exact same time (timer: right after 0 seconds, and the promise: immediately returns result (0 seconds)) but the promise callback (microtask) is executed first and appears first and then the timer callback appears

//! // 3) Resolved promise 1 *****the promise callback or the "microtask" is pushed into the "MICROTASK QUEUE" from the WEB API ENVIRONMENT, as soon as the promise is resolved (fulfilled) i.e. immediately (0 seconds), and the "microtask queue" have priority over the "callback queue" for the EVENT LOOP (i.e. event loop prefers microtask queue over callback queue to be executed first), the microtask queue can cut the callback queue and stop the callback functions from executing, until all the microtasks are executed and the microtask queue is empty as of that point of time

//! // 4) 0 sec timer *****the callback function is sent to the "CALLBACK QUEUE" from the WEB API ENVIRONMENT, as soon as the timer is over (here 0 seconds, i.e. immediately), as we have a microtask and a callback in the microtask queue and the callback queue respectively at the same time, the microtask will be executed first and the callback function will wait till the execution of the microtask will get over

// //******************************************** */

//* example 2

//! //effect of "microtask queue" having a priority over the "callback queue" on timers

// console.log('Test 2 start');

// setTimeout(() => console.log('0 sec timer'), 0); ////? the timer gets over at 0 seconds, i.e. immediately, so the callback function is sent to the callback queue immediately (i.e. after 0 seconds)

//! //building a promise that resolves immediately
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {} //? inside the microtask, we have a really heavy task that takes long time to execute (for loop that takes a long time to loop over this large number)
//   console.log(res);
// });

// console.log('Test 2 end');

//! //////////////////////output////////////////////////

//! // Test 2 start
//! // Test 2 end
//! // Resolved promise 2
//! // 0 sec timer

//! // 1) Test 2 start *****top level code comes first (code outside of any callback)

//! // 2) Test 2 end *****top level code comes first (code outside of any callback)

//! //as seen before the "microtask queue" has higher priority over the "callback queue" so the microtask is executed first and then the callback is executed, but we do not see the callback being executed (result printed in console), immediately, that is as soon as the timer ends here (i.e. 0 seconds), but we see that it appears in the console after some time, and that time is the time the microtask takes to execute in the call stack (as we have a heavy task here in the microtask, it takes a little while to get executed), while the callback function is still waiting in the console after the timer is over

//! //this tells us that there is no guarantee that the timer callback will get executed exactly after the timer is over, it depends on the number of callbacks already waiting in the callback queue to be executed and also if there are microtasks in the microtask queue, the timer callback gets executed only after the timer is over

//! //if we keep adding more and more microtasks, the callbacks from the callback queue might never get executed

//! // 3) Resolved promise *****takes a while as we have a heavy task (large for loop) in the microtask

//! // 4) 0 sec timer *****takes moe that 0 seconds to come up in the console (comes only after the microtask is over)

//! //cannot really do high precision  things using JS

// //******************************************** */

//////////////////////////////////////////////////////////////////////////////////

//*TOPIC 4: BUILDING A SIMPLE PROMISE///////////////////////////////////

//? ////////////////////Lottery analogy of "Promises"////////////////////

//! //we create a new promise using the "Promise()" constructor

//! //this means that promises are essentially a special kind of object in JS

//! //the "Promise()" constructor takes exactly one argument, that is the so-called "executor function"

//! //as soon as the "Promise" constructor runs, it will automatically call the "executor function" (immediately), and as it executes the "executor function" it will do so by passing in two other arguments, these two arguments are the "resolve" and the "reject" functions, but, its not mandatory that we have to take both of the arguments and make two parameters

//? //we store the new promise in the lotteryPromise variable
// const lotteryPromise = new Promise(function (
//!   //the executor function will contain the asynchronous behaviour that we are trying to handle with the promise, the executor function should eventually produce a result value, the value that is basically going to be the future value of the promise

//?   //the two arguments
//   resolve,
//   reject
// ) {
//?   //lets say we win in 50% of the cases and loose in the other 50%
//   // if (Math.random() >= 0.5) {
//?   //   //we win the lottery (a fulfilled promise)
//!   //   //in order to set the promise as fulfilled, we use the "resolve" function, (calling the "resolve" function will mark this promise as a fulfilled promise, or resolved promise)
//!   //   resolve('You WIN 🙌'); //into the "resolve" function we pass the fulfilled value of the promise, so that it can later be consumed with the "then()" method, whatever value we pass into the resolve function, it will be the result of the promise  that will be available in the then() handler
//   // } else {
//?   //   // we loose the lottery (a rejected promise)
//!   //   //in order to reject a promise we call the "reject" function (calling the "reject" function will mark this promise as a rejected promise)
//!   //   reject('You LOST 🤷‍♀️'); //into the "reject" function we pass in the error message that we later want to be able to get in the catch method
//   // }

//?   ////////////////the above code is not asynchronous/////////////////
//?   //we simulate the asynchronous behavious by adding the code into a setTimeout function that will give us the delay between buying the lottery and getting the result

//!   //this is how we encapsulate any asynchronous behaviour into the promise

//   console.log('Lottery bought and waiting for the draw result');

//   setTimeout(function () {
//     ////////the above code////////
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 🙌');
//     } else {
//       reject(new Error('You LOST 🤷‍♀️')); //creating a new error object
//       //we see the error and which line it is coming from
//     }
//   }, 2000);

//   ///////////////////////////////////////////////////////////////////
// });

//*4.1: Consuming the promise we built/////////////////////////

//! //lotteryPromise is now a promise object on which we can call the "then()" method and the "catch()" method

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//? //the "res" and the "err" will be exactly the string that we passed into the resolve() and the reject() function

//? //as we keep reloading, we keep getting different results (the different states the promise takes (resolved and rejected))

// /////////////////////////////////////////////////////////////////////////

//! //In practice, we only consume promises most of the time, we only built promises to wrap old callback based functions into promises, this process is called "Promisifying", it is basically converting callback based asynchronous behaviour function to promise based function

//*4.2: Promisifying "setTimeout"///////////////////////

//! // we "promisify" the setTimeout (callback based function) function and create a "wait" function

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     //we return a new promise

//!     //in this case we do not need the reject function as it is impossible for the timer to fail, so we do not specify the reject parameter
//? closure noticed here: seconds is in the outer function
//     setTimeout(resolve, seconds * 1000); //?here we do not pass any value into the resolve function as it is not necessary, we just call the resolve function when the timer is over of the setTimeout function
//   });
// };

//! //////////////consuming the above promise/////////////////

// wait(1) //?we call the wait function with a number (in seconds) that we want to set as the timer of the setTimeout function
//   .then(() => {
//     console.log('1 second passed'); //?consuming the promise
//     return wait(1); //?returning another promise
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     //consuming the promise returned by the above "then()"
//     console.log('4 seconds passed');
//   });

//? //now with this we have once again a nice chain of asynchronous behaviour that happens nicely in a sequence, all without callback hell

//! //now we can chain the setTimeout function without callback hell

// // setTimeout(() => {
// //   console.log('1 second passed');
// //   setTimeout(() => {
// //     console.log('2 seconds passed');
// //     setTimeout(() => {
// //       console.log('3 seconds passed');
// //       setTimeout(() => {
// //         console.log('4 seconds passed');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// /////////////////////////////////////////////////////////////////////////

//*4.3: creating a fulfilled or rejected promise immediately//////////

// Promise.resolve('abc') //!resolve() is a static method on the "Promise" constructor, in the resolve(), we can pass in a value that we want to become the resolved value of the resolved Promise
//   .then(x => console.log(x)); //?immediately resolved

// Promise.reject('abc').catch(x => console.error(x)); //!immediately rejected

// /////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////

//*TOPIC 5: ASYNC, AWAIT  //////////////////////////////////////////////

//! //since ES 2017 there is even a better and easier way of consuming promises, and that is called, async, await

//! //we start by creating a special kind of function that is async function

//? //in this lecture we will recreate the "whereAmI" function

//? //we make the "async" function by adding the "async" in front of the function

//! //this function keeps running in the background while performing the code inside of it, and then when the function is done, it automatically returns a promise

//! /////////////////////promise from getPosition////////////////////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// /////////////////////////////////////////////////////////////////////////

// const whereAmI = async function (country) {
//?   //inside the "async" function we can have one or more "await" statements
//   //
//?   //we need a promise with an "await"
//   //
//!   //we use the "await keyword" to "await" for the result of this promise, basically "await" will stop the code execution at this point of the function, until the promise is fulfilled (here, until the data is fetched)
//   //
//   //***************************************************************** */
//!   //stopping execution inside an async function is not a problem as this function is running the function asynchronously and also as we are not blocking the execution of the main thread of execution (not blocking the call stack)
//   //***************************************************************** */
//   //
//?   /////////we perform the same as in this code, with async, await///////
//   // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
//   //   console.log(res)
//   // );
//   //
//?   /////////////same as the above code using async, await/////////////////
//   // const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//   // console.log(res);
//   ///////////////////////////////////////////////////////////////////////

//!   ///////////////we get the promise from getPosition and consume it using the async, await/////////////////

//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   //reverse geocoding
//   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   //country data
//   const res = await fetch(
//     `https://restcountries.com/v3.1/name/${dataGeo.country}`
//   );
//   console.log(res);
//   const data = await res.json(); //?previously we had to return the promise ( res.json()) and then chain another "then()" handler
//   console.log(data);
//   renderCountry(data[0]);
// };

// whereAmI(); //!when we call the function here, the async function is loaded off to the background and not block the main thread, and our code will move on to the next line

// console.log(`First`);

//! //"async, await" is simply syntactic sugar over the "then" method in promises, behind the scenes we are still using promises, we are just using a different way of consuming the promises

///////////////////////////////////////////////////////////////////////////////////

//*5.1: ERROR HANDLING IN ASYNC, AWAIT//////////////////////////////

//! //since we cannot use "catch()" in the async, await as we do not actually have anywhere to attach it, so instead we use something called a "try/catch" statement

//! //"try/catch" statement is actually used in regular JS as well, has been in the JS language probably since the beginning and has nothing to do with async, await

//? //we can still use it to catch the errors in async functions

//! ////////regular JS code//////////

// // let y = 1;
// // const x = 2;
//? // x = 3; //instead of reassigning to y, we reassign x (which is a constant)

//? // //this block of code gives error:
//? // // TypeError: Assignment to constant variable.

// /////////////////////////////////

//! // //we put the code in the try block
// // try {
// //   let y = 1;
// //   const x = 2;
// //   x = 3;
// // } catch (err) {
//! //   //the catch block will get the error as an argument
//! //   //we can then have access to the error, that is in the code in the try block
// //   // alert(err.message);
// // }

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);

//     //?for this promise we do not need to throw an error manually as in this case, if something goes wrong, we already built our promise so that it automatically rejects in that case
//   });
// };

// const whereAmI = async function (country) {
//   //we wrap the entire code part of the function in the "try" block
//   try {
//     //geoposition
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     //reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

//!     ////////////throwing error ourselves/////////////
//     //!for 403, 404 errors, (in which the promise does not get rejected)
//     if (!resGeo.ok) {
//       throw new Error('Problem getting loaction data');
//     }

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     //country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );

//!     ////////////throwing error ourselves/////////////
//     //!for 403, 404 errors, (in which the promise does not get rejected)
//     if (!res.ok) {
//       throw new Error('Problem getting country');
//     }

//     console.log(res);
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//   } catch (err) {
//!     //we handle the errors occurring in the "try" block, in the catch block

//     //************************************************************* */
//!     //the error is not really meaningful, as the fetch promise does not reject 404, 403 errors, to show these errors we have to return errors ourselves
//     console.error(err);
//     renderError(`Something went wrong ${err.message}`);
//   }
// };

// //calling the function
// whereAmI();

//////////////////////////////////////////////////////////////////////////////////////

//*5.2: Returning values from ASYNC functions//////////////////////////

//********************************************************** */
//un-comment the whole section first

//! ////////if we want to return something from the "async" function////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function (country) {
//   try {
//     //geoposition
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     //reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) {
//       throw new Error('Problem getting loaction data');
//     }
//     const dataGeo = await resGeo.json();

//     //country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) {
//       throw new Error('Problem getting country');
//     }
//     const data = await res.json();
//     renderCountry(data[0]);

//!     //returning a string
//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(err);
//     renderError(`Something went wrong ${err.message}`);

//!     /////////re-throwing the error, manually rejecting a promise that is returned from the async function/////////

//     throw err;
//   }
// };

// //"---------------" is the section of code that needs to be uncommented together

// //----------------------------------------------------------------------

//! // //if it was a simple regular function
// // const city = whereAmI();
//! // console.log(city); //we see a Promise, an "async" function always returns a promise

//? // //we do not get the string value

//! // //this is because when we console.log the "city" variable, JS has no way of knowing what will be returned, (here, the string), as the function is still running and not blocking the code out here, at this point JS has no way of knowing what will be returned from this function, so therefore, all that this function does return is a promise

//! // //the value that we return from the "async" function will become the fulfilled value of the promise that is returned by the function, that is the value that we return from the "async" function (if theres no error)

//! // ///////output/////////

// // // Promise {<pending>}
// // // [[Prototype]]: Promise
// // // [[PromiseState]]: "fulfilled"
// // // [[PromiseResult]]: undefined

// // //////////////////////

// //----------------------------------------------------------------------

// //! //what we can do to get the fulfilled value of the promise is use the then() method

// //? whereAmI().then(res => console.log(res)); // we get the result we expected

// //----------------------------------------------------------------------

//! //////////////IN CASE OF AN ERROR IN THE "TRY" BLOCK///////////////
//! // //if an error happens in the try block, the code will immediately jump to the catch block, so we will not be able to see the value we wanted to return, we instead get "undefined", interesting thing is that the log still worked, which means the callback function is running inside of the "then()", which means the "then()" method was called, which means that the promise was fulfilled and not rejected, even though there was an error in the async function. The promise that the async function returns is fulfilled and not rejected, we can see this by adding a catch() method in the chain, if the promise is rejected the "catch()" method callback will be executed but we see that "then()" is executed

//! //THIS IS BEFORE ADDING THE RE-THROWING CODE LINE IN THE catch BLOCK
// // whereAmI()
// //   .then(res => console.log(res))
// //   .catch(err => console.error(`${err.message}`)); //we see that we still get "undefined" which means that the "then()" method was executed

//? // //CONSLUSION: even if there was an error in the try block, we still get a fulfilled promise

// //---------------------------------------------------------------------

// //******************************************************************* */
//! // /////to fix that we will have to re-throw the error from the catch block/////

//! // //look at the catch block of the code for the re-thrown error

// // whereAmI()
// //   .then(res => console.log(res))
// //   .catch(err => console.error(`${err.message}`)); //now we get the error

// //----------------------------------------------------------------------

// ///////////////////////////////////////////////

// // console.log('1:Will get location');
// // whereAmI();
// // console.log('3:Finished getting location');

//! // //////////in the output we see////////////

// // // 1:Will get location
// // // 3:Finished getting location
// // // the async function

//! // //the log from "async" function will be printed last as it is a asynchronous function, JS immediately moves to the next line when it comes across an "async" function, making the async function run in the background until the results are there

// // //****************************************** */

//! // //if we want to print the 3 after "async" function is executed, we use "finally()"

// // console.log('1:Will get location');
// // whereAmI().finally(() => console.log('3:Finished getting location')); //works as expected, 1, the async function, 3

// // // console.log('3:Finished getting location');

// ///////////////////////////////////////////////

// //----------------------------------------------------------------------

//! // //the chaining with "then()", "catch()", "finally()" kind of mixes the philosophy of "async, await" and handling promises using the "then()", "catch()", "finally()", we are mixing the old and the new way of working with promises all in the same code

// // //whereAmI()
// // //   .then(res => console.log(res))
// // //   .catch(err => console.error(`${err.message}`)).finally(console.log('3'));

//? // //we can convert the above code as "async, await"

//? // //we can do that as we can treat the "promise" returned by the "whereAmI()" just like any other promise

//! // //as of now, we cannot use "await" without the "async" function, (there is a proposal in the works to make this happen, but for now, await can only be used inside of an "async" function)

//! // //we dont want a new function here, so we use IIFE (immediately invoked funtion expressions)

// // //IIFE
// // // (function(){})();
// // //

// // (async function () {
// //   try {
// //     const city = await whereAmI();
// //     console.log(city);
// //   } catch (err) {
// //     console.error(`${err.message}`);
// //   }
// //   console.log(`3`); //this is the finally() block as in the chain
// // })();

///////////////////////////////////////////////////////////////////////////////////

//*TOPIC 6: RUNNING PROMISES IN PARALLEL/////////////////////////////////////

//! //we want to get the data of three countries at the same time, in which the order in which the data arrives does not matter

//! //the function we make will take in 3 countries and will log the capital cities of three countries as an array

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     //we use the getJSON function in the line 500

//     //! //what we did here is to run all the ajax calls one after the another even though the result of the previous call does not depend on the next call, this does not make much same as the ajax calls wait for the previous ajax calls to get over
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     // console.log(data1.capital, data2.capital, data3.capital);
//     //! // we can see in the network tab how we load the data for all the three countries separately, this happens as we are running these promises in sequence

//     //*************************************************************** */

//*6.0.a: Promise.all////////////////////////////////

//     //!we can also make the promise run in parallel (load all the three countries together at the same time) doing this saves valuable loading time
//     //!for doing that we use the "Promise.all()" combinator function, in which the "all()" is a helper function in the Promise() constructor (so it is a static method)
//     //!this function "all()" takes in an array of promises which then returns a new promise, which then runs all the promises in the array at the same time
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]); //!this returns a new promise, a promise that runs all of these promises at the same time
//     //!we can handle that promise in the exact same way as before
//     // console.log(data); //returns an array of objects
//     console.log(data.map(d => d[0].capital));
//     //!note:if one promise rejects, then the whole Promise.all() rejects as well (so we say that Promise.all() short-circuits when one promise rejects), one rejected promise is enough for the entire thing to reject
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

// //******************************************************************* */
// //!Whenever we need to do multiple asynchronous operations at the same time, and operations that don't depend on one another, we should always run them in parallel, using Promise.all()
// //******************************************************************* */

// //!Promise.all() is called a combinator as it allows us to combine multiple promises

////////////////////////////////////////////////////////////////////////////////////

//*6.1: COMBINATOR FUNCTIONS//////////////////////////////////////

//! //3 other Promise combinators (race, allSettled, any)

//*6.1.a: Promise.race/////////////////////////////////

//! //Promise.race takes an array of promises and returns a promise (this returned promise is the first settled promise from the array of promises that it receives)

//! //the promise that is returned by Promise.race is settled as soon as one of the input promises settles (settled simply means that a value is available (rejected or fulfilled), it does not matter that the promise got rejected or fulfilled)

//! //the first settled promise wins the race

// (async function () {
//   //!in the below, the three promises will race against each other (running parallelly), and if the winning promise is then a fulfilled promise, then the fulfillment value of the winning promise is going to be the fulfillment value of race promise
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]); //?we only get one result, and that is the winning promise's fulfilled value
// })();

//! //a promise that gets rejected can also win the race, so we say that Promise.race gets short-circuited when a promise is settled

//! //Promise.race is very useful to prevent against never ending promises and/or also very long promises (example: if the user has very bad internet connection, if might take a very long time for the fetch request to get a settled promise, we can create a special timeout promise that automatically rejects after a certain time has passed )

//! //a timeout function that returns a rejected promise after a certain amount of time (in seconds) that it takes as argument
// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('request took too long'));
//     }, sec * 1000);
//   });
// };

//! //has two promises in race, if the rejected promise wins, we have "request took too long" and if the fetch promise wins, we have the data of tanzania
// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(0.25),
// ]).then(res => console.log(res[0]));

// ////////////////////////////////////////////////////////////////////////

//*6.1.b: Promise.allSettled (ES 2020)/////////////////////

//! //takes in an array of promises, and returns an array off all the settled promises (no matter the promises got rejected or fulfilled)

//! //Promise.allSettled never short-circuits

// Promise.allSettled([
//   Promise.resolve('success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('another success'),
// ]).then(res => console.log(res));

//! ////////output//////////

// // (3) [{…}, {…}, {…}]
// // 0: {status: 'fulfilled', value: 'success'}
// // 1: {status: 'rejected', reason: 'ERROR'}
// // 2: {status: 'fulfilled', value: 'another success'}
// // length: 3
// // [[Prototype]]: Array(0)

// /////////////////////////

// ////////////////////////////////////////////////////////////////////////

//*6.1.c: Promise.any (ES 2021)/////////////////////

//! //Promise.any takes an array of promises, and returns the "first fulfilled promise" and ignores any rejected promises (be it first)

//! //Promise.any is very similar to Promise.race with the difference that rejected promises are ignored

// Promise.any([
//   Promise.resolve('success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err)); //does not return a rejected promise, so it is not used as no rejected promise is returned

//! ////////output///////////

// //success
// /////////////////////////

// //? //the result of Promise.any is always a fulfilled promise, unless of course all of them reject

// // Promise.any([
// //   Promise.reject('failed'),
// //   Promise.reject('ERROR'),
// //   Promise.reject('another misfire'),
// // ])
// //   .then(res => console.log(res))
// //   .catch(err => console.log(err)); //it is only in this case that the catch is used

// // //this gives an error
// // //script.js:1224 AggregateError: All promises were rejected

////////////////////////////////////////////////////////////////////////////////
