/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_countTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/countTimer */ \"./src/modules/countTimer.js\");\n/* harmony import */ var _modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/toggleMenu */ \"./src/modules/toggleMenu.js\");\n/* harmony import */ var _modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/togglePopup */ \"./src/modules/togglePopup.js\");\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ \"./src/modules/tabs.js\");\n/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ \"./src/modules/slider.js\");\n/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ \"./src/modules/calc.js\");\n/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/sendForm */ \"./src/modules/sendForm.js\");\n/* harmony import */ var _modules_validCalc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/validCalc */ \"./src/modules/validCalc.js\");\n/* harmony import */ var _modules_validForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/validForm */ \"./src/modules/validForm.js\");\n\n\n\n\n\n\n\n\n //  Timer\n\n(0,_modules_countTimer__WEBPACK_IMPORTED_MODULE_0__.default)('20 may 2021'); //    Меню\n\n(0,_modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__.default)(); // popup\n\n(0,_modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__.default)(); // tab\n\n(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)(); // slider\n\n(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)(); // command\n\nvar images = document.querySelectorAll('[data-img]');\nimages.forEach(function (item) {\n  var changeImg = function changeImg() {\n    var src = item.src;\n    var otherSrc = item.dataset.img;\n    item.dataset.img = src;\n    item.src = otherSrc;\n  };\n\n  item.addEventListener('mouseout', changeImg);\n  item.addEventListener('mouseover', changeImg);\n}); // calc\n\n(0,_modules_validCalc__WEBPACK_IMPORTED_MODULE_7__.default)(); // valid form\n\nvar name1 = document.getElementById('form1-name'),\n    email1 = document.getElementById('form1-email'),\n    tel1 = document.getElementById('form1-phone'),\n    name2 = document.getElementById('form2-name'),\n    message2 = document.getElementById('form2-message'),\n    email2 = document.getElementById('form2-email'),\n    tel2 = document.getElementById('form2-phone'),\n    name3 = document.getElementById('form3-name'),\n    email3 = document.getElementById('form3-email'),\n    tel3 = document.getElementById('form3-phone');\n(0,_modules_validForm__WEBPACK_IMPORTED_MODULE_8__.default)(name1, email1, tel1);\n(0,_modules_validForm__WEBPACK_IMPORTED_MODULE_8__.default)(name2, email2, tel2, message2);\n(0,_modules_validForm__WEBPACK_IMPORTED_MODULE_8__.default)(name3, email3, tel3); // калькулятор\n\n(0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)(100); // send-ajax-form\n\nvar form1 = document.getElementById('form1');\nvar formMessage = document.getElementById('form2');\nvar formModal = document.getElementById('form3');\n(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_6__.default)(form1);\n(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_6__.default)(formMessage);\n(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_6__.default)(formModal);\n\n//# sourceURL=webpack://GLOJS/./src/index.js?");

