"use strict";

"use strict";

function setupSlider(selector) {
    const slider = document.querySelector(`${selector}`);
    const slidesContainer = slider.querySelector(`.slider__slides`);
    const slides = slider.querySelectorAll(`.slider__slide`);
    const buttonsContainer = slider.querySelector(`.slider__buttons`);

    // Defining slider height

    // Find highest slide
    const heights = [];

    slides.forEach(function (slide) {
        heights.push(slide.getBoundingClientRect().height);
    });

    const maxHeight = Math.max(...heights);
    const heighestSlide = [...slides].filter(
        (slide) => slide.getBoundingClientRect().height === maxHeight
    )[0];

    const observerCallback = function (entries) {
        console.log("I observed something 👁️");

        // 1) Get observed element computed styles (height)
        const slideHeight = entries[0].target.getBoundingClientRect().height;
        // 2) Set slider height
        slidesContainer.style.height = `${slideHeight}px`;
    };

    const observer = new ResizeObserver(observerCallback);

    observer.observe(heighestSlide);

    // Mark last slides to center
    const lastSlides = [...slides].filter(
        (slide) => slide.getBoundingClientRect().height !== maxHeight
    );

    lastSlides.forEach((slide) => (slide.dataset.center = true));

    // Move slider to a certain index
    const moveSlider = function (indexSlide = 0) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translate(${100 * (i - indexSlide)}%${
                slide.dataset.center ? ", -50%" : ""
            })`;

            slide.dataset.center ? (slide.style.top = "50%") : "";
        });
    };

    // Position slides
    moveSlider();

    // Listen for click on buttons
    let currentSlideIndex = 0;
    let lastIndex = slides.length - 1;

    const handlerButtonsClick = function (e) {
        if (e.target.id === "btn-left") {
            // Check edge case: Last slide
            if (currentSlideIndex === lastIndex) currentSlideIndex = 0;
            else currentSlideIndex++;

            moveSlider(currentSlideIndex);
        }

        if (e.target.id === "btn-right") {
            // Check edge case: Frist slide
            if (currentSlideIndex === 0) currentSlideIndex = lastIndex;
            else currentSlideIndex--;

            moveSlider(currentSlideIndex);
        }
    };

    buttonsContainer.addEventListener("click", handlerButtonsClick);
}

setupSlider(".section-staff__slider");
setupSlider(".section-courses__slider");
<<<<<<< HEAD
=======

// Make mobile navigation work
const btnNavEl = document.querySelector(".mobile-nav-button");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("open-nav");
});
>>>>>>> development
