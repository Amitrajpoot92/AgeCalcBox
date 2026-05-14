import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css"; 

// Apne Navbar aur Footer ka exact path check kar lena
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

// 1. Homepage ka Meta Data aur Canonical yahan update kiya hai
export const metadata: Metadata = {
  metadataBase: new URL('https://agecalculatorbox.com'),
  title: "Age Calculator Box – All Age Calculators in One Place",
  description: "Use Age Calculator Box to calculate your exact age instantly. Check age difference, future age, birthday countdown and retirement time easily. 100% free and accurate tools.",
  alternates: {
    canonical: '/',
  },
  // Niche wali line se favicon (logo) set hoga
  icons: {
    icon: '/logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Dhyan rakhein: <html> sabse pehla aur outermost tag hona chahiye
    <html lang="en" className="w-full overflow-x-hidden max-w-[100vw]">
      <head>
        {/* 2. Google Analytics Tracking Code */}
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=G-GKJ0E9DGKW`} 
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GKJ0E9DGKW', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} w-full overflow-x-hidden max-w-[100vw]`}>
        <Navbar />
        <main className="min-h-screen bg-white flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}