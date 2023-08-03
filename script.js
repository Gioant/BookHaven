class book {
    constructor(bookCover, title, author, pages, year, status) {
        this.bookCover = bookCover;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.status = status;
    }
    //add related methods to books here
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

    //add related methods to library here
}