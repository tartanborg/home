const carouselSlides = Array.from(document.querySelectorAll(".carousel-slide"));
const carouselDots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
const carouselButtons = Array.from(document.querySelectorAll("[data-carousel-action]"));
const brand = document.querySelector(".brand");
const brandText = brand?.dataset.brandText ?? "";

let activeSlide = 0;
let carouselTimer;
let brandCharacter = 0;
let brandCursorTimer;
let brandRestartTimer;

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

const animateBrand = () => {
  if (!brand || !brandText) {
    return;
  }

  window.clearInterval(brandCursorTimer);
  window.clearTimeout(brandRestartTimer);
  brandCharacter = 0;
  typeBrandCharacter();
};

const typeBrandCharacter = () => {
  if (brandCharacter <= brandText.length) {
    brand.textContent = `${brandText.slice(0, brandCharacter)}_`;
    brandCharacter += 1;
    window.setTimeout(typeBrandCharacter, 180);
    return;
  }

  let cursorVisible = false;

  brandCursorTimer = window.setInterval(() => {
    brand.textContent = cursorVisible ? `${brandText}_` : brandText;
    cursorVisible = !cursorVisible;
  }, 1100);

  brandRestartTimer = window.setTimeout(animateBrand, 15000);
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

animateBrand();
startCarousel();
