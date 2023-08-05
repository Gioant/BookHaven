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

export default Book;