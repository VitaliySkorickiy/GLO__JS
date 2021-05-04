window.addEventListener('DOMContentLoaded', () => {
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
  countTimer('20 may 2021');

  //    Меню

  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else if (target.closest('.close-btn') || target.closest('li') || target.closest('body')) {
        menu.classList.remove('active-menu');
      }
    });
  };

  toggleMenu();
  // popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        popup.style.display = 'block';
      });
    });

    popup.addEventListener('click', (e) => {
      let target = e.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = '';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = '';
        }
      }
    });
  };
  togglePopup();

  // tab

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (e) => {
      let target = e.target;

      target = target.closest('.service-header-tab');

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
    const slider = document.querySelector('.portfolio-content'),
      slide = slider.querySelectorAll('.portfolio-item'),
      dotsList = slider.querySelector('.portfolio-dots');

    let currentSlide = 0,
      interval;

    for (let i = 0; i < slide.length; i++) {
      const dotItem = document.createElement('li');
      dotItem.classList.add('dot');
      dotsList.append(dotItem);
    }
    const dot = slider.querySelectorAll('.dot');
    dotsList.firstElementChild.classList.add('dot-active');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;

      if (!target.matches('.portfolio-btn, .dot ')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
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

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        startSlide(3000);
      }
    });

    startSlide(3000);
  };

  slider();

  // command

  const images = document.querySelectorAll('[data-img]');

  images.forEach((item) => {
    const changeImg = () => {
      const src = item.src;
      const otherSrc = item.dataset.img;
      item.dataset.img = src;
      item.src = otherSrc;
    };
    item.addEventListener('mouseout', changeImg);
    item.addEventListener('mouseover', changeImg);
  });

  // calc

  const validCalc = () => {
    const itemCalc = document.querySelectorAll('input.calc-item');

    itemCalc.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/g, '');
      });
    });
  };
  validCalc();

  // valid form

  const name1 = document.getElementById('form1-name'),
    email1 = document.getElementById('form1-email'),
    tel1 = document.getElementById('form1-phone'),
    name2 = document.getElementById('form2-name'),
    message2 = document.getElementById('form2-message'),
    email2 = document.getElementById('form2-email'),
    tel2 = document.getElementById('form2-phone'),
    name3 = document.getElementById('form3-name'),
    email3 = document.getElementById('form3-email'),
    tel3 = document.getElementById('form3-phone');

  const validForm = (name, email, tel, mess) => {
    name.addEventListener('input', () => {
      name.value = name.value.replace(/[^А-Яа-яЁё\ ]/gi, '').trim();
    });

    email.addEventListener('blur', () => {
      email.value = email.value.replace(/[^A-Za-z0-9\@. ]/gi, '').trim();
    });

    tel.addEventListener('input', () => {
      tel.value = tel.value.replace(/[^0-9\+]/gi, '').trim();
    });

    if (mess) {
      const regMess = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
      mess.addEventListener('input', () => {
        if (!regMess.test(mess.value)) {
          mess.value = '';
        }
      });
    }
  };
  validForm(name1, email1, tel1);
  validForm(name2, email2, tel2, message2);
  validForm(name3, email3, tel3);

  // калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      calcSquare = document.querySelector('.calc-square'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;

      let typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value <= 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value <= 10) {
        dayValue *= 1.5;
      }

      if (squareValue && typeValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      const f1 = () => {
        let t = 0;
        let interval = setInterval(() => {
          t = (t + 1) * 2;

          if (t >= total) {
            t = total;
            clearInterval(interval);
          }
          totalValue.textContent = t;
        }, 80);
      };

      f1();
    };

    calcBlock.addEventListener('change', (e) => {
      const target = e.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };
  calc(100);

  // send-ajax-form

  const form1 = document.getElementById('form1');
  const formMessage = document.getElementById('form2');
  const formModal = document.getElementById('form3');

  const sendForm = (form) => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с Вами свяжимся!';

    const statusMessage = document.createElement('div');

    form.addEventListener('submit', (e) => {
      console.log(form);

      e.preventDefault();
      form.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(form);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(
        body,
        () => {
          statusMessage.textContent = successMessage;
        },
        (error) => {
          statusMessage.textContent = errorMessage;
          console.log(error);
        }
      );
      form.querySelectorAll('input').forEach((item) => (item.value = ''));
    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', '../server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      console.log(body);

      request.send(JSON.stringify(body));
    };
  };

  sendForm(form1);
  sendForm(formMessage);
  sendForm(formModal);
});
