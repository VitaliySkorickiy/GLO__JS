"use strict";

const inputA = document.querySelector("#a");
const inputB = document.querySelector("#b");
const inputRes = document.querySelector("#res");
const btnSum = document.querySelector("#sum");
const btnMult = document.querySelector("#mult");

const calculator = {
  sum: function () {
    return +inputA.value + +inputB.value;
  },
  mult: function () {
    return +inputA.value * +inputB.value;
  },
  show: function (res) {
    inputRes.value = res;
  },
};

btnSum.addEventListener("click", () => {
  calculator.sum();
  calculator.show(calculator.sum());
  console.log(calculator.sum());
});

btnMult.addEventListener("click", () => {
  calculator.mult();
  calculator.show(calculator.mult());
  console.log(calculator.mult());
});
