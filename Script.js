const sliderContEl = document.querySelector(".slider");
const btnleftEl = document.querySelector(".slider__btn--left");
const btnrightEl = document.querySelector(".slider__btn--right");
const allSliderImg = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
const navLinks = document.querySelector(".nav_links");
const allSection = document.querySelectorAll("section");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

// sticy navbar

const sticyFn = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(sticyFn, {
  root: null,
  threshold: 0,
  rootMargin: "-45px",
});
headerObserver.observe(header);

// smooth scrolling
navLinks.addEventListener("click", (e) => {
  e.preventDefault();

  const target = e.target;

  if (e.target.classList.contains("nav_link")) {
    const id = target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// slider
function slider() {
  const maxSlide = allSliderImg.length;
  let currSlide = 0;
  allSliderImg.forEach(
    (s, i) => (s.style.transform = `translateX(${i * 100}%)`)
  );
  function init() {
    createDots();
    activateDots(0);
    gotoSlide(0);
  }

  const createDots = function () {
    allSliderImg.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class = "dots__dot" data-slide="${i}"></button> `
      );
    });
  };

  const activateDots = function (slide) {
    const allDots = document.querySelectorAll(".dots__dot");
    allDots.forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      console.log(e.target.getAttribute("data-slide"));
      currSlide = e.target.getAttribute("data-slide");
      gotoSlide(currSlide);
      activateDots(currSlide);
    }
  });

  const gotoSlide = (currSlide) => {
    allSliderImg.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - currSlide) * 100}%)`)
    );
  };

  const prevSlide = () => {
    if (currSlide == maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    gotoSlide(currSlide);
    activateDots(currSlide);
  };
  const nextSlide = () => {
    if (currSlide <= 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }
    gotoSlide(currSlide);
    activateDots(currSlide);
  };

  btnleftEl.addEventListener("click", nextSlide);
  btnrightEl.addEventListener("click", prevSlide);
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide;
    if (e.key === "ArrowRight") nextSlide;
  });

  init();
}

slider();

function playWithFriends() {
  localStorage.setItem("isAi", false);
  window.location.href = 'chessLogic/index.html';
}
function playWithAi() {
  localStorage.setItem("isAi", true);
  window.location.href = 'chessLogic/index.html';
}
localStorage.clear();
