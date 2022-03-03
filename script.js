let myLibrary = [];

function books(bookName, author, numPages, read){
    this.bookName = bookName;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}


function addBookToLibrary(){
    let book = Object.create(books);    
    book.bookName = document.querySelector(".Bookname").value;
    book.author = document.querySelector(".Author").value;
    book.numPages = document.querySelector(".Number").value;
    book.read = document.querySelector(".Read").checked;
    modalBg.classList.remove('active');
    return myLibrary.push(book);
    }

function clearForm(){
    document.querySelector(".Bookname").value = '';
    document.querySelector(".Author").value = '';
    document.querySelector(".Number").value = 0;
    document.querySelector(".Read").checked = false;
    }

var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close')

modalBtn.addEventListener('click', function(){
    modalBg.classList.add('active');
})
modalClose.addEventListener('click', function(){
    modalBg.classList.remove('active');
})

var theButton = document.querySelector(".submit");
let myTable = document.querySelector('#table');

let headers = ['Book Name', 'Author', 'Pages', 'Read'];
let table = document.createElement('table');

function createHeader(){
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    })
    table.appendChild(headerRow);
}
function createRow(book){
    let row = document.createElement('tr');
        Object.values(book).forEach(text =>{
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
}
theButton.addEventListener('click', function(){
    addBookToLibrary();
    table.replaceChildren();
    createHeader();
    let i = 0;
    myLibrary.forEach(book =>{
        createRow(book)
         //add delete and read buttons
        const button = document.createElement('button')
        button.textContent = "delete";
        button.classList.add(`${i}`);
        
        button.addEventListener('click', () =>{
            myLibrary.splice(Number(button.className), 1);
        })
        table.appendChild(button);
        const button2 = document.createElement('button');
        button2.textContent = "read";
        button2.classList.add(`${i}`);
        table.appendChild(button2);
        console.log(myLibrary);
        button2.addEventListener('click', () => {
            if (myLibrary[button2.className].read == true){
                myLibrary[button2.className].read = false;
            }else if(myLibrary[button2.className].read == false){
                myLibrary[button2.className].read = true;
            }
        
        })
        i++;
    })
    myTable.appendChild(table);
    clearForm();
})
