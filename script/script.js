"use strict";

const start = document.getElementById("start"),
  btnPlus = document.getElementsByTagName("button"),
  btnIncomePlus = btnPlus[0],
  btnExpensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  depositCheck = document.querySelector("#deposit-check"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  additionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelectorAll(".income-title")[1],
  incomeItems = document.querySelectorAll(".income-items"),
  expensesTitle = document.querySelectorAll(".expenses-title")[1],
  expensesItems = document.querySelectorAll(".expenses-items"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  incomeItem = document.querySelectorAll(".income-items"),
  btnReset = document.querySelector("#cancel"),
  allInput = document.querySelectorAll('.data input[type="text"]');

//проверка на буквы
const checkStr = (str) => {
  let reg = /^[\d]+$/;
  return !reg.test(str);
};

//  проверка на число
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = null;
    this.moneyDeposit = null;
  }

  check() {
    if (salaryAmount.value !== "") {
      start.removeAttribute("disabled");
    }
  }

  start() {
    if (salaryAmount.value === "") {
      start.setAttribute("disabled", "true");
      return;
    }

    let allInput = document.querySelectorAll(".data input[type = text]");
    allInput.forEach((item) => {
      item.setAttribute("disabled", "true");
    });

    btnIncomePlus.setAttribute("disabled", "true");
    btnExpensesPlus.setAttribute("disabled", "true");
    periodSelect.setAttribute("disabled", "true");

    btnReset.style.display = "block";
    start.style.display = "none";

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();

    this.getBudget();
    this.showResult();
  }

  // результаты
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener("change", () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }

  //  прибавляем блок с обязательными расходами
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(
      cloneExpensesItem,
      btnExpensesPlus
    );

    cloneExpensesItem.querySelectorAll("input").forEach((item) => {
      item.value = "";
    });

    if (expensesItems.length === 3) {
      btnExpensesPlus.style.display = "none";
    }
  }

  //  формируем объект с расходами
  getExpenses() {
    expensesItems.forEach((item) => {
      let cashExpenses = item.querySelector(".expenses-amount").value;
      let itemExpenses = item.querySelector(".expenses-title").value;

      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  //  добавляем блок с доходами
  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
    cloneIncomeItem.querySelectorAll("input").forEach((item) => {
      item.value = "";
    });

    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = "none";
    }
  }

  //  формируем объект с доходами
  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;

      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
      }
    });

    // доходы за месяц
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  //  результат с расходами
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(",");

    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }

  //  результат с доходами
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (item.value !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }

  // расходы за месяц
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  // чистый доход
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth  + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  // время достижения цели
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      return "У вас средний  уровень дохода";
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (this.budgetDay <= 0) {
      return "Цель не будет достигнута";
    } else {
      return "Что то пошло не так";
    }
  }

  // getInfoDeposit() {
  //   if (this.deposit) {
  //     while (!isNumber(this.percentDeposit)) {
  //       this.percentDeposit = +prompt("Какой годовой процент?", "10");
  //     }

  //     while (!isNumber(this.moneyDeposit)) {
  //       this.moneyDeposit = +prompt("Какая сумма заложена?", "10000");
  //     }
  //   }
  // }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  reset() {
    this.resetDeposit();
    depositPercent.value = '';
    depositPercent.style.display = "";
    
    let inputTextData = document.querySelectorAll(".data input[type=text]"),
      resultInputAll = document.querySelectorAll(".result input[type=text]");

    inputTextData.forEach((item) => {
      item.value = "";
      item.removeAttribute("disabled");
      periodSelect.value = "0";
      document.querySelector(".period-amount").innerHTML = periodSelect.value;
    });

    resultInputAll.forEach((item) => {
      item.value = "";
    });

    if (expensesItems.length === 3) {
      btnExpensesPlus.style.display = "none";
    }

    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = "none";
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    btnReset.style.display = "none";
    start.style.display = "block";

    btnIncomePlus.removeAttribute("disabled");
    btnExpensesPlus.removeAttribute("disabled");
    periodSelect.removeAttribute("disabled");
    depositCheck.checked = false;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    } 
  }

  chandePercent() {
    const valueSelect = this.value;

    if (valueSelect === "other") {
      // ДЗ
      depositPercent.style.display = "inline-block";

      depositPercent.addEventListener('input', ()=>{
        if (!isNumber(depositPercent.value)) {
          alert('Введите число');
          depositPercent.value='';
        } 
      });

    } else {

      depositPercent.value = valueSelect;
      depositPercent.style.display = "";
    } 
    console.log(depositPercent);
  }
 

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.chandePercent);
    } else {
      this.resetDeposit();
      depositBank.removeEventListener("change", this.chandePercent);
    }
  }

  resetDeposit(){
    depositBank.style.display = "";
    depositAmount.style.display = "";
    depositBank.value = "";
    depositAmount.value = "";
    this.deposit = false;
  }

  eventListeners() {
    start.addEventListener("click", this.start.bind(this));

    btnExpensesPlus.addEventListener("click", this.addExpensesBlock);
    btnIncomePlus.addEventListener("click", this.addIncomeBlock);

    salaryAmount.addEventListener("keyup", this.check);
    btnReset.addEventListener("click", this.reset.bind(this));

    periodSelect.addEventListener("change", () => {
      document.querySelector(".period-amount").innerHTML = periodSelect.value;
    });

    depositCheck.addEventListener("change", this.depositHandler.bind(this));
  }
}

const appData = new AppData();

appData.eventListeners();

// let addExp = [];
// for (let i = 0; i < appData.addExpenses.length; i++) {
//   let element = appData.addExpenses[i].trim();
//   element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
//   addExp.push(element);
// };
