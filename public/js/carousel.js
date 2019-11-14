//get all carousel
const carouselOne = document.querySelector("[data-target='image-slider']"),
      carouselTwo = document.querySelector("[data-target='text-slider']"),
      carouselThree = document.querySelector("[data-target='heading-slider']");

//acquire buttons
const leftButton = document.querySelector("[data-action='slideLeft']"),
      rightButton = document.querySelector("[data-action='slideRight']");

//get the carousel width
const carouselWidth = carouselOne.offsetWidth;
// get the number of slides your going to have
const cardCount = carouselOne.querySelectorAll("[data-target='image-slide']").length;

let offset = 0;
const maxX = -((cardCount / 1) * carouselWidth - carouselWidth);

leftButton.addEventListener('click', ()=>{
  if(offset !== 0){
    offset += carouselWidth;
    carouselOne.style.transform = `translateX(${offset}px)`;
    carouselTwo.style.transform = `translateX(${offset}px)`;
    carouselThree.style.transform = `translateX(${offset}px)`;
  }  
})

rightButton.addEventListener('click', ()=>{
  if(offset !== maxX){
    offset -= carouselWidth;
    carouselOne.style.transform = `translateX(${offset}px)`;
    carouselTwo.style.transform = `translateX(${offset}px)`;
    carouselThree.style.transform = `translateX(${offset}px)`;
  }
})