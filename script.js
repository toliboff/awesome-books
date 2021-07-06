const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addButton = document.querySelector('#add-button');
const bookList = document.querySelector('#book-list');
const titleError = document.querySelector('#title-error');
const authorError = document.querySelector('#author-error');

class BookList {
  constructor() {
    this.bookArray = [];
    this.key = 'bookDB';
  }

  #createBook(book) {
    const bookItem = document.createElement('li');
    bookItem.setAttribute('id', `book${book.id}`);
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
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('class', 'btn');
    removeButton.setAttribute('class', 'btn');
    removeButton.onclick = () => {
      this.removeBook(book.id);
    };

    bookDiv.appendChild(h1);
    bookDiv.appendChild(p);
    bookDiv.appendChild(hr);
    bookDiv.appendChild(removeButton);
    bookItem.appendChild(bookDiv);

    return bookItem;
  }

  displayBooks(books) {
    console.log(books)
    for (let i = 0; i < books.length; i += 1) {
      const book = books[i];
      bookList.appendChild(this.#createBook(book));
    }
  }

  addBook(bookObject) {
    bookObject.id = Date.now();
    if(this.isStorage()) {
      this.bookArray = this.getStorage();
    }
    this.bookArray.unshift(bookObject);
    this.#setStorage(this.bookArray);
    bookList.prepend(this.#createBook(bookObject));
  }

  removeBook(bookId) {
    const bookToRemove = document.querySelector(`#book${bookId}`);
    bookToRemove.parentNode.removeChild(bookToRemove);
    this.bookArray = this.getStorage().filter((book) => book.id !== +bookId);
    this.#setStorage(this.bookArray);
  }

  #setStorage(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getStorage() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  isStorage() {
    if (localStorage.getItem(this.key)) {
      return true;
    }
    return false;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const bookCollection = new BookList();

  if (bookCollection.isStorage()) {
    bookCollection.displayBooks(bookCollection.getStorage());
  }

  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    const bookTitle = title.value.trim();
    const bookAuthor = author.value.trim();
    if (!bookTitle || !bookAuthor) {
      if (!bookTitle) {
        titleError.textContent = 'Please provide a valid title';
      } else {
        titleError.textContent = '';
      }
      if (!bookAuthor) {
        authorError.textContent = 'Please provide a valid author';
      } else {
        authorError.textContent = '';
      }
    } else {
      titleError.textContent = '';
      authorError.textContent = '';
      const bookObject = {
        title: title.value,
        author: author.value,
      };
      bookCollection.addBook(bookObject);
      title.value = '';
      author.value = '';
    }
  });
});
