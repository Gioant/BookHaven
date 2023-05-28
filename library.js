// get necessary elements

// Get the form inputs
const imgInput = document.getElementById('img-link');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const yearInput = document.getElementById('year');
const readStatusInput = document.getElementById('Read-Status');

// Get the div elements for displaying book details
const bookImageDiv = document.getElementsByClassName('.book-image');
const bookTitleDiv = document.getElementsByClassName('.book-title');
const bookAuthorDiv = document.getElementsByClassName('.book-author');
const bookPagesDiv = document.getElementsByClassName('.book-pages');
const bookYearDiv = document.getElementsByClassName('.book-year');
const bookStatusButton = document.getElementsByClassName('.book-status');


//add functions using event listeners for validation for form inputs
authorInput.addEventListener("input", validateAuthor);


/* ====== MODAL LOGIC ====== */
// Get the modal
const modalBox = document.getElementById('modal');

// Get the button that opens the modal
const modalBtn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
const spanClose = document.getElementById("close");

// When the user clicks the button, open the modal 
modalBtn.onclick = function() {
    modalBox.style.display = "flex";
    modalBox.style.alignItems = "center";
}

// When the user clicks on <span> (x), close the modal
spanClose.onclick = function() {
    modalBox.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalBox) {
        modalBox.style.display = "none";
    }
}



/* ======= VALIDATE FORM SECTION =======  */
//function for validating first & last name
function validateAuthor(event) {
    const value = event.target.value;

    //replace any characters that is not a letter with empty ""
    const newValue = value.replace(/[^a-zA-Z]/g, "");

    // Set the value of the input element to the cleaned and formatted value
    event.target.value = finalValue;
}







let library = [];

//constructor
function Book(title, author, pages, year, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.status = status;
}


function addBooktoLibrary() {

}
