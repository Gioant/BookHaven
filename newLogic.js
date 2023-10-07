// get necessary form elements
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


//BOOK CLASS
class Book {
    constructor(bookCover, title, author, pages, year, status) {
        this._bookCover = bookCover;
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._year = year;
        this._status = status;
    }

    // Getter and Setter for bookCover
    get bookCover() {
        return this._bookCover;
    }

    set bookCover(newBookCover) {
        this._bookCover = newBookCover;
    }

    // Getter and Setter for title
    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    // Getter and Setter for author
    get author() {
        return this._author;
    }

    set author(newAuthor) {
        this._author = newAuthor;
    }

    // Getter and Setter for pages
    get pages() {
        return this._pages;
    }

    set pages(newPages) {
        this._pages = newPages;
    }

    // Getter and Setter for year
    get year() {
        return this._year;
    }

    set year(newYear) {
        this._year = newYear;
    }

    // Getter and Setter for status
    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
    }
}

//LIBRARY CLASS
class Library {
    constructor() {
        this.library = [];
    }

    addBook(book) {
        this.library.push(book);
    }

    removeBook(card) {
        const dataIndex = card.getAttribute('data-index');
        this.library.splice(dataIndex, 1);

        // Remove the book element from the DOM
        card.remove();

        //update data-index of remaining cards
        const remainingCards = document.querySelectorAll('.card-books');
        remainingCards.forEach((card, index) => {
            card.setAttribute('data-index', index);
        });
    }

