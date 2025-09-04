const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
let index = 0;

document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % images.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
});
