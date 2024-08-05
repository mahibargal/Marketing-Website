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
// header.append(message);
// header.append(message.cloneNode(true)) //for adding multiple times
// header.append(message.cloneNode(true)) //for adding multiple times

// header.before(message);
// header.after(message)

//deleting
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   message.remove();
// })

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
const s1Coords = section1.getBoundingClientRect();
console.log(s1Coords);
console.log(e.target.getBoundingClientRect());
console.log('Current scroll (X/Y)',window.pageXOffset,window.pageYOffset);
console.log('Height/Width viewport',document.documentElement.clientHeight,document.documentElement.clientWidth);

//old way
//scrolling
// window.scrollTo(s1Coords.left+window.pageXOffset,s1Coords.top + window.pageYOffset)

//smooth scroll
// window.scrollTo({
//   left:s1Coords.left+window.pageXOffset,
//   top:s1Coords.top + window.pageYOffset,
//   behavior:'smooth'
// })

//new way
section1.scrollIntoView({behavior:'smooth'})
})

//page nvigation

// document.querySelectorAll('.nav__link').forEach(function (elm) {
//   elm.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id)
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

//   })
// })

//above is not a proper solution as foreach loop 1000 elments , so to avoid this we use event delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(this);
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })

  }
})

const operationTabContainer = document.querySelector('.operations__tab-container');
const operationsTab = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');

//event eligation
operationTabContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if(clicked){
    //remove active classes
    operationsTab.forEach(t=>t.classList.remove('operations__tab--active'));
    operationsContent.forEach(c=>c.classList.remove('operations__content--active'))

    //activate current tab active
    clicked.classList.add('operations__tab--active');
    //activate current click data tab content
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

  }

})

//passing arg to event handler function

const nav = document.querySelector('.nav');
const onHoverOut = function (e) {
  console.log(e);
  console.log(this);
  const opacity = this
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((elm) => {
      if (elm != link) elm.style.opacity = opacity
    }
    )
    logo.style.opacity=opacity;
  }
}
//shortcut way with bind method
nav.addEventListener('mouseover', onHoverOut.bind(0.5))

//  onHoverOut(e,0.5)
// })
nav.addEventListener('mouseout', onHoverOut.bind(1))


//sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords)
// window.addEventListener('scroll',function(e){

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

//observer api
// const obsCallBack = function(entries, observer){

//   entries.forEach(entry =>{
//     console.log(entry);
//   })
// }
// const obsOptions = {
//   root:null,
//   threshold:0.1
// }
// const observer = new IntersectionObserver(obsCallBack,obsOptions)
// observer.observe(section1);

//added sticky navigation with observer;
const navHeight = nav.getBoundingClientRect().height

const callBack = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else{
    nav.classList.remove('sticky')
  }
}

const observer = new IntersectionObserver(callBack,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`
});

observer.observe(header);




//reveal sections

const allSectionss = document.querySelectorAll('.section');
const revealSection = function(entries,observer){
const [entry] = entries;
console.log(entry);

if(!entry.isIntersecting) return;
entry.target.classList.remove('section--hidden');

observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15
})

allSectionss.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

//lazy loading images

const targetImges = document.querySelectorAll('img[data-src]');
console.log(targetImges)

const lazyImagesLoad = function(entries,observer){
  const [entry] = entries;
console.log(entry);
if(!entry.isIntersecting) return;

entry.target.src = entry.target.dataset.src;

entry.target.addEventListener('load',function(){
  entry.target.classList.remove('lazy-img')

})
}
const lazyImgObserver = new IntersectionObserver(lazyImagesLoad,{root:null,threshold:0,rootMargin:'200px'})

targetImges.forEach(img => lazyImgObserver.observe(img));


//slider 

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxSlide = slides.length;
let currentSlide = 0;
// slider.style.transform ='scale(0.2) translateX(-1000px)';
// slider.style.overflow ='visible';


// slides.forEach((s,i)=>{
//   s.style.transform = `translateX(${100 * i}% )`;
// })
const dotContainer = document.querySelector('.dots');
creatDots();

const gotoSlide = function(slide){
  slides.forEach((s,i)=>{
    s.style.transform = `translateX(${100 * (i-slide)}% )`;
  })
}
gotoSlide(0);
activateDot(0)


const nextSLide = function(){
  if(currentSlide == maxSlide-1){
    currentSlide=0
  }else{
    currentSlide++
  } 
  
  gotoSlide(currentSlide);
  activateDot(currentSlide);
}

const prevSLide = function(){
  if(currentSlide == 0){
    currentSlide=maxSlide-1
  }else{
    currentSlide--
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);

}
btnLeft.addEventListener('click',prevSLide

 
  // slides.forEach((s,i)=>{
  //   s.style.transform = `translateX(${100 * (i-currentSlide)}% )`;
  // })
)
btnRight.addEventListener('click',nextSLide
  // slides.forEach((s,i)=>{
  //   s.style.transform = `translateX(${100 * (i-currentSlide)}% )`;
  // })
)


//arrowkeys work

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevSLide();
  e.key === 'ArrowRight' && nextSLide();
})

//
// dots added


function creatDots(){
  slides.forEach(function(s,i){
    const element = `<button class="dots__dot" data-slide="${i}"></button>`
    dotContainer.insertAdjacentHTML('beforeend',element)
  })
}

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
    activateDot(slide);
  }
})

function activateDot(slide){
  document.querySelectorAll('.dots__dot').forEach((dot)=>{
    dot.classList.remove('dots__dot--active');

  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  currentSlide = slide
}
// {
//   console.log('leave');
//   onHoverOut(e,1)
// })

// const h1 = document.querySelector('h1');
// const h1Alert = function (e){
//   alert('AddEventLiatner: Congrats you are reading heading');
// }

// h1.addEventListener('mouseenter',h1Alert);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter',h1Alert)
// }, 100);

// const randomInt = (min,max)=> Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = ()=> `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('LINk',e.target,e.currentTarget)
//   // console.log(randomColor())
//   console.log(this == e.currentTarget)
//   // e.stopPropagation();
// })

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('Nav links container',e.target,e.currentTarget)
//   // console.log(randomColor())
// })

// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('NAV',e.target,e.currentTarget)
//   // console.log(randomColor())
// })


// document.addEventListener('DOMContentLoaded',function(e){
//   console.log('Html is parsed and DOM built',e)
// })

// window.addEventListener('load',function(e){
//   console.log('Fully loaded',e)
// })

// window.addEventListener('beforeunload',function(e){
//   console.log(e);
//   e.returnValue = 'Message';
// })
