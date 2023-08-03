class book {
    constructor(bookCover, title, author, pages, year, status) {
        this.bookCover = bookCover;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.status = status;
    }

    addToLibrary(library) {
        library.addBook(this);
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

    addBooksManually() {

    }
}