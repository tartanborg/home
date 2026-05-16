const carouselSlides = Array.from(document.querySelectorAll(".carousel-slide"));
const carouselDots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
const carouselButtons = Array.from(document.querySelectorAll("[data-carousel-action]"));

let activeSlide = 0;
let carouselTimer;

const showSlide = (slideIndex) => {
  if (!carouselSlides.length) {
    return;
  }

  activeSlide = (slideIndex + carouselSlides.length) % carouselSlides.length;

  carouselSlides.forEach((slide, index) => {
    const isActive = index === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  carouselDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeSlide);
  });
};

const startCarousel = () => {
  if (carouselSlides.length < 2) {
    return;
  }

  carouselTimer = window.setInterval(() => {
    showSlide(activeSlide + 1);
  }, 6000);
};

const resetCarouselTimer = () => {
  window.clearInterval(carouselTimer);
  startCarousel();
};

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.carouselAction === "next" ? 1 : -1;
    showSlide(activeSlide + direction);
    resetCarouselTimer();
  });
});

carouselDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.carouselDot));
    resetCarouselTimer();
  });
});

startCarousel();
