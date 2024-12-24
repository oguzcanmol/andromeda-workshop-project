import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AndromedaNFT from '../contracts/AndromedaNFT.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    }
  };

  const mintNFT = async (name, description, imageURI) => {
    if (!contract) return;
    try {
      await contract.methods.mintNFT(account, name, description, imageURI)
        .send({ from: account });
      loadNFTs();
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  const loadNFTs = async () => {
    if (!contract) return;
    try {
      const totalNFTs = await contract.methods.getTotalNFTs().call();
      const nftList = [];
      for (let i = 1; i <= totalNFTs; i++) {
        const metadata = await contract.methods.getNFTMetadata(i).call();
        nftList.push({ id: i, ...metadata });
      }
      setNfts(nftList);
    } catch (error) {
      console.error("Error loading NFTs:", error);
    }
  };

  return (
    <div className="App">
      <h1>Andromeda NFT Minter</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          {/* NFT Mint Form ve NFT Listesi burada olacak */}
        </div>
      )}
    </div>
  );
}

export default App;
