import { useState, useEffect } from "react";

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const storedWallet = localStorage.getItem("walletAddress");
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ backgroundColor: "#0070f3", color: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>EduNFT Platform</h1>
        <div>
          <span style={{ marginRight: "10px" }}>Wallet: {walletAddress}</span>
          <button
            onClick={() => {
              localStorage.removeItem("walletAddress");
              window.location.href = "/";
            }}
            style={{
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <main style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Welcome, {walletAddress}</h2>
        <p>Manage your NFTs and explore new content!</p>
      </main>
    </div>
  );
};

export default Dashboard;