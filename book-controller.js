'use strict';
// DOM, send functions to book.service
var gViewBy;
function init() {
  renderBooks();
}
function onChangeView(viewBy) {
  gViewBy = viewBy;
  renderBooks(gViewBy);
}

function renderBooks(gViewBy = 'table') {
  var books = getBooks();
  var elGallery = document.querySelector('.books-gallery');
  const elTable = document.querySelector('.books-table');

  if (gViewBy === 'table') {
    elTable.style.display = 'block';
    elGallery.style.display = 'none';
    var strHtml = `<tr>`;
    for (const key in books[0]) {
      if (key === 'price' || key === 'name')
        strHtml += `<th class="sortbyNamePrice" onclick="onSortBooks('${key}')"> ${key}(sortable)</th>`;
      else strHtml += `<th> ${key} </th>`;
    }
    strHtml += `<th colspan="3">Actions</th>`;
    strHtml += `</tr>`;

    books.forEach((book) => {
      strHtml += `<tr>`;
      for (const key in book) {
        if (key === 'image') strHtml += `<td><img src="${book[key]}"></td>`;
        else strHtml += `<td>${book[key]}</td>`;
      }
      strHtml += `<td><button onclick="onOpenModal(${book.id})" class="read-btn">Read</button></td><td><button onclick="onUpdateBook(${book.id})" class="update-btn">update</button><br><td><button onclick="onRemoveBook(${book.id})" class="delete-btn">Delete</button></td>`;
      strHtml += `</tr>`;
    });
    return (elTable.innerHTML =
      `<table class="main-table">` + strHtml + `</table>`);
  } else if (gViewBy === 'gallery') {
    elTable.style.display = 'none';
    elGallery.style.display = 'block';
    var strHtml = '';
    books.forEach((book) => {
      strHtml += `<div class="card">`;
      for (const key in book) {
        if (key === 'image') {
          strHtml += `<img src="${book[key]}" onclick="onOpenModal(${book.id})"><br>`;
        } else {
          strHtml += `<span>${key}: ${book[key]}</span><br>`;
        }
      }
      strHtml += `</div>`;
    });
    return (elGallery.innerHTML = strHtml);
  }
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks(gViewBy);
}

function onAddBook() {
  var elImage = document.querySelector('.newpage-model-image');
  var elBookName = document.querySelector('#add-name');
  var elPrice = document.querySelector('#add-price');
  var elRate = document.querySelector('#add-rate');

  if (!elImage.src || !elBookName.value || !elPrice.value || !elRate.value)
    return;
  console.log('gg');
  addBook(elImage, elBookName, elPrice, elRate);
  renderBooks(gViewBy);
  onCloseAddNewBookModal();
}
function onCloseAddNewBookModal() {
  document.querySelector('.newpage-modal-container').style.display = 'none';
}

function onUpdateBook(bookId) {
  document.querySelector('.modal-priceupdate-container').style.display =
    'block';
  var book = getBookById(bookId);
  var elImg = document.querySelector('.update-model-image');
  var elBookId = document.querySelector('#edit-id');
  var elBookName = document.querySelector('#edit-name');
  var elBookPrice = document.querySelector('#edit-price');
  var elBookRate = document.querySelector('#edit-rate');

  elBookId.value = book.id;
  elBookName.value = book.name;
  elBookPrice.value = book.price;
  elBookRate.value = book.rate;
  elImg.src = book.image;
  renderBooks(gViewBy);
}

function onConfirmUpdate() {
  var bookNameVal = document.querySelector('#edit-name').value;
  var bookPriceVal = document.querySelector('#edit-price').value;
  var bookRateVal = document.querySelector('#edit-rate').value;

  confirmUpdate(bookNameVal, bookPriceVal, bookRateVal);
  renderBooks(gViewBy);
}
function onCloseUpdateModal() {
  document.querySelector('.modal-priceupdate-container').style.display = 'none';
}

function onOpenNewPageModal() {
  document.querySelector('.newpage-modal-container').style.display = 'block';
}
function onLoadFile(event) {
  var image = document.querySelector('.newpage-model-image');
  image.src = `/img/${event.target.files[0].name}`;
}
function onCloseModal() {
  document.querySelector('.modal').hidden = true;
}

function onOpenModal(bookId) {
  document.querySelector('.modal').hidden = false;
  var elBookImg = document.querySelector('.modal-img');
  var elBookTitle = document.querySelector('.modal-title');
  var elBookDetails = document.querySelector('.modal-details');
  var elBookRate = document.querySelector('.modal-rate');

  var book = getBookById(bookId);

  elBookImg.src = `${book.image}`;
  elBookTitle.innerHTML = `${book.name}`;
  elBookDetails.innerText = makeLorem();
  elBookRate.value = getRandomIntInclusive(0, 10);
}

function onSortBooks(sortBy) {
  sortBooks(sortBy);
  renderBooks();
}

function onNextPage(isNext) {
  nextPage(isNext);
  renderBooks(gViewBy);
}
