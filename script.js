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
}


//must create new instance of library to access method
const library = new Library();

//load books manually after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    library.addBooksManually();
});