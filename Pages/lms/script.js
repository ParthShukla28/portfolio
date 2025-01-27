class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isAvailable = true;
    }

    toString() {
        return `Title: ${this.title}, Author: ${this.author}, Available: ${this.isAvailable}`;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        updateOutput(`Book added: ${book.toString()}`);
    }

    removeBook(title) {
        const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
        if (index !== -1) {
            const removedBook = this.books.splice(index, 1);
            updateOutput(`Book removed: ${removedBook[0].toString()}`);
        } else {
            updateOutput("Book not found.");
        }
    }

    listBooks() {
        if (this.books.length === 0) {
            updateOutput("No books available.");
        } else {
            let output = "";
            this.books.forEach(book => output += book.toString() + "\n");
            updateOutput(output);
        }
    }

    checkOutBook(title) {
        const book = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
        if (book) {
            if (book.isAvailable) {
                book.isAvailable = false;
                updateOutput(`Book checked out: ${book.toString()}`);
            } else {
                updateOutput("Book is already checked out.");
            }
        } else {
            updateOutput("Book not found.");
        }
    }

    returnBook(title) {
        const book = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
        if (book) {
            if (!book.isAvailable) {
                book.isAvailable = true;
                updateOutput(`Book returned: ${book.toString()}`);
            } else {
                updateOutput("Book was not checked out.");
            }
        } else {
            updateOutput("Book not found.");
        }
    }
}

let library = new Library();

function updateOutput(message) {
    const outputArea = document.getElementById("output");
    outputArea.value += message + "\n";
}

document.getElementById("add-book").addEventListener("click", () => {
    const title = prompt("Enter Book Title:");
    const author = prompt("Enter Book Author:");
    if (title && author) {
        library.addBook(new Book(title, author));
    } else {
        updateOutput("Invalid input. Book not added.");
    }
});

document.getElementById("remove-book").addEventListener("click", () => {
    const title = prompt("Enter Book Title to Remove:");
    if (title) {
        library.removeBook(title);
    }
});

document.getElementById("list-books").addEventListener("click", () => {
    library.listBooks();
});

document.getElementById("check-out").addEventListener("click", () => {
    const title = prompt("Enter Book Title to Check Out:");
    if (title) {
        library.checkOutBook(title);
    }
});

document.getElementById("return-book").addEventListener("click", () => {
    const title = prompt("Enter Book Title to Return:");
    if (title) {
        library.returnBook(title);
    }
});
