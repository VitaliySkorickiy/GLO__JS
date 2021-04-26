window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  //  Timer
  const countTimer = (deadline) => {
    let timerDay = document.querySelector("#timer-day"),
      timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    const getTimeRemaning = () => {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaning = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaning % 60),
        minutes = Math.floor((timeRemaning / 60) % 60),
        hours = Math.floor(timeRemaning / 60 / 60) % 24,
        day = Math.floor(timeRemaning / 60 / 60 / 24);

      return {
        timeRemaning,
        seconds,
        minutes,
        hours,
        day,
      };
    };

    const zero = (num) => {
      if (num <= 9) {
        return (num = "0" + num);
      } else {
        return num;
      }
    };

    const updateClock = () => {
      let timer = getTimeRemaning();

      timerDay.textContent = zero(timer.day);
      timerHours.textContent = zero(timer.hours);
      timerMinutes.textContent = zero(timer.minutes);
      timerSeconds.textContent = zero(timer.seconds);

      if (timer.timeRemaning > 0) {
        setTimeout(updateClock, 1000);
      } else {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }
    };

    updateClock();
  };
  countTimer("20 may 2021");

  //    Меню

  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = menu.querySelector(".close-btn"),
      menuLi = menu.querySelector("ul>li");

    document.addEventListener("click", (e) => {
      let target = e.target;

      if (target.closest(".menu")) {
        menu.classList.add("active-menu");
      } else if (
        target.closest(".close-btn") ||
        target.closest("li") ||
        target.closest("body")
      ) {
        menu.classList.remove("active-menu");
      }
    });
  };

  toggleMenu();
  // popup

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn");

    popupBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        popup.style.display = "block";
      });
    });

    popup.addEventListener("click", (e) => {
      let target = e.target;

      if (target.classList.contains("popup-close")) {
        popup.style.display = "";
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popup.style.display = "";
        }
      }
    });
  };
  togglePopup();

  // tab

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (e) => {
      let target = e.target;

      target = target.closest(".service-header-tab");

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // slider

  const slider = () => {
    const slider = document.querySelector(".portfolio-content"),
      slide = slider.querySelectorAll(".portfolio-item"),
      btn = slider.querySelectorAll(".portfolio-btn"),
      dotsList = slider.querySelector(".portfolio-dots");

    let currentSlide = 0,
      interval;

    for (let i = 0; i < slide.length; i++) {
      const dotItem = document.createElement("li");
      dotItem.classList.add("dot");
      dotsList.append(dotItem);
    }
    let dot = slider.querySelectorAll(".dot");
    dotsList.firstElementChild.classList.add("dot-active");

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target;

      if (!target.matches(".portfolio-btn, .dot ")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((dot, index) => {
          if (dot === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (e) => {
      if (e.target.matches(".portfolio-btn") || e.target.matches(".dot")) {
        stopSlide();
      }
    });

    slider.addEventListener("mouseout", (e) => {
      if (e.target.matches(".portfolio-btn") || e.target.matches(".dot")) {
        startSlide(1000);
      }
    });

    startSlide(3000);
  };

  slider();
});
