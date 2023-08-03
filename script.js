class book {
    constructor(bookCover, title, author, pages, year, status) {
        this.bookCover = bookCover;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.status = status;
    }

    //add book to library
    addToLibrary(library) {
        library.addBook(this);
    }

    // Method to add the book to the library from form inputs
    addBookToLibrary(library, imgLinkValue, titleValue, authorValue, pagesValue, yearValue, readStatusValue) {
        // Update the book cover URL with the provided imgLinkValue
        this.setBookCover(imgLinkValue);

        // Set the title, author, pages, year, and status with the provided values
        this.setTitle(titleValue);
        this.setAuthor(authorValue);
        this.setPages(pagesValue);
        this.setYear(yearValue);
        this.setStatus(readStatusValue);

        // Add the book to the library
        this.addToLibrary(library);

        // Call the displayBooks method to ensure consistency
        library.displayBooks();
    }

    get bookCover() {
        return this.bookCover;
    }

    set bookCover(newBookCover) {
        this.bookCover = newBookCover;
    }

    get title() {
        return this.title;
    }

    set title(newTitle) {
        this.title = newTitle;
    }

    get author() {
        return this.author;
    }

    set author(newAuthor) {
        this.author = newAuthor;
    }

    get pages() {
        return this.pages;
    }

    set pages(newPages) {
        this.pages = newPages;
    }

    get year() {
        return this.year;
    }

    set year(newYear) {
        this.year = newYear;
    }

    get status() {
        return this.status;
    }

    set status(newStatus) {
        this.status = newStatus;
    }
}


class Library {
    constructor() {
        this.library = [];
    }

    addBook(book) {
        this.library.push(book);
    }

    removeBook(index) {
        this.library.splice(index, 1);
    }

    changeBookStatus(index) {
        if (this.library[index].status === 'Read') {
            this.library[index].status = 'Not Read';
        } else {
            this.library[index].status = 'Read';
        }
    }

    //method to create DOM element for book and append it to library
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

    // Method to change the status of a book in the library
    changeBookStatus(card) {
        // Get the data-index attribute of the card
        const dataIndex = card.getAttribute('data-index');

        // Update the book status in the library array
        if (this.library[dataIndex].status === 'Read') {
            this.library[dataIndex].status = 'Not Read';
        } else {
            this.library[dataIndex].status = 'Read';
        }

        // Update the book status button in the DOM
        const statusButton = card.querySelector('.book-status');
        statusButton.textContent = this.library[dataIndex].status;

        // Update the background color of the status button
        if (this.library[dataIndex].status === 'Read') {
            statusButton.style.backgroundColor = '#32CD32';
        } else {
            statusButton.style.backgroundColor = '#FF004F';
        }
    }

    addBooksManually() {
        const book1 = new Book(
            "https://upload.wikimedia.org/wikipedia/en/e/e4/Ender%27s_game_cover_ISBN_0312932081.jpg",
            "The Ender's Game",
            "Orson Scott Card",
            "374",
            "1985",
            "Read"
        );

        const book2 = new Book(
            "https://i0.wp.com/booksofbrilliance.com/wp-content/uploads/2020/06/4956476726_26b690b952_c.jpg",
            "Fahrenheit 451",
            "Ray Bradbury",
            "158",
            "1953",
            "Not Read"
        );

        const book3 = new Book(
            "https://dynamic.indigoimages.ca/v1/books/books/0140386645/1.jpg",
            "The Westing Game",
            "Ellen Raskin",
            "216",
            "1978",
            "Read"
        );

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
}