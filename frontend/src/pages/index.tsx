import Image from 'next/image'
import { Inter } from 'next/font/google'

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ContractAddress } from '../../config';
import Library3 from '../../artifacts/contracts/Library3.sol/Library3.json';

declare let window: any;


export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world</h1>
    </main>
  )
}
