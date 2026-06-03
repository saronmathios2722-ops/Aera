import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AuthProvider } from "@/components/shared/AuthProvider";
import { UserProvider } from "@/context/UserContext";
import StructuredData from "@/components/shared/StructuredData";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aera.style'),
  title: {
    default: "Aera | Style, Intended.",
    template: "%s | Aera"
  },
  description: "The premium AI fashion sanctuary for intentional spending and personal style curation.",
  keywords: ["AI Fashion Stylist", "Intentional Spending", "Aera Style", "Personal Style Coach", "Capsule Wardrobe AI"],
  authors: [{ name: "Aera" }],
  creator: "Aera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aera.style",
    title: "Aera | Style, Intended.",
    description: "Your personal AI fashion sanctuary. Intelligently curating your wardrobe, protecting your budget.",
    siteName: "Aera",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Aera Fashion Sanctuary"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aera | Your Intelligent Fashion Stylist",
    description: "Rediscover the art of intentional dressing with your personal AI fashion sanctuary.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aera",
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-aureve-cream text-aureve-charcoal">
        <AuthProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
