import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "SFE Foundry - Build. Compete. Launch.",
  description: "Join a community of student founders, hackers, and builders. Participate in startup competitions, hackathons, workshops, and mentorship programs.",
  keywords: ["startup", "hackathon", "founder", "innovation", "entrepreneurship", "student"],
  openGraph: {
    title: "SFE Foundry - Build. Compete. Launch.",
    description: "Join a community of student founders, hackers, and builders. Participate in startup competitions, hackathons, workshops, and mentorship programs.",
    url: "https://sfe-foundery.vercel.app",
    siteName: "SFE Foundry",
    type: "website",
    images: [
      {
        url: "https://sfe-foundery.vercel.app/og-image.webp",
        width: 1200,
        height: 630,
        alt: "SFE Foundry - Build. Compete. Launch.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SFE Foundry - Build. Compete. Launch.",
    description: "Join a community of student founders, hackers, and builders.",
    images: ["https://sfe-foundery.vercel.app/og-image.webp"],
  },
};

import AuthProvider from "../components/AuthProvider";
import CookieBanner from "../components/CookieBanner";
import PageTracker from "../components/PageTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AuthProvider>{children}</AuthProvider>
        <CookieBanner />
        <PageTracker />
      </body>
    </html>
  );
}
