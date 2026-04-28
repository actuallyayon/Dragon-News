"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import Navbar from "@/components/Navbar";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("01");
  const [newsList, setNewsList] = useState([]);
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
    // Fetch categories
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data.news_category);
        }
      })
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    // Fetch news for selected category
    fetch(`https://openapi.programming-hero.com/api/news/category/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setNewsList(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <>
      <Header />
      <BreakingNews />
      <Navbar />

      <div className="container">
        <div className="main-layout">
          {/* Left Sidebar - Categories */}
          <aside className="sidebar-left">
            <h3>All Category</h3>
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category.category_id}
                  className={`category-item ${
                    selectedCategory === category.category_id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.category_id)}
                >
                  {category.category_name}
                </button>
              ))}
            </div>
          </aside>

          {/* Middle - News Feed */}
          <main className="news-feed">
            <h3>Dragon News Home</h3>
            {loading ? (
              <p>Loading news...</p>
            ) : newsList.length === 0 ? (
              <p>No news found in this category.</p>
            ) : (
              newsList.map((news) => (
                <article key={news._id} className="news-card">
                  <div className="card-header">
                    <div className="author-info">
                      <Image
                        src={news.author?.img || "/assets/user.png"}
                        alt={news.author?.name || "Author"}
                        width={40}
                        height={40}
                        className="author-avatar"
                      />
                      <div>
                        <div className="author-name">{news.author?.name || "Unknown"}</div>
                        <div className="author-date">
                          {news.author?.published_date || "No date"}
                        </div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <Image src="/assets/bookmark.png" alt="Bookmark" width={20} height={20} />
                      <Image src="/assets/share.png" alt="Share" width={20} height={20} />
                    </div>
                  </div>

                  <div className="card-body">
                    <h2 className="card-title">{news.title}</h2>
                    <Image
                      src={news.image_url}
                      alt={news.title}
                      width={800}
                      height={400}
                      className="card-image"
                      unoptimized
                    />
                    <p className="card-details">
                      {news.details.length > 250
                        ? `${news.details.substring(0, 250)}...`
                        : news.details}
                    </p>
                    <Link href={`/news/${news._id}`} className="read-more">
                      Read More
                    </Link>
                  </div>

                  <div className="card-footer">
                    <div className="rating">
                      <Image src="/assets/star.png" alt="Star" width={20} height={20} />
                      <span>{news.rating?.number || 0}</span>
                    </div>
                    <div className="views">
                      <Image src="/assets/eye.png" alt="Views" width={20} height={20} />
                      <span>{news.total_view || 0}</span>
                    </div>
                  </div>
                </article>
              ))
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
