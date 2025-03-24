import React from "react";
import "./Lounge.css";

const Lounge = () => {
  return (
    <div className="lounge-wrapper">
      <header className="lounge-header">
        <div className="container">
          <h1 className="site-title">TOA Lounge</h1>
          <p className="tagline">Welcome to our private space</p>
        </div>
      </header>

      <main className="lounge-main">
        <section className="hero">
          <div className="container">
            <h2 className="hero-title">Join the Exclusive Community</h2>
            <p className="hero-text">Enter the lounge to connect and explore.</p>
            <div className="btn-group">
              <a href="/login" className="btn login">ログイン</a>
              <a href="/login" className="btn signup">入会</a>
            </div>
          </div>
        </section>

        <section className="about">
          <div className="container">
            <h3>About the Lounge</h3>
            <p>ここはTOAファン専用のラウンジスペースです。イベント、投稿、限定コンテンツをご用意しています。</p>
          </div>
        </section>
      </main>

      <footer className="lounge-footer">
        <div className="container">
          <p>&copy; 2025 TOA Lounge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Lounge;
