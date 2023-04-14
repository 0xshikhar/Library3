import Image from 'next/image'
import { Inter } from 'next/font/google'

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ContractAddress } from '../../config';
import Library3 from '../../artifacts/contracts/Library3.sol/Library3.json';

declare let window: any;


export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')

  const [bookName, setBookName] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookUrl, setBookUrl] = useState('')
  const [bookYear, setBookYear] = useState('')
  const [bookFinished, setBookFinished] = useState('')

  const [booksFinished, setBooksFinished] = useState([])
  const [booksUnfinished, setBooksUnfinished] = useState([])

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      // check whether wallet is connected or not

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log(chainId)
      const sepoliaChainId = '0xaa36a7'

      if (chainId !== sepoliaChainId) {
        alert("You are connected to Sepolia Chain Id");
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);

    }
    catch (error) {
      console.log("Error on connecting to Metamask", error)
    }
  }

  const submit = async () => {
    let book = {
      'name': bookName,
      'year': parseInt(bookYear),
      'author': bookAuthor,
      'url': bookUrl,
      'finished': true ? (bookFinished == 'true') : (false),
    };

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const LibraryContract = new ethers.Contract(ContractAddress, Library3.abi, signer);

        let libraryTx = await LibraryContract.addBook(book.name, book.year, book.author, book.url, book.finished);
        console.log("Add Book Transaction", libraryTx)
      }
    }
    catch (error) {
      console.log("Ethereum object does not exist")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='bold '>Library 3</h1>
      <h2>Your Personal Library</h2>
      {
        currentAccount === '' ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) :
          (
            <div>
              <button>Wallet Connected: {currentAccount} </button>
              <div className='text-xl font-semibold mb-20 mt-12'>
                <input className='text m-2 rounded p-2' type='text' placeholder='Book Name' value={bookName} onChange={(e) => setBookName(e.target.value)}></input><br />
                <input className='text m-2 rounded p-2' type='text' placeholder='Book Author' value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)}></input><br />
                <input className='text m-2 rounded p-2' type='text' placeholder='Book Year' value={bookYear} onChange={(e) => setBookYear(e.target.value)}></input><br />
                <input className='text m-2 rounded p-2' type='text' placeholder='Book URL' value={bookUrl} onChange={(e) => setBookUrl(e.target.value)}></input><br />
                {/* <input className='text m-2' type='text' placeholder='Book ' value={bookFinished} onChange={(e)=>setBookFinished(true)}></input><br /> */}
                <label>
                  Have you read this book ?
                  <select value={bookFinished} onChange={(e) => setBookFinished(e.target.value)}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </label>

                <button className=' m-2 px-10 py-2 bg-white font-bold rounded' onClick={submit}>Add Book</button>
              </div>
            </div>
          )
      }

    </main>
  )
}
