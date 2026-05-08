import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 

// Apne Navbar aur Footer ka exact path check kar lena
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Age Calculator Box | Premium Tools",
  description: "Accurate age calculations with zero data storage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Dhyan rakhein: <html> sabse pehla aur outermost tag hona chahiye
    <html lang="en" className="w-full overflow-x-hidden max-w-[100vw]">
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