let myLibrary = [];

//gloabal variables
let _title, _author, _pages, _readStatus;

const addNewBtn = document.querySelector(".add-button");
const form = document.getElementById("bookForm");
const addBook = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const deleteBookBtn = document.querySelectorAll(".delete-book");

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-book")) {
    event.target.parentElement.parentElement.remove();
  }
  if (event.target.classList.contains("read-status")) {
    const card = event.target.parentElement.parentElement;
    const index = Array.from(card.parentElement.children).indexOf(card);
    const book = myLibrary[index];
    book.updateStatus();
    event.target.textContent = book.status;
  }
});

addNewBtn.addEventListener("click", () => {
  form.classList.add("active");
});

cancelBtn.addEventListener("click", () => {
  form.classList.remove("active");
});

addBook.addEventListener("click", () => {
  _title = document.getElementById("name-value").value;
  _author = document.getElementById("author-value").value;
  _pages = document.getElementById("pageNum-value").value;
  _readStatus = document.getElementById("read").checked;

  addBookToLibrary();

  form.reset();
  form.classList.remove("active");
});

class Book {
  constructor(name, author, pageNum, status) {
    this.name = name;
    this.author = author;
    this.pageNum = pageNum;
    this.status = status;
  }

  updateStatus() {
    this.status = this.status === "Completed" ? "On Going" : "Completed";
  }
}

function addBookToLibrary() {
  if (_author === "" || _title === "" || _pages === "") {
    alert("Please fill all the fields");
    from.classList.remove("active");
  } else {
    myLibrary.push(new Book(_title, _author, _pages, _readStatus));
    createBookCard(
      _title,
      _author,
      _pages,
      _readStatus ? "Completed" : "On Going"
    );
  }
}

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
      <img src="src/edit.svg" alt="edit" class="icon edit-book">
    </div>
  `;

  document.querySelector(".book-container").appendChild(bookCard);
}
