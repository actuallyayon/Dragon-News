"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <nav className="navbar">
        {/* Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`} onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/career" className={`nav-link ${pathname === "/career" ? "active" : ""}`} onClick={() => setIsOpen(false)}>
            Career
          </Link>
        </div>

        <div className="nav-auth">
          {session?.user ? (
            <>
              <Image 
                src={session.user.image || "/assets/user.png"} 
                alt="User" 
                width={40} 
                height={40} 
                className="user-icon"
              />
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Image 
                src="/assets/user.png" 
                alt="User" 
                width={40} 
                height={40} 
                className="user-icon"
              />
              <Link href="/login" className="btn-login">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
