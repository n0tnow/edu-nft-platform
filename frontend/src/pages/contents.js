import { useState } from "react";
import { mintNFT } from "../utils/web3";

const Contents = () => {
  const [contents] = useState([
    {
      id: 1,
      title: "Blockchain Basics",
      description: "Learn the fundamentals of blockchain technology.",
      nftValue: "1 EDU",
      image: "https://via.placeholder.com/150",
      tokenURI: "https://example.com/metadata1.json",
    },
    {
      id: 2,
      title: "Smart Contract Development",
      description: "Dive into the world of smart contracts.",
      nftValue: "2 EDU",
      image: "https://via.placeholder.com/150",
      tokenURI: "https://example.com/metadata2.json",
    },
    {
      id: 3,
      title: "DeFi Essentials",
      description: "Explore decentralized finance and its applications.",
      nftValue: "3 EDU",
      image: "https://via.placeholder.com/150",
      tokenURI: "https://example.com/metadata3.json",
    },
  ]);

  const handleMint = async (tokenURI) => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
    await mintNFT(walletAddress, tokenURI);
  };

  return (
    <div className="contents-page">
      <h1>Eğitim İçerikleri</h1>
      <div className="contents-grid">
        {contents.map((content) => (
          <div key={content.id} className="content-card">
            <img src={content.image} alt={content.title} />
            <h2>{content.title}</h2>
            <p>{content.description}</p>
            <p className="nft-value">NFT Value: {content.nftValue}</p>
            <button onClick={() => handleMint(content.tokenURI)}>
              Complete and Mint NFT
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .contents-page {
          padding: 20px;
        }
        .contents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .content-card {
          background: white;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .content-card img {
          max-width: 100%;
          border-radius: 10px;
        }
        .content-card h2 {
          font-size: 20px;
          margin: 10px 0;
        }
        .content-card p {
          font-size: 14px;
          color: #555;
        }
        .content-card .nft-value {
          font-weight: bold;
          color: #0070f3;
          margin-bottom: 10px;
        }
        .content-card button {
          padding: 10px 15px;
          border: none;
          background-color: #0070f3;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        .content-card button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default Contents;
