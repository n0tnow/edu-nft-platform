import Web3 from "web3";
import abi from "../../public/ABI.json";

const getContract = () => {
  const web3 = new Web3(window.ethereum);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  return new web3.eth.Contract(abi, contractAddress);
};

export const mintNFT = async (walletAddress, tokenURI) => {
  try {
    const contract = getContract();
    const receipt = await contract.methods.mintNFT(walletAddress, tokenURI).send({
      from: walletAddress, // Kullanıcı cüzdan adresi
      gas: 300000,
    });
    console.log("Transaction successful:", receipt);
    alert("NFT minted successfully!");
  } catch (error) {
    console.error("Minting error:", error.message);
    alert("Failed to mint NFT. Please check your network or contract settings.");
  }
};

export default getContract;