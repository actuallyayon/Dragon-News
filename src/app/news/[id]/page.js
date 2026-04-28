"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { authClient } from "@/lib/auth-client";

export default function NewsDetail({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Github login failed", error);
    }
  };

  useEffect(() => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data.length > 0) {
          setNews(data.data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news detail", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Header />
      <Navbar />

      <div className="container">
        <div className="main-layout detail-layout">
          {/* Left/Middle - News Detail */}
          <main className="news-feed">
            <h3>Dragon News</h3>
            {loading ? (
              <p>Loading news details...</p>
            ) : !news ? (
              <p>News not found.</p>
            ) : (
              <div className="news-card" style={{ padding: '20px' }}>
                <Image
                  src={news.image_url}
                  alt={news.title}
                  width={800}
                  height={400}
                  className="card-image"
                  unoptimized
                />
                <h2 className="card-title" style={{ marginTop: '20px' }}>{news.title}</h2>
                <p className="card-details" style={{ color: 'var(--text-primary)', marginTop: '20px' }}>
                  {news.details}
                </p>
                <div style={{ marginTop: '30px' }}>
                  <Link href="/" className="btn-login" style={{ display: 'inline-block', backgroundColor: 'var(--accent-color)' }}>
                    ← All news in this category
                  </Link>
                </div>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="sidebar-right">
            {/* Login With */}
            <div className="sidebar-right-section">
              <h3>Login With</h3>
              <button className="social-login-btn" onClick={handleGoogleLogin}>
                <Image src="/assets/google.svg" alt="Google" width={20} height={20} />
                Login with Google
              </button>
              <button className="social-login-btn" onClick={handleGithubLogin}>
                <Image src="/assets/github.svg" alt="Github" width={20} height={20} />
                Login with Github
              </button>
            </div>

            {/* Find Us On */}
            <div className="sidebar-right-section">
              <h3>Find Us On</h3>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link-item">
                  <Image src="/assets/fb.svg" alt="Facebook" width={20} height={20} />
                  Facebook
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link-item">
                  <Image src="/assets/twitter.svg" alt="Twitter" width={20} height={20} />
                  Twitter
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link-item">
                  <Image src="/assets/instagram.svg" alt="Instagram" width={20} height={20} />
                  Instagram
                </a>
              </div>
            </div>

            {/* Q-Zone */}
            <div className="sidebar-right-section" style={{ backgroundColor: '#F3F3F3' }}>
              <h3>Q-Zone</h3>
              <div className="qzone-images">
                <Image src="/assets/swimming.png" alt="Swimming" width={300} height={200} className="qzone-img" />
                <Image src="/assets/class.png" alt="Class" width={300} height={200} className="qzone-img" />
                <Image src="/assets/playground.png" alt="Playground" width={300} height={200} className="qzone-img" />
              </div>
            </div>

            {/* Promo Banner */}
            <div className="promo-banner">
              <Image 
                src="/assets/bg.png" 
                alt="Promo Banner" 
                width={300} 
                height={600} 
                className="promo-bg"
              />
              <div className="promo-content">
                <h2>Create an Amazing Newspaper</h2>
                <p>Discover thousands of options, easy to customize layouts, one-click to import demo and much more.</p>
                <button className="btn-learn-more">Learn More</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
