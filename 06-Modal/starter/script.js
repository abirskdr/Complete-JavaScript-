'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// const btnsOpenModal = document.querySelector('.show-modal'); //limitations of querySelector:Whenever we use querySelector for a class that is shared by multiple elements, only the first one is selected.
// console.log(btnsOpenModal); //only Show modal 1 is selected

//so we use .querySelectorAll
const btnsOpenModal = document.querySelectorAll('.show-modal');

console.log(btnsOpenModal); //we get a node list.

// for (let i = 0; i < btnsOpenModal.length; i++)
//   console.log(btnsOpenModal[i].textContent); //we get textContent of each

//

////////////////////////////////////
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', function () {
//     //

//     //

//     // console.log('button clicked');

//     //

//     modal.classList.remove('hidden');
//     //removing the hidden class, here we do not write '.hidden' as we are not selecting through the class but are just passing the name of the class
//     //classList has some methods of its own, remove is one of them.

//     // modal.style.display = 'block'; //works same as the above code but is not preffered as here to make the box visible we just have to change one attribute, it could be that we have to change several attributes and in that situation we would have to change several style attributes.

//     overlay.classList.remove('hidden');
//   });

////////////////////////////////
// //hides on clicking the "X"
// btnCloseModal.addEventListener('click', function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// });

// //hides on clicking the blurred background
// overlay.addEventListener('click', function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// });

//

/////////////////////////////////
//Refactoring
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal); //remember to not call the function as closeModal() as JS will call that function as soon as the line is executed and we do not want that, we want to call that function only after the click happens.

overlay.addEventListener('click', closeModal);

//Keyboard Events

//Keyboard events are  so-called global events cause they do not happen on one specific element, and so we usually list them on the whole document(document.addEventListener).

//document.addEventListener(); //listening for events everywhere,no matter where they happen on the page they will always trigger the event handler that we are going to specify.

//Three types of events for the keyboard: Keydown (fired as soon as we press down a key), keypress (fired continuously as we keep our finger on a certain key), keyup (when we lift our finger off the key)

document.addEventListener('keydown', function (e) {
  //so to know which was pressed (to look at the object) we give it a parameter, "e" event.
  console.log('A key was pressed'); //when this event occurs of keypress, JS creates an object that keeps all the information about the event,and we can access the object (in the eventHandler function) to know about the events.
  console.log(e); //gives us the object.
  console.log(e.key); //gives us the key that was pressed.

  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal(); //Here we actually need to call the function.
    }
  }
});
