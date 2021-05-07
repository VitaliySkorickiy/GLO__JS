/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var calc = function calc() {
  var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      calcSquare = document.querySelector('.calc-square'),
      totalValue = document.getElementById('total');

  var countSum = function countSum() {
    var total = 0,
        countValue = 1,
        dayValue = 1;
    var typeValue = calcType.options[calcType.selectedIndex].value,
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

    var f1 = function f1() {
      var t = 0;
      var interval = setInterval(function () {
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

  calcBlock.addEventListener('change', function (e) {
    var target = e.target;

    if (target.matches('select') || target.matches('input')) {
      countSum();
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/modules/countTimer.js":
/*!***********************************!*\
  !*** ./src/modules/countTimer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//  Timer
var countTimer = function countTimer(deadline) {
  var timerDay = document.querySelector('#timer-day'),
      timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

  var getTimeRemaning = function getTimeRemaning() {
    var dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaning = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaning % 60),
        minutes = Math.floor(timeRemaning / 60 % 60),
        hours = Math.floor(timeRemaning / 60 / 60) % 24,
        day = Math.floor(timeRemaning / 60 / 60 / 24);
    return {
      timeRemaning: timeRemaning,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      day: day
    };
  };

  var zero = function zero(num) {
    if (num <= 9) {
      return num = '0' + num;
    } else {
      return num;
    }
  };

  var updateClock = function updateClock() {
    var timer = getTimeRemaning();
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countTimer);

/***/ }),

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var sendForm = function sendForm(form) {
  var errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с Вами свяжимся!';
  var statusMessage = document.createElement('div');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.appendChild(statusMessage);
    var formData = new FormData(form);
    statusMessage.textContent = loadMessage;
    postData(formData).then(function (response) {
      if (response.status !== 200) {
        throw new Error('status network not 200');
      }

      statusMessage.textContent = successMessage;
    })["catch"](function (error) {
      statusMessage.textContent = errorMessage;
      console.error(error);
    });
    form.querySelectorAll('input').forEach(function (item) {
      return item.value = '';
    });
  });

  var postData = function postData(formData) {
    return fetch('../server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData,
      credentials: 'include'
    });
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var slider = function slider() {
  var slider = document.querySelector('.portfolio-content'),
      slide = slider.querySelectorAll('.portfolio-item'),
      dotsList = slider.querySelector('.portfolio-dots');
  var currentSlide = 0,
      interval;

  for (var i = 0; i < slide.length; i++) {
    var dotItem = document.createElement('li');
    dotItem.classList.add('dot');
    dotsList.append(dotItem);
  }

  var dot = slider.querySelectorAll('.dot');
  dotsList.firstElementChild.classList.add('dot-active');

  var prevSlide = function prevSlide(elem, index, strClass) {
    elem[index].classList.remove(strClass);
  };

  var nextSlide = function nextSlide(elem, index, strClass) {
    elem[index].classList.add(strClass);
  };

  var autoPlaySlide = function autoPlaySlide() {
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  var startSlide = function startSlide() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
    interval = setInterval(autoPlaySlide, time);
  };

  var stopSlide = function stopSlide() {
    clearInterval(interval);
  };

  slider.addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target;

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
      dot.forEach(function (dot, index) {
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
  slider.addEventListener('mouseover', function (e) {
    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
      stopSlide();
    }
  });
  slider.addEventListener('mouseout', function (e) {
    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
      startSlide(3000);
    }
  });
  startSlide(3000);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var tabs = function tabs() {
  var tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

  var toggleTabContent = function toggleTabContent(index) {
    for (var i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tab[i].classList.add('active');
        tabContent[i].classList.remove('d-none');
      } else {
        tab[i].classList.remove('active');
        tabContent[i].classList.add('d-none');
      }
    }
  };

  tabHeader.addEventListener('click', function (e) {
    var target = e.target;
    target = target.closest('.service-header-tab');

    if (target) {
      tab.forEach(function (item, i) {
        if (item === target) {
          toggleTabContent(i);
        }
      });
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var toggleMenu = function toggleMenu() {
  var menu = document.querySelector('menu');
  document.addEventListener('click', function (e) {
    var target = e.target;

    if (target.closest('.menu')) {
      menu.classList.add('active-menu');
    } else if (target.closest('.close-btn') || target.closest('li') || target.closest('body')) {
      menu.classList.remove('active-menu');
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);

/***/ }),

/***/ "./src/modules/togglePopup.js":
/*!************************************!*\
  !*** ./src/modules/togglePopup.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var togglePopup = function togglePopup() {
  var popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');
  popupBtn.forEach(function (btn) {
    btn.addEventListener('click', function () {
      popup.style.display = 'block';
    });
  });
  popup.addEventListener('click', function (e) {
    var target = e.target;

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopup);

/***/ }),

/***/ "./src/modules/validCalc.js":
/*!**********************************!*\
  !*** ./src/modules/validCalc.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// calc
var validCalc = function validCalc() {
  var itemCalc = document.querySelectorAll('input.calc-item');
  itemCalc.forEach(function (item) {
    item.addEventListener('input', function () {
      item.value = item.value.replace(/\D/g, '');
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validCalc);

/***/ }),

/***/ "./src/modules/validForm.js":
/*!**********************************!*\
  !*** ./src/modules/validForm.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// valid form
var validForm = function validForm(name, email, tel, mess) {
  name.addEventListener('input', function () {
    name.value = name.value.replace(/[^А-Яа-яЁё\ ]/gi, '').trim();
  });
  email.addEventListener('blur', function () {
    email.value = email.value.replace(/[^A-Za-z0-9\@. ]/gi, '').trim();
  });
  tel.addEventListener('input', function () {
    tel.value = tel.value.replace(/[^0-9\+]/gi, '').trim();
  });

  if (mess) {
    var regMess = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
    mess.addEventListener('input', function () {
      if (!regMess.test(mess.value)) {
        mess.value = '';
      }
    });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validForm);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_countTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/countTimer */ "./src/modules/countTimer.js");
/* harmony import */ var _modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/toggleMenu */ "./src/modules/toggleMenu.js");
/* harmony import */ var _modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/togglePopup */ "./src/modules/togglePopup.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./src/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./src/modules/calc.js");
/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/sendForm */ "./src/modules/sendForm.js");
/* harmony import */ var _modules_validCalc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/validCalc */ "./src/modules/validCalc.js");
/* harmony import */ var _modules_validForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/validForm */ "./src/modules/validForm.js");








 //  Timer

