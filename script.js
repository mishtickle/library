let myLibrary = [];

//function constructor
class books{
    constructor(bookName, author, numPages, read){
        this.bookName = bookName;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
}

function addBookToLibrary() {
    let book = Object.create(books);    
    book.bookName = document.querySelector(".Bookname").value;
    book.author = document.querySelector(".Author").value;
    book.numPages = document.querySelector(".Number").value;
    book.read = document.querySelector(".Read").checked;
    modalBg.classList.remove('active');
    return myLibrary.push(book)
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
let table = document.createElement('table');

function createHeader(){
    let headers = ['Book Name', 'Author', 'Pages', 'Read'];
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    })
    table.appendChild(headerRow);
}
function createRow(book, i){
    let row = document.createElement('tr');
    Object.values(book).forEach(text =>{
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    })
    let newButton = document.createElement('button');
    newButton.innerText = "Read";
    row.appendChild(newButton);
    
    let secondButton = document.createElement('button');
    secondButton.innerText= "Delete";
    row.appendChild(secondButton);
    table.appendChild(row);
    createDeleteButton(i, row, secondButton);
    createReadButton(i, row, newButton);
}
function createDeleteButton(i, row, secondButton){
    secondButton.classList.add(`${i}`);
    secondButton.addEventListener('click', () =>{
        myLibrary.splice(Number(secondButton.className), 1);
        updateTable();
    })    
}

function createReadButton(i, row, newButton){
        newButton.classList.add(`${i}`);
        newButton.addEventListener('click', () => {
            if (myLibrary[newButton.className].read == true){
                myLibrary[newButton.className].read = false;
            }else if(myLibrary[newButton.className].read == false){
                myLibrary[newButton.className].read = true;
            }
            updateTable();
        })
    
}
function updateTable(){
    table.replaceChildren();
    createHeader();
    let i = 0;
    myLibrary.forEach(book =>{
        createRow(book, i)
        i++;
    })
    myTable.appendChild(table);
}

theButton.addEventListener('click', function(){
    addBookToLibrary();
    updateTable();
    clearForm();
})
