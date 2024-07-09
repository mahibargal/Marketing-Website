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

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.width);

//for all stylings we have to use getComputedStyle

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).width);


message.style.height = parseFloat(getComputedStyle(message).height) + 40 + 'px';

//change css variables styles

document.documentElement.style.setProperty('--color-primary','orangered');

//attributes

//standard attributrs.
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //relative url
console.log(logo.className);

//non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company','bankist');
console.log(logo.getAttribute('src')); //absolute url


console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('class1','class2');
logo.classList.remove('class2');
console.log(logo.classList.toggle('class2'));
console.log(logo.classList.contains('class1'))

