'use strict';

let money = prompt("Ваш месячный доход?"),
  income = "покер",
  addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
  deposit = confirm("Есть ли у Вас депозит в банке?"),
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = prompt('Во сколько это обойдется?'),
  mission = 2000000,
  period = 8;


function getExpensesMonth(a, b) {
  return a + b;
};

function getAccumulatedMonth(a, b, c) {
  return a - (b + c);
};

function getTargetMonth(a, b) {
  return a / b;
};

let showTypeOf = function (data) {
  console.log(typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let accumulatedMonth = getAccumulatedMonth(+money, +amount1, +amount2);
let budgetDay = accumulatedMonth / 30;

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ("У вас высокий уровень дохода");
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    return ("У вас средний  уровень дохода");
  } else if (budgetDay < 600 && budgetDay > 0) {
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else {
    return ("Что то пошло не так");
  }
};

console.log('всего за месяц', money);
console.log('расходы за месяц', getExpensesMonth(+amount1, +amount2))
console.log('чистая прибыль за месяц', getAccumulatedMonth(+money, +amount1, +amount2))
console.log('время за которое будет достигнута цель', getTargetMonth(mission, +accumulatedMonth));
console.log('доход в день', budgetDay);
console.log(addExpenses);
console.log(getStatusIncome());





