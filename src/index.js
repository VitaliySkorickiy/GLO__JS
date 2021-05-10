import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validCalc from './modules/validCalc';
import validForm from './modules/validForm';

//  Timer
countTimer('20 may 2021');

//    Меню
toggleMenu();

// popup
togglePopup();

// tab
tabs();

// slider
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
validCalc();

// valid form
const name1 = document.getElementById('form1-name'),
  email1 = document.getElementById('form1-email'),
  tel1 = document.getElementById('form1-phone'),
  name2 = document.getElementById('form2-name'),
  mess = document.getElementById('form2-message'),
  email2 = document.getElementById('form2-email'),
  tel2 = document.getElementById('form2-phone'),
  name3 = document.getElementById('form3-name'),
  email3 = document.getElementById('form3-email'),
  tel3 = document.getElementById('form3-phone');

validForm(name1, email1, tel1);
validForm(name2, email2, tel2, mess);
validForm(name3, email3, tel3);

// калькулятор
calc(100);

// send-ajax-form
const form1 = document.getElementById('form1');
const formMessage = document.getElementById('form2');
const formModal = document.getElementById('form3');

sendForm(form1);
sendForm(formMessage);
sendForm(formModal);
