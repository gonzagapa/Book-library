import { books } from "./book.js";

const addBtn = document.querySelector("#btn__addBook");
const dialog = document.getElementById("dialog");
const submitBtn = document.getElementById("confirm__button");
const form = document.querySelector(".form");
const books_container = document.getElementById("books_container");


//When de page is fully loaded, display the books
document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
})

books_container.addEventListener("click", (e) => {
    if (e.target.closest(".remove_btn")) {
        deleteBook(e);
        displayBooks();
    }
    if (e.target.classList.contains("state_btn")) {
        changeState(e)
        displayBooks();
    }
})

function deleteBook(event) {
    let index = event.target.closest(".book").dataset.index;
    books.splice(index, 1); //Remove the book from the array
}

function changeState(event) {
    let index = event.target.closest(".book").dataset.index;
    books[index].readed = !books[index].readed; //Change the state of the book  
}

//Open de the dialog
addBtn.addEventListener("click", () => {
    dialog.showModal();
});

//Get the form data and close the dialog
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let book = new Book(form.querySelector("#title").value,
        form.querySelector("#author").value,
        form.querySelector("#pages").value,
        true);
    console.log(book);
    addBookToLibrary(book);
    dialog.close();
    displayBooks();
});

function Book(title, image = "https://cdn11.bigcommerce.com/s-nfxi2m/images/stencil/640w/products/646/3216/Hobbit-book2__13763.1694542278.jpg?c=2", author, pages, readed) {
    this.title = title;
    this.image = image;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
}

function addBookToLibrary(book) {
    books.push(book);
}


function displayBooks() {
    books_container.innerHTML = "";
    books.forEach(book => {
        let card = `<article class="book" data-index="${books.indexOf(book)}">
                    <h2 class="book__title">${book.title}</h2>
                    <figure class="book__image-container">
                        <img src="https://cdn11.bigcommerce.com/s-nfxi2m/images/stencil/640w/products/646/3216/Hobbit-book2__13763.1694542278.jpg?c=2"
                            alt="book image" class="img">
                    </figure>
                    <p class="book__author">${book.author}</p>
                    <p class="book__pages">${book.pages}</p>
                    <p class="book__readed">${(book.readed) ? "Readed" : "Not readed"}</p>

                    <div class="book__buttons">
                        <button class="button remove_btn"><ion-icon name="close-outline"></ion-icon></button>
                        <button class="button state_btn">read/not read</button>
                    </div>
                </article>`;
        books_container.insertAdjacentHTML("beforeend", card);
    });
}