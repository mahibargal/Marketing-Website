'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn)=>{
  btn.addEventListener('click', openModal);
})
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//getting elements

console.log(document.documentElement)
console.log(document.body);
console.log(document.head);

const header = document.querySelector('.header');
console.log(header)

const allSections = document.querySelectorAll('.section')
console.log(allSections);

const section1 = document.getElementById('section--1')
console.log(section1);

const allButtons = document.getElementsByTagName('button');
console.log(allButtons)

//creating element

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent ='we are just';
message.innerHTML = 'we use cookid for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';


// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true)) //for adding multiple times
// header.append(message.cloneNode(true)) //for adding multiple times

// header.before(message);
// header.after(message)

//deleting
document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
})