/***/ }),

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar calc = function calc() {\n  var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;\n  var calcBlock = document.querySelector('.calc-block'),\n      calcType = document.querySelector('.calc-type'),\n      calcCount = document.querySelector('.calc-count'),\n      calcDay = document.querySelector('.calc-day'),\n      calcSquare = document.querySelector('.calc-square'),\n      totalValue = document.getElementById('total');\n\n  var countSum = function countSum() {\n    var total = 0,\n        countValue = 1,\n        dayValue = 1;\n    var typeValue = calcType.options[calcType.selectedIndex].value,\n        squareValue = +calcSquare.value;\n\n    if (calcCount.value > 1) {\n      countValue += (calcCount.value - 1) / 10;\n    }\n\n    if (calcDay.value && calcDay.value <= 5) {\n      dayValue *= 2;\n    } else if (calcDay.value && calcDay.value <= 10) {\n      dayValue *= 1.5;\n    }\n\n    if (squareValue && typeValue) {\n      total = price * typeValue * squareValue * countValue * dayValue;\n    }\n\n    var f1 = function f1() {\n      var t = 0;\n      var interval = setInterval(function () {\n        t = (t + 1) * 2;\n\n        if (t >= total) {\n          t = total;\n          clearInterval(interval);\n        }\n\n        totalValue.textContent = t;\n      }, 80);\n    };\n\n    f1();\n  };\n\n  calcBlock.addEventListener('change', function (e) {\n    var target = e.target;\n\n    if (target.matches('select') || target.matches('input')) {\n      countSum();\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);\n\n//# sourceURL=webpack://GLOJS/./src/modules/calc.js?");

/***/ }),

/***/ "./src/modules/countTimer.js":
/*!***********************************!*\
  !*** ./src/modules/countTimer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//  Timer\nvar countTimer = function countTimer(deadline) {\n  var timerDay = document.querySelector('#timer-day'),\n      timerHours = document.querySelector('#timer-hours'),\n      timerMinutes = document.querySelector('#timer-minutes'),\n      timerSeconds = document.querySelector('#timer-seconds');\n\n  var getTimeRemaning = function getTimeRemaning() {\n    var dateStop = new Date(deadline).getTime(),\n        dateNow = new Date().getTime(),\n        timeRemaning = (dateStop - dateNow) / 1000,\n        seconds = Math.floor(timeRemaning % 60),\n        minutes = Math.floor(timeRemaning / 60 % 60),\n        hours = Math.floor(timeRemaning / 60 / 60) % 24,\n        day = Math.floor(timeRemaning / 60 / 60 / 24);\n    return {\n      timeRemaning: timeRemaning,\n      seconds: seconds,\n      minutes: minutes,\n      hours: hours,\n      day: day\n    };\n  };\n\n  var zero = function zero(num) {\n    if (num <= 9) {\n      return num = '0' + num;\n    } else {\n      return num;\n    }\n  };\n\n  var updateClock = function updateClock() {\n    var timer = getTimeRemaning();\n    timerDay.textContent = zero(timer.day);\n    timerHours.textContent = zero(timer.hours);\n    timerMinutes.textContent = zero(timer.minutes);\n    timerSeconds.textContent = zero(timer.seconds);\n\n    if (timer.timeRemaning > 0) {\n      setTimeout(updateClock, 1000);\n    } else {\n      timerHours.textContent = '00';\n      timerMinutes.textContent = '00';\n      timerSeconds.textContent = '00';\n    }\n  };\n\n  updateClock();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countTimer);\n\n//# sourceURL=webpack://GLOJS/./src/modules/countTimer.js?");

/***/ }),

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm(form) {\n  var errorMessage = 'Что-то пошло не так...',\n      loadMessage = 'Загрузка...',\n      successMessage = 'Спасибо! Мы скоро с Вами свяжимся!';\n  var statusMessage = document.createElement('div');\n  form.addEventListener('submit', function (e) {\n    e.preventDefault();\n    form.appendChild(statusMessage);\n    var formData = new FormData(form);\n    statusMessage.textContent = loadMessage;\n    postData(formData).then(function (response) {\n      if (response.status !== 200) {\n        throw new Error('status network not 200');\n      }\n\n      statusMessage.textContent = successMessage;\n    })[\"catch\"](function (error) {\n      statusMessage.textContent = errorMessage;\n      console.error(error);\n    });\n    form.querySelectorAll('input').forEach(function (item) {\n      return item.value = '';\n    });\n  });\n\n  var postData = function postData(formData) {\n    return fetch('server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: formData,\n      credentials: 'include'\n    });\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://GLOJS/./src/modules/sendForm.js?");

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar slider = function slider() {\n  var slider = document.querySelector('.portfolio-content'),\n      slide = slider.querySelectorAll('.portfolio-item'),\n      dotsList = slider.querySelector('.portfolio-dots');\n  var currentSlide = 0,\n      interval;\n\n  for (var i = 0; i < slide.length; i++) {\n    var dotItem = document.createElement('li');\n    dotItem.classList.add('dot');\n    dotsList.append(dotItem);\n  }\n\n  var dot = slider.querySelectorAll('.dot');\n  dotsList.firstElementChild.classList.add('dot-active');\n\n  var prevSlide = function prevSlide(elem, index, strClass) {\n    elem[index].classList.remove(strClass);\n  };\n\n  var nextSlide = function nextSlide(elem, index, strClass) {\n    elem[index].classList.add(strClass);\n  };\n\n  var autoPlaySlide = function autoPlaySlide() {\n    prevSlide(slide, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n    currentSlide++;\n\n    if (currentSlide >= slide.length) {\n      currentSlide = 0;\n    }\n\n    nextSlide(slide, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  };\n\n  var startSlide = function startSlide() {\n    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;\n    interval = setInterval(autoPlaySlide, time);\n  };\n\n  var stopSlide = function stopSlide() {\n    clearInterval(interval);\n  };\n\n  slider.addEventListener('click', function (e) {\n    e.preventDefault();\n    var target = e.target;\n\n    if (!target.matches('.portfolio-btn, .dot ')) {\n      return;\n    }\n\n    prevSlide(slide, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n\n    if (target.matches('#arrow-right')) {\n      currentSlide++;\n    } else if (target.matches('#arrow-left')) {\n      currentSlide--;\n    } else if (target.matches('.dot')) {\n      dot.forEach(function (dot, index) {\n        if (dot === target) {\n          currentSlide = index;\n        }\n      });\n    }\n\n    if (currentSlide >= slide.length) {\n      currentSlide = 0;\n    }\n\n    if (currentSlide < 0) {\n      currentSlide = slide.length - 1;\n    }\n\n    nextSlide(slide, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  });\n  slider.addEventListener('mouseover', function (e) {\n    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {\n      stopSlide();\n    }\n  });\n  slider.addEventListener('mouseout', function (e) {\n    if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {\n      startSlide(3000);\n    }\n  });\n  startSlide(3000);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);\n\n//# sourceURL=webpack://GLOJS/./src/modules/slider.js?");

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar tabs = function tabs() {\n  var tabHeader = document.querySelector('.service-header'),\n      tab = tabHeader.querySelectorAll('.service-header-tab'),\n      tabContent = document.querySelectorAll('.service-tab');\n\n  var toggleTabContent = function toggleTabContent(index) {\n    for (var i = 0; i < tabContent.length; i++) {\n      if (index === i) {\n        tab[i].classList.add('active');\n        tabContent[i].classList.remove('d-none');\n      } else {\n        tab[i].classList.remove('active');\n        tabContent[i].classList.add('d-none');\n      }\n    }\n  };\n\n  tabHeader.addEventListener('click', function (e) {\n    var target = e.target;\n    target = target.closest('.service-header-tab');\n\n    if (target) {\n      tab.forEach(function (item, i) {\n        if (item === target) {\n          toggleTabContent(i);\n        }\n      });\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);\n\n//# sourceURL=webpack://GLOJS/./src/modules/tabs.js?");

/***/ }),

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar toggleMenu = function toggleMenu() {\n  var menu = document.querySelector('menu');\n  document.addEventListener('click', function (e) {\n    var target = e.target;\n\n    if (target.closest('.menu')) {\n      menu.classList.add('active-menu');\n    } else if (target.closest('.close-btn') || target.closest('li') || target.closest('body')) {\n      menu.classList.remove('active-menu');\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);\n\n//# sourceURL=webpack://GLOJS/./src/modules/toggleMenu.js?");

/***/ }),

/***/ "./src/modules/togglePopup.js":
/*!************************************!*\
  !*** ./src/modules/togglePopup.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar togglePopup = function togglePopup() {\n  var popup = document.querySelector('.popup'),\n      popupBtn = document.querySelectorAll('.popup-btn');\n  popupBtn.forEach(function (btn) {\n    btn.addEventListener('click', function () {\n      popup.style.display = 'block';\n    });\n  });\n  popup.addEventListener('click', function (e) {\n    var target = e.target;\n\n    if (target.classList.contains('popup-close')) {\n      popup.style.display = '';\n    } else {\n      target = target.closest('.popup-content');\n\n      if (!target) {\n        popup.style.display = '';\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopup);\n\n//# sourceURL=webpack://GLOJS/./src/modules/togglePopup.js?");

/***/ }),

/***/ "./src/modules/validCalc.js":
/*!**********************************!*\
  !*** ./src/modules/validCalc.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// calc\nvar validCalc = function validCalc() {\n  var itemCalc = document.querySelectorAll('input.calc-item');\n  itemCalc.forEach(function (item) {\n    item.addEventListener('input', function () {\n      item.value = item.value.replace(/\\D/g, '');\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validCalc);\n\n//# sourceURL=webpack://GLOJS/./src/modules/validCalc.js?");

/***/ }),

/***/ "./src/modules/validForm.js":
/*!**********************************!*\
  !*** ./src/modules/validForm.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// valid form\nvar validForm = function validForm(name, email, tel, mess) {\n  name.addEventListener('input', function () {\n    name.value = name.value.replace(/[^А-Яа-яЁё\\ ]/gi, '').trim();\n  });\n  email.addEventListener('blur', function () {\n    email.value = email.value.replace(/[^A-Za-z0-9\\@. ]/gi, '').trim();\n  });\n  tel.addEventListener('input', function () {\n    tel.value = tel.value.replace(/[^0-9\\+]/gi, '').trim();\n  });\n\n  if (mess) {\n    var regMess = /^[?!,.а-яА-ЯёЁ0-9\\s]+$/;\n    mess.addEventListener('input', function () {\n      if (!regMess.test(mess.value)) {\n        mess.value = '';\n      }\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validForm);\n\n//# sourceURL=webpack://GLOJS/./src/modules/validForm.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;