    //method to create DOM element for book from form and append it to library
    createBookElement(book, index) {
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
        pagesElement.textContent = book.pages + ' pages';
        bottomDiv.appendChild(pagesElement);

        const yearElement = document.createElement('p');
        yearElement.classList.add('book-year');
        yearElement.textContent = book.year;
        bottomDiv.appendChild(yearElement);

        const statusButton = document.createElement('button');
        statusButton.classList.add('book-status');
        statusButton.textContent = book.status;

        if (statusButton.textContent === "Read") {
            statusButton.style.backgroundColor = '#32CD32';
        } else {
            statusButton.style.backgroundColor = '#FF004F';
        }

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

    // Method to change the status of a book in the library and update the DOM
    changeBookStatus(card) {
        const dataIndex = card.getAttribute('data-index');
        if (this.library[dataIndex].status === 'Read') {
            this.library[dataIndex].status = 'Not Read';
        } else {
            this.library[dataIndex].status = 'Read';
        }

        const statusButton = card.querySelector('.book-status');
        statusButton.textContent = this.library[dataIndex].status;

        if (this.library[dataIndex].status === 'Read') {
            statusButton.style.backgroundColor = '#32CD32';
        } else {
            statusButton.style.backgroundColor = '#FF004F';
        }
    }

    // Method to create a new book and add it to the library
    createBook(bookCover, title, author, pages, year, status) {
        const newBook = new Book();
        newBook.setBookCover(bookCover);
        newBook.setTitle(title);
        newBook.setAuthor(author);
        newBook.setPages(pages);
        newBook.setYear(year);
        newBook.setStatus(status);

        this.addBook(newBook);
    }

    addBookToLibrary(imgLinkValue, titleValue, authorValue, pagesValue, yearValue, readStatusValue) {
        const newBook = new Book(imgLinkValue, titleValue, authorValue, pagesValue, yearValue, readStatusValue);
        this.addBook(newBook);
        this.displayBooks();
    }

    //method to add 3 books manually using setters from book class
    addBooksManually() {
        const book1 = new Book();
        book1.bookCover = "https://upload.wikimedia.org/wikipedia/en/e/e4/Ender%27s_game_cover_ISBN_0312932081.jpg";
        book1.title = "The Ender's Game";
        book1.author = "Orson Scott Card";
        book1.pages = "374";
        book1.year = "1985";
        book1.status = "Read";

        const book2 = new Book();
        book2.bookCover = "https://i0.wp.com/booksofbrilliance.com/wp-content/uploads/2020/06/4956476726_26b690b952_c.jpg";
        book2.title = "Fahrenheit 451";
        book2.author = "Ray Bradbury";
        book2.pages = "158";
        book2.year = "1953";
        book2.status = "Not Read";

        const book3 = new Book();
        book3.bookCover = "https://dynamic.indigoimages.ca/v1/books/books/0140386645/1.jpg";
        book3.title = "The Westing Game";
        book3.author = "Ellen Raskin";
        book3.pages = "216";
        book3.year = "1978";
        book3.status = "Read";

        this.addBook(book1);
        this.addBook(book2);
        this.addBook(book3);

        // Call createBookElement for each book and append the book elements to the library container
        const libraryContainer = document.getElementById("library-container");
        const bookElements = [book1, book2, book3].map((book, index) =>
            this.createBookElement(book, index)
        );
        bookElements.forEach((bookElement) => {
            libraryContainer.appendChild(bookElement);
        });

        // Call the displayBooks method to ensure consistency
        this.displayBooks();
    }

    //method to
    displayBooks() {
        const libraryContainer = document.getElementById('library-container');

        // Clear the container before adding books
        libraryContainer.innerHTML = '';

        this.library.forEach((book, index) => {
            const bookElement = this.createBookElement(book, index);
            libraryContainer.appendChild(bookElement);
        });
    }

    /* ======= VALIDATE FORM SECTION =======  */
    //function for validating for letters only
    validateLetters(event) {
        const value = event.target.value;

        //replace any characters that is not a letter with empty ""
        const finalValue = value.replace(/[^a-zA-Z',\s]/g, "");

        // Set the value of the input element to the cleaned and formatted value
        return event.target.value = finalValue;
    }

    //function for validating title 
    validateTitle(event) {
        const value = event.target.value;

        //replace any characters that is not a letter with empty ""
        const finalValue = value.replace(/[^a-zA-Z0-9',:\s]/g, "");

        // Set the value of the input element to the cleaned and formatted value
        return event.target.value = finalValue;
    }

    //function to validate for numbers only
    validateNumbers(event) {
        let value = event.target.value;

        let finalValue = value.replace(/[^0-9]/g, "");

        return event.target.value = finalValue;
    }


    validateImage(imageUrl) {
        const trimmedUrl = imageUrl.trim();

        if (trimmedUrl === '') {
            return "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg";
        }

        const imageExtensions = ['.png', '.jpg', '.jpeg'];
        const fileExtension = trimmedUrl.substring(trimmedUrl.lastIndexOf('.')).toLowerCase();

        if (imageExtensions.includes(fileExtension)) {
            return trimmedUrl;
        } else {
            return "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg";
        }
    }

    //function to prevent form of submitting
    formSubmit(event) {
        event.preventDefault();

        // Check for empty form inputs and validate minlength
        const inputs = [titleInput, authorInput, pagesInput, yearInput, readStatusInput];
        let allInputsFilled = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'red';
                allInputsFilled = false;
            } else {
                input.style.borderColor = ''; // Reset the border color if not empty
            }

            if (input.getAttribute('minlength') && input.value.trim().length < parseInt(input.getAttribute('minlength'))) {
                input.setCustomValidity(`Please enter at least ${input.getAttribute('minlength')} characters.`);
                input.reportValidity();
                allInputsFilled = false;
            } else {
                input.setCustomValidity(''); // Reset the custom validity message
            }
        });

        if (allInputsFilled) {
            // Make sure to save the return value from the validate function (whether default or one entered by the user)
            const imgLinkValue = this.validateImage(imgInput.value);
            const titleValue = titleInput.value;
            const authorValue = authorInput.value;
            const pagesValue = pagesInput.value;
            const yearValue = yearInput.value;
            const readStatusValue = readStatusInput.value;

            this.addBookToLibrary(imgLinkValue, titleValue, authorValue, pagesValue, yearValue, readStatusValue);

            // Show SweetAlert2 pop-up
            Swal.fire({
                title: 'Success!',
                text: 'Book Successfully Added To Library.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    title: 'alert-title',
                    text: 'alert-text'
                },
                theme: 'Borderless'
            });
        }
    }
}

//must create new instance of library to access methods
const library = new Library();

//load books manually after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    library.addBooksManually();
});

document.querySelector('section').addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains('remove')) {
        const card = e.target.closest('.card-books');
        library.removeBook(card); // Call the removeBook method from the library instance
    }

    if (e.target.classList.contains('book-status')) {
        const card = e.target.closest('.card-books');
        library.changeBookStatus(card); // Call the changeBookStatus method from the library instance
    }
});

// Add functions using event listeners for validation for form inputs
imgInput.addEventListener("blur", (event) => library.validateImage(event.target.value));
authorInput.addEventListener("input", (event) => library.validateLetters(event));
titleInput.addEventListener("input", (event) => library.validateTitle(event));
pagesInput.addEventListener("input", (event) => library.validateNumbers(event));
yearInput.addEventListener("input", (event) => library.validateNumbers(event));

// Add event listener for form submission and call formSubmit method on the library instance
submitBtn.addEventListener("click", (event) => library.formSubmit(event));