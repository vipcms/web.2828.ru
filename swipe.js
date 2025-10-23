const carousel = document.getElementById('carousel');
const dots = document.querySelectorAll('.dot');
let currentIndex = 1;

// Размер одного экрана
function getScreenWidth() {
  return window.innerWidth || document.documentElement.clientWidth;
}

// Инициализация
function init() {
  const offset = getScreenWidth() * currentIndex;
  carousel.style.transform = `translateX(-${offset}px)`;
  updateDots(currentIndex % dots.length);
}

init();

function updateCarousel(index) {
  const offset = getScreenWidth() * index;
  carousel.style.transform = `translateX(-${offset}px)`;
  updateDots(index % dots.length);
}

function updateDots(index) {
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function goToNext() {
  currentIndex = (currentIndex + 1) % 3;
  updateCarousel(currentIndex);
}

function goToPrev() {
  currentIndex = (currentIndex - 1 + 3) % 3;
  updateCarousel(currentIndex);
}

function goToFirst() {
  currentIndex = 0;
  updateCarousel(currentIndex);
}

function goToLast() {
  currentIndex = 2;
  updateCarousel(currentIndex);
}

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') goToPrev();
  if (e.key === 'ArrowRight') goToNext();
  if (e.key === 'Home') goToFirst();
  if (e.key === 'End') goToLast();
});

// Wheel support
window.addEventListener('wheel', e => {
  if (e.deltaY > 0) goToNext();
  else goToPrev();
});

// Pointer Events (мобильные устройства)
let pointerStartX = 0;
let pointerStartTime = 0;
let swipeVelocity = 0;

document.addEventListener('pointerdown', e => {
  pointerStartX = e.pageX;
  pointerStartTime = Date.now();
  swipeVelocity = 0;
});

document.addEventListener('pointerup', e => {
  const diffX = e.pageX - pointerStartX;
  const duration = Date.now() - pointerStartTime;
  if (duration < 300) {
    // Быстрый свайп → инерционный переход
    swipeVelocity = Math.abs(diffX) / duration;
    if (swipeVelocity > 0.5) {
      if (diffX > 0) goToPrev(); // right
      else goToNext();           // left
    }
  } else {
    // Медленный свайп → обычный переход
    if (Math.abs(diffX) > 30) {
      if (diffX > 0) goToPrev(); // right
      else goToNext();           // left
    }
  }
});

// Click dots
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel(i);
  });
});

// Resize
window.addEventListener('resize', () => {
  updateCarousel(currentIndex);
});