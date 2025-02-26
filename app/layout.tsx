import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FaReact, FaServer } from "react-icons/fa";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <nav className="bg-gray-800 py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
              <Link href="/" className="text-white font-bold text-xl">
                My Next.js App
              </Link>
              <div className="flex space-x-4">
                <Link aria-disabled href="/about" className="text-white hover:text-gray-300">
                  About
                </Link>
                <Link aria-disabled href="/contact" className="text-white hover:text-gray-300">
                  Contact
                </Link>
              </div>
            </div>
          </nav>
          {children}
          <div className="mt-8 flex space-x-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2">
              <FaReact className="text-blue-500" size={24} />
              <span className="text-gray-800 font-semibold">React</span>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2">
              <FaServer className="text-green-500" size={24} />
              <span className="text-gray-800 font-semibold">Server-Side Rendering</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
