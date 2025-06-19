const images = [
    'images/pic-7.jpg',
    'images/pic-5.jpg',
    'images/pic-10.jpg'
  ];
  
  let currentSlide = 0;
  const hero = document.getElementById("hero");
  
  function updateSlide() {
    hero.style.backgroundImage = `url('${images[currentSlide]}')`;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    updateSlide();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateSlide();
  }
  
  updateSlide(); // initial load
  