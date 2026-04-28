"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  return (
    <header className="header">
      <div className="container">
        <Image 
          src="/assets/The Dragon News.png" 
          alt="The Dragon News" 
          width={500} 
          height={60} 
          priority
          style={{ maxWidth: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
        />
        <p className="header-subtitle">Journalism Without Fear or Favour</p>
        <p className="header-date">{date}</p>
      </div>
    </header>
  );
}
