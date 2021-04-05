'use strict';

let money = prompt("Ваш месячный доход?");
let income = "покер";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у Вас депозит в банке?");

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - (+amount1 + +amount2);
console.log('бюджет на месяц', budgetMonth);

let mission = 2000000;
let period = 8;
let budgetDay = budgetMonth / 30;

console.log('доход в день', budgetDay);
console.log(`цель будет достигнута за ${Math.round(mission / budgetMonth)} месяцев`);
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay < 1200 && budgetDay >= 600) {
  console.log("У вас средний  уровень дохода");
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
  console.log("Что то пошло не так");
}