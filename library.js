// get necessary elements

// Get the form inputs
const imgInput = document.getElementById('img-link');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const yearInput = document.getElementById('year');
const readStatusInput = document.getElementById('Read-Status');
const submitBtn = document.getElementById("book-submit");

// Get the div elements for displaying book details
const bookImageDiv = document.getElementsByClassName('book-image');
const bookTitleDiv = document.getElementsByClassName('book-title');
const bookAuthorDiv = document.getElementsByClassName('book-author');
const bookPagesDiv = document.getElementsByClassName('book-pages');
const bookYearDiv = document.getElementsByClassName('book-year');
const bookStatusButton = document.getElementsByClassName('book-status');


//add functions using event listeners for validation for form inputs
imgInput.addEventListener("blur", validateImage);
authorInput.addEventListener("input", validateLetters);
titleInput.addEventListener("input", validateLetters);

pagesInput.addEventListener("input", validateNumbers);
yearInput.addEventListener("input", validateNumbers);
submitBtn.addEventListener("click", formSubmit);


/* ====== MODAL LOGIC ====== */
// Get the modal
const modalBox = document.getElementById('modal');

// Get the button that opens the modal
const modalBtn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
const spanClose = document.getElementById("close");

// When the user clicks the button, open the modal 
modalBtn.onclick = function () {
    modalBox.style.display = "flex";
    modalBox.style.alignItems = "center";
}

// When the user clicks on <span> (x), close the modal
spanClose.onclick = function () {
    modalBox.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalBox) {
        modalBox.style.display = "none";
    }
}

/* manually add 3 books  */
function addBooksManually() {
    const book1 = new Book(
        "https://rb.gy/7lrnm",
        "Ender's Game",
        "Orson Scott card",
        "374 pages", "1985",
        "Read");

    const book2 = new Book(
        "https://rb.gy/l0dsf",
        "The Westing Game",
        "Ellen Raskin",
        "216 pages",
        "1978",
        "Read");

    const book3 = new Book(
        "https://rb.gy/nfvp8",
        "Fahrenheit 451",
        "Ray Bradbury",
        "158",
        "1953",
        "Not Read");

    library.push(book1, book2, book3);
}


/* ======= VALIDATE FORM SECTION =======  */
//function for validating for letters only
function validateLetters(event) {
    const value = event.target.value;

    //replace any characters that is not a letter with empty ""
    const finalValue = value.replace(/[^a-zA-Z',\s]/g, "");

    // Set the value of the input element to the cleaned and formatted value
    return event.target.value = finalValue;
}

//function to validate for numbers only
function validateNumbers(event) {
    let value = event.target.value;

    let finalValue = value.replace(/[^0-9]/g, "");

    return event.target.value = finalValue;
}


function validateImage(event) {

    const url = event.target.value;

    const imageExtensions = ['.png', '.jpg', '.jpeg'];
    const fileExtension = url.substring(url.lastIndexOf('.')).toLowerCase();


    if (imageExtensions.includes(fileExtension)) {
        return url;
    } else {
        const defaultImg = "https://rb.gy/od0ge";
        return defaultImg;
    }
}

//function to prevent form of submitting
function formSubmit(event) {
    event.preventDefault();

    const imgLinkValue = imgInput.value;
    addBooktoLibrary(imgLinkValue);
}



/* ======= START OF ADD BOOK LOGIC ====== */
let library = [];

//constructor
function Book(bookCover, title, author, pages, year, status) {
    this.bookCover = bookCover;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.status = status;
}

//function to add book object to library & call function to displayBook on page
function addBooktoLibrary(imgLinkValue) {
    const bookCoverValue = imgLinkValue;
    const titleValue = titleInput.value;
    const authorValue = authorInput.value;
    const pagesValue = pagesInput.value;
    const yearValue = yearInput.value;
    const readStatusValue = readStatusInput.value;

    const newUserBook = new Book(bookCoverValue, titleValue, authorValue, pagesValue, yearValue, readStatusValue);

    library.push(newUserBook);
}


function displayBooks() {
    const libraryContainer = document.getElementById('library-container');

    // Clear the container before adding books
    libraryContainer.innerHTML = '';

    library.forEach((book, index) => {
        const bookElement = createBookElement(book, index);
        libraryContainer.appendChild(bookElement);
    });
}



function createBookElement(book, index) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('card-books');
    bookElement.setAttribute("data-index", index);

    const topDiv = document.createElement('div');
    topDiv.classList.add('top');
    bookElement.appendChild(topDiv);

    const imageElement = document.createElement('img');
    imageElement.classList.add('book-image');
    imageElement.src = book.bookCover;
    topDiv.appendChild(imageElement);

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom');
    bookElement.appendChild(bottomDiv);

    const titleElement = document.createElement('h3');
    titleElement.classList.add('book-title');
    titleElement.textContent = book.title;
    bottomDiv.appendChild(titleElement);

    const authorElement = document.createElement('p');
    authorElement.classList.add('book-author');
    authorElement.textContent = book.author;
    bottomDiv.appendChild(authorElement);

    const pagesElement = document.createElement('p');
    pagesElement.classList.add('book-pages');
    pagesElement.textContent = book.pages;
    bottomDiv.appendChild(pagesElement);

    const yearElement = document.createElement('p');
    yearElement.classList.add('book-year');
    yearElement.textContent = book.year;
    bottomDiv.appendChild(yearElement);

    const statusButton = document.createElement('button');
    statusButton.classList.add('book-status');
    statusButton.textContent = book.status;
    bottomDiv.appendChild(statusButton);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    const removeIcon = document.createElement('img');
    removeIcon.src = './images/trash.png';
    removeIcon.alt = 'trash-delete';
    removeButton.appendChild(removeIcon);
    bottomDiv.appendChild(removeButton);

    return bookElement;
}