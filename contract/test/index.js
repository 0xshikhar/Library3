/* eslint disable */
// import { expect } from "chai";
// import { ethers } from "hardhat";

const { expect } = require("chai");
const { ethers } = require("hardhat");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

describe("Library contract", function () {
  let Library;
  let library; // an object of our contract
  let owner;

  // creating dummy data
  const NUM_FINISHED_BOOK = 5;
  const NUM_UNFINISHED_BOOK = 3;

  let finishedBookList;
  let unfinishedBookList;

  // verifying single book
  function verifyBook(bookChain, book) {
    expect(book.name).to.equal(bookChain.name);
    expect(book.year.toString()).to.equal(bookChain.year.toString());
    expect(book.author).to.equal(bookChain.author);
  }

  // verifying book list
  function verifyBookList(booksFromChain, bookList) {
    expect(booksFromChain.length).to.not.equal(0);
    expect(booksFromChain.length).to.equal(bookList.length);

    for (let i = 0; i < bookList.length; i++) {
      const bookChain = booksFromChain[i];
      const book = bookList[i];

      verifyBook(bookChain, book);
    }
  }

  beforeEach(async function () {
    Library = await ethers.getContractFactory("Library3");
    library = await Library.deploy();
    [owner] = await ethers.getSigners();

    finishedBookList = [];
    unfinishedBookList = [];

    for (let i = 0; i < NUM_FINISHED_BOOK; i++) {
      const book = {
        name: getRandomInt(1, 10000).toString(),
        year: getRandomInt(1980, 2023),
        author: getRandomInt(1, 10000000).toString(),
        url: getRandomInt(1, 10000000000).toString(),
        finished: false,
      };

      await library.addBook(
        book.name,
        book.year,
        book.author,
        book.url,
        book.finished
      );
      finishedBookList.push(book);
    }

    for (let i = 0; i < NUM_UNFINISHED_BOOK; i++) {
      const book = {
        name: getRandomInt(1, 10000).toString(),
        year: getRandomInt(1980, 2023),
        author: getRandomInt(1, 10000000).toString(),
        url: getRandomInt(1, 10000000000).toString(),
        finished: false,
      };

      await library.addBook(
        book.name,
        book.year,
        book.author,
        book.url,
        book.finished
      );
      unfinishedBookList.push(book);
    }
  });

  describe("Add a Book", () => {
    it("Should emit addbook event", async function () {
      const book = {
        name: getRandomInt(1, 10000).toString(),
        year: getRandomInt(1980, 2023),
        author: getRandomInt(1, 10000000).toString(),
        url: getRandomInt(1, 10000000000).toString(),
        finished: false,
      };

      await expect(
        await library.addBook(
          book.name,
          book.year,
          book.author,
          book.url,
          book.finished
        )
      )
        .to.emit(library, "AddBook")
        .withArgs(
          owner.address,
          NUM_FINISHED_BOOK + NUM_UNFINISHED_BOOK,
          book.name
        );
    });
  });

  describe("Get a Book", () => {
    it("Should return correct unfinished book", async function () {
      const booksFromChain = await library.getUnfinishedBook();

      expect(booksFromChain.length).to.equal(NUM_UNFINISHED_BOOK);
      verifyBookList(booksFromChain, unfinishedBookList);
    });

    it("Should return correct finished book", async function () {
      const booksFromChain = await library.getFinishedBook();

      expect(booksFromChain.length).to.equal(NUM_FINISHED_BOOK);
      verifyBookList(booksFromChain, finishedBookList);
    });
  });

  describe("Set finished", () => {
    it("Should emit setFinished event", async function () {
      const BOOK_ID = 0;
      const BOOK_FINISHED = true;

      await expect(library.setFinished(BOOK_ID, BOOK_FINISHED))
        .to.emit(library, "SetFinished")
        .withArgs(BOOK_ID, BOOK_FINISHED);
    });
  });
});

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!")
