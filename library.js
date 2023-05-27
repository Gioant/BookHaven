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



// Get the modal
var modalBox = document.getElementById('modal');

// Get the button that opens the modal
var modalBtn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
var spanClose = document.getElementById("close");

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