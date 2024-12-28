import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import CounterABI from "../utils/CounterABI.json";

const Counter = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [currentCount, setCurrentCount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // .env.local'daki contract adresi

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAccounts = await web3Instance.eth.getAccounts();
        setAccounts(userAccounts);

        const contractInstance = new web3Instance.eth.Contract(
          CounterABI,
          contractAddress
        );
        setContract(contractInstance);

        const count = await contractInstance.methods.retrieve().call();
        setCurrentCount(Number(count));
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  const disconnectWallet = () => {
    setContract(null);
    setAccounts(null);
    setCurrentCount(null);
  };

  const incrementCounter = async () => {
    if (contract && accounts) {
      try {
        await contract.methods.increment().send({ from: accounts[0] });
        fetchCurrentCount();
      } catch (error) {
        console.error("Error incrementing counter", error);
      }
    }
  };

  const fetchCurrentCount = useCallback(async () => {
    if (contract) {
      try {
        const count = await contract.methods.retrieve().call();
        setCurrentCount(Number(count));
      } catch (error) {
        console.error("Error fetching current count", error);
      }
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      fetchCurrentCount();
    }
  }, [contract, fetchCurrentCount]);

  return (
    <div>
      <h1>Counter DApp</h1>
      {accounts ? (
        <>
          <p>Connected Account: {accounts[0]}</p>
          <p>
            Current Count:{" "}
            {currentCount !== null ? currentCount : <span>Loading...</span>}
          </p>
          <button onClick={incrementCounter}>Increment Counter</button>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </>
      ) : (
        <button onClick={connectWallet} disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default Counter;
