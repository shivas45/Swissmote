import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';

const WalletConnect = () => {
  const [balance, setBalance] = useState(null);
  const [providerType, setProviderType] = useState('');

  const connectEthereum = async () => {
    if (window.ethereum) {
      try {
        const ethProvider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = ethProvider.getSigner();
        const balance = await signer.getBalance();
        setProviderType('ETH');
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Error connecting to Ethereum wallet:', error);
        alert('Failed to connect to Ethereum wallet. Please ensure MetaMask is installed and try again.');
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to connect your Ethereum wallet.');
    }
  };

  const connectSolana = async () => {
    if (window.solana) {
      try {
        await window.solana.connect();
        const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
        const publicKey = new PublicKey(window.solana.publicKey.toString());
        const balance = await connection.getBalance(publicKey);
        setProviderType('SOL');
        setBalance(balance / 1e9); // Convert from lamports to SOL
      } catch (error) {
        console.error('Error connecting to Solana wallet:', error);
        alert('Failed to connect to Solana wallet. Please ensure a Solana wallet is installed and try again.');
      }
    } else {
      alert('Solana wallet is not installed. Please install a Solana wallet to connect.');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4">Crypto Wallet Balance</Typography>
      <Button variant="contained" color="primary" onClick={connectEthereum} sx={{ mt: 2 }}>
        Connect Ethereum Wallet
      </Button>
      <Button variant="contained" color="secondary" onClick={connectSolana} sx={{ mt: 2 }}>
        Connect Solana Wallet
      </Button>
      {balance !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Balance: {balance} {providerType}
        </Typography>
      )}
    </Box>
  );
};

export default WalletConnect;
