import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ChatBubble } from "@/components/chat-bubble";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sava Nievierov | PM Who Ships with AI",
  description: "Building real products with modern AI tools — fast, polished, shipped.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background scroll-smooth`}
    >
      <body className="font-sans antialiased">
        {children}
        <ChatBubble />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
