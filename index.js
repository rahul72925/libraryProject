let library = [];
let bookAdded;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${author}, ${pages},${this.read}.`;
  };
}
function addBookDetails() {
  event.preventDefault();
  let getTitle = document.getElementById("title").value;
  let getAuthor = document.getElementById("author").value;
  let getNumber = document.getElementById("number").value;
  let getRead = document.getElementById("read").checked;
  bookAdded = new Book(getTitle, getAuthor, getNumber, getRead);
  library = [...library, bookAdded];
  renderBook();
  document.getElementById("form").reset();
}

const renderBook = () => {
  const display = document.getElementById("Library-container");
  const books = document.querySelectorAll(".libBook");
  console.log(books);

  books.forEach((x) => display.removeChild(x));
  console.log(library);
  for (let i = 0; i < library.length; i++) {
    createBook(library[i]);
  }
};

const createBook = (item) => {
  const Library = document.querySelector("#Library-container");
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authDiv = document.createElement("div");
  const pageDiv = document.createElement("div");
  const removebtn = document.createElement("button");
  const readbtn = document.createElement("button");

  bookDiv.classList.add("libBook");
  bookDiv.setAttribute("id", library.indexOf(item));
  titleDiv.textContent = item.title;
  titleDiv.classList.add("bookTitle");
  bookDiv.appendChild(titleDiv);
  authDiv.textContent = item.author;
  authDiv.classList.add("bookAuthor");
  bookDiv.appendChild(authDiv);
  pageDiv.textContent = item.pages;
  pageDiv.classList.add("bookPages");
  bookDiv.appendChild(pageDiv);
  readbtn.classList.add("readbtn");
  readbtn.classList.add("btn");
  bookDiv.appendChild(readbtn);
  if (item.read == false) {
    readbtn.textContent = "Not Read";
    readbtn.style.backgroundColor = "#e04f63";
  } else {
    readbtn.textContent = "Read";
    readbtn.style.backgroundColor = "#63da63";
  }

  removebtn.textContent = "Remove";
  removebtn.classList.add("btn");
  removebtn.classList.add("btn-danger");
  removebtn.setAttribute("id", "removeBtn");
  bookDiv.appendChild(removebtn);
  Library.appendChild(bookDiv);

  removebtn.addEventListener("click", () => {
    library.splice(library.indexOf(item), 1);
    setData();
    renderBook();
  });
  readbtn.addEventListener("click", () => {
    item.read = !item.read;
    setData();
    renderBook();
  });
};
function setData() {
  localStorage.setItem(`library`, JSON.stringify(library));
}

//pulls books from local storage when page is refreshed
function restore() {
  if (!localStorage.library) {
    renderBook();
  } else {
    let objects = localStorage.getItem("library"); // gets information from local storage to use in below loop to create DOM/display
    objects = JSON.parse(objects);
    library = objects;
    renderBook();
  }
}
const showBookDetailFilling = () => {
  document.getElementsByClassName("bookData")[0].style.display = "flex";
};
const closePopUp = () => {
  document.getElementsByClassName("bookData")[0].style.display = "none";
};
restore();
