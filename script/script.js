
let money = 150000;
let income = "покер";
let addExpenses = "бензин, футбол, билеты";
let deposit = true;
let mission = 2000000;
let period = 8;

let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

console.log(addExpenses.toLowerCase().split(", "));
console.log(budgetDay);