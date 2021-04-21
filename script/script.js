window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  //  Timer
  function countTimer(deadline) {
    let timerDay = document.querySelector("#timer-day"),
      timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaning() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaning = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaning % 60),
        minutes = Math.floor(timeRemaning / 60) % 60,
        hours = Math.floor(timeRemaning / 60 / 60) % 24,
        day = Math.floor(timeRemaning / 60 / 60 / 24);

      return {
        timeRemaning,
        seconds,
        minutes,
        hours,
        day,
      };
    }

    function zero(num) {
      if (num <= 9) {
        return (num = "0" + num);
      } else {
        return num;
      }
    }

    function updateClock() {
      let timer = getTimeRemaning();

      timerDay.textContent = zero(timer.day);
      timerHours.textContent = zero(timer.hours);
      timerMinutes.textContent = zero(timer.minutes);
      timerSeconds.textContent = zero(timer.seconds);

      if (timer.timeRemaning > 0) {
        setInterval(updateClock, 100);
      } else {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }
    }

    updateClock();
  }

  countTimer("31 dec 2021");
});
