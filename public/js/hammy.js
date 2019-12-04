const navSlide = ()=>{
  const hambutton = document.querySelector(".burger"),
        nav = document.querySelector(".nav-links"),
        navLinks = document.querySelectorAll(".nav-links a");
        

  hambutton.addEventListener('click', () => {
    nav.classList.toggle("nav-active");
    
    navLinks.forEach((links, index)=>{
      if(links.style.animation){
        links.style.animation = ''
      }else{
        links.style.animation = links.style.animation = `navframes .5s ease forwards ${index/7+.4}s`
      }      
    });
    hambutton.classList.toggle("toggle");
  });  
}

navSlide();