(0,_modules_countTimer__WEBPACK_IMPORTED_MODULE_0__.default)('20 may 2021'); //    Меню

(0,_modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__.default)(); // popup

(0,_modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__.default)(); // tab

(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)(); // slider

(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)(); // command

var images = document.querySelectorAll('[data-img]');
images.forEach(function (item) {
  var changeImg = function changeImg() {
    var src = item.src;
    var otherSrc = item.dataset.img;
    item.dataset.img = src;
    item.src = otherSrc;
  };

  item.addEventListener('mouseout', changeImg);
  item.addEventListener('mouseover', changeImg);
}); // calc

(0,_modules_validCalc__WEBPACK_IMPORTED_MODULE_7__.default)(); // valid form

var name1 = document.getElementById('form1-name'),
    email1 = document.getElementById('form1-email'),
    tel1 = document.getElementById('form1-phone'),
    name2 = document.getElementById('form2-name'),
    message2 = document.getElementById('form2-message'),
    email2 = document.getElementById('form2-email'),
    tel2 = document.getElementById('form2-phone'),
    name3 = document.getElementById('form3-name'),
    email3 = document.getElementById('form3-email'),
    tel3 = document.getElementById('form3-phone');
(0,_modules_validForm__WEBPACK_IMPORTED_MODULE_8__.default)(name1, email1, tel1);
(0,_modules_validForm__WEBPACK_IMPORTED_MODULE_8__.default)(name2, email2, tel2, message2);
(0,_modules_validForm__WEBPACK_IMPORTED_MODULE_8__.default)(name3, email3, tel3); // калькулятор

(0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)(100); // send-ajax-form

var form1 = document.getElementById('form1');
var formMessage = document.getElementById('form2');
var formModal = document.getElementById('form3');
(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_6__.default)(form1);
(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_6__.default)(formMessage);
(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_6__.default)(formModal);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map