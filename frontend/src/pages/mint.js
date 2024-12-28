import { useState } from "react";
import getContract from "../utils/web3";

const MintNFT = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    }
  };

  const mintNFT = async () => {
    try {
      const { contract } = getContract();
      setIsMinting(true);
      await contract.methods.mintNFT(walletAddress).send({ from: walletAddress });
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Wallet: {walletAddress}</p>
          <button onClick={mintNFT} disabled={isMinting}>
            {isMinting ? "Minting..." : "Mint NFT"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MintNFT;