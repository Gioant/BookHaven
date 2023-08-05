
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

export default Library;