'use strict';

let start = document.getElementById('start'),

  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],

  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelector('#deposit-check'),

  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],

  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  incomeItems = document.querySelectorAll('.income-items'),
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  expensesItems = document.querySelectorAll('.expenses-items'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  incomeItem = document.querySelectorAll('.income-items');


//проверка на буквы
let checkStr = function (str) {
  let reg = /^[\d]+$/;
  return !reg.test(str);
};

//  проверка на число
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: null,
  moneyDeposit: null,

  start: function () {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncomeMonth();

    appData.getBudget();
    appData.showResult();
  },

  // результаты
  showResult: function () {

    periodSelect.addEventListener('input', function () {
      appData.showResult();
    });

    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
  },

  //  прибавляем блок с обязательными расходами
  addExpensesBlock: function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  //  формируем объект с расходами
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  //  добавляем блок с доходами
  addIncomeBlock: function () {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  //  формируем объект с доходами 
  getIncome: function () {

    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    })

  },

  // доходы за месяц
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  //  результат с расходами
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  //  результат с доходами
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item.value !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  // расходы за месяц
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  // чистый доход 
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  // время достижения цели
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ("У вас высокий уровень дохода");
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return ("У вас средний  уровень дохода");
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      return ("К сожалению у вас уровень дохода ниже среднего");
    } else if (appData.budgetDay <= 0) {
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

  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};

start.setAttribute("disabled", "disabled");

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
    start.removeAttribute("disabled", "disabled");
  } else if (salaryAmount.value == '') {
    start.setAttribute("disabled", "disabled");
  }
});

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function () {
  document.querySelector('.period-amount').textContent = periodSelect.value;
})



// console.log('расходы за месяц: ' + appData.expensesMonth);

// if (appData.getTargetMonth() > 0) {
//   console.log('время за которое будет достигнута цель: ' + appData.getTargetMonth());
// } else {
//   console.log("Цель не будет достигнута");
// }


for (const key in appData) {
  // console.log('Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}




