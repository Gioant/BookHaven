# BookHaven

Demo:
![bookhaven](https://github.com/Gioant/BookHaven/assets/66393141/899823db-78ae-4d58-82af-77c39e0e8737)

## Description

This is a small library app project created with JavaScript. To put in practice Object oriented principles using objects & objects constructors to create a book.



## Features

- Adding books to the "library" by clicking the "+" sign icon & entering book details (Book cover image, title, author, pages, year, and read status)
- After successfully adding a book, displays an alert message using SweetAlert2
- Display the list of books in a visually appealing format
- Change status of books with a click of a button
- Remove books from the library by clicking the trash icon


There is proper validation via javascript for the form such as:
- Maximum length of characters for Title, Author, pages & year
- Checking For empty inputs
- To verify if the link address of the book cover image is valid (jpg, jpeg or png) and uses that as the image. If not, it will resort to using a default image.