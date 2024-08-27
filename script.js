
let addButton = document.querySelector(".add");
let dialog = document.querySelector("dialog");
let submitBtn = document.querySelector(".submit");

let currentBook;
let titleInp = document.querySelector("#title");
let authorInp = document.querySelector("#author");
let pagesInp = document.querySelector("#pages"); 
let yesInp = document.querySelector("#yes");

let bookContainer = document.querySelector(".mainContainer");
let book;

let title;
let author;
let pages;
let read;


let books = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(book){
    books.push(book);
    console.log("push");
}

addButton.addEventListener("click",() => {
    dialog.showModal();
    submitBtn.addEventListener("click",(e) => {
        e.preventDefault();
        if (titleInp.value && authorInp.value && pagesInp.value){
            console.log("submit");
            title = titleInp.value;
            author = authorInp.value;
            pages = pagesInp.value;
            if (yesInp.checked){
                read = true;
            }
            else{
                read = false;
            }
            book = new Book(title,author,pages,read);
            addBook(book);
            currentBook = books.length - 1;
            titleInp.value = "";
            authorInp.value = "";
            pagesInp.value = "";
            dialog.close();

            let bookDiv = document.createElement("div");

            bookDiv.setAttribute("id",String(currentBook));

            bookDiv.classList.add("book");
            bookContainer.appendChild(bookDiv);

            let titleP = document.createElement("p");
            let authorP = document.createElement("p");
            let pagesP = document.createElement("p");
            let readStatus = document.createElement("div");
            let deleteButton = document.createElement("div");

            readStatus.classList.add("readButton");
            readStatus.classList.add(`book${String(currentBook)}`);
            deleteButton.classList.add("deleteButton");

            titleP.textContent = books[currentBook].title;
            authorP.textContent = `-By ${books[currentBook].author}`;
            pagesP.textContent = `${books[currentBook].pages} pages`;
            deleteButton.textContent = "DELETE BOOK";

            if (books[currentBook].read){
            readStatus.textContent = "Read";
            readStatus.style.backgroundColor = "#4ade80";
            }
            else{
                readStatus.textContent = "Not Read";
                readStatus.style.backgroundColor = "#dc2626";
            }

            bookDiv.appendChild(titleP);
            bookDiv.appendChild(authorP);
            bookDiv.appendChild(pagesP);
            bookDiv.appendChild(readStatus);
            bookDiv.appendChild(deleteButton);

            bookDiv.addEventListener("click",(e)=>{
                if (e.target.textContent == "Read" || e.target.textContent == "Not Read"){
                    let id = bookDiv.getAttribute("id");
                    console.log(id);
                    let readStatus = document.querySelector(`.book${id}`);
                    if (readStatus.textContent == "Read")
                    {
                        readStatus.textContent = "Not Read";
                        console.log("working");
                        readStatus.style.backgroundColor = "#dc2626";
                    }
                    else{
                        readStatus.textContent = "Read";
                        readStatus.style.backgroundColor = "#4ade80";
                    }
                    console.log(readStatus.textContent);
                    console.log(id);
                    books[Number(id)].read = !(books[Number(id)].read);
                    

            
                }
                if (e.target.textContent == "DELETE BOOK"){
                    let id = bookDiv.getAttribute("id");
                    books.splice(Number(id),1);
                    bookContainer.removeChild(bookDiv);
                    let bookReferences = document.querySelectorAll(".book");
                    bookReferences = Array.from(bookReferences);
                    bookReferences.forEach((ref,index) => {
                        ref.setAttribute("id",String(index));
                    });

                }
            });

    }
    });   
    
});


