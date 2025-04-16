import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import NavBar from "../../components/NavBar";
import { Suspense } from "react";
import Footer from "../../components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "700"], // agregá los pesos que necesites
  subsets: ["latin"],
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asian Food",
  description: "La mejor comida asiatica de la ciudad!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}${notoSansJP.variable} antialiased`}
      >
        <ClerkProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />

            <Suspense>
             
              
              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </Suspense>
          </div>
        </ClerkProvider>
      </body>
    </html>

  );
}
