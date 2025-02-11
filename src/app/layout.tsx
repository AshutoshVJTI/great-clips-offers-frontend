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
  title: "No BS Coupons | Great Clips Deals",
  description: "Find the best Great Clips haircut deals near you - simple, straightforward savings without the nonsense.",
  keywords: "Great Clips coupons, haircut deals, discount haircuts, Great Clips offers",
  openGraph: {
    title: "No BS Coupons | Great Clips Deals",
    description: "Find the best Great Clips haircut deals near you - simple, straightforward savings without the nonsense.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
