"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "./constent";

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const initializeProvider = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }

    const newProvider = new ethers.BrowserProvider(window.ethereum);
    setProvider(newProvider);

    const accounts = await newProvider.send("eth_accounts", []);
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      const newSigner = await newProvider.getSigner();
      setSigner(newSigner);
      setContract(new ethers.Contract(contractAddress, contractABI, newSigner));
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask not installed");
      return;
    }

    try {
      const newAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (newAccounts.length > 0) {
        setAccount(newAccounts[0]);
        const newSigner = await provider.getSigner();
        setSigner(newSigner);
        setContract(
          new ethers.Contract(contractAddress, contractABI, newSigner)
        );
      }
    } catch (error) {
      console.error("User rejected MetaMask connection:", error);
    }
  };

  useEffect(() => {
    initializeProvider();

    // Listen for account changes
    window.ethereum?.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
        setSigner(null);
        setContract(null);
      }
    });

    return () => {
      window.ethereum?.removeListener("accountsChanged", () => {});
    };
  }, []);

  return (
    <ContractContext.Provider value={{ connectWallet, account, contract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => useContext(ContractContext);
