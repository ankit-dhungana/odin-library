let myLibrary = [];

class Book {
  constructor(name, author, pageNum, status) {
    this.name = name;
    this.author = author;
    this.pageNum = pageNum;
    this.status = status;
  }
}

const form = document.querySelector(".book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const addNewBook = document.querySelector(".add-button");
addNewBook.addEventListener("click", () => {
  form.classList.add("active");
});

const cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", () => {
  form.classList.remove("active");
});

const addBook = document.querySelector(".add-btn");
addBook.addEventListener("click", () => {
  _title = document.getElementById("name-value").value;
  _author = document.getElementById("author-value").value;
  _pages = document.getElementById("pageNum-value").value;
  _readStatus = document.getElementById("read").checked
    ? "Completed"
    : "On Going";

  addBookToLibrary();

  form.reset();
  form.classList.remove("active");
});

function createBookCard(_title, _author, _pages, _readStatus) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  bookCard.innerHTML = `
    <p class="title">${_title}</p>
    <p class="author">${_author}</p>
    <div class="pages">
    <p>${_pages}</p>
    <p class="read-status">${_readStatus}</p>
    </div>
    <div class="button-holder">
      <img src="src/delete.svg" alt="delete" class="icon delete-book">
    </div>
  `;

  document.querySelector(".book-container").appendChild(bookCard);
}

function addBookToLibrary() {
  if (_author === "" || _title === "" || _pages === "") {
    alert("Please fill all the fields");
    form.classList.remove("active");
  } else {
    myLibrary.push(new Book(_title, _author, _pages, _readStatus));
  }
  render();
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function updateStatus(index) {
  myLibrary[index].status =
    myLibrary[index].status === "Completed" ? "On Going" : "Completed";
  render();
}

function attachEventListners() {
  const deleteBtn = document.querySelectorAll(".delete-book");
  const readBtn = document.querySelectorAll(".read-status");

  deleteBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      deleteBook(index);
    });
  });

  readBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      updateStatus(index);
    });
  });
}

function render() {
  const bookContainer = document.querySelector(".book-container");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    createBookCard(book.name, book.author, book.pageNum, book.status);
  });

  attachEventListners();
}
