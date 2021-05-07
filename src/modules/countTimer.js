//  Timer
const countTimer = (deadline) => {
  const timerDay = document.querySelector('#timer-day'),
    timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');

  const getTimeRemaning = () => {
    const dateStop = new Date(deadline).getTime(),
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
      return (num = '0' + num);
    } else {
      return num;
    }
  };

  const updateClock = () => {
    const timer = getTimeRemaning();

    timerDay.textContent = zero(timer.day);
    timerHours.textContent = zero(timer.hours);
    timerMinutes.textContent = zero(timer.minutes);
    timerSeconds.textContent = zero(timer.seconds);

    if (timer.timeRemaning > 0) {
      setTimeout(updateClock, 1000);
    } else {
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  };

  updateClock();
};

export default countTimer;
