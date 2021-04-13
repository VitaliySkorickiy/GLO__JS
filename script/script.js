'use strict';

const books = document.querySelectorAll('.book');

//  убрал рекламу
const adv = document.querySelector('.adv').remove();

//  изменил фон
document.body.style.backgroundImage = 'url(./image/adv.jpg)';

// упорядочил книги
books[2].before(books[0]);
books[5].after(books[2]);
books[2].before(books[5]);
books[3].before(books[4]);

// исправил заголовок
books[4].getElementsByTagName('h2')[0].innerHTML = '<a>"Книга 3. this и Прототипы Объектов"</a>';

//  добавил главу
let li8 = document.createElement('li');
li8.textContent = 'Глава 8: За пределами ES6';
books[2].getElementsByTagName('li')[8].after(li8);

// книга 5
let books_5 = books[5].getElementsByTagName('li');

books_5[0].after(books_5[2]);
books_5[4].after(books_5[1]);
books_5[1].after(books_5[9]);
books_5[8].after(books_5[6]);

// книга 2
let books_2 = books[0].getElementsByTagName('li');

books_2[9].after(books_2[2]);
books_2[8].before(books_2[6]);
books_2[2].after(books_2[5]);
books_2[3].after(books_2[6]);





