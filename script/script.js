'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
  income = "покер",
  addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
  deposit = confirm("Есть ли у Вас депозит в банке?"),
  mission = 2000000,
  period = 8;


let start = function () {

  do {
    money = prompt("Ваш месячный доход?");
  }
  while (!isNumber(money));
};

start();

console.log('всего за месяц', money);
console.log(addExpenses.toLowerCase().split(','));

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0;
  let sumPrompt;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    sumPrompt = prompt('Во сколько это обойдется?');

    while (!isNumber(sumPrompt)) {
      sumPrompt = prompt('Во сколько это обойдется?');
    }

    sum += +sumPrompt;
  }

  console.log(sum);
  return sum;
};

let expensesAmount = getExpensesMonth();
console.log('расходы за месяц', expensesAmount);

function getAccumulatedMonth() {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
console.log('чистая прибыль за месяц', accumulatedMonth);

function getTargetMonth() {
  return mission / accumulatedMonth;
};
let targetMonth = getTargetMonth();
console.log('время за которое будет достигнута цель', targetMonth);

let budgetDay = +accumulatedMonth / 30;
console.log('доход в день', budgetDay);

let showTypeOf = function (data) {
  console.log(typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ("У вас высокий уровень дохода");
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    return ("У вас средний  уровень дохода");
  } else if (budgetDay < 600 && budgetDay > 0) {
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    return ("Цель не будет достигнута");
  } else {
    return ("Что то пошло не так");
  }
};

console.log(getStatusIncome());





