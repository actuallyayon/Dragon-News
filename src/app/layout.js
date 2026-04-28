import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dns from "dns";

// Force Google DNS globally at the app root
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  console.log("DNS servers set to Google DNS at app root");
} catch (e) {
  console.error("Failed to set DNS servers at app root", e);
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dragon News",
  description: "Your trusted source for news without fear or favour.",
};

import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
