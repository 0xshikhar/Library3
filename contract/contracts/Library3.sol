//SPDX-License-Identifier: MIT
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
    event SetFinished(uint bookid, bool status);

    function addBook(string memory name, uint16 year, string memory author, string memory url, bool finished) public {
        uint bookId= booklist.length;
        booklist.push(Book(bookId,name,author,year,url,finished));
        bookToOwner[bookId]=msg.sender;

        // emit AddBook(msg.sender, bookId, name);
    }

    // to get all the books finished by particular user
    function getuserBook(bool finishStatus) private view returns (Book[] memory){
        Book[] memory tempBookList = new Book[](booklist.length);
        uint counter =0;

        for(uint i=0; i<booklist.length;i++){
            if(bookToOwner[i] == msg.sender && booklist[i].finished == finishStatus){
                tempBookList[counter] = booklist[i];
                counter++;
            }
        }

        // we get large list with empty indexes => so we are redefining it
        Book[] memory readlist = new Book[](counter);
        for(uint i=0;i<counter;i++){
            readlist[i]=tempBookList[i];
            
        }
        return readlist;
    }

    function getFinishedBook() external view returns (Book[] memory){
        return getuserBook(true);
    }

    function getUnfinishedBook() external view returns (Book[] memory){
        return getuserBook(false);
    }
    
    // to change status of book read
    function setFinished(uint bookId, bool finished ) external {
        if(bookToOwner[bookId] == msg.sender){
            booklist[bookId].finished = finished;
            emit SetFinished(bookId, finished);
        }
    }

}
