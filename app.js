/* eslint-disable max-classes-per-file */
const newTitle = document.getElementById('inputTitle');
const newAuthor = document.getElementById('inputAuthor');
const addButton = document.getElementById('addBtn');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    this.updateLocalData();
    this.displayBooks();
  }

  removeBook(index) {
    this.books = this.books.filter((book, i) => i !== index);
    this.updateLocalData();
    this.displayBooks();
  }

  updateLocalData() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';

    this.books.forEach((book, index) => {
      const div = document.createElement('div');
      div.classList.add('container');
      const p = document.createElement('p');
      p.innerText = `${book.title}  by  ${book.author} `;
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.classList.add('removeBtn');
      removeButton.onclick = () => this.removeBook(index);

      div.append(p);
      div.append(removeButton);
      bookContainer.appendChild(div);
    });
  }
}
const bookList = new BookList();
function addBook() {
  const title = newTitle.value.trim();
  const author = newAuthor.value.trim();

  if (title && author) {
    bookList.addBook(title, author);
    newTitle.value = '';
    newAuthor.value = '';
  } else {
    // eslint-disable-next-line no-alert
    alert('Please enter title and author');
  }
}
bookList.displayBooks();
addButton.addEventListener('click', addBook);