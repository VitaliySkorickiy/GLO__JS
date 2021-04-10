'use strict';

//проверка на буквы
let checkStr = function (str) {
  let reg = /^[\d]+$/;
  return !reg.test(str);
};

//  проверка на число
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;

let start = function () {

  do {
    money = prompt("Ваш месячный доход?", '100000');
  }
  while (!isNumber(money));
};

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: null,
  moneyDeposit: null,
  mission: 50000,
  period: 3,

  asking: function () {

    if (confirm('Есть ли у Вас дополнительный заработок?')) {

      let itemIncome;
      do {
        itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Покер');
      }
      while (!checkStr(itemIncome));

      let cashIncome;
      while (!isNumber(cashIncome)) {
        cashIncome = +prompt('Сколько в месяц Вы на этом зарабатываете?', '10000');
      }

      appData.income[itemIncome] = +cashIncome;
    }

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", 'то, сё, пятое, десятое');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    let addExpensesLog = [];
    appData.addExpenses.forEach(item => {

      addExpensesLog += `${item.charAt(0).toUpperCase() + item.substring(1)}, `;
    });
    console.log(addExpensesLog);

    appData.deposit = confirm("Есть ли у Вас депозит в банке?");

    for (let i = 0; i < 2; i++) {

      let alwaysExpenses;

      do {
        alwaysExpenses = prompt('Введите обязательную статью расходов?', 'еда');
      }
      while (!checkStr(alwaysExpenses));

      let sumPrompt;

      while (!isNumber(sumPrompt)) {
        sumPrompt = prompt('Во сколько это обойдется?', '20');
      }
      appData.expenses[alwaysExpenses] = +sumPrompt;
    }
  },
  // расходы за месяц
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  // чистый доход 
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  // время достижения цели
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
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

  getInfoDeposit: function () {
    if (appData.deposit) {

      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = +prompt('Какой годовой процент?', '10');
      }

      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
      }
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period
  }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('расходы за месяц: ' + appData.expensesMonth);
console.log('время за которое будет достигнута цель: ' + appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log(appData);

for (const key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}


