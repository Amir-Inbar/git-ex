'use strict';

// global verbs, change model
var gSortBy = 'name';
var gBooks;
const KEY = 'books';
var gNextId = 0;
var gPageIdx = 0;
const PAGE_SIZE = 3;
_createBooks();

function _createBook(
  name,
  price,
  image = '/img/0.jpg',
  rate = getRandomIntInclusive(0, 10)
) {
  gNextId++;
  return {
    id: gNextId,
    image,
    name,
    price,
    rate,
  };
}

function _createBooks() {
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    var booksName = [
      'a tale of sorcery',
      'atomic habits',
      'big shot diary',
      'how to save life',
      'midnight in washington',
      'rigged how the media big tech',
      'SAT study guide',
      'the boys a memoir',
      'the christmas pig',
      'there is nothing for you here',
    ];
    books = [];
    for (let i = 0; i <= 9; i++) {
      var book = _createBook(
        booksName[i],
        getRandomIntInclusive(10, 100),
        `/img/${i}.jpg`
      );
      books.push(book);
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

function removeBook(bookId) {
  var book = gBooks.findIndex((book) => book.id === bookId);
  gBooks.splice(book, 1);
}

function addBook(elImage, elBookName, elPrice, elRate) {
  var book = _createBook(
    elBookName.value,
    elPrice.value,
    elImage.src,
    elRate.value
  );
  gBooks.push(book);
}

function confirmUpdate(name, price, rate) {
  var bookId = document.querySelector('#edit-id').value;
  var book = gBooks.find((book) => book.id === bookId);

  book.name = name;
  book.price = price;
  book.rate = rate;
}

function getBookById(bookId) {
  var book = gBooks.find((book) => book.id === bookId);
  return book;
}

function sortBooks(sortBy) {
  gSortBy = sortBy;

  if (gSortBy === 'price') sortByPrice();
  else sortByName();
}

function nextPage(isNext) {
  if (isNext) {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
  } else {
    gPageIdx--;
    if (gPageIdx <= 0) gPageIdx = 0;
  }
}

function getBooks() {
  var books = gBooks;
  const fromIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(fromIdx, fromIdx + PAGE_SIZE);
  return books;
}

function sortByName() {
  gBooks.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
}

function sortByPrice() {
  gBooks.sort((a, b) => {
    return a.price - b.price;
  });
}
