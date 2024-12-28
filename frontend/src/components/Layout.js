import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="layout">
      <header className="navbar">
        <div className="logo" onClick={() => router.push("/")}>
          <h1>EduNFT Platform</h1>
        </div>
        <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
          <Link href="/" className={router.pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            href="/contents"
            className={router.pathname === "/contents" ? "active" : ""}
          >
            Contents
          </Link>
          <Link
            href="/dashboard"
            className={router.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            href="/counter"
            className={router.pathname === "/counter" ? "active" : ""}
          >
            Counter
          </Link>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </header>
      <main className="content">{children}</main>
      <footer className="footer">
        <p>© 2024 EduNFT Platform. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #0070f3;
          color: white;
          padding: 10px 20px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .logo {
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
        }
        .menu {
          display: flex;
          gap: 15px;
        }
        .menu a {
          color: white;
          text-decoration: none;
          font-size: 16px;
        }
        .menu a.active {
          border-bottom: 2px solid #fff;
        }
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        .content {
          flex: 1;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .footer {
          text-align: center;
          padding: 10px;
          background-color: #0070f3;
          color: white;
        }
        @media (max-width: 768px) {
          .menu {
            display: ${isMenuOpen ? "flex" : "none"};
            flex-direction: column;
            background-color: #0070f3;
            position: absolute;
            top: 60px;
            right: 0;
            width: 200px;
            padding: 10px;
            z-index: 1000;
          }
          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
