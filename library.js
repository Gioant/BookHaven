function Book (title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function(){
        return title + " by " + author + ", " + pages + ", " + status;
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet");

console.log(theHobbit.info());



let library = [];

//constructor
function Book(){

}


function addBooktoLibrary(){

}