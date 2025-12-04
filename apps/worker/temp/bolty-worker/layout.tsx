import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tinder Clone",
  description: "A simple Tinder-like UI built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-white antialiased">
        {children}
      </body>
    </html>
  );
}