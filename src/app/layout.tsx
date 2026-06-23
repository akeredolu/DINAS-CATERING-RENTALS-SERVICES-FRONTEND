import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"; // 1. Imported your new Navbar here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dina Catering & Rentals Services",
  description: "Luxury culinary and event setup solutions in Abuja",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 flex flex-col min-h-screen justify-between text-slate-800`}>
        <CartProvider>
          
          {/* 2. Deletes the old white header and displays your complete menu */}
          <Navbar />

          {/* Main Core Router View Body Element */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Unified Corporate Footer Mount */}
          <Footer />

        </CartProvider>
      </body>
    </html>
  );
}
