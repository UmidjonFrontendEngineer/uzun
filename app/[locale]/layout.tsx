import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = 'https://uzun-uz.vercel.app';

export const metadata: Metadata = {
  title: {
    default: "Uzun.uz — Milliy marketpleks",
    template: "%s | Uzun.uz"
  },
  description: "O'zbekiston bo'ylab tezkor yetkazib berish, minglab sifatli mahsulotlar va qulay narxlar.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/vercel.svg'
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: "Uzun.uz — Milliy marketpleks",
    description: "O'zbekiston bo'ylab tezkor yetkazib berish va qulay narxlar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col justify-between`}>
        <Header />
        <div className="flex-1 bg-stone-50">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}