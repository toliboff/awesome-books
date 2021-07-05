const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addButton = document.querySelector('#add-button');
const bookList = document.querySelector('#book-list');

let bookArray = [];

const createBook = (book) => {
  const bookItem = document.createElement('li');
  const bookDiv = document.createElement('div');
  bookDiv.setAttribute('class', 'book');
  const h1 = document.createElement('h1');
  h1.setAttribute('class', 'title');
  h1.textContent = book.title;
  const p = document.createElement('p');
  p.setAttribute('class', 'authour');
  p.textContent = book.author;
  const hr = document.createElement('hr');
  const removeButton = document.createElement('button');
  removeButton.id = book.id;
  removeButton.textContent = 'Remove';
  removeButton.setAttribute('class', 'btn');

  bookDiv.appendChild(h1);
  bookDiv.appendChild(p);
  bookDiv.appendChild(hr);
  bookDiv.appendChild(removeButton);
  bookItem.appendChild(bookDiv);

  return bookItem;
};

const addBook = (bookObject) => {
  bookObject.id = bookArray.length + 1;
  bookArray.unshift(bookObject);
  bookList.prepend(createBook(bookObject));
};

const displayBooks = (books) => {
  for (let i = 0; i < books.length; i += 1) {
    const book = books[i];
    bookList.appendChild(createBook(book));
  }
};

const removeBook = (bookId) => {
  bookArray = bookArray.filter((book) => book.id !== +bookId);
  displayBooks(bookArray);
};

addButton.addEventListener('click', (event) => {
  const bookObject = {
    title: title.value,
    author: author.value,
  };
  addBook(bookObject);
  title.value = '';
  author.value = '';

  event.preventDefault();

  const removeButtons = bookList.querySelectorAll('.btn');
  removeButtons.forEach((book) => {
    book.addEventListener('click', (event) => {
      removeBook(event.target.id);
    });
  });
});

displayBooks(bookArray);