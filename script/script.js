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
  incomeItem = document.querySelectorAll('.income-items'),
  btnRes = document.querySelector('#cancel'),
  allInp = document.querySelectorAll('.data input[type="text"]')


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

    btnRes.style.display = 'block';
    start.style.display = 'none';

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncomeMonth();

    appData.getBudget();
    appData.showResult();
    inputDisabled();
  },

  reset: function () {

    inputEnabled();

    console.log(periodSelect.value);

    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.expensesMonth = 0;
    appData.deposit = false;
    appData.percentDeposit = null;
    appData.moneyDeposit = null;

    periodSelect.value = 1;

    btnRes.style.display = 'none';
    start.style.display = 'block';

    document.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });
  },

  // результаты
  showResult: function () {

    periodSelect.addEventListener('input', function () {
      appData.showResult();
    });

    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
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
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  // чистый доход 
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  // время достижения цели
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },

  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return ("У вас высокий уровень дохода");
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      return ("У вас средний  уровень дохода");
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
      return ("К сожалению у вас уровень дохода ниже среднего");
    } else if (this.budgetDay <= 0) {
      return ("Цель не будет достигнута");
    } else {
      return ("Что то пошло не так");
    }
  },

  getInfoDeposit: function () {
    if (this.deposit) {

      while (!isNumber(this.percentDeposit)) {
        this.percentDeposit = +prompt('Какой годовой процент?', '10');
      }

      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
      }
    }
  },

  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  }
};

function bindStart() {
  appData.start.call(appData);
};

start.setAttribute("disabled", "disabled");

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
    start.removeAttribute("disabled", "disabled");
  } else if (salaryAmount.value == '') {
    start.setAttribute("disabled", "disabled");
  }
});

start.addEventListener('click', bindStart);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

btnRes.addEventListener('click', appData.reset);

periodSelect.addEventListener('input', function () {
  document.querySelector('.period-amount').textContent = periodSelect.value;
});

function inputDisabled() {

  allInp.forEach((item) => {
    item.setAttribute("disabled", "disabled");
  })

};

function inputEnabled() {

  allInp.forEach((item) => {
    item.removeAttribute("disabled", "disabled");
  })

};




// console.log('расходы за месяц: ' + appData.expensesMonth);

// if (appData.getTargetMonth() > 0) {
//   console.log('время за которое будет достигнута цель: ' + appData.getTargetMonth());
// } else {
//   console.log("Цель не будет достигнута");
// }


for (const key in appData) {
  // console.log('Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}




