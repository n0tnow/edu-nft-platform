import { useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it and try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f5f5f5" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Connect Wallet</h1>
      <button
        onClick={connectWallet}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Home;