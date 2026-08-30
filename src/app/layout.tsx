import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BojoFlix — Discover Top Rated Movies & Series",
  description:
    "Browse the best rated movies and TV series across American, Indian, and International cinema. Find what's in theatres and streaming on OTT platforms.",
  keywords: ["movies", "tv series", "ratings", "streaming", "ott", "cinema"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
