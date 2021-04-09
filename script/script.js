'use strict';

//  проверка на число
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;

let start = function () {

  do {
    money = prompt("Ваш месячный доход?", '100');
  }
  while (!isNumber(money));
};

start();

let appData = {
  budget: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm("Есть ли у Вас депозит в банке?");

    for (let i = 0; i < 2; i++) {

      let pr = prompt('Введите обязательную статью расходов?');
      let sumPrompt = prompt('Во сколько это обойдется?');

      while (!isNumber(sumPrompt)) {
        sumPrompt = prompt('Во сколько это обойдется?');
      }
      appData.expenses[pr] = +sumPrompt;
    }
  },
  // расходы за месяц
  getExpensesMonth: function () {

    let sum = 0;
    for (let key in appData.expenses) {

      sum += +appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },

  // чистый доход 
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  // время достижения цели
  getTargetMonth: function () {
    appData.period = appData.mission / appData.budgetMonth;
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ("У вас высокий уровень дохода");
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return ("У вас средний  уровень дохода");
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      return ("К сожалению у вас уровень дохода ниже среднего");
    } else if (appData.budgetDay < 0) {
      return ("Цель не будет достигнута");
    } else {
      return ("Что то пошло не так");
    }
  },

};

appData.budget = +money;

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('расходы за месяц', appData.expensesMonth);
console.log('время за которое будет достигнута цель', appData.period);
console.log('уровень дохода', appData.getStatusIncome());

console.log(appData);

for (const key in appData) {
  console.log('Наша программа включает в себя данные: ', key + ' ' + appData[key]);
}