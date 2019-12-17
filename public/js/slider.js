const slide = document.querySelectorAll(".slide-info"),
      nex = document.querySelector("#next"),
      previous = document.querySelector("#prev");

const nextSlideTwo = () => {
  const currant = document.querySelector(".currant");
  currant.classList.remove("currant");
  if(currant.nextElementSibling){
    currant.nextElementSibling.classList.add("currant");
  } else{
    slide[0].classList.add("currant");
  }
};

const prevSlideTwo = () => {
  const currant = document.querySelector(".currant");
  currant.classList.remove("currant");
  if(currant.previousElementSibling){
    currant.previousElementSibling.classList.add("currant");
  }else{
    slide[slide.length - 1].classList.add("currant");
  }
};

nex.addEventListener("click", ()=> {
  nextSlideTwo();
})

previous.addEventListener("click", ()=>{
  prevSlideTwo();
})