import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  description:
    "Find the best Great Clips haircut deals near you - simple, straightforward savings without the nonsense.",
  keywords: "Great Clips coupons, haircut deals, discount haircuts, Great Clips offers",
  openGraph: {
    title: "No BS Coupons | Great Clips Deals",
    description:
      "Find the best Great Clips haircut deals near you - simple, straightforward savings without the nonsense.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="ashutoshftw"
          data-description="Support me on Buy me a coffee!"
          data-message="Thanks for visiting! ☕ Appreciate your support!"
          data-color="#FF813F"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
      </body>
    </html>
  );
}
