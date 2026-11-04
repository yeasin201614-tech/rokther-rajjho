import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rokther Rajjho (রক্তের রাজ্য) — National Blood Donation Network of Bangladesh",
  description:
    "রক্তের বন্ধনে, জীবনের প্রয়োজনে। এক ফোঁটা রক্ত, একটি নতুন জীবনের আশা। National 24/7 blood donation platform covering all 64 districts of Bangladesh.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#E53945" />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-red-100 selection:text-brand-red">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
