//SPDX-Liscense-Identifier: MIT
pragma solidity ^0.8.0;

contract Library3 {
    struct Book {
        uint id;
        string name;
        string author;
        uint16 year;
        string url;
        bool finished;
    }

    Book[] private booklist;
    //mapping book id to the address
    mapping(uint256 => address) bookToOwner;

    event AddBook(address recipient, uint id, string name);

    function addBook(string memory name, uint16 year, string memory author, string memory url, bool finished){
        uint bookId= booklist.length;
        booklist.push(Book(bookId,name,author,year,url,finished));
        bookToOwner[bookId]=msg.sender;

        emit(msg.sender, bookId, name);
    }

    // to get all the books finished by particular user
    function userBook(bool finishStatus) public view {
        Book memory tempBookList = new Book[booklist.length]

        for(uint i=0; i<booklist.length;i++){
            if(bookToOwner[i] == msg.sender){
                tempBookList[i] = booklist.id;
            }
        }
    }
}
