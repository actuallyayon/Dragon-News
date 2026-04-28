"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>Dragon News</h3>
          <p>Delivering real-time news articles on a variety of topics since 2026.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/career">Career</Link>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@dragon-news.com</p>
          <p>Phone: +1 (555) 000-111</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Dragon News. All rights reserved.</p>
      </div>
    </footer>
  );
}
